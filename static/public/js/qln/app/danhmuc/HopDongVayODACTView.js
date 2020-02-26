var HopDongVayODACTView = function () {

	var that = this;
	this.oTable = null;
	this.oDialog = null;
	var oHopDongVayODA = new HopDongVayODA();
	this.initPage = function () {
		$('#AppTitle').html(that.AppTitle);
		oHopDongVayODA.HOPDONGVAYODAID = Util.Url.getParameterByName('id');
		that.bindForm();
	}

	this.bindForm = function () {
		if (!oHopDongVayODA.HOPDONGVAYODAID || oHopDongVayODA.HOPDONGVAYODAID == '') {
			that.AppTitle = 'Thêm mới Tổ chức tài chính';
			oHopDongVayODA.HOPDONGVAYODAID = 0;
			that.clearForm();
		} else {
			that.AppTitle = 'Cập nhật Tổ chức tài chính';
			oHopDongVayODA.getById(oHopDongVayODA.HOPDONGVAYODAID);
			$('#SOHOPDONG').val(oHopDongVayODA.sohopdong);
			$('#NGAYKY').val(oHopDongVayODA.ngayky);
			$('#TENDUAN').val(oHopDongVayODA.tenduan);
			$('#COQUANCHOVAYLAI').val(oHopDongVayODA.coquanchovaylai);
			$('#COQUANUYQUYENCHOVAYLAI').val(oHopDongVayODA.coquanuyquyenchovaylai);
			$('#SOTIENKYVAY').val(oHopDongVayODA.sotienkyvay);
			$('#LAISUATVAY').val(oHopDongVayODA.laisuatvay);
			$('#NGAYHIEULUC').val(oHopDongVayODA.ngayhieuluc);
			$('#NGAYTRANOGOCDAUTIEN').val(oHopDongVayODA.ngaytranogocdautien);
			$('#NGAYTRANOLAIDAUTIEN').val(oHopDongVayODA.ngaytranolaidautien);
			$('#NGAYTRANOGOCCUOICUNG').val(oHopDongVayODA.ngaytranogoccuoicung);
			$('#NGAYTRANOLAICUOICUNG').val(oHopDongVayODA.ngaytranolaicuoicung);
			$('#PHUONGTHUCTRANOGOC').val(oHopDongVayODA.phuongthuctranogoc);
			$('#PHUONGTHUCTRANOLAI').val(oHopDongVayODA.phuongthuctranolai);
			$('#LAIPHAT').val(oHopDongVayODA.laiphat);
			$('#SOHIEPDINHVAYNUOCNGOAI').val(oHopDongVayODA.sohiepdinhvaynuocngoai);
			$('#PHIHIEPDINHVAYNUOCNGOAI').val(oHopDongVayODA.phihiepdinhvaynuocngoai);
			$('#PHIQUANLYCHOVAYLAI').val(oHopDongVayODA.phiquanlychovaylai);
			$('#LOAILAISUAT').val(oHopDongVayODA.loailaisuat);
			$('#LOAITIEN').val(oHopDongVayODA.loaitien);
			$('#STATUS').val(oHopDongVayODA.status);
			$('#CREATEDDATE').val(oHopDongVayODA.createddate);
			$('#CREATEDBY').val(oHopDongVayODA.createdby);
			$('#UPDATEDDATE').val(oHopDongVayODA.updateddate);
			$('#UPDATEDBY').val(oHopDongVayODA.updatedby);
		}
	}

	this.clearForm = function () {
		$('#SOHOPDONG').val('');
		$('#NGAYKY').val('');
		$('#TENDUAN').val('');
		$('#COQUANCHOVAYLAI').val('');
		$('#COQUANUYQUYENCHOVAYLAI').val('');
		$('#SOTIENKYVAY').val('');
		$('#LAISUATVAY').val('');
		$('#NGAYHIEULUCMA').val('');
		$('#NGAYTRANOGOCDAUTIEN').val('');
		$('#NGAYTRANOLAIDAUTIEN').val();
		$('#NGAYTRANOGOCCUOICUNG').val();
		$('#NGAYTRANOLAICUOICUNG').val();
		$('#PHUONGTHUCTRANOGOC').val('');
		$('#PHUONGTHUCTRANOLAI').val('');
		$('#LAIPHAT').val('');
		$('#SOHIEPDINHVAYNUOCNGOAI').val('');
		$('#PHIHIEPDINHVAYNUOCNGOAI').val('');
		$('#PHIQUANLYCHOVAYLAI').val('');
		$('#LOAILAISUAT').val('');
		$('#LOAITIEN').val('');
		$('#STATUS').val('');
		$('#CREATEDDATE').val('');
		$('#CREATEDBY').val('');
		$('#UPDATEDDATE').val('');
		$('#UPDATEDBY').val('');
	}


	$(function () {

		that.oDialog = new PopupDialog(reload);
		that.initPage();

		function reload() {
			that.initPage();
		}


		$('.ACTIONS').on('click', '#btnSave', function () {
			oHopDongVayODA.HOPDONGVAYODAID = oHopDongVayODA.HOPDONGVAYODAID
			if (oHopDongVayODA.HOPDONGVAYODAID == '') {
				oHopDongVayODA.HOPDONGVAYODAID = 0;
			}
			oHopDongVayODA.sohopdong = $('#SOHOPDONG').val()
			oHopDongVayODA.ngayky = $('#NGAYKY').val()
			oHopDongVayODA.tenduan = $('#TENDUAN').val()
			oHopDongVayODA.coquanchovaylai = $('#COQUANCHOVAYLAI').val()
			oHopDongVayODA.coquanuyquyenchovaylai = $('#COQUANUYQUYENCHOVAYLAI').val()
			oHopDongVayODA.sotienkyvay = $('#SOTIENKYVAY').val()
			oHopDongVayODA.laisuatvay = $('#LAISUATVAY').val()
			oHopDongVayODA.ngayhieuluc = $('#NGAYHIEULUC').val()
			oHopDongVayODA.ngaytranogocdautien = $('#NGAYTRANOGOCDAUTIEN').val()
			oHopDongVayODA.ngaytranolaidautien = $('#NGAYTRANOLAIDAUTIEN').val()
			oHopDongVayODA.ngaytranogoccuoicung = $('#NGAYTRANOGOCCUOICUNG').val()
			oHopDongVayODA.ngaytranolaicuoicung = $('#NGAYTRANOLAICUOICUNG').val()
			oHopDongVayODA.phuongthuctranogoc = $('#PHUONGTHUCTRANOGOC').val()
			oHopDongVayODA.phuongthuctranolai = $('#PHUONGTHUCTRANOLAI').val()
			oHopDongVayODA.laiphat = $('#LAIPHAT').val()
			oHopDongVayODA.sohiepdinhvaynuocngoai = $('#SOHIEPDINHVAYNUOCNGOAI').val()
			oHopDongVayODA.phihiepdinhvaynuocngoai = $('#PHIHIEPDINHVAYNUOCNGOAI').val()
			oHopDongVayODA.phiquanlychovaylai = $('#PHIQUANLYCHOVAYLAI').val()
			oHopDongVayODA.loailaisuat = $('#LOAILAISUAT').val()
			oHopDongVayODA.loaitien = $('#LOAITIEN').val()
			var rs = oHopDongVayODA.save();
			if (!rs.CODE) {
				that.initPage();
			}
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(rs.MESSAGE, '40%', '50px');
		});


	});
}