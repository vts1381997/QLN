var TyGiaView = function () {

	var that = this;
	this.AppTitle = 'Trung test nha bro';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oTyGia = new TyGia();
	this.filterAction = function (sState) {
		switch (sState) {
			case 'NEW':
				ControlHelper.Input.disable(['#btnEdit', '#btnSave', '#btnDelete', '#btnCancel']);
				ControlHelper.Input.enable(['#btnAddNew']);
				break;
			case 'SELECT':
				//ControlHelper.Input.disable(['#btnAddNew']);
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

		oTyGia.getAll();

		that.oTable.clear().draw();
		var aRows = [];
		$('#date').val(oTyGia.LIST.DateTime[0])
		for (var i = 0; i < oTyGia.LIST.Exrate.length; i++) {
			var _item = oTyGia.LIST.Exrate[i].$;
			var _hidden = '<input type="hidden" class="rowID" />';
			aRows.push([
				(i + 1) + _hidden,
				_item.CurrencyCode,
				_item.CurrencyName,
				_item.Buy,
				_item.Transfer,
				_item.Sell,
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
		}
		$(document).ready(()=>{
			$("#updateTien").on('click',function(){
				oTyGia.update();
			})
		})
		
	});

}