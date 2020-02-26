var HoanDoiTP = function () {
	var that = this;

	const URL = {
		GETALL: CONFIG_API.URL.BASE_API + 'qln_hoandoitp/getall',
		GETBYID: CONFIG_API.URL.BASE_API + 'qln_hoandoitp/getbyid',
		SAVEDETAIL: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam_dtl/save',
		SEARCH: CONFIG_API.URL.BASE_API + 'qln_hoandoitp/search',
		SAVE: CONFIG_API.URL.BASE_API + 'qln_hoandoitp/save',
		DEL: CONFIG_API.URL.BASE_API + 'qln_hoandoitp/del',
		GETDETAIL: CONFIG_API.URL.BASE_API + 'qln_hoandoitp/getdetail',
		searchhoandoitp:CONFIG_API.URL.USER_API+'search/hoandoitp',
		DELUID: CONFIG_API.URL.BASE_API + 'qln_hoandoitp/deluid',
		GETDETAIL: CONFIG_API.URL.BASE_API + 'qln_hoandoitp/getdetail'
	}

	this.HOANDOITRAIPHIEUID = 0;
	this.MA = "";
	this.TEN = "";
	this.PHUONGTHUCHOANDOI = "";
	this.NGAYHOANDOI = "";
	this.DANHSACHCHUSOHUU = "";
	this.NGAYPHONGTOA = "";
	this.TENTAISANBIHOANDOI = 0;
	this.TENTAISANDUOCHOANDOI = 0;
	this.KHOILUONGBIHOANDOI = 0;
	this.KHOILUONGDUOCHOANDOI = 0;
	this.GIABIHOANDOI = 0;
	this.GIADUOCHOANDOI = 0;
	this.TONGSOTIENBIHOANDOI = 0;
	this.TONGSOTIENDUOCHOANDOI = 0;
	this.LAISUATBIHOANDOI = 0;
	this.LAISUATDUOCHOANDOI = 0;
	this.STATUS = 0;
	this.CREATEDDATE = "";
	this.CREATEDBY = "";
	this.UPDATEDDATE = "";
	this.UPDATEDBY = "";

	// Get all data
	this.getAll = function () {
		var rs = DATA.get(URL.GETALL);

		that.LIST = rs;
	}

	// get data by id
	this.getById = function (sId) {
		var rs = DATA.get(URL.GETBYID, {
			HOANDOITRAIPHIEUID
				: sId
		});
		var item = rs[ 0 ];
		that.HOANDOITRAIPHIEUID = item.HOANDOITRAIPHIEUID;
		that.MA = item.MA;
		that.TEN = item.TEN;
		that.PHUONGTHUCHOANDOI = item.PHUONGTHUCHOANDOI;
		that.NGAYHOANDOI = item.NGAYHOANDOI;
		that.DANHSACHCHUSOHUU = item.DANHSACHCHUSOHUU;
		that.NGAYPHONGTOA = item.NGAYPHONGTOA;
		that.TENTAISANBIHOANDOI = item.TENTAISANBIHOANDOI;
		that.TENTAISANDUOCHOANDOI = item.TENTAISANDUOCHOANDOI;
		that.KHOILUONGBIHOANDOI = item.KHOILUONGBIHOANDOI;
		that.KHOILUONGDUOCHOANDOI = item.KHOILUONGDUOCHOANDOI;
		that.GIABIHOANDOI = item.GIABIHOANDOI;
		that.GIADUOCHOANDOI = item.GIADUOCHOANDOI;
		that.TONGSOTIENBIHOANDOI = item.TONGSOTIENBIHOANDOI;
		that.TONGSOTIENDUOCHOANDOI = item.TONGSOTIENDUOCHOANDOI;
		that.LAISUATBIHOANDOI = item.LAISUATBIHOANDOI;
		that.LAISUATDUOCHOANDOI = item.LAISUATDUOCHOANDOI;
		that.STATUS = item.STATUS;
		that.CREATEDDATE = item.CREATEDDATE;
		that.CREATEDBY = item.CREATEDBY;
		that.UPDATEDDATE = item.UPDATEDDATE;
		that.UPDATEDBY = item.UPDATEDBY;
	}

	this.getDetail = function (sId) {
		var _rs = DATA.get(URL.GETDETAIL, {
			i_hoandoitpid
				: Number(sId)
		});
		return _rs
	}

	// get data with keyword
	this.search = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}

	this.searchhoandoitp = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}

	//save data
	this.save = function (querydetail) {
		var data = {
			HOANDOITRAIPHIEUID: that.HOANDOITRAIPHIEUID,
			MA: that.MA,
			TEN: that.TEN,
			PHUONGTHUCHOANDOI: that.PHUONGTHUCHOANDOI,
			NGAYHOANDOI: that.NGAYHOANDOI,
			TENTAISANBIHOANDOI: that.TENTAISANBIHOANDOI,
			TENTAISANDUOCHOANDOI: that.TENTAISANDUOCHOANDOI,
			KHOILUONGBIHOANDOI: that.KHOILUONGBIHOANDOI,
			KHOILUONGDUOCHOANDOI: that.KHOILUONGDUOCHOANDOI,
			TONGSOTIENBIHOANDOI: that.TONGSOTIENBIHOANDOI,
			TONGSOTIENDUOCHOANDOI: that.TONGSOTIENDUOCHOANDOI,
			LAISUATBIHOANDOI: that.LAISUATBIHOANDOI,
			LAISUATDUOCHOANDOI: that.LAISUATDUOCHOANDOI,
			i_querydetail : querydetail,
			UUID:that.UUID
		}
		return DATA.set(URL.SAVE, data);
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
		return DATA.set(URL.DEL, { HOANDOITRAIPHIEUID: sID });
	}
	this.deluid = function (sID) {
		return DATA.set(URL.DELUID, { HOANDOITRAIPHIEUID: sID });
	}

}