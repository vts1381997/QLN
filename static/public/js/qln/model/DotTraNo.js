var DotTraNo = function () {
    var that = this;

    const URL = {
        GETALL: CONFIG_API.URL.BASE_API + 'qln_dottrano/getall',
        GETBYID: CONFIG_API.URL.BASE_API + 'qln_dottrano/getbyid',
        SEARCH: CONFIG_API.URL.BASE_API + 'qln_dottrano/search',
        SAVE: CONFIG_API.URL.BASE_API + 'qln_dottrano/save',
        DEL: CONFIG_API.URL.BASE_API + 'qln_dottrano/del',
        DELUID: CONFIG_API.URL.BASE_API + 'qln_dottrano/deluid',
        getAllTienTe: CONFIG_API.URL.BASE_API + 'dm_tiente/getall',
        getAllNhaTaiTro: CONFIG_API.URL.BASE_API + 'dm_nhataitro/getall',
        getAllHopDongVayLai: CONFIG_API.URL.BASE_API + 'qln_hopdongvaylai/getall',
        searchdottrano:CONFIG_API.URL.USER_API+'search/dottrano'
       

    }

    this.DOTTRANOID = 0;
    this.KEHOACHVAYHANGNAMID = 0;
    this.MA = "";
    this.NGAYTRA = "";
    this.KYTRA = "";
    this.NGUONVAY = 0;
    this.TIENKYVAY = 0;
    this.DUNO = 0;
    this.SOTIENTRAGOC = 0;
    this.SOTIENTRALAI = 0;
    this.SOTIENTRAPHI = 0;
    this.SOTIENPHAT = 0;
    this.LUYKETRANOGOC = 0;
    this.SOLENHCHI = "";
    this.DONVIID = "";
    this.STATUS = 0;
    this.CREATEDDATE = "";
    this.CREATEDBY = "";
    this.UPDATEDDATE = "";
    this.UPDATEDBY = "";
    this.PHITHEOHOPDONGVAY = 0
    this.TONGSOTIENPHAITRA = 0
    this.UUID = ''
    // Get all data
    this.getAll = function () {
        var rs = DATA.get(URL.GETALL);
        that.LIST = rs;
    }


    // get data by id
    this.getById = function (sId) {
        var rs = DATA.get(URL.GETBYID, { DOTTRANOID: sId });
        var item = rs[0];
        that.DOTTRANOID = item.DOTTRANOID;
        that.KEHOACHVAYHANGNAMID = item.KEHOACHVAYHANGNAMID;
        that.DUANID = item.DUANID;
        that.HOPDONGVAYLAIID = item.HOPDONGVAYLAIID;
        that.MA = item.MA;
        that.NGAYTRA = item.NGAYTRA;
        that.KYTRA = item.KYTRA;
        that.NGUONVAY = item.NGUONVAY;
        that.TIENKYVAY = item.TIENKYVAY;
        that.DUNO = item.DUNO;
        that.SOTIENTRAGOC = item.SOTIENTRAGOC;
        that.SOTIENTRALAI = item.SOTIENTRALAI;
        that.SOTIENTRAPHI = item.SOTIENTRAPHI;
        that.SOTIENPHAT = item.SOTIENPHAT;
        that.LUYKETRANOGOC = item.LUYKETRANOGOC;
        that.SOLENHCHI = item.SOLENHCHI;
        that.DONVIID = item.DONVIID;
        that.STATUS = item.STATUS;
        that.CREATEDDATE = item.CREATEDDATE;
        that.CREATEDBY = item.CREATEDBY;
        that.UPDATEDDATE = item.UPDATEDDATE;
        that.UPDATEDBY = item.UPDATEDBY;
        return rs;
    }

    // get data with keyword
    this.search = function (sKey) {
        var rs = DATA.get(URL.SEARCH, { key: sKey });
        that.LIST = rs;
    }

    this.searchdottrano = function (sKey) {
        var rs = DATA.get(URL.SEARCH, { key: sKey });
        that.LIST = rs;
    }

    //save data
    this.save = function () {
        var data = {
            DOTTRANOID: this.DOTTRANOID,
            DUANID: this.DUANID,
            HOPDONGVAYLAIID: this.HOPDONGVAYLAIID,
            MA: this.MA,
            NGAYTRA: this.NGAYTRA,
            KYTRA: this.KYTRA,
            TIENKYVAY: this.TIENKYVAY,
            DUNO: this.DUNO,
            SOTIENTRAGOC: this.SOTIENTRAGOC,
            SOTIENTRALAI: this.SOTIENTRALAI,
            SOTIENTRAPHI: this.SOTIENTRAPHI,
            SOTIENPHAT: this.SOTIENPHAT,
            LUYKETRANOGOC: this.LUYKETRANOGOC,
            SOLENHCHI: this.SOLENHCHI,
            DONVIID: this.DONVIID,
            PHITHEOHOPDONGVAY: this.PHITHEOHOPDONGVAY,
            PHIQUANLICHOVAYLAI: this.PHIQUANLICHOVAYLAI,
            TONGSOTIENPHAITRA: this.TONGSOTIENPHAITRA,
            UUID:this.UUID
        }
        return DATA.set(URL.SAVE, data);
    }

    //delete data
    this.del = function (sID) {
        return DATA.set(URL.DEL, { DOTTRANOID: sID });
    }
    this.deluid = function (sID) {
        return DATA.set(URL.DELUID, { DOTTRANOID: sID });
    }



}
