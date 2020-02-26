var BieuMauBaoCaoCTView = function () {

	var that = this;
	this.oTable = null;
	this.oDialog = null;
	this.AppTitle = '';
	var oBieuMauBaoCao = new BieuMauBaoCao();
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		oBieuMauBaoCao.BIEUMAUBAOCAOID = Util.Url.getParameterByName('id');
		that.bindForm();
	}

	this.bindForm = function () {
		if (!oBieuMauBaoCao.BIEUMAUBAOCAOID || oBieuMauBaoCao.BIEUMAUBAOCAOID == '') {
			that.AppTitle = 'Thêm mới Tổ chức 34434tài chính';
		} else {
			that.AppTitle = 'Cập nhật Tổ chức tài chính';
			oBieuMauBaoCao.getById(oBieuMauBaoCao.BIEUMAUBAOCAOID);
			$('#MA').val(oBieuMauBaoCao.MA);
			$('#TIEUDE').val(oBieuMauBaoCao.TIEUDE);
			$('#COQUANBANHANH').val(oBieuMauBaoCao.COQUANBANHANH);
			$('#NGAYBANHANH').val(oBieuMauBaoCao.NGAYBANHANH);
			$('#NGAYHIEULUC').val(oBieuMauBaoCao.NGAYHIEULUC);
			$('#NHOMBAOCAO').val(oBieuMauBaoCao.NHOMBAOCAO);
			$('#CREATEDDATE').val(oBieuMauBaoCao.CREATEDDATE);
			$('#CREATEDBY').val(oBieuMauBaoCao.CREATEDBY);
			$('#UPDATEDDATE').val(oBieuMauBaoCao.UPDATEDDATE);
			$('#UPDATEDBY').val(oBieuMauBaoCao.UPDATEDBY);
		}
	}

	this.clearForm = function () {
		$('#MA').val('');
		$('#TIEUDE').val('');
		$('#COQUANBANHANH').val('');
		$('#NGAYBANHANH').val('');
		$('#NGAYHIEULUC').val('');
		$('#STATUS').val('0');
		$('#CREATEDDATE').val('');
		$('#CREATEDBY').val('');
		$('#UPDATEDDATE').val('');
		$('#UPDATEDBY').val(1);
	}
	this.validSave = function () {
		var sInvalid = '';
		if ($('#MA').val() == '') {
			sInvalid += '<p style="color:red;font-weight:bold">(*) Không được để trống họ tên</p>';
		}
		return sInvalid;
	}

	this.save = function () {
		var sInvalid = that.validSave();
		if (sInvalid != '') {
			var oAlert = new AlertDialog('Cảnh báo');
			oAlert.show(sInvalid, '40%', '130px');
			return false;
		}
		oBieuMauBaoCao.HOTEN = $('#HOTEN').val();
		oBieuMauBaoCao.SODIENTHOAI = $('#SODIENTHOAI').val();
		oBieuMauBaoCao.EMAIL = $('#EMAIL').val();
		oBieuMauBaoCao.DIACHI = $('#DIACHI').val();
		var rs = oBieuMauBaoCao.save();
		var oAlert = new AlertDialog('Thông báo');
		oAlert.show(rs.MESSAGE, '40%', '50px');
		that.initForm();

	}


	$(function () {


		that.oDialog = new PopupDialog(reload);
		that.initPage();

		function reload() {
			that.initPage();
		}
		

		$('.ACTIONS').on('click', '#btnclose', function () {
			that.oDialog.close();
		});	

		$('.ACTIONS').on('click', '#btnSave', function () {
			if (oBieuMauBaoCao.BIEUMAUBAOCAOID == '')
				{
					oBieuMauBaoCao.BIEUMAUBAOCAOID = 0;
				}
			oBieuMauBaoCao.MA = $('#MA').val();
			oBieuMauBaoCao.TIEUDE = $('#TIEUDE').val();
			oBieuMauBaoCao.COQUANBANHANH = $('#COQUANBANHANH').val();
			oBieuMauBaoCao.NGAYBANHANH = $('#NGAYBANHANH').val();
			oBieuMauBaoCao.NGAYHIEULUC = $('#NGAYHIEULUC').val();
			oBieuMauBaoCao.NHOMBAOCAO = $('#NHOMBAOCAO').val();
			var rs = oBieuMauBaoCao.save();
			if (!rs.CODE) {
				that.initPage();
			}
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(rs.MESSAGE, '40%', '50px');
		});
		$('.ACTIONS').on('click', '#btnclose', function () {
			that.oDialog.close();	
		});
	});
}