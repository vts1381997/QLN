var BCQuanTri = function () {
	var that = this;

	const URL = {
		GETDataReportTongHopLuyKeCapPhat: CONFIG_API.URL.BASE_API + 'report/getdatareporttonghopcapphat',
		GETDataReportTongHopLuyKeCapPhatMau2: CONFIG_API.URL.BASE_API + 'report/getdatareporttonghopcapphatmau2',
		getBCRUTVON: CONFIG_API.URL.BASE_API + 'report_rutvon/getbc',
		getBCTRANO: CONFIG_API.URL.BASE_API + 'report_trano/getbc',
		GETDataReportTongHopDuNoCuoiThang: CONFIG_API.URL.BASE_API + 'qln/report_tonghoptinhhinhdunocuoithang',
		GETDatareportTonghopdunosovoithungansachdiaphuong: CONFIG_API.URL.BASE_API + 'qln/report_baocaotonghopdunosovoithungansachdiaphuong',
		getBCDoiChieuSoLieu: CONFIG_API.URL.BASE_API + 'reportDoiChieuSoLieuVayCQDP/getbc',
		getBCDoiChieuSoLieuVayVDB: CONFIG_API.URL.BASE_API + 'reportDoiChieuSoLieuVayVDB/getbc',
		getBCDoiChieuSoLieuVayNQNN: CONFIG_API.URL.BASE_API + 'reportDoiChieuSoLieuVayNQNN/getbc',
		getBCDoiChieuSoLieuVayTCTCTD: CONFIG_API.URL.BASE_API + 'reportDoiChieuSoLieuVayTCTCTD/getbc',
		getBCNoiDungRutVonDuAnVayLai: CONFIG_API.URL.BASE_API + 'reportRutVonDuAnVayLai/getbc',
		getBCTongHopTinhHinhNoDiaPhuong: CONFIG_API.URL.BASE_API + 'reportTongHopTinhHinhNoDiaPhuong/getbc',
	}

	this.DANHBAID = 0;
	this.HOTEN = '';
	this.SODIENTHOAI = '';
	this.EMAIL = '';
	this.DIACHI = '';
	// Thuộc tính bổ xung
	this.STATUS = 1;
	this.CREATEDDATE = "";
	this.CREATEDBY = "";
	this.UPDATEDDATE = "";
	this.UPDATEDBY = "";

	this.getDataReportTongHopLuyKeCapPhatMau2 = function (data) {
		var rs = DATA.get(URL.GETDataReportTongHopLuyKeCapPhatMau2, data);
		return rs;
	}
	
	this.getDataReportTongHopLuyKeCapPhat = function (data) {
		var rs = DATA.get(URL.GETDataReportTongHopLuyKeCapPhat, data);
		return rs;
	}

	this.getBCRUTVON = function (data) {
		var rs = DATA.get(URL.getBCRUTVON, data);
		return rs;
	}

	this.getBCTRANO = function (data) {
		var rs = DATA.get(URL.getBCTRANO, data);
		return rs;
	}

	this.getDataReportTongHopDuNoCuoiThang = function (data) {
		var rs = DATA.get(URL.GETDataReportTongHopDuNoCuoiThang, data);
		return rs;
	}

	this.GETDatareportTonghopdunosovoithungansachdiaphuong = function (data) {
		var rs = DATA.get(URL.GETDatareportTonghopdunosovoithungansachdiaphuong, data);
		return rs;
	}

	this.getBCDoiChieuSoLieu = function (data) {
		var rs = DATA.get(URL.getBCDoiChieuSoLieu, data);

		return rs;
	}

	this.getBCDoiChieuSoLieuVayVDB = function (data) {
		var rs = DATA.get(URL.getBCDoiChieuSoLieuVayVDB, data);

		return rs;
	}

	this.getBCDoiChieuSoLieuVayNQNN = function (data) {
		var rs = DATA.get(URL.getBCDoiChieuSoLieuVayNQNN, data);
		return rs;
	}

	this.getBCDoiChieuSoLieuVayTCTCTD = function (data) {
		var rs = DATA.get(URL.getBCDoiChieuSoLieuVayTCTCTD, data);
		return rs;
	}

	this.getBCNoiDungRutVonDuAnVayLai = function (data) {
		var rs = DATA.get(URL.getBCNoiDungRutVonDuAnVayLai, data);
		return rs;
	}

	this.getBCTongHopTinhHinhNoDiaPhuong = function (data) {
		var rs = DATA.get(URL.getBCTongHopTinhHinhNoDiaPhuong, data);
		return rs;
	}

	this.getById = function (sId) {
		var rs = DATA.get(URL.GETBYID, { DANHBAID: sId });
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

	this.search = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { KEY: sKey });
		that.LIST = rs;
	}

	this.save = function () {
		var data = {
			DANHBAID: that.DANHBAID,
			HOTEN: that.HOTEN,
			SODIENTHOAI: that.SODIENTHOAI,
			EMAIL: that.EMAIL,
			DIACHI: that.DIACHI,
			STATUS: that.STATUS,
			CREATEDDATE: that.CREATEDDATE,
			CREATEDBY: that.CREATEDBY,
			UPDATEDDATE: that.UPDATEDDATE,
			UPDATEDBY: that.UPDATEDBY,
		}
		return DATA.set(URL.SAVE, data);
	}

	this.del = function (sId) {
		return DATA.set(URL.DEL, { DANHBAID: sId });
	}

}