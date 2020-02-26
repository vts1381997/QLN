var express = require('express')
var router = express.Router()
var searchController = require('../controller/searchController')

router.post('/ToChucTaiChinh', function (req, res) {
    searchController.searchtochuctaichinh(req.body, data => {
        res.send(data)
    })
})

router.post('/DonVi', function (req, res) {
    searchController.searchdonvi(req.body, data => {
        res.send(data)
    })
})

// router.post('/DanhMucView', function (req, res) {
//     console.log('reqqqq', req.body)
//     searchController.searchdanhmuc(req.body, data => {
//         console.log('dataa call back',data)
//         res.send(data)
//     })
// })

router.post('/DuAn', function (req, res) {
    searchController.searchduan(req.body, data => {
        res.send(data)
    })
})

router.post('/BieuMauBaoCao', function (req, res) {
    searchController.searchbieumaubc(req.body, data => {
        res.send(data)
    })
})

router.post('/NhaTaiTro', function (req, res) {
    searchController.searchnhataitro(req.body, data => {
        res.send(data)
    })
})

router.post('/ToChucMuaTp', function (req, res) {
    searchController.searchtochucmuatp(req.body, data => {
        res.send(data)
    })
})

router.post('/kehoachvay3nam', function (req, res) {
    searchController.searchkehoachvay3nam(req.body, data => {
        res.send(data)
    })
})

router.post('/TinhThanh', function (req, res) {
    searchController.searchtinhthanh(req.body, data => {
        res.send(data)
    })
})

router.post('/kehoachvay5nam', function (req, res) {
    searchController.searchkehoachvay5nam(req.body, data => {
        res.send(data)
    })
})

router.post('/PhuLucHopDongVayLai', function (req, res) {
    searchController.searchphuluchopdongvaylai(req.body, data => {
        res.send(data)
    })
})

router.post('/HopDongVayLai', function (req, res) {
    searchController.searchhopdongvaylai(req.body, data => {
        res.send(data)
    })
})

router.post('/DotRutVon', function (req, res) {
    searchController.searchdotrutvon(req.body, data => {
        res.send(data)
    })
})

router.post('/DotTraNo', function (req, res) {
    searchController.searchdottrano(req.body, data => {
        res.send(data)
    })
})

router.post('/KeHoachVayHangNam', function (req, res) {
    searchController.searchkehoachvayhangnam(req.body, data => {
        res.send(data)
    })
})

router.post('/DeAnPHTP', function (req, res) {
    searchController.searchdeanphtp(req.body, data => {
        res.send(data)
    })
})

router.post('/DotPHTP', function (req, res) {
    searchController.searchdotphtp(req.body, data => {
        res.send(data)
    })
})

router.post('/MuaLaiTP', function (req, res) {
    searchController.searchmualaitp(req.body, data => {
        res.send(data)
    })
})

router.post('/HoanDoiTP', function (req, res) {
    searchController.searchhoandoitp(req.body, data => {
        res.send(data)
    })
})

router.post('/VayKBNN', function (req, res) {
    searchController.searchvaykbnn(req.body, data => {
        res.send(data)
    })
})

router.post('/VayQuyDuTru', function (req, res) {
    searchController.searchvayquydutru(req.body, data => {
        res.send(data)
    })
})

router.post('/VayVDB', function (req, res) {
    searchController.searchvayvdb(req.body, data => {
        res.send(data)
    })
})

router.post('/VayTCTC', function (req, res) {
    searchController.searchvaytctc(req.body, data => {
        res.send(data)
    })
})
module.exports = router 