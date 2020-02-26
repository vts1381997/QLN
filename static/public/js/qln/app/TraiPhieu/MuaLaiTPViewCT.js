var MuaLaiTPViewCT = function () {

	var that = this;
	this.oTable = null;
	this.oDialog = null;
	var oMuaLaiTP = new MuaLaiTP();
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		oMuaLaiTP.MUALAITRAIPHIEUID = Util.Url.getParameterByName('id');
		that.bindForm();
	}
	String.prototype.replaceAll = function (search, replacement) {
		var target = this;
		return target.replace(new RegExp(search, 'g'), replacement);
	};
	this.bindForm = function () {
		if (!oMuaLaiTP.MUALAITRAIPHIEUID || oMuaLaiTP.MUALAITRAIPHIEUID == '') {
			that.AppTitle = 'Thêm mới mua lại trái phiếu';
			oMuaLaiTP.MUALAITRAIPHIEUID = 0;
			that.clearForm();
		} else {
			that.AppTitle = 'Cập nhật mua lại trái phiếu';
			oMuaLaiTP.getById(oMuaLaiTP.MUALAITRAIPHIEUID);
			$('#MA').val(oMuaLaiTP.MA);
			$('#TEN').val(oMuaLaiTP.TEN);
			$('#NGAYCUOIDANGKY').val(oMuaLaiTP.NGAYCUOIDANGKY);
			$('#NGAYPHONGTOA').val(oMuaLaiTP.NGAYPHONGTOA);
			$('#NGAYTOCHUCMUA').val(oMuaLaiTP.NGAYTOCHUCMUA);
			$('#NGAYMUALAI').val(oMuaLaiTP.NGAYMUALAI);
			$('#PHUONGTHUCMUA').val(oMuaLaiTP.PHUONGTHUCMUA);
			$('#CHUSOHUUTP').val(oMuaLaiTP.CHUSOHUUTP);
			$('#TINHTHANHID').val(oMuaLaiTP.TINHTHANHID);
			$('#TENTAISAN').val(oMuaLaiTP.TENTAISAN);
			$('#TOCHUCMUALAI').val(oMuaLaiTP.TOCHUCMUALAI);
			$('#TONGSOTIENMUALAI').val(oMuaLaiTP.TONGSOTIENMUALAI);
			$('#GIA').val(oMuaLaiTP.GIA);
			$('#LAISUAT').val(oMuaLaiTP.LAISUAT);
			$('#KHOILUONGMUALAI').val(oMuaLaiTP.KHOILUONGMUALAI);
			$('#STATUS').val(oMuaLaiTP.STATUS);
			$('#CREATEDDATE').val(oMuaLaiTP.CREATEDDATE);
			$('#CREATEDBY').val(oMuaLaiTP.CREATEDBY);
			$('#UPDATEDDATE').val(oMuaLaiTP.UPDATEDDATE);
			$('#UPDATEDBY').val(oMuaLaiTP.UPDATEDBY);
		}
	}

	this.clearForm = function () {
		$('#MA').val('');
		$('#TEN').val('');
		$('#NGAYCUOIDANGKY').val('');
		$('#NGAYPHONGTOA').val('');
		$('#NGAYTOCHUCMUA').val('');
		$('#NGAYMUALAI').val('');
		$('#CHUSOHUUTP').val('');
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
			$('#TENTAISAN').append(option1)
			that.initPage();
		})

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
			oMuaLaiTP.MUALAITRAIPHIEUID = oMuaLaiTP.MUALAITRAIPHIEUID
			if (oMuaLaiTP.MUALAITRAIPHIEUID == '') {
				oMuaLaiTP.MUALAITRAIPHIEUID = 0;
			}
			oMuaLaiTP.MA = $('#MA').val();
			oMuaLaiTP.TEN = $('#TEN').val();
			oMuaLaiTP.NGAYCUOIDANGKY = $('#NGAYCUOIDANGKY').val();
			oMuaLaiTP.NGAYPHONGTOA = $('#NGAYPHONGTOA').val();
			oMuaLaiTP.NGAYTOCHUCMUA = $('#NGAYTOCHUCMUA').val();
			oMuaLaiTP.NGAYMUALAI = $('#NGAYMUALAI').val();
			oMuaLaiTP.PHUONGTHUCMUA = $('#PHUONGTHUCMUA').val();
			oMuaLaiTP.CHUSOHUUTP = $('#CHUSOHUUTP').val();
			oMuaLaiTP.TINHTHANHID = $('#TINHTHANHID').val();
			oMuaLaiTP.TENTAISAN = $('#TENTAISAN').val();
			oMuaLaiTP.TOCHUCMUALAI = $('#TOCHUCMUALAI').val();
			oMuaLaiTP.TONGSOTIENMUALAI = $('#TONGSOTIENMUALAI').val().replaceAll(',', '');
			oMuaLaiTP.GIA = $('#GIA').val().replaceAll(',', '');
			oMuaLaiTP.LAISUAT = $('#LAISUAT').val();
			oMuaLaiTP.KHOILUONGMUALAI = $('#KHOILUONGMUALAI').val();
			var rs = oMuaLaiTP.save();
			if (!rs.CODE) {
				that.initPage();
			}
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(rs.MESSAGE, '40%', '50px');
		});
	});
}