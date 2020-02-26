var VayKBNNViewCT = function () {

	var that = this;
	this.oTable = null;
	this.oDialog = null;
	var oVayKBNN = new VayKBNN();
	oVayKBNN.getAll();
	oVayKBNN.LUYKE
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		oVayKBNN.VAYKHOBACNHANUOCID = Util.Url.getParameterByName('id');
		that.bindForm();
	}

	this.bindForm = function () {
		if (!oVayKBNN.VAYKHOBACNHANUOCID || oVayKBNN.VAYKHOBACNHANUOCID == '') {
			that.AppTitle = 'Thêm mới';
			oVayKBNN.VAYKHOBACNHANUOCID = 0;
			that.clearForm();
		} else {
			$("#SOTIENCONLAI").on('keyup change', function () {
				var tg = $("#DUNODAYLY").val() + $("#VAYTRONGKY").val() - $("#LUYKETRANOGOC").val()
				$("#SOTIENCONLAI").val(tg)
			})
			$("$TRANOGOC").on('keyup change', function () {
				$("#TRANOGOC").val(parseFloat(result[0].TRANOGOC) - parseFloat(result[0].LUYKETRANOGOC))
				if (parseFloat(result[0].TRANOGOC) - parseFloat(result[0].LUYKETRANOGOC) <= 0) {
					$("#TRANOGOC").prop('disabled', true)
				}
				else
					$("#TRANOGOC").prop('disabled', false)
			})
			that.AppTitle = 'Cập nhật';
			oVayKBNN.getById(oVayKBNN.VAYKHOBACNHANUOCID);
			$('#MUCDICHVAY').val(oVayKBNN.MUCDICHVAY);
			$('#NGAYVAY').val(oVayKBNN.NGAYVAY);
			$('#THOIHANVAY').val(oVayKBNN.THOIHANVAY);
			$('#VAYTRONGKY').val(oVayKBNN.VAYTRONGKY);
			$('#DUNODAUKY').val(oVayKBNN.DUNODAUKY);
			$('#TINHTHANHID').val(oVayKBNN.TINHTHANHID);
			$('#TRANOGOC').val(oVayKBNN.TRANOGOC);
			$('#LUYKETRANOGOC').val(oVayKBNN.LUYKETRANOGOC);
			$('#LAIPHI').val(oVayKBNN.LAIPHI);
			$('#SOTIENCONLAI').val(oVayKBNN.SOTIENCONLAI);
			$('#STATUS').val(oVayKBNN.STATUS);
			$('#CREATEDDATE').val(oVayKBNN.CREATEDDATE);
			$('#CREATEDBY').val(oVayKBNN.CREATEDBY);
			$('#UPDATEDDATE').val(oVayKBNN.UPDATEDDATE);
			$('#UPDATEDBY').val(oVayKBNN.UPDATEDBY);
		}
	}

	this.clearForm = function () {
		$("#NGAYVAY").val($.datepicker.formatDate('dd/mm/yy', new Date()))
		$('#THOIHANVAY').val('');
		$('#VAYTRONGKY').val('');
		$('#DUNODAUKY').val('');
		// $('#TRANOGOC').val('');
		$('#LAIPHI').val('');
		// $('#SOTIENCONLAI').val('');
		$('#STATUS').val('');
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

		$("#SOTIENCONLAI").on('keyup change', function () {
			var tg = $("#DUNODAYLY").val() + $("#VAYTRONGKY").val() - $("#LUYKETRANOGOC").val()
			$("#SOTIENCONLAI").val(tg)
		})

		$("TRANOGOC").on('keyup change', function () {
			$("LUYKETRANOGOC").val(luyke);
		})
		// var result = oVayKBNN.getById(id);
		// if (result) {
		// 	$("#TRANOGOC").val(result[0].TRANOGOC)
		// }
		// $("#TRANOGOC").val(parseFloat(result[0].TRANOGOC) - parseFloat(result[0].LUYKETRANOGOC))
		// if (parseFloat(result[0].TRANOGOC) - parseFloat(result[0].LUYKETRANOGOC) <= 0) {
		// 	$("#TRANOGOC").prop('disabled', true)
		// }
		// else
		// 	$("#TRANOGOC").prop('disabled', false)

		// $("#SOTIENTRAGOC").on('keyup change', function () {
		// 	var tg = $("#TIENKYVAY").val() - $("#SOTIENTRAGOC").val()
		// 	$("#DUNO").val(tg)
		// })

		var oTinhThanh = new TinhThanh()
		oTinhThanh.getAll();
		$(document).ready(() => {
			var resultTinhThanh = oTinhThanh.LIST
			// console.log(SoTienVays, 'list')
			var option = ''
			resultTinhThanh.map((value, index) => {
				option = option + "<option value='" + value.TINHTHANHID + "'>" + value.TEN + "</option>"
			})
			$('#TINHTHANHID').append(option)
			that.initPage();
		})

		that.oDialog = new PopupDialog(reload);
		that.initPage();

		function reload() {
			that.initPage();
		}

		$('.ACTIONS').on('click', '#btnSave', function () {
			oVayKBNN.VAYKHOBACNHANUOCID = oVayKBNN.VAYKHOBACNHANUOCID
			if (oVayKBNN.VAYKHOBACNHANUOCID == '') {
				oVayKBNN.VAYKHOBACNHANUOCID = 0;
			}
			oVayKBNN.MUCDICHVAY = $('#MUCDICHVAY').val();
			oVayKBNN.NGAYVAY = $('#NGAYVAY').val();
			oVayKBNN.THOIHANVAY = $('#THOIHANVAY').val();
			oVayKBNN.VAYTRONGKY = $('#VAYTRONGKY').val();
			oVayKBNN.DUNODAUKY = $('#DUNODAUKY').val();
			oVayKBNN.TINHTHANHID = $('#TINHTHANHID').val();
			oVayKBNN.TRANOGOC = $('#TRANOGOC').val();
			oVayKBNN.LUYKETRANOGOC = $('#LUYKETRANOGOC').val();
			oVayKBNN.LAIPHI = $('#LAIPHI').val();
			oVayKBNN.SOTIENCONLAI = $('#SOTIENCONLAI').val();
			oVayKBNN.STATUS = $('#STATUS').val();
			oVayKBNN.CREATEDDATE = $('#CREATEDDATE').val();
			oVayKBNN.CREATEDBY = $('#CREATEDBY').val();
			oVayKBNN.UPDATEDDATE = $('#UPDATEDDATE').val();
			oVayKBNN.UPDATEDBY = $('#UPDATEDBY').val();
			var rs = oVayKBNN.save();
			// if (!rs.CODE) {
			//     that.initPage();
			// }
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(rs.MESSAGE, '40%', '50px');
			oVayKBNN.getAll();
		});
	});
}
