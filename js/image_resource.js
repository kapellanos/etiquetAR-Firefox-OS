var data = JSON.parse(localStorage.resource);
$('#image').attr('src', data[0].uri);
$('#image').width("100%");
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
            localStorage.setItem("previous_activity", "image");
            window.location.replace("comments.html");
        },
        error: function (error) {
            alert("error here" + error);
        },
        complete: function (data) {
        }
    });
}