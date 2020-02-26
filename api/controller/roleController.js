var roleData = require('../data/roleData')
var uuid = require('uuid')
var roleController = {
    getRole: function (callback) {
        roleData.getRole((data) => {
            callback(data)
        })
    },
    deleteRole: function (id,callback) {
        roleData.deleteRole(id,(data) => {
            if(data.RESULT.length>0){
                roleData.deleteRoleAction(id,(data1) => {
                    callback(data1)
                })
            }
        })
    },
    saveRole: function (roles, callback) {

        if (roles.ID.length > 0) {
            roleData.updateRole(roles, (data) => {

            })
        }
        else {
            roles.ID = roles.ID = uuid();
            roleData.insertRole(roles, (data) => {
                if (data) {
                    roleData.getAction(data => {
                        let dt = data.RESULT
                        let list = dt.map(val => {
                            return { ROLE_CODE: roles.ID, ACTION_CODE: val.ID }
                        })
                        roleData.insertRoleAction(list,databack=>{
                            callback(databack)
                        })
                    })

                }
            })

        }

    }

}



module.exports = roleController;