var claims = require('../data/claims')
var ApiController = {

    getClaim: function (username, callback) {
        claims.getClaims(username, (data) => {
            claims.getRoles(username, (role) => {
                let rolee = role.RESULT.map(function (valu) {
                    return valu.NAME + '.' + valu.ROLE
                })
                data.role = rolee
                callback(data)
            })
        })
    },
    setClaim: function (body, callback) {
        var li = []
        if (body.data.listRole.length > 0) {
            li = body.data.listRole.map(function (val) {
                return { role: val.pid, action: val.value }
            })
        }
        claims.checkRoles(li, (datali) => {
            let dataa=[]
            if(datali.RESULT){
                dataa = datali.RESULT.map(val => {
                    return "'" + "" + val.ID + "" + "'"
                })
            }
            else{
                dataa=[]
            }
           
            claims.deleteRole(body, (deleted) => {
                claims.setClaims(body, dataa, (data) => {

                    if (data.success) {
                        var RESULT = [
                            { MESSAGE: "Phân quyền thành công" }
                        ]



                        callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT })
                    } else {
                        callback({ CODE: '400', MESSAGE: 'Lỗi hệ thống' })
                    }

                })
            })

        })

    }

}



module.exports = ApiController;