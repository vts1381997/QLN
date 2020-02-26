var searchData = require('../data/searchData')

var searchController = {
    searchtochuctaichinh: function (body,callback) {
        searchData.searchtochuctaichinh(body,data=>{
            callback(data)
        })
    },

    searchdonvi: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchdonvi(body,data=>{
            callback(data)
        })
    },

    searchduan: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchduan(body,data=>{
            callback(data)
        })
    },

    searchbieumaubc: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchbieumaubc(body,data=>{
            callback(data)
        })
    },

    searchnhataitro: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchnhataitro(body,data=>{
            callback(data)
        })
    },

    searchtochucmuatp: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchtochucmuatp(body,data=>{
            callback(data)
        })
    },

    searchkehoachvay3nam: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchkehoachvay3nam(body,data=>{
            callback(data)
        })
    },

    searchkehoachvay5nam: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchkehoachvay5nam(body,data=>{
            callback(data)
        })
    },

    searchtinhthanh: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchtinhthanh(body,data=>{
            callback(data)
        })
    },
    searchphuluchopdongvaylai: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchphuluchopdongvaylai(body,data=>{
            callback(data)
        })
    },
    searchhopdongvaylai: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchhopdongvaylai(body,data=>{
            callback(data)
        })
    },

    searchdotrutvon: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchdotrutvon(body,data=>{
            callback(data)
        })
    },

    searchdottrano: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchdottrano(body,data=>{
            callback(data)
        })
    },

    searchkehoachvayhangnam: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchkehoachvayhangnam(body,data=>{
            callback(data)
        })
    },

    searchdeanphtp: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchdeanphtp(body,data=>{
            callback(data)
        })
    },

    searchdotphtp: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchdotphtp(body,data=>{
            callback(data)
        })
    },

    searchmualaitp: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchmualaitp(body,data=>{
            callback(data)
        })
    },

    searchhoandoitp: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchhoandoitp(body,data=>{
            callback(data)
        })
    },

    searchvaykbnn: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchvaykbnn(body,data=>{
            callback(data)
        })
    },

    searchvayquydutru: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchvayquydutru(body,data=>{
            callback(data)
        })
    },

    searchvayvdb: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchvayvdb(body,data=>{
            callback(data)
        })
    },

    searchvaytctc: function (body,callback) {
        //console.log('bodyyyy',body)
        searchData.searchvaytctc(body,data=>{
            callback(data)
        })
    },

}





module.exports = searchController;