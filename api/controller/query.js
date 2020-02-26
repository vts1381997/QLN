
var oracledb = require('oracledb');
var connectString = require('./connect')
let connection;

module.exports = Query = async (params, queryString, callback) => {
    let id = params.idlogin
    let unitid = params.unitid
    delete params.idlogin;
    delete params.unitid
    try {
        connection = await oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    ////console.error(err.message);
                    return;
                }
                var bindVarsSave = {}
                bindVarsSave = params
                bindVarsSave.ret = { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
                bindVarsSave.i_uid = id
                bindVarsSave.i_ip = '2'
                bindVarsSave.i_unit = unitid
                var keys = Object.keys(bindVarsSave)
                var str_query = ''
                keys.map(value => {
                    if (value !== 'ret') {
                        str_query = str_query === '' ? str_query + ':' + value : str_query + ',' + ':' + value
                    }
                })
                let query = "BEGIN :ret := " + queryString + "  (" + str_query + "); END;"
                connection.execute(
                    query, bindVarsSave, async function (error, rows) {
                        
                        if (error) {
                            callback({ RESULT: [], err: 'Lỗi query' })
                            connection.release(function (err) {
                            });
                        } else {
                            var values = await rows.outBinds.ret.getRows(1000)
                            var keys = rows.outBinds.ret.metaData
                            var obj = []

                            var vICountOfKeys = keys.length;

                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[ keys[ index ].name ] = element[ index ]
                                }
                                obj.push(obj2)
                            });
                            callback(obj)
                        }
                    }
                )

            }
        )
    } catch (err) {
        console.log("Error: ", err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.log("Error when closing the database connection: ", err);
            }
        }
    }
}