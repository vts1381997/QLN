var DashBoard = function () {
	var that = this;

	const URL = {
		GETTHONGKE: CONFIG_API.URL.BASE_API + 'qln/dasboard_thongke',
		GETCHARTPIE: CONFIG_API.URL.BASE_API + 'qln/dasboard_pie',
		GETCHARTBAR: CONFIG_API.URL.BASE_API + 'qln/dasboard_bar',
	}

	this.getThongke = function () {
		var rs = DATA.get(URL.GETTHONGKE);
		return rs
	}

	this.getChartPie = function () {
		var rs = DATA.get(URL.GETCHARTPIE);
		return rs
	}
	this.getChartBar = function () {
		var nam_hientai = (new Date()).getFullYear()
		var dPost = {
			i_ngaybatdaunamtruoc: '01/' + '01/' + (Number(nam_hientai) - 1),
			i_ngayketthucnamtruoc: '31/' + '12/' + (Number(nam_hientai) - 1),
			i_ngaybatdaunamnay: '01/' + '01/' + nam_hientai,
			i_ngayketthucnamnay: '31/' + '12/' + nam_hientai,
		}
		var rs = DATA.get(URL.GETCHARTBAR, dPost);
		return rs
	}
}