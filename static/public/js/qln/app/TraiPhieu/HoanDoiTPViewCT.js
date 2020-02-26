var HoanDoiTPViewCT = function () {

	var that = this;
	this.oTable = null;
	this.oDialog = null;
	var oHoanDoiTP = new HoanDoiTP();
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		oHoanDoiTP.HOANDOITRAIPHIEUID = Util.Url.getParameterByName('id');
		that.bindForm();
	}
	String.prototype.replaceAll = function (search, replacement) {
		var target = this;
		return target.replace(new RegExp(search, 'g'), replacement);
	};
	this.bindForm = function () {
		if (!oHoanDoiTP.HOANDOITRAIPHIEUID || oHoanDoiTP.HOANDOITRAIPHIEUID == '') {
			that.AppTitle = 'Thêm mới mua lại trái phiếu';
			oHoanDoiTP.HOANDOITRAIPHIEUID = 0;
			that.clearForm();
		} else {
			that.AppTitle = 'Cập nhật mua lại trái phiếu';
			oHoanDoiTP.getById(oHoanDoiTP.HOANDOITRAIPHIEUID);
			$('#MA').val(oHoanDoiTP.MA);
			$('#TEN').val(oHoanDoiTP.TEN);
			$('#PHUONGTHUCHOANDOI').val(oHoanDoiTP.PHUONGTHUCHOANDOI);
			$('#DANHSACHCHUSOHUU').val(oHoanDoiTP.DANHSACHCHUSOHUU);
			$('#TINHTHANHID').val(oHoanDoiTP.TINHTHANHID);
			$('#TENTAISANMUALAI').val(oHoanDoiTP.TENTAISANMUALAI);
			$('#NGAYCUOIDANGKYBAN').val(oHoanDoiTP.NGAYCUOIDANGKYBAN);
			$('#NGAYPHONGTOA').val(oHoanDoiTP.NGAYPHONGTOA);
			$('#NGAYTOCHUCMUA').val(oHoanDoiTP.NGAYTOCHUCMUA);
			$('#NGAYMUALAI').val(oHoanDoiTP.NGAYMUALAI);
			$('#KHOILUONGMUALAI').val(oHoanDoiTP.KHOILUONGMUALAI);
			$('#LAISUAT').val(oHoanDoiTP.LAISUAT);
			$('#GIA').val(oHoanDoiTP.GIA);
			$('#TONGSOTIENMUALAI').val(oHoanDoiTP.TONGSOTIENMUALAI);
			$('#TOCHUCMUALAI').val(oHoanDoiTP.TOCHUCMUALAI);
			$('#STATUS').val(oHoanDoiTP.STATUS);
			$('#CREATEDDATE').val(oHoanDoiTP.CREATEDDATE);
			$('#CREATEDBY').val(oHoanDoiTP.CREATEDBY);
			$('#UPDATEDDATE').val(oHoanDoiTP.UPDATEDDATE);
			$('#UPDATEDBY').val(oHoanDoiTP.UPDATEDBY);
		}
	}

	this.clearForm = function () {
		$('#MA').val('');
		$('#TEN').val('');
		$('#DANHSACHCHUSOHUU').val('');
		$('#NGAYCUOIDANGKYBAN').val('');
		$('#NGAYPHONGTOA').val('');
		$('#NGAYTOCHUCMUA').val('');
		$('#NGAYMUALAI').val('');
		$('#KHOILUONGMUALAI').val('');
		$('#LAISUAT').val('');
		$('#GIA').val('');
		$('#TONGSOTIENMUALAI').val('');
		$('#TOCHUCMUALAI').val('');
		$('#STATUS').val('0');
		$('#CREATEDDATE').val('');
		$('#CREATEDBY').val('');
		$('#UPDATEDDATE').val('');
		$('#UPDATEDBY').val(1);
	}


	$(function () {
		var TinhThanhss = new TinhThanh()
		TinhThanhss.getAll();
		var DeAns = new DeAnPHTP()
		DeAns.getAll();
		$(document).ready(() => {
			var resultTinhthanh = TinhThanhss.LIST
			console.log(TinhThanhss, 'list')
			var option = ''
			resultTinhthanh.map(value => {
				option = option + "<option value='" + value.TINHTHANHID + "'>" + value.TEN + "</option>"
			})
			$('#TINHTHANHID').append(option)
			var resultDeAns = DeAns.LIST
			var option1 = ''
			resultDeAns.map(value => {
				option1 = option1 + "<option value='" + value.TEN + "'>" + value.TEN + "</option>"
			})
			$('#TENTAISANMUALAI').append(option1)
			that.initPage();
		})
		// var MuaLaiTPs = new MuaLaiTP()
		// MuaLaiTPs.getAll();
		// $(document).ready(()=> {
		// 	var resultDanhSach = MuaLaiTPs.LIST
		// 	console.log(MuaLaiTPs, 'list')
		// 	var option = ''
		// 	resultDanhSach.map(value => {
		// 		option = option + "<option value='" + value.CHUSOHUUTP + "'>" + value.CHUSOHUUTP + "</option>"
		// 	})		
		// 	$('#DANHSACHCHUSOHUU').append(option)
		// 	that.initPage();
		// })
		that.oDialog = new PopupDialog(reload);
		that.initPage();
		function reload() {
			that.initPage();
		}
		$(document).ready(() => {
			$("#GIA").on('change', function () {
				$("#GIA").val(formatMoney(document.getElementById("GIA").value))
			})
			$('body').on('keyup', '.KHOILUONGMUALAI', function () {
				if ($("#GIA").val()) {
					$("#TONGSOTIENMUALAI").val(formatMoney(parseInt($("#GIA").val()) * parseInt($("#KHOILUONGMUALAI").val())))
				}
				else {
					$("#TONGSOTIENMUALAI").val('')
				}
			})
			$('body').on('keyup', '.GIA', function () {
				if ($("#KHOILUONGMUALAI").val()) {
					$("#TONGSOTIENMUALAI").val(formatMoney(parseInt($("#GIA").val()) * parseInt($("#KHOILUONGMUALAI").val())))
				}
				else {
					$("#TONGSOTIENMUALAI").val('')
				}
			})
		})
		function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
			try {
				decimalCount = Math.abs(decimalCount);
				decimalCount = isNaN(decimalCount) ? 0 : decimalCount;

				const negativeSign = amount < 0 ? "-" : "";

				let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
				let j = (i.length > 3) ? i.length % 3 : 0;

				return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
			} catch (e) {
				console.log(e)
			}
		};
		$('.ACTIONS').on('click', '#btnSave', function () {
			oHoanDoiTP.HOANDOITRAIPHIEUID = oHoanDoiTP.HOANDOITRAIPHIEUID
			if (oHoanDoiTP.HOANDOITRAIPHIEUID == '') {
				oHoanDoiTP.HOANDOITRAIPHIEUID = 0;
			}
			oHoanDoiTP.MA = $('#MA').val();
			oHoanDoiTP.TEN = $('#TEN').val();
			oHoanDoiTP.PHUONGTHUCHOANDOI = $('#PHUONGTHUCHOANDOI').val();
			oHoanDoiTP.DANHSACHCHUSOHUU = $('#DANHSACHCHUSOHUU').val();
			oHoanDoiTP.TINHTHANHID = $('#TINHTHANHID').val();
			oHoanDoiTP.TENTAISANMUALAI = $('#TENTAISANMUALAI').val();
			oHoanDoiTP.NGAYCUOIDANGKYBAN = $('#NGAYCUOIDANGKYBAN').val();
			oHoanDoiTP.NGAYPHONGTOA = $('#NGAYPHONGTOA').val();
			oHoanDoiTP.NGAYTOCHUCMUA = $('#NGAYTOCHUCMUA').val();
			oHoanDoiTP.NGAYMUALAI = $('#NGAYMUALAI').val();
			oHoanDoiTP.KHOILUONGMUALAI = $('#KHOILUONGMUALAI').val();
			oHoanDoiTP.LAISUAT = $('#LAISUAT').val();
			oHoanDoiTP.GIA = $('#GIA').val().replaceAll(',', '');
			oHoanDoiTP.TONGSOTIENMUALAI = $('#TONGSOTIENMUALAI').val().replaceAll(',', '');
			oHoanDoiTP.TOCHUCMUALAI = $('#TOCHUCMUALAI').val();
			var rs = oHoanDoiTP.save();
			if (!rs.CODE) {
				that.initPage();
			}
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(rs.MESSAGE, '40%', '50px');
		});
	});
}