var TienTe = function(){
	var that = this;

	const URL = {
		GETALL:CONFIG_API.URL.BASE_API + 'dm_tiente/getall',
		GETBYID:CONFIG_API.URL.BASE_API + 'dm_tiente/getbyid',
		SEARCH:CONFIG_API.URL.BASE_API + 'dm_tiente/search',
		SAVE:CONFIG_API.URL.BASE_API + 'dm_tiente/save',
		DEL:CONFIG_API.URL.BASE_API + 'dm_tiente/del',
	}

	this.TIENTEID=0;							
	this.MA="";
	this.TEN="";
	this.BANRA="";
	this.STATUS=0;
	this.NOTE="";
	this.CREATEDDATE="";
	this.CREATEDBY="";
	this.UPDATEDDATE="";
	this.UPDATEDBY="";

	// Get all data
	this.getAll = function(){
		var rs = DATA.get(URL.GETALL);

		that.LIST = rs;
	}
	
	// get data by id
	this.getById = function(sId){
		var rs = DATA.get(URL.GETBYID,{TIENTEID:sId});
		var item = rs[0];
		that.TIENTEID = item.TIENTEID;
		that.MA = item.MA;
		that.TEN = item.TEN;		
		that.TEN = item.TEN;		
		that.BANRA = item.BANRA;		
		that.STATUS = item.STATUS;
		that.NOTE = item.NOTE;
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
			TIENTEID:that.TIENTEID,
			MA:that.MA,
			TEN:that.TEN,		
			BANRA:that.BANRA,		
			STATUS:that.STATUS,
			NOTE:that.NOTE,
			CREATEDDATE:that.CREATEDDATE,
			CREATEDBY:that.CREATEDBY,
			UPDATEDDATE:that.UPDATEDDATE,
			UPDATEDBY:that.UPDATEDBY
			
		}
		return  DATA.set(URL.SAVE,data);
	}
	
	//delete data
	this.del = function(sID){
		return DATA.set(URL.DEL,{TIENTEID:sID});
	}
	
}