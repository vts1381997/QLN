var VayNganQuyNhaNuoc = function () {
	var that = this;

	const URL = {
		GETALL: CONFIG_API.URL.BASE_API + 'qln_vaynganquynhanuoc/getall',
		GETBYID: CONFIG_API.URL.BASE_API + 'qln_vaynganquynhanuoc/getbyid',
		SEARCH: CONFIG_API.URL.BASE_API + 'qln_vaynganquynhanuoc/search',
		SAVE: CONFIG_API.URL.BASE_API + 'qln_vaynganquynhanuoc/save',
		DEL: CONFIG_API.URL.BASE_API + 'qln_vaynganquynhanuoc/del',
	}

	this.VAYNGANQUYNHANUOCID = 0;
	this.COQUANTAICHINH = "";
	this.NGUONVAY = "";
	this.TIEUDE = "";
	this.SOTIENVAY = 0;
	this.TIENTEID = 0;
	this.NGAYVAY = "";
	this.KYHANVAY = "";
	this.LAISUATVAY = 0;
	this.TINHTHANHID = 0;
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
		var rs = DATA.get(URL.GETBYID, { VAYNGANQUYNHANUOCID: sId });
		var item = rs[0];
		that.VAYNGANQUYNHANUOCID = item.VAYNGANQUYNHANUOCID;
		that.COQUANTAICHINH = item.COQUANTAICHINH;
		that.NGUONVAY = item.NGUONVAY;
		that.TIEUDE = item.TIEUDE;
		that.SOTIENVAY = item.SOTIENVAY;
		that.TIENTEID = item.TIENTEID;
		that.NGAYVAY = item.NGAYVAY;
		that.KYHANVAY = item.KYHANVAY;
		that.LAISUATVAY = item.LAISUATVAY;
		that.TINHTHANHID = item.TINHTHANHID;
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

	//save data
	this.save = function () {
		var data = {
			VAYNGANQUYNHANUOCID: that.VAYNGANQUYNHANUOCID,
			COQUANTAICHINH: that.COQUANTAICHINH,
			NGUONVAY: that.NGUONVAY,
			TIEUDE: that.TIEUDE,
			SOTIENVAY: that.SOTIENVAY,
			TIENTEID: that.TIENTEID,
			NGAYVAY: that.NGAYVAY,
			KYHANVAY: that.KYHANVAY,
			LAISUATVAY: that.LAISUATVAY,
			TINHTHANHID: that.TINHTHANHID,
		}
		return DATA.set(URL.SAVE, data);
	}

	//delete data
	this.del = function (sID) {
		return DATA.set(URL.DEL, { VAYNGANQUYNHANUOCID: sID });
	}

}