var VayNhaTaiTroViewCT = function () {

	var that = this;
	this.oTable = null;
	this.oDialog = null;
	var oVayNhaTaiTro = new VayNhaTaiTro();
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		oVayNhaTaiTro.VAYNHATAITROID = Util.Url.getParameterByName('id');
		that.bindForm();
	}

	this.bindForm = function () {
		if (!oVayNhaTaiTro.VAYNHATAITROID || oVayNhaTaiTro.VAYNHATAITROID == '') {
			that.AppTitle = 'Thêm mới vay nhà tài trợ';
			oVayNhaTaiTro.VAYNHATAITROID = 0;
			that.clearForm();
		} else {
			that.AppTitle = 'Cập nhật nhà tài trợ';
			oVayNhaTaiTro.getById(oVayNhaTaiTro.VAYNHATAITROID);
			$('#DUAN').val(oVayNhaTaiTro.DUAN);
			$('#NGAYTAO').val(oVayNhaTaiTro.NGAYTAO);
			$('#DUNOTONKY').val(oVayNhaTaiTro.DUNOTONKY);
			$('#VAYTRONGKY').val(oVayNhaTaiTro.VAYTRONGKY);
			$('#GOC').val(oVayNhaTaiTro.GOC);
			$('#LAIPHI').val(oVayNhaTaiTro.LAIPHI);
			$('#TONG').val(oVayNhaTaiTro.TONG);
			$('#TINHTHANHID').val(oVayNhaTaiTro.TINHTHANHID);
			$('#STATUS').val(oVayNhaTaiTro.STATUS);
			$('#CREATEDDATE').val(oVayNhaTaiTro.CREATEDDATE);
			$('#CREATEDBY').val(oVayNhaTaiTro.CREATEDBY);
			$('#UPDATEDDATE').val(oVayNhaTaiTro.UPDATEDDATE);
			$('#UPDATEDBY').val(oVayNhaTaiTro.UPDATEDBY);
		}
	}

	this.clearForm = function () {
		//$('#DUAN').val('');
		$('#NGAYTAO').val('');
		$('#DUNOTONKY').val('');
		$('#VAYTRONGKY').val('');
		$('#GOC').val('');
		$('#LAIPHI').val('');
		$('#TONG').val('');
		$('#STATUS').val('0');
		$('#CREATEDDATE').val('');
		$('#CREATEDBY').val('');
		$('#UPDATEDDATE').val('');
		$('#UPDATEDBY').val(1);
	}


	$(function () {
		var TinhThanhss = new TinhThanh()
		TinhThanhss.getAll();	
		$(document).ready(()=> {
			var resultTinhthanh = TinhThanhss.LIST
			var option = ''
			resultTinhthanh.map(value => {
				option = option + "<option value='" + value.TINHTHANHID + "'>" + value.TEN + "</option>"
			})		
			$('#TINHTHANHID').append(option)
			that.initPage();
		})
		var MuaLaiTPs = new DuAn()
		MuaLaiTPs.getAll();
		$(document).ready(()=> {
			var resultDanhSach = MuaLaiTPs.LIST
			var option = ''
			resultDanhSach.map(value => {
				option = option + "<option value='" + value.DUANID + "'>" + value.TEN + "</option>"
			})		
			$('#DUAN').append(option)
			that.initPage();
		})
		that.oDialog = new PopupDialog(reload);
		that.initPage();
		function reload() {
			that.initPage();
		}
		$('.ACTIONS').on('click', '#btnSave', function () {
			oVayNhaTaiTro.VAYNHATAITROID = oVayNhaTaiTro.VAYNHATAITROID
			if (oVayNhaTaiTro.VAYNHATAITROID == '') {
				oVayNhaTaiTro.VAYNHATAITROID = 0;
			}
			oVayNhaTaiTro.DUAN = $('#DUAN').val();
			oVayNhaTaiTro.NGAYTAO = $('#NGAYTAO').val();
			oVayNhaTaiTro.DUNOTONKY = $('#DUNOTONKY').val();
			oVayNhaTaiTro.VAYTRONGKY = $('#VAYTRONGKY').val();
			oVayNhaTaiTro.GOC = $('#GOC').val();
			oVayNhaTaiTro.LAIPHI = $('#LAIPHI').val();
			oVayNhaTaiTro.TONG = $('#TONG').val();
			oVayNhaTaiTro.TINHTHANHID = $('#TINHTHANHID').val();		
			var rs = oVayNhaTaiTro.save();
			if (!rs.CODE) {
				that.initPage();
			}
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(rs.MESSAGE, '40%', '50px');
		});
	});
}