var VayVDB = function () {
	var that = this;

	const URL = {
		GETALL: CONFIG_API.URL.BASE_API + 'qln_vayvdb/getall',
		GETBYID: CONFIG_API.URL.BASE_API + 'qln_vayvdb/getbyid',
		GETHANMUC: CONFIG_API.URL.BASE_API + 'qln_vayvdb/gethanmuc',
		SEARCH: CONFIG_API.URL.BASE_API + 'qln_vayvdb/search',
		SAVE: CONFIG_API.URL.BASE_API + 'qln_vayvdb/save',
		DEL: CONFIG_API.URL.BASE_API + 'qln_vayvdb/del',
		DELUID: CONFIG_API.URL.BASE_API + 'qln_vayvdb/deluid',
		GetGocLai: CONFIG_API.URL.BASE_API + 'qln_vayvdb_goclai/getall',
		GocLaiSave: CONFIG_API.URL.BASE_API + 'qln_vayvdb_goclai/save',
		searchvayvdb:CONFIG_API.URL.USER_API+'search/vayvdb',
		GetDauKyLuyKe: CONFIG_API.URL.BASE_API + 'qln_vaykhac/get_dauky_luyke'
	}

	this.VAYVDBID = 0;
	this.NGAYVAY = "";
	this.THOIHANVAY = "";
	this.THOIHANVAYDATE = "";
	this.SOTIENVAY = 0;
	this.SOTIENTRA = 0;
	this.LAISUAT=0;
	this.DONVIID = "";
	this.MAHOPDONG = "";
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
		var rs = DATA.get(URL.GETBYID, {
			VAYVDBID
				: sId
		});
		var item = rs[0];
		that.VAYVDBID = item.VAYVDBID;
		that.NGAYVAY = item.NGAYVAY;
		that.SOTIENTRA = item.SOTIENTRA;
		that.SOTIENVAY = item.SOTIENVAY;
		that.LUYKEVAYTRONGNAM = item.LUYKEVAYTRONGNAM;
		that.LAISUAT = item.LAISUAT;
		that.THOIHANVAY = item.THOIHANVAY;
		that.THOIHANVAYDATE = item.THOIHANVAYDATE;
		that.DONVIID = item.DONVIID;
		that.MAHOPDONG = item.MAHOPDONG;
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

	this.searchvayvdb = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}

	//save data
	this.save = function () {
		var data = {
			VAYVDBID: that.VAYVDBID,
			NGAYVAY: that.NGAYVAY,
			THOIHANVAY: that.THOIHANVAY,
			THOIHANVAYDATE: that.THOIHANVAYDATE,
			SOTIENVAY: that.SOTIENVAY,
			SOTIENTRA: that.SOTIENTRA,
			LAISUAT: that.LAISUAT,
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
		var rs = DATA.get(URL.GETHANMUC, data);
		that.LIST = rs;
	}
	//delete data
	this.del = function (sID) {
		return DATA.set(URL.DEL, {
			VAYVDBID
				: sID
		});
	}
	this.deluid = function (sID) {
		return DATA.set(URL.DELUID, {
			VAYVDBID
				: sID
		});
	}

	this.getGocLai = (sId) => {
		return DATA.get(URL.GetGocLai, {
			i_vayvdbid
				: Number(sId)
		})
	}

	this.GocLaiSave = (data) => {
		return DATA.set(URL.GocLaiSave, data)
	}

}