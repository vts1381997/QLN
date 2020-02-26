var BCTT80 = function () {

	var that = this;
	this.AppTitle = 'Báo cáo quản trị';
	this.oDialog = null;
	var oBieuMauBaoCao = new BieuMauBaoCao();

	that.oDialog = new PopupDialog(reload);
	var date = moment(); //Get the current date
	var month = date.format("MM")
	var dayOfMonth = 30;
	var year = date.format("YYYY")
	var thang31 = [ 1, 3, 5, 7, 8, 10, 12 ]
	var tinhthanhs = new TinhThanh();
	var nguoidungs = new NguoiDung();
	var tt_id = nguoidungs.getTinhThanhs();
	var list_tt = nguoidungs.getTinhThanh(tt_id[ 0 ].TINHTHANHID);
	var option = ''
	list_tt.map(function (item, index) {
		option = option + '<option value="' + item.TINHTHANHID + '">' + item.TEN + '</option>'
	})
	$("#tinhthanh").html(option)
	if (thang31.indexOf(month))
		dayOfMonth = 31;
	else
		if (month = 2 && year % 4 == 0)
			dayOfMonth = 29;

	$("#ngaybatdau").val('01/' + '01' + '/' + year)
	$("#ngayketthuc").val('31/' + '12' + '/' + year)
	ngaybatdau = $("#ngaybatdau").val()
	ngayketthuc = $("#ngayketthuc").val()
	$("#ngayketthuc").on('blur', function () {
		ngayketthuc = $("#ngayketthuc").val();
	})
	$("#ngaybatdau").on('blur', function () {
		ngaybatdau = $("#ngaybatdau").val();
	})


	$("#tinhthanh").change(function () {
		tinhthanh = $("#tinhthanh").val()
	})
	function reload() {
		that.filterAction('NEW');
	}
	$("#tinhthanh").trigger('change')

	let tentinhthanh = $("#tinhthanh option:selected").select2().html();
	this.init = function () {
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
	}

	this.filterAction = function (sState) {
		switch (sState) {
			case 'NEW':
				ControlHelper.Input.disable([ '#btnEdit', '#btnSave', '#btnDelete', '#btnCancel' ]);
				ControlHelper.Input.enable([ '#btnAddNew' ]);
				break;
			case 'SELECT':
				ControlHelper.Input.disable([ '#btnAddNew' ]);
				ControlHelper.Input.enable([ '#btnEdit', '#btnCancel', '#btnDelete' ]);
				break;
			case 'EDIT':
				ControlHelper.Input.disable([ '#btnEdit', '#btnAddNew' ]);
				ControlHelper.Input.enable([ '#btnSave', '#btnCancel', '#btnDelete' ]);
				break;
			default:
				break;
		}
	}

	this.bindModal = function () {
		//Lấy ra danh sách các báo cáo được phân quyền ứng với nhóm Quản trị
		var vNhomBaoCao = 'TT80';
		fnc_baocao(vNhomBaoCao);
	}

	function fnc_baocao(vNhomBaoCao) {
		var optionnam = ''
		for (var i = (new Date()).getFullYear() - 10; i <= (new Date()).getFullYear() + 10; i++) {
			optionnam = optionnam + '<option value="' + i + '"> Năm ' + i + ' </option>'
		}
		$('#nam').html(optionnam).val((new Date()).getFullYear()).select2()
		try {
			var optionBaoCao = '';
			var vBaoCao = oBieuMauBaoCao.getAllBaoCaoByNhomVaQuyen(vNhomBaoCao);
			if (vBaoCao.length > 0) {
				vBaoCao.map(value => {
					optionBaoCao = optionBaoCao + '<option data-tieude="' + value.TIEUDE + '" data-link="' + value.LINKFILE + '" data-cao="' + value.CAO + '" data-rong="' + value.RONG + '" value="' + value.MA + '">' + value.MA + ': ' + value.TIEUDE + '</option>'
				})

				$("#ReportType").html(optionBaoCao).select2()
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

		function reload() {
			that.filterAction('NEW');
		}

		$('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()
			that.oDialog.show('Thêm Báo cáo quản trị', 'BCQuanTriCT', '85%', '500px');
		});
		$('.ACTIONS').on('click', '#btnReport', function () {
			//Hiển thị báo cáo
			var tinhthanh = $("#tinhthanh").val()
			var tentinhthanh = ''
			var ten = list_tt.filter(a => a.TINHTHANHID == tinhthanh)
			tentinhthanh = ten[ 0 ].CHUCDANH.toUpperCase()
			var nam = $('#nam').val()
			var vLinkFile = $('#ReportType option:selected').attr('data-link')
			var vTieuDe = $('#ReportType option:selected').attr('data-tieude')
			var vCao = $('#ReportType option:selected').attr('data-cao')
			var vRong = $('#ReportType option:selected').attr('data-rong')
			var txt_dvt = $('#select2-donvitinh-container').html()

			that.oDialog.show('' + vTieuDe, '' + vLinkFile + '?nam=' + nam + '&tinhthanhid=' + tinhthanh + '&tentinhthanh=' + tentinhthanh + '&donvitinh=' + $('#donvitinh').val() + '&txt_dvt=' + txt_dvt, '' + vRong + '', '' + vCao + '', 'test1');

		});
	});
}