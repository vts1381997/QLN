var BCKhac = function () {

	var that = this;
	this.AppTitle = 'Báo cáo khác';
	this.oDialog = null;
	var oBieuMauBaoCao = new BieuMauBaoCao();
	this.init = function () {
		$('#AppTitle').html(that.AppTitle);

	}
	// this.bindModal = function () {
	// 	//Lấy ra danh sách các báo cáo được phân quyền ứng với nhóm Quản trị
	// 	var vNhomBaoCao = 'KHAC';
	// 	fnc_baocao(vNhomBaoCao);
	// }

	function fnc_baocao(vNhomBaoCao) {
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
		var vNhomBaoCao = 'KHAC';
		fnc_baocao(vNhomBaoCao);
		that.oDialog = new PopupDialog();
		that.init();
		var date = moment(); //Get the current date
		var month = date.format("MM")
		var year = date.format("YYYY")
		var thang31 = [1, 3, 5, 7, 8, 10, 12]
		var nguoidungs = new NguoiDung();
		var tt_id = nguoidungs.getTinhThanhs();
		var list_tt = nguoidungs.getTinhThanh(tt_id[0].TINHTHANHID);
		var donvitinh = ''
		var tinhthanh
		var ngaybatdau
		var ngayketthuc
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

		// $("#ngaybatdau").val('01/' + month + '/' + year)
		$("#ngaybatdau").val("01/01/2019")
		$("#ngayketthuc").val("31/12/2019")
		// $("#ngayketthuc").val('30/' + month + '/' + year)
		ngaybatdau = $("#ngaybatdau").val()
		ngayketthuc = $("#ngayketthuc").val()
		$("#ngayketthuc").on('blur', function () { 
			var objNgayBatDau = $("#ngaybatdau").val().split('/')
			var objNgayKetThuc = $("#ngayketthuc").val().split('/')
			if(Number(String(objNgayBatDau[2]+objNgayBatDau[1]+objNgayBatDau[0])) > Number(String(objNgayKetThuc[2]+objNgayKetThuc[1]+objNgayKetThuc[0])))
			{
				$("#ngaybatdau").val($("#ngayketthuc").val())
			}
			ngayketthuc = $("#ngayketthuc").val();
		})
		$("#ngaybatdau").on('blur', function () {
			var objNgayBatDau = $("#ngaybatdau").val().split('/')
			var objNgayKetThuc = $("#ngayketthuc").val().split('/')
			if(Number(String(objNgayBatDau[2]+objNgayBatDau[1]+objNgayBatDau[0])) > Number(String(objNgayKetThuc[2]+objNgayKetThuc[1]+objNgayKetThuc[0])))
			{
				$("#ngaybatdau").val($("#ngayketthuc").val())
			}
			ngaybatdau = $("#ngaybatdau").val();
		})


		$("#tinhthanh").change(function () {
			tinhthanh = $("#tinhthanh").val()
		})
		
		$("#tinhthanh").trigger('change')

		$('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()
			that.oDialog.show('Thêm Báo cáo quản trị', 'BCQuanTriCT', '85%', '500px');
		});
		$('#ReportType').change(function () {
			$(this).val() + '' === '3' ? $('.dv_ngaybatdau').hide() : $('.dv_ngaybatdau').show()
			var _type = $('#ReportType').val();
			switch (_type) {
				case '4':
					$('#ngaybatdau').val('01' + '/' + '01' + '/' + ((new Date()).getFullYear()))
					$('#ngayketthuc').val('31' + '/' + '12' + '/' + ((new Date()).getFullYear()))
					break;
			}

		})
		$("#donvitinh").change(function(){
			donvitinh = $("#donvitinh option:selected").text()
		})
		$("#donvitinh").trigger('change')
		$('.ACTIONS').on('click', '#btnReport', function () {
			ngayketthuc = $("#ngayketthuc").val();
			ngaybatdau = $("#ngaybatdau").val();
			var dvt = $("#donvitinh").val();
			var tendvt = $("#donvitinh option:selected").select2();
			//Hiển thị báo cáo
			var a = $("#tinhthanh option:selected").select2();
			

			var vLinkFile = $('#ReportType option:selected').attr('data-link')
			var vTieuDe = $('#ReportType option:selected').attr('data-tieude')
			var vCao = $('#ReportType option:selected').attr('data-cao')
			var vRong = $('#ReportType option:selected').attr('data-rong')
			var tentinhthanh=''
			var ten = list_tt.filter(a=>a.TINHTHANHID==tinhthanh)
			tentinhthanh = ten[0].CHUCDANH
			that.oDialog.show('' + vTieuDe, '' + vLinkFile + '?tentinhthanh=' + tentinhthanh + ' &ngaybatdau=' + ngaybatdau + '&ngayketthuc=' + ngayketthuc + '&tinhthanh=' + tinhthanh + '&donvitinh=' + donvitinh + '&dvt=' + dvt, '' + vRong + '', '' + vCao + '', 'test1');
		});
	});  
}         