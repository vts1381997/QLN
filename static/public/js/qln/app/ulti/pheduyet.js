

$(document).ready(function () {
    const apiReject = CONFIG_API.URL.BASE_API + 'qln/reject'
    const apiApprove = CONFIG_API.URL.BASE_API + 'qln/approve'
    const apiHistoryApprove = CONFIG_API.URL.BASE_API + 'qln/historyapprove'
    const UPDATE_APPROVE = CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/update_approve'
    var paramPostReject = {}
    var paramPostApprove = {}
    var paramPostReSentApprove = {}
    var paramPostSentApprove = {}
    var paramPostSeeApprove = {}

    function update_approve(sKey, i) {
        var rs = DATA.set(UPDATE_APPROVE, { key: sKey, id: i });
        return rs
    }
    $('td .btn').parent().css('text-align', 'center')

    $('body').on('click', '.btnReject', function (e) {
        e.preventDefault()
        e.stopPropagation()
        let id = Number($(this).attr('data-row-id'))
        update_approve(id, 2);
        bindGrid($(this).attr('data-namefuntion'))
        $('#modalRject #btnConfirmReject').attr('data-id', $(this).attr('data-row-id')).attr('data-tb', $(this).attr('data-nametb')).attr('data-namefuntion', $(this).attr('data-namefuntion'))
        $('#modalRject #DECRIPTION').val('')
        $("#modalRject").modal();
        $('#modalRject .modal-content').attr('style', "")
    })
    $('body').on('click', '#modalRject', function (e) {
        e.preventDefault()
        e.stopPropagation()
        $("#modalRject").modal('hide');
        paramPostReject = { uid: jwt.id, unitid: jwt.unitid }
    })

    $('body').on('click', '#modalRject .modal-content', function (e) {
        e.preventDefault()
        e.stopPropagation()
    })

    $('#modalRject #btnConfirmReject').click(function (e) {
        e.stopPropagation()
        e.preventDefault()
        paramPostReject.rowid = Number($(this).attr('data-id'))
        paramPostReject.tbname = $(this).attr('data-tb')
        paramPostReject.description = $('#modalRject #DECRIPTION').val()
        var _res = DATA.get(apiReject, paramPostReject)
        $("#modalRject").modal('hide');
        bindGrid($(this).attr('data-namefuntion'))
    })

    $('body').on('click', '.btnApprove', function (e) {
        e.stopPropagation()
        e.preventDefault()
        paramPostApprove.rowid = Number($(this).attr('data-row-id'))
        paramPostApprove.tbname = $(this).attr('data-nametb')
        let id = Number($(this).attr('data-row-id'))
        let response = update_approve(id, 1)
        if (response) {
            // console.log()
            DATA.get(apiApprove, paramPostApprove)
        }
        bindGrid($(this).attr('data-namefuntion'))
        // console.log('paramPostApprove', paramPostApprove)
        // // var _res = DATA.get(apiApprove, paramPostApprove)
        // bindGrid($(this).attr('data-namefuntion'))
    })
    $('body').on('click', '.btnReSendApprove', function (e) {
        // e.preventDefault()
        // e.stopPropagation()
        // paramPostReSentApprove.rowid = Number($(this).attr('data-row-id'))
        // paramPostReSentApprove.tbname = $(this).attr('data-nametb')
        // var _res = DATA.get(apiApprove, paramPostReSentApprove)
        // bindGrid($(this).attr('data-namefuntion'))
    })
    $('body').on('click', '.btnSendApprove', function (e) {
        let id = Number($(this).attr('data-row-id'))
        update_approve(id, 0)
        bindGrid($(this).attr('data-namefuntion'))
        // e.preventDefault()
        // e.stopPropagation()
        // paramPostSentApprove.rowid = Number($(this).attr('data-row-id'))
        // paramPostSentApprove.tbname = $(this).attr('data-nametb')
        // var _res = DATA.get(apiApprove, paramPostSentApprove)
        // bindGrid($(this).attr('data-namefuntion'))
    })
    $('body').on('click', '.btnSeeApprove', function (e) {
        e.preventDefault()
        e.stopPropagation()
        paramPostSeeApprove.i_rowid = Number($(this).attr('data-row-id'))
        paramPostSeeApprove.tbname = $(this).attr('data-nametb')
        var _res = DATA.get(apiHistoryApprove, paramPostSeeApprove)
        var list_tr = ''
        var ttpd = ''
        _res.map(function (item, index) {
            ttpd = item.TRANGTHAIMOI + '' === '1' ? '<a class="btn btn-success">Đồng ý phê duyệt</a>' : '<a class="btn btn-danger">Từ chối phê duyệt</a>'
            list_tr = list_tr + '<div class="row-detail-tbody"><div class="col-sm-3">' + item.FULLNAME + '</div>' + '<div class="col-sm-3">' + item.TENDONVI + '</div>' + '<div class="col-sm-2">' + item.NGAYPHEDUYET + '</div>' + '<div class="col-sm-2">' + ttpd + '</div>' + '</div>' + '<div class="col-sm-2">' + (item.DESCRIPTION ? item.DESCRIPTION : ' ') + '</div></div>'
        })
        if ($('#detail-' + paramPostSeeApprove.i_rowid).attr('id') === undefined) {
            if (_res.length > 0) {
                $('<tr style="width: 100%" id="detail-' + paramPostSeeApprove.i_rowid + '"><td style="width: 100%; border: 2px solid #6e97d0" colspan="' + $('#Grid01 thead th').length + '">' + '<div><h2 style="display: block;; font-weight: bold; font-size: 16px; margin-bottom: 10px">Lịch sử phê duyệt</h2><div> ' + '<div class="row-detail-head"><div class="col-sm-3">Cán bộ phê duyệt</div>' + '<div class="col-sm-3">Đơn vị phê duyệt</div>' + '<div class="col-sm-2">Ngày phê duyệt</div>' + '<div class="col-sm-2">Trạng thái phê duyệt</div> ' + '<div class="col-sm-2">Lí do từ chối</div>' + '</div>' + list_tr + '</div> </div>').insertAfter($($(this).parent().parent()))
            }
        } else {
            $('#detail-' + paramPostSeeApprove.i_rowid).remove()
        }
    })
})

function bindGrid(namfn) {
    var functionBindView;
    eval('functionBindView = new ' + namfn + '(true)')
    setTimeout(() => {
        try {
            functionBindView.bindGrid01(false)
        } catch (err) {
            console.log(err)
        }
    }, 300);

}