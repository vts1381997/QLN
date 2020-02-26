var dm_hopdongvayoda = function(){
	var that = this;

	this.hopdongvayodaid=0;
	this.sohopdong=0;
	this.tenduan="";
	this.ngayky="";
	this.coquanchovaylai="";
	this.coquanuyquyenchovaylai="";
	this.sotienkyvay=0;
	this.laisuatvay=0;
	this.ngayhieuluc="";
	this.ngaytranogocdautien="";
	this.ngaytranolaidautien="";
	this.ngaytranogoccuoicung="";
	this.ngaytranolaicuoicung="";
	this.phuongthuctranogoc="";
	this.phuongthuctranolai="";
	this.laiphat="";
	this.sohiepdinhvaynuocngoai=0;
	this.phihiepdinhvaynuocngoai=0;
	this.phiquanlychovaylai=0;
	this.loailaisuat="";
	this.loaitien="";
	this.status=0;
	this.createddate="";
	this.createdby="";
	this.updateddate="";
	this.updatedby="";


	this.getAll = function(){
		var rs = DATA.get(CONFIG_API.URL.DM_HOPDONGVAYODA_GETALL);
		that.LIST = rs;
	}
	
	this.getById = function(sId){
		var rs = ApiHelper.Private.post(CONFIG_API.URL.ACCOUNT_GETBYID,{id:sId});
		var item = rs.RESULT[0];
		that.hopdongvayodaid = item.hopdongvayodaid;
		that.sohopdong = item.sohopdong;
		that.tenduan = item.tenduan;
		that.ngayky = item.ngayky;
		that.coquanchovaylai = item.coquanchovaylai;
		that.coquanuyquyenchovaylai = item.coquanuyquyenchovaylai;
		that.sotienkyvay = item.sotienkyvay;
		that.laisuatvay = item.laisuatvay;
		that.ngayhieuluc = item.ngayhieuluc;
		that.ngaytranogocdautien = item.ngaytranogocdautien;
		that.ngaytranolaidautien = item.ngaytranolaidautien;
		that.ngaytranogoccuoicung = item.ngaytranogoccuoicung;
		that.ngaytranolaicuoicung = item.ngaytranolaicuoicung;
		that.phuongthuctranogoc = item.phuongthuctranogoc;
		that.phuongthuctranolai = item.phuongthuctranolai;
		that.laiphat = item.laiphat;
		that.sohiepdinhvaynuocngoai = item.sohiepdinhvaynuocngoai;
		that.phihiepdinhvaynuocngoai = item.phihiepdinhvaynuocngoai;
		that.phiquanlychovaylai = item.phiquanlychovaylai;
		that.loailaisuat = item.loailaisuat;
		that.loaitien = item.loaitien;
		that.status = item.status;
		that.createddate = item.createddate;
		that.createdby = item.createdby;
		that.updateddate = item.updateddate;
		that.updatedby = item.updatedby;
	}

	this.search = function(sKey){
		var rs = ApiHelper.Private.post(CONFIG_API.URL.ACCOUNT_SEARCH,{key:sKey});
		that.LIST = rs.RESULT;
	}
	
	this.save = function(){
		var data= {
			hopdongvayodaid:that.hopdongvayodaid,
			sohopdong:that.sohopdong,
			tenduan:that.tenduan,
			ngayky:that.ngayky,
			coquanchovaylai:that.coquanchovaylai,
			coquanuyquyenchovaylai:that.coquanuyquyenchovaylai,
			sotienkyvay:that.sotienkyvay,
			laisuatvay:that.laisuatvay,
			ngayhieuluc:that.ngayhieuluc,
			ngaytranogocdautien:that.ngaytranogocdautien,
			ngaytranolaidautien:that.ngaytranolaidautien,
			ngaytranogoccuoicung:that.ngaytranogoccuoicung,
			ngaytranolaicuoicung:that.ngaytranolaicuoicung,
			phuongthuctranogoc:that.phuongthuctranogoc,
			phuongthuctranolai:that.phuongthuctranolai,
			laiphat:that.laiphat,
			sohiepdinhvaynuocngoai:that.sohiepdinhvaynuocngoai,
			phihiepdinhvaynuocngoai:that.phihiepdinhvaynuocngoai,
			phiquanlychovaylai:that.phiquanlychovaylai,
			loailaisuat:that.loailaisuat,
			loaitien:that.loaitien,
			status:that.status,
			createddate:that.createddate,
			createdby:that.createdby,
			updateddate:that.updateddate,
			updatedby:that.updatedby
			
		}
		return  ApiHelper.Private.post(CONFIG_API.URL.ACCOUNT_SAVE,data);
	}
	
	this.del = function(){
		return ApiHelper.Private.post(CONFIG_API.URL.ACCOUNT_DEL,{id:that.id});
	}
	
}