var NguoiDung = function () {
	var that = this;
	this.ID = '';
	this.USERNAME = '';
	this.PASSWORD = '';
	this.EMAIL = '';
	this.PHONENUMBER = '';
	this.FULLNAME = '';
	this.SHKB = '';
	this.DIABAN = '';
	this.STATUS = 0;
	this.CREATEDDATE = '';
	this.CREATEDBY = '';
	this.UPDATEDDATE = '';
	this.UPDATEDBY = '';
	this.LVL = 0;
	this.TINHTHANHID = 0;
	this.NHANTHONGBAO = 0;
	const URL = {
		GETALL: CONFIG_API.URL.USER_API + 'nguoidung/get',
		resetPassword: CONFIG_API.URL.USER_API + 'nguoidung/resetpassword',
		CHANGEPASS: CONFIG_API.URL.USER_API + 'nguoidung/changepass',
		GETBYID: CONFIG_API.URL.USER_API + 'nguoidung/getByID',
		SEARCH: CONFIG_API.URL.USER_API + 'nguoidung/search',
		SAVE: CONFIG_API.URL.USER_API + 'nguoidung/save',
		getdvcha: CONFIG_API.URL.USER_API + 'nguoidung/getdvcha',
		getlv: CONFIG_API.URL.USER_API + 'nguoidung/getlevel',
		getTinhThanh: CONFIG_API.URL.USER_API + 'nguoidung/gettinhthanh',
		getTinhThanhs: CONFIG_API.URL.BASE_API + 'users/gettinhthanh',
		DEL: CONFIG_API.URL.USER_API + 'nguoidung/delete',
		getclaim: CONFIG_API.URL.USER_API + 'claim/get',
		setclaims: CONFIG_API.URL.USER_API + 'claim/set',
		getMenu: CONFIG_API.URL.USER_API + 'tree/getmenu',
		getRole: CONFIG_API.URL.USER_API + 'tree/getrole',
		getbaocao: CONFIG_API.URL.USER_API + 'tree/getbaocao',
		getbaocaobyid: CONFIG_API.URL.USER_API + 'tree/getbaocaobyid',
		GETDONVI: CONFIG_API.URL.BASE_API + 'dm_donvi/getcayphahe_new',
		SENDMAIL: CONFIG_API.URL.USER_API + 'sendmail',
		GETQUERY: CONFIG_API.URL.BASE_API + 'dm_donvi/getquery',
		GETPASSWORDBYID: CONFIG_API.URL.BASE_API + 'nguoidung/getpasswordbyid',
		GETINFORMATIONLOGIN: CONFIG_API.URL.BASE_API + 'nguoidung/getinformationlogin',
		INSERTINFORMATIONLOGIN: CONFIG_API.URL.BASE_API + 'nguoidung/insertinformationlogin',
		DELETEINFORMATIONLOGIN: CONFIG_API.URL.BASE_API + 'nguoidung/deleteinformationlogin',
		UPDATEINFORMATIONLOGIN: CONFIG_API.URL.BASE_API + 'nguoidung/updateinformationlogin',
	}


	this.getAll = function (dt) {
		var rs = DATA.get(URL.GETALL, dt);
		that.LIST = rs;
	}

	this.save = function () {
		var data = {
			ID: that.ID,
			USERNAME: that.USERNAME,
			PASSWORD: that.PASSWORD,
			EMAIL: that.EMAIL,
			PHONENUMBER: that.PHONENUMBER,
			FULLNAME: that.FULLNAME,
			SHKB: that.SHKB,
			DIABAN: that.DIABAN,
			STATUS: that.STATUS,
			CREATEDDATE: that.CREATEDDATE,
			UPDATEDDATE: that.UPDATEDDATE,
			UPDATEDBY: that.UPDATEDBY,
			LVL: that.LVL,
			TINHTHANHID: that.TINHTHANHID,
			NHANTHONGBAO: that.NHANTHONGBAO,
		}
		return DATA.set(URL.SAVE, data);
	}
	this.insertInformationLogin = function (ip, time) {
		var data = {
			iplogin: ip,
			time: time
		}
		return DATA.set(URL.INSERTINFORMATIONLOGIN, data);
	}
	this.updateInformationLogin = function (ip, time) {
		var data = {
			iplogin: ip,
			time: time
		}
		return DATA.set(URL.DELETEINFORMATIONLOGIN, data);
	}
	this.getClaim = function (id) {
		return DATA.get(URL.getclaim, { id: id })
	}
	this.getMenu = function () {
		return DATA.get(URL.getMenu)
	}
	this.getRole = function () {
		return DATA.get(URL.getRole)
	}
	this.SENDMAIL = function (data) {
		var res = DATA.get(URL.SENDMAIL, { data })
		return res
	}
	this.CHANGEPASS = function (data) {
		var res = DATA.get(URL.CHANGEPASS, { data })
		return res
	}
	this.getQuery = function () {
		var rs = DATA.get(URL.GETQUERY);
		return rs;
	}
	this.getPasswordById = function () {
		var rs = DATA.get(URL.GETPASSWORDBYID);
		return rs;
	}
	this.getInformationLogin = function () {
		var rs = DATA.get(URL.GETINFORMATIONLOGIN);
		return rs;
	}
	//delete data
	this.del = function (sID) {
		return DATA.set(URL.DEL, { ID: sID });
	}
	this.deleteInformationLogin = function () {
		return DATA.set(URL.DELETEINFORMATIONLOGIN);
	}
	this.resetPassword = function (sID) {
		return DATA.set(URL.resetPassword, { ID: sID });
	}
	this.setClaims = function (data, id) {
		return DATA.set(URL.setclaims, { data, id })

	}
	this.getdvcha = function (id) {
		var a = DATA.get(URL.getdvcha, { id: id, donvi: jwt.donvi, tinhthanh: jwt.tinhthanh })
		return a

	}
	this.getlv = function () {
		var a = DATA.get(URL.getlv)
		return a
	}
	this.getTinhThanh = function (id) {
		var a = DATA.get(URL.getTinhThanh, { idtt: id })
		return a
	}

	this.getTinhThanhs = function (id) {
		var a = DATA.get(URL.getTinhThanhs)
		return a
	}
	this.getbaocao = function () {
		var a = DATA.get(URL.getbaocao)
		return a
	}
	this.getbaocaobyid = function (id) {
		var a = DATA.get(URL.getbaocaobyid, { id })
		return a
	}
	this.getcayphahenew = function (id) {
		var a = DATA.get(URL.GETDONVI, { i_node: id, i_returndataType: 0 })
		return a
	}


}