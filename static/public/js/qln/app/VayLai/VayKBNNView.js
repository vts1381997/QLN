var VayKBNNView = function () {

	var that = this;
	this.AppTitle = 'Vay kho bạc nhà nước';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oVayKBNN = new VayKBNN();
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
				ControlHelper.Input.disable(['#btnAddNew']);
				ControlHelper.Input.enable(['#btnEdit', '#btnCancel', '#btnDelete']);
				break;
			case 'EDIT':
				ControlHelper.Input.disable(['#btnEdit', '#btnAddNew']);
				ControlHelper.Input.enable(['#btnLuu', '#btnCancel', '#btnDelete']);
				break;
			default:
				break;
		}
	}

	this.bindGrid01 = function () {
		oVayKBNN.getAll();
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < oVayKBNN.LIST.length; i++) {
			var _item = oVayKBNN.LIST[i];
			var it = ''
			if (_item.MUCDICHVAY === 1) {
				it = "Bù đắp bộ chi"
			}
			if (_item.MUCDICHVAY === 2) {
				it = "Trả nợ gốc"
			}
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.VAYKHOBACNHANUOCID + '" />';
			aRows.push([
				(i + 1) + _hidden,
				it,
				_item.NGAYVAY,
				_item.THOIHANVAY,
				_item.VAYTRONGKY,
				_item.DUNODAUKY,
				_item.TENTINHTHANH,
				_item.TRANOGOC,
				_item.LUYKE,
				_item.LAIPHI,
				_item.SOTIENCONLAI,
			]);
		}
		that.oTable.rows.add(aRows).draw();
	}

	this.init = function () {
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
		that.bindGrid01();
	}

	$(function () {

		that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
		that.oDialog = new PopupDialog(reload);
		that.init();

		function reload() {
			that.filterAction('NEW');
			that.bindGrid01();
		}

		$('.ACTIONS').on('click', '#btnAddNew', function () {
			that.oDialog.show('Thêm mới', 'VayKBNNCT', '80%', '300px');
			oVayKBNN.getAll();
			var luyke = oVayKBNN.LIST
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.oDialog.show('Cập nhật', 'VayKBNNCT?id=' + oVayKBNN.VAYKHOBACNHANUOCID, '80%', '300px');
		});
		$('.ACTIONS').on('click', '#btnDelete', function () {
			if (!oVayKBNN.VAYKHOBACNHANUOCID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn để xóa', '40%', '50px');
				return false;
			}
			function ok() {
				var rs = oVayKBNN.del(oVayKBNN.VAYKHOBACNHANUOCID);
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show(rs.MESSAGE, '40%', '50px');
				that.bindGrid01();
				reload();
			}
			function cancel() { }

			var oConfirmDialog = new ConfirmDialog('Xác nhận xóa', ok, cancel);
			oConfirmDialog.show('Bạn có chắc chắn muốn xóa bản ghi này không?', '40%', '50px');
		});
		$('#Grid01 tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				oVayKBNN.VAYKHOBACNHANUOCID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				var id = $(this).find('.rowID').val();
				oVayKBNN.VAYKHOBACNHANUOCID = id;
				that.filterAction('SELECT');
			}
		});
	});
}