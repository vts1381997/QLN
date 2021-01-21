var ToChucMuaTPView = function () {
	var idToChucMuaTP = 0;
	var that = this;
	this.AppTitle = 'Tổ chức mua trái phiếu';
	this.Id = '';
	this.oTable = null;
	this.oTable1 = null;
	this.oTable2 = null;
	this.oDialog = null;
	var idtralai = ''
	var xxx = 0;
	var yyy = 0;
	var zzz = 0;
	var arrMa = [];
	var oToChucMuaTP = new ToChucMuaTP();
	var ngayhientai = fnc_ngayhientai().split('-')[0] + fnc_ngayhientai().split('-')[1] + fnc_ngayhientai().split('-')[2]
	var jsonid;
	this.filterAction = function (sState) {
		switch (sState) {
			case 'NEW':
				ControlHelper.Input.disable(['#btnEdit', '#btnSave', '#btnDelete', '#btnCancel', '#btnTraLai']);
				ControlHelper.Input.enable(['#btnAddNew']);
				break;
			case 'SELECT':
				ControlHelper.Input.enable(['#btnEdit', '#btnCancel', '#btnDelete', '#btnTraLai']);
				break;
			case 'EDIT':
				ControlHelper.Input.disable(['#btnEdit']);
				ControlHelper.Input.enable(['#btnSave', '#btnCancel', '#btnDelete']);
				break;
			default:
				break;
		}
	}
	this.bindTblLichSu = () => {
		oToChucMuaTP.getLichSu(oToChucMuaTP.TOCHUCMUATPID);
		that.oTable2.clear().draw();
		var aRows = [];
		for (var i = 0; i < oToChucMuaTP.LIST.length; i++) {
			var _item = oToChucMuaTP.LIST[i];
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.DOTPHATHANHTRAIPHIEUID + '" />';
			var trangthai = _item.TRANGTHAI == "Đang hoạt động" ? '<span class="label label-success">Kích hoạt</span>' : '<span class="label label-danger">Khóa</span>';
			aRows.push([
				(i + 1) + _hidden,
				_item.DOTPHATHANHTRAIPHIEUID,
				_item.NGAYMUA,
				_item.TRAGOC,
				_item.TRALAI,
				_item.NGAYTRA,
				chuyentien(_item.TIENTRAGOC),
				chuyentien(_item.TIENTRALAI),
				chuyentien(_item.MENHGIA),
			]);
		}
		that.oTable2.rows.add(aRows).draw();
	}
	this.bindTblDanhSach = (id) => {
		xxx = 0;
		yyy = 0;
		zzz = 0;
		var indexLai = 0
		var tc = oToChucMuaTP.getDetail(id);
		that.oTable1.clear().draw();
		var aRows = [];
		var ngaydonglai = ''
		var datedonglai = ''
		var pttra = ''
		var tienlai
		var trangthai = ''
		for (var i = 0; i < tc.length; i++) {
			var _item = tc[i];
			_item.KYHANTHANHTOAN = _item.NGAYPHATHANH.split('/')[0] + '/' + _item.NGAYPHATHANH.split('/')[1] + '/' + String(Number(_item.NGAYPHATHANH.split('/')[2]) + Number(_item.NGAYKYHANTRAIPHIEU))
			_item.NGAYMUA = _item.NGAYPHATHANH
			var ngaydaohan = _item.KYHANTHANHTOAN.split('/')[2] + _item.KYHANTHANHTOAN.split('/')[1] + _item.KYHANTHANHTOAN.split('/')[0]
			var tongtien = _item.SOLUONGMUA * _item.GIA
			var Thangmua
			var Nammua
			var Ngaymua
			if (_item.TRALAI) {

				Thangmua = _item.TRALAI.split('/')[1]
				Nammua = _item.TRALAI.split('/')[2]
				Ngaymua = _item.TRALAI.split('/')[0]
			}
			else {
				Thangmua = _item.NGAYMUA.split('/')[1]
				Nammua = _item.NGAYMUA.split('/')[2]
				Ngaymua = _item.NGAYMUA.split('/')[0]
			}

			var intThangmua = Number(Thangmua)
			if (_item.PHUONGTHUCTRALAI == '6T') {
				tienlai = tongtien * _item.LAISUATPHTHANHCONG / 2 / 100
				pttra = 'Bán niên'
				if (intThangmua - 6 > 0) {
					Nammua = String(Number(Nammua) + 1)
					ngaydonglai = Nammua + '0' + String(intThangmua - 6) + Ngaymua
					datedonglai = Ngaymua + '/' + '0' + String(intThangmua - 6) + '/' + Nammua
				}
				else {
					if (String(intThangmua + 6).length > 1) {
						ngaydonglai = Nammua + String(intThangmua + 6) + Ngaymua
						datedonglai = Ngaymua + '/' + String(intThangmua + 6) + '/' + Nammua
					}
					else {

						ngaydonglai = Nammua + '0' + String(intThangmua + 6) + Ngaymua
						datedonglai = Ngaymua + '/' + '0' + String(intThangmua + 6) + '/' + Nammua

					}
				}
			}

			if (_item.PHUONGTHUCTRALAI == '12T') {
				tienlai = tongtien * _item.LAISUATPHTHANHCONG / 100
				pttra = '1 Năm'
				ngaydonglai = String(Number(Nammua) + 1) + Thangmua + Ngaymua
				datedonglai = Ngaymua + '/' + Thangmua + '/' + String(Number(Nammua) + 1)
			}
			if (_item.PHUONGTHUCTRALAI == 'DH') {
				tienlai = _item.NGAYKYHANTRAIPHIEU * tongtien * _item.LAISUATPHTHANHCONG / 100
				pttra = 'Ngày đáo hạn'
				ngaydonglai = _item.KYHANTHANHTOAN.split('/')[2] + _item.KYHANTHANHTOAN.split('/')[1] + _item.KYHANTHANHTOAN.split('/')[0]
				datedonglai = _item.KYHANTHANHTOAN
			}
			if ((Number(ngayhientai) - Number(ngaydonglai)) >= 0) {
				_item.NGAYTRALAI = datedonglai
			}
			_item.ngaydh = ngaydaohan
			if (Number(ngayhientai) >= Number(ngaydaohan)) {
				_item.TIENTRAGOC = tongtien
			}
			else {
				_item.TIENTRAGOC = 0
			}
			_item.NGAYHIENTAI = fnc_ngayhientai().split('-')[2] + '/' + fnc_ngayhientai().split('-')[1] + '/' + fnc_ngayhientai().split('-')[0]
			_item.TIENLAI = tienlai


			if (Number(ngayhientai) >= Number(ngaydonglai)) {
				_item.tien = tienlai
			} else {
				_item.tien = ''
			}

			_item.NGAYTRAGOC = _item.KYHANTHANHTOAN
			var _hidden = '<p style="display:none" class="rowTL"  />' + JSON.stringify(_item) + '</p>';
			// trangthai = '<span class="label label-danger">Chưa đến hạn trả lãi</span>'
			if (Number(ngaydaohan) - Number(ngayhientai) <= 30) {

				trangthai = '<span class="label label-danger">Còn ' + Number(ngaydaohan) - Number(ngayhientai) + ' ngày đến hạn đóng lãi</span>'
			}
			if (Number(_item.TIENGOC) > 0) {
				trangthai = '<span  style="background-color: #e6d047; !importan" class="label label-success">Đã trả gốc,lãi</span>'
			}
			else {
				if (Number(ngayhientai) - Number(ngaydaohan) >= 0) {
					xxx = xxx + 1
					trangthai = '<span  class="label label-success">Đến ngày trả gốc,lãi</span>'
				} else {
					if ((Number(ngayhientai) - Number(ngaydonglai)) >= 0) {
						yyy = yyy + 1
						trangthai = '<span  class="label label-success">Đến ngày trả lãi</span>'
					} else {
						zzz = zzz + 1
						trangthai = '<span class="label label-danger">Chưa đến hạn trả lãi</span>'

					}
				}
			}
			aRows.push([
				(i + 1) + _hidden,
				_item.TENDPH,
				chuyentien(tongtien),
				_item.LAISUATPHTHANHCONG + '%',
				pttra,
				_item.NGAYMUA,
				_item.TRALAI,
				_item.KYHANTHANHTOAN,
				chuyentien(_item.tien),
				trangthai,
			]);
			indexLai++
		}
		that.oTable1.rows.add(aRows).draw();
	}

	this.bindGrid01 = function () {
		oToChucMuaTP.getAll();
		that.oTable.clear().draw();
		var aRows = [];
		arrMa = [];
		for (var i = 0; i < oToChucMuaTP.LIST.length; i++) {
			var _item = oToChucMuaTP.LIST[i];
			arrMa.push(_item.MA)
			that.bindTblDanhSach(_item.TOCHUCMUATPID);
			var tt = ''
			if (xxx > 0) {
				tt = '<span  class="label label-success">Đến ngày trả gốc,lãi</span>'
			} else {
				if (yyy > 0) {
					tt = '<span  class="label label-success">Đến ngày trả lãi</span>'
				}
				else {
					tt = '<span class="label label-danger">Chưa đến hạn trả lãi</span>'
				}
			}
			if (_item.TONGTIENTRAGOC == _item.TONGTIENPHAITRA) {
				tt = '<span  class="label label-success">Đã trả nợ đủ</span>'
			}
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.TOCHUCMUATPID + '" />';
			var _hidden1 = '<p style="display:none" class="rowID1" value="" >' + JSON.stringify(_item) + '</p>';
			aRows.push([
				(i + 1) + _hidden + _hidden1,
				_item.MA,
				_item.TOCHUC,
				_item.LOAI,
				_item.SODIENTHOAI,
				_item.DIACHI,
				_item.EMAIL,
				_item.STATUS_DELETE + '' !== '0' ? '<div class="alert-danger" style="font-size:10px; text-align:center">Đã mua trái phiếu</div>' : '<div class="alert-success" style="font-size:10px;  text-align:center">Chưa mua trái phiếu</div>',
				_item.STATUS_DELETE + '' !== '0' ? tt : ''
			]);
		}

		that.oTable.rows.add(aRows).draw();
		arrMa = deduplicate(arrMa)
	}

	this.init = function () {
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
		that.bindGrid01();
	}
	this.bindModal = function () {
		if (idToChucMuaTP > 0) {
			oToChucMuaTP.getById(idToChucMuaTP);
			$('#MA').val(oToChucMuaTP.MA);
			$('#TOCHUC').val(oToChucMuaTP.TOCHUC);
			$('#LOAI').val(oToChucMuaTP.LOAI).select2();
			$('#SODIENTHOAI').val(oToChucMuaTP.SODIENTHOAI);
			$('#DIACHI').val(oToChucMuaTP.DIACHI);
			$('.email').val(oToChucMuaTP.EMAIL);
			$('#SO').val(oToChucMuaTP.SO);
			$('#TRANGTHAI').val(oToChucMuaTP.TRANGTHAI).select2();
		}
	}

	$(document).ready(function () {
		$('body').on('change', '.email', function () {
			// validateEmail($(".email").val())
			// if (validateEmail($(".email").val()) == true) {
			// 	return;
			// } else {
			// 	var oAlert = new AlertDialog1('Cảnh báo');
			// 	oAlert.show('Email này không hợp lệ', '40%', '50px');
			// }
		})
	})

	$(function () {
		that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
		that.oTable1 = ControlHelper.Datatable.Init('bindTblDanhSach', 25, true);
		that.oTable2 = ControlHelper.Datatable.Init('TblLichSu', 25, true);

		that.oDialog = new PopupDialog(reload);
		that.init();

		function reload() {
			that.filterAction('NEW');
			that.bindGrid01();
		}

		$('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()
			$("#exampleModalLongTitle").text('Thêm mới tổ chức mua trái phiếu')
			$("#Grid01").find('.selected').removeClass('selected');
			$('#MA').val('');
			$('#TOCHUC').val('');
			$('#SODIENTHOAI').val('');
			$('#DIACHI').val('');
			$('.email').val('');
			$('#SO').val('');
			idToChucMuaTP = 0;
			that.bindModal();
			fnc_removeSpace();
			fnc_validateSpace("TOCHUC");
			fnc_validateSpace("DIACHI");
			$('body').on('keyup', '.email', function () {
				String.prototype.replaceAll = function (search, replacement) {
					var target = this;
					return target.replace(new RegExp(search, 'g'), replacement);
				};
				if ($(".email").val().includes(' ')) {
					var stringCode = String($(".email").val()).split(" ").join().replaceAll(',', '')
					$(".email").val(stringCode)
				}
			})
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			$("#exampleModalLongTitle").text('Sửa tổ chức mua trái phiếu')
			that.bindModal();
			fnc_removeSpace();
			fnc_validateSpace("TOCHUC");
			fnc_validateSpace("DIACHI");
			$('body').on('keyup', '.email', function () {
				String.prototype.replaceAll = function (search, replacement) {
					var target = this;
					return target.replace(new RegExp(search, 'g'), replacement);
				};
				if ($(".email").val().includes(' ')) {
					var stringCode = String($(".email").val()).split(" ").join().replaceAll(',', '')
					$(".email").val(stringCode)
				}
			})
		});
		$('.ACTIONS').on('click', '#btnTraLai', function () {
			that.bindTblDanhSach(oToChucMuaTP.TOCHUCMUATPID);
			that.bindTblLichSu();
		});
		$('#btnTL').on('click', function (e) {
			var data = JSON.parse(idtralai)
			data.laigoc = 0
			if (idtralai.length == 0) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn đợt trả lãi', '40%', '50px');
				return false;
			}
			else {
				if (data.tien.length == 0) {
					var oAlert = new AlertDialog('Cảnh báo');
					oAlert.show('Chưa đến ngày trả lãi', '40%', '50px');
					return false;
				} else {
					function ok() {
						var response = oToChucMuaTP.TraLaiGoc(data);
						var oAlert = new AlertDialog('Thông báo');
						oAlert.show(response.MESSAGE, '40%', '50px');
						that.bindTblDanhSach(oToChucMuaTP.TOCHUCMUATPID);
						that.bindTblLichSu();
					}
					function cancel() { }
					var oConfirmDialog = new ConfirmDialog('Xác Nhận', ok, cancel);
					oConfirmDialog.show('Bạn có chắc chắn trả lãi không', '40%', '50px');
				}
			}
		});
		$('#btnTraGoc').on('click', function (e) {
			let dta = JSON.parse(idtralai)
			dta.laigoc = 1
			var rs = oToChucMuaTP.getChiTiet(JSON.parse(idtralai).DOTPHATHANHTRAIPHIEUID)
			if (rs[0].PHUONGTHUCTRAGOC == "DH") {
				if (Number(dta.ngaydh) > Number(ngayhientai)) {
					var oAlert = new AlertDialog('Cảnh báo');
					oAlert.show('Chưa đến ngày trả gốc', '40%', '50px');
					return false;
				}
			}
			if (rs[0].PHUONGTHUCTRAGOC == "6T") {
				var d = new Date(JSON.parse(idtralai).NGAYMUA.split('/')[2], JSON.parse(idtralai).NGAYMUA.split('/')[1], JSON.parse(idtralai).NGAYMUA.split('/')[0]);
				d.setMonth(d.getMonth() + 6);
				var now = $.datepicker.formatDate('yy-mm-dd', new Date());
				if (Number(now.split('-').join('')) > Number(convert(d).split('/')[2] + convert(d).split('/')[1] + convert(d).split('/')[0])) {
					var rs = oToChucMuaTP.getDaTraGoc(JSON.parse(idtralai).DOTPHATHANHTRAIPHIEUID, JSON.parse(idtralai).UUID)
					if (Number(rs[0].TIENTRAGOC) > 0) {
						var oAlert = new AlertDialog('Cảnh báo');
						oAlert.show('Đã trả nợ gốc', '40%', '50px');
						return false;
					}
				}
				else {
					var oAlert = new AlertDialog('Cảnh báo');
					oAlert.show('Chưa đến ngày trả gốc', '40%', '50px');
					return false;
				}
			}
			if (rs[0].PHUONGTHUCTRAGOC == "12T") {
				var d = new Date(JSON.parse(idtralai).NGAYMUA.split('/')[2], JSON.parse(idtralai).NGAYMUA.split('/')[1], JSON.parse(idtralai).NGAYMUA.split('/')[0]);
				d.setMonth(d.getMonth() + 12);
				var now = $.datepicker.formatDate('yy-mm-dd', new Date());
				if (Number(now.split('-').join('')) > Number(convert(d).split('/')[2] + convert(d).split('/')[1] + convert(d).split('/')[0])) {
					var rs = oToChucMuaTP.getDaTraGoc(JSON.parse(idtralai).DOTPHATHANHTRAIPHIEUID, JSON.parse(idtralai).UUID)
					if (Number(rs[0].TIENTRAGOC) > 0) {
						var oAlert = new AlertDialog('Cảnh báo');
						oAlert.show('Đã trả nợ gốc', '40%', '50px');
						return false;
					}
				}
				else {
					var oAlert = new AlertDialog('Cảnh báo');
					oAlert.show('Chưa đến ngày trả gốc', '40%', '50px');
					return false;
				}
			}
			function ok() {
				var response = oToChucMuaTP.TraLaiGoc(dta);
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show(response.MESSAGE, '40%', '50px');
				that.bindTblDanhSach(oToChucMuaTP.TOCHUCMUATPID);
				that.bindTblLichSu();
			}
			function cancel() { }
			var oConfirmDialog = new ConfirmDialog('Xác Nhận', ok, cancel);
			oConfirmDialog.show('Bạn có chắc chắn trả gốc, lãi không?', '40%', '50px');
		});

		$('.ACTIONS').on('click', '#btnDelete', function (e) {
			e.preventDefault()
			if (!oToChucMuaTP.TOCHUCMUATPID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn tổ chức tài chính để xóa', '40%', '50px');
				return false;
			}
			else {
				if (JSON.parse(jsonid).STATUS_DELETE == 0) {

					function ok() {
						var rs = oToChucMuaTP.del(oToChucMuaTP.TOCHUCMUATPID);
						var oAlert = new AlertDialog('Thông báo');
						oAlert.show(rs.MESSAGE, '40%', '50px');
						setTimeout(that.bindGrid01, 300)
						// that.bindGrid01();
						// reload();
					}
					function cancel() { }
					var oConfirmDialog = new ConfirmDialog('Xác nhận xóa', ok, cancel);
					oConfirmDialog.show('Bạn có chắc chắn muốn xóa bản ghi này không?', '40%', '50px');
				}
				else {
					var oAlert = new AlertDialog('Cảnh báo');
					oAlert.show("không được xóa tổ chức này", '40%', '50px');
				}
			}
		});
		$(".btnSave").on('click', function (e) {
			if (isDoubleClicked($(this))) return;
			e.preventDefault();
			var oAlert = new AlertDialog1('Thông báo');
			if ($('#MA').val() == '') {
				oAlert.show('Mã không được để trống', '40%', '50px');
				return;
			}
			else {
				validateEmail($(".email").val())
				if (validateEmail($(".email").val()) == true) {
				} else {
					if ($(".email").val() != "") {
						var oAlert = new AlertDialog1('Cảnh báo');
						oAlert.show('Email này không hợp lệ', '40%', '50px');
						return;
					}
				}
				const regex = /[^a-zA-Z0-9_ áàảãạăắằẳẵặâấầẩẫậđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữự]/;
				if (regex.test($('#MA').val())) {
					oAlert.show('Mã tổ chức không được chứa ký tự đặc biệt', '40%', '50px');
					return;
				}
				if (regex.test($('#TOCHUC').val())) {
					oAlert.show('Tên tổ chức không được chứa ký tự đặc biệt', '40%', '50px');
					return;
				}
				if (regex.test($('#DIACHI').val())) {
					oAlert.show('Địa chỉ không được chứa ký tự đặc biệt', '40%', '50px');
					return;
				}
				if (arrMa.includes($('#MA').val())) {
					oAlert.show('Mã tổ chức đã bị trùng', '40%', '50px');
					return;
				}
				oToChucMuaTP.TOCHUCMUATPID = idToChucMuaTP;
				oToChucMuaTP.MA = $('#MA').val().trim();
				oToChucMuaTP.TOCHUC = $('#TOCHUC').val();
				oToChucMuaTP.LOAI = $('#LOAI').val();
				oToChucMuaTP.SODIENTHOAI = $('#SODIENTHOAI').val();
				oToChucMuaTP.DIACHI = $('#DIACHI').val();
				oToChucMuaTP.EMAIL = $('.email').val();
				oToChucMuaTP.SO = $('#SO').val();
				oToChucMuaTP.TRANGTHAI = $('#TRANGTHAI').val();
				var rs = oToChucMuaTP.save();
				if (rs.CODE == 3) {
					var oAlert = new AlertDialog1('Thông báo');
					oAlert.show('Mã này đã được sử dụng', '40%', '50px');
				}
				else {
					var oAlert = new AlertDialog('Thông báo');
					oAlert.show(rs.MESSAGE, '40%', '50px');
					var interval = setInterval(() => {
						if ($("#exampleModalCenter").attr("style").includes("none")) {
							that.bindGrid01();
							clearInterval(interval);
						}
					}, 100)
					// setTimeout(that.bindGrid01, 300)
					// that.bindGrid01();
				}
			}
		})
		$('#Grid01 tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				oToChucMuaTP.TOCHUCMUATPID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				idToChucMuaTP = $(this).find('.rowID').val();
				jsonid = $(this).find('.rowID1').text();
				oToChucMuaTP.TOCHUCMUATPID = idToChucMuaTP;

				that.filterAction('SELECT');
			}
		});
		$('#bindTblDanhSach tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				idtralai = ''
				that.filterAction('NEW');
			}
			else {
				that.oTable1.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				idtralai = $(this).find('.rowTL').text();
				var rs = oToChucMuaTP.getChiTiet(JSON.parse(idtralai).DOTPHATHANHTRAIPHIEUID)
				if (rs[0].PHUONGTHUCTRALAI == "DH" && rs[0].PHUONGTHUCTRAGOC == "DH") {
					$("#btnTraGoc").prop('disabled', false)
					$("#btnTL").prop('disabled', true)
				}
				if (rs[0].PHUONGTHUCTRALAI == "6T") {
					var d = new Date(JSON.parse(idtralai).NGAYMUA.split('/')[2], JSON.parse(idtralai).NGAYMUA.split('/')[1], JSON.parse(idtralai).NGAYMUA.split('/')[0]);
					d.setMonth(d.getMonth() + 6);
					var now = $.datepicker.formatDate('yy-mm-dd', new Date());
					if (Number(now.split('-').join('')) > Number(convert(d).split('/')[2] + convert(d).split('/')[1] + convert(d).split('/')[0])) {
						$("#btnTL").prop('disabled', false)
					}
					else {
						$("#btnTL").prop('disabled', true)
					}
				}
				if (rs[0].PHUONGTHUCTRALAI == "12T") {
					var d = new Date(JSON.parse(idtralai).NGAYMUA.split('/')[2], JSON.parse(idtralai).NGAYMUA.split('/')[1], JSON.parse(idtralai).NGAYMUA.split('/')[0]);
					d.setMonth(d.getMonth() + 12);
					var now = $.datepicker.formatDate('yy-mm-dd', new Date());
					var namSau = Number(JSON.parse(idtralai).NGAYMUA.split('/')[2]) + 1
					if (Number(now.split('-').join('')) > Number(namSau + JSON.parse(idtralai).NGAYMUA.split('/')[1] + JSON.parse(idtralai).NGAYMUA.split('/')[0])) {
						$("#btnTL").prop('disabled', false)
					}
					else {
						$("#btnTL").prop('disabled', true)
					}
				}
				that.filterAction('SELECT');
			}
		});
	});
}