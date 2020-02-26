var DotRutVonCTView = function () {

	var that = this;
	this.oTable = null;
	this.oDialog = null;
	var oDotRutVon = new DotRutVon();
	var idhd = ''
	var dotrutvonid = 0
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		oDotRutVon.DOTRUTVONID = Util.Url.getParameterByName('id');
		that.bindForm();
	}

	this.bindForm = function () {
		if (!oDotRutVon.DOTRUTVONID || oDotRutVon.DOTRUTVONID == '') {
			that.AppTitle = 'Thêm mới đợt rút vốn';
			oDotRutVon.DOTRUTVONID = 0;
			that.clearForm();
		} else {
			that.AppTitle = 'Cập nhật đợt rút vốn';
			oDotRutVon.getById(oDotRutVon.DOTRUTVONID);
			dotrutvonid = oDotRutVon.DOTRUTVONID
			idhd = oDotRutVon.MASOTHAMCHIEU
			$('#MA').val(oDotRutVon.MA);
			$('#MASOTHAMCHIEU').val(oDotRutVon.MASOTHAMCHIEU);
			isUpdate = oDotRutVon.MASOTHAMCHIEU;
			$('#NHATAITROID').val(oDotRutVon.NHATAITROID);
			$('#TINHTHANHID').val(oDotRutVon.TINHTHANHID);
			$('#NGAYNHANNO').val(oDotRutVon.NGAYNHANNO);
			$('#GIATRIGIAINGANVAYLAI').val(oDotRutVon.GIATRIGIAINGANVAYLAI);
			$('#PHUONGTHUCGIAINGAN').val(oDotRutVon.PHUONGTHUCGIAINGAN);
			$('#GIAINGANTHEOKHNAM').val(oDotRutVon.GIAINGANTHEOKHNAM);
			$('#NGUYENTE').val(oDotRutVon.NGUYENTE);
			$('#TIENTEID').val(oDotRutVon.TIENTEID);
			$('#GHICHU').val(oDotRutVon.GHICHU);
			// $('#STATUS').val(oDotRutVon.STATUS);
			// $('#CREATEDDATE').val(oDotRutVon.CREATEDDATE);
			// $('#CREATEDBY').val(oDotRutVon.CREATEDBY);
			// $('#UPDATEDDATE').val(oDotRutVon.UPDATEDDATE);
			// $('#UPDATEDBY').val(oDotRutVon.UPDATEDBY);

		}
	}

	this.clearForm = function () {
		$('#MA').val('');
		$('#MASOTHAMCHIEU').val('');
		$("#NGAYNHANNO").val($.datepicker.formatDate('dd/mm/yy', new Date()))
		$('#GIATRIGIAINGANVAYLAI').val('');
		$('#LUYKEGIAINGANVAYLAI').val('');
		$('#GHICHU').val('');
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
		var TinhThanhs = new TinhThanh()
		TinhThanhs.getAll();
		var oHopDong = new HopDongVayLai();
		oHopDong.getAll();
		var oDotRutVon = new DotRutVon();
		oDotRutVon.getAll();
		var TienTes = new DonViTienTe()
		TienTes.getAll();
		var NguyenTe = TienTes
		var DuAns = new DuAn()
		var NhaTaiTros = new NhaTaiTro()
		DuAns.getAll();
		var resultTinhthanh = TinhThanhs.LIST
		var option = ''
		resultTinhthanh.map(value => {
			option = option + "<option value='" + value.TINHTHANHID + "'>" + value.TEN + "</option>"
		})
		$('#TINHTHANHID').append(option)
		that.initPage();
		var resultHopDong = oHopDong.LIST
		var option = ''
		resultHopDong.map((value, index) => {
			option = option + "<option " + (value.HOPDONGVAYLAIID === idhd ? 'selected' : '') + " value=" + value.HOPDONGVAYLAIID + ">" + value.TEN + "</option>"
		})

		$("#MASOTHAMCHIEU").append(option)
		let id_j = $("#MASOTHAMCHIEU").val();
		var result_first = oHopDong.getById(id_j);
		if (result_first) {
			$("#SOTIENGIAINGANCAPPHAT").val(result_first[0].TIENKYVAY)
			$("#TENDUAN").val(result_first[0].TENDUAN)
			$("#LUYKEGIAINGANVAYLAI").val(result_first[0].LUYKE)
			// $("#GIATRIGIAINGANVAYLAI").val(parseFloat(result_first[0].TIENKYVAY) - parseFloat(result_first[0].LUYKE))
			$("#GIAINGANTHEOKHNAM").val($.datepicker.formatDate('yy', new Date()))
			$("#NGUYENTEGN").text(result_first[0].TENTIENTE)
			$("#NGUYENTEGN").val(result_first[0].TIENTEID)
			$("#NGUYENTE").text(result_first[0].TENTIENTE)
			$("#NGUYENTE").val(result_first[0].TIENTEID)
			$("#NGUYENTELK").text(result_first[0].TENTIENTE)
			$("#NGUYENTELK").val(result_first[0].TIENTEID)

			// if (parseFloat(result_first[0].TIENKYVAY) - parseFloat(result_first[0].LUYKE) <= 0)
			// 	$("#GIATRIGIAINGANVAYLAI").prop('disabled', true)
			if (oDotRutVon.DOTRUTVONID) {
				$('#MA').val('ĐRV-' + '-' + result_first[0].MA + '-' + $.datepicker.formatDate('yymmdd', new Date()));
			}


		}
		$("#MASOTHAMCHIEU").change(() => {
			let id = $("#MASOTHAMCHIEU").val();
			var result = oHopDong.getById(id);
			if (result) {
				$("#SOTIENGIAINGANCAPPHAT").val(result[0].TIENKYVAY)
			}
			$("#TENDUAN").val(result[0].TENDUAN)
			$("#LUYKEGIAINGANVAYLAI").val(result[0].LUYKE)
			// $("#GIATRIGIAINGANVAYLAI").val(parseFloat(result[0].TIENKYVAY) - parseFloat(result[0].LUYKE))

			$("#NGUYENTEGN").text(result[0].TENTIENTE)
			$("#NGUYENTEGN").val(result[0].TIENTEID)
			$("#NGUYENTE").text(result[0].TENTIENTE)
			$("#NGUYENTE").val(result[0].TIENTEID)
			$("#NGUYENTELK").text(result[0].TENTIENTE)
			$("#NGUYENTELK").val(result[0].TIENTEID)

			var p1 = $("#NGUYENTEVL").val()
			var p2 = $("#NGUYENTE").val()
			var tile = TienTes.chuyendoitien(p1, p2)
			var tien = $("#GIATRIGIAINGANVAYLAI").val()
			var outt = tien * tile.toFixed(2)
			$("#GIATRINGUYENTE").val(outt)
			var inp = $("#SOTIENGIAINGANCAPPHAT").val() - $("#LUYKEGIAINGANVAYLAI").val()
			var dv = $("#NGUYENTE").text()
			if (outt > inp) {
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show('Số tiền vượt quá mức vay: ' + inp, '40%', '50px');
				$("#GIATRIGIAINGANVAYLAI").val('')
			}
			// if (parseFloat(result[0].TIENKYVAY) - parseFloat(result[0].LUYKE) <= 0) {
			// 	$("#GIATRIGIAINGANVAYLAI").prop('disabled', true)
			// }
			// else
			// 	$("#GIATRIGIAINGANVAYLAI").prop('disabled', false)
		})
		var resultDotRutVon = oDotRutVon.LIST
		$("#GIATRIGIAINGANVAYLAI").on('keyup change', function () {
			let id = $("#GIATRIGIAINGANVAYLAI").val();
			let convertid = parseInt(id)
		})
		var resultTienTe = TienTes.LIST
		var option = ''
		resultTienTe.map(value => {
			option = option + "<option value='" + value.TIENTEID + "'>" + value.TEN + "</option>"
		})
		$('#NGUYENTEVL').append(option)


		NhaTaiTros.getAll();
		var resultNhaTaiTro = NhaTaiTros.LIST
		var option = ''
		resultNhaTaiTro.map(value => {
			option = option + "<option value='" + value.NHATAITROID + "'>" + value.TEN + "</option>"
		})
		$('#NHATAITROID').append(option)

		$("#GIATRIGIAINGANVAYLAI").on('change keyup', () => {
			var p1 = $("#NGUYENTEVL").val()
			var p2 = $("#NGUYENTE").val()
			var tile = TienTes.chuyendoitien(p1, p2)
			var tien = $("#GIATRIGIAINGANVAYLAI").val()
			var outt = tien * tile.toFixed(2)
			$("#GIATRINGUYENTE").val(outt)
			var inp = $("#SOTIENGIAINGANCAPPHAT").val() - $("#LUYKEGIAINGANVAYLAI").val()
			var dv = $("#NGUYENTE").text()
			if (outt > inp) {
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show('Số tiền vượt quá mức vay: ' + inp, '40%', '50px');
				$("#GIATRIGIAINGANVAYLAI").val('')
			}
		})

		$("#NGUYENTEVL").on('change', () => {
			var p1 = $("#NGUYENTEVL").val()
			var p2 = $("#NGUYENTE").val()
			var tile = TienTes.chuyendoitien(p1, p2)
			var tien = $("#GIATRIGIAINGANVAYLAI").val()
			var outt = tien * tile.toFixed(2)
			$("#GIATRINGUYENTE").val(outt)
			var inp = $("#SOTIENGIAINGANCAPPHAT").val() - $("#LUYKEGIAINGANVAYLAI").val()
			var dv = $("#NGUYENTE").text()
			if (outt > inp) {
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show('Số tiền vượt quá mức vay: ' + inp, '40%', '50px');
				$("#GIATRIGIAINGANVAYLAI").val('')
			}
		})

		$('.ACTIONS').on('click', '#btnLuu', function () {
			oDotRutVon.DOTRUTVONID = oDotRutVon.DOTRUTVONID
			if (dotrutvonid == '') {
				oDotRutVon.DOTRUTVONID = 0;
			}
			else
				oDotRutVon.DOTRUTVONID = 1
			oDotRutVon.MA = $('#MA').val();
			oDotRutVon.MASOTHAMCHIEU = parseInt($('#MASOTHAMCHIEU').val());
			// oDotRutVon.TENDUAN = $('#TENDUAN').val();
			oDotRutVon.NHATAITROID = parseInt($('#NHATAITROID').val());
			oDotRutVon.TINHTHANHID = $('#TINHTHANHID').val();
			oDotRutVon.NGAYNHANNO = $('#NGAYNHANNO').val();
			oDotRutVon.GIATRIGIAINGANVAYLAI = $('#GIATRIGIAINGANVAYLAI').val();
			// oDotRutVon.SOTIENGIAINGANCAPPHAT = $('#SOTIENGIAINGANCAPPHAT').val();
			oDotRutVon.LUYKEGIAINGANVAYLAI = $('#LUYKEGIAINGANVAYLAI').val();
			oDotRutVon.PHUONGTHUCGIAINGAN = $('#PHUONGTHUCGIAINGAN').val();
			oDotRutVon.GIAINGANTHEOKHNAM = $('#GIAINGANTHEOKHNAM').val();
			oDotRutVon.NGUYENTE = $('#GIATRINGUYENTE').val();
			oDotRutVon.TIENTEID = '';
			oDotRutVon.GHICHU = $('#GHICHU').val();

			var rs = oDotRutVon.save();
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(rs.MESSAGE, '40%', '50px');
		});
	});
}