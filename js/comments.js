var data = JSON.parse(localStorage.comments);
if(data.length == 0) {
    $('.list_comments').append("<p class='no_comments'>No hay comentarios. ¡Añade el primero <a href='#' class='icon-add'>pulsando aquí</a> o en el botón de la barra superior!");
}
for(var i = 0; i < data.length; i++) {
    var date = data[i].created_at;
    var twoSections = date.split('T');
    var date = twoSections[0].split('-');
    var time = twoSections[1].split(':');
    // Se elimina el carácter extra que manda el servidor
    time[2] = time[2].substr(0, time[2].length - 1);
    $('.list_comments').append("<div class='comment_content'><p class='author_comment'>Escrito por <strong>" + data[i].name + "</strong> el día " + date[2] + "/" + date[1] + "/" + date[0] + " a las " + time[0] + ":" + time[1] + ":" + time[2] + "</p><p class='content_comment'>" + data[i].comment +  "</p></div>");
}

$('.icon-add').click(function() {
    window.location.replace("new_comment.html");
});
if(localStorage.previous_activity == "image") {
    $('#back').attr("href", "image_resource.html");
} else {
    $('#back').attr("href", "video_resource.html");
}