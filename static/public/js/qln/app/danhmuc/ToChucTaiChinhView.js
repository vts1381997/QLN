var ToChucTaiChinhView = function () {
	var idToChucTaiChinh = 0;
	var that = this;
	this.AppTitle = 'Tổ chức tài chính';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var iddd = ''
	var oToChucTaiChinh = new ToChucTaiChinh();
	var qr = [];
	function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
		if (amount == null || amount == 0) {
			return ""
		}
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

	this.bindGrid01 = function () {
		oToChucTaiChinh.getAll();
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < oToChucTaiChinh.LIST.length; i++) {
			var _item = oToChucTaiChinh.LIST[i];
			_item.vondieule = formatMoney(_item.VONDIEULE)
			// var d = Date.parseDate(_item.NGAYCAP,"dd/mm/yyyy")
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.TOCHUCTAICHINHID + '" />';
			var _hidden1 = '<p style="display:none" class="rowID1"  />' + JSON.stringify(_item) + '</p>';
			var download = ''
			if (_item.URL) {
				download = '<button  val="' + _item.URL + '" class= "btn btn-primary btnTaixuong" >Tải xuống</button>'
			}
			else {
				download = ''
			}
			aRows.push([
				(i + 1) + _hidden + _hidden1,
				_item.MA,
				_item.TEN,
				_item.DIACHI,
				_item.SOGIAYPHEP,
				_item.NGAYCAP,
				_item.vondieule,
				download,
			]);
		}
		that.oTable.rows.add(aRows).draw();
	}
	// this.bindGrid01 = function (isSearch) {
	// 	if (isSearch) {
	// 		that.oTable.clear().draw();
	// 		var aRows = [];
	// 		for (var i = 0; i < isSearch.length; i++) {
	// 			var _item = isSearch[i];
	// 			_item.vondieule = formatMoney(_item.VONDIEULE)
	// 			// var d = Date.parseDate(_item.NGAYCAP,"dd/mm/yyyy")
	// 			var _hidden = '<input type="hidden" class="rowID" value="' + _item.TOCHUCTAICHINHID + '" />';
	// 			var _hidden1 = '<p style="display:none" class="rowID1"  />' + JSON.stringify(_item) + '</p>';
	// 			that.keys = [
	// 				'i_stt',
	// 				'i_MA',
	// 				'i_TEN',
	// 				'i_DIACHI',
	// 				'i_SOGIAYPHEP',
	// 				'i_NGAYCAP',
	// 				'i_vondieule'
	// 			]
	// 			var data = [
	// 				(i + 1) + _hidden + _hidden1,
	// 				_item.MA,
	// 				_item.TEN,
	// 				_item.DIACHI,
	// 				_item.SOGIAYPHEP,
	// 				_item.NGAYCAP,
	// 				_item.vondieule,
	// 			]
	// 			aRows.push(data);
	// 		}
	// 		that.oTable.rows.add(aRows).draw();
	// 	}
	// 	else {
	// 		oToChucTaiChinh.getAll();
	// 		that.oTable.clear().draw();
	// 		var aRows = [];
	// 		if (oToChucTaiChinh.LIST) {

	// 			for (var i = 0; i < oToChucTaiChinh.LIST.length; i++) {
	// 				var _item = oToChucTaiChinh.LIST[i];
	// 				_item.vondieule = formatMoney(_item.VONDIEULE)
	// 				var download = ''
	// 				if (_item.URL) {
	// 					download = '<button  val="' + _item.URL + '" class= "btn btn-primary btnTaixuong" >Tải xuống</button>'
	// 				}
	// 				else {
	// 					download = ''
	// 				}
	// 				var trangthai = _item.TRANGTHAI == 1 ? '<span style="font-size: 11px !important;" class="label label-success">Kích hoạt</span>' : '<span style="font-size: 11px !important;" class="label label-danger">Khóa</span>';
	// 				var _hidden = '<input type="hidden" class="rowID" value="' + _item.TOCHUCTAICHINHID + '" />';
	// 				var _hidden1 = '<p style="display:none" class="rowID1"  />' + JSON.stringify(_item) + '</p>';
	// 				that.keys = [
	// 					'i_stt',
	// 					'i_MA',
	// 					'i_TEN',
	// 					'i_DIACHI',
	// 					'i_SOGIAYPHEP',
	// 					'i_NGAYCAP',
	// 					'i_vondieule'
	// 				]
	// 				var data = [
	// 					(i + 1) + _hidden + _hidden1,
	// 					_item.MA,
	// 					_item.TEN,
	// 					_item.DIACHI,
	// 					_item.SOGIAYPHEP,
	// 					_item.NGAYCAP,
	// 					_item.vondieule,
	// 					download
	// 				]
	// 				aRows.push(data);
	// 			}
	// 		}

	// 		that.oTable.rows.add(aRows).draw();
	// 	}
	// }

	this.init = function () {
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
		that.bindGrid01();
	}
	this.bindModal = function () {
		if (idToChucTaiChinh > 0) {
			oToChucTaiChinh.getById(idToChucTaiChinh);
			$('#MA').val(oToChucTaiChinh.MA);
			$('#TEN').val(oToChucTaiChinh.TEN);
			$('#DIACHI').val(oToChucTaiChinh.DIACHI);
			$('#SOGIAYPHEP').val(oToChucTaiChinh.SOGIAYPHEP);
			$('#NGAYCAP').val(oToChucTaiChinh.NGAYCAP);
			$('#VONDIEULE').val(formatMoney(oToChucTaiChinh.VONDIEULE));
			$('#TRANGTHAI').val(formatMoney(oToChucTaiChinh.TRANGTHAI));
			$('#STATUS').val(oToChucTaiChinh.STATUS);
			$('#CREATEDDATE').val(oToChucTaiChinh.CREATEDDATE);
			$('#CREATEDBY').val(oToChucTaiChinh.CREATEDBY);
			$('#UPDATEDDATE').val(oToChucTaiChinh.UPDATEDDATE);
			$('#UPDATEDBY').val(oToChucTaiChinh.UPDATEDBY);
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
				class: 'dm_tochuctaichinh'
			})
			// if(column==='ngaycap'){
			// 	return formatDate(value, 'dd-mm-yyyy')
			// }
			var rs = oSearch.search(qr)
			that.bindGrid01(rs)

		})
		$('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()
			$("#exampleModalLongTitle").text('Thêm mới tổ chức tài chính, tín dụng')
			$("#Grid01").find('.selected').removeClass('selected');
			$('#MA').val('');
			$('#TEN').val('');
			$('#DIACHI').val('');
			$('#SOGIAYPHEP').val('');
			$('#NGAYCAP').val($.datepicker.formatDate('dd/mm/yy', new Date()));
			$('#VONDIEULE').val('');
			$('#STATUS').val('0');
			$('#CREATEDDATE').val('');
			$('#CREATEDBY').val('');
			$('#UPDATEDDATE').val('');
			$('#UPDATEDBY').val(1);
			oToChucTaiChinh.UUID = uuidv4();
			idToChucTaiChinh = 0;
			that.bindModal();
			fnc_removeSpace();
			fnc_removeName();
			fnc_validateSpace("DIACHI");
			fnc_validateSpace("SOGIAYPHEP");
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			$("#exampleModalLongTitle").text('Sửa tổ chức tài chính, tín dụng')
			// that.bindModal();
			$('#MA').val(JSON.parse(iddd).MA);
			$('#TEN').val(JSON.parse(iddd).TEN);
			$('#DIACHI').val(JSON.parse(iddd).DIACHI);
			$('#SOGIAYPHEP').val(JSON.parse(iddd).SOGIAYPHEP);
			$('#NGAYCAP').val(JSON.parse(iddd).NGAYCAP);
			$('#VONDIEULE').val(formatMoney(JSON.parse(iddd).VONDIEULE));
			$('#TRANGTHAI').val(Number(JSON.parse(iddd).TRANGTHAI)).select2();
			$('#STATUS').val(JSON.parse(iddd).STATUS);
			$('#CREATEDDATE').val(JSON.parse(iddd).CREATEDDATE);
			$('#CREATEDBY').val(JSON.parse(iddd).CREATEDBY);
			$('#UPDATEDDATE').val(JSON.parse(iddd).UPDATEDDATE);
			$('#UPDATEDBY').val(JSON.parse(iddd).UPDATEDBY);
			$("#rowid").val(JSON.parse(iddd).IDFILE)
			$("#url").val(JSON.parse(iddd).URL)
			oToChucTaiChinh.UUID = JSON.parse(iddd).UUID
			oToChucTaiChinh.TOCHUCTAICHINHID = JSON.parse(iddd).TOCHUCTAICHINHID
			fnc_removeSpace();
			fnc_removeName();
			fnc_validateSpace("DIACHI");
			fnc_validateSpace("SOGIAYPHEP");
		});
		$('.ACTIONS').on('click', '#btnDelete', function (e) {
			e.preventDefault()
			if (!oToChucTaiChinh.TOCHUCTAICHINHID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn tổ chức tài chính để xóa', '40%', '50px');
				return false;
			}

			function ok() {
				var rs = oToChucTaiChinh.del(oToChucTaiChinh.TOCHUCTAICHINHID);
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
			e.preventDefault();
			String.prototype.replaceAll = function (search, replacement) {
				var target = this;
				return target.replace(new RegExp(search, 'g'), replacement);
			};
			if ($('#MA').val() == '') {
				var oAlert = new AlertDialog1('Thông báo');
				oAlert.show('Mã không được để trống', '40%', '50px');
			}
			else {
				oToChucTaiChinh.TOCHUCTAICHINHID = idToChucTaiChinh;
				oToChucTaiChinh.MA = $('#MA').val();
				oToChucTaiChinh.TEN = $('#TEN').val();
				oToChucTaiChinh.DIACHI = $('#DIACHI').val();
				oToChucTaiChinh.SOGIAYPHEP = $('#SOGIAYPHEP').val();
				oToChucTaiChinh.NGAYCAP = $('#NGAYCAP').val();
				oToChucTaiChinh.VONDIEULE = $('#VONDIEULE').val().replaceAll(',', '');
				oToChucTaiChinh.TRANGTHAI = $('#TRANGTHAI').val();
				if ($('#VONDIEULE').val().replaceAll(',', '').length > 15) {
					var oAlert = new AlertDialog1('Thông báo');
					oAlert.show('Vốn điều lệ quá lớn!', '40%', '50px');
					return;
				}
				// else
				// 	if (rs.CODE == 3) {
				// 		var oAlert = new AlertDialog1('Thông báo');
				// 		oAlert.show('Dữ liệu nhập lỗi!', '40%', '50px');
				// 		return;
				// 	}
				else {
					var rs = oToChucTaiChinh.save();
					if (rs.CODE == 3) {
						var oAlert = new AlertDialog1('Thông báo');
						oAlert.show('Mã này đã tồn tại', '40%', '50px');
						return;
					}
					else {
						$("#idrowtable").val(rs.RESULT)
						$("#tablename").val(CurrentLayout)
						var rs1 = DATA.ajaxPostForm(CONFIG_API.URL.SEVER + 'upload', 'uploadForm')
						if (!rs1.success && rs1.data.length == 0) {
							oToChucTaiChinh.deluid(rs.RESULT)
							var oAlert = new AlertDialog('Thông báo');
							oAlert.show(rs1.message, '40%', '50px');
							that.bindGrid01();
						}
						else {
							if (!rs1.success && rs1.data.length > 0) {
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
				}
			}
		})
		$('body').on('click', '.btnTaixuong', (function () {
			var url = CONFIG_API.URL.SEVER + $(this).attr('val')
			window.open(url)
		})
		)
		$('#Grid01 tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				oToChucTaiChinh.TOCHUCTAICHINHID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				idToChucTaiChinh = $(this).find('.rowID').val();
				iddd = $(this).find('.rowID1').text();
				if (JSON.parse(iddd).IDFILE) {
					$("#btnDownload").show()
				} else {
					$("#btnDownload").hide()
				}
				oToChucTaiChinh.TOCHUCTAICHINHID = idToChucTaiChinh;
				that.filterAction('SELECT');
			}
		});
	});
}