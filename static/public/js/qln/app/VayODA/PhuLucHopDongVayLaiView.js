var PhuLucHopDongVayLaiView = function () {
	var idPhuLucHopDong = 0;
	var that = this;
	this.AppTitle = 'Phụ lục hợp đồng vay lại';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oPhuLucHopDongVayLai = new PhuLucHopDongVayLai();
	var Validate = new validate();
	this.filterAction = function (sState) {
		switch (sState) {
			case 'NEW':
				ControlHelper.Input.disable([ '#btnEdit', '#btnSave', '#btnDelete', '#btnCancel' ]);
				ControlHelper.Input.enable([ '#btnAddNew' ]);
				break;
			case 'SELECT':
				ControlHelper.Input.enable([ '#btnEdit', '#btnCancel', '#btnDelete' ]);
				break;
			case 'EDIT':
				ControlHelper.Input.disable([ '#btnEdit' ]);
				ControlHelper.Input.enable([ '#btnSave', '#btnCancel', '#btnDelete' ]);
				break;
			default:
				break;
		}
	}

	this.bindGrid01 = function () {
		oPhuLucHopDongVayLai.getAll();
		that.oTable.clear().draw();

		var aRows = [];
		for (var i = 0; i < oPhuLucHopDongVayLai.LIST.length; i++) {
			var _item = oPhuLucHopDongVayLai.LIST[ i ];
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.PHULUCHOPDONGVAYLAIID + '" />';
			aRows.push([
				(i + 1) + _hidden,
				_item.MA,
				_item.TENPHULUC,
				_item.TENHOPDONGVAYLAI,
				_item.NGAYKY,
				_item.NGUOIKY,
				_item.TENTINHTHANH,
			]);
		}
		that.oTable.rows.add(aRows).draw();
	}

	this.init = function () {
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
		that.bindGrid01();
	}
	this.bindModal = function () {
		var TinhThanhs = new TinhThanh()
		TinhThanhs.getAll();
		var resultTinhthanh = TinhThanhs.LIST
		var option = ''
		resultTinhthanh.map(value => {
			option = option + "<option value='" + value.TINHTHANHID + "'>" + value.TEN + "</option>"
		})
		$('#TINHTHANHID').html(option)
		var DuAns = new HopDongVayLai()
		DuAns.getAll();
		var resultDuAn = DuAns.LIST
		var option = ''
		resultDuAn.map((value, index) => {
			option = option + "<option " + (index === 0 ? 'select="select"' : '') + "value =" + value.TENDUAN + ">"
		})
		$('#TENDUAN').html(option)
		var HopDongVayLais = new HopDongVayLai()
		HopDongVayLais.getAll();
		var resultHopDongVayLai = HopDongVayLais.LIST
		var option = ''
		resultHopDongVayLai.map((value, index) => {
			option = option + "<option value='" + value.HOPDONGVAYLAIID + "'>" + value.TEN + "</option>"
		})
		$('#HOPDONGVAYLAIID').html(option)
		let id_f = $("#HOPDONGVAYLAIID").val();
		var result_f = HopDongVayLais.getById(id_f);
		if (result_f) {
			$("#TENDUAN").val(result_f[ 0 ].TENDUAN)
		}
		$("#HOPDONGVAYLAIID").change(() => {
			let id = $("#HOPDONGVAYLAIID").val();
			var result = HopDongVayLais.getById(id);
			if (result) {
				$("#TENDUAN").val(result[ 0 ].TENDUAN)
			}
		})
		if (idPhuLucHopDong > 0) {
			oPhuLucHopDongVayLai.getById(idPhuLucHopDong);
			$('#MA').val(oPhuLucHopDongVayLai.MA);
			$('#TENPHULUC').val(oPhuLucHopDongVayLai.TENPHULUC);
			$('#HOPDONGVAYLAIID').val(oPhuLucHopDongVayLai.HOPDONGVAYLAIID);
			$('#NGAYKY').val(oPhuLucHopDongVayLai.NGAYKY);
			$('#NGUOIKY').val(oPhuLucHopDongVayLai.NGUOIKY);
			$('#TINHTHANHID').val(oPhuLucHopDongVayLai.TINHTHANHID);
			$('#GHICHU').val(oPhuLucHopDongVayLai.GHICHU);
			$('#STATUS').val(oPhuLucHopDongVayLai.STATUS);
			$('#CREATEDDATE').val(oPhuLucHopDongVayLai.CREATEDDATE);
			$('#CREATEDBY').val(oPhuLucHopDongVayLai.CREATEDBY);
			$('#UPDATEDDATE').val(oPhuLucHopDongVayLai.UPDATEDDATE);
			$('#UPDATEDBY').val(oPhuLucHopDongVayLai.UPDATEDBY);
		}
	}
	$(document).ready(function () {
		that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
		that.oDialog = new PopupDialog(reload);
		that.init();
		function reload() {
			that.filterAction('NEW');
			that.bindGrid01();
		}

		              $('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()                                                                               
			$('#MA').val('');
			$('#TENPHULUC').val('');
			$("#NGAYKY").val($.datepicker.formatDate('dd/mm/yy', new Date()))
			$('#NGUOIKY').val('');
			$('#GHICHU').val('');
			idPhuLucHopDong = 0;
			that.bindModal();
			fnc_removeSpace();
			fnc_validateSpace("TENPHULUC");
			fnc_validateSpace("NGUOIKY");
			fnc_validateSpace("GHICHU");
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.bindModal();
		});
		$('.ACTIONS').on('click', '#btnDelete', function (e) {
				e.preventDefault()                                                        
			if (!oPhuLucHopDongVayLai.PHULUCHOPDONGVAYLAIID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn kế hoạch để xóa', '40%', '50px');
				return false;
			}
			function ok() {
				var rs = oPhuLucHopDongVayLai.del(oPhuLucHopDongVayLai.PHULUCHOPDONGVAYLAIID);
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show(rs.MESSAGE, '40%', '50px');
				//reload sau khi delete
				that.bindGrid01();
				reload();
			}
			function cancel() { }
			var oConfirmDialog = new ConfirmDialog('Xác nhận xóa', ok, cancel);
			oConfirmDialog.show('Bạn có chắc chắn muốn xóa bản ghi này không?', '40%', '50px');
		});
		$(".btnSave").on('click', function (e) {
			e.preventDefault()                                                                   
			var fl = Validate.required();
			if (fl) {
				oPhuLucHopDongVayLai.PHULUCHOPDONGVAYLAIID = idPhuLucHopDong;
				oPhuLucHopDongVayLai.MA = $('#MA').val();
				oPhuLucHopDongVayLai.TENPHULUC = $('#TENPHULUC').val();
				oPhuLucHopDongVayLai.HOPDONGVAYLAIID = $('#HOPDONGVAYLAIID').val();
				oPhuLucHopDongVayLai.NGAYKY = $('#NGAYKY').val();
				oPhuLucHopDongVayLai.NGUOIKY = $('#NGUOIKY').val();
				oPhuLucHopDongVayLai.TINHTHANHID = $('#TINHTHANHID').val();
				oPhuLucHopDongVayLai.GHICHU = $('#GHICHU').val();
				oPhuLucHopDongVayLai.STATUS = $('#STATUS').val();
				oPhuLucHopDongVayLai.CREATEDDATE = $('#CREATEDDATE').val();
				oPhuLucHopDongVayLai.CREATEDBY = $('#CREATEDBY').val();
				oPhuLucHopDongVayLai.UPDATEDDATE = $('#UPDATEDDATE').val();
				oPhuLucHopDongVayLai.UPDATEDBY = $('#UPDATEDBY').val();
				var rs = oPhuLucHopDongVayLai.save();
				that.bindGrid01();
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show(rs.MESSAGE, '40%', '50px');
			}
		})
		$('#Grid01 tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				oPhuLucHopDongVayLai.PHULUCHOPDONGVAYLAIID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				idPhuLucHopDong = $(this).find('.rowID').val();
				oPhuLucHopDongVayLai.PHULUCHOPDONGVAYLAIID = idPhuLucHopDong;
				that.filterAction('SELECT');
			}
		});
	});
}