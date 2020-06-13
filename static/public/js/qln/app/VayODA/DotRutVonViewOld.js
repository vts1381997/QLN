var DotRutVonView = function () {
	var idrutvon = 0;
	var that = this;
	this.AppTitle = 'Đợt rút vốn';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var txtSoLanRut
	var tentiencp
	var oDotRutVon = new DotRutVon();
	var DuAns = new DuAn();
	var KeHoach = new KeHoachVayHangNam();
	var TinhThanhs = new TinhThanh();
	var oHopDong = new HopDongVayLai();
	var oDotRutVon = new DotRutVon();
	var txtTenDuAnHopDong = ''
	this.filterAction = function (sState) {
		switch (sState) {
			case 'NEW':
				ControlHelper.Input.disable(['#btnEdit', '#btnLuu', '#btnDelete', '#btnCancel']);
				ControlHelper.Input.enable(['#btnAddNew']);
				break;
			case 'SELECT':
				ControlHelper.Input.enable(['#btnEdit', '#btnCancel', '#btnDelete']);
				break;
			case 'EDIT':
				ControlHelper.Input.disable(['#btnEdit']);
				ControlHelper.Input.enable(['#btnLuu', '#btnCancel', '#btnDelete']);
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
	this.bindGrid01 = function () {

		oDotRutVon.getAll();
		that.oTable.clear().draw();
		var aRows = [];
		if (oDotRutVon.LIST) {
			for (var i = 0; i < oDotRutVon.LIST.length; i++) {
				var _item = oDotRutVon.LIST[i];
				if (_item.PHUONGTHUCGIAINGAN === 1) {
					_item.phuongthucgiaingan = "Giải ngân trực tiếp"
				}
				if (_item.PHUONGTHUCGIAINGAN === 2) {
					_item.phuongthucgiaingan = "Giải ngân về tài khoản đặc biệt"
				}
				if (_item.PHUONGTHUCGIAINGAN === 3) {
					_item.phuongthucgiaingan = "Hoàn chứng từ"
				}
				_item.nguyentevaylai = formatMoney(_item.NGUYENTEVAYLAI);
				_item.nguyentecapphat = formatMoney(_item.NGUYENTECAPPHAT);
				_item.luykevaylai = formatMoney(_item.LUYKERUTVONVAYLAI);
				_item.luykecapphat = formatMoney(_item.LUYKERUTVONCAPPHAT);

				var _hidden = '<p style="display:none" class="rowID" >' + JSON.stringify(_item) + '</p>';
				var download = ''
				if (_item.URL) {
					download = '<button  val="' + _item.URL + '" class= "btn btn-primary btnTaixuong" >Tải xuống</button>'
				}
				else {
					download = ''
				}
				aRows.push([
					(i + 1) + _hidden,
					_item.NAMKEHOACH,
					_item.MA,
					_item.TENHOPDONG,
					_item.TENDUAN,
					_item.TENDONVI,
					_item.NGAYNHANNO,
					_item.nguyentevaylai,
					_item.luykevaylai,
					_item.nguyentecapphat,
					_item.luykecapphat,
					_item.phuongthucgiaingan,
					download
				]);
			}
			that.oTable.rows.add(aRows).draw();
		}

	}

	this.init = function () {
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
		that.bindGrid01();
	}
	this.bindModal = function () {
		$("#KEHOACHVAYHANGNAMID").html('');
		$('#NHATAITROID').html('')

		KeHoach.getAll();
		TinhThanhs.getAll();
		oHopDong.getAll();
		oDotRutVon.getAll();

		// var NhaTaiTros = new NhaTaiTro()
		DuAns.getAll();
		$("#DONVIID").html(fnc_danhsachdonvi())


		var TienTes = new DonViTienTe()
		TienTes.getAll();
		var resultTienTe = TienTes.LIST
		var option = ''
		resultTienTe.map(value => {
			option = option + "<option data-tygia='" + value.BANRA + "' value='" + value.TIENTEID + "'>" + value.TEN + "</option>"
		})
		$('#SOTIENGIAINGANVAYLAITIENTE').append(option)
		$('#SOTIENGIAINGANCAPPHATTIENTE').html(option)
		var resultKeHoach = KeHoach.LIST
		var option2 = ''

		if (resultKeHoach) {
			resultKeHoach.map((value, index) => {
				if (value.STATUS_APPROVE + '' === '1') {
					option2 = option2 + "<option cochetaichinh='" + value.COCHETAICHINH + "' tien-cp='" + value.TIENCPID + "' data-ngaynhannotoida='" + value.NGAYNHANNOTOIDA + "' data-ngaynhanno='" + value.NGAYNHANNOTOITHIEU + "' data-tientebanra='" + value.TIENTEBANRA + "' data-idtiente='" + value.IDTIENTEDUOCRUT + "' data-loaitiente='" + value.MATIENTEDUOCRUT + "' data-solanrut='" + value.SOLANKEHOACH + "' data-luykevonvaylai='" + value.LUYKERUTVONVAYLAI + "' data-luykevoncapphat='" + value.LUYKERUTVONCAPPHAT + "' data-sotienvaylaitoida='" + value.SOTIENVAYLAITOIDA + "' data-sotiencapphattoida='" + value.SOTIENCAPPHATTOIDA + "' data-namkehoach='" + value.NAMKEHOACH + "' data-hopdong='" + value.MAHOPDONG + "'   data-duanhopdong ='" + "(Dự án: " + value.MADUAN + " - " + value.TENDUAN + ") - (Hợp đồng: " + value.MAHOPDONG + " - " + value.TENHOPDONG + ")'" + " value=" + value.KEHOACHVAYHANGNAMID + ">" + value.COCHETAICHINH + " * " + value.TEN + "</option>"
				}
			})
		}

		$("#KEHOACHVAYHANGNAMID").append(option2);
		$("#KEHOACHVAYHANGNAMID").trigger('change');
	}



	$(function () {
		String.prototype.replaceAll = function (search, replacement) {
			var target = this;
			return target.replace(new RegExp(search, 'g'), replacement);
		};
		that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
		that.oDialog = new PopupDialog(reload);

		setTimeout(() => {
			that.init();
		}, 100);
		function reload() {
			that.filterAction('NEW');
			that.bindGrid01();
		}
		$('body').on('change', '#SOTIENGIAINGANVAYLAI', function () {
			var gianguyente = JSON.parse(window.localStorage.getItem('TIENTE')).filter(a => a.MA == $("#NGUYENTEVAYLAITIENTE").text())
			if (gianguyente.length > 0) {

				gianguyente = gianguyente[0].BANRA.replace(',', '')
			}

			//  gianguyente = JSON.parse(window.localStorage.getItem('TIENTE')).filter(a => a.TEN == $("#NGUYENTEVAYLAITIENTE").text())[0].BANRA.replace(',', '')
			let txtTienTeBanRa = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-tientebanra')
			let txtChuyenDoiTienTeBanRa = $("#SOTIENGIAINGANVAYLAITIENTE option:selected").attr('data-tygia').replace(',', '')
			var nguyentevl = String($("#SOTIENGIAINGANVAYLAI").val().replaceAll(',', '') * txtChuyenDoiTienTeBanRa / gianguyente).split('.')[0]
			$("#NGUYENTEVAYLAI").val(formatMoney(nguyentevl))

		})
		$('body').on('change', '#SOTIENGIAINGANCAPPHAT', function () {
			let txtTienTeBanRa1 = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-tientebanra')
			let txtChuyenDoiTienTeBanRa1 = $("#SOTIENGIAINGANCAPPHATTIENTE option:selected").attr('data-tygia')
			let tyLeTyGia1 = 0;
			if (txtTienTeBanRa1) {
				if (txtTienTeBanRa1.includes(',') == true || txtChuyenDoiTienTeBanRa1.includes(',') == true) {
					var a1 = txtTienTeBanRa1.replace(',', '');
					var b1 = txtChuyenDoiTienTeBanRa1.replace(',', '');
					tyLeTyGia1 = parseFloat(b1).toFixed(2) / parseFloat(a1).toFixed(2)
					var c1 = tyLeTyGia1 * $("#SOTIENGIAINGANCAPPHAT").val().replaceAll(',', '');
					$("#NGUYENTECAPPHAT").val(formatMoney(c1))
				}
				else {
					tyLeTyGia1 = parseFloat(txtChuyenDoiTienTeBanRa1).toFixed(2) / parseFloat(txtTienTeBanRa1).toFixed(2)
					var d1 = tyLeTyGia1 * $("#SOTIENGIAINGANCAPPHAT").val().replaceAll(',', '');
					$("#NGUYENTECAPPHAT").val(formatMoney(d1))
				}
			}
		})
		$('body').on('blur', '#NGAYNHANNO', function () {
			var arrNgayNhanNo = oDotRutVon.getAllNgayNhanNo(Number($("#KEHOACHVAYHANGNAMID").val()))
			var dates = [];
			if (arrNgayNhanNo) {
				arrNgayNhanNo.map(value => {
					var nam = value.NGAYNHANNO.split('/')[2]
					var thang = value.NGAYNHANNO.split('/')[1]
					var ngay = value.NGAYNHANNO.split('/')[0]
					dates.push(new Date(nam + '/' + thang + '/' + ngay))
				})
				var maxDate = new Date(Math.max.apply(null, dates));
				var dateMax = formatDate(maxDate).split('-').join('');
			}
			let ngayNhanNoToiThieu = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-ngaynhanno')
			let ngayNhanNoToiDa = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-ngaynhannotoida')
			var stringNgayToiDa = ngayNhanNoToiDa.split('/')[2] + ngayNhanNoToiDa.split('/')[1] + ngayNhanNoToiDa.split('/')[0]
			var nam = ngayNhanNoToiThieu.split('/')[2]
			var thang = ngayNhanNoToiThieu.split('/')[1]
			var ngay = ngayNhanNoToiThieu.split('/')[0]
			var stringDate = nam + thang + ngay
			var ngayNhanNo = $("#NGAYNHANNO").val()
			var stringNgayNhanNo = ngayNhanNo.split('/')[2] + ngayNhanNo.split('/')[1] + ngayNhanNo.split('/')[0]
			// if (Number(stringNgayNhanNo) < Number(stringDate)) {
			// 	$("#NGAYNHANNO").val(ngayNhanNoToiThieu)
			// }
			// else
			// if (Number(stringNgayToiDa) < Number(stringNgayNhanNo)) {
			// 	$("#NGAYNHANNO").val(ngayNhanNoToiDa)
			// }
			// else
			// 	if (Number(dateMax) < Number(stringNgayNhanNo)) {
			// 		formatDate(maxDate).split('-')[ 0 ]
			// 		$("#NGAYNHANNO").val(formatDate(maxDate).split('-')[ 2 ] + '/' + formatDate(maxDate).split('-')[ 1 ] + '/' + formatDate(maxDate).split('-')[ 0 ])
			// 	}
		})
		$('body').on('change', '#KEHOACHVAYHANGNAMID', function (e) {
			e.preventDefault();
			if ($("#KEHOACHVAYHANGNAMID option:selected").attr('data-hopdong') !== 'null') {
				txtTenDuAnHopDong = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-duanhopdong')
			}
			else {
				txtTenDuAnHopDong = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-duanhopdong').split(')')[0].split('(')[1]
			}
			txtSoLanRut = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-solanrut')
			if ($("#KEHOACHVAYHANGNAMID option:selected").attr('data-loaitiente') !== 'null') {

				var txtLoaiTienTe = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-loaitiente')
			}
			else {
				var txtLoaiTienTe = 'VND'
			}
			let txtTienCP = $("#KEHOACHVAYHANGNAMID option:selected").attr('tien-cp')
			if (txtTienCP !== 'null') {
				tentiencp = JSON.parse(window.localStorage.getItem('TIENTE')).filter(a => a.TIENTEID == txtTienCP)[0].TEN
			}
			let txtLuyKeVonVayLai = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-luykevonvaylai')
			let txtLuyKeVonCapPhat = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-luykevoncapphat')
			let txtSoTienVayLaiToiDa = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-sotienvaylaitoida')
			let txtSoTienCapPhatToiDa = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-sotiencapphattoida')
			let txtNamKeHoach = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-namkehoach')
			let txtIdTienTe = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-idtiente')
			$("#GIAINGANTHEOKHNAM").val(txtNamKeHoach)
			$("#txtThongTinDuAnHopDong").text(txtTenDuAnHopDong);
			$("#LUYKEGIAINGANVAYLAI").val(formatMoney(txtLuyKeVonVayLai))
			$("#LUYKEGIAINGANCAPPHAT").val(formatMoney(txtLuyKeVonCapPhat))
			if (Number(txtSoTienVayLaiToiDa) == 0 && Number(txtSoTienCapPhatToiDa) == 0) {
				$("#MA").val('Kế hoạch này đã rút vốn hết')
				$("#MA").prop('disabled', true)
				$(".btnSave").prop('disabled', true)
				$("#SOTIENVAYLAITOIDA").val('0')
				$("#SOTIENCAPPHATTOIDA").val('0')
			}
			else {
				$("#MA").val('')
				$("#MA").prop('disabled', false)
				$(".btnSave").prop('disabled', false)
				$("#SOTIENVAYLAITOIDA").val(formatMoney(txtSoTienVayLaiToiDa))
				$("#SOTIENCAPPHATTOIDA").val(formatMoney(txtSoTienCapPhatToiDa))
			}
			$("#SOTIENGIAINGANVAYLAI").val(formatMoney(txtSoTienVayLaiToiDa))
			$("#SOTIENGIAINGANCAPPHAT").val(formatMoney(txtSoTienCapPhatToiDa))
			$("#LUYKEGIAINGANVAYLAITIENTE").text(txtLoaiTienTe)
			$("#NGUYENTECAPPHATTIENTE").text(tentiencp)
			$("#NGUYENTEVAYLAITIENTE").text(txtLoaiTienTe)
			$("#SOTIENVAYLAITOIDATIENTE").text(txtLoaiTienTe)
			$("#LUYKEGIAINGANCAPPHATTIENTE").text(tentiencp)
			$("#SOTIENCAPPHATTOIDATIENTE").text(tentiencp)
			$("#NGUYENTEVAYLAI").val(formatMoney(txtSoTienVayLaiToiDa))
			$("#NGUYENTECAPPHAT").val(formatMoney(txtSoTienCapPhatToiDa))
			$("#SOTIENGIAINGANVAYLAITIENTE").val(txtIdTienTe).trigger('change')
			$("#SOTIENGIAINGANCAPPHATTIENTE").val(txtTienCP).trigger('change');
			if ($("#KEHOACHVAYHANGNAMID").val()) {
				$(".btnSave").prop('disabled', false)
			} else {
				$(".btnSave").prop('disabled', true)
			}
			var resultNhaTaiTro = KeHoach.getnttbyid($("#KEHOACHVAYHANGNAMID option:selected").val())
			var optiont = ''
			if (resultNhaTaiTro.length > 0)
				resultNhaTaiTro.map(value => {
					optiont = optiont + "<option value='" + value.NHATAITROID + "'>" + value.TEN + "</option>"
				});

			$('#NHATAITROID').append(optiont)
			$("#NHATAITROID").select2()
			if ($("#KEHOACHVAYHANGNAMID option:selected").attr('cochetaichinh') == 'HH') {
				$("#SOTIENGIAINGANVAYLAI").prop('disabled', false)
				$("#SOTIENGIAINGANCAPPHAT").prop('disabled', false)
			}
			if ($("#KEHOACHVAYHANGNAMID option:selected").attr('cochetaichinh') == 'VL') {
				$("#SOTIENGIAINGANVAYLAI").prop('disabled', false)
				$("#SOTIENGIAINGANCAPPHAT").prop('disabled', true)
			}
			if ($("#KEHOACHVAYHANGNAMID option:selected").attr('cochetaichinh') == 'CP') {
				$("#SOTIENGIAINGANVAYLAI").prop('disabled', true)
				$("#SOTIENGIAINGANCAPPHAT").prop('disabled', false)
			}
		})
		$('body').on('change', '#SOTIENGIAINGANVAYLAITIENTE', function (e) {
			e.preventDefault();
			var gianguyente = JSON.parse(window.localStorage.getItem('TIENTE')).filter(a => a.MA == $("#NGUYENTEVAYLAITIENTE").text())
			if (gianguyente.length > 0) {

				gianguyente = gianguyente[0].BANRA.replace(',', '')
			}
			if (txtChuyenDoiTienTeBanRa = $("#SOTIENGIAINGANVAYLAITIENTE option:selected").attr('data-tygia'))
				txtChuyenDoiTienTeBanRa = $("#SOTIENGIAINGANVAYLAITIENTE option:selected").attr('data-tygia').replace(',', '')
			var nguyentevl = String($("#SOTIENGIAINGANVAYLAI").val().replaceAll(',', '') * txtChuyenDoiTienTeBanRa / gianguyente).split('.')[0]
			$("#NGUYENTEVAYLAI").val(formatMoney(nguyentevl))
			// let tyLeTyGia = 0;
			// if (txtTienTeBanRa) {
			// 	if (txtTienTeBanRa.includes(',') == true || txtChuyenDoiTienTeBanRa.includes(',') == true) {
			// 		var a = txtTienTeBanRa.replace(',', '');
			// 		var b = txtChuyenDoiTienTeBanRa.replace(',', '');
			// 		tyLeTyGia = parseFloat(b).toFixed(2) / parseFloat(a).toFixed(2)
			// 		var c = tyLeTyGia * $("#SOTIENGIAINGANVAYLAI").val().replaceAll(',', '');
			// 		$("#NGUYENTEVAYLAI").val(formatMoney(c))
			// 	}
			// 	else {
			// 		tyLeTyGia = parseFloat(txtChuyenDoiTienTeBanRa).toFixed(2) / parseFloat(txtTienTeBanRa).toFixed(2)
			// 		var d = tyLeTyGia * $("#SOTIENGIAINGANVAYLAI").val().replaceAll(',', '')
			// 		$("#NGUYENTEVAYLAI").val(formatMoney(d))
			// 	}
			// }
			// console.log(tyLeTyGia)
		})
		$('body').on('change', '#SOTIENGIAINGANCAPPHATTIENTE', function (e) {
			e.preventDefault();
			let txtTienTeBanRa1 = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-tientebanra')
			let txtChuyenDoiTienTeBanRa1 = $("#SOTIENGIAINGANCAPPHATTIENTE option:selected").attr('data-tygia')
			let tyLeTyGia1 = 0;
			if (txtTienTeBanRa1 && txtChuyenDoiTienTeBanRa1) {
				if (txtTienTeBanRa1.includes(',') == true || txtChuyenDoiTienTeBanRa1.includes(',') == true) {
					var a1 = txtTienTeBanRa1.replace(',', '');
					var b1 = txtChuyenDoiTienTeBanRa1.replace(',', '');
					tyLeTyGia1 = parseFloat(b1).toFixed(2) / parseFloat(a1).toFixed(2)
					var c1 = tyLeTyGia1 * $("#SOTIENGIAINGANCAPPHAT").val().replaceAll(',', '');
					$("#NGUYENTECAPPHAT").val(formatMoney(c1))
				}
				else {
					tyLeTyGia1 = parseFloat(txtChuyenDoiTienTeBanRa1).toFixed(2) / parseFloat(txtTienTeBanRa1).toFixed(2)
					var d1 = tyLeTyGia1 * $("#SOTIENGIAINGANCAPPHAT").val().replaceAll(',', '');
					$("#NGUYENTECAPPHAT").val(formatMoney(d1))
				}
			}
		})
		$('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()
			$("#Grid01").find('.selected').removeClass('selected');
			that.bindModal();
			$("#exampleModalLongTitle").text('Thêm mới đợt rút vốn(lần thứ ' + txtSoLanRut + ')')
			$("#KEHOACHVAYHANGNAMID").prop('disabled', false)
			$('#list_uploadfile').html('');
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
			idrutvon = 0;
			oDotRutVon.DOTRUTVONID = 0
			fnc_removeSpace();
			fnc_validateSpace("GHICHU");
			$("#DONVIID").val($("#DONVIID option:selected").attr('value')).select2()
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.bindModal();
			$("#exampleModalLongTitle").text('Sửa đợt rút vốn')
			$("#KEHOACHVAYHANGNAMID").prop('disabled', true)
			// $('#SOTIENGIAINGANVAYLAITIENTE').trigger('change')
			$("#MA").prop('disabled', false)
			$(".btnSave").prop('disabled', false)
			var data = JSON.parse(idrutvon)

			var xxx = Number($("#SOTIENVAYLAITOIDA").val().replaceAll(',', '')) + data.SOTIENGIAINGANVAYLAI
			$("#SOTIENVAYLAITOIDA").val(formatMoney(xxx))
			$("#KEHOACHVAYHANGNAMID").val(data.KEHOACHVAYHANGNAMID).trigger('change');
			$("#MA").val(data.MA);
			$("#PHUONGTHUCGIAINGAN").val(data.PHUONGTHUCGIAINGAN);
			$("#DONVIID").val(data.DONVIID).trigger('change');
			$("#NGAYNHANNO").val(data.NGAYNHANNO);
			$("#NHATAITROID").val(data.NHATAITROID).select2();
			$("#GIAINGANTHEOKHNAM").val(data.GIAINGANTHEOKHNAM);
			$("#SOTIENGIAINGANVAYLAI").val(formatMoney(data.SOTIENGIAINGANVAYLAI));
			$("#SOTIENVAYLAITOIDA").val(formatMoney(data.SOTIENGIAINGANVAYLAI));
			$("#SOTIENGIAINGANCAPPHAT").val(formatMoney(data.SOTIENGIAINGANCAPPHAT));
			$("#SOTIENCAPPHATTOIDA").val(formatMoney(data.SOTIENGIAINGANCAPPHAT));
			$("#SOTIENGIAINGANVAYLAITIENTE").val(data.SOTIENGIAINGANVAYLAITIENTE).trigger('change');
			$("#SOTIENGIAINGANCAPPHATTIENTE").val(data.SOTIENGIAINGANCAPPHATTIENTE).trigger('change');
			$("#NGUYENTEVAYLAI").val(formatMoney(data.NGUYENTEVAYLAI));
			$("#NGUYENTECAPPHAT").val(formatMoney(data.NGUYENTECAPPHAT));
			$("#GHICHU").val(data.GHICHU);
		});
		$('.ACTIONS').on('click', '#btnDelete', function (e) {
			e.preventDefault()
			if (!oDotRutVon.DOTRUTVONID) {
				var oAlert = new AlertDialog1('Cảnh báo');
				oAlert.show('Chưa chọn đợt rút vốn để xóa', '40%', '50px');
				return false;
			}

			function ok() {
				var rs = oDotRutVon.delete(JSON.parse(idrutvon).DOTRUTVONID);
				var oAlert = new AlertDialog1('Thông báo');
				oAlert.show(rs.MESSAGE, '40%', '50px');
				//reload sau khi delete
				that.bindGrid01();
				reload();
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
			String.prototype.replaceAll = function (search, replacement) {
				var target = this;
				return target.replace(new RegExp(search, 'g'), replacement);
			};
			var oAlert1 = new AlertDialog1('Thông báo');
			var nguyenTeVayLai = $("#NGUYENTEVAYLAI").val().replaceAll(',', '')
			var nguyenTeCapPhat = $("#NGUYENTECAPPHAT").val().replaceAll(',', '')
			var soTienVayLaiToiDa = $("#SOTIENVAYLAITOIDA").val().replaceAll(',', '')
			var soTienCapPhatToiDa = $("#SOTIENCAPPHATTOIDA").val().replaceAll(',', '')
			if (parseInt(nguyenTeVayLai) > parseInt(soTienVayLaiToiDa)) {
				oAlert1.show('Nguyên tệ vay lại phải nhỏ hơn số tiền vay lại tối đa được rút', '40%', '50px');
			}
			else
				if (parseInt(nguyenTeCapPhat) > parseInt(soTienCapPhatToiDa)) {
					oAlert1.show('Nguyên tệ cấp phát phải nhỏ hơn số tiền cấp phát tối đa được rút', '40%', '50px');
				}
				else
					if ($("#MA").val().length == 0) {
						oAlert1.show('Mã không được để trống', '40%', '50px');
					} else {

						oDotRutVon.KEHOACHVAYHANGNAMID = $("#KEHOACHVAYHANGNAMID").val();
						oDotRutVon.MA = $('#MA').val();
						oDotRutVon.PHUONGTHUCGIAINGAN = $('#PHUONGTHUCGIAINGAN').val();
						oDotRutVon.NGAYNHANNO = $('#NGAYNHANNO').val();
						oDotRutVon.GIAINGANTHEOKHNAM = $('#GIAINGANTHEOKHNAM').val();
						oDotRutVon.SOTIENGIAINGANVAYLAI = $("#SOTIENGIAINGANVAYLAI").val().replaceAll(',', '');
						oDotRutVon.SOTIENGIAINGANVAYLAITIENTE = $("#SOTIENGIAINGANVAYLAITIENTE").val().replaceAll(',', '');
						oDotRutVon.SOTIENGIAINGANCAPPHAT = $("#SOTIENGIAINGANCAPPHAT").val().replaceAll(',', '');
						oDotRutVon.SOTIENGIAINGANCAPPHATTIENTE = $("#SOTIENGIAINGANCAPPHATTIENTE").val().replaceAll(',', '');
						oDotRutVon.NGUYENTEVAYLAI = $("#NGUYENTEVAYLAI").val().replaceAll(',', '');
						oDotRutVon.NGUYENTEVAYLAITIENTE = $("#NGUYENTEVAYLAITIENTE").val().replaceAll(',', '');
						oDotRutVon.NGUYENTECAPPHAT = $("#NGUYENTECAPPHAT").val().replaceAll(',', '');
						oDotRutVon.NGUYENTECAPPHATTIENTE = $("#NGUYENTECAPPHATTIENTE").val().replaceAll(',', '');
						oDotRutVon.GHICHU = $('#GHICHU').val();
						oDotRutVon.DONVIID = $('#DONVIID').val();
						oDotRutVon.NHATAITROID = $("#NHATAITROID").val()
						oDotRutVon.UUID = uuidv4();
						var rs = oDotRutVon.save();
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
								oDotRutVon.deluid(rs.RESULT)
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
		});

		$('#Grid01 tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				oDotRutVon.DOTRUTVONID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				idrutvon = $(this).find('.rowID').text();
				oDotRutVon.DOTRUTVONID = JSON.parse(idrutvon).DOTRUTVONID;
				that.filterAction('SELECT');
			}
		});
	});
}