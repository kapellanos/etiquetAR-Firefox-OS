var data = JSON.parse(localStorage.resource);

function submit() {
    alert("we are submit!!!");
}
$('textarea').keyup(function(){
    //get the limit from maxlength attribute

    //get the current text inside the textarea
    var text = $(this).val();
    //count the number of characters in the text
    var chars = text.length;
    //check if there are more characters then allowed
    var charsLeft = 140 - chars;
    $('#counter').html(charsLeft);
    if(charsLeft > 100) {
        $('#counter').css("color", "#0F0");
    } else if(charsLeft > 30) {
        $('#counter').css("color", "#FF8C00");
    } else {
        $('#counter').css("color", "#F00");
    }
});
$('button').click(function() {
    if($('#name').val() && $('#comment').val()) {
        popup("<p>Guardando el comentario en el servidor</p><progress></progress>")
        send(data[0].resourceID, $('#name').val(), $('#comment').val());
    } else {
        popup("<p>Debes rellenar ambos campos para insertar un nuevo comentario</p>");
    }
});

function send(id, name, comment) {
    $.ajax({
        url: 'http://evening-bastion-5353.herokuapp.com/api/v1/android_app/insertcomment',
        type: 'POST',
        dataType: "json",
        data: JSON.stringify([{ resource_id: id, name: name, comment: comment }]),
        success: function (data) {
            refreshComments(id);
        },
        error: function (error) {
            alert("No se puede contactar con el servidor. Compruebe su conexión a Internet.");

        },
        complete: function (data) {
        }
    });
}
function refreshComments(id) {
    $.ajax({
        url: 'http://evening-bastion-5353.herokuapp.com/api/v1/android_app/getcomments',
        type: 'POST',
        dataType: "json",
        data: JSON.stringify([{ resource_id: id }]),
        success: function (data) {
            localStorage.setItem("comments", JSON.stringify(data));
            window.location.replace("comments.html");
        },
        error: function (error) {
            alert("No se puede contactar con el servidor. Compruebe su conexión a Internet.");
        },
        complete: function (data) {
        }
    });
}