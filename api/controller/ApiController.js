var oracledb = require('oracledb');
var connectString = require('./connect')
let connection;

var ApiController = {

  process: async (url, dta, callback) => {
    let dataUrl = url.split('/')[1]
    let dataf = url.split('/')[2]
    let dtt = dataf.split('"')[0]
    let dt = 'QLN.fn_' + dataUrl + '_' + dtt
    let id = dta.idlogin
    let unitid = dta.unitid
    delete dta.idlogin;
    delete dta.unitid
    try {
      connection = await oracledb.getConnection(
        connectString,
        function (err, connection) {
          if (err) {
            ////console.error(err.message);
            return;
          }
          var bindVarsSave = {}
          bindVarsSave = dta
          bindVarsSave.ret = { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
          bindVarsSave.i_uid = id
          bindVarsSave.i_ip = '2'
          bindVarsSave.i_unit = unitid
          var keys = Object.keys(bindVarsSave)
          // console.log('binvr', bindVarsSave)
          var str_query = ''
          keys.map(value => {
            if (value !== 'ret') {
              str_query = str_query === '' ? str_query + ':' + value : str_query + ',' + ':' + value
            }
          })
          let query = "BEGIN :ret := " + dt + "  (" + str_query + "); END;"
          connection.execute(
            query, bindVarsSave, async function (error, rows) {
              if (error) { 
                callback({ CODE: '400', MESSAGE: 'Lỗi Hệ thống' })
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
                    obj2[keys[index].name] = element[index]
                  }
                  obj.push(obj2)
                });
                if (dtt == 'getall') {
                  callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                  connection.release(function (err) {
                    ////console.error(err.message);
                  });
                }
                else {
                  callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                  connection.release(function (err) {
                    ////console.error(err.message);
                  });
                }


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
  },
}



module.exports = ApiController;