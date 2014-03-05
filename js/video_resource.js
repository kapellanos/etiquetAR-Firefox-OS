/**
 * Created by moc on 03/12/13.
 */
var data = JSON.parse(localStorage.resource);
var videoURI= data[0].uri;
var videoID = videoURI.substr(videoURI.indexOf("v=") + 2);
var url ="http://www.youtube.com/embed/" + videoID + "?autoplay=1";
$('#ytplayer').attr("src", url);
$('.resource_name').html(data[0].name);
$('.info').append(data[0].info);
$('.icon-menu').click(function() {
    send(data[0].resourceID);
});

function send(id) {
    $.ajax({
        url: 'http://evening-bastion-5353.herokuapp.com/api/v1/android_app/getcomments',
        type: 'POST',
        dataType: "json",
        data: JSON.stringify([{ resource_id: id }]),
        success: function (data) {
            localStorage.setItem("comments", JSON.stringify(data));
            localStorage.setItem("previous_activity", "video");
            window.location.replace("comments.html");
        },
        error: function (error) {
            alert("No se puede comunicar con el servidor. Compruebe su conexión a Internet.");
        },
        complete: function (data) {
        }
    });
}