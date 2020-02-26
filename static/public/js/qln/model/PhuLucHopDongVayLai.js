var PhuLucHopDongVayLai = function () {
	var that = this;

	const URL = {
		GETALL: CONFIG_API.URL.BASE_API + 'qln_phuluchopdongvaylai/getall',
		GETBYID: CONFIG_API.URL.BASE_API + 'qln_phuluchopdongvaylai/getbyid',
		SEARCH: CONFIG_API.URL.BASE_API + 'qln_phuluchopdongvaylai/search',
		SAVE: CONFIG_API.URL.BASE_API + 'qln_phuluchopdongvaylai/save',
        DEL: CONFIG_API.URL.BASE_API + 'qln_phuluchopdongvaylai/del',
        getAllTinhThanh: CONFIG_API.URL.BASE_API + 'dm_tinhthanh/getall',
        getAllDuAn: CONFIG_API.URL.BASE_API + 'dm_duan/getall',
        getAllHopDongVayLai: CONFIG_API.URL.BASE_API + 'qln_hopdongvaylai/getall',
	}

	this.PHULUCHOPDONGVAYLAIID = 0;
	this.MA = "";
	this.TENPHULUC = "";
	this.HOPDONGVAYLAIID = "";
    this.NGAYKY = "";
    this.NGUOIKY = "";
	this.TINHTHANHID = "";
	this.GHICHU = "";
	this.STATUS = 0;
	this.CREATEDDATE = "";
	this.CREATEDBY = "";
	this.UPDATEDDATE = "";
	this.UPDATEDBY = "";

	// Get all data
	this.getAll = function () {
		var rs = DATA.get(URL.GETALL);
		that.LIST = rs;
	}

	// get data by id
	this.getById = function (sId) {
		var rs = DATA.get(URL.GETBYID, { PHULUCHOPDONGVAYLAIID: sId });
		var item = rs[0];
		that.PHULUCHOPDONGVAYLAIID = item.PHULUCHOPDONGVAYLAIID;
		that.MA = item.MA;
		that.TENPHULUC = item.TENPHULUC;
        that.NGAYKY = item.NGAYKY;
        that.NGUOIKY = item.NGUOIKY;
		that.TINHTHANHID = item.TINHTHANHID;
		that.HOPDONGVAYLAIID = item.HOPDONGVAYLAIID;
		that.GHICHU = item.GHICHU;
		that.STATUS = item.STATUS;
		that.CREATEDDATE = item.CREATEDDATE;
		that.CREATEDBY = item.CREATEDBY;
		that.UPDATEDDATE = item.UPDATEDDATE;
		that.UPDATEDBY = item.UPDATEDBY;
	}

	// get data with keyword
	this.search = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}

	//save data
	this.save = function () {
		var data = {
			PHULUCHOPDONGVAYLAIID: this.PHULUCHOPDONGVAYLAIID,
			MA: this.MA,
			TENPHULUC: this.TENPHULUC,
			HOPDONGVAYLAIID: this.HOPDONGVAYLAIID,
            NGAYKY: this.NGAYKY,
            NGUOIKY: this.NGUOIKY,
			TINHTHANHID: this.TINHTHANHID,
			GHICHU: this.GHICHU,	
		}
		return DATA.set(URL.SAVE, data);
	}

	//delete data
	this.del = function (sID) {
		return DATA.set(URL.DEL, { PHULUCHOPDONGVAYLAIID: sID });
	}

}