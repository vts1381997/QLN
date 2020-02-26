var NguoiDungCTTView = function(){
	
	var that = this;
	this.oTable = null;
	this.oDialog = null;
	var oNguoiDung = new NguoiDung();
	
	this.initPage = function(){
		$('#AppTitle').html(that.AppTitle);
	
	}
	
	
	
	$(function() {

		that.oDialog = new PopupDialog(reload);
		that.initPage();
		oNguoiDung.getClaim();

		 
	});
}