$(document).ready(function () {
    $(".number-counters").appear(function () {
        $(".number-counters [data-to]").each(function () {
            var e = $(this).attr("data-to");
            $(this).delay(6e3).countTo({
                from: 0,
                to: e,
                speed: 3e3,
                refreshInterval: 200
            })
        })
    });


});

