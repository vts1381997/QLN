var moneyData = require('../data/moneyData')

var MoneyController = {

    
    Update:function (money,callback){
        moneyData.Update(money,(data)=>{
            callback(data)
        })
    }
    

}



module.exports = MoneyController;