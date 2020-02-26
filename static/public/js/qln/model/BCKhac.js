var BCKhac = function(){

	const URL = {
        getBCTNTL: CONFIG_API.URL.BASE_API +'report/getbc_tntl',
	}
	this.getBCTNTL = function(data){
		var rs = DATA.get(URL.getBCTNTL , data);
		return rs;
    }
    
	
}