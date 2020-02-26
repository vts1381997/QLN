var oracledb = require('oracledb');
var connectString = require('../controller/connect')
var dateFormat = require('dateformat');
var uuid = require('uuid')

var roleData = {
    getRole: (callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    ////console.error(err.message);
                    return;
                }
                query = "select * from dm_role"
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
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
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
    deleteRole: (id,callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                query = "delete from dm_role where id ='"+id+"'"
                connection.execute(
                    query, [],{ autoCommit: true }, function (error, rows) {
                        if (rows) {
                            var obj = [
                                { MESSAGE: "Xóa thành công" }
                            ]

                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT:obj })




                        }
                        else {
                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                        }
                    }
                )

            }
        )
    },
    deleteRoleAction: (id,callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                query = "delete from role_action where role_code ='"+id+"'"
                connection.execute(
                    query, [],{ autoCommit: true }, function (error, rows) {
                        if (rows) {
                            var obj = [
                                { MESSAGE: "Xóa thành công" }
                            ]

                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT:obj })




                        }
                        else {
                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                        }
                    }
                )

            }
        )
    },
    getAction: (callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    ////console.error(err.message);
                    return;
                }
                query = "select id from actions where name <> 'PHANQUYEN' "
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
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
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

    insertRole: (roles, callback) => {

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                query = "insert into dm_role values(:ID,:NAME,:DESCRIPTION,:STATUS,:CREATEDDATE,:CREATEDBY,:UPDATEDDATE,:UPDATEDBY)"
                connection.execute(
                    query, roles, { autoCommit: true }, function (error, rows) {
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
    insertRoleAction: (roleActions, callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    ////console.error(err.message);
                    return;
                }
                roleActions.map(val => {
                    val.ID = uuid();
                    query = "insert into role_action values(:ID,:ROLE_CODE,:ACTION_CODE)"
                    connection.execute(
                        query, val, { autoCommit: true }, function (error, rows) {
                            if (error) {
                                callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                                return;
                            }

                        }
                    )
                })

                var RESULT = [
                    { MESSAGE: "Thêm mới thành công" }
                ]



                callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT })

            }
        )


    },
    updateRole: (roles, callback) => {

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    ////console.error(err.message);
                    return;
                }
                query = "update users set status =:p"
                connection.execute(
                    query, { p: 1 }, { autoCommit: true }, function (error, rows) {
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


}



module.exports = roleData;