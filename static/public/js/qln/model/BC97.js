var BC97 = function(){
	var that = this;

	const URL = {
		getDataReportTinhHinhVayTraNoDinhKyHangNam: CONFIG_API.URL.BASE_API +'qln/report_baocaotonghoptinhhinhvaytranodinhkihnagnam',
	}

	this.getDataReportTinhHinhVayTraNoDinhKyHangNam  = function(data){
		var rs = DATA.get(URL.getDataReportTinhHinhVayTraNoDinhKyHangNam , data);
        return rs;
	}
}