var DanhMucView = function () {
	var idDanhMuc = '';
	var that = this;
	this.AppTitle = 'Tỉnh/Thành phố';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oDanhMuc = new DanhMuc();
	var Validate = new validate();
	var listDM = []
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
		oDanhMuc.getAll();
		that.oTable.clear().draw();
		listDM = oDanhMuc.LIST
		var aRows = [];


		for (var i = 0; i < oDanhMuc.LIST.length; i++) {
			var _item = oDanhMuc.LIST[i];
			var _hidden = '<p style="display:none" class="rowID" >' + JSON.stringify(_item) + '</p>';
			var trangthai = _item.STATUS == 1 ? '<span class="label label-success">Kích hoạt</span>' : '<span class="label label-danger">Khóa</span>';

			aRows.push([
				(i + 1) + _hidden,
				_item.NAME,
				_item.DESCRIPTION,

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
		oDanhMuc.NAME = $('#NAME').val()
		oDanhMuc.DESCRIPTION = $('#DESCRIPTION').val()
	}
	$(function () {
		
		that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
		that.oDialog = new PopupDialog(reload);
		that.init();

		function reload() {
			that.bindGrid01();
			that.filterAction('NEW');
		}

		              $('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()                                                                               
			$('#NAME').val('');
			$('#DESCRIPTION').val('');
			$('#STATUS').val('0');
			$('#CREATEDDATE').val('');
			$('#CREATEDBY').val('');
			$('#UPDATEDDATE').val('');
			$('#UPDATEDBY').val('');
			oDanhMuc.ID = '';
			oDanhMuc.ioru = 1
			that.bindModal();
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			var danhmucbyid = JSON.parse(idDanhMuc)
			oDanhMuc.ID = danhmucbyid.ID;
			$('#NAME').val(danhmucbyid.NAME)
			$('#DESCRIPTION').val(danhmucbyid.DESCRIPTION)
		});
		$('.ACTIONS').on('click', '#btnDelete', function (e) {
				e.preventDefault()                                                        
			var danhmucbyid = JSON.parse(idDanhMuc).ID
			if (!danhmucbyid) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn tỉnh/thành phố để xóa', '40%', '50px');
				return false;
			}

			function ok() {
				var rs = oDanhMuc.del(danhmucbyid)
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show(rs.MESSAGE, '40%', '50px');
				that.bindGrid01();
			}
			function cancel() { }

			var oConfirmDialog = new ConfirmDialog('Xác nhận xóa', ok, cancel);
			oConfirmDialog.show('Bạn có chắc chắn muốn xóa bản ghi này không?', '40%', '50px');
		});
		$(".btnSave").on('click', function (e) {
			e.preventDefault()                                                                   
			oDanhMuc.NAME = $('#NAME').val();
			oDanhMuc.DESCRIPTION = $('#DESCRIPTION').val();
			var rs = oDanhMuc.save();
			that.bindGrid01();
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(rs.MESSAGE, '40%', '50px');
		})
		$('#Grid01 tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				oDanhMuc.ID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				idDanhMuc = $(this).find('.rowID').text();
				oDanhMuc.ID = idDanhMuc;
				that.filterAction('SELECT');
			}
		});
	});
}