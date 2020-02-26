var MenhGiaTraiPhieu;
var NgayDaoHanTraiPhieu;
var optionMenhGia = '';
var optionMenhGia1 = '';
const NgayHomNay = $.datepicker.formatDate('yy-mm-dd', new Date());
var MuaLaiTPView = function () {
	var idMuaLaiTP = 0;
	var that = this;
	this.AppTitle = 'Mua lại trái phiếu';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oMuaLaiTP = new MuaLaiTP();

	this.init = function () {
		that.bindGrid01();
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
	}
	this.bindGrid01 = function () {
		oMuaLaiTP.getAll();
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < oMuaLaiTP.LIST.length; i++) {
			var _item = oMuaLaiTP.LIST[i];
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.MUALAITRAIPHIEUID + '" />';
			var download = ''
			if (_item.URL) {
				download = '<button  val="' + _item.URL + '" class= "btn btn-primary btnTaixuong" >Tải xuống</button>'
			}
			else {
				download = ''
			}
			aRows.push([
				(i + 1) + _hidden,
				_item.TENDEAN,
				_item.MA,
				_item.TEN,
				_item.NGAYTOCHUCMUA,
				_item.NGAYCUOIDANGKY,
				_item.PHUONGTHUCMUA,
				formatMoney(_item.GIA),
				formatMoney(_item.TONGSOTIENMUALAI),
				formatMoney(_item.KHOILUONGMUALAI),
				download
			]);
		}
		that.oTable.rows.add(aRows).draw();
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
	this.reSetDetail = function () {
		$('#table-multi').html('')
	}
	this.bindModal = function () {
		String.prototype.replaceAll = function (search, replacement) {
			var target = this;
			return target.replace(new RegExp(search, 'g'), replacement);
		};
		$(document).ready(() => {
			var DeAns = new DeAnPHTP()
			DeAns.getAll();
			var option = ""
			var start = Date.now();
			$("#MA").val('DMLTP-' + start + Math.floor(Math.random() * 10))
			var resultDeAns = DeAns.LIST
			resultDeAns.map(value => {
				if (value.SOQUYETDINH) {
					option = option + "<option data-menhgia-ngaydaohan ='" + value.MENHGIA + '@' + value.KYHANTHANHTOAN + "' data-phuongthuc='" + value.PHUONGTHUCPHATHANH + "' data-laisuat='" + value.LAISUATPHATHANH + "' data-toida='" + value.TOIDADUOCPHATHANH + "' data-ma='" + value.MA + "' data-maDotPhatHanh='" + "PHTP/" + value.MA + "/" + value.SOQUYETDINH + "/" +
						(value.DOTMUALAI < 10 ? ("00" + value.DOTMUALAI) : value.DOTMUALAI < 100 ? ("0" + value.DOTMUALAI) : value.DOTMUALAI) +
						"' data-dotphathanh='" + value.DOTMUALAI + "' data-chitiet= '" +
						"QĐ số: " + value.SOQUYETDINH +
						"; Ngày phát hành: " + value.THOIGIANPHATHANH +
						"; Ngày đáo hạn: " + value.KYHANTHANHTOAN +
						"; Loại " + (value.NGAYKYHANTRAIPHIEU < 5 ? "ngắn hạn" : value.NGAYKYHANTRAIPHIEU < 12 ? "trung hạn" : "dài hạn") +
						"; Khối lượng: " + formatMoney(value.KHOILUONGPHATHANH) +
						" VNĐ; Mệnh giá: " + value.MENHGIA + " VNĐ" +
						"; Lãi suất: " + value.LAISUATPHATHANH + "%" +
						"' data-kyhantraiphieu='" + value.NGAYKYHANTRAIPHIEU + "' value='" + value.DEANPHATHANHTRAIPHIEUID + "'>" + value.TEN + "</option>"
				}
				else {
					option = option + "<option data-menhgia-ngaydaohan ='" + value.MENHGIA + '@' + value.KYHANTHANHTOAN + "' data-phuongthuc='" + value.PHUONGTHUCPHATHANH + "' data-laisuat='" + value.LAISUATPHATHANH + "' data-toida='" + value.TOIDADUOCPHATHANH + "' data-ma='" + value.MA + "' data-maDotPhatHanh='" + "PHTP/" + value.MA + "/" +
						(value.DOTMUALAI < 10 ? ("00" + value.DOTMUALAI) : value.DOTMUALAI < 100 ? ("0" + value.DOTMUALAI) : value.DOTMUALAI) +
						"' data-dotphathanh='" + value.DOTMUALAI + "' data-chitiet= '" +
						"Ngày phát hành: " + value.THOIGIANPHATHANH +
						"; Ngày đáo hạn: " + value.KYHANTHANHTOAN +
						"; Loại " + (value.NGAYKYHANTRAIPHIEU < 5 ? "ngắn hạn" : value.NGAYKYHANTRAIPHIEU < 12 ? "trung hạn" : "dài hạn") +
						"; Khối lượng: " + formatMoney(value.KHOILUONGPHATHANH) +
						" VNĐ; Mệnh giá: " + value.MENHGIA + " VNĐ" +
						"; Lãi suất: " + value.LAISUATPHATHANH + "%" +
						"' data-kyhantraiphieu='" + value.NGAYKYHANTRAIPHIEU + "' value='" + value.DEANPHATHANHTRAIPHIEUID + "'>" + value.TEN + "</option>"
				}
			})
			$('#DEANPHATHANHTRAIPHIEUID').html(option).trigger('change')
			$('body').on('change', '#DEANPHATHANHTRAIPHIEUID', function () {
				let dataChiTiet = $("#DEANPHATHANHTRAIPHIEUID option:selected").attr('data-chitiet')
				let dataDotPhatHanh = $("#DEANPHATHANHTRAIPHIEUID option:selected").attr('data-dotphathanh')
				$("#txtThongTinDuAnHopDong").text(dataChiTiet)
				$("#exampleModalLongTitle").text('Thêm mới đợt mua lại trái phiếu (Lần thứ ' + dataDotPhatHanh + ')')
				$("#TEN").val('Đợt mua lại trái phiếu (Mã đề án: ' + $("#DEANPHATHANHTRAIPHIEUID option:selected").attr('data-ma') + ');(Lần thứ: ' + $("#DEANPHATHANHTRAIPHIEUID option:selected").attr('data-dotphathanh') + ')')
				$("#LAISUAT").val($("#DEANPHATHANHTRAIPHIEUID option:selected").attr('data-laisuat'))
				var MenhGiaNgayDaoHan = $("#DEANPHATHANHTRAIPHIEUID option:selected").attr('data-menhgia-ngaydaohan');
				MenhGiaTraiPhieu = MenhGiaNgayDaoHan.split('@')[0];
				optionMenhGia = '';
				MenhGiaTraiPhieu.split(';').map(value => {
					var vConvertGiaTri = fnc_replace(value.split('.').join(), ',', '')
					if (String(vConvertGiaTri).length > 1) {
						optionMenhGia = optionMenhGia + "<option value='" + vConvertGiaTri + "'>" + formatMoney(vConvertGiaTri) + " VNĐ</option>"
					}
				})
				NgayDaoHanTraiPhieu = MenhGiaNgayDaoHan.split('@')[1].split('/')[2] + '-' + MenhGiaNgayDaoHan.split('@')[1].split('/')[1] + "-" + MenhGiaNgayDaoHan.split('@')[1].split('/')[0];
				fnc_loadChiTietTheoDeAn();
			})
			$('body').on('change', '#GIA', function () {
				var giaMuaLai = fnc_replace($("#GIA").val(), ',', '');
				$('.TIEN').map((index, value) => {
					var vThanhTien = fnc_nvl(fnc_replace($(value).val(), ',', ''), 0)
					var vThanhTienMuaLai = (Number(vThanhTien) * Number(fnc_nvl(giaMuaLai, 0))) / 100000;
					$(value).parent().parent().find(".TIENMUALAI").val(formatMoney(vThanhTienMuaLai));
				})
				var SoLuong = fnc_replace($(this).parent().parent().find(".SOLUONG").val(), ',', '');
				var MenhGia = $(this).parent().parent().find(".GIA").val();
				fnc_sumUpAll();
			})
		})
	}

	this.bindModalEdit = function () {
		oMuaLaiTP.getById(idMuaLaiTP);
		oMuaLaiTP.getByIdCha(oMuaLaiTP.MA);
		$('#MA').val(oMuaLaiTP.MA);
		$('#TEN').val(oMuaLaiTP.TEN);
		$('#NGAYCUOIDANGKY').val(oMuaLaiTP.NGAYCUOIDANGKY);
		$('#NGAYPHONGTOA').val(oMuaLaiTP.NGAYPHONGTOA);
		$('#NGAYTOCHUCMUA').val(oMuaLaiTP.NGAYTOCHUCMUA);
		$('#NGAYMUALAI').val(oMuaLaiTP.NGAYMUALAI);
		$('#PHUONGTHUCMUA').val(oMuaLaiTP.PHUONGTHUCMUA);
		$('#CHUSOHUUTP').val(oMuaLaiTP.CHUSOHUUTP);
		$('#TINHTHANHID').val(oMuaLaiTP.TINHTHANHID);
		$('#DEANPHATHANHTRAIPHIEUID').val(oMuaLaiTP.DEANPHATHANHTRAIPHIEUID);
		$('#TOCHUCMUALAI').val(oMuaLaiTP.TOCHUCMUALAI);
		$('#TONGSOTIENMUALAI').val(formatMoney(oMuaLaiTP.TONGSOTIENMUALAI));
		$('#GIA').val(formatMoney(oMuaLaiTP.GIA));
		$('#LAISUAT').val(oMuaLaiTP.LAISUAT);
		$('#KHOILUONGMUALAI').val(oMuaLaiTP.KHOILUONGMUALAI);
		$('#STATUS').val(oMuaLaiTP.STATUS);
		$('#CREATEDDATE').val(oMuaLaiTP.CREATEDDATE);
		$('#CREATEDBY').val(oMuaLaiTP.CREATEDBY);
		$('#UPDATEDDATE').val(oMuaLaiTP.UPDATEDDATE);
		$('#UPDATEDBY').val(oMuaLaiTP.UPDATEDBY);
		$("#DEANPHATHANHTRAIPHIEUID").prop('disabled', true)
		$("#DEANPHATHANHTRAIPHIEUID").trigger('change')
		$("#exampleModalLongTitle").text('Sửa đợt mua lại trái phiếu')
	}

	$(function () {

		that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
		that.oDialog = new PopupDialog(reload);
		that.init();

		function reload() {
			that.bindGrid01();
			that.filterAction('NEW');
			that.bindGrid01();
		}
		$('body').on('keyup', '#MA', function () {
			if ($('#MA').val().length > 200) {
				var oAlert = new AlertDialog1('Thông báo');
				oAlert.show('Mã quá dài, vui lòng nhập lại', '40%', '50px');
				$('#MA').val('')
			}
		})
		$('body').on('blur', '#NGAYCUOIDANGKY', function () {
			$("#NGAYTOCHUCMUA").trigger('blur')
			$(".NGAYMUA").trigger('change')
			$(".NGAYPHONGTOA").trigger('change')
		})
		$('body').on('blur', '#NGAYTOCHUCMUA', function () {
			var ngayToChucMua = new Date($("#NGAYTOCHUCMUA").val().split('/')[2] + '-' + $("#NGAYTOCHUCMUA").val().split('/')[1] + '-' + $("#NGAYTOCHUCMUA").val().split('/')[0])
			var ngayCuoiDangKy = new Date($("#NGAYCUOIDANGKY").val().split('/')[2] + '-' + $("#NGAYCUOIDANGKY").val().split('/')[1] + '-' + $("#NGAYCUOIDANGKY").val().split('/')[0])
			if (ngayToChucMua > ngayCuoiDangKy) {
				$("#NGAYTOCHUCMUA").val($("#NGAYCUOIDANGKY").val())
			}
			else {
				return;
			}
			$(".NGAYMUA").trigger('change')
		})
		$('.price').on('change', '.NGAYPHONGTOA', function () {
			var ngayCuoiDangKy = new Date($("#NGAYCUOIDANGKY").val().split('/')[2] + '-' + $("#NGAYCUOIDANGKY").val().split('/')[1] + '-' + $("#NGAYCUOIDANGKY").val().split('/')[0])
			var ngayPhongToa = new Date($(this).val())
			if (ngayCuoiDangKy > ngayPhongToa) {
				$(this).val($("#NGAYCUOIDANGKY").val().split('/')[2] + '-' + $("#NGAYCUOIDANGKY").val().split('/')[1] + '-' + $("#NGAYCUOIDANGKY").val().split('/')[0])
			}
			else {
				return;
			}
		})
		$('.price').on('change', '.NGAYMUA', function () {
			Number.prototype.between = function (a, b, inclusive) {
				var min = Math.min.apply(Math, [a, b]),
					max = Math.max.apply(Math, [a, b]);
				return inclusive ? this >= min && this <= max : this > min && this < max;
			};
			var ngayCuoiDangKyMuaLai = $("#NGAYCUOIDANGKY").val().split('/')[2] + $("#NGAYCUOIDANGKY").val().split('/')[1] + $("#NGAYCUOIDANGKY").val().split('/')[0]
			var ngayToChucMuaLai = $("#NGAYTOCHUCMUA").val().split('/')[2] + $("#NGAYTOCHUCMUA").val().split('/')[1] + $("#NGAYTOCHUCMUA").val().split('/')[0]
			var ngayMua = $(this).val().split('-').join('')
			if (Number(ngayMua).between(Number(ngayToChucMuaLai), Number(ngayCuoiDangKyMuaLai), true)) {
				// $("#"+$(this).attr('id').replace('NGAYMUA', 'SOLUONG')).trigger('keyup')
			}
			else {
				$(this).val($("#NGAYTOCHUCMUA").val().split('/')[2] + '-' + $("#NGAYTOCHUCMUA").val().split('/')[1] + '-' + $("#NGAYTOCHUCMUA").val().split('/')[0])
			}
		})
		$('.price').on('keyup', '.SOLUONG', function () {
			var dotphathanh = $("#" + $(this).attr('id').replace('SOLUONG', 'DOTPHATHANH')).val()
			var chusohuu = $("#" + $(this).attr('id').replace('SOLUONG', 'TOCHUC')).val()
			var menhgia = $("#" + $(this).attr('id').replace('SOLUONG', 'GIA')).val()
			var data = {
				dotphathanh: dotphathanh,
				chusohuu: chusohuu,
				menhgia: menhgia
			}
			var soLuongToiDa = oMuaLaiTP.getMaxQuantity(data)
			if (Number(fnc_replace($(this).val(), ',', '')) > soLuongToiDa[0].SOLUONGMUA) {
				$(this).val(formatMoney(soLuongToiDa[0].SOLUONGMUA))
				fnc_onKeyUpKhoiLuong($(this))
			}
			else {
				var arrObj = [];
				var list_tr_DOTPHATHANH = $('.input-table .DOTPHATHANH')
				var list_tr_TOCHUC = $('.input-table .TOCHUC')
				var list_tr_GIA = $('.input-table .GIA')
				var list_tr_NGAYMUA = $('.input-table .NGAYMUA')
				var list_tr_SOLUONG = $('.input-table .SOLUONG')
				var r_list_tr_DOTPHATHANH = []
				var r_list_tr_TOCHUC = []
				var r_list_tr_GIA = []
				var r_list_tr_NGAYMUA = []
				var r_list_tr_SOLUONG = []
				var r_list_tr_SOLUONG1 = []
				list_tr_DOTPHATHANH.map((index, value) => {
					r_list_tr_DOTPHATHANH.push($(value).val())
				})
				list_tr_TOCHUC.map((index, value) => {
					r_list_tr_TOCHUC.push($(value).val())
				})
				list_tr_GIA.map((index, value) => {
					r_list_tr_GIA.push($(value).val())
				})
				list_tr_NGAYMUA.map((index, value) => {
					r_list_tr_NGAYMUA.push($(value).val())
				})
				list_tr_SOLUONG.map((index, value) => {
					r_list_tr_SOLUONG.push($(value).attr('id'))
					r_list_tr_SOLUONG1.push($(value).val())
				})
				for (var i = 0; i < r_list_tr_TOCHUC.length; i++) {
					arrObj.push({
						dotPhatHanh: r_list_tr_DOTPHATHANH[i],
						toChuc: r_list_tr_TOCHUC[i],
						menhGia: r_list_tr_GIA[i],
						ngayMua: r_list_tr_NGAYMUA[i],
						soLuong: r_list_tr_SOLUONG,
						soLuongValue: r_list_tr_SOLUONG1
					})
				}
				if (arrObj.length > 1) {
					for (var i = 0; i < arrObj.length; i++) {
						for (var j = i + 1; j < arrObj.length; j++) {
							if (arrObj[i].dotPhatHanh == arrObj[j].dotPhatHanh && arrObj[i].toChuc == arrObj[j].toChuc && arrObj[i].menhGia == arrObj[j].menhGia && arrObj[i].ngayMua == arrObj[j].ngayMua) {
								if (arrObj[j].ngayMua == $("#" + $(this).attr('id').replace('SOLUONG', 'NGAYMUA')).val()) {
									var tongSoLuong = 0;
									$(".SOLUONG").map((index, value) => {
										if (arrObj[j].ngayMua == $("#" + $(value).attr('id').replace('SOLUONG', 'NGAYMUA')).val()) {
											tongSoLuong = Number(tongSoLuong) + Number($(value).val().replaceAll(',', ''))
										}
									})
									$(".SOLUONG").map((index, value) => {
										if ($(value).attr('id') == $(this).attr('id')) {
											$(this).val(formatMoney(tongSoLuong))
											fnc_onKeyUpKhoiLuong($(this))
										}
										else
											if (arrObj[j].ngayMua == $("#" + $(value).attr('id').replace('SOLUONG', 'NGAYMUA')).val()) {
												$(value).val('')
												$("#" + $(value).attr('id').replace('SOLUONG', 'TIEN')).val('')
												$("#" + $(value).attr('id').replace('SOLUONG', 'TIENMUALAI')).val('')
											}
									})
								}
								else {
									// return;
								}
							}
							else {
								// return;
							}
						}
					}
				}
			}
		})
		$('body').on('click', '.btnTaixuong', function () {
			var url = CONFIG_API.URL.SEVER + $(this).attr('val')
			window.open(url)
		})
		$('.ACTIONS').on('click', '#btnAddNew', function () {
			idMuaLaiTP = 0;
			$("#Grid01").find('.selected').removeClass('selected');
			$('#list_uploadfile').html('');
			$('#MA').val('');
			$('#TEN').val('');
			$('#CHUSOHUUTP').val('');
			$('#DEANPHATHANHTRAIPHIEUID').val('');
			$('#TONGSOTIENMUALAI').val('');
			$('#GIA').val('100,000');
			$('#LAISUAT').val('');
			$('#KHOILUONGMUALAI').val('');
			$('#NGAYCUOIDANGKY').val($.datepicker.formatDate('dd/mm/yy', new Date()));
			$('#NGAYTOCHUCMUA').val($.datepicker.formatDate('dd/mm/yy', new Date()));
			$("#DEANPHATHANHTRAIPHIEUID").prop('disabled', false)
			that.bindModal();
		})
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.bindModalEdit();
			fnc_loadChiTietTheoDeAn();
		})
		$('.ACTIONS').on('click', '#btnDelete', function (e) {
			e.preventDefault()
			if (!oMuaLaiTP.MUALAITRAIPHIEUID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn mua lại trái phiếu để xóa', '40%', '50px');
				return false;
			}

			function ok() {
				var rs = oMuaLaiTP.del(oMuaLaiTP.MUALAITRAIPHIEUID);
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show(rs.MESSAGE, '40%', '50px');
				//reload sau khi delete
				that.bindGrid01();
				reload();
			}
			function cancel() { }
			var oConfirmDialog = new ConfirmDialog('Xác nhận xóa', ok, cancel);
			oConfirmDialog.show('Bạn có chắc chắn muốn xóa bản ghi này không?', '40%', '50px');
		})
		$(".btnSave").on('click', function (e) {
			if (isDoubleClicked($(this))) return;
			e.preventDefault()
			String.prototype.replaceAll = function (search, replacement) {
				var target = this;
				return target.replace(new RegExp(search, 'g'), replacement);
			};
			var list_tr_TOCHUC = $('.input-table .TOCHUC')
			var list_tr_SOLUONG = $('.input-table .SOLUONG')
			var list_tr_NGAYMUA = $('.input-table .NGAYMUA')
			var list_tr_NGAYPHONGTOA = $('.input-table .NGAYPHONGTOA')
			var list_tr_GHICHU = $('.input-table .GHICHU')
			var list_tr_DOTPHATHANH = $('.input-table .DOTPHATHANH')
			var list_tr_GIA = $('.input-table .GIA')
			var r_list_tr_TOCHUC = []
			var r_list_tr_SOLUONG = []
			var r_list_tr_NGAYMUA = []
			var r_list_tr_NGAYPHONGTOA = []
			var r_list_tr_GHICHU = []
			var r_list_tr_GIA = []
			var r_list_tr_DOTPHATHANH = []
			list_tr_TOCHUC.map((index, value) => {
				r_list_tr_TOCHUC.push($(value).val())
			})
			list_tr_SOLUONG.map((index, value) => {
				r_list_tr_SOLUONG.push($(value).val())
			})
			list_tr_NGAYMUA.map((index, value) => {
				r_list_tr_NGAYMUA.push($(value).val())
			})
			list_tr_NGAYPHONGTOA.map((index, value) => {
				r_list_tr_NGAYPHONGTOA.push($(value).val())
			})
			list_tr_GHICHU.map((index, value) => {
				r_list_tr_GHICHU.push($(value).val())
			})
			list_tr_GIA.map((index, value) => {
				r_list_tr_GIA.push($(value).val())
			})
			list_tr_DOTPHATHANH.map((index, value) => {
				r_list_tr_DOTPHATHANH.push($(value).val())
			})
			if ($('#MA').val() == '' || $('#MA').val().includes(' ')) {
				var oAlert = new AlertDialog1('Thông báo');
				oAlert.show('Mã không được chứa khoảng trắng hoặc rỗng', '40%', '50px');
			}
			oMuaLaiTP.MUALAITRAIPHIEUID = idMuaLaiTP
			oMuaLaiTP.MA = $('#MA').val();
			oMuaLaiTP.TEN = $('#TEN').val();
			oMuaLaiTP.NGAYCUOIDANGKY = $('#NGAYCUOIDANGKY').val();
			oMuaLaiTP.NGAYPHONGTOA = $('#NGAYPHONGTOA').val();
			oMuaLaiTP.NGAYTOCHUCMUA = $('#NGAYTOCHUCMUA').val();
			oMuaLaiTP.NGAYMUALAI = $('#NGAYMUALAI').val();
			oMuaLaiTP.PHUONGTHUCMUA = $('#PHUONGTHUCMUA').val();
			oMuaLaiTP.CHUSOHUUTP = $('#CHUSOHUUTP').val();
			oMuaLaiTP.DEANPHATHANHTRAIPHIEUID = $('#DEANPHATHANHTRAIPHIEUID').val();
			oMuaLaiTP.TONGSOTIENMUALAI = Number($('#TONGSOTIENMUALAI').val().replaceAll(',', ''));
			oMuaLaiTP.GIA = Number($('#GIA').val().replaceAll(',', ''));
			oMuaLaiTP.LAISUAT = 0;
			oMuaLaiTP.KHOILUONGMUALAI = Number($('#KHOILUONGMUALAI').val().replaceAll(',', ''));
			oMuaLaiTP.UUID = uuidv4();
			var querry = '';
			querry = "Insert all ";
			for (var i = 0; i < list_tr_TOCHUC.length; i++) {
				querry = querry +
					" Into QLN_MUALAITP_CHITIET(MUALAITRAIPHIEUID, TOCHUC, SOLUONG, NGAYMUA, NGAYPHONGTOA, GHICHU, MENHGIA, DOTPHATHANHTRAIPHIEUID) VALUES('" +
					$("#MA").val() + "'," +
					r_list_tr_TOCHUC[i] + ", " +
					r_list_tr_SOLUONG[i].replaceAll(',', '') + ",  to_date('" +
					r_list_tr_NGAYMUA[i] + "', 'YYYY-MM-DD'), to_date('" +
					r_list_tr_NGAYPHONGTOA[i] + "', 'YYYY-MM-DD'), '" +
					r_list_tr_GHICHU[i] + "', " +
					r_list_tr_GIA[i] + " , " +
					r_list_tr_DOTPHATHANH[i] + " ) ";
			}
			querry = querry + " Select 1 from dual";
			var pDelete = '';
			pDelete = "Delete QLN_MUALAITP_CHITIET  where MUALAITRAIPHIEUID ='" + $('#MA').val() + "'"
			var rs = oMuaLaiTP.save();
			if (rs.CODE == 0) {
				oMuaLaiTP.savedtl(pDelete, querry);
			}
			// $("#idrowtable").val(rs.RESULT)
			// $("#tablename").val(CurrentLayout)
			// var rs1 = DATA.ajaxPostForm(CONFIG_API.URL.SEVER + 'upload', 'uploadForm')
			// if (!rs1.success) {
			// 	oMuaLaiTP.deluid(rs.RESULT)
			// 	var oAlert = new AlertDialog('Thông báo');
			// 	oAlert.show(rs1.message, '40%', '50px');
			// 	that.bindGrid01();
			// }
			// else {
			that.bindGrid01();
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(rs.MESSAGE, '40%', '50px');
			// }
		})
		$('#Grid01 tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				oMuaLaiTP.MUALAITRAIPHIEUID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				idMuaLaiTP = $(this).find('.rowIDMUALAI').val();
				oMuaLaiTP.MUALAITRAIPHIEUID = idMuaLaiTP;
				that.filterAction('SELECT');
			}
		})
	})
}