var PhanQuyenBaoCao = function(){
	
	var that = this;
	this.AppTitle = 'Phân quyền báo cáo';
	this.Id='';
	this.oTable = null;
	this.oDialog = null;
	
	this.init = function(){
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
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
		// that.init();

		function reload(){
			that.filterAction('NEW');
		}

		              $('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()                                                                               
			that.oDialog.show('Thêm Phân quyền báo cáo', 'PhanQuyenBaoCaoCT', '80%', '500px');
		});		
		$('.ACTIONS').on('click', '#btnDelete', function (e) {
				e.preventDefault()                                                        
			if (!that.oDmKhachHang.KHACHHANGID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn Phân quyền báo cáo để xóa','40%', '50px');
				return false;
			}

			function ok(){
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show('Xóa','40%', '50px');
			}
			function cancel(){}

			var oConfirmDialog = new ConfirmDialog('Xác nhận xóa', ok, cancel);
			oConfirmDialog.show('Bạn có chắc chắn muốn xóa bản ghi này không?','40%', '50px');
	    });
	});
}