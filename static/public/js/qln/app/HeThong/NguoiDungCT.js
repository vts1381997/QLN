var ToChucTaiChinhCTView = function(){
	
	var that = this;
	this.oTable = null;
	this.oDialog = null;
	var oNguoiDung = new ToChucTaiChinh();
	
	this.initPage = function(){
		$('#AppTitle').html(that.AppTitle);
		oNguoiDung.NGUOIDUNGID = Util.Url.getParameterByName('id');
		that.bindForm();
	}
	
	this.bindForm = function(){
		if(!oNguoiDung.NGUOIDUNGID || oNguoiDung.NGUOIDUNGID ==''){
			that.AppTitle = 'Thêm mới Tổ chức tài chính';
			oNguoiDung.NGUOIDUNGID = 0;
			that.clearForm();
		}else{
			that.AppTitle = 'Cập nhật Tổ chức tài chính';
			oNguoiDung.getById(oNguoiDung.NGUOIDUNGID);
			$('#MA').val(oNguoiDung.MA);
			$('#TEN').val(oNguoiDung.TEN);
			$('#DIACHI').val(oNguoiDung.DIACHI);
			$('#SOGIAYPHEP').val(oNguoiDung.SOGIAYPHEP);
			$('#NGAYCAP').val(oNguoiDung.NGAYCAP);
			$('#VONDIEULE').val(oNguoiDung.VONDIEULE);
			$('#STATUS').val(oNguoiDung.STATUS);
			$('#CREATEDDATE').val(oNguoiDung.CREATEDDATE);
			$('#CREATEDBY').val(oNguoiDung.CREATEDBY);
			$('#UPDATEDDATE').val(oNguoiDung.UPDATEDDATE);
			$('#UPDATEDBY').val(oNguoiDung.UPDATEDBY);
		}
	}
	
	this.clearForm = function(){
		$('#MA').val('');
		$('#TEN').val('');
		$('#DIACHI').val('');
		$('#SOGIAYPHEP').val('');
		$('#NGAYCAP').val('');
		$('#VONDIEULE').val('0');
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
			 oNguoiDung.NGUOIDUNGID = $('#NGUOIDUNGID').val();
			 if(oNguoiDung.NGUOIDUNGID == '')
			 	oNguoiDung.NGUOIDUNGID = 0;
			 oNguoiDung.MA = $('#MA').val();
			 oNguoiDung.TEN = $('#TEN').val();
			 oNguoiDung.DIACHI = $('#DIACHI').val();
			 oNguoiDung.SOGIAYPHEP = $('#SOGIAYPHEP').val();
			 oNguoiDung.NGAYCAP = $('#NGAYCAP').val();
			 oNguoiDung.VONDIEULE = $('#VONDIEULE').val();
			 oNguoiDung.STATUS = $('#STATUS').val();
			 var rs = oNguoiDung.save();
			 if(!rs.CODE){
				 that.initPage();
			 }
			 alert(rs.MESSAGE);
	     });
		 
		 
	});
}