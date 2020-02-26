var express = require('express')
var router = express.Router()
var claimController = require('../controller/claimController')

// middleware that is specific to this router
router.post('/get', function (req, res) {
    claimController.getClaim(req.body.id, function (data) {
        res.send(data)
    })
})
router.post('/set', function (req, res) {
    // console.log('bodyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',req.body.data.listBaocao) 
    claimController.setClaim(req.body, function (data) {
        res.send(data)  
    })
})



module.exports = router 