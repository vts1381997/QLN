var DeAnPHTPViewCT = function () {

	var that = this;
	this.oTable = null;
	this.oDialog = null;
	var oDeAnPHTP = new DeAnPHTP();
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		oDeAnPHTP.DEANPHATHANHTRAIPHIEUID = Util.Url.getParameterByName('id');
		that.bindForm();
	}

	this.bindForm = function () {

		if (!oDeAnPHTP.DEANPHATHANHTRAIPHIEUID || oDeAnPHTP.DEANPHATHANHTRAIPHIEUID == '') {
			that.AppTitle = 'Thêm mới Tổ chức tài chính';
			oDeAnPHTP.DEANPHATHANHTRAIPHIEUID = 0;
			that.clearForm();
		} else {
			that.AppTitle = 'Cập nhật Tổ chức tài chính';
			oDeAnPHTP.getById(oDeAnPHTP.DEANPHATHANHTRAIPHIEUID);
			$('#MA').val(oDeAnPHTP.MA);
			$('#TEN').val(oDeAnPHTP.TEN);
			$('#TINHTHANHID').val(oDeAnPHTP.TINHTHANHID);
			$('#SOQUYETDINH').val(oDeAnPHTP.SOQUYETDINH);
			$('#NGAYQUYETDINH').val(oDeAnPHTP.NGAYQUYETDINH);
			$('#TENTOCHUCPHATHANH').val(oDeAnPHTP.TENTOCHUCPHATHANH);
			$('#KHOILUONGPHATHANH').val(oDeAnPHTP.KHOILUONGPHATHANH);
			$('#NGAYKYHANTRAIPHIEU').val(oDeAnPHTP.NGAYKYHANTRAIPHIEU);
			$('#LAISUATPHATHANH').val(oDeAnPHTP.LAISUATPHATHANH);
			$('#MENHGIA').val(oDeAnPHTP.MENHGIA);
			$('#DONGTIENPHATHANH').val(oDeAnPHTP.DONGTIENPHATHANH);
			$('#PHUONGTHUCPHATHANH').val(oDeAnPHTP.PHUONGTHUCPHATHANH);
			$('#THOIGIANPHATHANH').val(oDeAnPHTP.THOIGIANPHATHANH);
			$('#KYHANTHANHTOAN').val(oDeAnPHTP.KYHANTHANHTOAN);
			$('#PHUONGTHUCTHANHTOAN').val(oDeAnPHTP.PHUONGTHUCTHANHTOAN);
			$('#LOAITHANHTOAN').val(oDeAnPHTP.LOAITHANHTOAN);
			$('#VANDEKHAC').val(oDeAnPHTP.VANDEKHAC);
			$('#STATUS').val(oDeAnPHTP.STATUS);
			$('#CREATEDDATE').val(oDeAnPHTP.CREATEDDATE);
			$('#CREATEDBY').val(oDeAnPHTP.CREATEDBY);
			$('#UPDATEDDATE').val(oDeAnPHTP.UPDATEDDATE);
			$('#UPDATEDBY').val(oDeAnPHTP.UPDATEDBY);
		}
	}

	this.clearForm = function () {
		$('#MA').val('');
		$('#TEN').val('');
		// $('#TINHTHANHID').val('');
		$('#SOQUYETDINH').val('');
		$('#NGAYQUYETDINH').val('');
		$('#TENTOCHUCPHATHANH').val('');
		$('#KHOILUONGPHATHANH').val('');
		$('#NGAYKYHANTRAIPHIEU').val('');
		$('#LAISUATPHATHANH').val('');
		$('#MENHGIA').val('');
		//$('#DONGTIENPHATHANH').val('');
		//$('#PHUONGTHUCPHATHANH').val('');
		$('#THOIGIANPHATHANH').val('');
		$('#KYHANTHANHTOAN').val('');
		//$('#PHUONGTHUCTHANHTOAN').val('');
		//$('#LOAITHANHTOAN').val('');
		$('#VANDEKHAC').val('');
		$('#STATUS').val('0');
		$('#CREATEDDATE').val('');
		$('#CREATEDBY').val('');
		$('#UPDATEDDATE').val('');
		$('#UPDATEDBY').val(1);
	}


	$(function () {
		// if ($.uuid()) {
		// 	$('#MA').val($.uuid())
		// 	console.log($.uuid(), 'uuid');
		// }
		var TinhThanhs = new TinhThanh()
		TinhThanhs.getAll();
		$(document).ready(() => {
			// if ($.uuid()) {
			// 	$('#MA').val($.uuid())
			// 	console.log($.uuid(), 'uuid 1');
			// }
			var resultTinhthanh = TinhThanhs.LIST
			var option = ''
			resultTinhthanh.map(value => {
				option = option + "<option value='" + value.TINHTHANHID + "'>" + value.TEN + "</option>"
			})
			$('#TINHTHANHID').append(option)
			that.initPage();
		})
		$("#MA").ready(() => {
			$('#MA').val($.uuid())
		})
		that.oDialog = new PopupDialog(reload);
		that.initPage();
		function reload() {
			that.initPage();
		}


		$('.ACTIONS').on('click', '#btnSave', function () {
			oDeAnPHTP.DEANPHATHANHTRAIPHIEUID = oDeAnPHTP.DEANPHATHANHTRAIPHIEUID
			if (oDeAnPHTP.DEANPHATHANHTRAIPHIEUID == '') {
				oDeAnPHTP.DEANPHATHANHTRAIPHIEUID = 0;
			}
			oDeAnPHTP.MA = $('#MA').val();
			oDeAnPHTP.TEN = $('#TEN').val();
			oDeAnPHTP.TINHTHANHID = $('#TINHTHANHID').val();
			oDeAnPHTP.SOQUYETDINH = $('#SOQUYETDINH').val();
			oDeAnPHTP.NGAYQUYETDINH = $('#NGAYQUYETDINH').val();
			oDeAnPHTP.TENTOCHUCPHATHANH = $('#TENTOCHUCPHATHANH').val();
			oDeAnPHTP.KHOILUONGPHATHANH = $('#KHOILUONGPHATHANH').val();
			oDeAnPHTP.NGAYKYHANTRAIPHIEU = $('#NGAYKYHANTRAIPHIEU').val();
			oDeAnPHTP.LAISUATPHATHANH = $('#LAISUATPHATHANH').val();
			oDeAnPHTP.MENHGIA = $('#MENHGIA').val();
			oDeAnPHTP.DONGTIENPHATHANH = $('#DONGTIENPHATHANH').val();
			oDeAnPHTP.PHUONGTHUCPHATHANH = $('#PHUONGTHUCPHATHANH').val();
			oDeAnPHTP.THOIGIANPHATHANH = $('#THOIGIANPHATHANH').val();
			oDeAnPHTP.KYHANTHANHTOAN = $('#KYHANTHANHTOAN').val();
			oDeAnPHTP.PHUONGTHUCTHANHTOAN = $('#PHUONGTHUCTHANHTOAN').val();
			oDeAnPHTP.LOAITHANHTOAN = $('#LOAITHANHTOAN').val();
			oDeAnPHTP.VANDEKHAC = $('#VANDEKHAC').val();

			var rs = oDeAnPHTP.save();
			if (!rs.CODE) {
				that.initPage();
			}
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(rs.MESSAGE, '40%', '50px');
		});


	});
}