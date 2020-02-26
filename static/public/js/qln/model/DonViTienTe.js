var DonViTienTe = function(){
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
        that.BANRA = item.BANRA;
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
			TIENTEID:this.TIENTEID,
			MA:this.MA,
            TEN:this.TEN,
            NOTE:this.NOTE,
        }
		return  DATA.set(URL.SAVE,data);
	}
	//delete data
	this.del = function(sID){
		return DATA.set(URL.DEL,{TIENTEID:sID});
	}
	this.chuyendoitien = (p1,p2)=>{

		var rs1 = DATA.get(URL.GETBYID,{TIENTEID:p1});
		var rs2 = DATA.get(URL.GETBYID,{TIENTEID:p2});
		var out1 = rs1[0].BANRA.replace(',','')
		var out2 = rs2[0].BANRA.replace(',','')
		return out1/out2
		
	}
}