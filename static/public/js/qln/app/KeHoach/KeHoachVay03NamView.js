var KeHoachVay03NamView = function () {
	var idKeHoach3Nam = 0;
	var that = this;
	this.AppTitle = 'Kế hoạch vay trong 3 năm';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var qr = [];
	var oKeHoachVay03Nam = new KeHoachVay03Nam();
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
	this.reSetDetail = function () {
		$('#table-multi').html('')
	}
	this.bindGrid01 = function () {
		oKeHoachVay03Nam.getAll();
		that.oTable.clear().draw();
		var aRows = [];
		var sumHanMucVay = 0;
		var sumDuNo = 0;
		for (var i = 0; i < oKeHoachVay03Nam.LIST.length; i++) {
			var _item = oKeHoachVay03Nam.LIST[i];
			if (oKeHoachVay03Nam.LIST[i].HANMUCVAY) {
				sumHanMucVay = sumHanMucVay + parseInt(oKeHoachVay03Nam.LIST[i].HANMUCVAY)
			}
			if (oKeHoachVay03Nam.LIST[i].DUNOVAY) {
				sumDuNo = sumDuNo + parseInt(oKeHoachVay03Nam.LIST[i].DUNOVAY)
			}
			_item.hanmucvay = formatMoney(_item.HANMUCVAY)
			_item.dunovay = formatMoney(_item.DUNOVAY)
			_item.sum1 = formatMoney(sumHanMucVay)
			_item.sum2 = formatMoney(sumDuNo)
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.KEHOACHVAY3NAMID + '" />';
			var download = ''
			if (_item.URL) {
				download = '<button  val="' + _item.URL + '" class= "btn btn-primary btnTaixuong" >Tải xuống</button>'
			}
			else {
				download = ''
			}
			aRows.push([
				(i + 1) + _hidden,
				_item.MA,
				_item.TEN,
				_item.NAMBATDAU,
				_item.NAMKETTHUC,
				_item.NGAYQUYETDINH,
				_item.TENDONVI,
				_item.hanmucvay,
				_item.dunovay,
				download
			]);
		}
		that.oTable.rows.add(aRows).draw();
	}

	// this.bindGrid01 = function (isSearch) {
	// 	if (isSearch) {
	// 		that.oTable.clear().draw();
	// 		var aRows = [];
	// 		var sumHanMucVay = 0;
	// 		var sumDuNo = 0;
	// 		for (var i = 0; i < isSearch.length; i++) {
	// 			var _item = isSearch[i];
	// 			if (oKeHoachVay03Nam.LIST[i].HANMUCVAY) {
	// 				sumHanMucVay = sumHanMucVay + parseInt(oKeHoachVay03Nam.LIST[i].HANMUCVAY)
	// 			}
	// 			if (oKeHoachVay03Nam.LIST[i].DUNOVAY) {
	// 				sumDuNo = sumDuNo + parseInt(oKeHoachVay03Nam.LIST[i].DUNOVAY)
	// 			}
	// 			_item.hanmucvay = formatMoney(_item.HANMUCVAY)
	// 			_item.dunovay = formatMoney(_item.DUNOVAY)
	// 			_item.sum1 = formatMoney(sumHanMucVay)
	// 			_item.sum2 = formatMoney(sumDuNo)
	// 			var _hidden = '<input type="hidden" class="rowID" value="' + _item.KEHOACHVAY3NAMID + '" />';
	// 			var download = ''
	// 			if (_item.URL) {
	// 				download = '<button  val="' + _item.URL + '" class= "btn btn-primary btnTaixuong" >Tải xuống</button>'
	// 			}
	// 			else {
	// 				download = ''
	// 			}
	// 			that.keys = [
	// 				'i_stt',
	// 				'i_MA',
	// 				'i_TEN',
	// 				'i_NAMBATDAU',
	// 				'i_NAMKETTHUC',
	// 				'i_NGAYQUYETDINH',
	// 				'i_TENDONVI',
	// 				'i_hanmucvay',
	// 				'i_dunovay',
	// 				'download'
	// 			]
	// 			var data = [
	// 				(i + 1) + _hidden,
	// 				_item.MA,
	// 				_item.TEN,
	// 				_item.NAMBATDAU,
	// 				_item.NAMKETTHUC,
	// 				_item.NGAYQUYETDINH,
	// 				_item.TENDONVI,
	// 				_item.hanmucvay,
	// 				_item.dunovay,
	// 				download
	// 			]
	// 			aRows.push(data);
	// 		}
	// 		that.oTable.rows.add(aRows).draw();
	// 	}
	// 	else {
	// 		oKeHoachVay03Nam.getAll();
	// 		that.oTable.clear().draw();
	// 		var aRows = [];
	// 		var sumHanMucVay = 0;
	// 		var sumDuNo = 0;
	// 		for (var i = 0; i < oKeHoachVay03Nam.LIST.length; i++) {
	// 			var _item = oKeHoachVay03Nam.LIST[i];
	// 			if (oKeHoachVay03Nam.LIST[i].HANMUCVAY) {
	// 				sumHanMucVay = sumHanMucVay + parseInt(oKeHoachVay03Nam.LIST[i].HANMUCVAY)
	// 			}
	// 			if (oKeHoachVay03Nam.LIST[i].DUNOVAY) {
	// 				sumDuNo = sumDuNo + parseInt(oKeHoachVay03Nam.LIST[i].DUNOVAY)
	// 			}
	// 			_item.hanmucvay = formatMoney(_item.HANMUCVAY)
	// 			_item.dunovay = formatMoney(_item.DUNOVAY)
	// 			_item.sum1 = formatMoney(sumHanMucVay)
	// 			_item.sum2 = formatMoney(sumDuNo)
	// 			var _hidden = '<input type="hidden" class="rowID" value="' + _item.KEHOACHVAY3NAMID + '" />';
	// 			var download = ''
	// 			if (_item.URL) {
	// 				download = '<button  val="' + _item.URL + '" class= "btn btn-primary btnTaixuong" >Tải xuống</button>'
	// 			}
	// 			else {
	// 				download = ''
	// 			}
	// 			that.keys = [
	// 				'i_stt',
	// 				'i_MA',
	// 				'i_TEN',
	// 				'i_NAMBATDAU',
	// 				'i_NAMKETTHUC',
	// 				'i_NGAYQUYETDINH',
	// 				'i_TENDONVI',
	// 				'i_hanmucvay',
	// 				'i_dunovay',
	// 				'download'
	// 			]
	// 			var data = [
	// 				(i + 1) + _hidden,
	// 				_item.MA,
	// 				_item.TEN,
	// 				_item.NAMBATDAU,
	// 				_item.NAMKETTHUC,
	// 				_item.NGAYQUYETDINH,
	// 				_item.TENDONVI,
	// 				_item.hanmucvay,
	// 				_item.dunovay,
	// 				download
	// 			]
	// 			aRows.push(data);
	// 		} 
	// 		that.oTable.rows.add(aRows).draw();
	// 	}
	// }

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
				if (i == that.keys.length - 1) {
					// searchIp = searchIp + '<th ></th></tr>'
				}
				else {
					searchIp = searchIp + '<th><input style="border: 1px solid #2a9bf5;\
				box-shadow: none;\
				width: 100%;\
				min-height: 25px;\
				border-radius: 3px;" class="inputsearch" id = ' + that.keys[i + 1] + '></th>'
				}
			}
			$("#Grid01 thead").append(searchIp)
		}
	}
	this.bindModal = function () {
		if (idKeHoach3Nam > 0) {
			oKeHoachVay03Nam.getById(idKeHoach3Nam);
			oKeHoachVay03Nam.getByIdCha(oKeHoachVay03Nam.MA);
			$('#MA').val(oKeHoachVay03Nam.MA);
			$('#TEN').val(oKeHoachVay03Nam.TEN);
			$('#NAMBATDAU').val(oKeHoachVay03Nam.NAMBATDAU);
			$('#NAMKETTHUC').val(oKeHoachVay03Nam.NAMKETTHUC);
			$('#NGAYQUYETDINH').val(oKeHoachVay03Nam.NGAYQUYETDINH);
			$('#HANMUCVAY').val(formatMoney(oKeHoachVay03Nam.HANMUCVAY));
			$('#DUNOVAY').val(formatMoney(oKeHoachVay03Nam.DUNOVAY));
			$('#DONVIID').val(oKeHoachVay03Nam.DONVIID).select2();
			$('#STATUS').val(oKeHoachVay03Nam.STATUS);
			$('#CREATEDDATE').val(oKeHoachVay03Nam.CREATEDDATE);
			$('#CREATEDBY').val(oKeHoachVay03Nam.CREATEDBY);
			$('#UPDATEDDATE').val(oKeHoachVay03Nam.UPDATEDDATE);
			$('#UPDATEDBY').val(oKeHoachVay03Nam.UPDATEDBY);
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
				class: 'qln_kehoachvay3nam'
			})
			var rs = oSearch.searchkehoachvay3nam(qr)
			that.bindGrid01(rs)

		})

		$('body').on('change', '#NAMBATDAU', function () {
			var namBatDau = $("#NAMBATDAU").val();
			$("#NAMKETTHUC").val(Number(namBatDau) + 3)
		})
		$('body').on('change', '#NAMKETTHUC', function () {
			var namKetThuc = $("#NAMKETTHUC").val();
			$("#NAMBATDAU").val(Number(namKetThuc) - 3)
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
			var ngayQuyetDinh = date.format("DD/MM")
			var sum = parseInt(year) + 1
			var sum1 = parseInt(year) + 4
			$("#NAMBATDAU").val(sum)
			$("#NAMKETTHUC").val(sum1)
			$('#NGAYQUYETDINH').val(ngayQuyetDinh + '/' + sum)
			$('#list_uploadfile').html('');
			$("#exampleModalLongTitle").text('Thêm mới kế hoạch vay 3 năm')
			$("#Grid01").find('.selected').removeClass('selected');
			$('#MA').val('');
			$('#TEN').val('');
			$('#HANMUCVAY').val('');
			$('#DUNOVAY').val('');
			that.reSetDetail();
			var selectNam = '<select class="NAM" data-index=0"' + '">' +
				'<option value="NAM1" selected >Năm thứ nhất</option>' +
				'<option value="NAM2">Năm thứ hai</option>' +
				'<option value="NAM3">Năm thứ ba</option>'
			'</select>'
			var selectNam1 = '<select class="NAM" data-index=1"' + '">' +
				'<option value="NAM1">Năm thứ nhất</option>' +
				'<option value="NAM2" selected>Năm thứ hai</option>' +
				'<option value="NAM3">Năm thứ ba</option>'
			'</select>'
			var selectNam2 = '<select class="NAM" data-index=2"' + '">' +
				'<option value="NAM1">Năm thứ nhất</option>' +
				'<option value="NAM2">Năm thứ hai</option>' +
				'<option value="NAM3" selected>Năm thứ ba</option>'
			'</select>'
			var selectNguonvon = '<select class="NGUONVAY" data-index=1"' + '">' +
				'<option value="VAYODA" selected >Vay ODA</option>' +
				'<option value="VAYUUDAI">Vay ưu đãi</option>' +
				'<option value="VAYTRAIPHIEU">Vay trái phiếu CQĐP</option>' +
				'<option value="VAYKHAC">Vay khác</option>' +
				'</select>'
			var elemnt = '<tr class="input-table" id="element-1' + '"><td>' + selectNam + '</td><td>' + selectNguonvon + '</td><td><input type="text" style="text-align: right;" class="SOTIENVAY" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency"></td><td><input type="text" style="text-align: right;" class="SOTIENTRA" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency"></td><td><input type="text" class="NGUONTRA"></td><td><input type="text" class="GHICHU"></td><td style="text-align: center"><button class="btn btn-danger button-clear" id="element-1' + '" style="text - align: center;">Xóa</button></td></tr>';
			var elemnt1 = '<tr class="input-table" id="element-2' + '"><td>' + selectNam1 + '</td><td>' + selectNguonvon + '</td><td><input type="text" style="text-align: right;" class="SOTIENVAY" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency"></td><td><input type="text" style="text-align: right;" class="SOTIENTRA" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency"></td><td><input type="text" class="NGUONTRA"></td><td><input type="text" class="GHICHU"></td><td style="text-align: center"><button class="btn btn-danger button-clear" id="element-2' + '" style="text - align: center;">Xóa</button></td></tr>';
			var elemnt2 = '<tr class="input-table" id="element-3' + '"><td>' + selectNam2 + '</td><td>' + selectNguonvon + '</td><td><input type="text" style="text-align: right;" class="SOTIENVAY" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency"></td><td><input type="text" style="text-align: right;" class="SOTIENTRA" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency"></td><td><input type="text" class="NGUONTRA"></td><td><input type="text" class="GHICHU"></td><td style="text-align: center"><button class="btn btn-danger button-clear" id="element-3' + '" style="text - align: center;">Xóa</button></td></tr>';
			$('#table-multi').append(elemnt)
			$('#table-multi').append(elemnt1)
			$('#table-multi').append(elemnt2)
			idKeHoach3Nam = 0;
			that.bindModal();
			fnc_removeSpace();
			fnc_removeName();
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.bindModal();
			$("#exampleModalLongTitle").text('Sửa kế hoạch vay 3 năm')
			fnc_removeSpace();
			fnc_removeName();
		});
		$('body').on('click', '.btnTaixuong', function () {
			var url = CONFIG_API.URL.SEVER + $(this).attr('val')
			window.open(url)
		})
		$('.ACTIONS').on('click', '#btnDelete', function (e) {
			e.preventDefault()
			if (!oKeHoachVay03Nam.KEHOACHVAY3NAMID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn kế hoạch để xóa', '40%', '50px');
				return false;
			}
			function ok() {
				var rs = oKeHoachVay03Nam.del(oKeHoachVay03Nam.KEHOACHVAY3NAMID);
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
			if (isDoubleClicked($(this))) return;
			e.preventDefault()
			String.prototype.replaceAll = function (search, replacement) {
				var target = this;
				return target.replace(new RegExp(search, 'g'), replacement);
			};
			var oAlert = new AlertDialog('Thông báo');
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
				oKeHoachVay03Nam.KEHOACHVAY3NAMID = idKeHoach3Nam;
				oKeHoachVay03Nam.MA = $('#MA').val();
				oKeHoachVay03Nam.TEN = $('#TEN').val();
				oKeHoachVay03Nam.NAMBATDAU = $('#NAMBATDAU').val();
				oKeHoachVay03Nam.NAMKETTHUC = $('#NAMKETTHUC').val();
				oKeHoachVay03Nam.NGAYQUYETDINH = $('#NGAYQUYETDINH').val();
				oKeHoachVay03Nam.HANMUCVAY = $('#HANMUCVAY').val().replaceAll(',', '');
				oKeHoachVay03Nam.DUNOVAY = $('#DUNOVAY').val().replaceAll(',', '');
				oKeHoachVay03Nam.DONVIID = $('#DONVIID').val();
				oKeHoachVay03Nam.UUID = uuidv4();
				var query = '';
				query = "Insert all ";
				for (var i = 0; i < list_tr_GHICHU.length; i++) {
					query = query + " Into qln_kehoachvay3namdetail(NGUONVAY, NAM, SOTIENVAY, SOTIENTRA, NGUONTRA, GHICHU, IDCHA) VALUES ('" + r_list_tr_NGUONVAY[i] + "' , '" + r_list_tr_NAM[i] + "' , " + r_list_tr_SOTIENVAY[i] + " , " + r_list_tr_SOTIENTRA[i] + " , '" + r_list_tr_NGUONTRA[i] + "' , '" + r_list_tr_GHICHU[i] + "' , '" + $('#MA').val() + "') ";
				}
				query = query + " Select 1 from dual";
				var rs = oKeHoachVay03Nam.save();
				if (rs.CODE == 3) {
					var oAlert = new AlertDialog1('Thông báo');
					oAlert.show('Mã này đã được sử dụng', '40%', '50px');
				}
				else {
					var pDelete = '';
					pDelete = "Delete qln_kehoachvay3namdetail where idcha ='" + $('#MA').val() + "'"
					if (rs.CODE == 0) {
						oKeHoachVay03Nam.savedtl(pDelete, query);
					}
					$("#idrowtable").val(rs.RESULT)
					$("#tablename").val(CurrentLayout)
					var rs1 = DATA.ajaxPostForm(CONFIG_API.URL.SEVER + 'upload', 'uploadForm')
					if (!rs1.success) {
						oKeHoachVay03Nam.deluid(rs.RESULT)
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
				oKeHoachVay03Nam.KEHOACHVAY3NAMID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				idKeHoach3Nam = $(this).find('.rowID').val();
				oKeHoachVay03Nam.KEHOACHVAY3NAMID = idKeHoach3Nam;
				that.filterAction('SELECT');
			}
		});
	});
}