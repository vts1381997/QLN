var VayNhaTaiTroView = function(){
	
	var that = this;
	this.AppTitle = 'Vay nhà tài trợ';
	this.Id='';
	this.oTable = null;
	this.oDialog = null;
	var oVayNhaTaiTro = new VayNhaTaiTro();
	this.init = function(){
		that.bindGrid01();
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
	}
	this.bindGrid01 = function () {
		oVayNhaTaiTro.getAll();
		that.oTable.clear().draw();
		var aRows = [];

		for (var i = 0; i < oVayNhaTaiTro.LIST.length; i++) {
			var _item = oVayNhaTaiTro.LIST[i];
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.VAYNHATAITROID+ '" />';
			var trangthai = _item.STATUS == 1 ? '<span class="label label-success">Kích hoạt</span>' : '<span class="label label-danger">Khóa</span>';

			aRows.push([
				(i + 1) + _hidden,
				_item.TENDUAN,
				_item.DUNOTONKY,
				_item.VAYTRONGKY,
				_item.GOC,
				_item.LAIPHI,
				_item.TONG,
				trangthai
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
				ControlHelper.Input.disable(['#btnAddNew']);
				ControlHelper.Input.enable(['#btnEdit','#btnCancel','#btnDelete']);
				break;
			case 'EDIT':
				ControlHelper.Input.disable(['#btnEdit','#btnAddNew']);
				ControlHelper.Input.enable(['#btnSave','#btnCancel','#btnDelete']);
				break;
			default:
				break;
		}
	}
	
	$(function() {

		that.oTable = ControlHelper.Datatable.Init('Grid01', 10, true);
		that.oDialog = new PopupDialog(reload);
		that.init();

		function reload(){
			that.bindGrid01();
			that.filterAction('NEW');
		}

		$('.ACTIONS').on('click', '#btnAddNew', function () {
			that.oDialog.show('Thêm vay nhà tài trợ', 'VayNhaTaiTroCT', '80%', '500px');
		});		
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.oDialog.show('Sửa vay nhà tài trợ', 'VayNhaTaiTroCT?id='+oVayNhaTaiTro.VAYNHATAITROID, '80%', '500px');
		});		
		$('.ACTIONS').on('click', '#btnDelete', function () {
			if (!oVayNhaTaiTro.VAYNHATAITROID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn vay nhà tài trợ để xóa','40%', '50px');
				return false;
			}

			function ok(){
				var rs = oVayNhaTaiTro.del(oVayNhaTaiTro.VAYNHATAITROID);
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
				oVayNhaTaiTro.VAYNHATAITROID=0;
				that.filterAction('NEW');
            }
            else {
                that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				var id = $(this).find('.rowID').val();
				oVayNhaTaiTro.VAYNHATAITROID = id;
				that.filterAction('SELECT');
	       }
	     });
	});
}