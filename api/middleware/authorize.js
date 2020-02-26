var userData = require('../data/userData')
var jwt = require('jsonwebtoken')
var authorize = (req, res, next) => {
   // if (req.originalUrl)
        // console.log('urrrrrrrrrrrrrrr234567890',req.originalUrl.split('/')[2].split('_')[1])
   // let header = req.rawHeaders.filter(a => a.indexOf('8099/qln') > 0)[0]
    // console.log('header',header)
    // let tb = header.split('/')
    // let url = tb[tb.length - 1].toUpperCase()
    // let originalUrl = req.originalUrl.toUpperCase()
    // console.log('ủ', url, originalUrl)
    // if (originalUrl.indexOf(url) >= 0) {
    //     userData.checkToken(req.body.idlogin, data => {
    //         console.log('đataaaaaaaaaaaaa', data.RESULT.filter(a=>a.ROLE==url))
    //         console.log('end point',originalUrl.split('/')[3])
    //         if (req.body.token == data.RESULT[0].token) {
    //             next();
    //         }
    //         else {
    //             res.send({ CODE: 401, message: 'Hết phiên đăng nhập' })
    //         }
    //     })
    // }
    // else {
    //     // res.send({ CODE: 401, message: 'Hết phiên đăng nhập' })
    //     next();
    // }
    next();
}

module.exports = authorize;
