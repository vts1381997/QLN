var express = require('express')
var router = express.Router()
const axios = require('axios')
const https = require('https')
var MoneyController = require('../controller/MoneyController')
const agent = new https.Agent({
    rejectUnauthorized: false
});
router.post('/', function (req, res) {
    axios.get('https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx', { httpsAgent: agent })
        .then(dataExchange => {
            var parseString = require('xml2js').parseString;
            parseString(dataExchange.data, function (err, result) {
                string = JSON.stringify(result)
                let data = {
                    CODE: '0',
                    mess: 'dcm',
                    RESULT: result.ExrateList
                }
                res.send(data)
            });
        })
        .catch(err => {
        })

})
router.post('/update', (req, res) => {
    axios.get('https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx', { httpsAgent: agent })
        .then(dataExchange => {
            var parseString = require('xml2js').parseString;
            parseString(dataExchange.data, function (err, result) {
                var money = result.ExrateList.Exrate
                MoneyController.Update(money, function (data) {
                    res.send(data)
                })
            });
        })
        .catch(err => {
        })
})
module.exports = router