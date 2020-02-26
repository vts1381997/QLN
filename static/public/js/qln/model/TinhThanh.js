var TinhThanh = function(){
	var that = this;

	const URL = {
		GETALL:CONFIG_API.URL.BASE_API + 'dm_tinhthanh/getall',
		GETBYID:CONFIG_API.URL.BASE_API + 'dm_tinhthanh/getbyid',
		SEARCH:CONFIG_API.URL.BASE_API + 'dm_tinhthanh/search',
		SAVE:CONFIG_API.URL.BASE_API + 'dm_tinhthanh/save',
		DEL:CONFIG_API.URL.BASE_API + 'dm_tinhthanh/del',
		getone:CONFIG_API.URL.BASE_API + 'dm_tinhthanh/getone',
		GETBY_DEPRTMENTID: CONFIG_API.URL.BASE_API + 'dm_tinhthanh/getby_department'
	}

	this.TINHTHANHID=0;							
	this.MA="";
	this.TEN="";
	this.NOTE="";
	this.STATUS=0;
	this.CREATEDDATE="";
	this.CREATEDBY="";
	this.UPDATEDDATE="";
	this.UPDATEDBY="";
	//get by department id
	this.getByDepartmentId = function() {
		var rs = DATA.get(URL.GETBY_DEPRTMENTID)
		return rs
	}
	// Get all data
	this.getAll = function(){
		var rs = DATA.get(URL.GETALL);

		that.LIST = rs;
	}
	this.getone = function(){
		var rs = DATA.get(URL.getone);

		that.LIST = rs;
	}
	
	// get data by id
	this.getById = function(sId){
		var rs = DATA.get(URL.GETBYID,{TINHTHANHID:sId});
		var item = rs[0];
		that.TINHTHANHID = item.TINHTHANHID;
		that.MA = item.MA;
		that.TEN = item.TEN;
		that.NOTE = item.NOTE;
		that.STATUS = item.STATUS;
		that.CREATEDDATE = item.CREATEDDATE;
		that.CREATEDBY = item.CREATEDBY;
		that.UPDATEDDATE = item.UPDATEDDATE;
		that.UPDATEDBY = item.UPDATEDBY;
	}

	// get data with keyword
	this.search = function(sKey){
		var rs = DATA.get(URL.SEARCH,{key:sKey});
		that.LIST = rs;
	}
	
	//save data
	this.save = function(){
		var data= {
			TINHTHANHID:that.TINHTHANHID,
			MA:that.MA,
			TEN:that.TEN,
			NOTE:that.NOTE,
			STATUS:that.STATUS,
			CREATEDDATE:that.CREATEDDATE,
			CREATEDBY:that.CREATEDBY,
			UPDATEDDATE:that.UPDATEDDATE,
			UPDATEDBY:that.UPDATEDBY
			
		}
		return  DATA.set(URL.SAVE,data);
	}
	
	//delete data
	this.del = function(sID){
		return DATA.set(URL.DEL,{TINHTHANHID:sID});
	}
	
}