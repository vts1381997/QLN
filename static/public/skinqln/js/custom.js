var expandMenu;
(function($) {
    "use strict";
    if ($('.scroll-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('.scroll-top').addClass('show');

                } else {
                    $('.scroll-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function() {
            backToTop();
            
        });
        $('.scroll-top').on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }
    
    $(".nav-toggle").click(function(){
        if($(this).hasClass("active")){
            $(this).removeClass("active");
            $(".header .menus").removeClass("open");    
            $(".overlay-common").removeClass("show"); 
        }else{
            $(this).addClass("active");
            $(".header .menus").addClass("open");    
            $(".overlay-common").addClass("show"); 
        }
        

    });
    $(".overlay-common").click(function(){
        $(".header .menus").removeClass("open");
        $(".nav-toggle").removeClass("active");
        $(this).removeClass("show");
    });
    $(".header .down").click(function(){
        $(this).toggleClass("active");
        $(this).parent().siblings().removeClass("active");
        $(this).parent().toggleClass("active");
    });
    

})(jQuery);

jQuery(document).ready(function($) {
    // Set initial zoom level
    var zoom_level = 100;

    // Click events
    $('#zoom_in').click(function() { zoom_page(10, $(this)) });
    $('#zoom_out').click(function() { zoom_page(-10, $(this)) });
    $('#zoom_reset').click(function() { zoom_page(0, $(this)) });
    
    $(".btn-print").click(function(){
        window.print();
    });

    
    // Zoom function
    function zoom_page(step, trigger) {
        // Zoom just to steps in or out
        if (zoom_level >= 120 && step > 0 || zoom_level <= 80 && step < 0) return;

        // Set / reset zoom
        if (step == 0) zoom_level = 100;
        else zoom_level = zoom_level + step;

        // Set page zoom via CSS
        $('.page-print').css({
            transform: 'scale(' + (zoom_level / 100) + ')', // set zoom
            transformOrigin: '50% 0' // set transform scale base
        });

        // Adjust page to zoom width
        if (zoom_level > 100) $('.page-print').css({ width: (zoom_level * 1.2) + '%' });
        else $('.page-print').css({ width: '100%' });

        // Activate / deaktivate trigger (use CSS to make them look different)
        if (zoom_level >= 120 || zoom_level <= 80) trigger.addClass('disabled');
        else trigger.parents('ul').find('.disabled').removeClass('disabled');
        if (zoom_level != 100) $('#zoom_reset').removeClass('disabled');
        else $('#zoom_reset').addClass('disabled');
    }
});

        
