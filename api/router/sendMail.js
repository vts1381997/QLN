var express = require('express')
var router = express.Router()
var fnc_SendMail = require('../controller/sendMail') 
router.post('/', function (req, res) {
    fnc_SendMail(req.body.data, null, data => {
        res.send(data)
    });
})

module.exports = router 