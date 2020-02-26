var express = require('express')
var router = express.Router()
var userController = require('../controller/userController') 
var now = new Date();

router.post('/get', function (req, res) {
    userController.getUser(req.body, function (data) {
        res.send(data)
    })
})
router.post('/resetpassword', function (req, res) {
    userController.resetpassword(req.body.ID, function (data) {
        res.send(data)
    })
})


router.post('/save', function (req, res) {
    var user = {
        ID: req.body.ID,
        USERNAME: req.body.USERNAME,
        PASSWORD: req.body.PASSWORD,
        EMAIL: req.body.EMAIL,
        PHONENUMBER: req.body.PHONENUMBER,
        FULLNAME: req.body.FULLNAME,
        SHKB: req.body.SHKB,
        DIABAN: req.body.DIABAN,
        CREATEDDATE: now,
        UPDATEDDATE: req.body.UPDATEDDATE,
        UPDATEDBY: req.body.UPDATEDBY,
        CREATEDBY: req.body.idlogin,
        TINHTHANHID: String(req.body.TINHTHANHID),
        LVL: req.body.LVL,
        NHANTHONGBAO: req.body.NHANTHONGBAO,
    }
    userController.saveUser(user, function (data) {
        res.send(data)
    })
})
router.post('/delete', function (req, res) {
    userController.deleteUser(req.body, function (data) {

        res.send(data)
    })
})
router.post('/changepass', function (req, res) {
    userController.ChangePass(req.body, function (data) {
        res.send(data)
    })
})
router.post('/getdvcha', function (req, res) {
    userController.getdvcha(req.body, function (data) {
        res.send(data)
    })
})
router.post('/getlevel', function (req, res) {
    userController.getLevel(req.body.idlogin, (data) => {
        res.send(data)
    })
})
router.post('/gettinhthanh', function (req, res) {
    userController.getTinh(req.body.idtt, (data) => {
        res.send(data)
    })
})


module.exports = router 