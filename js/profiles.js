var data = JSON.parse(localStorage.profiles);
for(var i = 0; i < data.length; i++) {
    $('#menuProfiles').append("<button type='button' id='profile_" + data[i].profileID +"'>" + data[i].profileName + "</button>");
}
$('#menuProfiles').append("<input type='hidden' id='qr_id' value='" + data[0].qr_id + "'></input>");
$('#menuProfiles').append("<button type='button' id='cancel'>Cancelar</button>");

function send(id, profile_id) {
    $.ajax({
        url: 'http://evening-bastion-5353.herokuapp.com/api/v1/android_app/selectresource',
        type: 'POST',
        dataType: "json",
        data: JSON.stringify([{ qr_id: id, profile_id: profile_id }]),
        success: function (data) {
            localStorage.setItem("resource", JSON.stringify(data));
            var newData = JSON.parse(JSON.stringify(data));
            if(newData[0].content_type == "video") {
                window.location.replace("video_resource.html");
            } else if (newData[0].content_type == "image") {
                window.location.replace("image_resource.html");
            }
        },
        error: function (error) {
            alert("No se puede comunicar con el servidor. Compruebe su conexión a Internet.");
        },
        complete: function (data) {
        }
    });
}

$("button[id^='profile_']").each(function() {
    var id = parseInt(this.id.replace("profile_", ""));
    $("#profile_" + id).click(function() {
        send($('#qr_id').val(), id);
    });
});

$('#cancel').click(function() {
    window.location.replace("qrs.html");
});