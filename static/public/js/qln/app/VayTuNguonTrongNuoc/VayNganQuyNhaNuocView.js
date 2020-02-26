var VayNganQuyNhaNuocView = function(){
	
	var that = this;
	this.AppTitle = 'Vay ngân quỹ nhà nước';
	this.Id='';
	this.oTable = null;
	this.oDialog = null;
	var oNganQuyNhaNuoc = new VayNganQuyNhaNuoc();
	this.init = function(){
		that.bindGrid01();
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
	}
	this.bindGrid01 = function(){
		oNganQuyNhaNuoc.getAll();
        that.oTable.clear().draw();
        var aRows = [];
        
        for (var i = 0; i < oNganQuyNhaNuoc.LIST.length; i++) {
            var _item = oNganQuyNhaNuoc.LIST[i];
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.VAYNGANQUYNHANUOCID + '" />';
			var trangthai = _item.STATUS==1?'<span class="label label-success">Kích hoạt</span>':'<span class="label label-danger">Khóa</span>';
			
            aRows.push([
				(i + 1) + _hidden,
				_item.COQUANTAICHINH,
				_item.TIEUDE,
				_item.NGUONVAY,
				_item.SOTIENVAY,
				_item.NGAYVAY,
				_item.KYHANVAY,
				_item.LAISUATVAY,
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
			that.oDialog.show('Thêm thông tin vay ngân quỹ nhà nước', 'VayNganQuyNhaNuocCT', '80%', '500px');
		});	
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.oDialog.show('Sửa thông tin vay ngân quỹ nhà nước', 'VayNganQuyNhaNuocCT?id='+oNganQuyNhaNuoc.VAYNGANQUYNHANUOCID, '80%', '500px');
		});		
		$('.ACTIONS').on('click', '#btnDelete', function () {
			if (!oNganQuyNhaNuoc.VAYNGANQUYNHANUOCID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn thông tin vay ngân quỹ nhà nước để xóa','40%', '50px');
				return false;
			}

			function ok(){
				var rs = oNganQuyNhaNuoc.del(oNganQuyNhaNuoc.VAYNGANQUYNHANUOCID);
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
				oNganQuyNhaNuoc.VAYNGANQUYNHANUOCID = 0;
				that.filterAction('NEW');
            }
            else {
                that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				var id = $(this).find('.rowID').val();
				oNganQuyNhaNuoc.VAYNGANQUYNHANUOCID = id;
				that.filterAction('SELECT');
	       }
	     });
	});
}