var oracledb = require('oracledb');
var connectString = require('../controller/connect')
var dateFormat = require('dateformat');
var uuid = require('uuid')
var userData = {
    getUser: (body, bd, callback) => {
        if (bd.length == 0) {
            bd = "''"
        }
        var query = ''
        var listtttt = []
        if (body.tinhthanh) {
            listtttt = body.tinhthanh.split('@').map(val => {
                return "'" + val + "'"
            })
            query = "select rl.tenlv,us.*,dv.tendonvi,tt.ten,u.username as NGUOITAO \
            from users us \
            left join dm_donvi dv on dv.donviid = us.diaban\
            left join role_level rl on rl.lvl = us.lvl\
            left join dm_tinhthanh tt on tt.tinhthanhid = dv.tinhthanhid \
            left join users u on u.id = us.createdby where us.diaban in("+ bd + ") and us.diaban <> '" + body.unitid + "' and us.tinhthanhid in(" + listtttt + ") order by us.username"
        }
        else {
            if (body.unitid == 'beac614d-c7de-4cbd-b3ec-33fa670e726c') {
                query = "select rl.tenlv,us.*,dv.tendonvi,tt.ten,u.username as NGUOITAO \
                from users us \
                left join dm_donvi dv on dv.donviid = us.diaban\
                left join role_level rl on rl.lvl = us.lvl\
                left join dm_tinhthanh tt on tt.tinhthanhid = dv.tinhthanhid \
                left join users u on u.id = us.createdby where us.diaban in("+ bd + ") order by us.username"
            }
            else {
                query = "select rl.tenlv,us.*,dv.tendonvi,tt.ten,u.username as NGUOITAO \
            from users us \
            left join dm_donvi dv on dv.donviid = us.diaban\
            left join role_level rl on rl.lvl = us.lvl\
            left join dm_tinhthanh tt on tt.tinhthanhid = dv.tinhthanhid \
            left join users u on u.id = us.createdby where us.diaban in("+ bd + ") and us.diaban <> '" + body.unitid + "' order by us.username"
            }
        }
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows;
                            var keys = rows.metaData;
                            var obj = [];
                            var vICountOfKeys = keys.length; 
                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                if (obj2.CREATEDDATE) {
                                    obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT")
                                }
                                obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                        }
                    }
                )
            }
        )
    },
    getUser1: (body, bd, callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                query = "select  rl.tenlv,us.*,dv.tendonvi,tt.ten,u.username as NGUOITAO \
                from users us \
                left join dm_donvi dv on dv.donviid = us.diaban\
                left join role_level rl on rl.lvl = us.lvl\
                left join dm_tinhthanh tt on tt.tinhthanhid = dv.tinhthanhid \
                left join users u on u.id = us.createdby where us.diaban='"+ body.unitid + "' and us.lvl>" + body.level + ""
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
                                if (obj2.CREATEDDATE) {
                                    obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT")
                                }
                                obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                        }
                    }
                )
            }
        )
    },
    getUser2: (body, bd, callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                query = "select rl.tenlv,us.*,dv.tendonvi,tt.ten,u.username as NGUOITAO \
                from users us \
                left join dm_donvi dv on dv.donviid = us.diaban\
                left join role_level rl on rl.lvl = us.lvl\
                left join dm_tinhthanh tt on tt.tinhthanhid = dv.tinhthanhid \
                left join users u on u.id = us.createdby where us.id='"+ body.idlogin + "'"
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
                                if (obj2.CREATEDDATE) {
                                    obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT")
                                }
                                obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                        }
                    }
                )
            }
        )
    },
    getdvcha: (id, callback) => {
        let query = ''
        let bd = id.donvi.map(val => {
            return "'" + val + "'"
        })
        if (id.tinhthanh) {
            var listtinh = id.tinhthanh.split('@')
            query = "select dv.donviid,dv.tendonvi,tt.ten,tt.tinhthanhid as tinhthanh\
            from dm_donvi dv\
            left join dm_tinhthanh tt on tt.tinhthanhid = dv.tinhthanhid where dv.tinhthanhid in("+ listtinh + ") and dv.donviid in (" + bd + ")"
        } else {
            query = "select dv.donviid,dv.tendonvi,tt.ten,tt.tinhthanhid as tinhthanh\
            from dm_donvi dv\
            left join dm_tinhthanh tt on tt.tinhthanhid = dv.tinhthanhid where dv.donviid in ("+ bd + ")"
        }
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
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
                                obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                        }
                    }
                )
            }
        )
    },
    getLevel: (id, callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                query = "select lvl,tenlv from role_level "
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
                                obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                        }
                    }
                )
            }
        )
    },
    getUserbyid: (id, callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                query = "select password from users where id='" + id.idlogin + "'"
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
                                obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                        }
                    }
                )
            }
        )
    },
    checkRole: (id, callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                query = "select r.name as role,a.name as action\
                from role_user_group rug\
                join role_action ra on ra.ID=rug.ROLE_ACTION_CODE\
                join dm_role r on r.id = ra.role_code\
                join actions a on a.id = ra.action_code\
                join users u on u.id  = rug.user_code\
                where rug.user_code ='"+ id + "'"
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
                                obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                        }
                    }
                )
            }
        )
    },
    checkToken: (id, callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                query = "select r.name as role, a.name as action\
                from role_user_group rug\
                left join role_action ra on ra.id=rug.ROLE_ACTION_CODE\
                left join dm_role r on r.id = ra.role_code\
                left join actions a on a.id = ra.action_code\
                 where rug.user_code = '"+ id + "' and rug.type='ROLE'"
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
                                obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                        }
                    }
                )
            }
        )
    },
    getTinh: (id, callback) => {
        if (id) {
            var list = id.split('@').map(val => {
                return "'" + val + "'"
            })
            var query = "select * from dm_tinhthanh where tinhthanhid in(" + list + ") order by tinhthanhid"
        }
        else {
            var query = "select * from dm_tinhthanh order by tinhthanhid"
        }
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
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
                                obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                        }
                    }
                )
            }
        )
    },
    Login: (username, callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                query = "select us.*,dv.donviid from users us\
                left join dm_donvi dv on dv.idcha is null where username='" + username + "'"
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
                                obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                        }
                    }
                )
            }
        )
    },
    saveUser: (users, callback) => {
        if (users.ID === 0) {
            users.ID = uuid();
            users.NGAYDOIMATKHAU = '';
            users.STATUS = 1;
            oracledb.getConnection(
                connectString,
                function (err, connection) {
                    if (err) {
                        return;
                    }
                    query = "insert into users values(:ID,:USERNAME,:PASSWORD,:EMAIL,:PHONENUMBER,:FULLNAME,:SHKB,:DIABAN,:CREATEDDATE,:CREATEDBY,:UPDATEDDATE,:UPDATEDBY,:LVL,:TINHTHANHID,:NHANTHONGBAO,:STATUS,:NGAYDOIMATKHAU)"
                    connection.execute(
                        query, users, { autoCommit: true }, function (error, rows) {
                            if (error) {
                                if (error.errorNum == 1) {
                                    callback({ CODE: '400', MESSAGE: 'Tài khoản đã tồn tại' })
                                }
                                else {
                                    console.log(error, 'error');
                                    callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                                }

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
        }
        else {
            oracledb.getConnection(
                connectString,
                function (err, connection) {
                    if (err) {
                        return;
                    }
                    query = "update users set USERNAME='" + users.USERNAME + "',TINHTHANHID='" + users.TINHTHANHID + "',EMAIL='" + users.EMAIL + "',PHONENUMBER='" + users.PHONENUMBER + "',FULLNAME='" + users.FULLNAME + "',SHKB='" + users.SHKB + "',DIABAN='" + users.DIABAN + "',CREATEDBY='" + users.CREATEDBY + "',UPDATEDDATE='" + users.UPDATEDDATE + "',UPDATEDBY='" + users.UPDATEDBY + "',LVL='" + users.LVL + "',NHANTHONGBAO='" + users.NHANTHONGBAO + "' where ID = '" + users.ID + "'"
                    connection.execute(
                        query, [], { autoCommit: true }, function (error, rows) {
                            if (rows) {
                                var RESULT = [
                                    { MESSAGE: "Sửa thành công" }
                                ]
                                callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT })
                            }
                            else {
                                callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                            }
                        }
                    )
                }
            )
        }
    },
    updateToken: (id, token, callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                query = "update users set token='" + token + "' where id ='" + id + "'"
                connection.execute(
                    query, [], { autoCommit: true }, function (error, rows) {
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
    deleteUser: (id, callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                query = "delete from users where ID='" + id.ID + "'"
                connection.execute(
                    query, [], { autoCommit: true }, function (error, rows) {
                        if (error) {
                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                        }
                        else {
                            var RESULT = [
                                { MESSAGE: "Xóa thành công" }
                            ]
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT })
                        }
                    }
                )
            }
        )
    },
    ChangePass: (id, callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                query = "update users set password='" + id.pass + "' where id='" + id.idlogin + "'"
                connection.execute(
                    query, [], { autoCommit: true }, function (error, rows) {
                        if (error) {
                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                        }
                        else {
                            var RESULT = [
                                { CODE: "SUCCESS", MESSAGE: "Đổi mật khẩu thành công" }
                            ]
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT })
                        }
                    }
                )
            }
        )
    },
    resetpassword: (id, hash, callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                // query = "update users set password='" + hash + "' where id='" + id + "'"
                query = "update users set password='$2a$10$CCnvVmXaqtM8Nl6cv6KH6uZFzguz6LN4zR3r0Mfb66JbvaoaQzYn2' where id='" + id + "'"
                connection.execute(
                    query, [], { autoCommit: true }, function (error, rows) {
                        if (error) {
                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                        }
                        else {
                            var RESULT = [
                                { CODE: "SUCCESS", MESSAGE: "Mật khẩu đổi về 123456789" }
                            ]
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT })
                        }
                    }
                )

            }
        )
    },
}

module.exports = userData;