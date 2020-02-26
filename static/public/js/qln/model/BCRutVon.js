var BCRutVon = function(){
	var that = this;

	const URL = {
		GETBC:CONFIG_API.URL.BASE_API + 'bc_rutvon/getbc',
		
	}

	this.getBC = function(thanhpho,tungay,denngay){
		var rs = DATA.get(URL.GETBC,{thanhpho,tungay,denngay});
		that.LIST = rs;
	}
	
	
}