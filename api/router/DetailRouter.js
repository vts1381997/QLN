var express = require('express')
var router = express.Router()
var DetailController = require('../controller/DetailController')

// middleware that is specific to this router
router.post('/dotphtp', function (req, res) {
    DetailController.DetailDotPHTP(req.body.DOTPHATHANHTRAIPHIEUID, function (data) {
        res.send(data)
    })

})
router.post('/save', function (req, res) {
    DetailController.saveDotPHTP(req.body, function (data) {
        res.send(data)
    })
})
router.post('/tralaigoc', function (req, res) {
    DetailController.traLaiGoc(req.body, function (data) {
        res.send(data)
    })
})
router.post('/gettochuc', function (req, res) {
    DetailController.GetToChuc(req.body.tochucid,function (data) {

        res.send(data)
    })
})


module.exports = router 