var ToChucMuaTP = function () {
  var that = this;

  const URL = {
    GETALL: CONFIG_API.URL.BASE_API + "dm_tochucmuatp/getall",
    GETDETAILS: CONFIG_API.URL.BASE_API + "dm_tochucmuatp/getdetail",
    GETDATRAGOC: CONFIG_API.URL.BASE_API + "dm_tochucmuatp/getdatragoc",
    GETBYID: CONFIG_API.URL.BASE_API + "dm_tochucmuatp/getbyid",
    GETTHONGKETOCHUCMUATPTHEODEAN: CONFIG_API.URL.BASE_API + "dm_tochucmuatp/getallbydean",
    GETALLMENHGIABYDEAN: CONFIG_API.URL.BASE_API + "dm_tochucmuatp/getallmenhgiabydean",
    SEARCH: CONFIG_API.URL.BASE_API + "dm_tochucmuatp/search",
    searchtochucmuatp: CONFIG_API.URL.USER_API + 'search/tochucmuatp',
    SAVE: CONFIG_API.URL.BASE_API + "dm_tochucmuatp/save",
    DEL: CONFIG_API.URL.BASE_API + "dm_tochucmuatp/del",
    getDetail: CONFIG_API.URL.USER_API + "detail/gettochuc",
    TraLaiGoc: CONFIG_API.URL.USER_API + "detail/tralaigoc",
    getLichSu: CONFIG_API.URL.BASE_API + "qln_dotphathanhtraiphieu_goclai/getall"

  };

  this.TOCHUCMUATPID = 0;
  this.MA = "";
  this.TOCHUC = "";
  this.LOAI = "";
  this.SODIENTHOAI = "";
  this.DIACHI = "";
  this.EMAIL = "";
  this.STATUS = 0;
  this.CREATEDDATE = "";
  this.CREATEDBY = "";
  this.UPDATEDDATE = "";
  this.UPDATEDBY = "";
  this.SO = "";
  this.TRANGTHAI = "";

  // Get all  data
  this.getAll = function () {
    var rs = DATA.get(URL.GETALL); 
    that.LIST = rs;
  };
  this.getLichSu = function (sId) {
    var rs = DATA.get(URL.getLichSu, { id: sId });
    that.LIST = rs;
  };
  this.getDetail = function (id) {
    return DATA.get(URL.getDetail, { tochucid: id });
  };
  this.getChiTiet = function (id) {
    return DATA.get(URL.GETDETAILS, { DOTPHATHANHTRAIPHIEUID: id });
  };
  this.getDaTraGoc = function (id, uuid) {
    return DATA.get(URL.GETDATRAGOC, { DOTPHATHANHTRAIPHIEUID: id, UUID: uuid });
  };

  // get data by id
  this.getById = function (sId) {
    var rs = DATA.get(URL.GETBYID, { TOCHUCMUATPID: sId });
    var item = rs[0];
    that.TOCHUCMUATPID = item.TOCHUCMUATPID;
    that.MA = item.MA;
    that.TOCHUC = item.TOCHUC;
    that.LOAI = item.LOAI;
    that.SODIENTHOAI = item.SODIENTHOAI;
    that.DIACHI = item.DIACHI;
    that.EMAIL = item.EMAIL;
    that.STATUS = item.STATUS;
    that.CREATEDDATE = item.CREATEDDATE;
    that.CREATEDBY = item.CREATEDBY;
    that.UPDATEDDATE = item.UPDATEDDATE;
    that.UPDATEDBY = item.UPDATEDBY;
    that.SO = item.SO;
    that.TRANGTHAI = item.TRANGTHAI;
  };

  this.searchtochucmuatp = function (sKey) {
    var rs = DATA.get(URL.SEARCH, { key: sKey });
    that.LIST = rs;
  }

  //save data
  this.save = function () {
    var data = {
      TOCHUCMUATPID: that.TOCHUCMUATPID,
      MA: that.MA,
      TOCHUC: that.TOCHUC,
      LOAI: that.LOAI,
      SODIENTHOAI: that.SODIENTHOAI,
      DIACHI: that.DIACHI,
      EMAIL: that.EMAIL,
      STATUS: that.STATUS,
      CREATEDDATE: that.CREATEDDATE,
      CREATEDBY: that.CREATEDBY,
      UPDATEDDATE: that.UPDATEDDATE,
      UPDATEDBY: that.UPDATEDBY,
      SO: that.SO,
      TRANGTHAI: that.TRANGTHAI
    };
    return DATA.set(URL.SAVE, data);
  };
  this.TraLaiGoc = function (data) {
    return DATA.set(URL.TraLaiGoc, data);
  };
  this.getAllByDeAn = function (i_deanphathanhtraiphieuid) {
    var data = {
      DEANPHATHANHTRAIPHIEUID: i_deanphathanhtraiphieuid
    };
    var rs = DATA.get(URL.GETTHONGKETOCHUCMUATPTHEODEAN, data);
    that.LIST = rs;
  };
  this.getAllMenhGiaByDeAn = function (i_deanphathanhtraiphieuid) {
    var rs = DATA.get(URL.GETALLMENHGIABYDEAN, {
      DEANPHATHANHTRAIPHIEUID: Number(i_deanphathanhtraiphieuid)
    });
    that.LIST = rs;
  };
  //delete data
  this.del = function (sID) {
    return DATA.set(URL.DEL, { TOCHUCMUATPID: sID });
  };
};
