var DonVi = function () {
	var that = this;

	const URL = {
		GETALL: CONFIG_API.URL.BASE_API + 'dm_donvi/getall',
		GETBYID: CONFIG_API.URL.BASE_API + 'dm_donvi/getbyid',
		GETBYIDCHA: CONFIG_API.URL.BASE_API + 'dm_donvi/getbyidcha',
		SEARCH: CONFIG_API.URL.BASE_API + 'dm_donvi/search',
		SAVE: CONFIG_API.URL.BASE_API + 'dm_donvi/save',
		DEL: CONFIG_API.URL.BASE_API + 'dm_donvi/del',
		searchdonvi:CONFIG_API.URL.USER_API+'search/donvi'	
	}

	this.DONVIID = "";
	this.MA ="";
	this.TENDONVI = "";
	this.TINHTHANHID = 0;
	this.IDCHA = 0;
	this.STATUS=1;
	this.NGUONTHU="";
	this.TYLE=0;
	// Get all data
	this.getAll = function () {
		var rs = DATA.get(URL.GETALL);
		that.LIST = rs;
	}

	// get data by id
	this.getById = function (sId) {
		var rs = DATA.get(URL.GETBYID, { DONVIID: sId });
		var item = rs[0];
		that.DONVIID = item.DONVIID;
		that.MA = item.MA;
		that.TENDONVI = item.TENDONVI;
		that.TINHTHANHID = item.TINHTHANHID;
		that.IDCHA = item.IDCHA;
		that.NGUONTHU = item.NGUONTHU;
		that.TYLE = item.TYLE;
	}

	// get data with keyword	
	this.search = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}

	this.getByIdCha = function (sKey) { 
		var rs = DATA.get(URL.GETBYIDCHA, { key: sKey }); 
		return rs
	}

	this.searchdonvi = function (sKey) {
		var rs = DATA.get(URL.searchdb, { key: sKey });
		that.LIST = rs;
	}
	
	//save data
	this.save = function () {
		var data = {
			DONVIID: this.DONVIID,
			TENDONVI: this.TENDONVI,
			TINHTHANHID: this.TINHTHANHID,
			IDCHA: this.IDCHA,
			STATUS:this.STATUS,
			MA: this.MA,
			NGUONTHU: this.NGUONTHU,
			TYLE: this.TYLE
		}
		return DATA.set(URL.SAVE, data);
	}

	//delete data
	this.del = function (sID) {
		return DATA.set(URL.DEL, { DONVIID: sID });
	}

}