var BCTheoThongTu = function () {

	var that = this;
	this.AppTitle = 'Báo cáo theo thông tư';
	this.oDialog = null;
	var oBieuMauBaoCao = new BieuMauBaoCao();
	this.init = function () {
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
	}

	this.filterAction = function (sState) {
		switch (sState) {
			case 'NEW':
				ControlHelper.Input.disable(['#btnEdit', '#btnSave', '#btnDelete', '#btnCancel']);
				ControlHelper.Input.enable(['#btnAddNew']);
				break;
			case 'SELECT':
				ControlHelper.Input.disable(['#btnAddNew']);
				ControlHelper.Input.enable(['#btnEdit', '#btnCancel', '#btnDelete']);
				break;
			case 'EDIT':
				ControlHelper.Input.disable(['#btnEdit', '#btnAddNew']);
				ControlHelper.Input.enable(['#btnSave', '#btnCancel', '#btnDelete']);
				break;
			default:
				break;
		}
	}

	this.bindModal = function () {
		//Lấy ra danh sách các báo cáo được phân quyền ứng với nhóm Quản trị
		var vNhomBaoCao = 'ND97';
		fnc_baocao(vNhomBaoCao);
	}

	function fnc_baocao(vNhomBaoCao) {
		try {
			var optionBaoCao = '';
			var vBaoCao = oBieuMauBaoCao.getAllBaoCaoByNhomVaQuyen(vNhomBaoCao);
			if (vBaoCao.length > 0) {
				vBaoCao.map(value => {
					optionBaoCao = optionBaoCao + '<option data-tieude="' + value.TIEUDE + '" data-link="' + value.LINKFILE + '" data-cao="' + value.CAO + '" data-rong="' + value.RONG + '" value="' + value.MA + '">' + value.MA + ': ' + value.TIEUDE + '</option>'
				})

				$("#ReportType").html(optionBaoCao)
			}
		}
		catch (e) {
			console.log(e)
		}
	}

	$(function () {
		that.bindModal();
		that.oDialog = new PopupDialog(reload);
		that.init();
		$('.ngaybatdau').hide()
		$('.ngayketthuc').hide()
		var nguoidungs = new NguoiDung();
		var tt_id = nguoidungs.getTinhThanhs();
		var list_tt = nguoidungs.getTinhThanh(tt_id[0].TINHTHANHID);
		// var list_tt = tinhthanhs.getByDepartmentId();
		var option = ''
		list_tt.map(function (item, index) {
			option = option + '<option data-tentinh='+item.CHUCDANH+' value="' + item.TINHTHANHID + '">' + item.TEN + '</option>'
		})
		$("#tinhthanh").html(option)
		function reload() {
			that.filterAction('NEW');
		}
		var year_cr = (new Date()).getFullYear()
		var option_value;
		for (var j = -1; j < 21; j++) {
			option_value = option_value + '<option value="' + (Number(year_cr) + Number(j)) + '">' + (Number(year_cr) + Number(j)) + '</option>'
		}
		$('#nam').html(option_value)
		$('#nam').val('2020')
		$('#ReportType').change(function () {
			var _type = $('#ReportType').val();
			switch (_type) {
				case '1': $('.nam').show()
					break;
				case '2':
					$('.nam').show()
					break;
				case '3':
					$('.nam').show()
					break;
			}
		})

		$("#ReportType").trigger('change')

		$('.ACTIONS').on('click', '#btnReport', function () {
			var dvt = $("#donvitinh").val();
			var tendvt = $("#donvitinh option:selected").select2();
			var tinhthanh = $("#tinhthanh").val()
			var tentinhthanh=''
			var nam = $('#nam').val()
			var ten = list_tt.filter(a=>a.TINHTHANHID==tinhthanh)
			tentinhthanh = ten[0].CHUCDANH
			//Hiển thị báo cáo
			var vLinkFile = $('#ReportType option:selected').attr('data-link')
			var vTieuDe = $('#ReportType option:selected').attr('data-tieude')
			var vCao = $('#ReportType option:selected').attr('data-cao')
			var vRong = $('#ReportType option:selected').attr('data-rong')
			that.oDialog.show('' + vTieuDe, '' + vLinkFile + '?namquyetdinh=' + $('#nam').val() + '&tinhthanh=' + tinhthanh + '&tentinhthanh=' + tentinhthanh + '&nam=' + nam + '&tendvt=' + tendvt.html() + '&dvt=' + dvt, '' + vRong + '', '' + vCao + '', 'test1');
		});
	});
}