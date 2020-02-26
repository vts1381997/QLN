var oracledb = require('oracledb');
var connectString = require('../controller/connect')
var uuid = require('uuid')
var claims = {
    getClaims: (id, callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    ////console.error(err.message);
                    return;
                }
                query = "select menu.id,menu.idcha,menu.name,menu.url,menu.stt from role_user_group\
            left join menu on role_user_group.menuid = menu.id where role_user_group.user_code = '"+ id + "' and role_user_group.type='MENU'  order by menu.stt"
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
    getRoles: (id, callback) => {
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    ////console.error(err.message);
                    return;
                }
                query = "select role_user_group.role_action_code, dm_role.name as name, actions.name as role\
                from role_user_group\
                left join role_action on role_action.id = role_user_group.role_action_code\
                left join dm_role on dm_role.id  = role_action.role_code\
                left join actions on actions.id = role_action.action_code where type='ROLE' and user_code='"+ id + "'\
                "
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
    getDonvi: (id, callback) => {
        var bindVarsSave = {}
        bindVarsSave.ret = { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        bindVarsSave.p1 = id
        bindVarsSave.p2 = 0
        bindVarsSave.p3 = '1'
        bindVarsSave.p4 = '2'
        bindVarsSave.p5 = '2'
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    ////console.error(err.message);
                    return;
                }
                let query = "BEGIN :ret :=QLN.fn_dm_donvi_getcayphahe  (:p1,:p2,:p3,:p4,:p5); END;"
                connection.execute(
                    query, bindVarsSave, async function (error, rows) {
                        if (rows) {
                            var values = await rows.outBinds.ret.getRows(1000)
                            var keys = rows.outBinds.ret.metaData
                            var obj = []

                            values.forEach(element => {
                                obj.push(element[0])
                            });

                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                            connection.release(function (err) {
                                ////console.error(err.message);
                            })


                        }
                        else {

                            callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                            connection.release(function (err) {
                                ////console.error(err.message);
                            });
                        }
                    }
                )

            }
        )
    },
    setClaims: (body, cl, callback) => {
        var inserqr = ''
        if (body.data.listMenu.length > 0 || body.data.listRole.length > 0 ||body.data.listBaocao) {
            if (body.data.listMenu.length > 0) {
                body.data.listMenu.map(function (val) {
                    idd = uuid();
                    var datasv = {
                        ID: idd,
                        USER_CODE: body.id,
                        TYPE: 'MENU',
                        MENUID: val.id
                    }
                    if (val.id) {

                        inserqr = inserqr + "select '" + idd + "','" + body.id + "','MENU','" + val.id + "','',null from dual union all "
                    }
                })
            }
            if (cl.length > 0) {
                cl.map(valu => {
                    idl = uuid();
                    inserqr = inserqr + "select '" + idl + "','" + body.id + "','ROLE',''," + valu + ",null from dual union all "
                })
            }
            if(body.data.listBaocao.length>0){
                body.data.listBaocao.map(function (val) {
                    idbc = uuid();
                    if (val.pid.length>0) {

                        inserqr = inserqr + "select '" + idbc + "','" + body.id + "','BAOCAO','',''," + val.id + " from dual union all "
                    }
                })
            }
            var stringin = inserqr.substring(0, inserqr.length - 10);
            oracledb.getConnection(
                connectString,
                function (err, connection) {
                    if (err) {
                        ////console.error(err.message);
                        return;
                    }
                    let query = "insert into role_user_group (ID,USER_CODE,TYPE,MENUID,ROLE_ACTION_CODE,BCID)" + stringin
                    connection.execute(
                        query, [], { autoCommit: true }, function (error, rows) {
                            if (error) {
                                callback({ success: false });
                            }
                        }
                    )

                }
            )
            callback({ success: true });
        }
        else {
            callback({ success: true });
        }


    },
    checkRoles: (body, callback) => {
        var query = ''
        for (i = 0; i < body.length; i++) {
            if (body[i].role.length > 0 || body[i].action.length > 0) {

                query = query + "select id from role_action abc where abc.ACTION_CODE=(select id from actions where name='" + body[i].action + "') and  abc.ROLE_CODE=(select id from dm_role where name='" + body[i].role + "') union all "
            }
        }
        query = query.substring(0, query.length - 10)

        var list = []
        oracledb.getConnection(
            connectString,
            async function (err, connection) {
                if (err) {
                    return;
                }
                connection.execute(
                    query, [], { autoCommit: true }, async function (error, rows) {
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
    deleteRole: (body, callback) => {

        oracledb.getConnection(
            connectString,
            async function (err, connection) {
                if (err) {
                    ////console.error(err.message);
                    return;
                }
                query = "delete from role_user_group where user_code = '" + body.id + "' and type <>'DEPARTMENT'"
                connection.execute(
                    query, [], { autoCommit: true }, async function (error, rows) {
                        if (rows) {
                            let obj = [{
                                MESSAGE: 'thành công'
                            }]
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
    dm: async (body, connection) => {

    },
}

module.exports = claims;