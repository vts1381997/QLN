var ToChucTaiChinhCTView = function () {

	var that = this;
	this.oTable = null;
	this.oDialog = null;
	var oToChucTaiChinh = new ToChucTaiChinh();

	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		oToChucTaiChinh.TOCHUCTAICHINHID = Util.Url.getParameterByName('id');
		that.bindForm();
	}

	this.bindForm = function () {
		if (!oToChucTaiChinh.TOCHUCTAICHINHID || oToChucTaiChinh.TOCHUCTAICHINHID == '') {
			that.AppTitle = 'Thêm mới Tổ chức tài chính';
			oToChucTaiChinh.TOCHUCTAICHINHID = 0;
			that.clearForm();
		} else {
			that.AppTitle = 'Cập nhật Tổ chức tài chính';
			oToChucTaiChinh.getById(oToChucTaiChinh.TOCHUCTAICHINHID);
			$('#MA').val(oToChucTaiChinh.MA);
			$('#TEN').val(oToChucTaiChinh.TEN);
			$('#DIACHI').val(oToChucTaiChinh.DIACHI);
			$('#SOGIAYPHEP').val(oToChucTaiChinh.SOGIAYPHEP);
			$('#NGAYCAP').val(oToChucTaiChinh.NGAYCAP);
			$('#VONDIEULE').val(oToChucTaiChinh.VONDIEULE);
			$('#STATUS').val(oToChucTaiChinh.STATUS);
			$('#CREATEDDATE').val(oToChucTaiChinh.CREATEDDATE);
			$('#CREATEDBY').val(oToChucTaiChinh.CREATEDBY);
			$('#UPDATEDDATE').val(oToChucTaiChinh.UPDATEDDATE);
			$('#UPDATEDBY').val(oToChucTaiChinh.UPDATEDBY);
		}
	}

	this.clearForm = function () {
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


	$(function () {
		that.oDialog = new PopupDialog(reload);
		that.initPage();
		function reload() {
			that.initPage();
		}
		$('.ACTIONS').on('click', '#btnSave', function () {
			oToChucTaiChinh.TOCHUCTAICHINHID = oToChucTaiChinh.TOCHUCTAICHINHID
			if (oToChucTaiChinh.TOCHUCTAICHINHID == '') {
				oToChucTaiChinh.TOCHUCTAICHINHID = 0;
			}
			oToChucTaiChinh.MA = $('#MA').val();
			oToChucTaiChinh.TEN = $('#TEN').val();
			oToChucTaiChinh.DIACHI = $('#DIACHI').val();
			oToChucTaiChinh.SOGIAYPHEP = $('#SOGIAYPHEP').val();
			oToChucTaiChinh.NGAYCAP = $('#NGAYCAP').val();
			oToChucTaiChinh.VONDIEULE = $('#VONDIEULE').val();
			oToChucTaiChinh.STATUS = $('#STATUS').val();
			var rs = oToChucTaiChinh.save();
			if (!rs.CODE) {
				that.initPage();
			}
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(rs.MESSAGE, '40%', '50px');
		});


	});
}