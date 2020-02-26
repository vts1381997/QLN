var VayNhaTaiTro = function(){
	var that = this;

	const URL = {
		GETALL:CONFIG_API.URL.BASE_API + 'qln_vaynhataitro/getall',
		GETBYID:CONFIG_API.URL.BASE_API + 'qln_vaynhataitro/getbyid',
		SEARCH:CONFIG_API.URL.BASE_API + 'qln_vaynhataitro/search',
		SAVE:CONFIG_API.URL.BASE_API + 'qln_vaynhataitro/save',
		DEL:CONFIG_API.URL.BASE_API + 'qln_vaynhataitro/del',
	}

	this.VAYNHATAITROID=0;
	this.DUAN="";
	this.NGAYTAO="";
	this.DUNOTONKY=0;
	this.VAYTRONGKY=0;
	this.GOC=0;
	this.LAIPHI=0;
	this.TONG=0;
	this.TINHTHANHID=0;
	this.STATUS=0;
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
		var rs = DATA.get(URL.GETBYID,{VAYNHATAITROID
:sId});
		var item = rs[0];
		that.VAYNHATAITROID = item.VAYNHATAITROID;
		that.DUAN = item.DUAN;
		that.NGAYTAO = item.NGAYTAO;
		that.DUNOTONKY = item.DUNOTONKY;
		that.VAYTRONGKY = item.VAYTRONGKY;
		that.GOC= item.GOC;
		that.LAIPHI = item.LAIPHI;
		that.TONG = item.TONG;
		that.TINHTHANHID = item.TINHTHANHID;	
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
			VAYNHATAITROID:that.VAYNHATAITROID,
			DUAN:that.DUAN,
			NGAYTAO:that.NGAYTAO,
			DUNOTONKY:that.DUNOTONKY,
			VAYTRONGKY:that.VAYTRONGKY,
			GOC:that.GOC,
			LAIPHI:that.LAIPHI,
			TONG:that.TONG,
			TINHTHANHID:that.TINHTHANHID,
			// STATUS:that.STATUS,
			// CREATEDDATE:that.CREATEDDATE,
			// CREATEDBY:that.CREATEDBY,
			// UPDATEDDATE:that.UPDATEDDATE,
			// UPDATEDBY:that.UPDATEDBY,
		}
		return  DATA.set(URL.SAVE,data);
	}
	
	//delete data
	this.del = function(sID){
		return DATA.set(URL.DEL,{VAYNHATAITROID
:sID});
	}
	
}