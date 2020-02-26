var VayKBNN = function () {
	var that = this;

	const URL = {
		GETALL: CONFIG_API.URL.BASE_API + 'qln_vaykbnn/getall',
		GETBYID: CONFIG_API.URL.BASE_API + 'qln_vaykbnn/getbyid',
		SEARCH: CONFIG_API.URL.BASE_API + 'qln_vaykbnn/search',
		SAVE: CONFIG_API.URL.BASE_API + 'qln_vaykbnn/save',
		DEL: CONFIG_API.URL.BASE_API + 'qln_vaykbnn/del',
		DELUID: CONFIG_API.URL.BASE_API + 'qln_vaykbnn/deluid',
		GETDUNOLUYKE: CONFIG_API.URL.BASE_API + 'qln_vaykbnn/getdunoluyke',
		GetTinhThanh: CONFIG_API.URL.BASE_API + 'dm_tinhthanh/getall',
		GetGocLai: CONFIG_API.URL.BASE_API + 'qln_vaykhobacnhanuoc_goclai/getall',
		GocLaiSave: CONFIG_API.URL.BASE_API + 'qln_vaykhobacnhanuoc_goclai/save',
		GetDauKyLuyKe: CONFIG_API.URL.BASE_API + 'qln_vaykhac/get_dauky_luyke'
	}

	this.VAYKHOBACNHANUOCID = 0;
	this.MUCDICHVAY = "";
	this.NGAYVAY = "";
	this.THOIHANVAY = "";
	this.VAYTRONGKY = 0;
	this.DUNODAUKY = 0;
	this.DONVIID = 0;
	this.TRANOGOC = 0;
	this.BUDAPBOICHI = 0;
	this.THOIHANVAYDATE = "";
	this.LUYKETRANOGOC = 0;
	this.LAIPHI = 0;
	this.SOTIENCONLAI = 0;
	this.MAHOPDONG = "";
	this.NGAYHOPDONG = "";
	this.STATUS = 0;
	this.CREATEDDATE = "";
	this.CREATEDBY = "";
	this.UPDATEDDATE = "";
	this.UPDATEDBY = "";
	this.UUID = ''
	// Get all data
	this.getAll = function () {
		var rs = DATA.get(URL.GETALL);
		that.LIST = rs;
	}
	this.getDuNoLuyKe = function (sNgayVay, sDONVIID) {
		var data = {
			NGAYVAY: sNgayVay,
			DONVIID: parseInt(sDONVIID),
		}
		var rs = DATA.get(URL.GETDUNOLUYKE, data);
		that.LIST = rs;
	}
	this.getDauKyLuyKe = function (data) {
		var rs = DATA.get(URL.GetDauKyLuyKe, data);
		return rs;
	}

	// get data by id
	this.getById = function (sId) {
		var rs = DATA.get(URL.GETBYID, {
			VAYKHOBACNHANUOCID
				: sId
		});
		var item = rs[0];
		that.VAYKHOBACNHANUOCID = item.VAYKHOBACNHANUOCID;
		that.NGAYVAY = item.NGAYVAY;
		that.DONVIID = item.DONVIID;
		that.DUNODAUKY = item.DUNODAUKY;
		that.THOIHANVAY = item.THOIHANVAY;
		that.THOIHANVAYDATE = item.THOIHANVAYDATE;
		that.LUYKETRANOGOC = item.LUYKETRANOGOC;
		that.LAIPHI = item.LAIPHI;
		that.TRANOGOC = item.TRANOGOC;
		that.NOGOC = item.NOGOC;
		that.BUDAPBOICHI = item.BUDAPBOICHI;
		that.BOICHI = item.BOICHI;
		that.NGAYHOPDONG = item.NGAYHOPDONG;
		that.STATUS = item.STATUS;
		that.CREATEDDATE = item.CREATEDDATE;
		that.CREATEDBY = item.CREATEDBY;
		that.UPDATEDDATE = item.UPDATEDDATE;
		that.UPDATEDBY = item.UPDATEDBY;
		that.MAHOPDONG = item.MAHOPDONG
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
			VAYKHOBACNHANUOCID: that.VAYKHOBACNHANUOCID,
			NGAYVAY: that.NGAYVAY,
			DONVIID: that.DONVIID,
			THOIHANVAY: that.THOIHANVAY,
			LAIPHI: that.LAIPHI,
			TRANOGOC: that.TRANOGOC,
			BUDAPBOICHI: that.BUDAPBOICHI,
			THOIHANVAYDATE: that.THOIHANVAYDATE,
			MAHOPDONG: that.MAHOPDONG,
			UUID: that.UUID
		}
		return DATA.set(URL.SAVE, data);
	}

	//delete data
	this.del = function (sID) {
		return DATA.set(URL.DEL, {
			VAYKHOBACNHANUOCID
				: sID
		});
	}
	this.deluid = function (sID) {
		return DATA.set(URL.oVayVDB, {VAYKHOBACNHANUOCID: sID});
	}

	this.getGocLai = (sId) => {
		return DATA.get(URL.GetGocLai, {
			i_vaykhobacnhanuocid
				: Number(sId)
		})
	}

	this.GocLaiSave = (data) => {
		return DATA.set(URL.GocLaiSave, data)
	}

}