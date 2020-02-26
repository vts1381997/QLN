var BC_DotRutVon = function () {

	var that = this;
	this.AppTitle = 'Đợt trả nợ';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oBCRutVon = new BCRutVon();
	this.init = function () {
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
	}
	

	this.bindGrid01 = function () {
		oBCRutVon.getBC('1','01102019','31102019');
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < oBCRutVon.LIST.length; i++) {
			var _item = oBCRutVon.LIST[i];
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
		that.oTable = ControlHelper.Datatable.Init('tblDanhSach', 25, true);
		that.oDialog = new PopupDialog(reload);
		that.init();

		function reload() {
			that.filterAction('NEW');
			that.bindGrid01();
		}
		$('#Grid01 tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				oBCRutVon.DOTTRANOID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				var id = $(this).find('.rowID').val();
				oBCRutVon.DOTTRANOID = id;
				that.filterAction('SELECT');
			}
		});
	});
}