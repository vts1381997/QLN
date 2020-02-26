var DotPHTPViewCT = function () {

	var that = this;
	this.oTable = null;
	this.oDialog = null;
	var oDotPHTP = new DotPHTP();
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		oDotPHTP.DOTPHATHANHTRAIPHIEUID = Util.Url.getParameterByName('id');
		that.bindForm();
	}

	this.bindForm = function () {
		if (!oDotPHTP.DOTPHATHANHTRAIPHIEUID || oDotPHTP.DOTPHATHANHTRAIPHIEUID == '') {
			that.AppTitle = 'Thêm mới đợt phát hành trái phiếu';
			oDotPHTP.DOTPHATHANHTRAIPHIEUID = 0;
			that.clearForm();
		} else {
			that.AppTitle = 'Cập nhật đợt phát hành trái phiếu';
			oDotPHTP.getById(oDotPHTP.DOTPHATHANHTRAIPHIEUID);
			$('#MA').val(oDotPHTP.MA);
			$('#TEN').val(oDotPHTP.TEN);
			$('#SOQUYETDINH').val(oDotPHTP.SOQUYETDINH);
			$('#TENTOCHUCPHATHANH').val(oDotPHTP.TENTOCHUCPHATHANH);
			$('#KLPHDUKIEN').val(oDotPHTP.KLPHDUKIEN);
			$('#KLPHTHANHCONG').val(oDotPHTP.KLPHTHANHCONG);
			$('#LAISUATPHDUKIEN').val(oDotPHTP.LAISUATPHDUKIEN);
			$('#LAISUATPHTHANHCONG').val(oDotPHTP.LAISUATPHTHANHCONG);
			$('#KYHANTRAIPHIEU').val(oDotPHTP.KYHANTRAIPHIEU);
			$('#DEANPHATHANHTRAIPHIEUID').val(oDotPHTP.DEANPHATHANHTRAIPHIEUID);
			$('#TIENTHUCNHAN').val(oDotPHTP.TIENTHUCNHAN);
			$('#NGAYQUYETDINH').val(oDotPHTP.NGAYQUYETDINH);
			$('#GHICHU').val(oDotPHTP.GHICHU);
			$('#THOIHANTRAIPHIEU').val(oDotPHTP.THOIHANTRAIPHIEU);
			$('#PHUONGTHUCPHATHANH').val(oDotPHTP.PHUONGTHUCPHATHANH);
			$('#NGAYPHATHANH').val(oDotPHTP.NGAYPHATHANH);
			$('#STATUS').val(oDotPHTP.STATUS);
			$('#CREATEDDATE').val(oDotPHTP.CREATEDDATE);
			$('#CREATEDBY').val(oDotPHTP.CREATEDBY);
			$('#UPDATEDDATE').val(oDotPHTP.UPDATEDDATE);
			$('#UPDATEDBY').val(oDotPHTP.UPDATEDBY);
		}
	}

	this.clearForm = function () {
		$('#MA').val('');
		$('#TEN').val('');
		$('#SOQUYETDINH').val('');
		$('#TENTOCHUCPHATHANH').val('');
		$('#KLPHDUKIEN').val('');
		$('#KLPHTHANHCONG').val('');
		$('#LAISUATPHDUKIEN').val('');
		$('#LAISUATPHTHANHCONG').val('');
		//$('#DEANPHATHANHTRAIPHIEUID').val('');
		$('#KYHANTRAIPHIEU').val('');
		$('#TIENTHUCNHAN').val('');
		$('#NGAYQUYETDINH').val('');
		$('#GHICHU').val('');
		$('#THOIHANTRAIPHIEU').val('');
		//$('#PHUONGTHUCPHATHANH').val('');
		$('#NGAYPHATHANH').val('');
		$('#STATUS').val('0');
		$('#CREATEDDATE').val('');
		$('#CREATEDBY').val('');
		$('#UPDATEDDATE').val('');
		$('#UPDATEDBY').val(1);
	}


	$(function () {
		var TinhThanhs = new TinhThanh()
		TinhThanhs.getAll();	
		$(document).ready(()=> {
			var resultTinhthanh = TinhThanhs.LIST
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
		var DeAnPHTPs= new DeAnPHTP()
		DeAnPHTPs.getAll();
		$(document).ready(()=>{
			var resultDeAn = DeAnPHTPs.LIST
			
			var option = ''
			resultDeAn.map(value => {
				option = option + "<option value='"+value.DEANPHATHANHTRAIPHIEUID+"'>"+value.TEN+"</option>"
			})
			$('#DEANPHATHANHTRAIPHIEUID').append(option)
			that.initPage();
		})
		that.oDialog = new PopupDialog(reload);
		that.initPage();

		function reload() {
			that.initPage();
		}


		$('.ACTIONS').on('click', '#btnSave', function () {
			oDotPHTP.DOTPHATHANHTRAIPHIEUID = oDotPHTP.DOTPHATHANHTRAIPHIEUID
			if (oDotPHTP.DOTPHATHANHTRAIPHIEUID == '') {
				oDotPHTP.DOTPHATHANHTRAIPHIEUID = 0;

			}
			oDotPHTP.MA = $('#MA').val();
			oDotPHTP.TEN = $('#TEN').val();
			oDotPHTP.SOQUYETDINH = $('#SOQUYETDINH').val();
			oDotPHTP.TENTOCHUCPHATHANH = $('#TENTOCHUCPHATHANH').val();
			oDotPHTP.KLPHDUKIEN = $('#KLPHDUKIEN').val();
			oDotPHTP.KLPHTHANHCONG = $('#KLPHTHANHCONG').val();
			oDotPHTP.LAISUATPHDUKIEN = $('#LAISUATPHDUKIEN').val();
			oDotPHTP.LAISUATPHTHANHCONG = $('#LAISUATPHTHANHCONG').val();
			oDotPHTP.DEANPHATHANHTRAIPHIEUID = $('#DEANPHATHANHTRAIPHIEUID').val();
			oDotPHTP.KYHANTRAIPHIEU = $('#KYHANTRAIPHIEU').val();
			oDotPHTP.TIENTHUCNHAN = $('#TIENTHUCNHAN').val();			
			oDotPHTP.NGAYQUYETDINH = $('#NGAYQUYETDINH').val();			
			oDotPHTP.GHICHU = $('#GHICHU').val();			
			oDotPHTP.THOIHANTRAIPHIEU= $('#THOIHANTRAIPHIEU').val();	
			oDotPHTP.PHUONGTHUCPHATHANH= $('#PHUONGTHUCPHATHANH').val();	
			oDotPHTP.NGAYPHATHANH= $('#NGAYPHATHANH').val();	
			var rs = oDotPHTP.save();
			if (!rs.CODE) {
				that.initPage();
			}
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(rs.MESSAGE, '40%', '50px');
		});


	});
}