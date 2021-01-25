var DonViView = function () {
	var idmodal = 0;
	var that = this;
	this.AppTitle = 'Danh sách dự án';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oDonVi = new DonVi();
	var list = [];
	var listdvcha = [];
	var arrMa = [];
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
		oDonVi.getAll();
		that.oTable.clear().draw();
		list = oDonVi.LIST;
		var aRows = [];
		arrMa = [];
		for (var i = 0; i < oDonVi.LIST.length; i++) {
			var _item = oDonVi.LIST[i];
			arrMa.push(_item.MA)
			var _hidden = '<p style="display:none" class="rowID"  />' + JSON.stringify(_item) + '</p>';
			aRows.push([
				(i + 1) + _hidden,
				_item.MA,
				_item.TENDONVI,
				_item.TENDVCHA,
				_item.TINHTHANH,
			]);
		}
		that.oTable.rows.add(aRows).draw();
		arrMa = deduplicate(arrMa) 
	}

	this.init = function () {
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
		that.bindGrid01();
	}

	this.bindModal = function () {
		var nguoidungs = new NguoiDung();
		var option = ''
		var tt_id = nguoidungs.getTinhThanhs();

		var list_tt = nguoidungs.getTinhThanh(tt_id[0].TINHTHANHID);

		list_tt.map(function (item, index) {
			option = option + '<option value="' + item.TINHTHANHID + '">' + item.TEN + '</option>'
		})
		$("#TINHTHANHID").html(option).trigger('change')
	}

	$(function () {

		that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
		that.oDialog = new PopupDialog(reload);
		setTimeout(() => {
			that.init();
		}, 200);
		function reload() {
			that.filterAction('NEW');
			that.bindGrid01();
		}

		$('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()
			$("#exampleModalLongTitle").text('Thêm mới đơn vị')
			$("#Grid01").find('.selected').removeClass('selected');
			oDonVi.DONVIID = uuidv4();
			$('#MA').val('');
			$('#TENDONVI').val('');
			// $('#TINHTHANHID').val('');
			// $('#IDCHA').val('');
			$('#NGUONTHU').val('TW').select2();
			$('#TYLE').val('');
			that.bindModal();
			$("#IDCHA").prop('disabled', false)
		});

		$('.ACTIONS').on('click', '#btnDelete', function (e) {
			e.preventDefault()
			if (!oDonVi.DONVIID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn kế hoạch để xóa', '40%', '50px');
				return false;
			}
			function ok() {
				var rs = oDonVi.del(oDonVi.DONVIID);
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

		$('.ACTIONS').on('click', '#btnEdit', function () {
			$("#exampleModalLongTitle").text('Sửa đơn vị')
			var donvigetbyid = JSON.parse(idmodal) 
			oDonVi.DONVIID = JSON.parse(idmodal).DONVIID
			$('#TENDONVI').val(donvigetbyid.TENDONVI);
			$('#MA').val(donvigetbyid.MA);
			$('#TINHTHANHID').val(donvigetbyid.TINHTHANHID);
			$('#TINHTHANHID').trigger('change'); 
			$('#NGUONTHU').val(donvigetbyid.NGUONTHU).select2();
			$('#TYLE').val(donvigetbyid.TYLE);
			var rs = oDonVi.getByIdCha(donvigetbyid.IDCHA) 
			$("#IDCHA").html('<option value="'+donvigetbyid.IDCHA+'">'+rs[0].TENDONVI+'</option>')
			$("#IDCHA").val(donvigetbyid.IDCHA).select2()
			$("#IDCHA").prop('disabled', true)
		});
		$(".btnSave").on('click', function (e) {
			if (isDoubleClicked($(this))) return;
			e.preventDefault();
			var oAlert = new AlertDialog1('Thông báo');
			String.prototype.replaceAll = function (search, replacement) {
				var target = this;
				return target.replace(new RegExp(search, 'g'), replacement);
			};
			if ($('#MA').val() == '' || $("#MA").val().trim() == '') {
				oAlert.show('Mã không được để rỗng', '40%', '50px');
				return;
			}
			if ($('#MA').val().length > 10) {
				oAlert.show('Mã không được vượt quá 10 kí tự !', '40%', '50px');
				return;
			}
			else {
				const regexMa = /[^a-zA-Z0-9_ ]/
				const regex = /[^a-zA-Z0-9-_ ,.()áÁàÀảẢãÃạẠăĂắẮằẰẳẲẵẴặẶâÂấẤầẦẩẨẫẪậẬđĐéÉèÈẻẺẽẼẹẸêÊếẾềỀểỂễỄệỆíÍìÌỉỈĩĨịỊóÓòÒỏỎõÕọỌôÔốỐồỒổỔỗỖộỘơƠớỚờỜởỞỡỠợỢúÚùÙủỦũŨụỤưƯứỨừỪửỬữỮựỰ]/;
				if(regexMa.test($('#MA').val())){
					oAlert.show('Mã không được chứa ký tự đặc biệt', '40%', '50px');
					return;
				}
				if(regex.test($('#TENDONVI').val())){
					oAlert.show('Tên đơn vị không được chứa ký tự đặc biệt', '40%', '50px');
					return;
				}
				if(arrMa.includes($('#MA').val().trim())){
					oAlert.show('Mã đã bị trùng', '40%', '50px');
					return;
				} 
				oDonVi.TENDONVI = $('#TENDONVI').val();
				oDonVi.TINHTHANHID = Number($('#TINHTHANHID').val());
				oDonVi.IDCHA = $('#IDCHA').val();
				oDonVi.MA = $('#MA').val().trim();
				oDonVi.NGUONTHU = $("#NGUONTHU").val();
				oDonVi.TYLE = Number($("#TYLE").val());
				var rs = oDonVi.save();
				if (rs.CODE == 3) {
					var oAlert = new AlertDialog1('Thông báo');
					oAlert.show('Mã này đã được sử dụng', '40%', '50px');
				}
				else {
					that.bindGrid01();
					var oAlert = new AlertDialog('Thông báo');
					oAlert.show(rs.MESSAGE, '40%', '50px');
				}
			}
		})
		$('#TINHTHANHID').on('change', function (e) {
			e.preventDefault();
			listdvcha = list.map(value => {
				if (value.TINHTHANHID == $('#TINHTHANHID').val() || value.TINHTHANHID == 0) {
					return { DONVIID: value.DONVIID, TENDONVI: value.TENDONVI }
				}
			})
			var option = ""
			listdvcha.map(value => {
				if (value) {
					option = option + "<option value='" + value.DONVIID + "'>" + value.TENDONVI + "</option>"
				}
			})
			$('#IDCHA').html(option)
			$('#IDCHA').trigger('change')
		})
		$('body').on('keyup', '#TYLE', function () {
			if (Number($("#TYLE").val()) > 100) {
				$("#TYLE").val('100')
			}
			else
				if (Number($("#TYLE").val() < 0)) {
					$("#TYLE").val('0')
				}
		})
		$('#Grid01 tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				oDonVi.DONVIID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				idmodal = $(this).find('.rowID').text();
				oDonVi.DONVIID = JSON.parse(idmodal).DONVIID;
				that.filterAction('SELECT');
			}
		});
	});
}