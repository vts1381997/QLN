var NhaTaiTroCTView = function(){
	
	var that = this;
	this.oTable = null;
	this.oDialog = null;
	var oNhaTaiTro = new NhaTaiTro();
	
	this.initPage = function(){
		$('#AppTitle').html(that.AppTitle);
		oNhaTaiTro.NHATAITROID = Util.Url.getParameterByName('id');
		that.bindForm();
	}
	
	this.bindForm = function(){
		if(!oNhaTaiTro.NHATAITROID || oNhaTaiTro.NHATAITROID ==''){
			that.clearForm();
			that.AppTitle = 'Thêm mới Nhà tài trợ';
			oNhaTaiTro.NHATAITROID = 0;
		}
		else{
			that.AppTitle = 'Cập nhật Nhà tài trợ00000000';
			oNhaTaiTro.getById(oNhaTaiTro.NHATAITROID);
			$('#MA').val(oNhaTaiTro.MA);
			$('#TEN').val(oNhaTaiTro.TEN);
			$('#SODIENTHOAI').val(oNhaTaiTro.SODIENTHOAI);
			$('#MASOTHUE').val(oNhaTaiTro.MASOTHUE);
			$('#SOTAIKHOAN').val(oNhaTaiTro.SOTAIKHOAN);
			$('#DIACHI').val(oNhaTaiTro.DIACHI);
			$('#STATUS').val(oNhaTaiTro.STATUS);
			$('#CREATEDDATE').val(oNhaTaiTro.CREATEDDATE);
			$('#CREATEDBY').val(oNhaTaiTro.CREATEDBY);
			$('#UPDATEDDATE').val(oNhaTaiTro.UPDATEDDATE);
			$('#UPDATEDBY').val(oNhaTaiTro.UPDATEDBY);
		}
		
	}
	
	this.clearForm = function(){
		$('#MA').val('');
		$('#TEN').val('');
		$('#SODIENTHOAI').val('');
		$('#MASOTHUE').val('');
		$('#SOTAIKHOAN').val('');
		$('#DIACHI').val('');
		$('#STATUS').val('');
		$('#CREATEDDATE').val('');
		$('#CREATEDBY').val('');
		$('#UPDATEDDATE').val('');
		$('#UPDATEDBY').val('');
	}

	
	$(function() {


		that.oDialog = new PopupDialog(reload);
		that.initPage();

		function reload(){
			that.initPage();
		}

		 
		 $('.ACTIONS').on('click', '#btnSave', function () {
		 	 var d = new Date();
			 oNhaTaiTro.NHATAITROID = oNhaTaiTro.NHATAITROID;
			 if(oNhaTaiTro.NHATAITROID == ''){
			 	oNhaTaiTro.NHATAITROID = 0;
			 }
			 oNhaTaiTro.MA = $('#MA').val();
			 oNhaTaiTro.TEN = $('#TEN').val();
			 oNhaTaiTro.SODIENTHOAI = $('#SODIENTHOAI').val();
			 oNhaTaiTro.MASOTHUE = $('#MASOTHUE').val();
			 oNhaTaiTro.SOTAIKHOAN = $('#SOTAIKHOAN').val();
			 oNhaTaiTro.DIACHI = $('#DIACHI').val();
			 oNhaTaiTro.STATUS = $('#STATUS').val();
			 oNhaTaiTro.CREATEDDATE = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
			 var rs = oNhaTaiTro.save();
			 if(!rs.CODE){
				 that.initPage();
			 }
			 var oAlert = new AlertDialog('Thông báo');
			 oAlert.show(rs.MESSAGE, '40%', '50px');
	     });
		 
		 
	});
}