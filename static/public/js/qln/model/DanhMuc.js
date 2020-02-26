var DanhMuc = function () {
	var that = this;

	const URL = {
		GETALL: CONFIG_API.URL.USER_API + 'role/get',
		GETBYID: CONFIG_API.URL.USER_API + 'role/getbyid',
		SEARCH: CONFIG_API.URL.USER_API + 'role/search',
		SAVE: CONFIG_API.URL.USER_API + 'role/save',
		DEL: CONFIG_API.URL.USER_API + 'role/delete',
	}
	this.ID = ''
	this.NAME = ''
	this.DESCRIPTION = ''
	this.STATUS=1;
	this.CREATEDDATE="";
	this.CREATEDBY="";
	this.UPDATEDDATE="";
	this.UPDATEDBY="";
	this.ioru = 0;
	// Get all data
	this.getAll = function () {
		var rs = DATA.get(URL.GETALL);
		that.LIST = rs;
	}

	// get data by id
	this.getById = function (sId) {
		var rs = DATA.get(URL.GETBYID, { DUANID: sId });
		var item = rs[0];
		that.DUANID = item.DUANID;
		that.MA = item.MA;
		that.TEN = item.TEN;
		that.SOQUYETDINH = item.SOQUYETDINH;
		that.NGAYKY = item.NGAYKY;
		that.TONGGIATRI = item.TONGGIATRI;
		that.DUNOVAY = item.DUNOVAY;
		that.CHUDAUTU = item.CHUDAUTU;
		that.DONVITHUCHIEN = item.DONVITHUCHIEN;
		that.NOTE = item.NOTE;
		that.STATUS = item.STATUS;
		that.CREATEDDATE = item.CREATEDDATE;
		that.CREATEDBY = item.CREATEDBY;
		that.UPDATEDDATE = item.UPDATEDDATE;
		that.UPDATEDBY = item.UPDATEDBY;
		that.COCHETAICHINH = item.COCHETAICHINH;
		that.TRANGTHAI = item.TRANGTHAI;
	}

	// get data with keyword
	this.search = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}

	//save data
	this.save = function () {
		var data = {
			ID: this.ID,
			NAME: this.NAME,
			DESCRIPTION: this.DESCRIPTION,	
			IORU:this.ioru,
			STATUS: this.STATUS,
			CREATEDDATE: this.CREATEDDATE,
			CREATEDBY: this.CREATEDBY,
			UPDATEDDATE: this.UPDATEDDATE,
			UPDATEDBY: this.UPDATEDBY,
		}
		return DATA.set(URL.SAVE, data);
	}

	//delete data
	this.del = function (sID) {
		return DATA.set(URL.DEL, { ID: sID });
	}

}