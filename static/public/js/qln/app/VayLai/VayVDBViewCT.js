var VayVDBViewCT = function () {

	var that = this;
	this.oTable = null;
	this.oDialog = null;
	oVayVDB = new VayVDB();
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		oVayVDB.VAYVDBID = Util.Url.getParameterByName('id');
		that.bindForm();
	}

	this.bindForm = function () {
		if (!oVayVDB.VAYVDBID || oVayVDB.VAYVDBID == '') {
			that.AppTitle = 'Thêm mới vay VDB';
			oVayVDB.VAYVDBID = 0;
			that.clearForm();
		} else {
			that.AppTitle = 'Cập nhật nhà tài trợ';
			oVayVDB.getById(oVayVDB.VAYVDBID);
			$('#DUANID').val(oVayVDB.DUANID);
			$('#NGAYTAO').val(oVayVDB.NGAYTAO);
			$('#DUNOTONKY').val(oVayVDB.DUNOTONKY);
			$('#VAYTRONGKY').val(oVayVDB.VAYTRONGKY);
			$('#GOC').val(oVayVDB.GOC);
			$('#LAIPHI').val(oVayVDB.LAIPHI);
			$('#TONG').val(oVayVDB.TONG);
			$('#TINHTHANHID').val(oVayVDB.TINHTHANHID);
			$('#STATUS').val(oVayVDB.STATUS);
			$('#CREATEDDATE').val(oVayVDB.CREATEDDATE);
			$('#CREATEDBY').val(oVayVDB.CREATEDBY);
			$('#UPDATEDDATE').val(oVayVDB.UPDATEDDATE);
			$('#UPDATEDBY').val(oVayVDB.UPDATEDBY);
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
			$('#DUANID').append(option)
			that.initPage();
		})
		that.oDialog = new PopupDialog(reload);
		that.initPage();
		function reload() {
			that.initPage();
		}
		$('.ACTIONS').on('click', '#btnSave', function () {
			oVayVDB.VAYVDBID = oVayVDB.VAYVDBID
			if (oVayVDB.VAYVDBID == '') {
				oVayVDB.VAYVDBID = 0;
			}
			oVayVDB.DUANID = $('#DUANID').val();
			oVayVDB.NGAYTAO = $('#NGAYTAO').val();
			oVayVDB.DUNOTONKY = $('#DUNOTONKY').val();
			oVayVDB.VAYTRONGKY = $('#VAYTRONGKY').val();
			oVayVDB.GOC = $('#GOC').val();
			oVayVDB.LAIPHI = $('#LAIPHI').val();
			oVayVDB.TONG = $('#TONG').val();
			oVayVDB.TINHTHANHID = $('#TINHTHANHID').val();		
			var rs = oVayVDB.save();
			if (!rs.CODE) {
				that.initPage();
			}
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(rs.MESSAGE, '40%', '50px');
		});
	});
}