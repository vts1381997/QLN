var DanhBaView = function () {

	var that = this;
	this.AppTitle = 'Danh mục Danh bạ';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	this.oDmDanhBa = new DanhBa();

	this.init = function () {
		$('#AppTitle').html(that.AppTitle);
		$('#KEY').val('');
		that.filterAction('NEW');
		that.bindGrid01();
	}

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
		that.oDmDanhBa.DANHBAID = 0;
		var searchKey = $('#KEY').val();
		that.oDmDanhBa.search(searchKey);
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < that.oDmDanhBa.LIST.length; i++) {
			var _item = that.oDmDanhBa.LIST[ i ];
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.DANHBAID + '" />';
			aRows.push([
				(i + 1) + _hidden
				, _item.HOTEN
				, _item.SODIENTHOAI
				, _item.EMAIL
				, _item.DIACHI
			]);
		}
		that.oTable.rows.add(aRows).draw();
	}

	$(function () {

		that.oTable = ControlHelper.Datatable.Init('Grid01', 10, true);
		that.oDialog = new PopupDialog(reload);
		that.init();

		function reload() {
			that.bindGrid01();
			that.filterAction('NEW');
		}

		$('.ACTIONS').on('click', '#btnSearch', function () {
			that.bindGrid01();
			that.filterAction('NEW');
		});

		$('.ACTIONS').on('click', '#btnRefresh', function () {
			that.init();
		});

		$('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()
			that.oDialog.show('Thêm mới danh bạ', 'danhbact', '50%', '300px');
		});

		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.oDialog.show('Cập nhật danh bạ', 'danhbact?id=' + that.oDmDanhBa.DANHBAID, '50%', '300px');
		});

		$('.ACTIONS').on('click', '#btnDelete', function (e) {
				e.preventDefault()                                                        
			if (!that.oDmDanhBa.DANHBAID || that.oDmDanhBa.DANHBAID == 0) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn người để xóa khỏi danh bạ', '40%', '50px');
				return false;
			}

			function ok() {
				var rs = that.oDmDanhBa.del(that.oDmDanhBa.DANHBAID);
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show(rs.MESSAGE, '40%', '50px');
				reload();
			}
			function cancel() { }

			var oConfirmDialog = new ConfirmDialog('Xác nhận xóa', ok, cancel);
			oConfirmDialog.show('Bạn có chắc chắn muốn xóa bản ghi này không?', '40%', '50px');
		});

		$('#Grid01 tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				that.oDmDanhBa.DANHBAID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				var id = $(this).find('.rowID').val();
				that.oDmDanhBa.DANHBAID = id;
				that.filterAction('SELECT');
			}
		});
	});
}