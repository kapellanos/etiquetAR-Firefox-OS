/**
 */
// get the data from the server
var data = JSON.parse(localStorage.qr);
var width = window.innerWidth;
var mapURI = "http://maps.googleapis.com/maps/api/staticmap?size=" + width + "x" + "200&sensor=false";
var markersColors = ["0x6960EC", "0xF87531", "0xE7C6A5", "0xFF0000", "0xE0D873", "0x808069", "0x698B22", "0x362819", "0xE9967A", "0x00FF00", "0xEE5C42", "0x0000FF", "0x95B9C7", "0x7FFFD4", "0x667C26", "0xFFFF00", "0xF3E5AB", "0xCD7F32", "0xC35817", "0xE7A1B0"];

for(var i = 0; i < data.length; i++) {

    if(data[i].latitude != undefined) {

        mapURI = mapURI + "&markers=color:" + markersColors[i % (markersColors.length)];
        mapURI =  mapURI + "%7C" + data[i].latitude + "," + data[i].longitude;
        var name = data[i].qr_name
        var src = "img/markers/number_" + (i % markersColors.length) + ".png";
        var id = data[i].qr_id.toString();
        if(localStorage[id] == 1) {
            $('#tableMarkers').append("<tr><td class='right-margin'><img src='"  + src+ "' id='clickIcon_" + i + "'></td><td colspan='2' class='right-margin' id='qr_" + i + "' >" + name + "</td><td class='right-margin'><img src='img/eye.svg'class='action' id='see_qr_" + data[i].qr_id + "'></td><td><input type='checkbox'checked disabled class='action'></td></tr>");
        } else {
            $('#tableMarkers').append("<tr><td class='right-margin'><img src='"  + src + "' id='clickIcon_" + i + "'></td><td colspan='2' class='right-margin' id='qr_" + i + "' >" + name + "</td><td class='right-margin'><img src='img/eye.svg'class='action' id='see_qr_" + data[i].qr_id + "'></td><td><input type='checkbox' disabled class='action'></td></tr>");
        }
    }
}

$("img[id^='see_qr_']").each(function() {
    var id = parseInt(this.id.replace("see_qr_", ""));
    $("#see_qr_" + id).click(function() {
        $('#button-open').remove();
        window.scrollTo(0,0);
        popup("<p>Cargando los perfiles del recurso</p><progress></progress>");
        send(id);
    });
});

$('#map').attr("src", mapURI);
function send(id) {
    $.ajax({
        url: 'http://evening-bastion-5353.herokuapp.com/api/v1/android_app/selectprofile',
        type: 'POST',
        dataType: "json",
        data: JSON.stringify([{ qr_id: id }]),
        success: function (data) {
            localStorage.setItem("profiles", JSON.stringify(data));
            localStorage.setItem(id.toString(), 1);
            window.location.replace("profiles.html");
        },
        error: function (error) {
            alert("No se puede comunicar con el servidor. Compruebe su conexión a Internet.");
        },
        complete: function (data) {
        }
    });
}

$('#collection_name').html("Colección: " + data[0].collection_name);
function read(a) {
    if(a.indexOf("evening-bastion-5353") !== -1) {
        // Primero hay que ver si se trata de un QR de colección o de etiqueta
        if(a.indexOf("collections") !== -1) {
            var id = a.substr(a.indexOf("collections/" + "collections".length));
            if(id == localStorage.actualCollection) {
                popup("<p>Has escaneado la misma colección que está actualmente abierta.</p>");
            } else {
                $('.button').before("<a href='#' class='button' id='button-open'>Abrir</a>");
                popup("<p>Se ha escaneado otra colección distinta a la actual. ¿Quiéres abrirla?</p>");
                $('#button-open').click(function() {
                    localStorage.setItem("actualCollection", id);
                    sendCollection(id);
                });
            }
        } else {
            var exist = false;
            var id = a.substr(a.indexOf("go/") + "go/".length);
            for(var i = 0; i < data.length; i++) {
                if(data[i].qr_id == id) {
                    exist = true;
                    break;
                }
            }
            if(exist) {
                send(id);
            } else {
                $('#button-open').remove();
                popup("<p>El código escaneado pertenece a una colección distinta a la actual. Por favor, escanee primero la colección y más tarde los códigos QR.</p>")
            }
        }
    } else {
        popup("<p>Código QR incorrecto</p>");
    }
}

qrcode.callback = read;


$('.icon-camera').click(function() {

    var activity = new MozActivity({
        // Ask for the "pick" activity
        name: "pick",

        // Provide the data required by the filters of the activity
        data: {
            type: "image/jpeg"
        }
    });

    activity.onsuccess = function() {
        $('#button-open').remove();
        popup("<p>Escaneando el código QR</p><progress></progress>");
        var picture = this.result;
        var url = URL.createObjectURL(picture.blob);

        qrcode.decode(url);
    };

    activity.onerror = function() {
        popup("<p>Error escaneando el código QR</p>")
    };
});

function sendCollection(id) {
    $('#button-open').remove();
    popup("<p>Obteniendo los códigos QR de la colección.</p><progress></progress>");
    $.ajax({
        url: 'http://evening-bastion-5353.herokuapp.com/api/v1/android_app/selectcollection',
        type: 'POST',
        dataType: "json",
        data: JSON.stringify([{ collection_id: id }]),
        success: function (data) {
            localStorage.setItem("qr", JSON.stringify(data));
            window.location.reload();
        },
        error: function (error) {
            alert("No se puede comunicar con el servidor. Compruebe su conexión a Internet.");
        },
        complete: function (data) {
        }
    });
}