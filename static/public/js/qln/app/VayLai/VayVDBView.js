var VayVDBView = function(){
	
	var that = this;
	this.AppTitle = 'Vay VDB';
	this.Id='';
	this.oTable = null;
	this.oDialog = null;
	oVayVDB = new VayVDB();
	this.init = function(){
		that.bindGrid01();
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
	}
	this.bindGrid01 = function () {
		oVayVDB.getAll();
		that.oTable.clear().draw();
		var aRows = [];

		for (var i = 0; i < oVayVDB.LIST.length; i++) {
			var _item = oVayVDB.LIST[i];
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.VAYVDBID+ '" />';
			aRows.push([
				(i + 1) + _hidden,
				_item.TENDUAN,
				_item.DUNOTONKY,
				_item.VAYTRONGKY,
				_item.GOC,
				_item.LAIPHI,
				_item.TONG,
				_item.TONG,
			]);
		}
		that.oTable.rows.add(aRows).draw();
	}
	this.filterAction = function(sState){
		switch (sState) {
			case 'NEW':
				ControlHelper.Input.disable(['#btnEdit','#btnSave','#btnDelete','#btnCancel']);
				ControlHelper.Input.enable(['#btnAddNew']);
				break;
			case 'SELECT':
				//ControlHelper.Input.disable(['#btnAddNew']);
				ControlHelper.Input.enable(['#btnEdit','#btnCancel','#btnDelete']);
				break;
			case 'EDIT':
				ControlHelper.Input.disable(['#btnEdit']);
				ControlHelper.Input.enable(['#btnSave','#btnCancel','#btnDelete']);
				break;
			default:
				break;
		}
	}
	
	$(function() {

		that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
		that.oDialog = new PopupDialog(reload);
		that.init();

		function reload(){
			that.bindGrid01();
			that.filterAction('NEW');	
		}

		$('.ACTIONS').on('click', '#btnAddNew', function () {
			that.oDialog.show('Thêm thông tin vay VDB', 'VayVDBCT', '80%', '250px');
		});		
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.oDialog.show('Sửa thông tin vay VDB', 'VayVDBCT?id='+oVayVDB.VAYVDBID, '80%', '250px');
		});
		$('.ACTIONS').on('click', '#btnDelete', function () {
			if (!oVayVDB.VAYVDBID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn thông tin vay VDB để xóa','40%', '50px');
				return false;
			}

			function ok(){
				var rs = oVayVDB.del(oVayVDB.VAYVDBID);
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show(rs.MESSAGE, '40%', '50px');
				//reload sau khi delete
				that.bindGrid01();
				reload();
			}
			function cancel(){}

			var oConfirmDialog = new ConfirmDialog('Xác nhận xóa', ok, cancel);
			oConfirmDialog.show('Bạn có chắc chắn muốn xóa bản ghi này không?','40%', '50px');
		});
		$('#Grid01 tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
			    oVayVDB.VAYVDBID = 0;
				that.filterAction('NEW');
            }
            else {
                that.oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
				var id = $(this).find('.rowID').val();
				oVayVDB.VAYVDBID = id;
				that.filterAction('SELECT');
	       }
	     });
	});
}