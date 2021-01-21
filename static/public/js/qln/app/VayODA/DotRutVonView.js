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
	var oHopDong = new HopDongVayLai();
	var NhaTaiTros = new NhaTaiTro();
	var TienTes = new DonViTienTe();
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
				_item.nguyentecapphat = formatMoney(_item.NGUYENTECAPPHAT);
				_item.luykevaylai = formatMoney(_item.LUYKERUTVONVAYLAI);
				_item.luykecapphat = formatMoney(_item.LUYKERUTVONCAPPHAT);
				if (_item.MADUAN) {
					_item.tenduan = _item.TENDUAN
					_item.tenhodong = _item.TENHOPDONG
					_item.luykekhcapphat = _item.LUYKERUTVONCAPPHAT
					_item.nguyentevaylai = formatMoney(_item.NGUYENTEVAYLAI);
				}
				else {
					_item.tenduan = _item.TENDA
					_item.tenhodong = '100% cấp phát'
					_item.luykekhcapphat = _item.LUYKECAPPHAT
					_item.nguyentevaylai = '';
				}
				if (_item.TIENTEID == 19) {
					_item.vaylaivnd = _item.nguyentevaylai;
					_item.capphatvnd = _item.nguyentecapphat
				}
				else {
					var arrMoney = JSON.parse(localStorage.getItem("TIENTE"))
					arrMoney.map(value => {
						if (value.TIENTEID == _item.TIENTEID) {
							var banRa = value.BANRA.split('.')[0].replace(',', '')
							_item.vaylaivnd = formatMoney(Number(banRa) * Number(_item.NGUYENTEVAYLAI))
							_item.capphatvnd = formatMoney(Number(banRa) * Number(_item.NGUYENTECAPPHAT))
						}
					})
				}
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
					_item.GIAINGANTHEOKHNAM,
					_item.MASOTHAMCHIEU,
					_item.tenhodong,
					_item.tenduan,
					_item.TENDONVI,
					_item.NGAYNHANNO,
					_item.vaylaivnd,
					_item.nguyentevaylai,
					_item.luykevaylai,
					_item.capphatvnd,
					_item.nguyentecapphat,
					formatMoney(_item.luykekhcapphat),
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
		oHopDong.getAll();
		oDotRutVon.getAll();
		DuAns.getAll();
		$("#DONVIID").html(fnc_danhsachdonvi())
		TienTes.getAll();
		var resultTienTe = TienTes.LIST
		var option = ''
		resultTienTe.map(value => {
			option = option + "<option data-tygia='" + value.BANRA + "' value='" + value.TIENTEID + "'>" + value.MA + "</option>"
		})
		$('#SOTIENGIAINGANVAYLAITIENTE').html(option)
		$('#SOTIENGIAINGANCAPPHATTIENTE').html(option)
		KeHoach.getAll();
		var resultKeHoach = KeHoach.LIST
		var option2 = ''
		if (resultKeHoach) {
			resultKeHoach.map((value, index) => {
				if (value.STATUS_APPROVE + '' === '3') {
					option2 = option2 + "<option cochetaichinh='" + value.COCHETAICHINH + "' tien-cp='" + value.IDTIENTEDUOCRUTDUAN + "' data-ngaynhannotoida='" + value.NGAYNHANNOTOIDA + "' data-ngaynhanno='" + value.NGAYNHANNOTOITHIEU + "' data-tientebanra='" + value.TIENTEBANRA + "' data-idtiente='" + value.IDTIENTEDUOCRUTDUAN + "' data-loaitiente='" + value.MATIENTEDUOCRUTDUAN + "' data-solanrut='" + value.SOLANKEHOACH + "' data-luykevonvaylai='" + value.LUYKERUTVONVAYLAI + "' data-luykevoncapphat='" + value.LUYKERUTVONCAPPHAT + "' data-sotienvaylaitoida='" + value.SOTIENVAYLAITOIDA + "' data-sotiencapphattoida='" + value.SOTIENCAPPHATTOIDA + "' data-namkehoach='" + value.NAMKEHOACH + "' data-hopdong='" + value.MAHOPDONG + "'   data-duanhopdong ='" + "(Dự án: " + value.MADUAN + " - " + value.TENDUAN + ") - (Hợp đồng: " + value.MAHOPDONG + " - " + value.TENHOPDONG + ")'" + " value=" + value.KEHOACHVAYHANGNAMID + ">" + value.COCHETAICHINH + " * " + value.TEN + "</option>"
				}
			})
		}
		$("#KEHOACHVAYHANGNAMID").html(option2);
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
		$('body').on('keyup', '#SOTIENGIAINGANVAYLAI', function () {
			if (JSON.parse(idrutvon).DOTRUTVONID > 0) {
				$("#SOTIENGIAINGANVAYLAITIENTE").trigger('change')
			}
			else {
				var txtSoTienVayLaiToiDa = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-sotienvaylaitoida')
				var txtSoTienCapPhatToiDa = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-sotiencapphattoida')
				var txtTienTeId = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-idtiente')
				var txtTyGia = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-tientebanra').replace(',', '')
				var txtTyGiaTienRut = $("#SOTIENGIAINGANVAYLAITIENTE option:selected").attr('data-tygia').replace(',', '')
				var soTienRutToiDa = Number(txtSoTienVayLaiToiDa) + Number(txtSoTienCapPhatToiDa)
				if (txtTienTeId == $("#SOTIENGIAINGANVAYLAITIENTE").val()) {
					if (Number($(this).val().replaceAll(',', '')) > Number(soTienRutToiDa)) {
						$(this).val(formatMoney(soTienRutToiDa))
					}
				} else {
					var soTienRutKhac = String($(this).val().replaceAll(',', '') * txtTyGiaTienRut / txtTyGia).split('.')[0]
					var soTienRut = String(soTienRutToiDa * txtTyGia / txtTyGiaTienRut).split('.')[0]
					if (Number(soTienRutKhac) > Number(soTienRutToiDa)) {
						$(this).val(formatMoney(soTienRut))
					}
				}
				$("#SOTIENGIAINGANVAYLAITIENTE").trigger('change')
			}
		});
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
			var tongSoTienRut = Number(txtSoTienVayLaiToiDa) + Number(txtSoTienCapPhatToiDa)
			$("#SOTIENGIAINGANVAYLAI").val(formatMoney(tongSoTienRut))
			$("#SOTIENGIAINGANCAPPHAT").val(formatMoney(txtSoTienCapPhatToiDa))
			$("#LUYKEGIAINGANVAYLAITIENTE").text(txtLoaiTienTe)
			$("#NGUYENTECAPPHATTIENTE").text(tentiencp)
			TienTes.getAll();
			$("#NGUYENTEVAYLAITIENTE").text(txtLoaiTienTe)
			$("#SOTIENVAYLAITOIDATIENTE").text(txtLoaiTienTe)
			$("#LUYKEGIAINGANCAPPHATTIENTE").text(tentiencp)
			$("#SOTIENCAPPHATTOIDATIENTE").text(tentiencp)
			$("#NGUYENTEVAYLAI").val(formatMoney(txtSoTienVayLaiToiDa))
			$("#NGUYENTECAPPHAT").val(formatMoney(txtSoTienCapPhatToiDa))
			$("#SOTIENGIAINGANVAYLAITIENTE").val(txtIdTienTe).trigger('change')
			$("#SOTIENGIAINGANCAPPHATTIENTE").val(txtTienCP).trigger('change')
			if ($("#KEHOACHVAYHANGNAMID").val()) {
				$(".btnSave").prop('disabled', false)
			} else {
				$(".btnSave").prop('disabled', true)
			}
			var optiont = ''
			var getNHATAITROID = KeHoach.getnhataitro($("#KEHOACHVAYHANGNAMID option:selected").val())
			if (getNHATAITROID.length > 0 && getNHATAITROID[0].NHATAITROID != null) {
				var arrNhaTaiTroId = getNHATAITROID[0].NHATAITROID.split("@")
				for (var i = 0; i < arrNhaTaiTroId.length; i++) {
					NhaTaiTros.getAll();
					var oNhaTaiTro = NhaTaiTros.LIST;
					oNhaTaiTro.map(valueNhaTaiTro => {
						if (Number(valueNhaTaiTro.NHATAITROID) == Number(arrNhaTaiTroId[i])) {
							optiont = optiont + "<option value='" + valueNhaTaiTro.NHATAITROID + "'>" + valueNhaTaiTro.TEN + "</option>"
						}
					})
				}
				$('#NHATAITROID').html(optiont)
				$("#NHATAITROID").val($("#NHATAITROID option:selected").attr('value')).select2()
			}
			$('#NHATAITROID').html(optiont)
			$("#NHATAITROID").select2()
			if ($("#KEHOACHVAYHANGNAMID option:selected").attr('cochetaichinh') == 'HH') {
				$("#PHANTRAMVAYLAI").prop('disabled', false)
				$("#PHANTRAMVAYLAI").val('')
			}
			if ($("#KEHOACHVAYHANGNAMID option:selected").attr('cochetaichinh') == 'VL') {
				$("#PHANTRAMVAYLAI").prop('disabled', true)
				$("#PHANTRAMVAYLAI").val('100')
			}
			if ($("#KEHOACHVAYHANGNAMID option:selected").attr('cochetaichinh') == 'CP') {
				$("#PHANTRAMVAYLAI").prop('disabled', true)
				$("#PHANTRAMVAYLAI").val('0')
			}
		});
		$('body').on('change', '#SOTIENGIAINGANVAYLAITIENTE', function (e) {
			e.preventDefault();
			var gianguyente = JSON.parse(window.localStorage.getItem('TIENTE')).filter(a => a.MA == $("#NGUYENTEVAYLAITIENTE").text())
			if (gianguyente.length > 0) {
				gianguyente = gianguyente[0].BANRA.replace(',', '')
			}
			txtChuyenDoiTienTeBanRa = $("#SOTIENGIAINGANVAYLAITIENTE option:selected").attr('data-tygia').replace(',', '')
			if (txtChuyenDoiTienTeBanRa == gianguyente) {
				$("#NGUYENTEVAYLAI").val(formatMoney($("#SOTIENGIAINGANVAYLAI").val().replaceAll(',', '')))
			}
			else {
				var nguyentevl = String($("#SOTIENGIAINGANVAYLAI").val().replaceAll(',', '') * txtChuyenDoiTienTeBanRa / gianguyente).split('.')[0]
				$("#NGUYENTEVAYLAI").val(formatMoney(nguyentevl))
			}
		});
		$('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault();
			$("#Grid01").find('.selected').removeClass('selected');
			that.bindModal();
			$("#exampleModalLongTitle").text('Thêm mới đợt rút vốn(lần thứ ' + txtSoLanRut + ')');
			$("#KEHOACHVAYHANGNAMID").prop('disabled', false);
			$('#list_uploadfile').html('');
			$("#NGAYNHANNO").val($.datepicker.formatDate('dd/mm/yy', new Date()));
			$('#GIATRIGIAINGANVAYLAI').val('');
			$('#LUYKEGIAINGANVAYLAI').val('');
			$('#GHICHU').val('');
			$("#DONVIID").val($("#DONVIID option:selected").attr('value')).select2();
			idrutvon = 0;
			oDotRutVon.DOTRUTVONID = 0;
			fnc_removeSpace();
			fnc_validateSpace("GHICHU");
			$("#SOTIENGIAINGANVAYLAITIENTE").prop('disabled', false)
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.bindModal();
			$("#exampleModalLongTitle").text('Sửa đợt rút vốn');
			$("#KEHOACHVAYHANGNAMID").prop('disabled', true);
			$(".btnSave").prop('disabled', false);
			var data = JSON.parse(idrutvon);
			$("#KEHOACHVAYHANGNAMID").val(data.KEHOACHVAYHANGNAMID).trigger('change');
			$("#MA").val(data.MASOTHAMCHIEU);
			$("#MA").prop('disabled', false);
			$("#PHUONGTHUCGIAINGAN").val(data.PHUONGTHUCGIAINGAN).select2();
			$("#DONVIID").val(data.DONVIID).select2();
			$("#NGAYNHANNO").val(data.NGAYNHANNO);
			$("#NHATAITROID").val(data.NHATAITROID).select2();
			$("#GIAINGANTHEOKHNAM").val(data.GIAINGANTHEOKHNAM);
			$("#SOTIENGIAINGANVAYLAI").val(formatMoney(Number(data.SOTIENGIAINGANVAYLAI + data.SOTIENGIAINGANCAPPHAT)));
			$("#SOTIENVAYLAITOIDA").val(formatMoney(data.SOTIENGIAINGANVAYLAI));
			$("#SOTIENGIAINGANCAPPHAT").val(formatMoney(data.SOTIENGIAINGANCAPPHAT));
			$("#SOTIENCAPPHATTOIDA").val(formatMoney(data.SOTIENGIAINGANCAPPHAT));
			$("#SOTIENGIAINGANVAYLAITIENTE").val(data.SOTIENGIAINGANVAYLAITIENTE).select2();
			$("#SOTIENGIAINGANCAPPHATTIENTE").val(data.SOTIENGIAINGANCAPPHATTIENTE);
			$("#NGUYENTEVAYLAI").val(formatMoney(Number(data.NGUYENTEVAYLAI + data.NGUYENTECAPPHAT)));
			$("#NGUYENTECAPPHAT").val(formatMoney(data.NGUYENTECAPPHAT));
			$("#GHICHU").val(data.GHICHU);
			$("#PHANTRAMVAYLAI").val(data.PHANTRAMVAYLAI);
			$("#SOTIENGIAINGANVAYLAITIENTE").prop('disabled', true);
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
		});
		document.getElementsByName("userPhoto")[0].addEventListener("click", fileUpload);
		function fileUpload(e){
			var targetAfterX = e.offsetX >= 0 && e.offsetX <= 81;
			var targetAfterY = e.offsetY >= 0 && e.offsetY <= 40;
			if(targetAfterX && targetAfterY){
			}else{
				e.preventDefault();
			}
		}
		$(".btnSave").on('click', function (e) {
			if (isDoubleClicked($(this))) return;
			e.preventDefault()
			String.prototype.replaceAll = function (search, replacement) {
				var target = this;
				return target.replace(new RegExp(search, 'g'), replacement);
			};
			var oAlert1 = new AlertDialog1('Thông báo');

			if ($("#MA").val().length == 0) {
				oAlert1.show('Mã không được để trống', '40%', '50px');
			} else
				if ($("#PHANTRAMVAYLAI").val().length == 0) {
					oAlert1.show('Tỷ lệ cho vay lại không được để trống', '40%', '50px');
				} else {
					oDotRutVon.KEHOACHVAYHANGNAMID = $("#KEHOACHVAYHANGNAMID").val();
					oDotRutVon.MA = fnc_createCode('DRV');
					oDotRutVon.MASOTHAMCHIEU = $('#MA').val();
					oDotRutVon.PHUONGTHUCGIAINGAN = $('#PHUONGTHUCGIAINGAN').val();
					oDotRutVon.NGAYNHANNO = $('#NGAYNHANNO').val();
					oDotRutVon.GIAINGANTHEOKHNAM = $('#GIAINGANTHEOKHNAM').val();
					oDotRutVon.SOTIENGIAINGANVAYLAI = Number($("#SOTIENGIAINGANVAYLAI").val().replaceAll(',', '') * $("#PHANTRAMVAYLAI").val() / 100);
					oDotRutVon.SOTIENGIAINGANVAYLAITIENTE = $("#SOTIENGIAINGANVAYLAITIENTE").val();
					oDotRutVon.SOTIENGIAINGANCAPPHAT = Number($("#SOTIENGIAINGANVAYLAI").val().replaceAll(',', '')) - Number($("#SOTIENGIAINGANVAYLAI").val().replaceAll(',', '') * $("#PHANTRAMVAYLAI").val() / 100);
					oDotRutVon.SOTIENGIAINGANCAPPHATTIENTE = $("#SOTIENGIAINGANVAYLAITIENTE").val();
					oDotRutVon.NGUYENTEVAYLAI = Number($("#NGUYENTEVAYLAI").val().replaceAll(',', '') * $("#PHANTRAMVAYLAI").val() / 100);
					oDotRutVon.NGUYENTEVAYLAITIENTE = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-idtiente');
					oDotRutVon.NGUYENTECAPPHAT = Number($("#NGUYENTEVAYLAI").val().replaceAll(',', '')) - Number($("#NGUYENTEVAYLAI").val().replaceAll(',', '') * $("#PHANTRAMVAYLAI").val() / 100);
					oDotRutVon.NGUYENTECAPPHATTIENTE = $("#KEHOACHVAYHANGNAMID option:selected").attr('data-idtiente');
					oDotRutVon.GHICHU = $('#GHICHU').val();
					oDotRutVon.DONVIID = $('#DONVIID').val();
					oDotRutVon.NHATAITROID = $("#NHATAITROID").val();
					oDotRutVon.PHANTRAMVAYLAI = $("#PHANTRAMVAYLAI").val();
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
				console.log(JSON.parse(idrutvon), 'JSON.parse(idrutvon)');
				that.filterAction('SELECT');
			}
		});
	});
}