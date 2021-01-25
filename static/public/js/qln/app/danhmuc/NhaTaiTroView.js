var NhaTaiTroView = function () {
	var idNhaTaiTro = 0;
	var that = this;
	this.AppTitle = 'Nhà tài trợ';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oNhaTaiTro = new NhaTaiTro();
	var qr = [];

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
	function _mapUrlParams(queryString) {
		return queryString
			.split('&')
			.map(function (keyValueString) { return keyValueString.split('=') })
			.reduce(function (urlParams, [key, value]) {
				if (Number.isInteger(parseInt(value)) && parseInt(value) == value) {
					urlParams[key] = parseInt(value);
				} else {
					urlParams[key] = decodeURI(value);
				}
				return urlParams;
			}, {});
	}

	function getUrlParams(urlOrQueryString) {
		if ((i = urlOrQueryString.indexOf('?')) >= 0) {
			const queryString = urlOrQueryString.substring(i + 1);
			if (queryString) {
				return _mapUrlParams(queryString);
			}
		}

		return {};
	}
	this.bindGrid01 = function (isSearch) {
		var vParams = getUrlParams(location.href);


		if (isSearch) {
			that.oTable.clear().draw();
			var aRows = [];
			for (var i = 0; i < isSearch.length; i++) {
				var _item = isSearch[i];
				var _hidden = '<input type="hidden" class="rowID" value="' + _item.NHATAITROID + '" />';
				var trangthai = _item.TRANGTHAI == "1" ? '<span style="font-size: 11px !important;" class="label label-success">Kích hoạt</span>' : '<span style="font-size: 11px !important; padding-left: 17px !important; padding-right: 17px !important" class="label label-danger">Khóa</span>';
				if (Number(_item.TONGDUAN) > 0) {

					var buttonXemDuAn = '<span style="font-size: 11px !important; padding-left: 25px; padding-right: 25px" class="label label-info"><a href="/qln/app/danhmuc/DuAn?nhataitroid=' + _item.NHATAITROID + '">Chi tiết</a></span>'
				}
				else {
					var buttonXemDuAn = '<span style="font-size: 11px !important;" class="label label-warning"><a href="javascript:void(0)">Chưa có dự án</a></span>'
				}
				that.keys = [
					'i_stt',
					'i_MA',
					'i_TEN',
					'i_SODIENTHOAI',
					'i_MASOTHUE',
					'i_SOTAIKHOAN',
					'i_DIACHI',
					'i_trangthai'
				]
				var data = [
					(i + 1) + _hidden,
					_item.MA,
					_item.TEN,
					_item.SODIENTHOAI,
					_item.MASOTHUE,
					_item.SOTAIKHOAN,
					_item.DIACHI,
					trangthai,
					buttonXemDuAn
				]
				aRows.push(data);
			}
			that.oTable.rows.add(aRows).draw();
		}
		else {
			oNhaTaiTro.getAll();
			that.oTable.clear().draw();

			var aRows = [];
			for (var i = 0; i < oNhaTaiTro.LIST.length; i++) {
				var _item = oNhaTaiTro.LIST[i];
				var _hidden = '<input type="hidden" class="rowID" value="' + _item.NHATAITROID + '" />';
				var trangthai = _item.TRANGTHAI == "1" ? '<span style="font-size: 11px !important;" class="label label-success">Kích hoạt</span>' : '<span style="font-size: 11px !important; padding-left: 17px !important; padding-right: 17px !important" class="label label-danger">Khóa</span>';
				if (Number(_item.TONGDUAN) > 0) {
					var buttonXemDuAn = '<span style="font-size: 11px !important; padding-left: 25px; padding-right: 25px" class="label label-info"><a href="/qln/app/danhmuc/DuAn?nhataitroid=' + _item.NHATAITROID + '">Chi tiết</a></span>'
				}
				else {
					var buttonXemDuAn = '<span style="font-size: 11px !important;" class="label label-warning"><a href="javascript:void(0)">Chưa có dự án</a></span>'
				}
				that.keys = [
					'i_stt',
					'i_MA',
					'i_TEN',
					'i_SODIENTHOAI',
					'i_MASOTHUE',
					'i_SOTAIKHOAN',
					'i_DIACHI',
					'i_trangthai'
				]
				var data = [
					(i + 1) + _hidden,
					_item.MA,
					_item.TEN,
					_item.SODIENTHOAI,
					_item.MASOTHUE,
					_item.SOTAIKHOAN,
					_item.DIACHI,
					trangthai,
					buttonXemDuAn
				]
				aRows.push(data);
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
		if (idNhaTaiTro > 0) {
			oNhaTaiTro.getById(idNhaTaiTro);
			$('#MA').val(oNhaTaiTro.MA);
			$('#TEN').val(oNhaTaiTro.TEN);
			$('#SODIENTHOAI').val(oNhaTaiTro.SODIENTHOAI);
			$('#MASOTHUE').val(oNhaTaiTro.MASOTHUE);
			$('#SOTAIKHOAN').val(oNhaTaiTro.SOTAIKHOAN);
			$('#DIACHI').val(oNhaTaiTro.DIACHI);
			$('#TRANGTHAI').val(oNhaTaiTro.TRANGTHAI).select2();
			$('#STATUS').val(oNhaTaiTro.STATUS);
			$('#CREATEDDATE').val(oNhaTaiTro.CREATEDDATE);
			$('#CREATEDBY').val(oNhaTaiTro.CREATEDBY);
			$('#UPDATEDDATE').val(oNhaTaiTro.UPDATEDDATE);
			$('#UPDATEDBY').val(oNhaTaiTro.UPDATEDBY);
		}
	}

	$(function () {
		that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
		that.oDialog = new PopupDialog(reload);
		that.init();

		function reload() {
			that.bindGrid01();
			that.filterAction('NEW');
		}

		$('.inputsearch').on('change', function (e) {
			var id = e.target.id
			qr.forEach(element => {
				if (element.column.indexOf(id) >= 0) {
					element.text = $("#" + id + "").val()
				}
			});
			qr.push({
				text: $("#" + id + "").val(),
				column: id,
				class: 'dm_nhataitro'
			})
			var rs = oSearch.search(qr)
			that.bindGrid01(rs)
		})

		$('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()
			$("#exampleModalLongTitle").text('Thêm mới nhà tài trợ')
			$("#Grid01").find('.selected').removeClass('selected');
			$('#MA').val('');
			$('#TEN').val('');
			$('#SODIENTHOAI').val('');
			$('#MASOTHUE').val('');
			$('#SOTAIKHOAN').val('');
			$('#DIACHI').val('');
			$('#STATUS').val('0');
			$('#CREATEDDATE').val('');
			$('#CREATEDBY').val('');
			$('#UPDATEDDATE').val('');
			$('#UPDATEDBY').val(1);
			idNhaTaiTro = 0;
			that.bindModal();
			fnc_removeSpace();
			fnc_removeName();
			fnc_validateSpace("MASOTHUE");
			fnc_validateSpace("DIACHI");
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.bindModal();
			$("#exampleModalLongTitle").text('Sửa nhà tài trợ')
			fnc_removeSpace();
			fnc_removeName();
			fnc_validateSpace("MASOTHUE");
			fnc_validateSpace("DIACHI");
		});
		$('.ACTIONS').on('click', '#btnDelete', function (e) {
			e.preventDefault()
			var oDuAn = new DuAn()
			if (!oNhaTaiTro.NHATAITROID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn nhà tài trợ để xóa', '40%', '50px');
				return false;
			}
			function ok() {
				oDuAn.getAll()
				var duAnList = oDuAn.LIST
				var kq = 0;
				duAnList.map(value => {
					if (Number(value.NHATAITROID) === Number(oNhaTaiTro.NHATAITROID)) {
						return kq = Number(kq) + 1
					}
					else {
						return kq;
					}
				})
				if (kq > 0) {
					var oAlert = new AlertDialog('Thông báo');
					oAlert.show('Nhà tài trợ này đang nằm trong dự án, không được xóa', '40%', '50px');
				}
				else {
					var rs = oNhaTaiTro.del(oNhaTaiTro.NHATAITROID);
					var oAlert = new AlertDialog('Thông báo');
					oAlert.show(rs.MESSAGE, '40%', '50px');
					that.bindGrid01();
					reload();
				}
			}
			function cancel() { }

			var oConfirmDialog = new ConfirmDialog('Xác nhận xóa', ok, cancel);
			oConfirmDialog.show('Bạn có chắc chắn muốn xóa bản ghi này không?', '40%', '50px');
		});

		$(".btnSave").on('click', function (e) {
			if (isDoubleClicked($(this))) return;
			e.preventDefault();
			var oAlert1 = new AlertDialog1('Thông báo');
			String.prototype.replaceAll = function (search, replacement) {
				var target = this;
				return target.replace(new RegExp(search, 'g'), replacement);
			};
			if ($('#MA').val() == '') {
				var oAlert = new AlertDialog1('Thông báo');
				oAlert.show('Mã không được để rỗng', '40%', '50px');
				return;
			}
			else {
				const regexMa = /[^a-zA-Z0-9_ ]/
				const regex = /[^a-zA-Z0-9-_ ,.()áÁàÀảẢãÃạẠăĂắẮằẰẳẲẵẴặẶâÂấẤầẦẩẨẫẪậẬđĐéÉèÈẻẺẽẼẹẸêÊếẾềỀểỂễỄệỆíÍìÌỉỈĩĨịỊóÓòÒỏỎõÕọỌôÔốỐồỒổỔỗỖộỘơƠớỚờỜởỞỡỠợỢúÚùÙủỦũŨụỤưƯứỨừỪửỬữỮựỰ]/;
				if (regexMa.test($('#MA').val())) {
					oAlert1.show('Mã không được chứa ký tự đặc biệt', '40%', '50px');
					return;
				}
				if (regex.test($('#TEN').val())) {
					oAlert1.show('Tên không được chứa ký tự đặc biệt', '40%', '50px');
					return;
				}
				if (regex.test($('#DIACHI').val())) {
					oAlert1.show('Địa chỉ không được chứa ký tự đặc biệt', '40%', '50px');
					return;
				}
				oNhaTaiTro.NHATAITROID = idNhaTaiTro;
				oNhaTaiTro.MA = $('#MA').val().trim();
				oNhaTaiTro.TEN = $('#TEN').val();
				oNhaTaiTro.SODIENTHOAI = $('#SODIENTHOAI').val();
				oNhaTaiTro.MASOTHUE = $('#MASOTHUE').val();
				oNhaTaiTro.SOTAIKHOAN = $('#SOTAIKHOAN').val();
				oNhaTaiTro.DIACHI = $('#DIACHI').val();
				oNhaTaiTro.TRANGTHAI = $('#TRANGTHAI').val();
				var rs = oNhaTaiTro.save();
				if (rs.CODE == 3) {
					var oAlert = new AlertDialog1('Thông báo');
					oAlert.show('Mã này đã được sử dụng', '40%', '50px');
				}
				else {
					that.bindGrid01();
					var oAlert = new AlertDialog('Thông báo');
					oAlert.show(rs.MESSAGE, '40%', '50px');
				}
			}
		})

		$('#Grid01 tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				oNhaTaiTro.NHATAITROID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				idNhaTaiTro = $(this).find('.rowID').val();
				oNhaTaiTro.NHATAITROID = idNhaTaiTro;
				that.filterAction('SELECT');
			}
		});
	});
}