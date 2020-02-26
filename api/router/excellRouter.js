var express = require('express')
 
var router = express.Router()
var ExcellController = require('../controller/ExcellController')
router.post('/export', (rq, res) => {
    ExcellController.export(rq.body, (_rs) => {
        res.send(_rs)
    })
})
router.post('/exporttamplate', (rq, res) => {
    ExcellController.exportTamplate(rq.body, (_rs) => {
        res.send(_rs)
    })
})
router.post('/import', (rq, res) => {
    ExcellController.import(rq.body, (_rs) => {
        res.send(_rs)
    })
})

module.exports = router