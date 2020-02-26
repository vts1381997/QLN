var userData = require('../data/userData')
var claimController = require('./claimController')
var claims = require('../data/claims')
var LoginController = {

    Login: function (username, callback) {
        userData.Login(username, (data) => {
            if (data.RESULT.length > 0) {
                claims.getClaims(data.RESULT[0].ID, (cls) => {
                    data.menu = cls.RESULT
                    claims.getDonvi(data.RESULT[0].DIABAN, (dv) => {
                        data.donvi = dv.RESULT
                        claims.getRoles(data.RESULT[0].ID, (role) => {
                            let list = []
                            role.RESULT.map(function(val){
                                list.push(val.NAME+'.'+val.ROLE)
                            })
                            data.role =list
                            callback(data)
                        })

                    })
                })



            }
            else {
                callback(data)

            }
        })
    },


}



module.exports = LoginController;