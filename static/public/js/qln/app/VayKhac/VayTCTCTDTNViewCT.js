var VayTCTCTDTNViewCT = function () {

	var that = this;
	this.oTable = null;
	this.oDialog = null;
	var oVayTCTCTDTNV = new VayTCTCTDTN();
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		oVayTCTCTDTNV.VAYTCTCTDTNID = Util.Url.getParameterByName('id');
		that.bindForm();
	}

	this.bindForm = function () {
		if (!oVayTCTCTDTNV.VAYTCTCTDTNID || oVayTCTCTDTNV.VAYTCTCTDTNID == '') {
			that.AppTitle = 'Thêm mới tổ chức tài chính tín dụng trong nước';
			oVayTCTCTDTNV.VAYTCTCTDTNID = 0;
			that.clearForm();
		} else {
			that.AppTitle = 'Cập nhật tổ chức tài chính tín dụng trong nước';
			oVayTCTCTDTNV.getById(oVayTCTCTDTNV.VAYTCTCTDTNID);
			$('#TINHTHANHID').val(oVayTCTCTDTNV.TINHTHANHID);
			$('#NGAYVAY').val(oVayTCTCTDTNV.NGAYVAY);
			$('#THOIHANVAY').val(oVayTCTCTDTNV.THOIHANVAY);
			$('#SOTIENVAY').val(oVayTCTCTDTNV.SOTIENVAY);
			$('#LAIPHI').val(oVayTCTCTDTNV.LAIPHI);
			$('#SOTIENTRA').val(oVayTCTCTDTNV.SOTIENTRA);
			$('#LUYKETRANO').val(oVayTCTCTDTNV.LUYKETRANO);
			$('#DUNO').val(oVayTCTCTDTNV.DUNO);
			$('#STATUS').val(oVayTCTCTDTNV.STATUS);
			$('#CREATEDDATE').val(oVayTCTCTDTNV.CREATEDDATE);
			$('#CREATEDBY').val(oVayTCTCTDTNV.CREATEDBY);
			$('#UPDATEDDATE').val(oVayTCTCTDTNV.UPDATEDDATE);
			$('#UPDATEDBY').val(oVayTCTCTDTNV.UPDATEDBY);
		}
	}

	this.clearForm = function () {
		$("#NGAYVAY").val($.datepicker.formatDate('dd/mm/yy', new Date()))
		$('#THOIHANVAY').val('');
		$('#SOTIENVAY').val('');
		$('#LAIPHI').val('');
		$('#SOTIENTRA').val('');
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
		that.oDialog = new PopupDialog(reload);
		that.initPage();
		function reload() {
			that.initPage();
		}
		$('.ACTIONS').on('click', '#btnSave', function () {
			oVayTCTCTDTNV.VAYTCTCTDTNID = oVayTCTCTDTNV.VAYTCTCTDTNID
			if (oVayTCTCTDTNV.VAYTCTCTDTNID == '') {
				oVayTCTCTDTNV.VAYTCTCTDTNID = 0;
			}
			oVayTCTCTDTNV.COQUANTAICHINH = $('#COQUANTAICHINH').val();
			oVayTCTCTDTNV.NGUONVAY = $('#NGUONVAY').val();
			oVayTCTCTDTNV.TIEUDE = $('#TIEUDE').val();
			oVayTCTCTDTNV.SOTIENVAY = $('#SOTIENVAY').val();
			oVayTCTCTDTNV.TIENTEID = $('#TIENTEID').val();
			oVayTCTCTDTNV.NGAYVAY = $('#NGAYVAY').val();
			oVayTCTCTDTNV.KYHANVAY = $('#KYHANVAY').val();
			oVayTCTCTDTNV.LAISUATVAY = $('#LAISUATVAY').val();
			oVayTCTCTDTNV.TINHTHANHID = $('#TINHTHANHID').val();		
			var rs = oVayTCTCTDTNV.save();
			if (!rs.CODE) {
				that.initPage();
			}
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(rs.MESSAGE, '40%', '50px');
		});
	});
}