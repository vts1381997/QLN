var BCQuanTri = function(){
	
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
		var date = moment(); //Get the current date
		var month = date.format("MM")
		var dayOfMonth = 30;
		var year = date.format("YYYY")
		var thang31 = [1,3,5,7,8, 10, 12]
		var tinhthanhs = new TinhThanh();
		tinhthanhs.getAll(); 
		var option=''
		for(i=0;i<tinhthanhs.LIST.length;i++){
			item = tinhthanhs.LIST[i]
			option = option+'<option value="'+item.TINHTHANHID+'">'+item.TEN+'</option>'
		}
		$("#tinhthanh").append(option)
		$("#tinhthanh").on('change',function(){ 
		})
		if(thang31.indexOf(month ))
			dayOfMonth = 31;
		else
			if(month = 2 && year%4 == 0)
			dayOfMonth = 29; 
		$("#ngaybatdau").val('01/' + month + '/' + year)
		$("#ngayketthuc").val(dayOfMonth + '/' + month + '/' + year)
		let ngaybatdau=$("#ngaybatdau").val();
		let ngayketthuc=$("#ngayketthuc").val();
		let tinhthanh= $("#tinhthanh").val()
		let dataParams = {
			nbd:ngaybatdau,
			nkt:ngayketthuc,
			tinhthanh:tinhthanh
		} 
		function reload(){
			that.filterAction('NEW');
		}
	
		$('.ACTIONS').on('click', '#btnAddNew', function () {
			that.oDialog.show('Thêm Báo cáo quản trị', 'BCQuanTriCT', '85%', '500px');
		});		
		$('.ACTIONS').on('click', '#btnReport', function () {
			var _type = $('#ReportType').val();
			
            var _url = '';
            switch (_type) {
                case '1':
                    that.oDialog.show('Báo cáo tổng hợp tình hình rút vốn trong tháng  theo từng khoản vay, đợt phát hành', 'BCTongHopRutVon?ngaybatdau='+ngaybatdau+'&ngayketthuc='+ngayketthuc+'&tinhthanh='+tinhthanh, '100%', '600', 'test1');
                    break;
                case '2':
                    that.oDialog.show('Báo cáo tổng hợp tình hình trả nợ trong tháng  theo từng khoản vay, đợt phát hành', 'BCTongHopTraNo', '100%', '600', 'test1');
                    break;
                case '3':
                    that.oDialog.show('Báo cáo tổng hợp tình hình dư nợ cuối tháng', 'BCTongHopDuNoCuoiThang', '100%', '600', 'test1');
                    break;
                case '4':
                    that.oDialog.show('Báo cáo tổng hợp tỷ lệ dư nợ so với thu ngân sách địa phương được hưởng theo phân cấp (%)', 'BCTongHopTyLeDuNoNSDP', '100%', '600', 'test1');
                    break;
                case '5':
                    that.oDialog.show('Báo cáo đối chiếu số liệu vay từ nhà tài trợ và số liệu vay từ CQĐP (vay ODA, vay ưu đãi)', 'BCDoiChieuSoLieuVayCQDP', '100%', '600', 'test1');
                    break;
                case '6':
                    that.oDialog.show('Báo cáo đối chiếu số liệu vay từ ngân quỹ nhà nước', 'BCDoiChieuSoLieuVayNQNN', '100%', '600', 'test1');
                    break;
                case '7':
                    that.oDialog.show('Báo cáo đối chiếu số liệu vay từ VDB (hoặc các tổ chức tài chính, tính dụng trong nước)', 'BCDoiChieuSoLieuVayVDB', '100%', '600', 'test1');
                    break;
            }
        });
	});
}