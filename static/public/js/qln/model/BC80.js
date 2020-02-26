var BC80 = function(){
	var that = this;

	const URL = {
		getDataReportOdaChinhPhu: CONFIG_API.URL.BASE_API +'qln/report_80_baocaotonghoptinhhinhvaylai',
		getDataReportOdaChinhPhuChuNo: CONFIG_API.URL.BASE_API +'qln/report_80_baocaotonghoptinhhinhvaylaichuno',
	}

	this.getDataReportOdaChinhPhu  = function(data){
		var rs = DATA.get(URL.getDataReportOdaChinhPhu , data);
        return rs;
	}

	this.getDataReportOdaChinhPhuChuNo  = function(data){
		var rs = DATA.get(URL.getDataReportOdaChinhPhuChuNo , data);
        return rs;
	}
}