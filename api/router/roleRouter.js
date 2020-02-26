var express = require('express')
var router = express.Router()
var roleController = require('../controller/roleController')
var now = new Date();

router.post('/get', function (req, res) {
    roleController.getRole(function (data) {
        res.send(data)
    })
})
router.post('/delete', function (req, res) {
    roleController.deleteRole(req.body.ID,data=>{
        res.send(data)
    })
   
})


router.post('/save', function (req, res) {

    let datarole = {
        ID: req.body.ID,
        NAME: req.body.NAME,
        DESCRIPTION: req.body.DESCRIPTION,
        STATUS: req.body.STATUS,
        CREATEDDATE: now,
        CREATEDBY: req.body.CREATEDBY,
        UPDATEDDATE: req.body.UPDATEDDATE,
        UPDATEDBY: req.body.idlogin,
      
    }


    roleController.saveRole(datarole, data => {
        res.send(data)
    })
})



module.exports = router 