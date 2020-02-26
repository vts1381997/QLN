var TinhThanhCTView = function () {

	var that = this;
	this.oTable = null;
	this.oDialog = null;
	var oTinhThanh = new TinhThanh();
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		oTinhThanh.TINHTHANHID = Util.Url.getParameterByName('id');
		that.bindForm();
	}

	this.bindForm = function () {
		if (!oTinhThanh.TINHTHANHID || oTinhThanh.TINHTHANHID == '') {
			that.AppTitle = 'Thêm mới Tổ chức mua trai phieu';
			oTinhThanh.TINHTHANHID = 0;
			that.clearForm();
		} else {
			that.AppTitle = 'Cập nhật Tổ chức  mua trai phieu';
			oTinhThanh.getById(oTinhThanh.TINHTHANHID);
			$('#MA').val(oTinhThanh.MA);
			$('#TEN').val(oTinhThanh.TEN);
			$('#NOTE').val(oTinhThanh.DIACHI);
			$('#STATUS').val(oTinhThanh.STATUS);
			$('#CREATEDDATE').val(oTinhThanh.CREATEDDATE);
			$('#CREATEDBY').val(oTinhThanh.CREATEDBY);
			$('#UPDATEDDATE').val(oTinhThanh.UPDATEDDATE);
			$('#UPDATEDBY').val(oTinhThanh.UPDATEDBY);
		}
	}

	this.clearForm = function () {
		$('#MA').val('');
		$('#TEN').val('');
		//$('#NOTE').val('');
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
			oTinhThanh.TINHTHANHID = oTinhThanh.TINHTHANHID;
			if (oTinhThanh.TINHTHANHID == '')
				oTinhThanh.TINHTHANHID = 0;

			oTinhThanh.MA = $('#MA').val();
			oTinhThanh.TEN = $('#TEN').val();
			oTinhThanh.NOTE = $('#NOTE').val();
			var rs = oTinhThanh.save();
			if (!rs.CODE) {
				that.initPage();
			}
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(rs.MESSAGE, '40%', '50px');
		});


	});
}