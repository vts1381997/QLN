var BCTT84 = function(){
	
	var that = this;
	this.AppTitle = 'Báo cáo quản trị';
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

		that.oDialog = new PopupDialog(reload);
		that.init();

		function reload(){
			that.filterAction('NEW');
		}

		$('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()
			that.oDialog.show('Thêm Báo cáo quản trị', 'BCQuanTriCT', '85%', '500px');
		});		
		$('.ACTIONS').on('click', '#btnReport', function () {
            var _type = $('#ReportType').val();
            var _url = '';
            switch (_type) {
                case '1':
                    that.oDialog.show('bao cao 1.03', 'Bieumau103', '100%', '600', 'test1');
                    break;
                case '2':
                    that.oDialog.show('bao cao 1.04', 'Bieumau104', '100%', '600', 'test1');
                    break;
                case '3':
                    that.oDialog.show('bao cao 2.03', 'Bieumau203', '100%', '600', 'test1');
                    break;
                case '4':
                    that.oDialog.show('bao cao 2.04', 'Bieumau204', '100%', '600', 'test1');
                    break;
            }
        });
	});
}