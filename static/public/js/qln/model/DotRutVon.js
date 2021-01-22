var DotRutVon = function () {
	var that = this;

	const URL = {
		GETALL: CONFIG_API.URL.BASE_API + 'qln_dotrutvon/getall',
		GETALLNGAYNHANNO: CONFIG_API.URL.BASE_API + 'qln_dotrutvon/getbykehoachvayhangnamid',
		GETBYID: CONFIG_API.URL.BASE_API + 'qln_dotrutvon/getbyid',
		GETSTATUS: CONFIG_API.URL.BASE_API + 'qln_dotrutvon/status',
		SEARCH: CONFIG_API.URL.BASE_API + 'qln_dotrutvon/search',
		SAVE: CONFIG_API.URL.BASE_API + 'qln_dotrutvon/save',
		DEL: CONFIG_API.URL.BASE_API + 'qln_dotrutvon/del',
		DELUID: CONFIG_API.URL.BASE_API + 'qln_dotrutvon/deluid',
		DELETE: CONFIG_API.URL.BASE_API + 'qln_dotrutvon/delete',
		getAllTinhThanh: CONFIG_API.URL.BASE_API + 'dm_tinhthanh/getall',
		getAllDuAn: CONFIG_API.URL.BASE_API + 'dm_duan/getall',
		getAllTienTe: CONFIG_API.URL.BASE_API + 'dm_tiente/getall',
		getAllNhaTaiTro: CONFIG_API.URL.BASE_API + 'dm_nhataitro/getall',
		getAllRutVonByHopDong: CONFIG_API.URL.BASE_API + 'qln_dotrutvon/getallbyhopdong',
		searchdotrutvon: CONFIG_API.URL.USER_API + 'search/dotrutvon'
	}

	this.DOTRUTVONID = 0;
	this.KEHOACHVAYHANGNAMID = 0;
	this.MA = "";
	this.MASOTHAMCHIEU = "";
	this.PHUONGTHUCGIAINGAN = 0;
	this.NGAYNHANNO = "";
	this.GIAINGANTHEOKHNAM = 0;
	this.SOTIENGIAINGANVAYLAI = 0;
	this.SOTIENGIAINGANVAYLAITIENTE = 0;
	this.SOTIENGIAINGANCAPPHAT = 0;
	this.SOTIENGIAINGANCAPPHATTIENTE = 0;
	this.NGUYENTEVAYLAI = 0;
	this.NGUYENTEVAYLAITIENTE = 0;
	this.NGUYENTECAPPHAT = 0;
	this.NGUYENTECAPPHATTIENTE = 0;
	this.GHICHU = "";
	this.DONVIID = "";
	this.STATUS = 0;
	this.CREATEDDATE = "";
	this.CREATEDBY = "";
	this.UPDATEDDATE = "";
	this.UPDATEDBY = "";
	this.UUID = '';
	this.NHATAITROID = 0;
	this.PHANTRAMVAYLAI = 0;
	this.LAISUATANHAN = 0;
	this.LAISUATCONLAI = 0;
	this.PHICAMKET = 0;
	this.PHICAMKETTIENTE = 0;
	this.TYGIANGANHANG = 0;
	// Get all data
	this.getAll = function () {
		var rs = DATA.get(URL.GETALL);
		that.LIST = rs;
	}
	this.getAllRutVonByHopDong = function (sId) {
		var rs = DATA.get(URL.getAllRutVonByHopDong, { HOPDONGVAYLAIID: sId });
		return rs;
	}
	this.getAllNgayNhanNo = function (sId) {
		var rs = DATA.get(URL.GETALLNGAYNHANNO, { KEHOACHVAYHANGNAMID: sId }); 
		return rs;
	}
	this.GETSTATUS = function (sId) {
		var rs = DATA.get(URL.GETSTATUS, { KEHOACHVAYHANGNAMID: sId });  
		return rs;
	}

	// get data by id
	this.getById = function (sId) {
		var rs = DATA.get(URL.GETBYID, { DOTRUTVONID: sId });
		var item = rs[0];
		that.DOTRUTVONID = item.DOTRUTVONID;
		that.KEHOACHVAYHANGNAMID = item.KEHOACHVAYHANGNAMID;
		that.MA = item.MA;
		that.PHUONGTHUCGIAINGAN = item.PHUONGTHUCGIAINGAN;
		that.DONVIID = item.DONVIID;
		that.NGAYNHANNO = item.NGAYNHANNO;
		that.GIAINGANTHEOKHNAM = item.GIAINGANTHEOKHNAM;
		that.SOTIENGIAINGANVAYLAI = item.SOTIENGIAINGANVAYLAI;
		that.SOTIENGIAINGANVAYLAITIENTE = item.SOTIENGIAINGANVAYLAITIENTE;
		that.SOTIENGIAINGANCAPPHAT = item.SOTIENGIAINGANCAPPHAT;
		that.SOTIENGIAINGANCAPPHATTIENTE = item.SOTIENGIAINGANCAPPHATTIENTE;
		that.NGUYENTEVAYLAI = item.NGUYENTEVAYLAI;
		that.NGUYENTEVAYLAITIENTE = item.NGUYENTEVAYLAITIENTE;
		that.NGUYENTECAPPHAT = item.NGUYENTECAPPHAT;
		that.NGUYENTECAPPHATTIENTE = item.NGUYENTECAPPHATTIENTE;
		that.GHICHU = item.GHICHU;
		that.STATUS = item.STATUS;
		that.CREATEDDATE = item.CREATEDDATE;
		that.CREATEDBY = item.CREATEDBY;
		that.UPDATEDDATE = item.UPDATEDDATE;
		that.UPDATEDBY = item.UPDATEDBY;
		that.LAISUATANHAN = item.LAISUATANHAN;
		that.LAISUATCONLAI = item.LAISUATCONLAI;
		that.PHICAMKET = item.PHICAMKET;
		that.PHICAMKETTIENTE = item.PHICAMKETTIENTE;
		that.TYGIANGANHANG = item.TYGIANGANHANG;
	}

	// get data with keyword
	this.search = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}

	this.searchdotrutvon = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}

	//save data
	this.save = function () {
		var data = {
			DOTRUTVONID: this.DOTRUTVONID,
			KEHOACHVAYHANGNAMID: this.KEHOACHVAYHANGNAMID,
			MA: this.MA,
			MASOTHAMCHIEU: this.MASOTHAMCHIEU,
			PHUONGTHUCGIAINGAN: this.PHUONGTHUCGIAINGAN,
			NGAYNHANNO: this.NGAYNHANNO,
			GIAINGANTHEOKHNAM: this.GIAINGANTHEOKHNAM,
			SOTIENGIAINGANVAYLAI: this.SOTIENGIAINGANVAYLAI,
			SOTIENGIAINGANVAYLAITIENTE: this.SOTIENGIAINGANVAYLAITIENTE,
			SOTIENGIAINGANCAPPHAT: this.SOTIENGIAINGANCAPPHAT,
			SOTIENGIAINGANCAPPHATTIENTE: this.SOTIENGIAINGANCAPPHATTIENTE,
			NGUYENTEVAYLAI: this.NGUYENTEVAYLAI,
			NGUYENTEVAYLAITIENTE: this.NGUYENTEVAYLAITIENTE,
			NGUYENTECAPPHAT: this.NGUYENTECAPPHAT,
			NGUYENTECAPPHATTIENTE: this.NGUYENTECAPPHATTIENTE,
			GHICHU: this.GHICHU,
			DONVIID: this.DONVIID,
			UUID: this.UUID,
			NHATAITROID: this.NHATAITROID,
			PHANTRAMVAYLAI: this.PHANTRAMVAYLAI,
			LAISUATANHAN: this.LAISUATANHAN,
			LAISUATCONLAI: this.LAISUATCONLAI,
			PHICAMKET: this.PHICAMKET,
			PHICAMKETTIENTE: this.PHICAMKETTIENTE,
			TYGIANGANHANG: this.TYGIANGANHANG
		} 
		return DATA.set(URL.SAVE, data);
	}

	//delete data
	// this.del = function (sID) {
	// 	return DATA.set(URL.DEL, { DOTRUTVONID: sID });
	// }
	this.deluid = function (sID) {
		return DATA.set(URL.DELUID, { DOTRUTVONID: sID });
	}
	this.delete = function (sID) {
		return DATA.set(URL.DELETE, { DOTRUTVONID: sID });
	}
}