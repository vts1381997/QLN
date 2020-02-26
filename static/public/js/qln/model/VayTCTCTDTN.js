var VayTCTCTDTN = function () {
	var that = this;

	const URL = {
		GETALL: CONFIG_API.URL.BASE_API + 'qln_vaytctctdtn/getall',
		GETBYID: CONFIG_API.URL.BASE_API + 'qln_vaytctctdtn/getbyid',
		GETTRANO: CONFIG_API.URL.BASE_API + 'qln_vaytctctdtn/gettrano',
		SEARCH: CONFIG_API.URL.BASE_API + 'qln_vaytctctdtn/search',
		SAVE: CONFIG_API.URL.BASE_API + 'qln_vaytctctdtn/save',
		DEL: CONFIG_API.URL.BASE_API + 'qln_vaytctctdtn/del',
		DELUID: CONFIG_API.URL.BASE_API + 'qln_vaytctctdtn/deluid',
		GetTinhThanh: CONFIG_API.URL.BASE_API + 'dm_tinhthanh/getall',
		GetGocLai: CONFIG_API.URL.BASE_API + 'qln_vaytctctctd_goclai/getall',
		GocLaiSave: CONFIG_API.URL.BASE_API + 'qln_vaytctctctd_goclai/save',
		GetDauKyLuyKe: CONFIG_API.URL.BASE_API + 'qln_vaykhac/get_dauky_luyke'
	}

	this.VAYTCTCTDTNID = 0;
	this.TINHTHANHID = 0;
	this.NGAYVAY = "";
	this.THOIHANVAY = 0;
	this.THOIHANVAYDATE = "";
	this.SOTIENVAY = 0;
	this.LAISUAT = 0;
	this.LUYKETRANO = "";
	this.DUNO = 0;
	this.DONVIID = "";
	this.MAHOPDONG = "";
	this.NGAYHOPDONG = "";
	this.STATUS = 0;
	this.CREATEDDATE = "";
	this.CREATEDBY = "";
	this.UPDATEDDATE = "";
	this.UPDATEDBY = "";
	this.UUID=''
	// Get all data
	this.getAll = function () {
		var rs = DATA.get(URL.GETALL);
		that.LIST = rs;
	}

	// get data by id
	this.getById = function (sId) {
		var rs = DATA.get(URL.GETBYID, { VAYTCTCTDTNID: sId });
		var item = rs[ 0 ];
		that.VAYTCTCTDTNID = item.VAYTCTCTDTNID;
		that.NGAYVAY = item.NGAYVAY;
		that.THOIHANVAY = item.THOIHANVAY;
		that.THOIHANVAYDATE = item.THOIHANVAYDATE;
		that.SOTIENVAY = item.SOTIENVAY;
		that.LAIPHI = item.LAIPHI;
		that.LUYKETRANO = item.LUYKETRANO;
		that.DUNO = item.DUNO;
		that.DONVIID = item.DONVIID;
		that.MAHOPDONG = item.MAHOPDONG;
		that.NGAYHOPDONG = item.NGAYHOPDONG;
		that.STATUS = item.STATUS;
		that.CREATEDDATE = item.CREATEDDATE;
		that.CREATEDBY = item.CREATEDBY;
		that.UPDATEDDATE = item.UPDATEDDATE;
		that.UPDATEDBY = item.UPDATEDBY;
		return rs
	}
	this.getDauKyLuyKe = function(data){
		var rs = DATA.get(URL.GetDauKyLuyKe, data);
		return rs;
	}

	
	// get data with keyword
	this.search = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}

	//save data
	this.save = function () {
		var data = {
			VAYTCTCTDTNID: that.VAYTCTCTDTNID,
			NGAYVAY: that.NGAYVAY,
			THOIHANVAY: that.THOIHANVAY,
			THOIHANVAYDATE: that.THOIHANVAYDATE,
			SOTIENVAY: that.SOTIENVAY,
			LAISUAT: that.LAISUAT,
			LUYKETRANO: that.LUYKETRANO,
			DUNO: that.DUNO,
			DONVIID: that.DONVIID,
			MAHOPDONG: that.MAHOPDONG,
			UUID:that.UUID
		}
		return DATA.set(URL.SAVE, data);
	}
	this.getHanMuc = function (sNgayVay, sTinhThanhId) {
		var data = {
			NGAYVAY: sNgayVay,
			TINHTHANHID: parseInt(sTinhThanhId),
		}
		var rs = DATA.get(URL.GETTRANO, data);
		that.LIST = rs;
	}
	//delete data
	this.del = function (sID) {
		return DATA.set(URL.DEL, { VAYCTCTDTNID: sID });
	}
	this.deluid = function (sID) {
		return DATA.set(URL.DELUID, { VAYCTCTDTNID: sID });
	}

	this.getGocLai = (sId) => {
		return DATA.get(URL.GetGocLai, {
			i_vaytctctctdid
				: Number(sId)
		})
	}

	this.GocLaiSave = (data) => {
		return DATA.set(URL.GocLaiSave, data)
	}

}