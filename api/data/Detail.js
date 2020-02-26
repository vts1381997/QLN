var oracledb = require('oracledb');
var connectString = require('../controller/connect')
var uuid = require('uuid')
var dateFormat = require('dateformat');
var Detail = {
    DotphtpDetail: (id, callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                query = "select daph.menhgia,detail.*\
                 from  qln_dotphathanhtraiphieu dph\
                 left join qln_dotphathanhtraiphieu_chitiet detail on dph.ma = detail.dotphathanhtraiphieuid\
                 left join qln_deanphathanhtraiphieu daph on daph.deanphathanhtraiphieuid = dph.deanphathanhtraiphieuid \
                 where detail.dotphathanhtraiphieuid ='"+ id + "'"
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []

                            var vICountOfKeys = keys.length;

                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.NGAYMUA = dateFormat(obj2.NGAYMUA, "yyyy-mm-dd")
                                obj2.NGAYDAOHAN = dateFormat(obj2.NGAYMUA, "yyyy-mm-dd")
                                obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                            connection.close();
                        }
                        else {
                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                            connection.close();
                        }
                    }
                )

            }
        )
    },
    GetToChuc: (id, callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                query = "SELECT dphct.*,\
                tcmuatp.tochuc,\
                daph.menhgia,\
                daph.kyhanthanhtoan,\
                daph.phuongthuctralai,\
                daph.phuongthuctragoc,\
                daph.ngaykyhantraiphieu,\
                dphtp.LAISUATPHTHANHCONG,\
                daph.ten,\
                dphtp.ngayphathanh,\
                dphtp.ten     AS tendph,\
                dphgl.TRALAI,\
                nvl(dphgl.TIENTRAGOC,0) as TIENGOC\
           FROM qln_dotphathanhtraiphieu_chitiet  dphct\
                left JOIN dm_tochucmuatp tcmuatp\
                    ON tcmuatp.tochucmuatpid = dphct.tochuctaichinhid\
               left  JOIN qln_dotphathanhtraiphieu dphtp\
                    ON dphtp.ma = dphct.dotphathanhtraiphieuid\
                left JOIN qln_deanphathanhtraiphieu daph\
                    ON daph.deanphathanhtraiphieuid = dphtp.deanphathanhtraiphieuid\
                    left  JOIN (select max(gl.TRALAI) as TRALAI, gl.UUID,sum(gl.TIENTRAGOC) as TIENTRAGOC from qln_dotphathanhtraiphieu_goclai gl group by gl.UUID ) dphgl\
                    ON dphgl.UUID = dphct.UUID\
          WHERE dphct.tochuctaichinhid = '"+ id + "'"
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []

                            var vICountOfKeys = keys.length;

                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }

                                if(obj2.KYHANTHANHTOAN){
                                    obj2.KYHANTHANHTOAN= dateFormat(obj2.KYHANTHANHTOAN, "dd/mm/yyyy")
                                } 
                                if(obj2.NGAYMUA){
                                    obj2.NGAYMUA= dateFormat(obj2.NGAYMUA, "dd/mm/yyyy")
                                } 
                                if(obj2.TRALAI){
                                    obj2.TRALAI= dateFormat(obj2.TRALAI, "dd/mm/yyyy")
                                } 
                                if(obj2.NGAYPHATHANH){
                                    obj2.NGAYPHATHANH= dateFormat(obj2.NGAYPHATHANH, "dd/mm/yyyy")
                                } 
                                // obj2.NGAYMUA = dateFormat(obj2.NGAYMUA, "dd/mm/yyyy")
                                // obj2.TRALAI = dateFormat(obj2.TRALAI, "dd/mm/yyyy")
                                obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                            connection.close();
                        }
                        else {
                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                            connection.close();
                        }
                    }
                )

            }
        )
    },
    UpdateTC: (id, callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    console.error(err.message);
                    return;
                }
                query = "select dphct.* ,tcmuatp.tochuc,daph.menhgia,daph.kyhanthanhtoan,daph.phuongthuctralai,daph.phuongthuctragoc,dphtp.LAISUATPHTHANHCONG,daph.ten,dphtp.ten as tendph\
                from qln_dotphathanhtraiphieu_chitiet dphct \
                 join dm_tochucmuatp tcmuatp on tcmuatp.tochucmuatpid = dphct.tochuctaichinhid\
                 join qln_dotphathanhtraiphieu dphtp on dphtp.ma = dphct.dotphathanhtraiphieuid\
                 join qln_deanphathanhtraiphieu daph on daph.deanphathanhtraiphieuid = dphtp.deanphathanhtraiphieuid where dphct.tochuctaichinhid='"+ id + "'"
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []

                            var vICountOfKeys = keys.length;

                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.KYHANTHANHTOAN = dateFormat(obj2.KYHANTHANHTOAN, "dd/mm/yyyy")
                                obj2.NGAYMUA = dateFormat(obj2.NGAYMUA, "dd/mm/yyyy")
                                obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                            connection.close();
                        }
                        else {
                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                            connection.close();
                        }
                    }
                )

            }
        )
    },
    saveDotPHTP: (dataa, callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                query = "insert into qln_dotphathanhtraiphieu values(:DOTPHATHANHTRAIPHIEUID,:MA,:TEN,:SOQUYETDINH,:NGAYQUYETDINH,:KLPHDUKIEN,:KLPHTHANHCONG,:LAISUATPHDUKIEN,:LAISUATPHTHANHCONG,:KYHANTRAIPHIEU,:TENTOCHUCPHATHANH,:TIENTHUCNHAN,:GHICHU,:TINHTHANHID,:DEANPHATHANHTRAIPHIEUID,:TOCHUCPHTPID,:STATUS,:NOTE,:CREATEDDATE,:CREATEDBY,:UPDATEDDATE,:UPDATEDBY,:THOIHANTRAIPHIEU,:NGAYPHATHANH,:PHUONGTHUCPHATHANH,:KLDAOHANTHANHCONG)"
                connection.execute(
                    query, dataa, { autoCommit: true }, function (error, rows) {
                        if (error) {
                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                        }
                        else {
                            var RESULT = [
                                { MESSAGE: "Thêm mới thành công" }
                            ]



                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT })
                        }
                    }
                )

            }
        )
    },
    traLaiGoc: (dataa,laigoc, callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }

                query = "insert into qln_dotphathanhtraiphieu_goclai values(:DOTPHATHANHTRAIPHIEUID,:TOCHUCTAICHINHID,to_date(:NGAYMUA,'dd/MM/yyyy'),to_date(:TRAGOC,'dd/MM/yyyy'),to_date(:TRALAI,'dd/MM/yyyy'),:GHICHU,to_date(:NGAYTRA,'dd/MM/yyyy'),:TIENTRAGOC,:TIENTRALAI,:MENHGIA,:UUID)"
                connection.execute(
                    query, dataa, { autoCommit: true }, function (error, rows) {
                        if (error) {
                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                        }
                        else {
                            if(laigoc==0){
                                var RESULT = [
                                    { MESSAGE: "Trả lãi thành công" }
                                ]
                            }
                          else{
                            var RESULT = [
                                { MESSAGE: "Trả gốc và trả lãi thành công" }
                            ]
                          }



                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT })
                        }
                    }
                )

            }
        )
    },




}

module.exports = Detail;