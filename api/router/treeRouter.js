var express = require('express')
var router = express.Router()
var treeController = require('../controller/treeController')

// middleware that is specific to this router
router.post('/getmenu', function (req, res) {
    treeController.getMenu( function (data) {
        res.send(data)
    })
})
router.post('/getrole', function (req, res) {
    treeController.getRole( function (data) {
        res.send(data)
    })
})
router.post('/getbaocao', function (req, res) {
    treeController.getBaoCao( function (data) {
        res.send(data)
    })
})
router.post('/getbaocaobyid', function (req, res) {
    treeController.getbaocaobyid(req.body.id, function (data) {
        res.send(data)
    })
})


module.exports = router 