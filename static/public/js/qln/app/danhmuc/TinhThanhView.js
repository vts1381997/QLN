var TinhThanhView = function () {
	var idTinhThanh = 0;
	var that = this;
	this.AppTitle = 'Tỉnh/Thành phố';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oTinhThanh = new TinhThanh();
	this.init = function () {
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
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
		oTinhThanh.getAll();
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < oTinhThanh.LIST.length; i++) {
			var _item = oTinhThanh.LIST[i];
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.TINHTHANHID + '" />';
			var trangthai = _item.STATUS == 1 ? '<span class="label label-success">Kích hoạt</span>' : '<span class="label label-danger">Khóa</span>';
			aRows.push([
				(i + 1) + _hidden,
				_item.MA,
				_item.TEN,
				_item.NOTE,
				_item.CREATEDDATE,
				_item.CREATEDBY,
				_item.UPDATEDDATE,
				_item.UPDATEDBY,
				trangthai
			]);
		}
		that.oTable.rows.add(aRows).draw();
	}

	this.init = function () {
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
		that.bindGrid01();
	}
	this.bindModal = function () {
		if (idTinhThanh > 0) {
			oTinhThanh.getById(idTinhThanh);
			$('#MA').val(oTinhThanh.MA);
			$('#TEN').val(oTinhThanh.TEN);
			$('#NOTE').val(oTinhThanh.NOTE);
			$('#STATUS').val(oTinhThanh.STATUS);
			$('#CREATEDDATE').val(oTinhThanh.CREATEDDATE);
			$('#CREATEDBY').val(oTinhThanh.CREATEDBY);
			$('#UPDATEDDATE').val(oTinhThanh.UPDATEDDATE);
			$('#UPDATEDBY').val(oTinhThanh.UPDATEDBY);
		}
	}
	$(function () {

		that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
		that.oDialog = new PopupDialog(reload);
		setTimeout(() => {
			that.init();
		}, 200);

		function reload() {
			that.bindGrid01();
			that.filterAction('NEW');
		}

		$('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()
			$("#Grid01").find('.selected').removeClass('selected');
			$('#MA').val('');
			$('#TEN').val('');
			$('#STATUS').val('0');
			$('#CREATEDDATE').val('');
			$('#CREATEDBY').val('');
			$('#UPDATEDDATE').val('');
			$('#UPDATEDBY').val(1);
			idTinhThanh = 0;
			that.bindModal();
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.bindModal();
		});
		$('.ACTIONS').on('click', '#btnDelete', function (e) {
			e.preventDefault()
			if (!oTinhThanh.TINHTHANHID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn tỉnh/thành phố để xóa', '40%', '50px');
				return false;
			}

			function ok() {
				var rs = oTinhThanh.del(oTinhThanh.TINHTHANHID)
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show(rs.MESSAGE, '40%', '50px');
				that.bindGrid01();
				reload();
			}
			function cancel() { }

			var oConfirmDialog = new ConfirmDialog('Xác nhận xóa', ok, cancel);
			oConfirmDialog.show('Bạn có chắc chắn muốn xóa bản ghi này không?', '40%', '50px');
		});
		$(".btnSave").on('click', function () {
			var oAlert1 = new AlertDialog1('Thông báo');
			if (!$('#MA').val()?.trim()) {
				oAlert1.show('Mã địa bàn không được để trống', '40%', '50px');
			}
			else {
				const regexMa = /[^a-zA-Z0-9_ ]/
				const regex = /[^a-zA-Z0-9_ ,.()áÁàÀảẢãÃạẠăĂắẮằẰẳẲẵẴặẶâÂấẤầẦẩẨẫẪậẬđĐéÉèÈẻẺẽẼẹẸêÊếẾềỀểỂễỄệỆíÍìÌỉỈĩĨịỊóÓòÒỏỎõÕọỌôÔốỐồỒổỔỗỖộỘơƠớỚờỜởỞỡỠợỢúÚùÙủỦũŨụỤưƯứỨừỪửỬữỮựỰ]/;
				if (regexMa.test($('#MA').val())) {
					oAlert1.show('Mã địa bàn không được chứa ký tự đặc biệt', '40%', '50px');
					return;
				}
				if (regex.test($('#TEN').val())) {
					oAlert1.show('Tên tỉnh/thành phố không được chứa ký tự đặc biệt', '40%', '50px');
					return;
				}
				oTinhThanh.TINHTHANHID = idTinhThanh;
				oTinhThanh.MA = $('#MA').val();
				oTinhThanh.TEN = $('#TEN').val();
				oTinhThanh.NOTE = $('#NOTE').val();
				var rs = oTinhThanh.save();
				if (rs.MESSAGE == "-1") {
					oAlert1.show('Mã địa bàn bị trùng vui lòng nhập lại', '40%', '50px');
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
				oTinhThanh.TINHTHANHID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				idTinhThanh = $(this).find('.rowID').val();
				oTinhThanh.TINHTHANHID = idTinhThanh;
				that.filterAction('SELECT');
			}
		});
	});
}