var VayTCTCTDTNView = function(){
	
	var that = this;
	this.AppTitle = 'Vay tổ chức tài chính tín dụng trong nước';
	this.Id='';
	this.oTable = null;
	this.oDialog = null;
	var oVayTCTCTDTN = new VayTCTCTDTN();
	this.init = function(){
		that.bindGrid01();
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
	}
	this.bindGrid01 = function(){
		oVayTCTCTDTN.getAll();
        that.oTable.clear().draw();
        var aRows = [];
        
        for (var i = 0; i < oVayTCTCTDTN.LIST.length; i++) {
            var _item = oVayTCTCTDTN.LIST[i];
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.VAYTCTCTDTNID + '" />';
            aRows.push([
				(i + 1) + _hidden,
				_item.TENTINHTHANH,
				_item.NGAYVAY,
				_item.KYHANVAY,
				_item.SOTIENVAY,
				_item.LAISUATVAY,
				_item.LAISUATVAY,
				_item.LAISUATVAY,
				_item.LAISUATVAY,
				
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
			that.oDialog.show('Thêm thông tin vay tổ chức tài chính tín dụng trong nước', 'VayTCTCTDTNCT', '80%', '250px');
		});		
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.oDialog.show('Sửa thông tin vay tổ chức tài chính tín dụng trong nước', 'VayTCTCTDTNCT?id='+oVayTCTCTDTN.VAYTCTCTDTNID, '80%', '250px');
		});		
		$('.ACTIONS').on('click', '#btnDelete', function () {
			if (!oVayTCTCTDTN.VAYTCTCTDTNID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn thông tin vay tổ chức tài chính tín dụng trong nước để xóa','40%', '50px');
				return false;
			}

			function ok(){
				var rs = oVayTCTCTDTN.del(oVayTCTCTDTN.VAYTCTCTDTNID);
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
				oVayTCTCTDTN.VAYTCTCTDTNID = 0;
				that.filterAction('NEW');
            }
            else {
                that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				var id = $(this).find('.rowID').val();
				oVayTCTCTDTN.VAYTCTCTDTNID = id;
				that.filterAction('SELECT');
	       }
	     });
	});
}