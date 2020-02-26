var VayQuyDuTruTinh = function () {
	var that = this;

	const URL = {
		GETALL: CONFIG_API.URL.BASE_API + 'qln_vayquydutrutinh/getall',
		GETBYID: CONFIG_API.URL.BASE_API + 'qln_vayquydutrutinh/getbyid',
		SEARCH: CONFIG_API.URL.BASE_API + 'qln_vayquydutrutinh/search',
		SAVE: CONFIG_API.URL.BASE_API + 'qln_vayquydutrutinh/save',
		DEL: CONFIG_API.URL.BASE_API + 'qln_vayquydutrutinh/del',
		DELUID: CONFIG_API.URL.BASE_API + 'qln_vayquydutrutinh/deluid',
		GETHANMUC: CONFIG_API.URL.BASE_API + 'qln_vayquydutrutinh/gethanmuc',
		GetGocLai: CONFIG_API.URL.BASE_API + 'qln_vayquydutrutinh_goclai/getall',
		GocLaiSave: CONFIG_API.URL.BASE_API + 'qln_vayquydutrutinh_goclai/save',
		GetDauKyLuyKe: CONFIG_API.URL.BASE_API + 'qln_vaykhac/get_dauky_luyke'
	}

	this.VAYQUYDUTRUTINHID = 0;
	this.COQUANTAICHINH = "";
	this.NGAYVAY = "";
	this.THOIHANVAY = "";
	this.HANMUCVAY = 0;
	this.SOTIENVAY = 0;
	this.TRAGOC = 0;
	this.LAISUATVAY = 0;
	this.LUYKETRANO = 0;
	this.TIENTEID = "";
	this.TIEUDE = "";
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
		var rs = DATA.get(URL.GETBYID, { VAYQUYDUTRUTINHID: sId });
		var item = rs[ 0 ];
		that.VAYQUYDUTRUTINHID = item.VAYQUYDUTRUTINHID;
		that.THOIHANVAY = item.THOIHANVAY;
		that.THOIHANVAYDATE = item.THOIHANVAYDATE;
		that.HANMUCVAY = item.HANMUCVAY;
		that.LUYKEVAYTRONGNAM = item.LUYKEVAYTRONGNAM;
		that.SOTIENVAY = item.SOTIENVAY;
		that.SOTIENTRA = item.SOTIENTRA;
		that.NGAYVAY = item.NGAYVAY;
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

	//save data
	this.save = function () {
		var data = {
			VAYQUYDUTRUTINHID: that.VAYQUYDUTRUTINHID,
			NGAYVAY: that.NGAYVAY,
			THOIHANVAY: that.THOIHANVAY,
			THOIHANVAYDATE: that.THOIHANVAYDATE,
			HANMUCVAY: Number(that.HANMUCVAY),
			SOTIENVAY: that.SOTIENVAY,
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
		return DATA.set(URL.DEL, { VAYQUYDUTRUTINHID: sID });
	}
	this.deluid = function (sID) {
		return DATA.set(URL.DELUID, { VAYQUYDUTRUTINHID: sID });
	}

	this.getGocLai = (sId) => {
		return DATA.get(URL.GetGocLai, {
			i_vayquydutrutinhid
				: Number(sId)
		})
	}

	this.GocLaiSave = (data) => {
		return DATA.set(URL.GocLaiSave, data)
	}

}