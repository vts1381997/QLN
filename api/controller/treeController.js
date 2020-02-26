var treeData = require('../data/treeData')

var treeController = {
    getMenu:function (callback){
        treeData.getMenu((data)=>{
            callback(data)
        })
    },
    getBaoCao:function (callback){
        treeData.getBaoCao((data)=>{
            callback(data)
        })
    },
    getbaocaobyid:function (id,callback){
        treeData.getbaocaobyid(id,(data)=>{
            callback(data)
        })
    },
  
    getRole:function (callback){
        var databack = []
        treeData.getCha((data)=>{
            treeData.getRole(con=>{

                data.RESULT.map(val=>{
                    databack.push({id: val.NAME, pid: "", name: val.DESCRIPTION,value:''})
                })
                con.RESULT.map(valu=>{
                    databack.push({id: valu.ROLE+'_'+valu.ACTION, pid: valu.ROLE, name: valu.ACTION_DES,value:valu.ACTION})
                })


                callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: databack })
            })
        })
    },
  

}



module.exports = treeController;