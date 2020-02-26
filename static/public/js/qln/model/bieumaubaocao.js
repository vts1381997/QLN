var BieuMauBaoCao = function () {
	var that = this;

	const URL = {
		GETALL: CONFIG_API.URL.BASE_API + 'dm_bieumaubaocao/getall',
		GETBYID: CONFIG_API.URL.BASE_API + 'dm_bieumaubaocao/getbyid',
		SEARCH: CONFIG_API.URL.BASE_API + 'dm_bieumaubaocao/search',
		SAVE: CONFIG_API.URL.BASE_API + 'dm_bieumaubaocao/save',
		DEL: CONFIG_API.URL.BASE_API + 'dm_bieumaubaocao/del',
		GETALLBYNHOMVAQUYEN: CONFIG_API.URL.BASE_API + 'dm_bieumaubaocao/getbynhomvaquyen',
		searchdb:CONFIG_API.URL.USER_API+'search'
	}

	this.BIEUMAUBAOCAOID = 0;
	this.MA = "";
	this.TIEUDE = "";
	this.COQUANBANHANH = "";
	this.NGAYBANHANH = "";
	this.NGAYHIEULUC = "";
	this.NHOMBAOCAO = "";
	this.STATUS = 0;
	this.CREATEDDATE = "";
	this.CREATEDBY = "";
	this.UPDATEDDATE = "";
	this.UPDATEDBY = "";
	this.LINKFILE = "";
	this.RONG = "";
	this.CAO = "";
	this.TRANGTHAI = "";
	this.LOAIBAOCAO = "";

	// Get all data
	this.getAll = function () {
		var rs = DATA.get(URL.GETALL);

		that.LIST = rs;
	}

	// get data by id
	this.getById = function (sId) {
		var rs = DATA.get(URL.GETBYID, { BIEUMAUBAOCAOID: sId });
		var item = rs[0];
		that.BIEUMAUBAOCAOID = item.BIEUMAUBAOCAOID;
		that.MA = item.MA;
		that.TIEUDE = item.TIEUDE;
		that.COQUANBANHANH = item.COQUANBANHANH;
		that.NGAYBANHANH = item.NGAYBANHANH;
		that.NGAYHIEULUC = item.NGAYHIEULUC;
		that.NHOMBAOCAO = item.NHOMBAOCAO;
		that.CREATEDDATE = item.CREATEDDATE;
		that.CREATEDBY = item.CREATEDBY;
		that.UPDATEDDATE = item.UPDATEDDATE;
		that.UPDATEDBY = item.UPDATEDBY;
		that.LINKFILE = item.LINKFILE;
		that.RONG = item.RONG;
		that.CAO = item.CAO;
		that.TRANGTHAI = item.TRANGTHAI;
		that.LOAIBAOCAO = item.LOAIBAOCAO;
	}

	this.getAllBaoCaoByNhomVaQuyen = function(sNhomBaoCao)
	{
		var rs = DATA.get(URL.GETALLBYNHOMVAQUYEN , { NHOMBAOCAO: sNhomBaoCao })
		return rs;
	}

	// get data with keyword
	this.search = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}

	this.searchdb = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}

	//save data
	this.save = function () {
		var data = {
			BIEUMAUBAOCAOID: that.BIEUMAUBAOCAOID,
			MA: that.MA,
			TIEUDE: that.TIEUDE,
			COQUANBANHANH: that.COQUANBANHANH,
			NGAYBANHANH: that.NGAYBANHANH,
			NGAYHIEULUC: that.NGAYHIEULUC,
			NHOMBAOCAO: that.NHOMBAOCAO,
			STATUS: that.STATUS,
			CREATEDDATE: that.CREATEDDATE,
			CREATEDBY: that.CREATEDBY,
			UPDATEDDATE: that.UPDATEDDATE,
			UPDATEDBY: that.UPDATEDBY,
			LINKFILE: that.LINKFILE,
			RONG: that.RONG,
			CAO: that.CAO,
			TRANGTHAI: that.TRANGTHAI,
			LOAIBAOCAO: that.LOAIBAOCAO,
		}
		return DATA.set(URL.SAVE, data);
	}

	//delete data
	this.del = function (sID) {
		return DATA.set(URL.DEL, { BIEUMAUBAOCAOID: sID });
	}

}