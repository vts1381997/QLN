var express = require('express')
var router = express.Router()
var ApiController = require('../controller/ApiController')

// middleware that is specific to this router
router.post('*', function (req, res) {

    let ur = JSON.stringify(req.url).trim().toLocaleLowerCase()
    let url = ur.split('/')[2]
    ApiController.process(ur, req.body, function (data) {
        
        res.send(data)
    })
})

module.exports = router 