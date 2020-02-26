var MeNuView = function () {
	var idmodal = 0;
	var that = this;
	this.AppTitle = 'Danh sách dự án';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oMeNu = new MeNu();
	var Validate = new validate();
	var list = [];
	var listdvcha = []
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
		oMeNu.getAll();
		that.oTable.clear().draw();
		list = oMeNu.LIST;
		var aRows = [];
		for (var i = 0; i < oMeNu.LIST.length; i++) {
			var _item = oMeNu.LIST[i];
			var _hidden = '<p style="display:none" class="rowID"  />' + JSON.stringify(_item) + '</p>';
			aRows.push([
				(i + 1) + _hidden,
				_item.STT,
				_item.IDCHA,
				_item.NAME,
				_item.URL,
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
		$(document).ready(() => {
			listdvcha = list.map(value => {
				if (value.IDCHA == null) {
					return { IDCHA: value.IDCHA, ID: value.ID }
				}
			})
			var option = "<option value='1'>Không có đơn vị cha</option>"
			listdvcha.map(value => {
				if (value) {

					option = option + "<option value='" + value.ID + "'>" + value.ID + "</option>"
				}
			})
			$('#IDCHA').html(option)
		})
	}

	$(function () {

		that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
		that.oDialog = new PopupDialog(reload);
		that.init();

		function uuidv4() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		}

		function reload() {
			that.filterAction('NEW');
			that.bindGrid01();
		}

		              $('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()                                                                               
			oMeNu.ID = uuidv4();
			$('#STT').val('');
			$('#IDCHA').val('');
			$('#NAME').val('');
			$('#URL').val('');

			that.bindModal();
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			var dataa = JSON.parse(idmodal)
			oMeNu.IDCHA = JSON.parse(idmodal).IDCHA
			$('#STT').val(dataa.STT);
			$('#IDCHA').val(dataa.IDCHA);
			$('#NAME').val(dataa.NAME);
			$('#URL').val(dataa.URL);
		});
		$('.ACTIONS').on('click', '#btnDelete', function (e) {
				e.preventDefault()                                                        
			if (!oMeNu.ID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn kế hoạch để xóa', '40%', '50px');
				return false;
			}
			function ok() {
				var rs = oMeNu.del(oMeNu.ID);
				var oAlert = new AlertDialog1('Thông báo');
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
			String.prototype.replaceAll = function (search, replacement) {
				var target = this;
				return target.replace(new RegExp(search, 'g'), replacement);
			};
			
			if (fl) {
				oMeNu.IDCHA = $('#IDCHA').val();
				oMeNu.NAME = $('#NAME').val();
				oMeNu.STT = Number($('#STT').val());
				oMeNu.URL = $('#URL').val();
				var rs = oMeNu.save();
				that.bindGrid01();
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show(rs.MESSAGE, '40%', '50px');
			}
		})

		$('#Grid01 tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				oMeNu.ID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				idmodal = $(this).find('.rowID').text();
				oMeNu.ID = JSON.parse(idmodal).ID;
				that.filterAction('SELECT');
			}
		});
	});
}