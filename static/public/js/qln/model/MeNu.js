var MeNu = function () {
	var that = this;

	const URL = {
		GETALL: CONFIG_API.URL.BASE_API + 'menu/getall',
		GETBYID: CONFIG_API.URL.BASE_API + 'menu/getbyid',
		SEARCH: CONFIG_API.URL.BASE_API + 'menu/search',
		SAVE: CONFIG_API.URL.BASE_API + 'menu/save',
		DEL: CONFIG_API.URL.BASE_API + 'menu/del',
	}

    this.ID = "";
    this.STT = 0;
	this.IDCHA ="";
	this.NAME = "";
	this.URL = "";
	this.STATUS=1;
	// Get all data
	this.getAll = function () {
		var rs = DATA.get(URL.GETALL);
		that.LIST = rs;
	}

	// get data by id
	this.getById = function (sId) {
		var rs = DATA.get(URL.GETBYID, { ID: sId });
		var item = rs[0];
        that.STT = item.STT;
        that.IDCHA = item.IDCHA;
		that.MA = item.MA;
		that.NAME = item.NAME;
		that.URL = item.URL;
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
			IDCHA: this.IDCHA,
			NAME: this.NAME,
			STT: this.STT,
			URL: this.URL,
			STATUS:this.STATUS
		}
		return DATA.set(URL.SAVE, data);
	}

	//delete data
	this.del = function (sID) {
		return DATA.set(URL.DEL, { ID: sID });
	}

}