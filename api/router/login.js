var express = require('express')
var router = express.Router()
var LoginController = require('../controller/LoginController')
var config = require('../configurations/config')
var jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
var userData = require('../data/userData')
app.set('Secret', config.secret);
// middleware that is specific to this router
router.post('/', function (req, res) {
    LoginController.Login(req.body.username, function (data) {

        if (data.RESULT.length > 0) {
            let user = data.RESULT[0].USERNAME
            let pass = data.RESULT[0].PASSWORD
            let id = data.RESULT[0].ID
            let cls = data.menu
            let donvi = data.donvi
            let dvtong = data.RESULT[0].DONVIID
            let role = data.role
            let tinhthanh = data.RESULT[0].TINHTHANHID
            bcrypt.compare(req.body.password + config.keysBcrypt, pass, function (err, match) {
                if (match) {
                    const payload = {
                        userName: req.body.username,
                        level:data.RESULT[0].LVL,
                        menu: cls,
                        donvi: donvi,
                        role: role,
                        id: id,
                        dvtong:dvtong,
                        unitid: data.RESULT[0].DIABAN
                    };
                    var token = jwt.sign(payload, app.get('Secret'), {
                        expiresIn: "24h", // expires in 24 hours
                    });
                    // userData.updateToken(id,token,data=>{
                    //     console.log(data)
                    // })
                    res.json({
                        success: true,
                        message: 'authentication done ',
                        token: token,
                        code:200,
                    });
                   
                } else {
                    res.json({CODE:'401', message: "Sai tài khoản hoặc tên đăng nhập" })
                }
            });

        }
        else {
            res.json({CODE:'401', message: "Sai tài khoản hoặc tên đăng nhập" })
        }

    })
})

module.exports = router 