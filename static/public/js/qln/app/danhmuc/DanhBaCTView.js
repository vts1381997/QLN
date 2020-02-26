var DanhBaCTView = function(){
	
	var that = this;
	this.AppTitle = 'T';
	this.Id='';
	this.oTable = null;
	this.oDialog = null;
	this.oDmDanhBa = new DanhBa();
	
	this.init = function(){
		that.oDmDanhBa.DANHBAID = Util.Url.getParameterByName('id');
		that.initForm();
	}

	this.initForm = function(){
		if(!that.oDmDanhBa.DANHBAID || that.oDmDanhBa.DANHBAID ==''){
			that.AppTitle = 'Thêm mới Danh bạ';
		}else{
			that.AppTitle = 'Cập nhật Danh bạ';
			that.oDmDanhBa.getById(that.oDmDanhBa.DANHBAID);
		}
		$('#HOTEN').val(that.oDmDanhBa.HOTEN);
		$('#SODIENTHOAI').val(that.oDmDanhBa.SODIENTHOAI);
		$('#EMAIL').val(that.oDmDanhBa.EMAIL);
		$('#DIACHI').val(that.oDmDanhBa.DIACHI);
		$('.bootstrap-dialog-title', window.parent.document).html(that.AppTitle);
	}

	this.validSave= function(){
		var sInvalid = '';
		if ($('#HOTEN').val()=='') {
			sInvalid +='<p style="color:red;font-weight:bold">(*) Không được để trống họ tên</p>';
		}
		return sInvalid;
	}

	this.save = function(){
		var sInvalid = that.validSave();
		if (sInvalid != '') {
			var oAlert = new AlertDialog('Cảnh báo');
			oAlert.show(sInvalid, '40%', '130px');
			return false;
		}
		that.oDmDanhBa.HOTEN = $('#HOTEN').val();
		that.oDmDanhBa.SODIENTHOAI = $('#SODIENTHOAI').val();
		that.oDmDanhBa.EMAIL = $('#EMAIL').val();
		that.oDmDanhBa.DIACHI = $('#DIACHI').val();
		var rs = that.oDmDanhBa.save();
		that.oDmDanhBa.DANHBAID = rs.RESULT;
		var oAlert = new AlertDialog('Thông báo');
		oAlert.show(rs.MESSAGE, '40%', '50px');

		that.initForm();

	}

	$(function() {

		that.init();

		$('.ACTIONS').on('click', '#btnSave', function () {
			that.save();
		});		

		
	});
}