var ToChucTaiChinh = function () {
	var that = this;

	const URL = {
		GETALL: CONFIG_API.URL.BASE_API + 'dm_tochuctaichinh/getall',
		GETBYID: CONFIG_API.URL.BASE_API + 'dm_tochuctaichinh/getbyid',
		SEARCH: CONFIG_API.URL.BASE_API + 'dm_tochuctaichinh/search',
		SAVE: CONFIG_API.URL.BASE_API + 'dm_tochuctaichinh/save',
		DEL: CONFIG_API.URL.BASE_API + 'dm_tochuctaichinh/del',
		DELUID: CONFIG_API.URL.BASE_API + 'dm_tochuctaichinh/deluid',
		searchtochuctaichinh:CONFIG_API.URL.USER_API+'search/tochuctaichinh'
	}

	this.TOCHUCTAICHINHID = 0;
	this.MA = "";
	this.TEN = "";
	this.DIACHI = "";
	this.SOGIAYPHEP = "";
	this.NGAYCAP = "";
	this.VONDIEULE = 0;
	this.TRANGTHAI = 0;
	this.STATUS = 0;
	this.CREATEDDATE = "";
	this.CREATEDBY = "";
	this.UPDATEDDATE = "";
	this.UPDATEDBY = "";
	this.UUID = "";

	// Get all data
	this.getAll = function () {
		var rs = DATA.get(URL.GETALL);

		that.LIST = rs;
	}

	// get data by id
	this.getById = function (sId) {
		var rs = DATA.get(URL.GETBYID, { TOCHUCTAICHINHID: sId });
		var item = rs[0];
		that.TOCHUCTAICHINHID = item.TOCHUCTAICHINHID;
		that.MA = item.MA;
		that.TEN = item.TEN;
		that.DIACHI = item.DIACHI;
		that.SOGIAYPHEP = item.SOGIAYPHEP;
		that.NGAYCAP = item.NGAYCAP;
		that.VONDIEULE = item.VONDIEULE;
		that.TRANGTHAI = item.TRANGTHAI;
		that.STATUS = item.STATUS;
		that.CREATEDDATE = item.CREATEDDATE;
		that.CREATEDBY = item.CREATEDBY;
		that.UPDATEDDATE = item.UPDATEDDATE;
		that.UPDATEDBY = item.UPDATEDBY;
	}

	// get data with keyword
	this.search = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}
	this.searchtochuctaichinh = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}

	//save data
	this.save = function () {
		var data = {
			TOCHUCTAICHINHID: that.TOCHUCTAICHINHID,
			MA: that.MA,
			TEN: that.TEN,
			DIACHI: that.DIACHI,
			SOGIAYPHEP: that.SOGIAYPHEP,
			NGAYCAP: that.NGAYCAP,
			VONDIEULE: that.VONDIEULE,
			TRANGTHAI: that.TRANGTHAI,
			STATUS: that.STATUS,
			CREATEDDATE: that.CREATEDDATE,
			CREATEDBY: that.CREATEDBY,
			UPDATEDDATE: that.UPDATEDDATE,
			UPDATEDBY: that.UPDATEDBY,
			UUID: that.UUID
		}
		return DATA.set(URL.SAVE, data);
	}

	//delete data
	this.del = function (sID) {
		return DATA.set(URL.DEL, { TOCHUCTAICHINHID: sID });
	}
	this.deluid = function (sID) {
		 var rs =  DATA.set(URL.DELUID, { TOCHUCTAICHINHID: sID });
		return rs
	}
}