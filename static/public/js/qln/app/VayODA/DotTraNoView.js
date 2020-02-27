var DotTraNoView = function () {
	var idDotTraNo = 0;
	var that = this;
	this.AppTitle = 'Đợt trả nợ';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oDotTraNo = new DotTraNo();
	var Validate = new validate();
	var KeHoach = new KeHoachVayHangNam();
	var oDuAn = new DuAn()
	var oHopDongVayLai = new HopDongVayLai()
	var DuNo = 0;
	this.filterAction = function (sState) {
		switch (sState) {
			case 'NEW':
				ControlHelper.Input.disable(['#btnEdit', '#btnSave', '#btnDelete', '#btnCancel']);
				ControlHelper.Input.enable(['#btnAddNew']);
				break;
			case 'SELECT':
				ControlHelper.Input.enable(['#btnEdit', '#btnCancel', '#btnDelete']);
				break;
			case 'EDIT':
				ControlHelper.Input.disable(['#btnEdit']);
				ControlHelper.Input.enable(['#btnSave', '#btnCancel', '#btnDelete']);
				break;
			default:
				break;
		}
	}
	function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
		if (amount == null) {
			return ""
		}
		try {
			decimalCount = Math.abs(decimalCount);
			decimalCount = isNaN(decimalCount) ? 0 : decimalCount;
			const negativeSign = amount < 0 ? "-" : "";
			let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
			let j = (i.length > 3) ? i.length % 3 : 0;
			return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
		} catch (e) {
		}
	};
	function nvl(p_giatrikiemtra, p_giatrimacdinh) {
		if (isNaN(p_giatrikiemtra)) return p_giatrimacdinh;
		return p_giatrikiemtra;
	}
	this.bindGrid01 = function () {
		oDotTraNo.getAll();
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < oDotTraNo.LIST.length; i++) {
			var _item = oDotTraNo.LIST[i];
			_item.sotientragoc = formatMoney(_item.SOTIENTRAGOC);
			_item.sotientralai = formatMoney(_item.SOTIENTRALAI);
			_item.sotientraphi = formatMoney(_item.SOTIENTRAPHI);
			_item.sotienphat = formatMoney(_item.SOTIENPHAT);
			_item.duno = formatMoney(_item.DUNO);
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.DOTTRANOID + '" />';
			var download = ''
			if (_item.URL) {
				download = '<button  val="' + _item.URL + '" class= "btn btn-primary btnTaixuong" >Tải xuống</button>'
			}
			else {
				download = ''
			}
			aRows.push([
				(i + 1) + _hidden,
				_item.TENHOPDONG,
				_item.SOLENHCHI,
				_item.KYTRA,
				_item.NGAYTRA,
				_item.sotientragoc,
				_item.sotientralai,
				_item.sotientraphi,
				_item.sotienphat,
				download
			]);
		}
		that.oTable.rows.add(aRows).draw();
	}

	this.init = function () {
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
		that.bindGrid01();
	}
	$("#DUANID").change(function (e) {
		e.preventDefault()
		$("#textSotienvay").text('')
		$("#txtThongTinDuAnHopDong").text('')
		$("#MA").val('')
		$("#SOLENHCHI").val('')
		$("#KYTRA").val('')
		$("#TIENKYVAY").val('')
		$("#LUYKETRANOGOC").val('')
		$("#DUNO").val('')
		$("#SOTIENTRAGOC").val('')
		$("#SOTIENTRALAI").val('')
		$("#SOTIENTRAPHI").val('')
		$("#SOTIENPHAT").val('')
		$("#PHIQUANLICHOVAYLAI").val('')
		$("#TONGSOTIENPHAITRA").val('')
		var duanid = $(this).val()
		var option_hopdong = ''
		var list_hopdongvaylai = oHopDongVayLai.getByDuanId(duanid)
		if (list_hopdongvaylai.length > 0) {
			list_hopdongvaylai.map(function (_item_hopdong) {
				option_hopdong = option_hopdong + '<option data-laisuatvay="' + _item_hopdong.LAISUATVAY + '" value="' + _item_hopdong.HOPDONGVAYLAIID + '">  ' + _item_hopdong.TEN + ' </option>'
			})
			$('#HOPDONGVAYLAIID').html(option_hopdong).trigger('change')

		} else {
			$('#HOPDONGVAYLAIID').html('<option value="0"></option>')
			$('#HOPDONGVAYLAIID').val($('#HOPDONGVAYLAIID option:selected').attr('value')).select2()
			$('#HOPDONGVAYLAIID').trigger('change')
		}
	})
	$('#HOPDONGVAYLAIID').change(function (e) {
		e.preventDefault()
		if ($('#HOPDONGVAYLAIID').text()) {
			oHopDongVayLai.getAll();
			var HopDongDetail = oHopDongVayLai.LIST;
			HopDongDetail.map(value => {
				if (Number(value.HOPDONGVAYLAIID) == Number($("#HOPDONGVAYLAIID option:selected").attr('value'))) {
					var phiQuanLy = Number(value.TIENPHIQUANLYCHOVAYLAI) / 100 * Number(value.TIENKYVAY)
					$("#SOTIENTRAPHI").val(formatMoney(phiQuanLy))
				}
			})
			var hdvselected = oHopDongVayLai.getById($(this).val())[0]
			$('#NGAYTRA').val(hdvselected.NGAYTRANOTIEPTHEO)
			if (Number(hdvselected.TIENKYVAY) === Number(hdvselected.LUYKETRAGOC)) {
				return
			} else {
				var goclais = oHopDongVayLai.getAllGocLaiDotTraNo($(this).val())[0]
				if (goclais) {
					$('label').each(function (index, element) {
						if ($(element).attr('id')) {
							if ($(element).attr('id').includes('TIENTE') && $(element).attr('id') !== 'SOTIENTRALAITIENTE' && $(element).attr('id') !== 'txtThongTinDuAnHopDong') {

								$(element).html(hdvselected.TENTIENTE)
							} else {
								$(element).html(hdvselected.TENTIENTE)
							}
						}
					})
					if (Number(goclais.TIENKYVAY) === Number(goclais.TONGSOTIENGIAINGANVAYLAI)) {
						$('#textSotienvay').html('Tổng số  tiền vay lại: ' + formatMoney(goclais.TIENKYVAY) + '( Đã rút hết số tiền trong hợp đồng )')
						$('#SOTIENTRAGOC').val(formatMoney(goclais.TIENKYVAY))

					} else {
						$('#textSotienvay').html('Tổng số  tiền vay lại: ' + formatMoney(goclais.TONGSOTIENGIAINGANVAYLAI) + '/' + formatMoney(goclais.TIENKYVAY) + '( Chưa rút hết hợp đồng )')
					}
					// $('#SOTIENTRALAI').val(formatMoney(goclais.SOTIENLAIDAQUYDOI))
					$('#LUYKETRANOGOC').val(formatMoney(goclais.LUYKETRAGOC))
					DuNo = Number(goclais.TONGSOTIENGIAINGANVAYLAI) - Number(goclais.LUYKETRAGOC)
					$('#TONGSOTIENPHAITRA').val(formatMoney(Number($('#SOTIENTRALAI').val().replaceAll(',', '')) + Number($('#SOTIENTRAGOC').val().replaceAll(',', ''))))
					// $('#PHIQUANLICHOVAYLAI').val(formatMoney(goclais.TONGTIEPPHI))
					$('#DUNO').val(formatMoney(Number(goclais.TONGSOTIENGIAINGANVAYLAI) - Number(goclais.LUYKETRAGOC)))
					$('#LUYKETRANOGOC').val(formatMoney(Number(goclais.LUYKETRAGOC)))
					$('#TIENKYVAY').val(formatMoney(Number(goclais.TONGSOTIENGIAINGANVAYLAI)))
					$('#SOTIENTRAGOC').val(formatMoney(Number(goclais.TONGSOTIENGIAINGANVAYLAI)))
					$("#SOTIENTRAGOC").trigger('keyup')
					if (goclais.PHUONGTHUCTRANOLAI == 1) {
						var laiSuatVay = Number($("#HOPDONGVAYLAIID option:selected").attr('data-laisuatvay') / 100);
						if (DuNo > 0) {
							tienTraLai = Number(laiSuatVay * DuNo * 6)
							$("#SOTIENTRALAI").val(formatMoney(tienTraLai))
						}
						$('#KYTRA').val('6 tháng')
					} else {
						var laiSuatVay = Number($("#HOPDONGVAYLAIID option:selected").attr('data-laisuatvay') / 100);
						if (DuNo > 0) {
							tienTraLai = Number(laiSuatVay * DuNo * 12)
							$("#SOTIENTRALAI").val(formatMoney(tienTraLai))
						}
						$('#KYTRA').val('1 năm')
					}
				} else {
					// $('#textSotienvay').val(0)
					// $('#SOTIENTRALAI').val(0)
					// $('#LUYKETRANOGOC').val(0)
					// $('#TONGSOTIENPHAITRA').val('')
					// $('#PHIQUANLICHOVAYLAI').val(0)
					// $('#DUNO').val(0)
					// $('#LUYKETRANOGOC').val(0)
					// $('#TIENKYVAY').val(0)
				}
			}
		} else {
			// console.log('không có hợp đồng vay lại')
			// $('#textSotienvay').text('')
			// $('#txtThongTinDuAnHopDong').text('')
			// $('#SOTIENTRALAI').val('')
			// $('#LUYKETRANOGOC').val('')
			// $('#TONGSOTIENPHAITRA').val('')
			// $('#PHIQUANLICHOVAYLAI').val('')
			// $('#DUNO').val('')
			// $('#LUYKETRANOGOC').val('')
			// $('#TIENKYVAY').val('')
		}
		// $("#SOTIENTRAGOC").trigger('keyup')
	})
	this.bindModal = function () {
		String.prototype.replaceAll = function (search, replacement) {
			var target = this;
			return target.replace(new RegExp(search, 'g'), replacement);
		};
		oDuAn.getAll();
		var option2 = ''
		oDuAn.LIST.map((value, index) => {
			if (value.COCHETAICHINH == "CP") {
				return;
			} else { 
				if (Number(value.TONGDOTRUTVON) > 0) {
					option2 = option2 + "<option value=" + value.DUANID + ">" + value.TEN + "</option>"
				}
			}
		})
		$("#DUANID").html(option2).val($("#DUANID option:selected").val()).trigger('change');
		$("#KEHOACHVAYHANGNAMID").trigger('change');
		$("#DONVIID").html(fnc_danhsachdonvi())
		$("#SOTIENTRAGOC").trigger('keyup')
		if (idDotTraNo > 0) {
			oDotTraNo.getById(idDotTraNo);
			$('#KEHOACHVAYHANGNAMID').val(oDotTraNo.KEHOACHVAYHANGNAMID);
			$('#DUANID').val(oDotTraNo.DUANID).trigger('change').select2({
				dropdownParent: $("#exampleModalCenter")
			});
			$('#HOPDONGVAYLAIID').val(oDotTraNo.HOPDONGVAYLAIID).select2({
				dropdownParent: $("#exampleModalCenter")
			});
			$('#NGAYTRA').val(oDotTraNo.NGAYTRA);
			$('#KYTRA').val(oDotTraNo.KYTRA);
			$('#TIENKYVAY').val(formatMoney(oDotTraNo.TIENKYVAY));
			$('#DUNO').val(formatMoney(oDotTraNo.DUNO));
			$('#SOTIENTRAGOC').val(formatMoney(oDotTraNo.SOTIENTRAGOC));
			$('#SOTIENTRALAI').val(formatMoney(oDotTraNo.SOTIENTRALAI));
			$('#SOTIENTRAPHI').val(formatMoney(oDotTraNo.SOTIENTRAPHI));
			$('#SOTIENPHAT').val(formatMoney(oDotTraNo.SOTIENPHAT));
			$('#LUYKETRANOGOC').val(formatMoney(oDotTraNo.LUYKETRANOGOC));
			$('#SOLENHCHI').val(oDotTraNo.SOLENHCHI);
			$('#DONVIID').val(oDotTraNo.DONVIID).select2();
			$('#DOTRUTVONID').val(oDotTraNo.DOTRUTVONID);
			$('#PHIQUANLICHOVAYLAI').val(formatMoney(oDotTraNo.PHIQUALICHOVAYLAI));
			$('#PHITHEOHOPDONGVAY').val(formatMoney(oDotTraNo.PHITHEOHOPDONGVAY));
			$('#MA').val(oDotTraNo.MA);
		}
		let txtLoaiTienTe = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-loaitiente')
		$("#TIENKYVAYTIENTE").text(txtLoaiTienTe)
		$("#DUNOTIENTE").text(txtLoaiTienTe)
		$("#SOTIENTRAGOCTIENTE").text(txtLoaiTienTe)
		$("#SOTIENTRALAITIENTE").text(txtLoaiTienTe)
		$("#SOTIENTRAPHITIENTE").text(txtLoaiTienTe)
		$("#SOTIENTRAPHITIENTE").text(txtLoaiTienTe)
		$("#SOTIENPHATTIENTE").text(txtLoaiTienTe)
		$("#LUYKETRANOGOCTIENTE").text(txtLoaiTienTe)
		$("#TONGSOTIENPHAITRATIENTE").text(txtLoaiTienTe)
	}
	$(document).ready(function () {
		that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
		that.oDialog = new PopupDialog(reload);

		setTimeout(() => {
			that.init();
		}, 100);
		function reload() {
			that.filterAction('NEW');
			that.bindGrid01();
		}

		$('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault();
			$("#Grid01").find('.selected').removeClass('selected');
			$("#exampleModalLongTitle").text('Thêm mới đợt trả nợ');
			$('#list_uploadfile').html('');
			$('#MA').val('');
			$("#NGAYTRA").val($.datepicker.formatDate('dd/mm/yy', new Date()));
			$("#KYTRA").val('');
			$('#SOLENHCHI').val('');
			idDotTraNo = 0;
			that.bindModal();
			$("#KEHOACHVAYHANGNAMID").prop('disabled', false);
			$("#DONVIID").val($("#DONVIID option:selected").attr('value')).select2();
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.bindModal();
			$("#exampleModalLongTitle").text('Sửa đợt trả nợ')
			$("#KEHOACHVAYHANGNAMID").prop('disabled', true)
			$(".btnSave").prop('disabled', false)
			$("#SOTIENTRAGOC").trigger('keyup')
		});
		$('.ACTIONS').on('click', '#btnDelete', function (e) {
			e.preventDefault()
			if (!oDotTraNo.DOTTRANOID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn Đợt trả nợ để xóa', '40%', '50px');
				return false;
			}
			function ok() {
				var rs = oDotTraNo.del(oDotTraNo.DOTTRANOID);
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show(rs.MESSAGE, '40%', '50px');
				that.bindGrid01();
				reload();
			}
			function cancel() { }

			var oConfirmDialog = new ConfirmDialog('Xác nhận xóa', ok, cancel);
			oConfirmDialog.show('Bạn có chắc chắn muốn xóa bản ghi này không?', '40%', '50px');
		});

		$('body').on('keyup', '#SOTIENTRAGOC', function () {
			var soTienTraGoc = $("#SOTIENTRAGOC").val().replaceAll(',', '')
			var soTienTraLai = $("#SOTIENTRALAI").val().replaceAll(',', '')
			var soTienTraPhi = $("#SOTIENTRAPHI").val().replaceAll(',', '')
			var soTienPhat = $("#SOTIENPHAT").val().replaceAll(',', '')
			if (soTienTraGoc == "" && soTienTraLai == "" && soTienTraPhi == "" && soTienPhat == "") {
				$("#TONGSOTIENPHAITRA").val('')
			}
			else {
				sum = Number(soTienTraGoc) + Number(soTienTraLai) + Number(soTienTraPhi) + Number(soTienPhat)
				$("#TONGSOTIENPHAITRA").val(formatMoney(sum))
			}
			if (DuNo > 0) {
				$("#DUNO").val(formatMoney(Number(DuNo - soTienTraGoc)))
				var laiSuatVay = Number($("#HOPDONGVAYLAIID option:selected").attr('data-laisuatvay') / 100)
				var number = $("#KYTRA").val().match(/\d/g);
				if (number) {
					number = number.join("");
				}
				if (Number(number) == 6) {
					if (Number($("#DUNO").val().replaceAll(',', '')) == 0) {
						$("#SOTIENTRALAI").val(formatMoney(Number(laiSuatVay * Number(soTienTraGoc) * 6)))
					}
					else {
						$("#SOTIENTRALAI").val(formatMoney(Number(laiSuatVay * Number(DuNo - soTienTraGoc) * 6)))
					}
				}
				else {
					if (Number($("#DUNO").val().replaceAll(',', '')) == 0) {
						$("#SOTIENTRALAI").val(formatMoney(Number(laiSuatVay * Number(soTienTraGoc) * 12)))
					}
					else {
						$("#SOTIENTRALAI").val(formatMoney(Number(laiSuatVay * Number(DuNo - soTienTraGoc) * 12)))
					}
				}

			}
			else {
				// $("#SOTIENTRALAI").val(formatMoney(Number(laiSuatVay * soTienTraGoc * 6)))
			}
		})

		$('#DOTRUTVONID').change(function (e) {
			DotRutVon_selected = [{}]
			if (that.DotRutVon) {
				var DotRutVon_selected = that.DotRutVon.filter(function (item) {
					return (Number($('#DOTRUTVONID').val()) === Number(item.DOTRUTVONID))
				})
			}
			that.DotRutVon_selected = DotRutVon_selected
			let txtTenDuAnHopDong = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-duanhopdong')
			let txtKyTra = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-kytra')
			let txtSoTienVay = DotRutVon_selected[0] ? DotRutVon_selected[0].NGUYENTEVAYLAI : 0
			let txtLaiSuatVay = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-laisuatvay')
			let txtSoTienTraPhi = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-sotientraphi')
			let txtLaiPhat = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-laiphat')
			let txtSoLanTraNo = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-solantrano')
			let txtLuyKeTraNo = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-luyketrano')
			let txtLoaiLaiSuat = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-loailaisuat')
			let txtLoaiTienTe = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-loaitiente')
			$("#TIENKYVAYTIENTE").text(txtLoaiTienTe)
			$("#DUNOTIENTE").text(txtLoaiTienTe)
			$("#SOTIENTRAGOCTIENTE").text(txtLoaiTienTe)
			$("#SOTIENTRALAITIENTE").text(txtLoaiTienTe)
			$("#SOTIENTRAPHITIENTE").text(txtLoaiTienTe)
			$("#SOTIENTRAPHITIENTE").text(txtLoaiTienTe)
			$("#SOTIENPHATTIENTE").text(txtLoaiTienTe)
			$("#LUYKETRANOGOCTIENTE").text(txtLoaiTienTe)
			$("#TONGSOTIENPHAITRATIENTE").text(txtLoaiTienTe)
			$("#LUYKETRANOGOC").val(formatMoney(txtLuyKeTraNo))
			oDotTraNo.getAll()
			let idKeHoachChange = $("#KEHOACHVAYHANGNAMID option:selected").attr('value')
			for (var i = 0; i < oDotTraNo.LIST.length; i++) {
				var _item = oDotTraNo.LIST[i];
			}
			$("#DUNO").val()
			$("#exampleModalLongTitle").text('Thêm mới đợt trả nợ (Lần thứ ' + txtSoLanTraNo + ')')
			if (parseInt(txtKyTra) === 1) {
				$("#KYTRA").val('6 tháng')
			}
			else {
				$("#KYTRA").val('1 năm')
			}
			$("#txtThongTinDuAnHopDong").text(txtTenDuAnHopDong);
			if (txtSoTienVay > 0) {
				if (parseInt(txtKyTra) === 1) {
					var soTienTraLai = (parseFloat(txtSoTienVay) * parseFloat(txtLaiSuatVay) / 100) * 6
					var soTienTraPhi = (parseFloat(txtSoTienVay) * parseFloat(txtSoTienTraPhi) / 100) * 6
					var laiPhat = (parseFloat(txtSoTienVay) * parseFloat(txtLaiPhat) / 100) * 6
					var txtSoTienVayNua = parseFloat(txtSoTienVay) / 2
					var duNoVay = parseInt(nvl(txtSoTienVay, 0)) - parseInt(nvl(txtLuyKeTraNo, 0))
					sum = parseInt(duNoVay) + parseInt(soTienTraLai) + parseInt(soTienTraPhi) + parseInt(laiPhat)
					// $("#SOTIENTRALAI").val(formatMoney(soTienTraLai));
					$("#SOTIENTRAPHI").val(formatMoney(soTienTraPhi));
					$("#SOTIENPHAT").val(formatMoney(laiPhat));
					$("#SOTIENTRAGOC").val(formatMoney(duNoVay));
					$("#TONGSOTIENPHAITRA").val(formatMoney(sum))
					$("#MA").val('');
					$("#TIENKYVAY").css("text-align", "right")
					$("#TIENKYVAY").val(formatMoney(txtSoTienVay));
					$("#DUNO").val(formatMoney(duNoVay))
				}
				else {
					var soTienTraLai = (parseFloat(txtSoTienVay) * parseFloat(txtLaiSuatVay) / 100) * 12
					var soTienTraPhi = (parseFloat(txtSoTienVay) * parseFloat(txtSoTienTraPhi) / 100) * 12
					var laiPhat = (parseFloat(txtSoTienVay) * parseFloat(txtLaiPhat) / 100) * 12
					var duNoVay = parseInt(nvl(txtSoTienVay, 0)) - parseInt(nvl(txtLuyKeTraNo, 0))
					sum = parseInt(txtSoTienVay) + parseInt(soTienTraLai) + parseInt(soTienTraPhi) + parseInt(laiPhat)
					// $("#SOTIENTRALAI").val(formatMoney(soTienTraLai));
					$("#SOTIENTRAPHI").val(formatMoney(soTienTraPhi));
					$("#SOTIENPHAT").val(formatMoney(laiPhat));
					$("#SOTIENTRAGOC").val(formatMoney(duNoVay));
					$("#TONGSOTIENPHAITRA").val(formatMoney(sum))
					$("#MA").val('');
					$("#TIENKYVAY").css("text-align", "right")
					$("#TIENKYVAY").val(formatMoney(txtSoTienVay));
					$("#DUNO").val(formatMoney(duNoVay))
				}
				if (parseInt(txtLoaiLaiSuat) === 1) {
					$("#SOTIENTRALAI").prop("disabled", true);
				}
				else {
					$("#SOTIENTRALAI").prop("disabled", false);
					$('body').on('keyup', '#SOTIENTRALAI', function () {
						var soTienTraGoc = $("#SOTIENTRAGOC").val().replaceAll(',', '')
						var soTienTraLai = $("#SOTIENTRALAI").val().replaceAll(',', '')
						var soTienTraPhi = $("#SOTIENTRAPHI").val().replaceAll(',', '')
						var soTienPhat = $("#SOTIENPHAT").val().replaceAll(',', '')
						sum = parseInt(soTienTraGoc) + parseInt(soTienTraLai) + parseInt(soTienTraPhi) + parseInt(soTienPhat)
						$("#TONGSOTIENPHAITRA").val(formatMoney(sum))
					})
				}
				if (duNoVay == 0) {
					$("#MA").val('Kế hoạch này đã trả nợ đủ')
					$(".btnSave").prop('disabled', true)
					$("#TIENKYVAY").val('')
					$("#SOTIENTRAGOC").val('')
					$("#DUNO").val('')
					$("#SOTIENTRAPHI").val('')
					$("#SOTIENTRALAI").val('')
					$("#SOTIENPHAT").val('')
					$("#LUYKETRANOGOC").val('')
					$("#TONGSOTIENPHAITRA").val('')
				}
				else {
					$(".btnSave").prop('disabled', false)
				}
				// $(".btnSave").prop('disabled', false)
			}
			else {
				$("#MA").val('Kế hoạch này chưa rút vốn')
				$(".btnSave").prop('disabled', true)
				$("#TIENKYVAY").val('')
				$("#SOTIENTRAGOC").val('')
				$("#DUNO").val('')
				$("#SOTIENTRAPHI").val('')
				$("#SOTIENTRALAI").val('')
				$("#SOTIENPHAT").val('')
				$("#LUYKETRANOGOC").val('')
				$("#TONGSOTIENPHAITRA").val('')
			}
			$("#SOTIENTRAGOC").trigger('keyup')
		})
		$('body').on('keyup', '#SOTIENTRALAI', function () {
			$("#SOTIENTRAGOC").trigger('keyup')
			// let txtSoTienVay = that.DotRutVon_selected[0] ? that.DotRutVon_selected[0].NGUYENTEVAYLAI : 0
			// let txtLaiSuatVay = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-laisuatvay')
			// let txtSoTienTraPhi = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-sotientraphi')
			// let txtLaiPhat = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-laiphat')
			// let txtLuyKeTraNo = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-luyketrano')
			// var soTienTraLai = parseFloat(txtLaiSuatVay) * parseFloat(txtSoTienVay)
			// var soTienTraPhi = parseFloat(txtSoTienTraPhi) * parseFloat(txtSoTienVay)
			// var laiPhat = parseFloat(txtLaiPhat) * parseFloat(txtSoTienVay)
			// if (txtLuyKeTraNo === 'null') {
			// 	sum = parseInt(txtSoTienVay) + parseInt(soTienTraLai) + parseInt(soTienTraPhi) + parseInt(laiPhat)
			// 	var valueSOTIENTRAGOC = $("#SOTIENTRAGOC").val().replaceAll(',', '')
			// 	var valueSOTIENTRALAI = $("#SOTIENTRALAI").val().replaceAll(',', '')
			// 	var valueSOTIENTRAPHI = $("#SOTIENTRAPHI").val().replaceAll(',', '')
			// 	var valueSOTIENPHAT = $("#SOTIENPHAT").val().replaceAll(',', '')
			// 	var sumNow = parseInt(valueSOTIENTRAGOC) + parseInt(valueSOTIENTRALAI) + parseInt(valueSOTIENTRAPHI) + parseInt(valueSOTIENPHAT)
			// 	var keyupSoTienTraLai = sum - sumNow
			// 	$("#LUYKETRANOGOC").val(formatMoney(keyupSoTienTraLai))
			// }
			// else {
			// 	sum = parseInt(txtSoTienVay) + parseInt(soTienTraLai) + parseInt(soTienTraPhi) + parseInt(laiPhat) + parseInt(txtLuyKeTraNo)
			// 	var valueSOTIENTRAGOC = $("#SOTIENTRAGOC").val().replaceAll(',', '')
			// 	var valueSOTIENTRALAI = $("#SOTIENTRALAI").val().replaceAll(',', '')
			// 	var valueSOTIENTRAPHI = $("#SOTIENTRAPHI").val().replaceAll(',', '')
			// 	var valueSOTIENPHAT = $("#SOTIENPHAT").val().replaceAll(',', '')
			// 	var sumNow = parseInt(valueSOTIENTRAGOC) + parseInt(valueSOTIENTRALAI) + parseInt(valueSOTIENTRAPHI) + parseInt(valueSOTIENPHAT) + parseInt(txtLuyKeTraNo)
			// 	var keyupSoTienTraLai = sum - sumNow
			// 	$("#LUYKETRANOGOC").val(formatMoney(keyupSoTienTraLai))
			// }
		})
		$('body').on('keyup', '#SOTIENTRAPHI', function () {
			let txtSoTienVay = that.DotRutVon_selected[0] ? that.DotRutVon_selected[0].NGUYENTEVAYLAI : 0
			let txtLaiSuatVay = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-laisuatvay')
			let txtSoTienTraPhi = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-sotientraphi')
			let txtLaiPhat = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-laiphat')
			let txtLuyKeTraNo = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-luyketrano')
			var soTienTraLai = parseFloat(txtLaiSuatVay) * parseFloat(txtSoTienVay)
			var soTienTraPhi = parseFloat(txtSoTienTraPhi) * parseFloat(txtSoTienVay)
			var laiPhat = parseFloat(txtLaiPhat) * parseFloat(txtSoTienVay)
			if (txtLuyKeTraNo === 'null') {
				sum = parseInt(txtSoTienVay) + parseInt(soTienTraLai) + parseInt(soTienTraPhi) + parseInt(laiPhat)
				var valueSOTIENTRAGOC = $("#SOTIENTRAGOC").val().replaceAll(',', '')
				var valueSOTIENTRALAI = $("#SOTIENTRALAI").val().replaceAll(',', '')
				var valueSOTIENTRAPHI = $("#SOTIENTRAPHI").val().replaceAll(',', '')
				var valueSOTIENPHAT = $("#SOTIENPHAT").val().replaceAll(',', '')
				var sumNow = parseInt(valueSOTIENTRAGOC) + parseInt(valueSOTIENTRALAI) + parseInt(valueSOTIENTRAPHI) + parseInt(valueSOTIENPHAT)
				var keyupSoTienTraPhi = sum - sumNow
				$("#LUYKETRANOGOC").val(formatMoney(keyupSoTienTraPhi))
			}
			else {
				sum = parseInt(txtSoTienVay) + parseInt(soTienTraLai) + parseInt(soTienTraPhi) + parseInt(laiPhat) + parseInt(txtLuyKeTraNo)
				var valueSOTIENTRAGOC = $("#SOTIENTRAGOC").val().replaceAll(',', '')
				var valueSOTIENTRALAI = $("#SOTIENTRALAI").val().replaceAll(',', '')
				var valueSOTIENTRAPHI = $("#SOTIENTRAPHI").val().replaceAll(',', '')
				var valueSOTIENPHAT = $("#SOTIENPHAT").val().replaceAll(',', '')
				var sumNow = parseInt(valueSOTIENTRAGOC) + parseInt(valueSOTIENTRALAI) + parseInt(valueSOTIENTRAPHI) + parseInt(valueSOTIENPHAT) + parseInt(txtLuyKeTraNo)
				var keyupSoTienTraPhi = sum - sumNow
				$("#LUYKETRANOGOC").val(formatMoney(keyupSoTienTraPhi))
			}
		})
		$('body').on('keyup', '#SOTIENPHAT', function () {
			let txtSoTienVay = that.DotRutVon_selected[0] ? that.DotRutVon_selected[0].NGUYENTEVAYLAI : 0
			let txtLaiSuatVay = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-laisuatvay')
			let txtSoTienTraPhi = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-sotientraphi')
			let txtLaiPhat = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-laiphat')
			let txtLuyKeTraNo = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-luyketrano')
			var soTienTraLai = parseFloat(txtLaiSuatVay) * parseFloat(txtSoTienVay)
			var soTienTraPhi = parseFloat(txtSoTienTraPhi) * parseFloat(txtSoTienVay)
			var laiPhat = parseFloat(txtLaiPhat) * parseFloat(txtSoTienVay)
			if (txtLuyKeTraNo === 'null') {
				sum = parseInt(txtSoTienVay) + parseInt(soTienTraLai) + parseInt(soTienTraPhi) + parseInt(laiPhat)
				var valueSOTIENTRAGOC = $("#SOTIENTRAGOC").val().replaceAll(',', '')
				var valueSOTIENTRALAI = $("#SOTIENTRALAI").val().replaceAll(',', '')
				var valueSOTIENTRAPHI = $("#SOTIENTRAPHI").val().replaceAll(',', '')
				var valueSOTIENPHAT = $("#SOTIENPHAT").val().replaceAll(',', '')
				var sumNow = parseInt(valueSOTIENTRAGOC) + parseInt(valueSOTIENTRALAI) + parseInt(valueSOTIENTRAPHI) + parseInt(valueSOTIENPHAT)
				var keyupSoTienPhat = sum - sumNow
				$("#LUYKETRANOGOC").val(formatMoney(keyupSoTienPhat))
			} else {
				sum = parseInt(txtSoTienVay) + parseInt(soTienTraLai) + parseInt(soTienTraPhi) + parseInt(laiPhat) + parseInt(txtLuyKeTraNo)
				var valueSOTIENTRAGOC = $("#SOTIENTRAGOC").val().replaceAll(',', '')
				var valueSOTIENTRALAI = $("#SOTIENTRALAI").val().replaceAll(',', '')
				var valueSOTIENTRAPHI = $("#SOTIENTRAPHI").val().replaceAll(',', '')
				var valueSOTIENPHAT = $("#SOTIENPHAT").val().replaceAll(',', '')
				var sumNow = parseInt(valueSOTIENTRAGOC) + parseInt(valueSOTIENTRALAI) + parseInt(valueSOTIENTRAPHI) + parseInt(valueSOTIENPHAT) + parseInt(txtLuyKeTraNo)
				var keyupSoTienPhat = sum - sumNow
				$("#LUYKETRANOGOC").val(formatMoney(keyupSoTienPhat))
			}
		})
		$('body').on('change', '#KEHOACHVAYHANGNAMID', function (e) {
			e.preventDefault();
			var rs_dotru = KeHoach.getDotRutVonByKeHoach(($(this).val()))
			that.DotRutVon = rs_dotru
			var option_dottrano = ''
			rs_dotru.map(function (item, index) {
				option_dottrano = option_dottrano + '<option data-ngaynhanno="' + item.NGAYNHANNO + ' data-sotienvay=" ' + item.NGUYENTEVAYLAI + '" "  value =" ' + item.DOTRUTVONID + '"> ' + item.MA + ' - ' + item.NGAYNHANNO + ' </option>'
			})
			$('#DOTRUTVONID').html(option_dottrano).select2().trigger('change')
		})

		$('body').on('click', '.btnTaixuong', function () {
			var url = CONFIG_API.URL.SEVER + $(this).attr('val')
			window.open(url)
		})
		$(".btnSave").on('click', function (e) {
			if (isDoubleClicked($(this))) return;
			e.preventDefault()
			String.prototype.replaceAll = function (search, replacement) {
				var target = this;
				return target.replace(new RegExp(search, 'g'), replacement);
			};
			var vld = Validate.required();
			if ($("#DUNO").val() != 0) {
				if (vld) {
					oDotTraNo.DOTTRANOID = idDotTraNo;
					oDotTraNo.HOPDONGVAYLAIID = Number($('#HOPDONGVAYLAIID').val())
					oDotTraNo.DUANID = Number($('#DUANID').val());
					oDotTraNo.MA = $('#MA').val();
					oDotTraNo.NGAYTRA = $('#NGAYTRA').val();
					oDotTraNo.KYTRA = $('#KYTRA').val();
					oDotTraNo.TIENKYVAY = Number($('#TIENKYVAY').val().replaceAll(',', ''));
					oDotTraNo.DUNO = Number($('#DUNO').val().replaceAll(',', ''));
					oDotTraNo.SOTIENTRAGOC = Number($('#SOTIENTRAGOC').val().replaceAll(',', ''));
					oDotTraNo.SOTIENTRALAI = Number($('#SOTIENTRALAI').val().replaceAll(',', ''));
					oDotTraNo.SOTIENTRAPHI = Number($('#SOTIENTRAPHI').val().replaceAll(',', ''));
					oDotTraNo.SOTIENPHAT = Number($('#SOTIENPHAT').val().replaceAll(',', ''));
					oDotTraNo.LUYKETRANOGOC = Number($('#LUYKETRANOGOC').val().replaceAll(',', ''));
					oDotTraNo.SOLENHCHI = $('#SOLENHCHI').val();
					oDotTraNo.DONVIID = $('#DONVIID').val();
					oDotTraNo.PHITHEOHOPDONGVAY = $('#PHITHEOHOPDONGVAY').val().replaceAll(',', '');
					oDotTraNo.PHIQUANLICHOVAYLAI = $('#PHIQUANLICHOVAYLAI').val().replaceAll(',', '');
					oDotTraNo.TONGSOTIENPHAITRA = $('#TONGSOTIENPHAITRA').val().replaceAll(',', '');
					oDotTraNo.UUID = uuidv4();
					var rs = oDotTraNo.save();
					if (rs.CODE = 3 && rs.MESSAGE == '-1') {
						var oAlert = new AlertDialog1('Thông báo');
						oAlert.show('Mã này đã tồn tại', '40%', '50px');
						that.bindGrid01();
					}
					else {
						// $("#idrowtable").val(rs.RESULT)
						// $("#tablename").val(CurrentLayout)
						// var rs1 = DATA.ajaxPostForm(CONFIG_API.URL.SEVER + 'upload', 'uploadForm')
						// if (!rs1.success) {
						// 	oDotTraNo.deluid(rs.RESULT)
						// 	var oAlert = new AlertDialog('Thông báo');
						// 	oAlert.show(rs1.message, '40%', '50px');
						// 	that.bindGrid01();
						// }
						// else {
						that.bindGrid01();
						var oAlert = new AlertDialog('Thông báo');
						oAlert.show(rs.MESSAGE, '40%', '50px');
						// }
					}
				}
			}
			else {
				if (Number(idDotTraNo) > 0) {
					oDotTraNo.DOTTRANOID = idDotTraNo;
					oDotTraNo.DUANID = Number($('#DUANID').val());
					oDotTraNo.MA = $('#MA').val();
					oDotTraNo.NGAYTRA = $('#NGAYTRA').val();
					oDotTraNo.KYTRA = $('#KYTRA').val();
					oDotTraNo.TIENKYVAY = Number($('#TIENKYVAY').val().replaceAll(',', ''));
					oDotTraNo.DUNO = Number($('#DUNO').val().replaceAll(',', ''));
					oDotTraNo.SOTIENTRAGOC = Number($('#SOTIENTRAGOC').val().replaceAll(',', ''));
					oDotTraNo.SOTIENTRALAI = Number($('#SOTIENTRALAI').val().replaceAll(',', ''));
					oDotTraNo.SOTIENTRAPHI = Number($('#SOTIENTRAPHI').val().replaceAll(',', ''));
					oDotTraNo.SOTIENPHAT = Number($('#SOTIENPHAT').val().replaceAll(',', ''));
					oDotTraNo.LUYKETRANOGOC = Number($('#LUYKETRANOGOC').val().replaceAll(',', ''));
					oDotTraNo.SOLENHCHI = $('#SOLENHCHI').val();
					oDotTraNo.DONVIID = $('#DONVIID').val();
					oDotTraNo.PHITHEOHOPDONGVAY = $('#PHITHEOHOPDONGVAY').val().replaceAll(',', '');
					oDotTraNo.PHIQUANLICHOVAYLAI = $('#PHIQUANLICHOVAYLAI').val().replaceAll(',', '');
					oDotTraNo.TONGSOTIENPHAITRA = $('#TONGSOTIENPHAITRA').val().replaceAll(',', '');
					oDotTraNo.HOPDONGVAYLAIID = Number($('#HOPDONGVAYLAIID').val())
					oDotTraNo.UUID = uuidv4();
					var rs = oDotTraNo.save();
					if (rs.CODE = 3 && rs.MESSAGE == '-1') {
						var oAlert = new AlertDialog1('Thông báo');
						oAlert.show('Mã này đã tồn tại', '40%', '50px');
						that.bindGrid01();
					}
					else {
						$("#idrowtable").val(rs.RESULT)
						$("#tablename").val(CurrentLayout)
						var rs1 = DATA.ajaxPostForm(CONFIG_API.URL.SEVER + 'upload', 'uploadForm')
						if (!rs1.success) {
							oDotTraNo.deluid(rs.RESULT)
							var oAlert = new AlertDialog('Thông báo');
							oAlert.show(rs1.message, '40%', '50px');
							that.bindGrid01();
						}
						else {
							that.bindGrid01();
							var oAlert = new AlertDialog('Thông báo');
							oAlert.show(rs.MESSAGE, '40%', '50px');
						}
					}
				} else {
					if (Number($("#DUNO").val()) == 0 && Number(idDotTraNo) == 0) {
						oDotTraNo.DOTTRANOID = idDotTraNo;
						oDotTraNo.HOPDONGVAYLAIID = Number($('#HOPDONGVAYLAIID').val())
						oDotTraNo.DUANID = Number($('#DUANID').val());
						oDotTraNo.MA = $('#MA').val();
						oDotTraNo.NGAYTRA = $('#NGAYTRA').val();
						oDotTraNo.KYTRA = $('#KYTRA').val();
						oDotTraNo.TIENKYVAY = Number($('#TIENKYVAY').val().replaceAll(',', ''));
						oDotTraNo.DUNO = Number($('#DUNO').val().replaceAll(',', ''));
						oDotTraNo.SOTIENTRAGOC = Number($('#SOTIENTRAGOC').val().replaceAll(',', ''));
						oDotTraNo.SOTIENTRALAI = Number($('#SOTIENTRALAI').val().replaceAll(',', ''));
						oDotTraNo.SOTIENTRAPHI = Number($('#SOTIENTRAPHI').val().replaceAll(',', ''));
						oDotTraNo.SOTIENPHAT = Number($('#SOTIENPHAT').val().replaceAll(',', ''));
						oDotTraNo.LUYKETRANOGOC = Number($('#LUYKETRANOGOC').val().replaceAll(',', ''));
						oDotTraNo.SOLENHCHI = $('#SOLENHCHI').val();
						oDotTraNo.DONVIID = $('#DONVIID').val();
						oDotTraNo.PHITHEOHOPDONGVAY = $('#SOTIENTRAPHI').val().replaceAll(',', '');
						oDotTraNo.PHIQUANLICHOVAYLAI = $('#PHIQUANLICHOVAYLAI').val().replaceAll(',', '');
						oDotTraNo.TONGSOTIENPHAITRA = $('#TONGSOTIENPHAITRA').val().replaceAll(',', '');
						oDotTraNo.UUID = uuidv4();
						var rs = oDotTraNo.save();
						if (rs.CODE = 3 && rs.MESSAGE == '-1') {
							var oAlert = new AlertDialog1('Thông báo');
							oAlert.show('Mã này đã tồn tại', '40%', '50px');
							that.bindGrid01();
						}
						else {
							// $("#idrowtable").val(rs.RESULT)
							// $("#tablename").val(CurrentLayout)
							// var rs1 = DATA.ajaxPostForm(CONFIG_API.URL.SEVER + 'upload', 'uploadForm')
							// if (!rs1.success) {
							// 	oDotTraNo.deluid(rs.RESULT)
							// 	var oAlert = new AlertDialog('Thông báo');
							// 	oAlert.show(rs1.message, '40%', '50px');
							// 	that.bindGrid01();
							// }
							// else {
							that.bindGrid01();
							var oAlert = new AlertDialog('Thông báo');
							oAlert.show(rs.MESSAGE, '40%', '50px');
							// }
						}
					}
					else {
						var oAlert = new AlertDialog1('Cảnh báo');
						oAlert.show('Kế hoạch này đã trả nợ đủ', '40%', '50px');
					}
				}
			}

		})
		$('#Grid01 tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				oDotTraNo.DOTTRANOID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				idDotTraNo = $(this).find('.rowID').val();
				oDotTraNo.DOTTRANOID = idDotTraNo;
				that.filterAction('SELECT');
			}
		});
	});
}