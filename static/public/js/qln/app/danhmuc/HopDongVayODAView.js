var HopDongVayODAView = function () {

	var that = this;
	this.AppTitle = 'Hợp đồng vay ODA';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;

	var oDmHopDongVayODA = new HopDongVayODA();


	this.bindGrid01 = function () {
		oDmHopDongVayODA.getAll();
		that.oTable.clear().draw();
		var aRows = [];

		for (var i = 0; i < oDmHopDongVayODA.LIST.length; i++) {
			var _item = oDmHopDongVayODA.LIST[i];
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.HOPDONGVAYODAID + '" />';
			var trangthai = _item.status == 1 ? '<span class="label label-success">Kích hoạt</span>' : '<span class="label label-danger">Khóa</span>';

			aRows.push([
				(i + 1) + _hidden,
				_item.SOHOPDONG,
				_item.NGAYKY,
				_item.TENDUAN,
				_item.COQUANCHOVAYLAI,
				_item.COQUANUYQUYENCHOVAYLAI,
				_item.SOTIENKYVAY,
				_item.LAISUATVAY,
				_item.NGAYHIEULUC,
				_item.NGAYTRANOGOCDAUTIEN,
				_item.NGAYTRANOLAIDAUTIEN,
				_item.NGAYTRANOGOCCUOICUNG,
				_item.NGAYTRANOLAICUOICUNG,
				_item.PHUONGTHUCTRANOGOC,
				_item.PHUONGTHUCTRANOLAI,
				_item.LAIPHAT,
				_item.SOHIEPDINHVAYNUOCNGOAI,
				_item.PHIHIEPDINHVAYNUOCNGOAI,
				_item.PHIQUANLYCHOVAYLAI,
				_item.LOAILAISUAT,
				_item.LOAITIEN,
				_item.STATUS,
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
				ControlHelper.Input.disable(['#btnEdit', '#btnAddNew']);
				ControlHelper.Input.enable(['#btnSave', '#btnCancel', '#btnDelete']);
				break;
			default:
				break;
		}
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
			that.oDialog.show('Thêm hợp đồng vay ODA', 'HopDongVayODACT', '80%', '500px');
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.oDialog.show('Sua hợp đồng vay ODA', 'HopDongVayODACT?id=2', '80%', '500px');
			that.oDialog.show('Sua hợp đồng vay ODA', 'HopDongVayODACT?id='+oDmHopDongVayODA.HOPDONGVAYODAID, '80%', '500px');
		});
		$('.ACTIONS').on('click', '#btnDelete', function (e) {
				e.preventDefault()                                                        
			if (!oDmHopDongVayODA.HOPDONGVAYODAID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn hợp đồng để xóa', '40%', '50px');
				return false;
			}

			function ok() {
				var rs = oDmHopDongVayODA.del(oDmHopDongVayODA.HOPDONGVAYODAID);
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show(rs.MESSAGE, '40%', '50px');
				that.bindGrid01();
			}
			function cancel() { }

			var oConfirmDialog = new ConfirmDialog('Xác nhận xóa', ok, cancel);
			oConfirmDialog.show('Bạn có chắc chắn muốn xóa bản ghi này không?', '40%', '50px');
		});
		$('#Grid01 tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				oDmHopDongVayODA.HOPDONGVAYODAID = id;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				var id = $(this).find('.rowID').val();
				oDmHopDongVayODA.HOPDONGVAYODAID = id;
				that.filterAction('SELECT');
			}
		});
	});
}