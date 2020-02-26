$(function () {

    // show - hide back to top
    $(window).scroll(function () {
        if ($("html").scrollTop() > screen.height)
            $(".back-to-top i").show();
        else {
            $(".back-to-top i").hide();
        }
    });

    $(".back-to-top i").click(function () {
        $('html,body').animate({
            scrollTop: 0
        }, 1000);
        return 0;
    })

    //Share Facebook
    $(".facebook").click(function (e) {
        url = $(".fb-xfbml-parse-ignore").attr("href");
        window.open(url, 'name', 'height=255,width=250,left=' + $("body").width() / 2 + ',top:' + screen.height / 2);
        e.preventDefault();
    });

    // Active Category
    $("#categories-content li.category-" + getUrlVar("id")).addClass("current");





})

//submit Form
function submitForm(url) {
    $('#adminForm').attr('action', url);
    $('#adminForm').submit();
}

//get URL
function getUrlVar(key) {
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.href);
    return result && unescape(result[1]) || "";
}

//disableF5
function disableF5(e) {
    if ((e.which || e.keyCode) == 116 || (e.which || e.keyCode) == 82) e.preventDefault();
};
