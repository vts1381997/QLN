var oracledb = require('oracledb');
var connectString = require('./connect')
module.exports =
    function fnc_SendMail(body, dataSendMail, callback) {
        String.prototype.replaceAll = function (search, replacement) {
            var target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
        };
        var query = "SELECT VALUE_CONFIG_VARCHAR || '" + '|' + "' || (select tendonvi from users u, dm_donvi dv where 1 = 1 And u.diaban = dv.donviid and u.username='" + body.taikhoan + "') as VALUE_CONFIG_VARCHAR FROM QLN_CONFIG  WHERE 1 = 1 AND NAME = 'mail_server_send'";
        var rReturn = 'LOI';
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    rReturn = 'LOI';
                }
                else {
                    var obj = []
                    connection.execute(
                        query, [], async function (error, rows) {
                            if (error) {
                                rReturn = 'LOI'
                            }
                            else {
                                var values = rows.rows
                                var keys = rows.metaData
                                var vICountOfKeys = keys.length;
                                values.forEach(element => {
                                    var obj2 = {}
                                    for (index = 0; index < vICountOfKeys; index++) {
                                        obj2[keys[index].name] = element[index]
                                    }
                                    obj.push(obj2)
                                });
                                //return  JSON.stringify(obj[1])
                                // console.log(obj[0].VALUE_CONFIG_VARCHAR,'df');
                                var vEmailConfig = await JSON.stringify(obj[0].VALUE_CONFIG_VARCHAR).split('|');
                                var passWord = vEmailConfig[1].replaceAll('@', '').replaceAll('!', '').replaceAll('_', '')
                                // console.log(passWord, 'pass day');
                                var nodemailer = require("nodemailer");
                                var transporter = nodemailer.createTransport({
                                    host: "smtp.googlemail.com",// Gmail Host
                                    port: Number(vEmailConfig[2].replace('"', '')),// Port
                                    secure: true,// this is true as port is 465
                                    auth: {
                                        user: vEmailConfig[0].replace('"', ''),//Gmail username
                                        pass: passWord           // Gmail password
                                    }
                                });
                                //Fill req
                                var vTaiKhoan = body.taikhoan;
                                var vDonVi = vEmailConfig[4].replace('"', '');
                                var vEmail = body.email;
                                var vSoDienThoai = body.sodienthoai;
                                var vHoVaTen = body.hovaten;
                                var vNoiDung = body.noidung;
                                // console.log(dataSendMail, 'data send mail');
                                if (!dataSendMail) {
                                    var mailOptions = {
                                        from: vEmailConfig[0].replace('"', ''),        // sender address
                                        to: vEmailConfig[3].replace('"', ''),          // list of receivers
                                        subject: "[Hệ thống Quản lý Nợ chính quyền địa phương] - Hỗ trợ, trợ giúp",        // Subject line
                                        html: "<br>" +
                                            "<b>Thông tin tài khoản________________________</b>" + "<br>" +
                                            "&nbsp; &nbsp;Tài khoản gửi:" + vTaiKhoan + "<br>" +
                                            "&nbsp; &nbsp;Đơn vị:" + vDonVi + "<br>" +
                                            "<b>Thông tin liên hệ__________________________</b>" + "<br>" +
                                            "&nbsp; &nbsp;Họ và tên: " + vHoVaTen + "<br>" +
                                            "&nbsp; &nbsp;Email: " + vEmail + "<br>" +
                                            "&nbsp; &nbsp;Điện thoại: " + vSoDienThoai + "<br>" +
                                            "<b>Nội dung hỏi/ góp ý________________________</b>" + "<br><br>&nbsp; &nbsp;" +
                                            vNoiDung + "<br>" +
                                            "_________________________________________"
                                    };
                                }
                                else {
                                    var mailOptions = {
                                        from: vEmailConfig[0].replace('"', ''),        // sender address
                                        to: dataSendMail.mailTo ? dataSendMail.mailTo : '',          // list of receivers
                                        subject: dataSendMail.subject,
                                        html: dataSendMail.html
                                    };
                                }
                                // console.log(mailOptions, 'mail option');
                                transporter.sendMail(mailOptions, function (err, info) {
                                    if (err) {
                                        // console.log(err);
                                        return;
                                    }
                                    // else console.log(info);
                                    transporter.close();
                                });
                                rReturn = 'OK';
                            }
                        }
                    )
                }
            }
        )
        if (rReturn = 'OK') {
            RESULT = { success: true, message: 'Gửi thành công' }
            callback({ CODE: "0", RESULT })
        }
        else {
            RESULT = { success: false, message: 'Vui lòng gửi lại' }
            callback({ CODE: "400", RESULT })
        }
    }