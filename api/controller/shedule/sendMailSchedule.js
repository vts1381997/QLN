var sendMail = require('../../controller/sendMail')
var Query = require('../../controller/query')
var knex = require('../../configurations/knexConnect')
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}
module.exports = function fnc_scheduleSendMail(callback) {
    var query = "SELECT us.id, us.diaban as donviid, us.email, dv.tendonvi, us.fullname, us.username from users us left join dm_donvi dv on dv.donviid = us.diaban where us.nhanthongbao=1";
    var soDotVayVDBDenHanTraNo = 0;
    var soDotVayKBNNDenHanTraNo = 0;
    var soDotVayTCTCDenHanTraNo = 0;
    var soDotVayQDTDenHanTraNo = 0;
    var soDotVayODADenHanTraNo = 0;
    var soDotVayTPDenHanTraNo = 0;
    knex.raw(query).then(Response => {
        Response.map(value => {
            if (value.EMAIL == null) {
                return;
            }
            else {
                var querySendEmail = "SELECT NTB.USERNAME, NTB.STATUS, US.ID, US.DIABAN AS DONVIID FROM NHANTHONGBAO NTB LEFT JOIN USERS US ON US.USERNAME = NTB.USERNAME WHERE NTB.USERNAME='" + value.USERNAME + "'";
                knex.raw(querySendEmail).then(result => {
                    result.map(value1 => {
                        if (value1.STATUS == null) {
                            return;
                        }
                        else {
                            if (value1.STATUS == formatDate(Date.now())) {
                                Query({ idlogin: value1.id, unitid: value1.donviid }, 'fn_qln_denhantrano', function (rs) {
                                    rs.map(itemCanhBao => {
                                        if (itemCanhBao.DENHANTRANO == 1) {
                                            eval("soDotVay" + itemCanhBao.LOAI.toUpperCase() + "DenHanTraNo = Number(soDotVay" + itemCanhBao.LOAI.toUpperCase() + "DenHanTraNo) + 1")
                                        }
                                    })
                                    var tongSoLan = Number(soDotVayODADenHanTraNo) + Number(soDotVayTPDenHanTraNo) + Number(soDotVayKBNNDenHanTraNo) + Number(soDotVayQDTDenHanTraNo) + Number(soDotVayTCTCDenHanTraNo) + Number(soDotVayVDBDenHanTraNo)
                                    if (Number(tongSoLan) > 0) {
                                        const objSendMail = {
                                            mailTo: value.EMAIL,
                                            subject: "[Hệ thống Quản lý Nợ chính quyền địa phương] - Cảnh báo đến hạn trả nợ!",
                                            html: "<br>" +
                                                "<b>Kính gửi ông/bà: </b>" + value.FULLNAME + "<br>" +
                                                "&nbsp; &nbsp;Người gửi: Quản trị hệ thống Nợ chính quyền địa phương" + "<br>" +
                                                "&nbsp; &nbsp;Đơn vị: " + value.TENDONVI + "<br>" +
                                                "<b>Thông tin cảnh báo đến hạn trả nợ__________________________</b>" + "<br>" +
                                                "<ul>\
                                        <li><b>Vay ODA: "+ soDotVayODADenHanTraNo + " </b></li>\
                                        <li><b>Vay Trái phiếu: "+ soDotVayTPDenHanTraNo + "</b></li>\
                                        <li><b>Vay kho bạc nhà nước: "+ soDotVayKBNNDenHanTraNo + "</b></li>\
                                        <li><b>Vay quỹ dự trữ tỉnh: "+ soDotVayQDTDenHanTraNo + "</b></li>\
                                        <li><b>Vay tổ chức tài chính tín dụng: "+ soDotVayTCTCDenHanTraNo + "</b></li>\
                                        <li><b>Vay VDB: "+ soDotVayVDBDenHanTraNo + "</b></li>\
                                        </ul>"
                                        }
                                        sendMail('', objSendMail, function (rs) {
                                            if (rs.RESULT.message == 'Gửi thành công') {
                                                var abc = [];
                                                var query = "SELECT us.id, us.diaban as donviid, us.email, dv.tendonvi, us.fullname, us.username from users us left join dm_donvi dv on dv.donviid = us.diaban where us.nhanthongbao=1";
                                                knex.raw(query).then(Response => {
                                                    Response.map(value => {
                                                        if (value.EMAIL == null) {
                                                            return;
                                                        }
                                                        else {
                                                            abc.push(value)
                                                            abc.map(value => {
                                                                var queryNhanThongBao = "UPDATE NHANTHONGBAO SET STATUS='" + formatDate(addDays(Date.now(), 3)) + "' WHERE USERNAME='" + value.USERNAME + "'";
                                                                knex.raw(queryNhanThongBao).then(Response => {
                                                                }).catch(err => {
                                                                    console.log(err);
                                                                })
                                                            })
                                                        }
                                                    })
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    })
                })
            }
        })
    })
}