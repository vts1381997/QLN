
$(document).ready(function () {
    var URL = {
        api_getalldenhanvay: CONFIG_API.URL.BASE_API + 'qln/denhantrano'
    }
    var res_noti = DATA.get(URL.api_getalldenhanvay)
    var vdb = []
    var kbnn = []
    var tctc = []
    var oda = []
    var qdt = []
    var tp = []
    var tong_noti = 0
    try {
        res_noti.map(function (item, index) {
            if (item.DENHANTRANO + '' === '1') { eval(item.LOAI + '.push(item)') }
            if (item.DENHANTRANO + '' === '1') { tong_noti = Number(tong_noti) + 1 }
        })
    }
    catch (err) {
        console.log(err)
    }

    $('#nt_vdb').html(vdb.length > 5? '5+': vdb.length)
    $('#nt_tctc').html(tctc.length > 5? '5+': tctc.length)
    $('#nt_kbnn').html(kbnn.length > 5? '5+': kbnn.length)
    $('#nt_qdt').html(qdt.length > 5? '5+': qdt.length)
    if (Number(tong_noti) === 0) {
        $('.btn-notification').hide()
    } else {
        $('.btn-notification').show()
        if(Number(tong_noti) < 6)
            $('.btn-notification span').html(tong_noti)
        else
            $('.btn-notification span').html('5+')
    }
    $('.btn-notification').click(function () {
        $('.notification .slider-left').css('width', (window.innerWidth) * 0.3)
        $('.notification .slider-left').toggle();
    })
})