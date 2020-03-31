var userData = require('../data/userData')
var config = require('../configurations/config')
const bcrypt = require('bcryptjs');

var userController = {
    getUser: function (body, callback) {
        let bd = body.donvi.map(val => {
            return "'" + val + "'"
        })
        userData.getUser(body, bd, (data) => {
            userData.getUser1(body, bd, (data1) => {
                userData.getUser2(body, bd, (data2) => {
                    var datacallback = [...data1.RESULT, ...data.RESULT, ...data2.RESULT]
                    callback({ CODE: data1.CODE, MESSAGE: data1.MESSAGE, RESULT: datacallback })
                })
            })
        })
    },
    resetpassword: function (body, callback) {
        bcrypt.hash('123456789' + config.keysBcrypt, 10, function (err, hash) {
            userData.resetpassword(body,hash,data=>{
                callback(data)
            })
        });
        
    },
    saveUser: function (users, callback) {
        bcrypt.hash(users.PASSWORD + 'trungpro', 10, function (err, hash) {
            users.PASSWORD = hash;
            userData.saveUser(users, (data) => {
                callback(data)
            })
        });
    },
    deleteUser: function (id, callback) {
        userData.deleteUser(id, (data) => {
            callback(data)
        })
    },
    ChangePass: function (id, callback) {
        userData.getUserbyid(id, databack => {
            if (databack.RESULT.length > 0) {
                bcrypt.compare(id.data.matKhauCu + config.keysBcrypt, databack.RESULT[0].PASSWORD, function (err, match) {
                    if (match) {
                        bcrypt.hash(id.data.matKhauMoi + config.keysBcrypt, 10, function (err, hash) {
                            id.pass = hash;
                            userData.ChangePass(id, (data) => {
                                callback(data)
                            })
                        });
                    }
                    else {
                        var RESULT = [
                            { MESSAGE: "Mật khẩu cũ không đúng, vui lòng nhập lại!" }
                        ]
                        callback({ CODE: "111", MESSAGE: 'SUCCESS', RESULT })
                    }
                })
            }
        })
    },
    getdvcha: function (id, callback) {
        userData.getdvcha(id, (data) => {
            callback(data)
        })
    },
    getLevel: function (id, callback) {
        userData.getLevel(id, (data) => {
            callback(data)
        })
    },
    getTinh: function (id, callback) {
        userData.getTinh(id, (data) => {
            callback(data)
        })
    }
}

module.exports = userController;