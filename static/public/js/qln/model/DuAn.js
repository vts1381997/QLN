var DuAn = function () {
	var that = this;

	const URL = {
		GETALL: CONFIG_API.URL.BASE_API + 'dm_duan/getall',
		GETBYID: CONFIG_API.URL.BASE_API + 'dm_duan/getbyid',
		GETALLBYNHATAITRO: CONFIG_API.URL.BASE_API + 'dm_duan/getallbynhataitro',
		SEARCH: CONFIG_API.URL.BASE_API + 'dm_duan/search',
		SAVE: CONFIG_API.URL.BASE_API + 'dm_duan/save',
		DEL: CONFIG_API.URL.BASE_API + 'dm_duan/del',
		searchduan:CONFIG_API.URL.USER_API+'search/duan',

	}

	this.DUANID = 0;
	this.MA = "";
	this.TEN = "";
	this.CHUDAUTU = "";
	this.DONVITHUCHIEN = "";
	this.TRANGTHAI = "";
	this.COCHETAICHINH = "";
	this.NOTE = "";
	this.TINHTHANHID = 0;
	this.NHATAITROID = 0;
	this.TIENTEID = 0;
	this.TONGMUCDAUTU = '';
	this.PHANTRAMVAYLAI = 0;
	this.STATUS = 0;
	this.CREATEDDATE = "";
	this.CREATEDBY = "";
	this.UPDATEDDATE = "";
	this.UPDATEDBY = "";
	this.MADUANCHA = "";
	this.TIEUDUAN = "";
	

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
		that.CHUDAUTU = item.CHUDAUTU;
		that.DONVITHUCHIEN = item.DONVITHUCHIEN;
		that.TRANGTHAI = item.TRANGTHAI;
		that.COCHETAICHINH = item.COCHETAICHINH;
		that.NOTE = item.NOTE;
		that.TINHTHANHID = item.TINHTHANHID;
		that.NHATAITROID = item.NHATAITROID;
		that.TONGMUCDAUTU = item.TONGMUCDAUTU;
		that.TIENTEID = item.TIENTEID;
		that.PHANTRAMVAYLAI = item.PHANTRAMVAYLAI;
		that.STATUS = item.STATUS;
		that.CREATEDDATE = item.CREATEDDATE;
		that.CREATEDBY = item.CREATEDBY;
		that.UPDATEDDATE = item.UPDATEDDATE;
		that.UPDATEDBY = item.UPDATEDBY;
		that.MADUANCHA = item.MADUANCHA;
		that.TIEUDUAN = item.TIEUDUAN;
	}
	this.getAllByNhaTaiTro = function(sId){
		var rs = DATA.get(URL.GETALLBYNHATAITRO, sId)
		that.LIST = rs;
	}

	// get data with keyword
	this.search = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}
	this.searchduan = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}


	//save data
	this.save = function () {
		var data = {
			DUANID: this.DUANID,
			MA: this.MA,
			TEN: this.TEN,
			CHUDAUTU: this.CHUDAUTU,
			DONVITHUCHIEN: this.DONVITHUCHIEN,
			TRANGTHAI : this.TRANGTHAI,
			COCHETAICHINH : this.COCHETAICHINH,
			NOTE: this.NOTE,
			TINHTHANHID: this.TINHTHANHID,
			NHATAITROID: this.NHATAITROID,
			TONGMUCDAUTU: this.TONGMUCDAUTU,
			TIENTEID: this.TIENTEID,
			PHANTRAMVAYLAI: this.PHANTRAMVAYLAI,
			STATUS : this.STATUS,
			CREATEDDATE : this.CREATEDDATE,
			CREATEDBY : this.CREATEDBY,
			UPDATEDDATE : this.UPDATEDDATE,
			UPDATEDBY : this.UPDATEDBY,
			MADUANCHA : this.MADUANCHA,
			TIEUDUAN : this.TIEUDUAN,
		} 
		return DATA.set(URL.SAVE, data);
	}

	//delete data
	this.del = function (sID) {
		return DATA.set(URL.DEL, { DUANID: sID });
	}

}