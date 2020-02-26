$(function () {

    $('#btnVideo').on('click', function () {
        $('#modalVideo').modal('show'); 
    });

    $('#btnTest').on('click', function () {
        $('#modalTest').modal('show'); 
    });

    $('#btnAudio').on('click', function () {
        $('#modalAudio').modal('show'); 
    });

    $('#btnContent').on('click', function () {
        $('#modalContent').modal('show'); 
    });

    $('#btnRecord').on('click', function () {
        $('#modalRecord').modal('show'); 
    });

    /* js custom css section statictical of profile*/
    $('.custom-question-content').height(500).css('min-height', 500);
    var sizeHeight = $('.custom-question-content').height() + 100;
    $('.custom-question-sidebar').height(sizeHeight).css('min-height', sizeHeight);

    $(".table-body .custom-table-item").click(function () {
        var child = $(this).children('.thead').hasClass('active');
        var sizeBar = $('.custom-question-content').height() + 300;
        if (child === true) {
            $('.custom-question-sidebar').height(sizeBar).css('min-height', sizeBar);
        } else {
            $('.custom-question-sidebar').height(sizeHeight).css('min-height', sizeHeight);
        }
    });

    $(window).resize(function () {
        var sizeBarContent = $('.custom-question-content').height() + 200;
        // console.log(sizeHeight);
        $('.custom-question-sidebar').height(sizeBarContent).css('min-height', sizeBarContent);
    });

    
    /*end js custom css section statictical of profile */

//     js outline
    // $('.name-video').click(function () {
    //     event.preventDefault();
    //     $('html,body').animate({scrollTop: 250}, 500);
    //     var pre = $(this).attr("id");
    //     var id = "#" + pre;
    //     var title = $(this).text().trim();
    //     $(".modal-title").text(title);
    //     $(id).parents(".o-view").addClass("active");
    //     $(id).parents(".o-view").children(".count").addClass("active");
    //     $(this).parents(".list-body").children(".div-x").children().addClass("md-check-2");

    //     var link = $(this).attr("link");
    //     var src = "https://www.youtube.com/embed/" + link;
    //     $('.embed-responsive-item').attr("src", src);
    //     $.ajax({
    //         url: ROOT_URL + 'index.php?module=default&controller=course&action=setCookieView',
    //         type: 'POST',
    //         data: {videoId: pre},
    //         success: function (data) {
    //             // console.log(data);
    //         }
    //     });

    // });

    $('.div-x').click(function () {
        var id = $(this).parents(".list-body").children().children(".name-video").attr("id");
        var checked = $(this).children().toggleClass("md-check-2");
        $(this).parents(".o-view").toggleClass("active");
        $(this).parents(".o-view").children(".count").toggleClass("active");
        if (checked[0].className == "icon md-check-2") {
            $.ajax({
                url: ROOT_URL + 'index.php?module=default&controller=course&action=setCookieView',
                type: 'POST',
                data: {'videoId': id},
                success: function (data) {
                    // console.log(data);
                }
            })
        } else {
            $.ajax({
                url: ROOT_URL + 'index.php?module=default&controller=course&action=setCookieView',
                type: 'POST',
                data: {deleteId: id},
                success: function (data) {
                    // console.log(data);
                }
            })
        }

    })
    // end js outline
    // $('.tabs-page .nav-tabs li a').click(function () {
    //     var text = $(this).attr("href");
    //     $.ajax({
    //         url: ROOT_URL + 'index.php?module=default&controller=course&action=activeMenu',
    //         type: 'POST',
    //         data: {nameMenu: text},
    //         success: function (data) {
    //             // console.log(data);
    //         }
    //     });

    // });
    // js compute point
    // $('.section-list .name-video').click(function () {
    //     var idVideo = $(this).attr('id');
    //     $.ajax({
    //         url: ROOT_URL + 'index.php?module=default&controller=course&action=point',
    //         type: 'POST',
    //         dataType: "text",
    //         data: {idVideo: idVideo},
    //         success: function (data) {
    //             // notify course plus point
    //             if (data == "yes") {
    //                 noticeUser(NOTICE_USER_VIEW_VIDEO);
    //             }


    //         }
    //     })


    // })
    // video yêu thích và bỏ yêu thích
    $(".favorite-course").click(function () {
        var id = infoUser;
        var nameCourse = nameOne;
        var linkCourse = $(location).attr('href');
        var courseId = idCourse;
        var check = $(this).children().attr('class');

        if (check == 'fa fa-heart-o') {
            $(this).children().attr('class', 'fa fa-heart');
            noticeUser(NOTICE_USER_FAVORITE_COURSE);

        } else if (check == 'fa fa-heart') {
            $(this).children().attr('class', 'fa fa-heart-o');
            noticeUser(NOTICE_USER_REMOVE_FAVORITE_COURSE);
        }
        $.ajax({
            url: ROOT_URL + 'index.php?module=default&controller=course&action=favoriteCourse',
            dataType: 'text',
            data: {
                idCourse: courseId,
                nameCourse: nameCourse,
                linkCourse: linkCourse,
                idUser: id
            },
            success: function (data) {

            }

        })

    })
//load ajax học viên
    $(window).load(function () {
        if (typeof idCourse != 'undefined') {
            var course = idCourse;

            var load = nameMenu;
            if (load == '#student') {
                $.ajax({
                    url: ROOT_URL + 'index.php?module=default&controller=course&action=student',
                    type: 'post',
                    dataType: 'html',
                    data: {course: course},
                    success: function (data) {
                        $("#student").html(data);
                    }
                });
            }
        }
    });
    var isLoad = false;
    $(".tab-student").click(function () {
        var course = idCourse;

        if (isLoad == false) {
            $.ajax({
                url: ROOT_URL + 'index.php?module=default&controller=course&action=student',
                type: 'post',
                dataType: 'html',
                data: {course: course},
                success: function (data) {
                    $("#student").html(data);
                    isLoad = true;
                }
            });


        }
    });


});

//notify
function noticeUser(message) {
    $.notify({
        // options
        // icon: 'https://zendvn.com/wp-content/uploads/2016/12/zendvn-logo3.png',

        message: message
    }, {
        // settings
        type: 'info',
        z_index: 2000,
        placement: {
            from: "bottom",
            align: "right"
        },
        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutUp'
        },
        icon_type: 'image',
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<img data-notify="icon" class="img-circle pull-left">' +
        '<span data-notify="title">{1}</span>' +
        '<span data-notify="message">{2}</span>' +
        '</div>'
    });
}



