var HopDongVayLaiViewCT = function () {

	var that = this;
	this.oTable = null;
	this.oDialog = null;
	var oHopDongVayLai = new HopDongVayLai();
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		oHopDongVayLai.HOPDONGVAYLAIID = Util.Url.getParameterByName('id');
		that.bindForm();
	}

	this.bindForm = function () {

		if (!oHopDongVayLai.HOPDONGVAYLAIID || oHopDongVayLai.HOPDONGVAYLAIID == '') {
			that.AppTitle = 'Thêm mới hợp đồng vay lại';
			oHopDongVayLai.HOPDONGVAYLAIID = 0;
			that.clearForm();
		} else {
			that.AppTitle = 'Cập nhật hợp đồng vay lại';
			oHopDongVayLai.getById(oHopDongVayLai.HOPDONGVAYLAIID);
			$('#MA').val(oHopDongVayLai.MA);
			$('#TEN').val(oHopDongVayLai.TEN);
			$('#NGAYKY').val(oHopDongVayLai.NGAYKY);
			$('#COQUANVAYLAI').val(oHopDongVayLai.COQUANVAYLAI);
			$('#COQUANUYQUYENVAYLAI').val(oHopDongVayLai.COQUANUYQUYENVAYLAI);
			$('#TIENKYVAY').val(oHopDongVayLai.TIENKYVAY);
			$('#LAISUATVAY').val(oHopDongVayLai.LAISUATVAY);
			$('#NGAYHIEULUC').val(oHopDongVayLai.NGAYHIEULUC);
			$('#NGAYTRANOGOCDAUTIEN').val(oHopDongVayLai.NGAYTRANOGOCDAUTIEN);
			$('#NGAYTRANOLAIDAUTIEN').val(oHopDongVayLai.NGAYTRANOLAIDAUTIEN);
			$('#NGAYTRANOGOCCUOICUNG').val(oHopDongVayLai.NGAYTRANOGOCCUOICUNG);
			$('#NGAYTRANOLAICUOICUNG').val(oHopDongVayLai.NGAYTRANOLAICUOICUNG);
			$('#PHUONGTHUCTRANOGOC').val(oHopDongVayLai.PHUONGTHUCTRANOGOC);
			$('#PHUONGTHUCTRANOLAI').val(oHopDongVayLai.PHUONGTHUCTRANOLAI);
			$('#TIENLAIPHAT').val(oHopDongVayLai.TIENLAIPHAT);
			$('#SOHIEPDINHVAYNN').val(oHopDongVayLai.SOHIEPDINHVAYNN);
			$('#TIENPHIHIEPDINHVAYNN').val(oHopDongVayLai.TIENPHIHIEPDINHVAYNN);
			$('#TIENPHIQUANLYCHOVAYLAI').val(oHopDongVayLai.TIENPHIQUANLYCHOVAYLAI);
			$('#LOAILAISUAT').val(oHopDongVayLai.LOAILAISUAT);
			$('#GHICHU').val(oHopDongVayLai.GHICHU);
			$('#TINHTHANHID').val(oHopDongVayLai.TINHTHANHID);
			$('#DUANID').val(oHopDongVayLai.DUANID);
			$('#TIENTEID').val(oHopDongVayLai.TIENTEID);
			$('#STATUS').val(oHopDongVayLai.STATUS);
			$('#NOTE').val(oHopDongVayLai.NOTE);
			$('#CREATEDDATE').val(oHopDongVayLai.CREATEDDATE);
			$('#CREATEDBY').val(oHopDongVayLai.CREATEDBY);
			$('#UPDATEDDATE').val(oHopDongVayLai.UPDATEDDATE);
			$('#UPDATEDBY').val(oHopDongVayLai.UPDATEDBY);
		}
	}

	this.clearForm = function () {
		$('#MA').val('');
		$('#TEN').val('');
		$('#NGAYKY').val('');
		$('#COQUANVAYLAI').val('');
		$('#COQUANUYQUYENVAYLAI').val('');
		$('#TIENKYVAY').val('');
		$('#LAISUATVAY').val('');
		$('#NGAYHIEULUC').val('');
		$('#NGAYTRANOGOCDAUTIEN').val('');
		$('#NGAYTRANOLAIDAUTIEN').val('');
		$('#NGAYTRANOGOCCUOICUNG').val('');
		$('#NGAYTRANOLAICUOICUNG').val('');
		$('#TIENLAIPHAT').val('');
		$('#SOHIEPDINHVAYNN').val('');
		$('#TIENPHIHIEPDINHVAYNN').val('');
		$('#STATUS').val('0');
		$('#NOTE').val('');
		$('#CREATEDDATE').val('');
		$('#CREATEDBY').val('');
		$('#UPDATEDDATE').val('');
		$('#UPDATEDBY').val(1);
	}

	

	$(function () {
		// Jquery Dependency
		$("#TEN").on('keyup change',function(){
		})
		$("input[data-type='currency']").on({
			keyup: function () {
				formatCurrency($(this));
			},
			blur: function () {
				formatCurrency($(this), "blur");
			}
		});


		function formatNumber(n) {
			// format number 1000000 to 1,234,567
			return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		}



		function formatCurrency(input, blur) {
			// appends $ to value, validates decimal side
			// and puts cursor back in right position.

			// get input value
			var input_val = input.val();

			// don't validate empty input
			if (input_val === "") { return; }

			// original length
			var original_len = input_val.length;

			// initial caret position 
			var caret_pos = input.prop("selectionStart");

			// check for decimal
			if (input_val.indexOf(".") >= 0) {

				// get position of first decimal
				// this prevents multiple decimals from
				// being entered
				var decimal_pos = input_val.indexOf(".");

				// split number by decimal point
				var left_side = input_val.substring(0, decimal_pos);
				var right_side = input_val.substring(decimal_pos);

				// add commas to left side of number
				left_side = formatNumber(left_side);

				// validate right side
				right_side = formatNumber(right_side);

				// On blur make sure 2 numbers after decimal
				if (blur === "blur") {
					right_side += "00";
				}

				// Limit decimal to only 2 digits
				right_side = right_side.substring(0, 2);

				// join number by .
			

			} else {
				// no decimal entered
				// add commas to number
				// remove all non-digits
				input_val = formatNumber(input_val);
			

				// final formatting
				if (blur === "blur") {
					input_val += ".00";
				}
			}

			// send updated string to input
			input.val(input_val);

			// put caret back in the right position
			var updated_len = input_val.length;
			caret_pos = updated_len - original_len + caret_pos;
			input[0].setSelectionRange(caret_pos, caret_pos);
		}



		var TinhThanhs = new TinhThanh()
		TinhThanhs.getAll();
		$(document).ready(() => {
			var resultTinhthanh = TinhThanhs.LIST
			var option = ''
			resultTinhthanh.map(value => {
				option = option + "<option value='" + value.TINHTHANHID + "'>" + value.TEN + "</option>"
			})
			$('#TINHTHANHID').append(option)
			that.initPage();
		})
		var DuAns = new DuAn()
		DuAns.getAll();
		$(document).ready(() => {
			var resultDuan = DuAns.LIST
			var option = ''
			resultDuan.map(value => {
				option = option + "<option value='" + value.DUANID + "'>" + value.TEN + "</option>"
			})
			$('#DUANID').append(option)
			that.initPage();
		})
		var TienTes = new TienTe()
		TienTes.getAll();
		$(document).ready(() => {
			var resultTiente = TienTes.LIST
			var option = ''
			resultTiente.map(value => {
				option = option + "<option value='" + value.TIENTEID + "'>" + value.TEN + "</option>"
			})
			$('#TIENTEID').append(option)
			that.initPage();
		})
		that.oDialog = new PopupDialog(reload);
		that.initPage();
		function reload() {
			that.initPage();
		}


		$('.ACTIONS').on('click', '#btnSave', function () {
			oHopDongVayLai.HOPDONGVAYLAIID = oHopDongVayLai.HOPDONGVAYLAIID
			if (oHopDongVayLai.HOPDONGVAYLAIID == '') {
				oHopDongVayLai.HOPDONGVAYLAIID = 0;
			}
			oHopDongVayLai.MA = $('#MA').val();
			oHopDongVayLai.TEN = $('#TEN').val();
			oHopDongVayLai.DUANID = $('#DUANID').val();
			oHopDongVayLai.NGAYKY = $('#NGAYKY').val();
			oHopDongVayLai.COQUANVAYLAI = $('#COQUANVAYLAI').val();
			oHopDongVayLai.COQUANUYQUYENVAYLAI = $('#COQUANUYQUYENVAYLAI').val();
			oHopDongVayLai.TIENKYVAY = $('#TIENKYVAY').val();
			oHopDongVayLai.NGAYHIEULUC = $('#NGAYHIEULUC').val();
			oHopDongVayLai.LAISUATVAY = $('#LAISUATVAY').val();
			oHopDongVayLai.LOAILAISUAT = $('#LOAILAISUAT').val();
			oHopDongVayLai.NGAYTRANOGOCDAUTIEN = $('#NGAYTRANOGOCDAUTIEN').val();
			oHopDongVayLai.NGAYTRANOLAIDAUTIEN = $('#NGAYTRANOLAIDAUTIEN').val();
			oHopDongVayLai.NGAYTRANOGOCCUOICUNG = $('#NGAYTRANOGOCCUOICUNG').val();
			oHopDongVayLai.NGAYTRANOLAICUOICUNG = $('#NGAYTRANOLAICUOICUNG').val();
			oHopDongVayLai.PHUONGTHUCTRANOGOC = $('#PHUONGTHUCTRANOGOC').val();
			oHopDongVayLai.PHUONGTHUCTRANOLAI = $('#PHUONGTHUCTRANOLAI').val();
			oHopDongVayLai.TIENLAIPHAT = $('#TIENLAIPHAT').val();
			oHopDongVayLai.SOHIEPDINHVAYNN = $('#SOHIEPDINHVAYNN').val();
			oHopDongVayLai.TIENPHIHIEPDINHVAYNN = $('#TIENPHIHIEPDINHVAYNN').val();
			oHopDongVayLai.TIENPHIQUANLYCHOVAYLAI = $('#TIENPHIQUANLYCHOVAYLAI').val();
			oHopDongVayLai.TIENTEID = $('#TIENTEID').val();
			oHopDongVayLai.TINHTHANHID = $('#TINHTHANHID').val();

			var rs = oHopDongVayLai.save();
			if (!rs.CODE) {
				that.initPage();
			}
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(rs.MESSAGE, '40%', '50px');
		});


	});
}