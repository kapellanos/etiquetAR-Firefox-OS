$('#bar').hide();
function send(id) {
    $.ajax({
        url: 'http://evening-bastion-5353.herokuapp.com/api/v1/android_app/selectcollection',
        type: 'POST',
        dataType: "json",
        data: JSON.stringify([{ collection_id: id }]),
        success: function (data) {
            localStorage.setItem("qr", JSON.stringify(data));
            window.location.replace("qrs.html");
        },
        error: function (error) {
            alert("No se puede contactar con el servidor. Compruebe su conexión a Internet.");
        },
        complete: function (data) {
        }
    });
}

function read(a)
{
    if(a.indexOf("evening-bastion-5353") !== -1) {
        if(a.indexOf("collections") !== -1) {
            var id = a.substr(a.indexOf("collections/" + "collections".length));

            localStorage.setItem("actualCollection", id);
            send(id);
        } else {
            popup("<p>El código escaneado no pertenece a una colección. Para empezar, escanea el código QR de una colección.</p>")
            $("#bar").hide();
            $('#status').html("Escanear nueva etiqueta");
        }
    } else {
        popup("<p>El código escaneado no es válido y no pertenece a etiquetAR.</p>")
        $("#bar").hide();
        $('#status').html("Escanear nueva etiqueta");
    }
}
qrcode.callback = read;

$("#letsScan").click(function(){
    var activity = new MozActivity({
        name: "pick",

        data: {
            type: "image/jpeg"
        }
    });

    activity.onsuccess = function() {
        $("#bar").show();
        $('#status').html("Escaneando el código QR...")

        var url = URL.createObjectURL(this.result.blob);

        qrcode.decode(url);
    };

    activity.onerror = function() {
    };
} );
if(localStorage.qr != undefined) {
    $('header').prepend('<menu type="toolbar"><a href="#"><span class="icon icon-send">list of collections</span></a></menu>');
}
$('.icon-send').click(function() {
    //popup("hello, probando un dos tres que pasa por aquí, cuatro cinco molo un pinto");
    window.location.replace("qrs.html");
});