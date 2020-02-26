var oracledb = require('oracledb');
var connectString = require('../controller/connect')
var treeData={
getMenu: (callback) => {
    oracledb.getConnection(
        connectString,
        function (err, connection) {
            if (err) {
                ////console.error(err.message);
                return;
            }
            query = "select * from menu"
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
getBaoCao: (callback) => {
    oracledb.getConnection(
        connectString,
        function (err, connection) {
            if (err) {
                ////console.error(err.message);
                return;
            }
            query = "select * from dm_bieumaubaocao"
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
getbaocaobyid: (id,callback) => {
    oracledb.getConnection(
        connectString,
        function (err, connection) {
            if (err) {
                ////console.error(err.message);
                return;
            }
            query = "select bc.* \
            from dm_bieumaubaocao bc\
            left join role_user_group rug on bc.bieumaubaocaoid = rug.bcid\
            where rug.user_code = '"+id+"'"
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
getRole: (callback) => {
    oracledb.getConnection(
        connectString,
        function (err, connection) {
            if (err) {
                ////console.error(err.message);
                return;
            }
            query = "select r.name as role,r.DESCRIPTION as role_des , a.name as action,a.DESCRIPTION action_des\
            from role_action ra\
            left join dm_role r on r.id = ra.role_code\
            left join actions a on a.id = ra.action_code"
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
getCha: (callback) => {
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


module.exports = treeData;