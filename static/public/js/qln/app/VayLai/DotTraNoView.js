var DotTraNoView = function () {

	var that = this;
	this.AppTitle = 'Đợt trả nợ';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oDotTraNo = new DotTraNo();
	this.init = function(){
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
		oDotTraNo.getAll();
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < oDotTraNo.LIST.length; i++) {
			var _item = oDotTraNo.LIST[i];
			if (_item.NGUONVAY === 1) {
				_item.nguonvay = "Vay OĐA"
			}
			if (_item.NGUONVAY === 2) {
				_item.nguonvay = "Trái phiếu CQĐP"
			}
			if (_item.NGUONVAY === 3) {
				_item.nguonvay = "Vay TCTĐ"
			}
			if (_item.NGUONVAY === 4) {
				_item.nguonvay = "Vay ngân quỹ"
			}
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.DOTTRANOID + '" />';
			aRows.push([
				(i + 1) + _hidden,
				_item.TENHOPDONG,
				_item.nguonvay,
				_item.KYTRA,
				_item.SOTIENTRAGOC,
				_item.SOTIENTRALAI,
				_item.SOTIENTRAPHI,
				_item.SOTIENPHAT,
				_item.SOLECHCHI,
				_item.DUNO,
				_item.NGAYTRA,
				_item.TENTIENTE,
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
			that.oDialog.show('Thêm Đợt trả nợ', 'DotTraNoCT', '80%', '500px');
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.oDialog.show('Cập nhật đợt trả nợ', 'DotTraNoCT?id=' + oDotTraNo.DOTTRANOID, '80%', '400px');
		});
		$('.ACTIONS').on('click', '#btnDelete', function () {
			if (!oDotTraNo.DOTTRANOID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn Đợt trả nợ để xóa', '40%', '50px');
				return false;
			}
			function ok() {
				var rs = oDotTraNo.del(oDotTraNo.DOTTRANOID);
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
				oDotTraNo.DOTTRANOID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				var id = $(this).find('.rowID').val();
				oDotTraNo.DOTTRANOID = id;
				that.filterAction('SELECT');
			}
		});
	});
}