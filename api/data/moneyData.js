var oracledb = require('oracledb');
var connectString = require('../controller/connect')
var moneyData={
Update: (money,callback) => {
    oracledb.getConnection(
        connectString,
        function (err, connection) {
            if (err) {
                //console.error(err.message);
                return;
            }
            
            for(i=0;i<money.length;i++){
                let dt = money[i].$
                query = "insert into dm_tiente values("+i+",'"+dt.CurrencyCode+"','"+dt.CurrencyName+"',0,'','','','','','"+dt.Buy+"','"+dt.Transfer+"','"+dt.Sell+"')"
                connection.execute(
                    
                    query, [],{autoCommit: true}, function (error, rows) {
                       
                    }
                )
            }

          

        }
    )
},
}


module.exports = moneyData;