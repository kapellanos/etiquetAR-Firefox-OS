$(document).ready(function () {

    // if user clicked on button, the overlay layer or the dialogbox, close the dialog
    $('a.button').click(function () {
        $('.dialog-overlay, .dialog-box').css("display", "none");
        return false;
    });

    // if user resize the window, call the same function again
    // to make sure the overlay fills the screen and dialogbox aligned to center
    $(window).resize(function () {

        //only do it if the dialog box is not hidden
        //if (!$('.dialog-box').is(':hidden')) popup();
    });

});

//Popup dialog
function popup(message) {

    // get the screen height and width
    var maskHeight = window.innerHeight;
    var maskWidth = window.innerWidth;

    // calculate the values for center alignment
    var dialogTop =  (maskHeight/4);
    var dialogLeft = (maskWidth/5);

    // assign values to the overlay and dialog box
    $('.dialog-overlay').css({height:maskHeight, width:maskWidth, display:"block"});
    $('.dialog-box').css({top:dialogTop, left:dialogLeft, display:"block"});

    // display the message
    $('.dialog-message').html(message);
}
