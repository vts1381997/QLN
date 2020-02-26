var MuaLaiTP = function(){
	
	var that = this;
	this.AppTitle = 'Biến động tài sản';
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
		// that.init();

		function reload(){
			that.filterAction('NEW');
		}

		$('.ACTIONS').on('click', '#btnAddNew', function () {
			that.oDialog.show('Thêm Biến động tài sản', 'BienDongTSCT', '80%', '500px');
		});		
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.oDialog.show('Thêm Biến động tài sản', 'BienDongTSCT', '80%', '500px');
		});	
		$('.ACTIONS').on('click', '#btnDelete', function () {
			if (!that.oDmKhachHang.KHACHHANGID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn Biến động tài sản để xóa','40%', '50px');
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
		
		$('#Grid01 tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				that.filterAction('NEW');
            }
            else {
                that.oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
				that.filterAction('SELECT');
	       }
	     });
	});
}