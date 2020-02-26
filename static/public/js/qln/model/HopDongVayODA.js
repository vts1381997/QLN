var HopDongVayODA = function () {
	var that = this;
	const URL = {
		GETALL: CONFIG_API.URL.BASE_API + 'dm_hopdongvayoda/getall',
		GETBYID: CONFIG_API.URL.BASE_API + 'dm_hopdongvayoda/getbyid',
		SEARCH: CONFIG_API.URL.BASE_API + 'dm_hopdongvayoda/search',
		SAVE: CONFIG_API.URL.BASE_API + 'dm_hopdongvayoda/save',
		DEL: CONFIG_API.URL.BASE_API + 'dm_hopdongvayoda/del',
	}

	this.hopdongvayodaid = 0;
	this.sohopdong = 0;
	this.tenduan = "";
	this.ngayky = "";
	this.coquanchovaylai = "";
	this.coquanuyquyenchovaylai = "";
	this.sotienkyvay = 0;
	this.laisuatvay = 0;
	this.ngayhieuluc = "";
	this.ngaytranogocdautien = "";
	this.ngaytranolaidautien = "";
	this.ngaytranogoccuoicung = "";
	this.ngaytranolaicuoicung = "";
	this.phuongthuctranogoc = "";
	this.phuongthuctranolai = "";
	this.laiphat = "";
	this.sohiepdinhvaynuocngoai = 0;
	this.phihiepdinhvaynuocngoai = 0;
	this.phiquanlychovaylai = 0;
	this.loailaisuat = "";
	this.loaitien = "";
	this.status = 0;
	this.createddate = "";
	this.createdby = "";
	this.updateddate = "";
	this.updatedby = "";


	this.getAll = function () {
		var rs = DATA.get(URL.GETALL);
		that.LIST = rs;
	}

	this.getById = function (sId) {
		var rs = DATA.get(URL.GETBYID,{hopdongvayodaid:sId}) 
		var item = rs[0];
		that.hopdongvayodaid = item.HOPDONGVAYODAID;
		that.sohopdong = item.SOHOPDONG;
		that.tenduan = item.TENDUAN;
		that.ngayky = item.NGAYKY;
		that.coquanchovaylai = item.COQUANCHOVAYLAI;
		that.coquanuyquyenchovaylai = item.COQUANUYQUYENCHOVAYLAI;
		that.sotienkyvay = item.SOTIENKYVAY;
		that.laisuatvay = item.LAISUATVAY;
		that.ngayhieuluc = item.NGAYHIEULUC;
		that.ngaytranogocdautien = item.NGAYTRANOGOCDAUTIEN;
		that.ngaytranolaidautien = item.NGAYTRANOLAIDAUTIEN;
		that.ngaytranogoccuoicung = item.NGAYTRANOGOCCUOICUNG;
		that.ngaytranolaicuoicung = item.NGAYTRANOLAICUOICUNG;
		that.phuongthuctranogoc = item.PHUONGTHUCTRANOGOC;
		that.phuongthuctranolai = item.PHUONGTHUCTRANOLAI;
		that.laiphat = item.LAIPHAT;
		that.sohiepdinhvaynuocngoai = item.SOHIEPDINHVAYNUOCNGOAI;
		that.phihiepdinhvaynuocngoai = item.PHIHIEPDINHVAYNUOCNGOAI;
		that.phiquanlychovaylai = item.PHIQUANLYCHOVAYLAI;
		that.loailaisuat = item.LOAILAISUAT;
		that.loaitien = item.LOAITIEN;
		that.status = item.STATUS;
		that.createddate = item.CREATEDDATE;
		that.createdby = item.CREATEDBY;
		that.updateddate = item.UPDATEDDATE;
		that.updatedby = item.UPDATEDBY;
		
	}

	this.search = function (sKey) {
		var rs = DATA.set(URL.SAVE, { key: sKey });
		that.LIST = rs.RESULT;
	}

	this.save = function () {
		var data = {
			hopdongvayodaid: that.hopdongvayodaid,
			sohopdong: that.sohopdong,
			tenduan: that.tenduan,
			ngayky: that.ngayky,
			coquanchovaylai: that.coquanchovaylai,
			coquanuyquyenchovaylai: that.coquanuyquyenchovaylai,
			sotienkyvay: that.sotienkyvay,
			laisuatvay: that.laisuatvay,
			ngayhieuluc: that.ngayhieuluc,
			ngaytranogocdautien: that.ngaytranogocdautien,
			ngaytranolaidautien: that.ngaytranolaidautien,
			ngaytranogoccuoicung: that.ngaytranogoccuoicung,
			ngaytranolaicuoicung: that.ngaytranolaicuoicung,
			phuongthuctranogoc: that.phuongthuctranogoc,
			phuongthuctranolai: that.phuongthuctranolai,
			laiphat: that.laiphat,
			sohiepdinhvaynuocngoai: that.sohiepdinhvaynuocngoai,
			phihiepdinhvaynuocngoai: that.phihiepdinhvaynuocngoai,
			phiquanlychovaylai: that.phiquanlychovaylai,
			loailaisuat: that.loailaisuat,
			loaitien: that.loaitien,
			status: that.status,
			createddate: that.createddate,
			createdby: that.createdby,
			updateddate: that.updateddate,
			updatedby: that.updatedby

		}
		return DATA.set(URL.SAVE, data);
	}

	this.del = function (sID) {
		return DATA.set(URL.DEL, { hopdongvayodaid: sID });
	}

}