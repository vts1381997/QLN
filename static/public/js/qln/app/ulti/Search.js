var Search = function () {
	var that = this;

	const URL = {
		searchdb:CONFIG_API.URL.USER_API+'search',
		searchdonvi:CONFIG_API.URL.USER_API+'search/donvi',
		searchduan:CONFIG_API.URL.USER_API+'search/duan',
		searchtinhthanh:CONFIG_API.URL.USER_API+'search/tinhthanh',
		searchtochuctaichinh:CONFIG_API.URL.USER_API+'search/tochuctaichinh',
		searchtochucmuatp:CONFIG_API.URL.USER_API+'search/tochucmuatp',
		searchnhataitro:CONFIG_API.URL.USER_API+'search/nhataitro',
		searchhopdongvaylai:CONFIG_API.URL.USER_API+'search/hopdongvaylai',
		searchdeanphtp:CONFIG_API.URL.USER_API+'search/deanphtp',
		searchdotphtp:CONFIG_API.URL.USER_API+'search/dotphtp',
		searchmualaitp:CONFIG_API.URL.USER_API+'search/mualaitp',
		searchhoandoitp:CONFIG_API.URL.USER_API+'search/hoandoitp',
		searchvaykbnn:CONFIG_API.URL.USER_API+'search/vaykbnn',
		searchvayquydutru:CONFIG_API.URL.USER_API+'search/vayquydutru',
		searchvayvdb:CONFIG_API.URL.USER_API+'search/vayvdb',
		searchvaytctc:CONFIG_API.URL.USER_API+'search/vaytctc',
		searchdotrutvon:CONFIG_API.URL.USER_API+'search/dotrutvon',
		searchdottrano:CONFIG_API.URL.USER_API+'search/dottrano',
		searchkehoachvayhangnam:CONFIG_API.URL.USER_API+'search/kehoachvayhangnam',
		searchkehoachvay5nam:CONFIG_API.URL.USER_API+'search/kehoachvay5nam',
		searchkehoachvay3nam:CONFIG_API.URL.USER_API+'search/kehoachvay3nam',
		searchbieumaubc:CONFIG_API.URL.USER_API+'search/BieuMauBaoCao',
	}
	
	this.search = function (ob) {
		return  DATA.get(URL.searchdb, ob);
	}
	
	this.searchdonvi = function (ob) {
		return  DATA.get(URL.searchdonvi, ob);
	}
	
	this.searchduan = function (ob) {
		return  DATA.get(URL.searchduan, ob);
	}

	this.searchtinhthanh = function (ob) {
		return  DATA.get(URL.searchtinhthanh, ob);
	}

	this.searchtochuctaichinh = function (ob) {
		return  DATA.get(URL.searchtochuctaichinh, ob);
	}

	this.searchtochucmuatp = function (ob) {
		return  DATA.get(URL.searchtochucmuatp, ob);
	}

	this.searchnhataitro = function (ob) {
		return  DATA.get(URL.searchnhataitro, ob);
	}

	this.searchhopdongvaylai = function (ob) {
		return  DATA.get(URL.searchhopdongvaylai, ob);
	}

	this.searchdeanphtp = function (ob) {
		return  DATA.get(URL.searchdeanphtp, ob);
	}

	this.searchdotphtp = function (ob) {
		return  DATA.get(URL.searchdotphtp, ob);
	}

	this.searchmualaitp = function (ob) {
		return  DATA.get(URL.searchmualaitp, ob);
	}

	this.searchhoandoitp = function (ob) {
		return  DATA.get(URL.searchhoandoitp, ob);
	}

	this.searchvaykbnn = function (ob) {
		return  DATA.get(URL.searchvaykbnn, ob);
	}

	this.searchvayquydutru = function (ob) {
		return  DATA.get(URL.searchvayquydutru, ob);
	}

	this.searchvayvdb = function (ob) {
		return  DATA.get(URL.searchvayvdb, ob);
	}

	this.searchvaytctc = function (ob) {
		return  DATA.get(URL.searchvaytctc, ob);
	}

	this.searchdotrutvon = function (ob) {
		return  DATA.get(URL.searchdotrutvon, ob);
	}

	this.searchdottrano = function (ob) {
		return  DATA.get(URL.searchdottrano, ob);
	}

	this.searchkehoachvayhangnam = function (ob) {
		return  DATA.get(URL.searchkehoachvayhangnam, ob);
	}

	this.searchkehoachvay5nam = function (ob) {
		return  DATA.get(URL.searchkehoachvay5nam, ob);
	}

	this.searchkehoachvay3nam = function (ob) {
		return  DATA.get(URL.searchkehoachvay3nam, ob);
	}

	this.searchbieumaubc = function (ob) {
		return  DATA.get(URL.searchbieumaubc, ob);
	}
}