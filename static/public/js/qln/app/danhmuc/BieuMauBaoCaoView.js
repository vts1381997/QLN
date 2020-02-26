var BieuMauBaoCaoView = function (isOtherView) {
	var idBieuMauBaoCao = 0;
	var that = this;
	this.AppTitle = 'Biểu mẫu báo cáo';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oBieuMauBaoCao = new BieuMauBaoCao();
	var oSearch = new Search();
	var qr = [];
	var Validate = new validate();
	this.bindGrid01 = function (isSearch) {
		if (isSearch) {
			that.oTable.clear().draw();
			var aRows = [];
			for (var i = 0; i < isSearch.length; i++) {
				var _item = isSearch[i];
				var _hidden = '<input type="hidden" class="rowID" value="' + _item.BIEUMAUBAOCAOID + '" />';
				var trangthai = _item.TRANGTHAI == 1 ? '<span class="label label-success">Sử dụng</span>' : '<span class="label label-danger">Không sử dụng</span>';
				that.keys = [
					'i_stt',
					'i_MA',
					'i_TIEUDE',
					'i_COQUANBANHANH',
					'i_NGAYBANHANH',
					'i_NGAYHIEULUC',
					'i_TENNHOMBAOCAO',
					'i_trangthai'
				]
				var data = [
					(i + 1) + _hidden,
					_item.MA,
					_item.TIEUDE,
					_item.COQUANBANHANH,
					_item.NGAYBANHANH,
					_item.NGAYHIEULUC,
					_item.TENNHOMBAOCAO,
					trangthai
				]
				aRows.push(data);
			}
			that.oTable.rows.add(aRows).draw();
		}
		else {
			oBieuMauBaoCao.getAll();
			that.oTable.clear().draw();
			var aRows = [];
			for (var i = 0; i < oBieuMauBaoCao.LIST.length; i++) {
				var _item = oBieuMauBaoCao.LIST[i];
				var _hidden = '<input type="hidden" class="rowID" value="' + _item.BIEUMAUBAOCAOID + '" />';
				var trangthai = _item.TRANGTHAI == 1 ? '<span class="label label-success">Sử dụng</span>' : '<span class="label label-danger">Không sử dụng</span>';
				that.keys = [
					'i_stt',
					'i_MA',
					'i_TIEUDE',
					'i_COQUANBANHANH',
					'i_NGAYBANHANH',
					'i_NGAYHIEULUC',
					'i_TENNHOMBAOCAO',
					'i_trangthai'
				]
				var data = [
					(i + 1) + _hidden,
					_item.MA,
					_item.TIEUDE,
					_item.COQUANBANHANH,
					_item.NGAYBANHANH,
					_item.NGAYHIEULUC,
					_item.TENNHOMBAOCAO,
					trangthai
				]
				aRows.push(data);
			}
			that.oTable.rows.add(aRows).draw();
		}
	}

	this.init = function () {
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
		that.bindGrid01();
		// var searchIp = '<tr>'
		// for (var i = 0; i < that.keys.length; i++) {
		// 	if (i == 0) {
		// 		searchIp = searchIp + '<th></th>'
		// 	}
		// 	if (i == that.keys.length - 1) {
		// 		// searchIp = searchIp + '<th ></th></tr>'
		// 	}
		// 	else {
		// 		searchIp = searchIp + '<th><input style="border: 1px solid #2a9bf5;\
		// 		box-shadow: none;\
		// 		width: 100%;\
		// 		min-height: 25px;\
		// 		border-radius: 3px;" class="inputsearch" id = ' + that.keys[i + 1] + '></th>'
		// 	}
		// }
		// $("thead").append(searchIp)
	}

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

	this.bindModal = function () {
		if (idBieuMauBaoCao > 0) {
			oBieuMauBaoCao.getById(idBieuMauBaoCao);
			$('#MA').val(oBieuMauBaoCao.MA);
			$('#TIEUDE').val(oBieuMauBaoCao.TIEUDE);
			$('#COQUANBANHANH').val(oBieuMauBaoCao.COQUANBANHANH);
			$('#NGAYBANHANH').val(oBieuMauBaoCao.NGAYBANHANH);
			$('#NGAYHIEULUC').val(oBieuMauBaoCao.NGAYHIEULUC);
			$('#NHOMBAOCAO').val(oBieuMauBaoCao.NHOMBAOCAO).select2();
			$('#CREATEDDATE').val(oBieuMauBaoCao.CREATEDDATE);
			$('#CREATEDBY').val(oBieuMauBaoCao.CREATEDBY);
			$('#UPDATEDDATE').val(oBieuMauBaoCao.UPDATEDDATE);
			$('#UPDATEDBY').val(oBieuMauBaoCao.UPDATEDBY);
			$('#LINKFILE').val(oBieuMauBaoCao.LINKFILE);
			$('#RONG').val(oBieuMauBaoCao.RONG);
			$('#CAO').val(oBieuMauBaoCao.CAO);
			$('#TRANGTHAI').val(oBieuMauBaoCao.TRANGTHAI).select2();
			$('#LOAIBAOCAO').val(oBieuMauBaoCao.LOAIBAOCAO).select2();
		}
	}

	$(function () {

		that.oTable = ControlHelper.Datatable.Init('tblDanhSach', 25, true);
		that.oDialog = new PopupDialog(reload);
		setTimeout(() => {
			that.init();
		}, 200);
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
				class: 'dm_bieumaubaocao'
			})
			var rs = oSearch.searchbieumaubc(qr)
			that.bindGrid01(rs)

		})

		$('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()
			$("#exampleModalLongTitle").text('Thêm mới biểu mẫu báo cáo')
			$("#tblDanhSach").find('.selected').removeClass('selected');
			$('#MA').val('');
			$('#TIEUDE').val('');
			$('#COQUANBANHANH').val('');
			$('#NGAYBANHANH').val('');
			$('#NGAYHIEULUC').val('');
			$('#STATUS').val('0');
			$('#CREATEDDATE').val('');
			$('#CREATEDBY').val('');
			$('#UPDATEDDATE').val('');
			$('#LINKFILE').val('');
			$('#RONG').val('');
			$('#CAO').val('');
			$('#UPDATEDBY').val(1);
			$("#TRANGTHAI").val(1).select2();
			$("#LOAIBAOCAO").val("thang").select2();
			$("#NHOMBAOCAO").val("QT").select2();
			idBieuMauBaoCao = 0;
			that.bindModal();
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			$("#exampleModalLongTitle").text('Sửa biểu mẫu báo cáo')
			that.bindModal();
		});
		$('.ACTIONS').on('click', '#btnDelete', function (e) {
			e.preventDefault()
			if (!oBieuMauBaoCao.BIEUMAUBAOCAOID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn biểu mẫu báo cáo để xóa', '40%', '50px');
				return false;
			}

			function ok() {
				var rs = oBieuMauBaoCao.del(oBieuMauBaoCao.BIEUMAUBAOCAOID);
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show(rs.MESSAGE, '40%', '50px');
				//reload sau khi delete
				that.bindGrid01();
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
			var fl = Validate.required();
			if (fl) {
				oBieuMauBaoCao.BIEUMAUBAOCAOID = idBieuMauBaoCao;
				oBieuMauBaoCao.MA = $('#MA').val();
				oBieuMauBaoCao.TIEUDE = $('#TIEUDE').val();
				oBieuMauBaoCao.COQUANBANHANH = $('#COQUANBANHANH').val();
				oBieuMauBaoCao.NGAYBANHANH = $('#NGAYBANHANH').val();
				oBieuMauBaoCao.NGAYHIEULUC = $('#NGAYHIEULUC').val();
				oBieuMauBaoCao.NHOMBAOCAO = $('#NHOMBAOCAO').val();
				oBieuMauBaoCao.LINKFILE = $('#LINKFILE').val();
				oBieuMauBaoCao.RONG = $('#RONG').val();
				oBieuMauBaoCao.CAO = $('#CAO').val();
				oBieuMauBaoCao.TRANGTHAI = $('#TRANGTHAI').val();
				oBieuMauBaoCao.LOAIBAOCAO = $('#LOAIBAOCAO').val();
				var rs = oBieuMauBaoCao.save();
				that.bindGrid01();
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show(rs.MESSAGE, '40%', '50px');
			}
		})

		$('#tblDanhSach tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				oBieuMauBaoCao.BIEUMAUBAOCAOID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				idBieuMauBaoCao = $(this).find('.rowID').val();
				oBieuMauBaoCao.BIEUMAUBAOCAOID = idBieuMauBaoCao;
				that.filterAction('SELECT');
			}
		});
	});
}