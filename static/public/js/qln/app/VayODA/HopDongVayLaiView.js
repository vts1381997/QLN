const NgayHomNay = $.datepicker.formatDate('yy-mm-dd', new Date());
var HopDongVayLaiView = function () {
	var DuAns = new DuAn();
	var idHopDongVayLai = 0;
	var that = this;
	this.AppTitle = 'Hợp đồng vay lại';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var rowhdvl;
	var oHopDongVayLai = new HopDongVayLai();
	var TienTes = new TienTe()
	TienTes.getAll();
	var resultTiente = TienTes.LIST
	var option1 = ''
	resultTiente.map(value => {
		option1 = option1 + "<option data-tygia='" + value.BANRA + "' value='" + value.TIENTEID + "'>" + value.TEN + "</option>"
	})

	function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
		if (amount == null || amount == 0) {
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
			console.log(e)
		}
	}

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

	this.bindGrid01 = function () {
		oHopDongVayLai.getAll();
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < oHopDongVayLai.LIST.length; i++) {
			var _item = oHopDongVayLai.LIST[i];
			_item.tienkyvay = formatMoney(_item.TIENKYVAY)
			_item.laisuat = JSON.stringify(_item.LAISUATVAY + '%').replace('"', '').replace('"', '');
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.HOPDONGVAYLAIID + '" />';
			var _hidden1 = '<p style="display:none" class="rowhdvl"  />' + JSON.stringify(_item) + '</p>';
			var download = ''
			if (_item.URL) {
				download = '<button  val="' + _item.URL + '" class= "btn btn-primary btnTaixuong" >Tải xuống</button>'
			}
			else {
				download = ''
			}
			aRows.push([
				(i + 1) + _hidden + _hidden1,
				_item.MA,
				_item.TEN,
				_item.TENDUAN,
				_item.NGAYKY,
				_item.NGAYHIEULUC,
				_item.COQUANUYQUYENVAYLAI,
				_item.TENDONVI,
				_item.tienkyvay,
				_item.laisuat,
				_item.COPHULUC,
				download,
			]);
		}
		that.oTable.rows.add(aRows).draw();
	}
	this.init = function () {
		that.bindGrid01();
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
	}
	this.bindModal = function () {
		TienTes.getAll();
		var resultTiente = TienTes.LIST
		var option1 = ''
		resultTiente.map(value => {
			option1 = option1 + "<option data-tygia='" + value.BANRA + "' value='" + value.TIENTEID + "'>" + value.MA + "</option>"
		})
		$('#TIENTEID').html(option1)
		$('#TIENTEIDCP').html(option1)
		DuAns.getAll();
		var resultDuan = DuAns.LIST
		var option = ''
		resultDuan.map(value => {
			if (value.COCHETAICHINH == "CP") {
				return;
			}
			else {
				option = option + "<option data-luyketienkyvay='" + value.LUYKETIENKYVAY + "' data-tienteid='" + value.TIENTEID + "' data-phantramvaylai='" + value.PHANTRAMVAYLAI + "' data-tongmucdautu='" + value.TONGMUCDAUTU + "' data-loai='" + value.COCHETAICHINH + "' value='" + value.DUANID + "'>" + value.MA + " - " + value.COCHETAICHINH + ' - ' + value.TEN + "</option>"
			}
		})
		$('#DUANID').html(option).trigger('change')
		$("#DONVIID").html(fnc_danhsachdonvi())
		$('#TIENTENNID').html(option1)

		$('body').on('change', '#TIENTEID', function () {
			var tyGia = $("#TIENTEID option:selected").attr('data-tygia')
			if (Number(tyGia) === 1) {
				$("#TIENKYVAYNGUYENTE").val($("#TIENKYVAY").val().replaceAll(',', ''))
			}
			else {
				var tyGiaQuyDoi = tyGia.replace(',', '')
				$("#TIENKYVAYNGUYENTE").val(parseFloat($("#TIENKYVAY").val().replaceAll(',', '')) * parseFloat(tyGiaQuyDoi).toFixed(2))
			}
		})
		$('body').on('keyup', '#TIENKYVAY', function () {
			$("#TIENTEID").trigger('change')
		})
		$('body').on('keyup', '#LAISUATVAY', function () {
			var laiSuatVay = $("#LAISUATVAY").val()
			if (Number(laiSuatVay) > 10) {
				$("#LAISUATVAY").val('10')
			}
		})
		$('body').on('keyup', '#TIENLAIPHAT', function () {
			var laiPhat = $("#TIENLAIPHAT").val()
			if (Number(laiPhat) > 10) {
				$("#TIENLAIPHAT").val('10')
			}
		})
		$('body').on('keyup', '#TIENPHIQUANLYCHOVAYLAI', function () {
			var laiPhat = $("#TIENPHIQUANLYCHOVAYLAI").val()
			if (Number(laiPhat) > 0.25) {
				$("#TIENPHIQUANLYCHOVAYLAI").val('0.25')
			}
		})
		$('body').on('click', '#customRadio1', function () {
			$("#TIENPHIQUANLYCHOVAYLAI").val('0.0')
			$('#TIENPHIQUANLYCHOVAYLAI').prop("disabled", true);
			$('#phiquanlychovaylai').prop("disabled", true);
		})
		$('body').on('click', '#customRadio2', function () {
			$("#TIENPHIQUANLYCHOVAYLAI").val('0.25')
			$('#TIENPHIQUANLYCHOVAYLAI').prop("disabled", true);
			$('#phiquanlychovaylai').prop("disabled", true);
		})
		$('body').on('click', '#customRadio3', function () {
			$('#TIENPHIQUANLYCHOVAYLAI').prop("disabled", false);
			$('#phiquanlychovaylai').prop("disabled", false);
		})
		$('body').on('change', '#DUANID', function (e) {
			e.preventDefault()
			$('#table-multi').empty();
			var duan = $("#DUANID option:selected").attr('data-loai')
			var donViTienTe = $("#DUANID option:selected").attr('data-tienteid')
			var tongMucDauTu = $("#DUANID option:selected").attr('data-tongmucdautu')
			var phanTramVayLai = $("#DUANID option:selected").attr('data-phantramvaylai')
			var luyKeTienKyVay = $("#DUANID option:selected").attr('data-luyketienkyvay')
			$("#TIENTEID").val(donViTienTe).select2()
			$("#TIENTENNID").val(donViTienTe).select2()
			if (duan.includes('HH')) {
				if (Number(tongMucDauTu) > 0) {
					if (Number(luyKeTienKyVay) > 0 && Number(luyKeTienKyVay) < Number(phanTramVayLai / 100 * tongMucDauTu)) {
						var soTienConLai = Number(phanTramVayLai / 100 * tongMucDauTu) - Number(luyKeTienKyVay)
						$("#TIENKYVAY").val(formatMoney(phanTramVayLai / 100 * soTienConLai))
					}
					if (Number(luyKeTienKyVay) == Number(phanTramVayLai / 100 * tongMucDauTu)) {
						$("#TIENKYVAY").val('')
					}
					if (Number(luyKeTienKyVay) == 0) {
						$("#TIENKYVAY").val(formatMoney(phanTramVayLai / 100 * tongMucDauTu))
					}
				}
			}
			else
				if (duan.includes('VL')) {
					if (Number(tongMucDauTu) > 0) {
						var soTienConLai = Number(tongMucDauTu) - Number(luyKeTienKyVay)
						$("#TIENKYVAY").val(formatMoney(soTienConLai))
					}
				}
		})
	}

	$(function () {
		that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
		that.oDialog = new PopupDialog(reload);
		that.init();
		function reload() {
			that.filterAction('NEW');
			that.bindGrid01();
		}
		String.prototype.replaceAll = function (search, replacement) {
			var target = this;
			return target.replace(new RegExp(search, 'g'), replacement);
		};
		$('body').on('keyup', '#TIENKYVAY', function () {
			if (Number(idHopDongVayLai) > 0) {
				var tongMucDauTu = $("#DUANID option:selected").attr('data-tongmucdautu')
				var soTienVay = $("#TIENKYVAY").val().replaceAll(',', '')
				var luyKeTienKyVay = $("#DUANID option:selected").attr('data-luyketienkyvay')
				var phanTramVayLai = $("#DUANID option:selected").attr('data-phantramvaylai')
				console.log(luyKeTienKyVay, 'luy ke ');
				console.log(tongMucDauTu, 'tongMucDauTu  ');
				if (Number(tongMucDauTu) == Number(luyKeTienKyVay)) {
					if (Number(soTienVay) > JSON.parse(rowhdvl).TIENKYVAY) {
						$(this).val(formatMoney(JSON.parse(rowhdvl).TIENKYVAY))
					}
				}
				else {
					//$(this).val(formatMoney(Number(phanTramVayLai / 100 * tongMucDauTu)))
					if (Number(phanTramVayLai / 100 * tongMucDauTu) == Number(luyKeTienKyVay)) {
						$(this).val(formatMoney(JSON.parse(rowhdvl).TIENKYVAY))
					}
					// if (Number(soTienVay) > JSON.parse(rowhdvl).TIENKYVAY) {
					// 	$(this).val(formatMoney(JSON.parse(rowhdvl).TIENKYVAY))
					// }
				}
			}
			else {
				var soTienVay = $("#TIENKYVAY").val().replaceAll(',', '');
				var tongMucDauTu = $("#DUANID option:selected").attr('data-tongmucdautu')
				var luyKeTienKyVay = $("#DUANID option:selected").attr('data-luyketienkyvay')
				var phanTramVayLai = $("#DUANID option:selected").attr('data-phantramvaylai')
				var coCheTaiChinh = $("#DUANID option:selected").attr('data-loai')
				if (coCheTaiChinh == "HH") {
					var soTienVay1 = 0;
					if (Number(luyKeTienKyVay) == 0) {
						soTienVay1 = Number(phanTramVayLai / 100 * tongMucDauTu)
					}
					if (Number(luyKeTienKyVay) == Number(phanTramVayLai / 100 * tongMucDauTu)) {
						soTienVay1 = ''
					}
					if (Number(luyKeTienKyVay) > 0 && Number(luyKeTienKyVay) < Number(phanTramVayLai / 100 * tongMucDauTu)) {
						soTienVay1 = Number(phanTramVayLai / 100 * tongMucDauTu) - Number(luyKeTienKyVay)
					}
					if (Number(soTienVay) > Number(soTienVay1)) {
						$("#TIENKYVAY").val(formatMoney(soTienVay1))
					}
				}
				if (coCheTaiChinh == "VL") {
					var soTienConLai = Number(tongMucDauTu) - Number(luyKeTienKyVay)
					if (Number($(this).val().replaceAll(',', '')) > Number(soTienConLai)) {
						$(this).val(formatMoney(soTienConLai))
					}
				}
			}
		})
		$('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()
			$("#DUANID").prop('disabled', false)
			$("#Grid01").find('.selected').removeClass('selected');
			$("#exampleModalLongTitle").text('Thêm mới hợp đồng vay lại')
			var ngayThang = $.datepicker.formatDate('dd/mm', new Date())
			var namDauTien = $.datepicker.formatDate('yy', new Date());
			namDauTien = parseInt(namDauTien) + 1;
			var namCuoiCung = $.datepicker.formatDate('yy', new Date());
			namCuoiCung = parseInt(namCuoiCung) + 2;
			$('#list_uploadfile').html('');
			$('#MA').val('');
			$('#TEN').val('');
			$('#NGAYKY').val($.datepicker.formatDate('dd/mm/yy', new Date()));
			$('#COQUANVAYLAI').val('');
			$('#TIENKYVAY').val('');
			$('#TIENPHIHIEPDINHVAYNN').val('');
			$('#LAISUATVAY').val('');
			$('#NGAYHIEULUC').val($.datepicker.formatDate('dd/mm/yy', new Date()));
			$('#NGAYKYPHULUC').val($.datepicker.formatDate('dd/mm/yy', new Date()));
			$('#NGAYTRANOGOCDAUTIEN').val(ngayThang + '/' + namDauTien);
			$('#NGAYTRANOLAIDAUTIEN').val(ngayThang + '/' + namDauTien);
			$('#NGAYTRANOGOCCUOICUNG').val(ngayThang + '/' + namCuoiCung);
			$('#NGAYTRANOLAICUOICUNG').val(ngayThang + '/' + namCuoiCung);
			$('#TIENLAIPHAT').val('');
			$('#SOHIEPDINHVAYNN').val('');
			$("#TIENPHIQUANLYCHOVAYLAI").val('0.0')
			idHopDongVayLai = 0;
			that.bindModal();
			fnc_removeSpace();
			fnc_removeName();
			fnc_validateSpace("COQUANUYQUYENVAYLAI");
			fnc_validateSpace("SOHIEPDINHVAYNN");
			$("#DUANID").prop('disabled', false)
			$("#customRadio2").trigger('click')
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.bindModal();
			$("#exampleModalLongTitle").text('Sửa hợp đồng vay lại')
			$("#DUANID").prop('disabled', true)
			oHopDongVayLai.getById(idHopDongVayLai);
			oHopDongVayLai.getByIdCha(oHopDongVayLai.MA);
			$('#MA').val(oHopDongVayLai.MA);
			$('#TEN').val(oHopDongVayLai.TEN);
			$('#NGAYKY').val(oHopDongVayLai.NGAYKY);
			$('#COQUANVAYLAI').val(oHopDongVayLai.COQUANVAYLAI);
			$('#COQUANUYQUYENVAYLAI').val(oHopDongVayLai.COQUANUYQUYENVAYLAI);
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
			$('#TIENPHIHIEPDINHVAYNN').val(formatMoney(oHopDongVayLai.TIENPHIHIEPDINHVAYNN));
			$('#TIENPHIQUANLYCHOVAYLAI').val(oHopDongVayLai.TIENPHIQUANLYCHOVAYLAI);
			$('#LOAILAISUAT').val(oHopDongVayLai.LOAILAISUAT);
			$('#GHICHU').val(oHopDongVayLai.GHICHU);
			$('#DONVIID').val(oHopDongVayLai.DONVIID).select2();
			$('#DUANID').val(oHopDongVayLai.DUANID);
			$('#TIENTEID').val(oHopDongVayLai.TIENTEID).select2();
			$('#MAPHULUC').val(oHopDongVayLai.MAPHULUC);
			$('#TENPHULUC').val(oHopDongVayLai.TENPHULUC);
			$('#NGAYKYPHULUC').val(oHopDongVayLai.NGAYKYPHULUC);
			$('#NGUOIKY').val(oHopDongVayLai.NGUOIKY);
			// $('#DUANID').trigger('change')
			$('#TIENPHIHIEPDINHVAYNN').prop("disabled", false);
			$('#phiquanlychovaylai').prop("disabled", false);
			$('#TIENKYVAY').val(formatMoney(oHopDongVayLai.TIENKYVAY));
			if (Number(oHopDongVayLai.TIENPHIQUANLYCHOVAYLAI) == 0) {
				$("#customRadio1").trigger('click')
			}
			else
				if (Number(oHopDongVayLai.TIENPHIQUANLYCHOVAYLAI) == 0.25) {
					$("#customRadio2").trigger('click')
				}
				else {
					$("#customRadio3").prop('checked', true)
				}
			fnc_removeSpace();
			fnc_removeName();
			fnc_validateSpace("COQUANUYQUYENVAYLAI");
			fnc_validateSpace("SOHIEPDINHVAYNN");
		});
		$('.ACTIONS').on('click', '#btnDelete', function (e) {
			e.preventDefault()
			if (!oHopDongVayLai.HOPDONGVAYLAIID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn hợp đồng vay lại để xóa', '40%', '50px');
				return false;
			}
			function ok() {
				if (JSON.parse(rowhdvl).STATUS_DELETE > 0) {
					var oAlert = new AlertDialog('Cảnh báo');
					oAlert.show('Không thể xóa HĐ này (HĐ này còn các trường con)', '40%', '50px');
				}
				else {
					var rs = oHopDongVayLai.del(oHopDongVayLai.HOPDONGVAYLAIID);
					var oAlert = new AlertDialog('Thông báo');
					oAlert.show(rs.MESSAGE, '40%', '50px');
					that.bindGrid01();
				}
			}
			function cancel() { }
			var oConfirmDialog = new ConfirmDialog('Xác nhận xóa', ok, cancel);
			oConfirmDialog.show('Bạn có chắc chắn muốn xóa bản ghi này không?', '40%', '50px');
		});

		$('body').on('click', '.btnTaixuong', function () {
			var url = CONFIG_API.URL.SEVER + $(this).attr('val')
			window.open(url)
		})

		$(".btnSave").on('click', function (e) {
			if (isDoubleClicked($(this))) return;
			e.preventDefault()
			var list_tr_MAPHULUC = $('.input-table .MAPHULUC')
			var list_tr_TENPHULUC = $('.input-table .TENPHULUC')
			var list_tr_NGAYKYPHULUC = $('.input-table .NGAYKYPHULUC')
			var list_tr_NGUOIKYPHULUC = $('.input-table .NGUOIKYPHULUC')
			var r_list_tr_MAPHULUC = []
			var r_list_tr_TENPHULUC = []
			var r_list_tr_NGAYKYPHULUC = []
			var r_list_tr_NGUOIKYPHULUC = []
			list_tr_MAPHULUC.map((index, value) => {
				r_list_tr_MAPHULUC.push($(value).val())
			})
			list_tr_TENPHULUC.map((index, value) => {
				r_list_tr_TENPHULUC.push($(value).val())
			})
			list_tr_NGAYKYPHULUC.map((index, value) => {
				r_list_tr_NGAYKYPHULUC.push($(value).val())
			})
			list_tr_NGUOIKYPHULUC.map((index, value) => {
				r_list_tr_NGUOIKYPHULUC.push($(value).val())
			})
			oHopDongVayLai.HOPDONGVAYLAIID = idHopDongVayLai;
			oHopDongVayLai.MA = $('#MA').val();
			oHopDongVayLai.TEN = $('#TEN').val();
			oHopDongVayLai.DUANID = $('#DUANID').val();
			oHopDongVayLai.NGAYKY = $('#NGAYKY').val();
			oHopDongVayLai.COQUANUYQUYENVAYLAI = $('#COQUANUYQUYENVAYLAI').val();
			oHopDongVayLai.TIENKYVAY = $('#TIENKYVAY').val().replaceAll(',', '');
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
			oHopDongVayLai.TIENPHIHIEPDINHVAYNN = $('#TIENPHIHIEPDINHVAYNN').val().replaceAll(',', '');
			oHopDongVayLai.TIENPHIQUANLYCHOVAYLAI = $('#TIENPHIQUANLYCHOVAYLAI').val();
			oHopDongVayLai.TIENTEID = $('#TIENTEID').val();
			oHopDongVayLai.DONVIID = $('#DONVIID').val();
			oHopDongVayLai.TIENTEIDCP = 19;
			oHopDongVayLai.SOTIENCAPPHAT = 0;
			oHopDongVayLai.MAPHULUC = $('#MAPHULUC').val();
			oHopDongVayLai.TENPHULUC = $('#TENPHULUC').val();
			oHopDongVayLai.NGAYKYPHULUC = $('#NGAYKYPHULUC').val();
			oHopDongVayLai.NGUOIKY = $('#NGUOIKY').val();
			oHopDongVayLai.UID = uuidv4();
			oHopDongVayLai.TYGIA = JSON.parse(window.localStorage.getItem('TIENTE')).filter(a => a.TIENTEID == $("#TIENTEID").val())[0].BANRA
			var ngayBatDau = Number($("#NGAYTRANOGOCDAUTIEN").val().split('/')[2] + $("#NGAYTRANOGOCDAUTIEN").val().split('/')[1] + $("#NGAYTRANOGOCDAUTIEN").val().split('/')[0])
			var ngayBatDau1 = Number($("#NGAYTRANOLAIDAUTIEN").val().split('/')[2] + $("#NGAYTRANOLAIDAUTIEN").val().split('/')[1] + $("#NGAYTRANOLAIDAUTIEN").val().split('/')[0])
			var ngayKetThuc = Number($("#NGAYTRANOGOCCUOICUNG").val().split('/')[2] + $("#NGAYTRANOGOCCUOICUNG").val().split('/')[1] + $("#NGAYTRANOGOCCUOICUNG").val().split('/')[0])
			var ngayKetThuc1 = Number($("#NGAYTRANOLAICUOICUNG").val().split('/')[2] + $("#NGAYTRANOLAICUOICUNG").val().split('/')[1] + $("#NGAYTRANOLAICUOICUNG").val().split('/')[0])
			var ngaykyhd = Number($("#NGAYKY").val().split('/')[2] + $("#NGAYKY").val().split('/')[1] + $("#NGAYKY").val().split('/')[0])
			var ngayhieuluc = Number($("#NGAYHIEULUC").val().split('/')[2] + $("#NGAYHIEULUC").val().split('/')[1] + $("#NGAYHIEULUC").val().split('/')[0])
			if (ngayhieuluc < ngaykyhd) {
				$("#NGAYHIEULUC").css('border-color', 'red')
				$("#NGAYKY").css('border-color', 'red')
			}
			else {
				$("#NGAYKY").css('border-color', '')
				$("#NGAYHIEULUC").css('border-color', '')
			}
			if (ngayBatDau > ngayKetThuc) {
				$("#NGAYTRANOGOCDAUTIEN").css('border-color', 'red')
				$("#NGAYTRANOGOCCUOICUNG").css('border-color', 'red')
			}
			else {
				$("#NGAYTRANOGOCDAUTIEN").css('border-color', '')
				$("#NGAYTRANOGOCCUOICUNG").css('border-color', '')
			}
			if (ngayBatDau1 > ngayKetThuc1) {
				$("#NGAYTRANOLAIDAUTIEN").css('border-color', 'red')
				$("#NGAYTRANOLAICUOICUNG").css('border-color', 'red')
			}
			else {
				$("#NGAYTRANOLAIDAUTIEN").css('border-color', '')
				$("#NGAYTRANOLAICUOICUNG").css('border-color', '')
			}
			if (oHopDongVayLai.MA == '') {
				$('#MA').css('border-color', 'red')
			} else {
				$('#MA').css('border-color', '')
			}
			if (oHopDongVayLai.MA == '' || ngayBatDau > ngayKetThuc || ngayBatDau1 > ngayKetThuc1 || ngayhieuluc < ngaykyhd) {
			}
			else {
				var querry = '';
				querry = "Insert all ";
				for (var i = 0; i < list_tr_MAPHULUC.length; i++) {
					querry = querry +
						" Into QLN_HOPDONGVAYLAI_PHULUC(MA, MAPHULUC, TENPHULUC, NGAYKYPHULUC, NGUOIKYPHULUC) VALUES('" +
						$("#MA").val() + "','" +
						r_list_tr_MAPHULUC[i] + "', '" +
						r_list_tr_TENPHULUC[i] + "',  to_date('" +
						r_list_tr_NGAYKYPHULUC[i] + "', 'YYYY-MM-DD'),'" +
						r_list_tr_NGUOIKYPHULUC[i] + "') ";
				}
				querry = querry + " Select 1 from dual";
				var rs = oHopDongVayLai.save();
				if (rs.CODE = 3 && rs.MESSAGE == '-1') {
					var oAlert = new AlertDialog1('Thông báo');
					oAlert.show('Mã này đã tồn tại', '40%', '50px');
					that.bindGrid01();
				}
				else {
					var pDelete = '';
					pDelete = "Delete QLN_HOPDONGVAYLAI_PHULUC  where MA ='" + $('#MA').val() + "'"
					if (querry != "Insert all  Select 1 from dual") {
						oHopDongVayLai.savedtl(pDelete, querry);
					}
					else {
						oHopDongVayLai.savedtl(pDelete, pDelete);
					}
					$("#idrowtable").val(rs.RESULT)
					$("#tablename").val(CurrentLayout)
					var rs1 = DATA.ajaxPostForm(CONFIG_API.URL.SEVER + 'upload', 'uploadForm')
					if (!rs1.success) {
						oKeHoachVayHangNam.deluid(rs.RESULT)
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
			}
		})
		$('#Grid01 tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				oHopDongVayLai.HOPDONGVAYLAIID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				idHopDongVayLai = $(this).find('.rowID').val();
				rowhdvl = $(this).find('.rowhdvl').text();
				oHopDongVayLai.HOPDONGVAYLAIID = idHopDongVayLai;
				that.filterAction('SELECT');
			}
		});
	});
}