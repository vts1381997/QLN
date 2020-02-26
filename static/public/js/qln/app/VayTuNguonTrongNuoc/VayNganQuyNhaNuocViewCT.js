var VayNganQuyNhaNuocViewCT = function () {

	var that = this;
	this.oTable = null;
	this.oDialog = null;
	var oNganQuyNhaNuoc = new VayNganQuyNhaNuoc();
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		oNganQuyNhaNuoc.VAYNGANQUYNHANUOCID = Util.Url.getParameterByName('id');
		that.bindForm();
	}

	this.bindForm = function () {
		if (!oNganQuyNhaNuoc.VAYNGANQUYNHANUOCID || oNganQuyNhaNuoc.VAYNGANQUYNHANUOCID == '') {
			that.AppTitle = 'Thêm mới vay ngân quỹ nhà nước';
			oNganQuyNhaNuoc.VAYNGANQUYNHANUOCID = 0;
			that.clearForm();
		} else {
			that.AppTitle = 'Cập nhật vay ngân quỹ nhà nước';
			oNganQuyNhaNuoc.getById(oNganQuyNhaNuoc.VAYNGANQUYNHANUOCID);
			$('#COQUANTAICHINH').val(oNganQuyNhaNuoc.COQUANTAICHINH);
			$('#TIEUDE').val(oNganQuyNhaNuoc.TIEUDE);
			$('#NGUONVAY').val(oNganQuyNhaNuoc.NGUONVAY);
			$('#SOTIENVAY').val(oNganQuyNhaNuoc.SOTIENVAY);
			$('#NGAYVAY').val(oNganQuyNhaNuoc.NGAYVAY);
			$('#KYHANVAY').val(oNganQuyNhaNuoc.KYHANVAY);
			$('#LAISUATVAY').val(oNganQuyNhaNuoc.LAISUATVAY);
			$('#TINHTHANHID').val(oNganQuyNhaNuoc.TINHTHANHID);
			$('#TIENTEID').val(oNganQuyNhaNuoc.TIENTEID);
			$('#STATUS').val(oNganQuyNhaNuoc.STATUS);
			$('#CREATEDDATE').val(oNganQuyNhaNuoc.CREATEDDATE);
			$('#CREATEDBY').val(oNganQuyNhaNuoc.CREATEDBY);
			$('#UPDATEDDATE').val(oNganQuyNhaNuoc.UPDATEDDATE);
			$('#UPDATEDBY').val(oNganQuyNhaNuoc.UPDATEDBY);
		}
	}

	this.clearForm = function () {
		//$('#DUAN').val('');
		$('#COQUANTAICHINH').val('');
		//$('#NGUONVAY').val('');
		$('#TIEUDE').val('');
		$('#SOTIENVAY').val('');
		$('#NGAYVAY').val('');
		$('#KYHANVAY').val('');
		$('#LAISUATVAY').val('');
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
		var MuaLaiTPs = new TienTe()
		MuaLaiTPs.getAll();
		$(document).ready(()=> {
			var resultDanhSach = MuaLaiTPs.LIST
			var option = ''
			resultDanhSach.map(value => {
				option = option + "<option value='" + value.TIENTEID + "'>" + value.TEN + "</option>"
			})		
			$('#TIENTEID').append(option)
			that.initPage();
		})
		that.oDialog = new PopupDialog(reload);
		that.initPage();
		function reload() {
			that.initPage();
		}
		$('.ACTIONS').on('click', '#btnSave', function () {
			oNganQuyNhaNuoc.VAYNGANQUYNHANUOCID = oNganQuyNhaNuoc.VAYNGANQUYNHANUOCID
			if (oNganQuyNhaNuoc.VAYNGANQUYNHANUOCID == '') {
				oNganQuyNhaNuoc.VAYNGANQUYNHANUOCID = 0;
			}
			oNganQuyNhaNuoc.COQUANTAICHINH = $('#COQUANTAICHINH').val();
			oNganQuyNhaNuoc.NGUONVAY = $('#NGUONVAY').val();
			oNganQuyNhaNuoc.TIEUDE = $('#TIEUDE').val();
			oNganQuyNhaNuoc.SOTIENVAY = $('#SOTIENVAY').val();
			oNganQuyNhaNuoc.TIENTEID = $('#TIENTEID').val();
			oNganQuyNhaNuoc.NGAYVAY = $('#NGAYVAY').val();
			oNganQuyNhaNuoc.KYHANVAY = $('#KYHANVAY').val();
			oNganQuyNhaNuoc.LAISUATVAY = $('#LAISUATVAY').val();
			oNganQuyNhaNuoc.TINHTHANHID = $('#TINHTHANHID').val();		
			var rs = oNganQuyNhaNuoc.save();
			if (!rs.CODE) {
				that.initPage();
			}
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(rs.MESSAGE, '40%', '50px');
		});
	});
}