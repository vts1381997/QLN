var VayQuyDuTruTinhView = function () {

	var that = this;
	this.AppTitle = 'Vay dự trữ tỉnh';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oVayQuyDuTruTinh = new VayQuyDuTruTinh();
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
		oVayQuyDuTruTinh.getAll();
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < oVayQuyDuTruTinh.LIST.length; i++) {
			var _item = oVayQuyDuTruTinh.LIST[i];
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.VAYQUYDUTRUTINHID + '" />';
			aRows.push([
				(i + 1) + _hidden,
				_item.TENTINHTHANH,
				_item.COQUANTAICHINH,
				_item.NGAYVAY,
				_item.THOIHANVAY,
				_item.HANMUCVAY,
				_item.SOTIENVAY,
				_item.TRAGOC,
				_item.LUYKETRANO,	
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
			that.oDialog.show('Thêm mới', 'VayQuyDuTruTinhCT', '80%', '250px');
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.oDialog.show('Cập nhật', 'VayQuyDuTruTinhCT?id=' + oVayQuyDuTruTinh.VAYQUYDUTRUTINHID, '80%', '250px');
		});
		$('.ACTIONS').on('click', '#btnDelete', function () {
			if (!oVayQuyDuTruTinh.VAYQUYDUTRUTINHID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn để xóa', '40%', '50px');
				return false;
			}
			function ok() {
				var rs = oVayQuyDuTruTinh.del(oVayQuyDuTruTinh.VAYQUYDUTRUTINHID);
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
				oVayQuyDuTruTinh.VAYQUYDUTRUTINHID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				var id = $(this).find('.rowID').val();
				oVayQuyDuTruTinh.VAYQUYDUTRUTINHID = id;
				that.filterAction('SELECT');
			}
		});
	});
}