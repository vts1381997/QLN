var DotPHTP = function () {
	var that = this;

	const URL = {
		GETALL: CONFIG_API.URL.BASE_API + 'qln_dphtp/getall',
		GETBYID: CONFIG_API.URL.BASE_API + 'qln_dphtp/getbyid',
		SAVEDETAIL: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam_dtl/save',
		SEARCH: CONFIG_API.URL.BASE_API + 'qln_dphtp/search',
		SAVE: CONFIG_API.URL.BASE_API + 'qln_dphtp/save',
		DEL: CONFIG_API.URL.BASE_API + 'qln_dphtp/del',
		DELUID: CONFIG_API.URL.BASE_API + 'qln_dphtp/deluid',
		getDetail:CONFIG_API.URL.USER_API+'detail/dotphtp',
		saveDPHTP:CONFIG_API.URL.USER_API+'detail/save',
		searchdotphtp:CONFIG_API.URL.USER_API+'search/dotphtp',
	}

	this.DOTPHATHANHTRAIPHIEUID = 0;
	this.MA = "";
	this.TEN = "";
	this.SOQUYETDINH = "";
	this.NGAYQUYETDINH = "";
	this.KLPHDUKIEN = 0;
	this.KLPHTHANHCONG = 0;
	this.LAISUATPHDUKIEN = 0;
	this.LAISUATPHTHANHCONG = 0;
	this.KYHANTRAIPHIEU = 0;
	this.TENTOCHUCPHATHANH = "";
	this.TIENTHUCNHAN = 0;
	this.GHICHU = "";
	this.TINHTHANHID = 0;
	this.DEANPHATHANHTRAIPHIEUID = 0;
	this.THOIHANTRAIPHIEU = "";
	this.PHUONGTHUCPHATHANH = 0;
	this.NGAYPHATHANH = "";
	this.NOTE = "";
	this.MATRAIPHIEU = "";
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
		var rs = DATA.get(URL.GETBYID, { DOTPHATHANHTRAIPHIEUID: sId });
		var item = rs[0];
		that.DOTPHATHANHTRAIPHIEUID = item.DOTPHATHANHTRAIPHIEUID;
		that.MA = item.MA;
		that.TEN = item.TEN;
		that.SOQUYETDINH = item.SOQUYETDINH;
		that.NGAYQUYETDINH = item.NGAYQUYETDINH;
		that.KLPHDUKIEN = item.KLPHDUKIEN;
		that.KLPHTHANHCONG = item.KLPHTHANHCONG;
		that.LAISUATPHDUKIEN = item.LAISUATPHDUKIEN;
		that.LAISUATPHTHANHCONG = item.LAISUATPHTHANHCONG;
		that.KYHANTRAIPHIEU = item.KYHANTRAIPHIEU;
		that.TENTOCHUCPHATHANH = item.TENTOCHUCPHATHANH;
		that.TIENTHUCNHAN = item.TIENTHUCNHAN;
		that.GHICHU = item.GHICHU;
		that.TINHTHANHID = item.TINHTHANHID;
		that.DEANPHATHANHTRAIPHIEUID = item.DEANPHATHANHTRAIPHIEUID;
		that.NOTE = item.NOTE;
		that.THOIHANTRAIPHIEU = item.THOIHANTRAIPHIEU;
		that.NGAYPHATHANH = item.NGAYPHATHANH;
		that.PHUONGTHUCPHATHANH = item.PHUONGTHUCPHATHANH;	
		that.MATRAIPHIEU = item.MATRAIPHIEU;	
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

	this.searchdotphtp = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}

	//save data
	this.save = function () {
		var data = {
			DOTPHATHANHTRAIPHIEUID: that.DOTPHATHANHTRAIPHIEUID,
			MA: that.MA,
			TEN: that.TEN,
			SOQUYETDINH: that.SOQUYETDINH,
			NGAYQUYETDINH: that.NGAYQUYETDINH,
			KLPHDUKIEN: that.KLPHDUKIEN,
			KLPHTHANHCONG: that.KLPHTHANHCONG,
			LAISUATPHDUKIEN: that.LAISUATPHDUKIEN,
			LAISUATPHTHANHCONG: that.LAISUATPHTHANHCONG,
			GHICHU: that.GHICHU,
			DEANPHATHANHTRAIPHIEUID: that.DEANPHATHANHTRAIPHIEUID,
			NGAYPHATHANH: that.NGAYPHATHANH,
			PHUONGTHUCPHATHANH: that.PHUONGTHUCPHATHANH,				
			MATRAIPHIEU: that.MATRAIPHIEU,	
			UUID:that.UUID			
		}
		return DATA.set(URL.SAVE, data);
	}
	this.saveDPHTP = function (dt) {
		var data = {
			DOTPHATHANHTRAIPHIEUID: that.DOTPHATHANHTRAIPHIEUID,
			MA: that.MA,
			TEN: that.TEN,
			SOQUYETDINH: that.SOQUYETDINH,
			NGAYQUYETDINH: that.NGAYQUYETDINH,
			KLPHDUKIEN: that.KLPHDUKIEN,
			KLPHTHANHCONG: that.KLPHTHANHCONG,
			LAISUATPHDUKIEN: that.LAISUATPHDUKIEN,
			LAISUATPHTHANHCONG: that.LAISUATPHTHANHCONG,
			GHICHU: that.GHICHU,
			DEANPHATHANHTRAIPHIEUID: that.DEANPHATHANHTRAIPHIEUID,
			NGAYPHATHANH: that.NGAYPHATHANH,
			PHUONGTHUCPHATHANH: that.PHUONGTHUCPHATHANH,
			detail:dt					
		}
		return DATA.set(URL.saveDPHTP, data);
	}

	this.savedtl = function (pDelete, pData) {
		var dataDtl = {
			delete: pDelete,
			giatri: pData,
		}
		return DATA.set(URL.SAVEDETAIL, dataDtl);
	}

	//delete data
	this.del = function (sID) {
		return DATA.set(URL.DEL, { DOTPHATHANHTRAIPHIEUID: sID });
	}
	this.deluid = function (sID) {
		return DATA.set(URL.DELUID, { DOTPHATHANHTRAIPHIEUID: sID });
	}
	this.getDetail = function(sID){
		var a= DATA.get(URL.getDetail, { DOTPHATHANHTRAIPHIEUID: sID });
		return  a
	}

}