var DonViTienTeView = function () {

	var that = this;
	this.AppTitle = 'Đơn vị tiền tệ';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oDonViTienTe = new DonViTienTe();
	this.filterAction = function (sState) {
		switch (sState) {
			case 'NEW':
				ControlHelper.Input.disable([ '#btnEdit', '#btnSave', '#btnDelete', '#btnCancel' ]);
				ControlHelper.Input.enable([ '#btnAddNew' ]);
				break;
			case 'SELECT':
				ControlHelper.Input.enable([ '#btnEdit', '#btnCancel', '#btnDelete' ]);
				break;
			case 'EDIT':
				ControlHelper.Input.disable([ '#btnEdit', '#btnAddNew' ]);
				ControlHelper.Input.enable([ '#btnSave', '#btnCancel', '#btnDelete' ]);
				break;
			default:
				break;
		}
	}

	this.bindGrid01 = function () {
		oDonViTienTe.getAll();
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < oDonViTienTe.LIST.length; i++) {
			var _item = oDonViTienTe.LIST[ i ];
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.TIENTEID + '" />';
			aRows.push([
				(i + 1) + _hidden,
				_item.MA,
				_item.TEN,
				_item.CREATEDDATE,
				_item.CREATEDBY,
				_item.UPDATEDDATE,
				_item.UPDATEDBY,
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

		that.oTable = ControlHelper.Datatable.Init('Grid01', 10, true);
		that.oDialog = new PopupDialog(reload);
		that.init();

		function reload() {
			that.filterAction('NEW');
			that.bindGrid01();
		}

		$('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()
			that.oDialog.show('Thêm tiền tệ', 'DonViTienTeCT', '85%', '500px');
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.oDialog.show('Cập nhật tiền tệ', 'DonViTienTeCT?id=' + oDonViTienTe.TIENTEID, '85%', '300px');
		});
		$('.ACTIONS').on('click', '#btnDelete', function (e) {
				e.preventDefault()                                                        
			if (!oDonViTienTe.TIENTEID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn tiền tệ để xóa', '40%', '50px');
				return false;
			}
			function ok() {
				var rs = oDonViTienTe.del(oDonViTienTe.TIENTEID);
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show(rs.MESSAGE, '40%', '50px');
				//reload sau khi delete
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
				oDonViTienTe.TIENTEID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				var id = $(this).find('.rowID').val();
				oDonViTienTe.TIENTEID = id;
				that.filterAction('SELECT');
			}
		});
	});
}