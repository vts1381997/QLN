var TrungTest = function(){
	var that = this;
	this.ID=0;							
	this.HOTEN="";
	this.SODIENTHOAI="";
	this.EMAIL="";
	this.DIACHI="";
	this.STATUS=0;
	this.CREATEDDATE="";
	this.CREATEDBY="";
	this.UPDATEDDATE="";
	this.UPDATEDBY="";
	var url = 'http://localhost:5000/xml'
	// Get all data
	this.getAll = function(){
		var rs = DATA.get(url);
		that.LIST = rs;
	}
	

}