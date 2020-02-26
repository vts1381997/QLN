var ToChucMuaTPCTView = function () {

	var that = this;
	this.oTable = null;
	this.oDialog = null;
	var oToChucMuaTP = new ToChucMuaTP();

	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		oToChucMuaTP.TOCHUCMUATPID = Util.Url.getParameterByName('id');
		that.bindForm();
	}

	this.bindForm = function () {
		if (!oToChucMuaTP.TOCHUCMUATPID || oToChucMuaTP.TOCHUCMUATPID == '') {
			that.AppTitle = 'Thêm mới Tổ chức mua trai phieu';
			oToChucMuaTP.TOCHUCMUATPID = 0;
			that.clearForm();
		} else {
			that.AppTitle = 'Cập nhật Tổ chức  mua trai phieu';
			oToChucMuaTP.getById(oToChucMuaTP.TOCHUCMUATPID);
			$('#MA').val(oToChucMuaTP.MA);
			$('#TOCHUC').val(oToChucMuaTP.TOCHUC);
			$('#LOAI').val(oToChucMuaTP.LOAI);
			$('#SODIENTHOAI').val(oToChucMuaTP.SODIENTHOAI);
			$('#DIACHI').val(oToChucMuaTP.DIACHI);
			$('#EMAIL').val(oToChucMuaTP.EMAIL);
			$('#STATUS').val(oToChucMuaTP.STATUS);
			$('#CREATEDDATE').val(oToChucMuaTP.CREATEDDATE);
			$('#CREATEDBY').val(oToChucMuaTP.CREATEDBY);
			$('#UPDATEDDATE').val(oToChucMuaTP.UPDATEDDATE);
			$('#UPDATEDBY').val(oToChucMuaTP.UPDATEDBY);
		}
	}

	this.clearForm = function () {
		$('#MA').val('');
		$('#TOCHUC').val('');
		$('#LOAI').val('');
		$('#SODIENTHOAI').val('');
		$('#DIACHI').val('');
		$('#EMAIL').val('0');
		$('#STATUS').val('0');
		$('#CREATEDDATE').val('');
		$('#CREATEDBY').val('');
		$('#UPDATEDDATE').val('');
		$('#UPDATEDBY').val(1);
	}


	$(function () {

		that.oDialog = new PopupDialog(reload);
		that.initPage();

		function reload() {
			that.initPage();
		}

		$('.ACTIONS').on('click', '#btnSave', function () {
			oToChucMuaTP.TOCHUCMUATPID = oToChucMuaTP.TOCHUCMUATPID;
			if (oToChucMuaTP.TOCHUCMUATPID == '')
				oToChucMuaTP.TOCHUCMUATPID = 0;
			oToChucMuaTP.MA = $('#MA').val();
			oToChucMuaTP.TOCHUC = $('#TOCHUC').val();
			oToChucMuaTP.LOAI = $('#LOAI').val();
			oToChucMuaTP.SODIENTHOAI = $('#SODIENTHOAI').val();
			oToChucMuaTP.DIACHI = $('#DIACHI').val();
			oToChucMuaTP.EMAIL = $('#EMAIL').val();
			var rs = oToChucMuaTP.save();
			if (!rs.CODE) {
				that.initPage();
			}
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(rs.MESSAGE, '40%', '50px');
		});


	});
}