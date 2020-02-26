var NhaTaiTro = function(){
	var that = this;

	const URL = {
		GETALL:CONFIG_API.URL.BASE_API + 'dm_nhataitro/getall',
		GETBYID:CONFIG_API.URL.BASE_API + 'dm_nhataitro/getbyid',
		SEARCH:CONFIG_API.URL.BASE_API + 'dm_nhataitro/search',
		SAVE:CONFIG_API.URL.BASE_API + 'dm_nhataitro/save',
		DEL:CONFIG_API.URL.BASE_API + 'dm_nhataitro/del',
		searchdb:CONFIG_API.URL.USER_API+'search'
	}

	this.NHATAITROID=0;
	this.MA='';
	this.TEN='';
	this.SODIENTHOAI='';
	this.MASOTHUE='';
	this.SOTAIKHOAN='';
	this.DIACHI='';
	this.TRANGTHAI='';
	this.STATUS=0;
	this.CREATEDDATE='';
	this.CREATEDBY='';
	this.UPDATEDDATE='';
	this.UPDATEDBY='';

	this.getAll = function(){
		var rs = DATA.get(URL.GETALL);
		that.LIST = rs;
	}
	
	this.getById = function(sId){
		var rs = DATA.get(URL.GETBYID,{NHATAITROID:sId});
		var item = rs[0];
		that.NHATAITROID = item.NHATAITROID;
		that.MA = item.MA;
		that.TEN = item.TEN;
		that.SODIENTHOAI = item.SODIENTHOAI;
		that.MASOTHUE = item.MASOTHUE;
		that.SOTAIKHOAN = item.SOTAIKHOAN;
		that.DIACHI = item.DIACHI;
		that.TRANGTHAI = item.TRANGTHAI;
		that.STATUS = item.STATUS;
		that.CREATEDDATE = item.CREATEDDATE;
		that.CREATEDBY = item.CREATEDBY;
		that.UPDATEDDATE = item.UPDATEDDATE;
		that.UPDATEDBY = item.UPDATEDBY;
	}

	this.search = function(sKey){
		var rs = DATA.get(URL.SEARCH,{key:sKey});
		that.LIST = rs;
	}

	this.searchdb = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}
	
	this.save = function(){
		var data= {
			NHATAITROID:that.NHATAITROID,
			MA:that.MA,
			TEN:that.TEN,
			SODIENTHOAI:that.SODIENTHOAI,
			MASOTHUE:that.MASOTHUE,
			SOTAIKHOAN:that.SOTAIKHOAN,
			DIACHI:that.DIACHI,
			TRANGTHAI:that.TRANGTHAI,
			STATUS:that.STATUS,
			CREATEDDATE:that.CREATEDDATE,
			CREATEDBY:that.CREATEDBY,
			UPDATEDDATE:that.UPDATEDDATE,
			UPDATEDBY:that.UPDATEDBY
			
		}
		return  DATA.set(URL.SAVE,data);
	}
	
	this.del = function(){
		return DATA.set(URL.DEL,{NHATAITROID:that.NHATAITROID});
	}
	
}