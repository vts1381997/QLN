var KeHoachVay05NamView = function () {
	var idKeHoach5Nam = 0;
	var that = this;
	this.AppTitle = 'Kế hoạch vay trong 3 năm';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oKeHoachVay05Nam = new KeHoachVay05Nam();
	var qr = [];
	$("#DONVIID").html(fnc_danhsachdonvi())
	this.filterAction = function (sState) {
		switch (sState) {
			case 'NEW':
				ControlHelper.Input.disable(['#btnEdit', '#btnSave', '#btnDelete', '#btnCancel']);
				ControlHelper.Input.enable(['#btnAddNew']);
				break;
			case 'SELECT':
				ControlHelper.Input.enable(['#btnEdit', '#btnCancel', '#btnDelete']);
				break;
			case 'EDIT':
				ControlHelper.Input.disable(['#btnEdit']);
				ControlHelper.Input.enable(['#btnSave', '#btnCancel', '#btnDelete']);
				break;
			default:
				break;
		}
	}
	function addCommas(nStr) {
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}
	function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
		try {
			decimalCount = Math.abs(decimalCount);
			decimalCount = isNaN(decimalCount) ? 0 : decimalCount;

			const negativeSign = amount < 0 ? "-" : "";

			let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
			let j = (i.length > 3) ? i.length % 3 : 0;

			return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
		} catch (e) {
			console.log(e)
		}
	};
	this.bindGrid01 = function () {
		oKeHoachVay05Nam.getAll();
		that.oTable.clear().draw();
		var aRows = [];
		var sum1 = 0;
		var sum2 = 0;
		var sum3 = 0;
		var sum4 = 0;
		for (var i = 0; i < oKeHoachVay05Nam.LIST.length; i++) {
			var _item = oKeHoachVay05Nam.LIST[i];
			if (oKeHoachVay05Nam.LIST[i].HANMUCVAY) {
				sum1 = sum1 + parseInt(oKeHoachVay05Nam.LIST[i].HANMUCVAY)
			}
			if (oKeHoachVay05Nam.LIST[i].DUNOVAY) {
				sum2 = sum2 + parseInt(oKeHoachVay05Nam.LIST[i].DUNOVAY)
			}
			if (oKeHoachVay05Nam.LIST[i].DUKIENVAY) {
				sum3 = sum3 + parseInt(oKeHoachVay05Nam.LIST[i].DUKIENVAY)
			}
			if (oKeHoachVay05Nam.LIST[i].DUKIENTRANO) {
				sum4 = sum4 + parseInt(oKeHoachVay05Nam.LIST[i].DUKIENTRANO)
			}
			_item.hanmucvay = formatMoney(_item.HANMUCVAY)
			_item.dunovay = formatMoney(_item.DUNOVAY)
			_item.dukienvay = formatMoney(_item.DUKIENVAY)
			_item.dukientra = formatMoney(_item.DUKIENTRANO)
			_item.sum5 = formatMoney(sum1)
			_item.sum6 = formatMoney(sum2)
			_item.sum7 = formatMoney(sum3)
			_item.sum8 = formatMoney(sum4)
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.KEHOACHVAY5NAMID + '" />';
			aRows.push([
				(i + 1) + _hidden,
				_item.MA,
				_item.TEN,
				_item.NAMBATDAU,
				_item.NAMKETTHUC,
				_item.NGAYQUYETDINH,
				_item.TENTINHTHANH,
				_item.hanmucvay,
				_item.dunovay,
				_item.dukienvay,
				_item.dukientra,
				_item.STATUS,
				_item.CREATEDDATE,
				_item.CREATEDBY,
				_item.UPDATEDDATE,
				_item.UPDATEDBY,
				_item.DUKIENVAY,
				_item.DUKIENTRANO,
			]);
		}
		that.oTable.rows.add(aRows).draw();
	}

	// this.bindGrid01 = function (isSearch) {
	// 	if (isSearch) {
	// 		that.oTable.clear().draw();
	// 		var aRows = [];
	// 		var sum1 = 0;
	// 		var sum2 = 0;
	// 		var sum3 = 0;
	// 		var sum4 = 0;
	// 		for (var i = 0; i < isSearch.length; i++) {
	// 			var _item = isSearch[i];
	// 			if (oKeHoachVay05Nam.LIST[i].HANMUCVAY) {
	// 				sum1 = sum1 + parseInt(oKeHoachVay05Nam.LIST[i].HANMUCVAY)
	// 			}
	// 			if (oKeHoachVay05Nam.LIST[i].DUNOVAY) {
	// 				sum2 = sum2 + parseInt(oKeHoachVay05Nam.LIST[i].DUNOVAY)
	// 			}
	// 			if (oKeHoachVay05Nam.LIST[i].DUKIENVAY) {
	// 				sum3 = sum3 + parseInt(oKeHoachVay05Nam.LIST[i].DUKIENVAY)
	// 			}
	// 			if (oKeHoachVay05Nam.LIST[i].DUKIENTRANO) {
	// 				sum4 = sum4 + parseInt(oKeHoachVay05Nam.LIST[i].DUKIENTRANO)
	// 			}
	// 			_item.hanmucvay = formatMoney(_item.HANMUCVAY)
	// 			_item.dunovay = formatMoney(_item.DUNOVAY)
	// 			_item.dukienvay = formatMoney(_item.DUKIENVAY)
	// 			_item.dukientra = formatMoney(_item.DUKIENTRANO)
	// 			_item.sum5 = formatMoney(sum1)
	// 			_item.sum6 = formatMoney(sum2)
	// 			_item.sum7 = formatMoney(sum3)
	// 			_item.sum8 = formatMoney(sum4)
	// 			var _hidden = '<input type="hidden" class="rowID" value="' + _item.KEHOACHVAY5NAMID + '" />';
	// 			that.keys = [
	// 				'i_stt',
	// 				'i_MA',
	// 				'i_TEN',
	// 				'i_NAMBATDAU',
	// 				'i_NAMKETTHUC',
	// 				'i_NGAYQUYETDINH',
	// 				'i_TENTINHTHANH',
	// 				'i_hanmucvay',
	// 				'i_dunovay',
	// 				'i_dukienvay',
	// 				'i_dukientra',
	// 				'i_STATUS',
	// 				'i_DUKIENVAY',
	// 				'i_DUKIENTRANO'
	// 			]
	// 			var data = [
	// 				(i + 1) + _hidden,
	// 				_item.MA,
	// 				_item.TEN,
	// 				_item.NAMBATDAU,
	// 				_item.NAMKETTHUC,
	// 				_item.NGAYQUYETDINH,
	// 				_item.TENTINHTHANH,
	// 				_item.hanmucvay,
	// 				_item.dunovay,
	// 				_item.dukienvay,
	// 				_item.dukientra,
	// 				_item.STATUS,
	// 				_item.CREATEDDATE,
	// 				_item.CREATEDBY,
	// 				_item.UPDATEDDATE,
	// 				_item.UPDATEDBY,
	// 				_item.DUKIENVAY,
	// 				_item.DUKIENTRANO,
	// 			]
	// 			aRows.push(data);
	// 		}
	// 		that.oTable.rows.add(aRows).draw();
	// 	}
	// 	else {
	// 		oKeHoachVay05Nam.getAll();
	// 		// var rs = oSearch.searchkehoachvay5nam([])
	// 		that.oTable.clear().draw();
	// 		var aRows = [];
	// 		var sum1 = 0;
	// 		var sum2 = 0;
	// 		var sum3 = 0;
	// 		var sum4 = 0;
	// 		if (oKeHoachVay05Nam.LIST) {

	// 			for (var i = 0; i < oKeHoachVay05Nam.LIST.length; i++) {
	// 				var _item = oKeHoachVay05Nam.LIST[i];
	// 				if (oKeHoachVay05Nam.LIST[i].HANMUCVAY) {
	// 					sum1 = sum1 + parseInt(oKeHoachVay05Nam.LIST[i].HANMUCVAY)
	// 				}
	// 				if (oKeHoachVay05Nam.LIST[i].DUNOVAY) {
	// 					sum2 = sum2 + parseInt(oKeHoachVay05Nam.LIST[i].DUNOVAY)
	// 				}
	// 				if (oKeHoachVay05Nam.LIST[i].DUKIENVAY) {
	// 					sum3 = sum3 + parseInt(oKeHoachVay05Nam.LIST[i].DUKIENVAY)
	// 				}
	// 				if (oKeHoachVay05Nam.LIST[i].DUKIENTRANO) {
	// 					sum4 = sum4 + parseInt(oKeHoachVay05Nam.LIST[i].DUKIENTRANO)
	// 				}
	// 				_item.hanmucvay = formatMoney(_item.HANMUCVAY)
	// 				_item.dunovay = formatMoney(_item.DUNOVAY)
	// 				_item.dukienvay = formatMoney(_item.DUKIENVAY)
	// 				_item.dukientra = formatMoney(_item.DUKIENTRANO)
	// 				_item.sum5 = formatMoney(sum1)
	// 				_item.sum6 = formatMoney(sum2)
	// 				_item.sum7 = formatMoney(sum3)
	// 				_item.sum8 = formatMoney(sum4)
	// 				var _hidden = '<input type="hidden" class="rowID" value="' + _item.KEHOACHVAY5NAMID + '" />';
	// 				that.keys = [
	// 					'i_stt',
	// 					'i_MA',
	// 					'i_TEN',
	// 					'i_NAMBATDAU',
	// 					'i_NAMKETTHUC',
	// 					'i_NGAYQUYETDINH',
	// 					'i_TENTINHTHANH',
	// 					'i_hanmucvay',
	// 					'i_dunovay',
	// 					'i_dukienvay',
	// 					'i_dukientra',
	// 					'i_STATUS',
	// 					'i_DUKIENVAY',
	// 					'i_DUKIENTRANO'
	// 				]
	// 				var data = [
	// 					(i + 1) + _hidden,
	// 					_item.MA,
	// 					_item.TEN,
	// 					_item.NAMBATDAU,
	// 					_item.NAMKETTHUC,
	// 					_item.NGAYQUYETDINH,
	// 					_item.TENTINHTHANH,
	// 					_item.hanmucvay,
	// 					_item.dunovay,
	// 					_item.dukienvay,
	// 					_item.dukientra,
	// 					_item.STATUS,
	// 					_item.CREATEDDATE,
	// 					_item.CREATEDBY,
	// 					_item.UPDATEDDATE,
	// 					_item.UPDATEDBY,
	// 					_item.DUKIENVAY,
	// 					_item.DUKIENTRANO,
	// 				]
	// 				aRows.push(data);
	// 			}
	// 		}

	// 		that.oTable.rows.add(aRows).draw();
	// 	}
	// }

	this.reSetDetail = function () {
		$('#table-multi').html('')
	}
	this.init = function () {
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
		that.bindGrid01();
		var searchIp = '<tr>'
		if (that.keys) {
			for (var i = 0; i < that.keys.length; i++) {
				if (i == 0) {
					searchIp = searchIp + '<th></th>'
				}
				if (i > that.keys.length - 3) {
					searchIp = searchIp + '<th></th>'
				}
				else {
					searchIp = searchIp + '<th><input style="border: 1px solid #2a9bf5;\
				box-shadow: none;\
				width: 100%;\
				min-height: 25px;\
				border-radius: 3px;" class="inputsearch" id = ' + that.keys[i + 1] + '></th>'
				}
			}
			searchIp = searchIp.substring(0, searchIp.length - 9)
			$("#Grid01 thead").append(searchIp)
		}
	}
	this.bindModal = function () {
		if (idKeHoach5Nam > 0) {
			oKeHoachVay05Nam.getById(oKeHoachVay05Nam.KEHOACHVAY5NAMID);
			oKeHoachVay05Nam.getByIdCha(oKeHoachVay05Nam.MA);
			$('#MA').val(oKeHoachVay05Nam.MA);
			$('#TEN').val(oKeHoachVay05Nam.TEN);
			$('#NAMBATDAU').val(oKeHoachVay05Nam.NAMBATDAU);
			$('#NAMKETTHUC').val(oKeHoachVay05Nam.NAMKETTHUC);
			$('#NGAYQUYETDINH').val(oKeHoachVay05Nam.NGAYQUYETDINH);
			$('#HANMUCVAY').val(formatMoney(oKeHoachVay05Nam.HANMUCVAY));
			$('#DUNOVAY').val(formatMoney(oKeHoachVay05Nam.DUNOVAY));
			$('#DUKIENVAY').val(formatMoney(oKeHoachVay05Nam.DUKIENVAY));
			$('#DUKIENTRANO').val(formatMoney(oKeHoachVay05Nam.DUKIENTRANO));
			$('#DONVIID').val(oKeHoachVay05Nam.DONVIID).select2();
			$('#STATUS').val(oKeHoachVay05Nam.STATUS);
			$('#CREATEDDATE').val(oKeHoachVay05Nam.CREATEDDATE);
			$('#CREATEDBY').val(oKeHoachVay05Nam.CREATEDBY);
			$('#UPDATEDDATE').val(oKeHoachVay05Nam.UPDATEDDATE);
			$('#UPDATEDBY').val(oKeHoachVay05Nam.UPDATEDBY);
		}
	}
	$(function () {
		that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
		that.oDialog = new PopupDialog(reload);
		that.init();
		function reload() {
			that.filterAction('NEW');
			that.bindGrid01();
		}

		$('.inputsearch').on('change', function (e) {
			var id = e.target.id
			qr.forEach(element => {
				if (element.column.indexOf(id) >= 0) {
					element.text = $("#" + id + "").val()
				}
			});
			qr.push({
				text: $("#" + id + "").val(),
				column: id,
				class: 'qln_kehoachvay5nam'
			})
			var rs = oSearch.searchkehoachvay5nam(qr)
			that.bindGrid01(rs)

		})

		$('body').on('keyup', '.SOTIENVAY', function () {
			var sum = 0
			$('.SOTIENVAY').map((index, value) => {
				if ($(value).val()) {
					sum = parseInt(sum) + parseInt($(value).val().replaceAll(',', ''))
				}
			})
			$("#DUKIENVAY").val(addCommas(sum))
		})
		$('body').on('keyup', '.SOTIENTRA', function () {
			var sum = 0
			$('.SOTIENTRA').map((index, value) => {
				if ($(value).val()) {
					sum = parseInt(sum) + parseInt($(value).val().replaceAll(',', ''))
				}
			})
			$("#DUKIENTRANO").val(addCommas(sum))
		})
		$('body').on('change', '#NAMBATDAU', function () {
			var namBatDau = $("#NAMBATDAU").val();
			$("#NAMKETTHUC").val(Number(namBatDau) + 5)
		})
		$('body').on('change', '#NAMKETTHUC', function () {
			var namKetThuc = $("#NAMKETTHUC").val();
			$("#NAMBATDAU").val(Number(namKetThuc) - 5)
		})
		$('body').on('blur', '#NGAYQUYETDINH', function () {
			Number.prototype.between = function (a, b, inclusive) {
				var min = Math.min.apply(Math, [a, b]),
					max = Math.max.apply(Math, [a, b]);
				return inclusive ? this >= min && this <= max : this > min && this < max;
			};
			var namBatDau = $("#NAMBATDAU").val()
			var namKetThuc = $("#NAMKETTHUC").val()
			var namQuyetDinh = $("#NGAYQUYETDINH").val().split('/')[2]
			if (Number(namQuyetDinh).between(Number(namBatDau), Number(namKetThuc), true)) {
				return;
			}
			else {
				$("#NGAYQUYETDINH").val($("#NGAYQUYETDINH").val().split('/')[0] + '/' + $("#NGAYQUYETDINH").val().split('/')[1] + '/' + namBatDau)
			}
		})
		$('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()
			var date = moment(); //Get the current date
			var year = date.format("YYYY")
			var ngayQuyetDinh = date.format("DD/MM/")
			var sum = parseInt(year) + 1
			var sum1 = parseInt(year) + 6
			$("#NAMBATDAU").val(sum)
			$("#NAMKETTHUC").val(sum1)
			$('#NGAYQUYETDINH').val(ngayQuyetDinh + sum)
			$('#list_uploadfile').html('');
			$("#exampleModalLongTitle").text('Thêm mới kế hoạch vay 5 năm')
			$("#Grid01").find('.selected').removeClass('selected');
			$('#MA').val('');
			$('#TEN').val('');
			$('#HANMUCVAY').val('');
			$('#DUNOVAY').val('');
			$('#DUKIENVAY').val('');
			$('#DUKIENTRANO').val('');
			$('#STATUS').val('');
			$('#CREATEDDATE').val('');
			$('#CREATEDBY').val('');
			$('#UPDATEDDATE').val('');
			$('#UPDATEDBY').val(1);
			that.reSetDetail();
			var selectNam = '<select class="NAM" data-index=0"' + '">' +
				'<option value="NAM1" selected>Năm thứ nhất</option>' +
				'<option value="NAM2">Năm thứ hai</option>' +
				'<option value="NAM3">Năm thứ ba</option>' +
				'<option value="NAM4">Năm thứ tư</option>' +
				'<option value="NAM5">Năm thứ năm</option>' +
				'</select>'
			var selectNam1 = '<select class="NAM" data-index=1"' + '">' +
				'<option value="NAM1">Năm thứ nhất</option>' +
				'<option value="NAM2" selected>Năm thứ hai</option>' +
				'<option value="NAM3">Năm thứ ba</option>' +
				'<option value="NAM4">Năm thứ tư</option>' +
				'<option value="NAM5">Năm thứ năm</option>' +
				'</select>'
			var selectNam2 = '<select class="NAM" data-index=2"' + '">' +
				'<option value="NAM1">Năm thứ nhất</option>' +
				'<option value="NAM2">Năm thứ hai</option>' +
				'<option value="NAM3" selected>Năm thứ ba</option>' +
				'<option value="NAM4">Năm thứ tư</option>' +
				'<option value="NAM5">Năm thứ năm</option>' +
				'</select>'
			var selectNam3 = '<select class="NAM" data-index=3"' + '">' +
				'<option value="NAM1">Năm thứ nhất</option>' +
				'<option value="NAM2">Năm thứ hai</option>' +
				'<option value="NAM3">Năm thứ ba</option>' +
				'<option value="NAM4" selected>Năm thứ tư</option>' +
				'<option value="NAM5">Năm thứ năm</option>' +
				'</select>'
			var selectNam4 = '<select class="NAM" data-index=4"' + '">' +
				'<option value="NAM1">Năm thứ nhất</option>' +
				'<option value="NAM2">Năm thứ hai</option>' +
				'<option value="NAM3">Năm thứ ba</option>' +
				'<option value="NAM4">Năm thứ tư</option>' +
				'<option value="NAM5" selected>Năm thứ năm</option>' +
				'</select>'
			var selectNguonvon = '<select class="NGUONVAY" data-index=1"' + '">' +
				'<option value="VAYODA" selected>Vay ODA</option>' +
				'<option value="VAYUUDAI">Vay ưu đãi</option>' +
				'<option value="VAYTRAIPHIEU">Vay trái phiếu CQĐP</option>' +
				'<option value="VAYKHAC">Vay khác</option>' +
				'</select>'
			var elemnt = '<tr class="input-table" id="element-1' + '"><td>' + selectNam + '</td><td>' + selectNguonvon + '</td><td><input type="text" style="text-align: right" class="SOTIENVAY" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency"></td><td><input type="text" style="text-align: right" class="SOTIENTRA" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency"></td><td><input type="text" class="NGUONTRA"></td><td><input type="text" class="GHICHU"></td><td style="text-align: center"><button class="btn btn-danger button-clear" id="element-1' + '">Xóa</button></td></tr>';
			var elemnt1 = '<tr class="input-table" id="element-2' + '"><td>' + selectNam1 + '</td><td>' + selectNguonvon + '</td><td><input type="text" style="text-align: right" class="SOTIENVAY" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency"></td><td><input type="text" style="text-align: right" class="SOTIENTRA" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency"></td><td><input type="text" class="NGUONTRA"></td><td><input type="text" class="GHICHU"></td><td style="text-align: center"><button class="btn btn-danger button-clear" id="element-2' + '">Xóa</button></td></tr>';
			var elemnt2 = '<tr class="input-table" id="element-3' + '"><td>' + selectNam2 + '</td><td>' + selectNguonvon + '</td><td><input type="text" style="text-align: right" class="SOTIENVAY" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency"></td><td><input type="text" style="text-align: right" class="SOTIENTRA" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency"></td><td><input type="text" class="NGUONTRA"></td><td><input type="text" class="GHICHU"></td><td style="text-align: center"><button class="btn btn-danger button-clear" id="element-3' + '">Xóa</button></td></tr>';
			var elemnt3 = '<tr class="input-table" id="element-4' + '"><td>' + selectNam3 + '</td><td>' + selectNguonvon + '</td><td><input type="text" style="text-align: right" class="SOTIENVAY" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency"></td><td><input type="text" style="text-align: right" class="SOTIENTRA" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency"></td><td><input type="text" class="NGUONTRA"></td><td><input type="text" class="GHICHU"></td><td style="text-align: center"><button class="btn btn-danger button-clear" id="element-4' + '">Xóa</button></td></tr>';
			var elemnt4 = '<tr class="input-table" id="element-5' + '"><td>' + selectNam4 + '</td><td>' + selectNguonvon + '</td><td><input type="text" style="text-align: right" class="SOTIENVAY" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency"></td><td><input type="text" style="text-align: right" class="SOTIENTRA" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency"></td><td><input type="text" class="NGUONTRA"></td><td><input type="text" class="GHICHU"></td><td style="text-align: center"><button class="btn btn-danger button-clear" id="element-5' + '">Xóa</button></td></tr>';
			$('#table-multi').append(elemnt)
			$('#table-multi').append(elemnt1)
			$('#table-multi').append(elemnt2)
			$('#table-multi').append(elemnt3)
			$('#table-multi').append(elemnt4)
			idKeHoach5Nam = 0;
			that.bindModal();
			fnc_removeSpace();
			fnc_removeName();
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.bindModal();
			$("#exampleModalLongTitle").text('Sửa kế hoạch vay 5 năm')
			fnc_removeSpace();
			fnc_removeName();
		});
		$('.ACTIONS').on('click', '#btnDelete', function (e) {
			e.preventDefault()
			if (!oKeHoachVay05Nam.KEHOACHVAY5NAMID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn kế hoạch để xóa', '40%', '50px');
				return false;
			}
			function ok() {
				var rs = oKeHoachVay05Nam.del(oKeHoachVay05Nam.KEHOACHVAY5NAMID);
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
		document.getElementsByName("userPhoto")[0].addEventListener("click", fileUpload);
		function fileUpload(e){
			var targetAfterX = e.offsetX >= 0 && e.offsetX <= 81;
			var targetAfterY = e.offsetY >= 0 && e.offsetY <= 40;
			if(targetAfterX && targetAfterY){
			}else{
				e.preventDefault();
			}
		}
		$(".btnSave").on('click', function (e) {
			if (isDoubleClicked($(this))) return;
			e.preventDefault()
			String.prototype.replaceAll = function (search, replacement) {
				var target = this;
				return target.replace(new RegExp(search, 'g'), replacement);
			};
			var list_tr_NGUONVAY = $('.input-table .NGUONVAY')
			var list_tr_NAM = $('.input-table .NAM')
			var list_tr_SOTIENVAY = $('.input-table .SOTIENVAY')
			var list_tr_SOTIENTRA = $('.input-table .SOTIENTRA')
			var list_tr_NGUONTRA = $('.input-table .NGUONTRA')
			var list_tr_GHICHU = $('.input-table .GHICHU')
			var r_list_tr_NGUONVAY = []
			var r_list_tr_NAM = []
			var r_list_tr_SOTIENVAY = []
			var r_list_tr_SOTIENTRA = []
			var r_list_tr_NGUONTRA = []
			var r_list_tr_GHICHU = []
			list_tr_NGUONVAY.map((index, value) => {
				r_list_tr_NGUONVAY.push($(value).val())
			})
			list_tr_NAM.map((index, value) => {
				r_list_tr_NAM.push($(value).val())
			})
			list_tr_SOTIENVAY.map((index, value) => {
				r_list_tr_SOTIENVAY.push($(value).val().replaceAll(',', ''))
			})
			list_tr_SOTIENTRA.map((index, value) => {
				r_list_tr_SOTIENTRA.push($(value).val().replaceAll(',', ''))
			})
			list_tr_NGUONTRA.map((index, value) => {
				r_list_tr_NGUONTRA.push($(value).val())
			})
			list_tr_GHICHU.map((index, value) => {
				r_list_tr_GHICHU.push($(value).val())
			})
			if ($('#MA').val() == '') {
				var oAlert = new AlertDialog1('Thông báo');
				oAlert.show('Mã không được để trống', '40%', '50px');
				return;
			}
			else {
				oKeHoachVay05Nam.KEHOACHVAY5NAMID = idKeHoach5Nam;
				oKeHoachVay05Nam.MA = $('#MA').val().trim();
				oKeHoachVay05Nam.TEN = $('#TEN').val();
				oKeHoachVay05Nam.NAMBATDAU = $('#NAMBATDAU').val();
				oKeHoachVay05Nam.NAMKETTHUC = $('#NAMKETTHUC').val();
				oKeHoachVay05Nam.NGAYQUYETDINH = $('#NGAYQUYETDINH').val();
				oKeHoachVay05Nam.HANMUCVAY = $('#HANMUCVAY').val().replaceAll(',', '');
				oKeHoachVay05Nam.DUNOVAY = $('#DUNOVAY').val().replaceAll(',', '');
				oKeHoachVay05Nam.DONVIID = $('#DONVIID').val();
				oKeHoachVay05Nam.DUKIENVAY = $('#DUKIENVAY').val().replaceAll(',', '');
				oKeHoachVay05Nam.DUKIENTRANO = $('#DUKIENTRANO').val().replaceAll(',', '');
				oKeHoachVay05Nam.UUID = uuidv4();
				var query = '';
				query = "Insert all ";
				for (var i = 0; i < list_tr_GHICHU.length; i++) {
					query = query + " Into qln_kehoachvay5nam_detail(NGUONVAY, NAM, SOTIENVAY, SOTIENTRA, NGUONTRA, GHICHU, IDCHA) VALUES ('" + r_list_tr_NGUONVAY[i] + "' , '" + r_list_tr_NAM[i] + "' , " + fnc_nvl(r_list_tr_SOTIENVAY[i], 0) + " , " + fnc_nvl(r_list_tr_SOTIENTRA[i], 0) + " , '" + r_list_tr_NGUONTRA[i] + "' , '" + r_list_tr_GHICHU[i] + "' , '" + $('#MA').val() + "') ";
				}
				query = query + " Select 1 from dual";
				var rs = oKeHoachVay05Nam.save();
				var pDelete = '';
				pDelete = "Delete qln_kehoachvay5nam_detail where idcha ='" + $('#MA').val() + "'"
				if (rs.CODE == 3) {
					var oAlert = new AlertDialog1('Thông báo');
					oAlert.show('Mã này đã được sử dụng', '40%', '50px');
				}
				else {

					if (rs.CODE == 0) {
						oKeHoachVay05Nam.savedtl(pDelete, query);
					}
					$("#idrowtable").val(rs.RESULT)
					$("#tablename").val(CurrentLayout)
					var rs1 = DATA.ajaxPostForm(CONFIG_API.URL.SEVER + 'upload', 'uploadForm')
					if (!rs1.success) {
						oKeHoachVay05Nam.deluid(rs.RESULT)
						var oAlert = new AlertDialog('Thông báo');
						oAlert.show(rs1.message, '40%', '50px');
						that.bindGrid01();
					}
					else {
						that.bindGrid01();
						var oAlert = new AlertDialog('Thông báo');
						oAlert.show(rs.MESSAGE, '40%', '50px');
					}
				}

			}
		})
		$('#Grid01 tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				oKeHoachVay05Nam.KEHOACHVAY5NAMID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				idKeHoach5Nam = $(this).find('.rowID').val();
				oKeHoachVay05Nam.KEHOACHVAY5NAMID = idKeHoach5Nam;
				that.filterAction('SELECT');
			}
		});
	});
}