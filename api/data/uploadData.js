var oracledb = require('oracledb');
var connectString = require('../controller/connect')
var dateFormat = require('dateformat');
var uuid = require('uuid')

var uploadData = {
    uploadData: (body, callback) => {
        var obj = {}
        obj.ID = uuid();
        obj.FILENAME = body.FILENAME
        obj.URL = body.URL
        obj.TBLNAME = body.TBLNAME
        obj.IDROWTABLE = body.IDROWTABLE
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                query = "insert into attach_file(ID,FILENAME,URL,TBLNAME,IDROWTABLE) values(:ID,:FILENAME,:URL,:TBLNAME,:IDROWTABLE)"
                connection.execute(
                    query, obj, { autoCommit: true }, function (error, rows) {
                        if (error) {
                            callback({ success: false, message: 'Lỗi hệ thống' })

                        }
                        else { 
                            callback({ success: true, message: 'Thêm mới thành công' })
                        }
                    }
                )
            }
        )
    },
    updateFile: (body, callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                query = "update attach_file set url='" + body.URL + "',name where id ='" + body.ROWID + "'"
                connection.execute(
                    query,[], { autoCommit: true }, function (error, rows) {
                        if (error) {
                            callback({ success: false, message: 'Lỗi hệ thống' })

                        }
                        else { 
                            callback({ success: true, message: 'Sửa thành công' })
                        }
                    }
                )
            }
        )
    },


}



module.exports = uploadData;