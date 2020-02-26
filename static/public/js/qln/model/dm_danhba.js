var dm_danhba = function(){
	var that = this;

	const URL = {
		GETALL:CONFIG_API.URL.BASE_API + 'dm_danhba/getall',
		GETBYID:CONFIG_API.URL.BASE_API + 'dm_danhba/getbyid',
		SEARCH:CONFIG_API.URL.BASE_API + 'dm_danhba/search',
		SAVE:CONFIG_API.URL.BASE_API + 'dm_danhba/save',
		DEL:CONFIG_API.URL.BASE_API + 'dm_danhba/del',
	}

	this.DANHBAID=0;
	this.HOTEN='';
	this.SODIENTHOAI='';
	this.EMAIL='';
	this.DIACHI='';
	// Thuộc tính bổ xung
	this.STATUS=1;
	this.CREATEDDATE="";
	this.CREATEDBY="";
	this.UPDATEDDATE="";
	this.UPDATEDBY="";

	this.getAll = function(){
		var rs = DATA.get(URL.GETALL);
		that.LIST = rs;
	}
	
	this.getById = function(sId){
		var rs = DATA.get(URL.GETBYID,{DANHBAID:sId});
		var item = rs[0];
		that.DANHBAID = item.DANHBAID;
		that.HOTEN = item.HOTEN;
		that.SODIENTHOAI = item.SODIENTHOAI;
		that.EMAIL = item.EMAIL;
		that.DIACHI = item.DIACHI;
		
		that.STATUS = item.STATUS;
		that.CREATEDDATE = item.CREATEDDATE;
		that.CREATEDBY = item.CREATEDBY;
		that.UPDATEDDATE = item.UPDATEDDATE;
		that.UPDATEDBY = item.UPDATEDBY;
	}

	this.search = function(sKey){
		var rs = DATA.get(URL.SEARCH,{KEY:sKey});
		that.LIST = rs;
	}
	
	this.save = function(){
		var data= {
			DANHBAID:that.DANHBAID
			,HOTEN:that.HOTEN
			,SODIENTHOAI:that.SODIENTHOAI
			,EMAIL:that.EMAIL
			,DIACHI:that.DIACHI
			,STATUS:that.STATUS
			,CREATEDDATE:that.CREATEDDATE
			,CREATEDBY:that.CREATEDBY
			,UPDATEDDATE:that.UPDATEDDATE
			,UPDATEDBY:that.UPDATEDBY
		}
		return  DATA.set(URL.SAVE,data);
	}
	
	this.del = function(sId){
		return DATA.set(URL.DEL,{DANHBAID:sId});
	}
	
}