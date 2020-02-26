var ComTest = function(){
	var that = this;

	const URL = {
		GETALL:CONFIG_API.URL.BASE_API + 'dm_com_test/getall',
		GETBYID:CONFIG_API.URL.BASE_API + 'dm_com_test/getbyid',
		SEARCH:CONFIG_API.URL.BASE_API + 'dm_com_test/search',
		SAVE:CONFIG_API.URL.BASE_API + 'dm_com_test/save',
		DEL:CONFIG_API.URL.BASE_API + 'dm_com_test/del',
	}

	this.TESTID=0;							
	this.CODE="";
	this.NAME="";

	// Get all data
	this.getAll = function(){
		var rs = DATA.get(URL.GETALL);
		that.LIST = rs;
	}
	
	// get data by id
	this.getById = function(sId){
		var rs = DATA.get(URL.GETBYID,{TESTID:sId});
		var item = rs[0];
		that.TESTID = item.ID;
		that.CODE = item.HOTEN;
		that.NAME = item.DIACHI;

	}

	// get data with keyword
	this.search = function(sKey){
		var rs = DATA.get(URL.SEARCH,{key:sKey});
		that.LIST = rs;
	}
	
	//save data
	this.save = function(){
		var data= {
			TESTID:that.TESTID,
			CODE:that.CODE,
			NAME:that.NAME,
		}
		return  DATA.set(URL.SAVE,data);
	}
	
	//delete data
	this.del = function(sID){
		return DATA.set(URL.DEL,{TESTID:sID});
	}
	
}