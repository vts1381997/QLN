var BCND97 = function(){
	var that = this;

	const URL = {
		getBCDPHTP:CONFIG_API.URL.BASE_API + 'report_nd97_dphtp/getbc',
		getTCMUATP:CONFIG_API.URL.BASE_API + 'report_nd97_tcmuatp/getbc',
		getMualai:CONFIG_API.URL.BASE_API + 'report_mualaitp/getbc',
		getHoanDoi:CONFIG_API.URL.BASE_API + 'report_hoandoitp/getbc',
		
	}

	this.getBCDPHTP = function(data){
		var rs = DATA.get(URL.getBCDPHTP,data);
		return rs
	}
	this.getTCMUATP = function(data){
		var rs = DATA.get(URL.getTCMUATP,data);
		return rs
	}
	this.getMualai = function(data){
		var rs = DATA.get(URL.getMualai,data);
		return rs
	}
	this.getHoanDoi = function(data){
		var rs = DATA.get(URL.getHoanDoi,data);
		return rs
	}
}