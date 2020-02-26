var DeAnPHTP = function(){
	var that = this;

	const URL = {
		GETALL:CONFIG_API.URL.BASE_API + 'qln_daphtp/getall',
		GETBYID:CONFIG_API.URL.BASE_API + 'qln_daphtp/getbyid',
		SEARCH:CONFIG_API.URL.BASE_API + 'qln_daphtp/search',
		SAVE:CONFIG_API.URL.BASE_API + 'qln_daphtp/save',
		DEL:CONFIG_API.URL.BASE_API + 'qln_daphtp/del',
		DELUID:CONFIG_API.URL.BASE_API + 'qln_daphtp/deluid',
		GETDONVI:CONFIG_API.URL.BASE_API + 'qln_deanphtp/getdonvi',
		searchdeanphtp:CONFIG_API.URL.USER_API+'search/deanphtp',
	}

	this.DEANPHATHANHTRAIPHIEUID=0;
	this.MA="";
	this.TEN="";
	this.SOQUYETDINH="";
	this.NGAYQUYETDINH="";
	this.TENTOCHUCPHATHANH="";
	this.KHOILUONGPHATHANH=0;
	this.NGAYKYHANTRAIPHIEU="";
	this.LAISUATPHATHANH=0;
	this.MENHGIA="";
	this.PHUONGTHUCPHATHANH=0;
	this.THOIGIANPHATHANH="";
	this.KYHANTHANHTOAN="";
	this.PHUONGTHUCTRALAI="";
	this.PHUONGTHUCTRAGOC="";
	this.VANDEKHAC="";
	this.DONVIID="";
	this.STATUS=0;
	this.NOTE="";
	this.CREATEDDATE="";
	this.CREATEDBY="";
	this.UPDATEDDATE="";
	this.UPDATEDBY="";
	this.UUID=''
	// Get all data
	this.getAll = function(){
		var rs = DATA.get(URL.GETALL);
		that.LIST = rs;
	}
	
	// get data by id
	this.getById = function(sId){
		var rs = DATA.get(URL.GETBYID,{DEANPHATHANHTRAIPHIEUID:sId});
		var item = rs[0];
		that.DEANPHATHANHTRAIPHIEUID = item.DEANPHATHANHTRAIPHIEUID;
		that.MA = item.MA;
		that.TEN = item.TEN;
		that.SOQUYETDINH = item.SOQUYETDINH;
		that.NGAYQUYETDINH = item.NGAYQUYETDINH;
		that.TENTOCHUCPHATHANH = item.TENTOCHUCPHATHANH;
		that.KHOILUONGPHATHANH = item.KHOILUONGPHATHANH;
		that.NGAYKYHANTRAIPHIEU = item.NGAYKYHANTRAIPHIEU;
		that.LAISUATPHATHANH = item.LAISUATPHATHANH;
		that.MENHGIA = item.MENHGIA;
		that.PHUONGTHUCPHATHANH = item.PHUONGTHUCPHATHANH;
		that.THOIGIANPHATHANH = item.THOIGIANPHATHANH;
		that.KYHANTHANHTOAN = item.KYHANTHANHTOAN;
		that.PHUONGTHUCTRALAI = item.PHUONGTHUCTRALAI;
		that.PHUONGTHUCTRAGOC = item.PHUONGTHUCTRAGOC;
		that.VANDEKHAC = item.VANDEKHAC;
		that.DONVIID = item.DONVIID;
		that.STATUS = item.STATUS;
		that.NOTE = item.NOTE;
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

	this.searchdeanphtp = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}

	this.getDonVi = function () {
		var a = DATA.get(URL.GETDONVI);
		that.LIST = a;
	}
	//save data
	this.save = function(){
		var data= {
			DEANPHATHANHTRAIPHIEUID:that.DEANPHATHANHTRAIPHIEUID,
			MA:that.MA,
			TEN:that.TEN,
			SOQUYETDINH:that.SOQUYETDINH,
			NGAYQUYETDINH:that.NGAYQUYETDINH,
			TENTOCHUCPHATHANH:that.TENTOCHUCPHATHANH,
			KHOILUONGPHATHANH:that.KHOILUONGPHATHANH,
			NGAYKYHANTRAIPHIEU:that.NGAYKYHANTRAIPHIEU,
			LAISUATPHATHANH:that.LAISUATPHATHANH,
			MENHGIA:that.MENHGIA,
			PHUONGTHUCPHATHANH:that.PHUONGTHUCPHATHANH,
			THOIGIANPHATHANH:that.THOIGIANPHATHANH,
			KYHANTHANHTOAN:that.KYHANTHANHTOAN,
			PHUONGTHUCTRALAI:that.PHUONGTHUCTRALAI,
			PHUONGTHUCTRAGOC:that.PHUONGTHUCTRAGOC,
			VANDEKHAC:that.VANDEKHAC,
			DONVIID:that.DONVIID,
			NOTE:that.NOTE,
			UUID:that.UUID
		}
		return  DATA.set(URL.SAVE,data);
	}
	
	//delete data
	this.del = function(sID){
		return DATA.set(URL.DEL,{DEANPHATHANHTRAIPHIEUID:sID});
	}
	
	this.deluid = function(sID){
		return DATA.set(URL.DELUID,{DEANPHATHANHTRAIPHIEUID:sID});
	}
	
}