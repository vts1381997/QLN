var NguoiDungCTView = function(){
	
	var that = this;
	this.oTable = null;
	this.oDialog = null;
	var oNguoiDung = new NguoiDung();
	
	this.initPage = function(){
		$('#AppTitle').html(that.AppTitle);
		oNguoiDung.ID = Util.Url.getParameterByName('id');
		that.bindForm();
	}
	
	this.bindForm = function(){
		if(!oNguoiDung.ID || oNguoiDung.ID ==''){
			that.AppTitle = 'Thêm mới Tổ chức tài chính';
			oNguoiDung.ID = 0;
			that.clearForm();
		}else{
			that.AppTitle = 'Cập nhật Tổ chức tài chính';
			oNguoiDung.getById(oNguoiDung.ID);
			$('#USERNAME').val(oNguoiDung.USERNAME);
			$('#PASSWORD').val(oNguoiDung.TEN);
			$('#PASSWORD').val(oNguoiDung.TEN);
			$('#EMAIL').val(oNguoiDung.EMAIL);
			$('#PHONENUMBER').val(oNguoiDung.PHONENUMBER);
			$('#FULLNAME').val(oNguoiDung.FULLNAME);
			$('#SHKB').val(oNguoiDung.SHKB);
			$('#DIABAN').val(oNguoiDung.DIABAN);

			$('#STATUS').val(oNguoiDung.STATUS);
			$('#CREATEDDATE').val(oNguoiDung.CREATEDDATE);
			$('#CREATEDBY').val(oNguoiDung.CREATEDBY);
			$('#UPDATEDDATE').val(oNguoiDung.UPDATEDDATE);
			$('#UPDATEDBY').val(oNguoiDung.UPDATEDBY);
		}
	}
	
	this.clearForm = function(){
		$('#USERNAME').val('');
		$('#PASSWORD').val('');
		$('#EMAIL').val('');
		$('#PHONENUMBER').val('');
		$('#FULLNAME').val('');
		$('#SHKB').val('');
		$('#DIABAN').val('');
		$('#STATUS').val('0');
		$('#CREATEDDATE').val('');
		$('#CREATEDBY').val('');
		$('#UPDATEDDATE').val('');
		$('#UPDATEDBY').val(1);
	}

	
	$(function() {


		that.oDialog = new PopupDialog(reload);
		that.initPage();

		function reload(){
			that.initPage();
		}

		 
		 $('.ACTIONS').on('click', '#btnSave', function () {
			
			 oNguoiDung.USERNAME = $('#USERNAME').val();
			 oNguoiDung.PASSWORD = $('#PASSWORD').val();
			 oNguoiDung.EMAIL = $('#EMAIL').val();
			//  oNguoiDung.PHONENUMBER = $('#PHONENUMBER').val();
			//  oNguoiDung.FULLNAME = $('#FULLNAME').val();
			 oNguoiDung.SHKB = $('#SHKB').val();
			//  oNguoiDung.DIABAN = $('#DIABAN').val();
			 var rs = oNguoiDung.save();
			 if(!rs.CODE){
				 that.initPage();
			 }
			 var oAlert = new AlertDialog('Thông báo');
			 oAlert.show(rs.MESSAGE, '40%', '50px');
			 that.bindGrid01();
	     });
		 
		 
	});
}