var KeHoachVayHangNamView = function () {
	var idKeHoachVayHangNam = 0;
	var that = this;
	this.AppTitle = 'Kế hoạch vay hàng năm';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oKeHoachVayHangNam = new KeHoachVayHangNam();
	var oHopDongVayLai = new HopDongVayLai();
	var tienteid;
	var tientecpid;
	var id = 100;
	const apr = jwt.role.indexOf('VAYHANGNAM.APPROVE')
	this.filterAction = function (sState) {
		switch (sState) {
			case 'NEW':
				ControlHelper.Input.disable(['#btnEdit', '#btnLuu', '#btnDelete', '#btnCancel', '#btnPheDuyetDuToan']);
				ControlHelper.Input.enable(['#btnAddNew']);
				break;
			case 'SELECT':
				ControlHelper.Input.enable(['#btnEdit', '#btnCancel', '#btnDelete']);
				ControlHelper.Input.disable(['#btnPheDuyetDuToan']);
				break;
			case 'APPROVE':
				ControlHelper.Input.enable(['#btnPheDuyetDuToan']);
				ControlHelper.Input.disable(['#btnEdit']);
				break;
			case 'APPROVED':
				ControlHelper.Input.enable(['#btnPheDuyetDuToan']);
				ControlHelper.Input.disable(['#btnEdit']);
				break;
			case 'WAITING':
				ControlHelper.Input.disable(['#btnEdit']);
				break;
			case 'NOPE':
				ControlHelper.Input.enable(['btnEdit']);
				break;
			case 'EDIT':
				ControlHelper.Input.disable(['#btnEdit']);
				ControlHelper.Input.enable(['#btnLuu', '#btnCancel', '#btnDelete']);
				break;
			default:
				break;
		}
	}
	function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
		if (amount == null) {
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
	}
	this.bindGrid01 = function () {
		oKeHoachVayHangNam.getAll();
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < oKeHoachVayHangNam.LIST.length; i++) {
			var _item = oKeHoachVayHangNam.LIST[i];
			_item.SOTIENVAY = formatMoney(Number(_item.SOTIENVAY) + Number(_item.SOTIENCAPPHAT))
			_item.LUYKERUTVONVAYLAI = formatMoney(Number(_item.LUYKERUTVONVAYLAI) + Number(_item.LUYKERUTVONCAPPHAT))
			_item.DUNOVAY = formatMoney(_item.DUNOVAY)
			if (_item.COCHETAICHINH == "CP") {
				_item.dunovaylai = 0
			}
			else {
				var rs = oKeHoachVayHangNam.getDuNoVayLai(_item.KEHOACHVAYHANGNAMID)
				_item.dunovaylai = formatMoney(Number(rs.TONGVAY) - Number(rs.TONGTRA))
			}
			var download = ''
			if (_item.URL) {
				download = '<button  val="' + _item.URL + '" class= "btn btn-primary btnTaixuong" >Tải xuống</button>'
			}
			else {
				download = ''
			}
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.KEHOACHVAYHANGNAMID + '" />';
			var button = ''
			if (_item.STATUS_APPROVE === 0 && jwt.id === _item.CREATEDBY) {
				button = '<button style="font-size: 10px; padding: 3px !important; float: left;"  class= "btn btn-primary btnSendApprove" data-row-id=" ' + _item.KEHOACHVAYHANGNAMID + ' " data-nametb="' + _item.MATB + '" data-namefuntion="' + that.__proto__.constructor.name + '" title="Gửi phê duyệt">Gửi phê duyệt </button>'
			}
			if ((_item.STATUS_APPROVE === 2 && apr >= 0 && jwt.unitid === _item.DONVIID) || (_item.STATUS_APPROVE === 2 && apr >= 0 && jwt.donvi.includes(_item.DONVIID))) {
				button = '<button style=" font-size: 14px; padding: 3px !important; float: left "  class= "btn btn-success btnApprove" data-row-id=" ' + _item.KEHOACHVAYHANGNAMID + ' " data-nametb="' + _item.MATB + '" data-namefuntion="' + that.__proto__.constructor.name + '" title="Phê duyệt"><i class="fa fa-check"></i> </button>' + '<button  class= "btn btn-danger btnReject" style=" font-size: 14px; padding: 3px !important;" data-row-id="' + _item.KEHOACHVAYHANGNAMID + '" data-nametb="' + _item.MATB + '" data-namefuntion="' + that.__proto__.constructor.name + '" title="Từ chối"> <i class="fa fa-times"></i> </button>'
			}
			button = button + '<button style=" font-size: 14px; padding: 3px !important; float: right "  class= "btn btn-success btnSeeApprove" data-row-id=" ' + _item.KEHOACHVAYHANGNAMID + ' " data-nametb="' + _item.MATB + '" data-namefuntion="' + that.__proto__.constructor.name + '" title="Xem lịch sử phê duyệt"><i class="fa fa-eye"></i> </button>'
			var trangthaipheduyet =
				_item.STATUS_APPROVE + '' === '0' ? '<a class="btn btn-warning" style="width: 130px; font-size: 10px; padding: 3px !important;  ">Chờ gửi phê duyệt</a>' : _item.STATUS_APPROVE + '' === '2' ? '<a class="btn btn-warning" style="width: 130px; font-size: 10px; padding: 3px !important;  ">Chờ phê duyệt</a>' : _item.STATUS_APPROVE + '' === '3' ? '<a class="btn btn-success" style="width: 130px; font-size: 10px; padding: 3px !important;  ">Đã phê duyệt</a>' : _item.STATUS_APPROVE + '' === '1' ? '<a class="btn btn-danger" style="width: 130px; font-size: 10px; padding: 3px !important;  ">Từ chối</a>' : _item.STATUS_APPROVE + '' === '4' ? '<a class="btn btn-warning" style="width: 130px; font-size: 10px; padding: 3px !important;  ">Phê duyệt dự toán</a>' : ''
			// if (_item.STATUS_APPROVE === 3 || (_item.STATUS_APPROVE === 0 && jwt.id === _item.CREATEDBY) || (_item.STATUS_APPROVE === 1 && jwt.id === _item.CREATEDBY) || (_item.STATUS_APPROVE === 2 && apr >= 0) || (_item.STATUS_APPROVE == 2 && jwt.id === _item.CREATEDBY)) {
			aRows.push([
				(i + 1) + _hidden,
				_item.MA,
				_item.TEN,
				_item.NAMKEHOACH,
				_item.SOTIENVAY,
				_item.LUYKERUTVONVAYLAI,
				_item.dunovaylai,
				trangthaipheduyet,
				button,
				download
			]);
			// }
		}
		that.oTable.rows.add(aRows).draw();
	}
	this.reSetDetail = function () {
		$('#table-multi').html('')
	}
	this.init = function () {
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
		that.bindGrid01();
	}
	this.bindModal = function () {
		String.prototype.replaceAll = function (search, replacement) {
			var target = this;
			return target.replace(new RegExp(search, 'g'), replacement);
		};
		$(document).ready(() => {
			var DonViTienTes = new DonViTienTe();
			DonViTienTes.getAll();
			var duans = new DuAn();
			duans.getAll();
			var duanResult = duans.LIST;
			var optionDuan = '';
			duanResult.map(value => {
				if (Number(value.TONGHOPDONG) == 0 && (value.COCHETAICHINH == "VL" || value.COCHETAICHINH == "HH")) {
					return
				}
				else {
					optionDuan = optionDuan + "<option data-luykehanmuccapphat='" + value.LUYKEHANMUCCAPPHAT + "' data-tienteid='" + value.TIENTEID + "' data-matiente='" + value.MATIENTE + "' data-phantramvaylai='" + value.PHANTRAMVAYLAI + "' data-tongmucdautu='" + value.TONGMUCDAUTU + "' data-tenduan='" + value.TEN + "' data-maduan='" + value.MA + "' data-cochetaichinh='" + value.COCHETAICHINH + "' value='" + value.DUANID + "'>" + value.MA + " - " + value.COCHETAICHINH + " - " + value.TEN + "</option>"
				}
			})
			$('#DUANID').html(optionDuan)
			if (optionDuan != "") {
				$('#DUANID').trigger('change')
			}
			var resultDonViTienTe = DonViTienTes.LIST;
			var option = '';
			resultDonViTienTe.map(value => {
				option = option + "<option data-tygia='" + value.BANRA + "' value='" + value.TIENTEID + "'>" + value.MA + "</option>"
			})
			$('#DVTIENTE').html(option)
		})
	}
	this.bindModalEdit = function () {
		var duans = new DuAn();
		duans.getAll();
		var duanResult = duans.LIST;
		var optionDuan = '';
		duanResult.map(value => {
			optionDuan = optionDuan + "<option data-luykehanmuccapphat='" + value.LUYKEHANMUCCAPPHAT + "' data-tienteid='" + value.TIENTEID + "' data-matiente='" + value.MATIENTE + "' data-phantramvaylai='" + value.PHANTRAMVAYLAI + "' data-tongmucdautu='" + value.TONGMUCDAUTU + "' data-tenduan='" + value.TEN + "' data-maduan='" + value.MA + "' data-cochetaichinh='" + value.COCHETAICHINH + "' value='" + value.DUANID + "'>" + value.MA + " - " + value.TEN + "</option>"
		})
		$('#DUANID').html(optionDuan)
		oKeHoachVayHangNam.getById(idKeHoachVayHangNam);
		$('#DUANID').val(oKeHoachVayHangNam.DUANID).select2();
		$('#DUANID').trigger('change')
	}

	function fnc_reload_hanmuc_vay_capphat() {
		var getHamMucDuNo = oKeHoachVayHangNam.getHanMucDuNo($("#NAMKEHOACH").val(), $("#DUANID").val(), $("#HOPDONGVAYLAIID").val());
		var text = getHamMucDuNo[0].TONGKEHOACH;
		var maDuAn = $("#DUANID option:selected").attr('data-maduan');
		var tenDuAn = $("#DUANID option:selected").attr('data-tenduan');
		var tongMucDauTu = $("#DUANID option:selected").attr('data-tongmucdautu');
		var soTienVayLai = $("#HOPDONGVAYLAIID option:selected").attr('data-sotienvay');
		var coCheTaiChinh = $("#DUANID option:selected").attr('data-cochetaichinh');
		var phanTramCapPhat = Number(100 - $("#DUANID option:selected").attr('data-phantramvaylai'));
		var maHopDong = $("#HOPDONGVAYLAIID option:selected").attr('data-mahopdong');
		var namKeHoach = $("#NAMKEHOACH").val();
		var luyKeKeHoachVayLai = $("#HOPDONGVAYLAIID option:selected").attr('data-luykekehoachvaylai');
		var soTienVayLaiTuChoi = $("#HOPDONGVAYLAIID option:selected").attr('data-sotienvaylaituchoi');
		if (maHopDong) {
			$("#MA").val(maDuAn + '-' + namKeHoach + '-' + maHopDong + '-' + text);
			$("#TEN").val('Kế hoạch vốn năm ' + namKeHoach + ' cho dự án ' + tenDuAn);
			if (coCheTaiChinh == "HH") {
				var soTienCapPhat = String(tongMucDauTu * phanTramCapPhat / 100)
				var luyKeKeHoachCapPhat = $("#HOPDONGVAYLAIID option:selected").attr('data-luykekehoachcapphat');
				var soTienCapPhatTuChoi = $("#HOPDONGVAYLAIID option:selected").attr('data-sotiencapphattuchoi');
				$("#HANMUCVAY").val(formatMoney(Number(soTienVayLai) - Number(luyKeKeHoachVayLai) + Number(soTienVayLaiTuChoi)))
				$("#HANMUCCAPPHAT").val(formatMoney(Number(soTienCapPhat) - Number(luyKeKeHoachCapPhat) + Number(soTienCapPhatTuChoi)))
			}
			else {
				$("#HANMUCVAY").val(formatMoney(Number(soTienVayLai) - Number(luyKeKeHoachVayLai) + Number(soTienVayLaiTuChoi)))
			}
		}
		else {
			$("#MA").val(maDuAn + '-' + namKeHoach);
			$("#TEN").val('Kế hoạch vốn năm ' + namKeHoach + ' cho dự án ' + tenDuAn);
		}
	}

	function fnc_format_number_add_commas(nStr) {
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

	function fnc_sum_up(p_sub, p_total) {
		var sum = 0
		if (p_sub.length > 0)
			$('.' + p_sub).map((index, value) => {
				if ($(value).val()) {
					sum = parseInt(sum) + parseInt(fnc_replace($(value).val(), ',', ''))
				}
			})
		if (p_total.length > 0)
			$("#" + p_total).val(fnc_format_number_add_commas(sum))
		return sum;
	}

	function fnc_nvl(p_GiaTriKiemTra, p_GiaTriMacDinh) {
		return (p_GiaTriKiemTra === null || String(p_GiaTriKiemTra).length === 0) ? p_GiaTriMacDinh : p_GiaTriKiemTra;
	}

	$(function () {

		$(document).ready(function () {

			that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
			that.dttablemulti = ControlHelper.Datatable.Init('table-multi-approve', 25, true)
			that.oDialog = new PopupDialog(reload);
			that.init();

			$("#DONVIID").html(fnc_danhsachdonvi())

			function reload() {
				that.filterAction('NEW');
				that.bindGrid01();
			}

			$('.ACTIONS').on('click', '#btnAddNew', function (e) {
				e.preventDefault();
				$("#Grid01").find('.selected').removeClass('selected');
				$("#exampleModalLongTitle").text('Thêm kế hoạch vay hàng năm');
				that.bindModal();
				$('#MA').val('');
				$('#list_uploadfile').html('');
				$('#TEN').val('');
				$('#SOTIENVAY').val('');
				$('#BUDAPBOICHI').val('');
				$('#SOTIENCAPPHAT').val('');
				$('#TRANOGOC').val('');
				$("#HANMUCVAY").val('0');
				$("#HANMUCCAPPHAT").val('0');
				$("#DUNOVAY").val('0');
				$("#DUNOCAPPHAT").val('0');
				$("#DONVIID").val($("#DONVIID option:selected").attr('value')).select2();
				that.reSetDetail();
				idKeHoachVayHangNam = 0;
				fnc_removeSpace();
				fnc_removeName();
				$("#DUANID").prop('disabled', false);
				$("#HOPDONGVAYLAIID").prop('disabled', false);
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
			$('.ACTIONS').on('click', '#btnEdit', function (e) {
				e.preventDefault();
				$("#Grid01").find('.selected').removeClass('selected');
				that.bindModalEdit();
				oKeHoachVayHangNam.getById(idKeHoachVayHangNam);
				oKeHoachVayHangNam.getByIdCha(oKeHoachVayHangNam.MA);
				$('#MA').val(oKeHoachVayHangNam.MA);
				$('#TEN').val(oKeHoachVayHangNam.TEN);
				$('#NAMKEHOACH').val(oKeHoachVayHangNam.NAMKEHOACH);
				$('#DONVIID').val(oKeHoachVayHangNam.DONVIID).select2();
				$('#HOPDONGVAYLAIID').val(oKeHoachVayHangNam.HOPDONGVAYLAIID).select2();
				$('#HANMUCVAY').val(formatMoney(oKeHoachVayHangNam.HANMUCVAY));
				$('#HANMUCCAPPHAT').val(formatMoney(oKeHoachVayHangNam.HANMUCCAPPHAT));
				$('#SOTIENVAY').val(formatMoney(oKeHoachVayHangNam.SOTIENVAY));
				$('#SOTIENCAPPHAT').val(formatMoney(oKeHoachVayHangNam.SOTIENCAPPHAT));
				$('#DUNOVAY').val(formatMoney(oKeHoachVayHangNam.DUNOVAY));
				$('#DUNOCAPPHAT').val(formatMoney(oKeHoachVayHangNam.DUNOCAPPHAT));
				$('#TRANOGOC').val(formatMoney(oKeHoachVayHangNam.TRANOGOC));
				$('#BUDAPBOICHI').val(formatMoney(oKeHoachVayHangNam.BUDAPBOICHI));
				$("#exampleModalLongTitle").text('Sửa kế hoạch vay hàng năm');
				$("#DUANID").prop('disabled', true);
				$("#HOPDONGVAYLAIID").prop('disabled', true);
				fnc_removeSpace();
				fnc_removeName();
			});

			$('.ACTIONS').on('click', '#btnDelete', function (e) {
				e.preventDefault()
				if (!oKeHoachVayHangNam.KEHOACHVAYHANGNAMID) {
					var oAlert = new AlertDialog('Cảnh báo');
					oAlert.show('Chưa chọn kế hoạch để xóa', '40%', '50px');
					return false;
				}
				function ok() {
					var oDotRutVon = new DotRutVon();
					var statusDelete = oDotRutVon.GETSTATUS(Number(idKeHoachVayHangNam));
					if (Number(statusDelete[0].TONGKEHOACH) > 0) {
						var oAlert = new AlertDialog1('Thông báo');
						oAlert.show('Kế hoạch này đã có đợt rút vốn, không được xóa', '40%', '50px');
					}
					else {
						var rs = oKeHoachVayHangNam.delete(idKeHoachVayHangNam);
						var oAlert = new AlertDialog('Thông báo');
						oAlert.show(rs.MESSAGE, '40%', '50px');
						//reload sau khi delete  
						that.bindGrid01();
						reload();
					}
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
				if ($('#MA').val() == '') {
					var oAlert = new AlertDialog1('Thông báo');
					oAlert.show('Mã không được để trống', '40%', '50px');
					return;
				}
				else {
					var list_tr_NGUONVAY = $('.input-table .NGUONVAY')
					var list_tr_PHUONGANVAY = $('.input-table .PHUONGANVAY')
					var list_tr_SOTIENVAY = $('.input-table .SOTIENVAY')
					var list_tr_SOTIENCAPPHAT = $('.input-table .SOTIENCAPPHAT')
					var list_tr_DONVITIENTE = $('.input-table .DONVITIENTE')
					var list_tr_DONVITIENTECP = $('.input-table .DONVITIENTECP')
					var list_tr_KHOILUONGPHATHANH = $('.input-table .KHOILUONGPHATHANH')
					var list_tr_CHIPHIHUYDONG = $('.input-table .CHIPHIHUYDONG')
					var list_tr_NGUYENTEVAY = $('.input-table .NGUYENTEVAY')
					var list_tr_NGUYENTECAPPHAT = $('.input-table .NGUYENTECAPPHAT')
					var r_list_tr_NGUONVAY = []
					var r_list_tr_PHUONGANVAY = []
					var r_list_tr_SOTIENVAY = []
					var r_list_tr_SOTIENCAPPHAT = []
					var r_list_tr_DONVITIENTE = []
					var r_list_tr_DONVITIENTECP = []
					var r_list_tr_KHOILUONGPHATHANH = []
					var r_list_tr_CHIPHIHUYDONG = []
					var r_list_tr_NGUYENTEVAY = []
					var r_list_tr_NGUYENTECAPPHAT = []
					list_tr_NGUONVAY.map((index, value) => {
						r_list_tr_NGUONVAY.push($(value).val())
					})
					list_tr_PHUONGANVAY.map((index, value) => {
						r_list_tr_PHUONGANVAY.push($(value).val())
					})
					list_tr_SOTIENVAY.map((index, value) => {
						r_list_tr_SOTIENVAY.push($(value).val().replaceAll(',', ''))
					})
					list_tr_SOTIENCAPPHAT.map((index, value) => {
						r_list_tr_SOTIENCAPPHAT.push($(value).val().replaceAll(',', ''))
					})
					list_tr_DONVITIENTE.map((index, value) => {
						r_list_tr_DONVITIENTE.push($(value).val())
					})
					list_tr_DONVITIENTECP.map((index, value) => {
						r_list_tr_DONVITIENTECP.push($(value).val())
					})
					list_tr_KHOILUONGPHATHANH.map((index, value) => {
						r_list_tr_KHOILUONGPHATHANH.push($(value).val().replaceAll(',', ''))
					})
					list_tr_CHIPHIHUYDONG.map((index, value) => {
						r_list_tr_CHIPHIHUYDONG.push($(value).val().replaceAll(',', ''))
					})
					list_tr_NGUYENTEVAY.map((index, value) => {
						r_list_tr_NGUYENTEVAY.push($(value).val().replaceAll(',', ''))
					})
					list_tr_NGUYENTECAPPHAT.map((index, value) => {
						r_list_tr_NGUYENTECAPPHAT.push($(value).val().replaceAll(',', ''))
					})
					//Fill data for master
					oKeHoachVayHangNam.KEHOACHVAYHANGNAMID = idKeHoachVayHangNam;
					oKeHoachVayHangNam.MA = $('#MA').val();
					oKeHoachVayHangNam.TEN = $('#TEN').val();
					oKeHoachVayHangNam.NAMKEHOACH = $('#NAMKEHOACH').val();
					oKeHoachVayHangNam.DONVIID = $("#DONVIID").val();
					oKeHoachVayHangNam.HANMUCVAY = $('#HANMUCVAY').val().replaceAll(',', '');
					oKeHoachVayHangNam.HANMUCCAPPHAT = $('#HANMUCCAPPHAT').val().replaceAll(',', '');
					oKeHoachVayHangNam.SOTIENVAY = $('#SOTIENVAY').val().replaceAll(',', '');
					oKeHoachVayHangNam.SOTIENCAPPHAT = $('#SOTIENCAPPHAT').val().replaceAll(',', '');
					oKeHoachVayHangNam.DUNOVAY = $('#DUNOVAY').val().replaceAll(',', '');
					oKeHoachVayHangNam.DUNOCAPPHAT = $('#DUNOCAPPHAT').val().replaceAll(',', '');
					oKeHoachVayHangNam.TRANOGOC = $('#TRANOGOC').val().replaceAll(',', '');
					oKeHoachVayHangNam.NGHIAVUTRANO = "";
					oKeHoachVayHangNam.DUKIENNGUONTRA = "";
					oKeHoachVayHangNam.DUANID = $('#DUANID').val();
					oKeHoachVayHangNam.HOPDONGVAYLAIID = $('#HOPDONGVAYLAIID').val();
					oKeHoachVayHangNam.BUDAPBOICHI = $('#BUDAPBOICHI').val().replaceAll(',', '');
					oKeHoachVayHangNam.UID = uuidv4();
					//Gen sql for detail
					var querry = '';
					querry = "Insert all ";
					for (var i = 0; i < list_tr_NGUONVAY.length; i++) {
						querry = querry +
							" Into qln_detail_kehoachvayhangnam(NGUONVAY, PHUONGANVAY, SOTIENVAY, SOTIENCAPPHAT, DONVITIENTE, KHOILUONGPHATHANH, CHIPHIHUYDONG, IDKEHOACHVAYHANGNAM,TIENCPID, NGUYENTEVAY, NGUYENTECAPPHAT) VALUES('" +
							r_list_tr_NGUONVAY[i] + "','" +
							r_list_tr_PHUONGANVAY[i] + "', " +
							fnc_nvl(r_list_tr_SOTIENVAY[i], 0) + "," +
							fnc_nvl(r_list_tr_SOTIENCAPPHAT[i], 0) + ",'" +
							r_list_tr_DONVITIENTE[i] + "', '" +
							r_list_tr_KHOILUONGPHATHANH[i] + "' , '" +
							r_list_tr_CHIPHIHUYDONG[i] + "', '" +
							$('#MA').val() + "','" + r_list_tr_DONVITIENTECP[i] + "', '" +
							fnc_nvl(r_list_tr_NGUYENTEVAY[i], 0) + "', '" +
							fnc_nvl(r_list_tr_NGUYENTECAPPHAT[i], 0) + "') ";
					}
					querry = querry + " Select 1 from dual";
					// Insert master
					var rs = oKeHoachVayHangNam.save();
					if (Number(rs.CODE) === 3) {
						var oAlert = new AlertDialog1('Thông báo');
						oAlert.show('Mã này đã được sử dụng', '40%', '50px');
					}
					else {
						var pDelete = '';
						pDelete = "Delete qln_detail_kehoachvayhangnam where idkehoachvayhangnam ='" + $('#MA').val() + "'"
						if (rs.CODE == 0) {
							oKeHoachVayHangNam.savedtl(pDelete, querry);
							if (Number(idKeHoachVayHangNam) > 0) {
								oKeHoachVayHangNam.updateApprove(Number(idKeHoachVayHangNam))
							}
						}
						$("#idrowtable").val(rs.RESULT)
						$("#tablename").val(CurrentLayout)
						var rs1 = DATA.ajaxPostForm(CONFIG_API.URL.SEVER + 'upload', 'uploadForm')
						if (!rs1.success) {
							oKeHoachVayHangNam.deluid(rs.RESULT)
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

			$('body').on('click', '.btnTaixuong', function () {
				var url = CONFIG_API.URL.SEVER + $(this).attr('val')
				window.open(url)
			})

			$('body').on('click', '.button-clear', function () {
				fnc_sum_up('NGUYENTEVAY', 'SOTIENVAY');
				fnc_sum_up('NGUYENTECAPPHAT', 'SOTIENCAPPHAT');
			})

			$('body').on('change', '#DUANID', function (e) {
				e.preventDefault();
				$("#SOTIENVAY").val('')
				$("#HANMUCVAY").val('0')
				$("#SOTIENCAPPHAT").val('')
				$("#HANMUCCAPPHAT").val('0')
				$('#table-multi').empty();
				var cochetaichinh = $("#DUANID option:selected").attr('data-cochetaichinh')
				var maTienTe = $("#DUANID option:selected").attr('data-matiente')
				$("#tthanmuccap").text(maTienTe)
				$("#ttducp").text(maTienTe)
				$("#tttongtiencap").text(maTienTe)
				$("#ttduvl").text(maTienTe)
				$("#tthanmucvay").text(maTienTe)
				$("#tttongtienvay").text(maTienTe)
				var maDuAn = $("#DUANID option:selected").attr('data-maduan')
				var tenDuAn = $("#DUANID option:selected").attr('data-tenduan')
				tientecpid = $("#DUANID option:selected").attr('data-tienteid')
				tienteid = $("#DUANID option:selected").attr('data-tienteid')
				if (cochetaichinh == 'VL' || cochetaichinh == 'HH') {
					var duan = $("#DUANID option:selected").val();
					oHopDongVayLai.getAll();
					var hd = oHopDongVayLai.LIST;
					var optionHopDong = '';
					for (var i = 0; i < hd.length; i++) {
						if (hd[i].DUANID == duan) {
							optionHopDong = optionHopDong + "<option data-sotiencapphattuchoi='" + hd[i].SOTIENCAPPHATTUCHOI + "' data-sotienvaylaituchoi='" + hd[i].SOTIENVAYLAITUCHOI + "' tientecp-id='" + hd[i].TIENCPID + "' tiente-id='" + hd[i].TIENTEID + "' data-luykerutvoncapphat='" + hd[i].LUYKERUTVONCAPPHAT + "' data-luykerutvonvaylai='" + hd[i].LUYKERUTVONVAYLAI + "' data-luykekehoachcapphat='" + hd[i].LUYKEKEHOACHCAPPHAT + "' data-luykekehoachvaylai='" + hd[i].LUYKEKEHOACHVAYLAI + "' data-sotiencapphat='" + hd[i].SOTIENCAPPHAT + "' data-sotienvay='" + hd[i].TIENKYVAY + "' data-mahopdong='" + hd[i].MA + "' value='" + hd[i].HOPDONGVAYLAIID + "'>" + hd[i].MA + " - " + hd[i].TEN + "</option>"
						}
					}
					if (optionHopDong.length > 0) {
						$('#HOPDONGVAYLAIID').html(optionHopDong);
						$('#HOPDONGVAYLAIID').trigger('change');
					}
					else {
						$('#HOPDONGVAYLAIID').html('<option value="-1">Dự án này chưa tạo hợp đồng</option>');
						$('#HOPDONGVAYLAIID').val('-1').select2();
						$('#DUNOVAY').val('0')
						$('#DUNOCAPPHAT').val('0')
						$('#HANMUCVAY').val('0')
						$('#MA').val(maDuAn + '-' + $("#NAMKEHOACH").val())
						$('#TEN').val('Kế hoạch vốn năm ' + $("#NAMKEHOACH").val() + ' cho dự án ' + tenDuAn)
						$('#exampleModalLongTitle').text('Thêm kế hoạch vay hàng năm')
					}
				}
				else {
					$('#HOPDONGVAYLAIID').html('<option value="0">100% cấp phát</option>');
					$('#HOPDONGVAYLAIID').val('0').select2();
					$('#DUNOVAY').val('0')
					$('#DUNOCAPPHAT').val('0')
					$('#HANMUCVAY').val('0')
					var hanmuccapphat = oKeHoachVayHangNam.getHanMucCapPhat(Number($(this).val()))
					$('#HANMUCCAPPHAT').val(formatMoney(Number(hanmuccapphat[0].HANMUCCAPPHAT)))
					$('#MA').val(maDuAn + '-' + $("#NAMKEHOACH").val())
					$('#TEN').val('Kế hoạch vốn năm ' + $("#NAMKEHOACH").val() + ' cho dự án ' + tenDuAn)
					$('#exampleModalLongTitle').text('Thêm kế hoạch vay hàng năm')
				}
			})

			$('body').on('change', '#HOPDONGVAYLAIID', function (e) {
				e.preventDefault()
				fnc_reload_hanmuc_vay_capphat();
			})

			$('body').on('change', '.NGUONVAY', function () {
				var idKHOILUONGPHATHANH = '#KHOILUONGPHATHANH' + $(this).attr('data-index');
				var idCHIPHIHUYDONG = '#CHIPHIHUYDONG' + $(this).attr('data-index');
				var idSOTIENVAY = '#SOTIENVAY' + $(this).attr('data-index');
				var idSOTIENCAPPHAT = '#SOTIENCAPPHAT' + $(this).attr('data-index');
				var idDONVITIENTE = '#DONVITIENTE' + $(this).attr('data-index');
				var idDONVITIENTECP = '#DONVITIENTECP' + $(this).attr('data-index');
				var idNGUYENTEVAY = '#NGUYENTEVAY' + $(this).attr('data-index');
				var idNGUYENTECAPPHAT = '#NGUYENTECAPPHAT' + $(this).attr('data-index');
				if ($(this).val() === 'TP') {
					$(idSOTIENVAY).prop("disabled", true);
					$(idSOTIENVAY).css('background-color', '#EEEEEE');
					$(idSOTIENCAPPHAT).prop("disabled", true);
					$(idSOTIENCAPPHAT).css('background-color', '#EEEEEE');
					$(idDONVITIENTE).prop("disabled", true);
					$(idDONVITIENTE).css('background-color', '#EEEEEE');
					$(idDONVITIENTECP).prop("disabled", true);
					$(idDONVITIENTECP).css('background-color', '#EEEEEE');
					$(idKHOILUONGPHATHANH).prop("disabled", false);
					$(idKHOILUONGPHATHANH).val('');
					$(idKHOILUONGPHATHANH).css('background-color', 'white');
					$(idCHIPHIHUYDONG).prop("disabled", false);
					$(idCHIPHIHUYDONG).val('');
					$(idCHIPHIHUYDONG).css('background-color', 'white');
				}
				else {
					$(idSOTIENVAY).prop("disabled", false);
					$(idSOTIENVAY).css('background-color', 'white');
					$(idSOTIENCAPPHAT).prop("disabled", false);
					$(idSOTIENCAPPHAT).css('background-color', 'white');
					$(idDONVITIENTE).prop("disabled", false);
					$(idDONVITIENTE).css('background-color', 'white');
					$(idDONVITIENTECP).prop("disabled", false);
					$(idDONVITIENTECP).css('background-color', 'white');
					$(idKHOILUONGPHATHANH).prop("disabled", true);
					$(idKHOILUONGPHATHANH).val('');
					$(idKHOILUONGPHATHANH).css('background-color', '#EEEEEE');
					$(idCHIPHIHUYDONG).prop("disabled", true);
					$(idCHIPHIHUYDONG).val('');
					$(idCHIPHIHUYDONG).css('background-color', '#EEEEEE');
					let cochetaichinh = $("#DUANID option:selected").attr('data-cochetaichinh')
					if (cochetaichinh) {
						if (cochetaichinh.includes('HH') == true || cochetaichinh.includes('VL') == true) {
							$(idSOTIENVAY).css('background-color', '#FFFFFF');
							$(idSOTIENCAPPHAT).css('background-color', '#FFFFFF');
							$(idDONVITIENTE).css('background-color', '#FFFFFF');
							$(idDONVITIENTECP).css('background-color', '#FFFFFF');
							$(idSOTIENVAY).prop("disabled", false);
							$(idSOTIENCAPPHAT).prop("disabled", false);
							$(idDONVITIENTE).prop("disabled", false);
							$(idDONVITIENTECP).prop("disabled", false);
						} else {
							$(idSOTIENVAY).prop("disabled", true);
							$(idDONVITIENTE).prop("disabled", true);
							$(idSOTIENVAY).css('background-color', '#EEEEEE')
							$(idDONVITIENTE).css('background-color', '#EEEEEE')
							$(idSOTIENCAPPHAT).prop("disabled", true);
							$(idDONVITIENTECP).prop("disabled", true);
							$(idSOTIENCAPPHAT).css('background-color', '#EEEEEE')
							$(idDONVITIENTECP).css('background-color', '#EEEEEE')
						}
						if (cochetaichinh.includes('VL') == true) {
							$(idSOTIENVAY).css('background-color', '#FFFFFF')
							$(idDONVITIENTE).css('background-color', '#FFFFFF')
							$(idSOTIENCAPPHAT).prop("disabled", true);
							$(idDONVITIENTECP).prop("disabled", true);
							$(idSOTIENCAPPHAT).css('background-color', '#EEEEEE')
							$(idDONVITIENTECP).css('background-color', '#EEEEEE')
						}
						if (cochetaichinh.includes('CP') == true) {
							$(idSOTIENCAPPHAT).prop("disabled", false);
							$(idDONVITIENTECP).prop("disabled", false);
							$(idSOTIENCAPPHAT).css('background-color', '#FFFFFF')
							$(idDONVITIENTECP).css('background-color', '#FFFFFF')
							$(idSOTIENVAY).prop("disabled", true);
							$(idDONVITIENTE).prop("disabled", true);
							$(idSOTIENVAY).css('background-color', '#EEEEEE')
							$(idDONVITIENTE).css('background-color', '#EEEEEE')
						}
					}
				}
				if (Number(idKeHoachVayHangNam) == 0) {
					$(idSOTIENVAY).val('').trigger('keyup');
					$(idSOTIENCAPPHAT).val('').trigger('keyup');
					$(idDONVITIENTE).val('19');
					$(idDONVITIENTECP).val('19');
					$(idNGUYENTEVAY).val('');
					$(idNGUYENTECAPPHAT).val('');
				}
			})

			$('body').on('change', '#NAMKEHOACH', function () {
				fnc_reload_hanmuc_vay_capphat();
			})

			$('body').on('keyup', '.SOTIENCAPPHAT', function () {
				var nguyenTeCapPhat = $(this).attr('id').replace('SOTIENCAPPHAT', 'NGUYENTECAPPHAT')
				var donViTienTe = $(this).attr('id').replace('SOTIENCAPPHAT', 'DONVITIENTECP')
				var tyGia = $("#" + donViTienTe + " option:selected").attr('data-tygia').replace(',', '')
				var soTienCapPhat = $(this).val().replaceAll(',', '')
				var tongSoTienCapPhat = 0;
				if (tientecpid) {
					var giatiencp = JSON.parse(window.localStorage.getItem('TIENTE')).filter(a => a.TIENTEID == Number(tientecpid))[0].BANRA.replace(',', '')
					tongSoTienCapPhat = parseFloat(tyGia).toFixed(2) / Number(giatiencp) * parseFloat(soTienCapPhat).toFixed(2)
					$("#" + nguyenTeCapPhat).val(formatMoney(tongSoTienCapPhat))
				}
				else {
					$(this).val('')
				}
				var sumUpValue = fnc_sum_up('NGUYENTECAPPHAT', 'SOTIENCAPPHAT');
				if (Number(sumUpValue) > Number($("#HANMUCCAPPHAT").val().replaceAll(',', ''))) {
					var oAlert = new AlertDialog1('Thông báo');
					if (Number(idKeHoachVayHangNam) > 0) {
						return;
					}
					else {
						oAlert.show('Tổng số tiền cấp phát không được vượt quá hạn mức cấp phát', '40%', '50px');
					}
					$(this).val('0')
					$(this).trigger('keyup')
				}
				else {
					return;
				}
			})

			$('body').on('keyup', '.SOTIENVAY', function () {
				var donViTienTe = $(this).attr('id').replace('SOTIENVAY', 'DONVITIENTE')
				var nguyenTeVay = $(this).attr('id').replace('SOTIENVAY', 'NGUYENTEVAY')
				var tyGia = $("#" + donViTienTe + " option:selected").attr('data-tygia').replace(',', '')
				var soTienCapPhat = $(this).val().replaceAll(',', '')
				var tongSoTienCapPhat = 0;
				if (tienteid) {
					var giatienvl = JSON.parse(window.localStorage.getItem('TIENTE')).filter(a => a.TIENTEID == Number(tienteid))[0].BANRA.replace(',', '')
					tongSoTienCapPhat = parseFloat(tyGia).toFixed(2) / Number(giatienvl) * parseFloat(soTienCapPhat).toFixed(2)
					$("#" + nguyenTeVay).val(formatMoney(tongSoTienCapPhat))
				}
				else {
					$(this).val('')
				}
				var sumUpValue = fnc_sum_up('NGUYENTEVAY', 'SOTIENVAY');
				if (Number(sumUpValue) > Number($("#HANMUCVAY").val().replaceAll(',', ''))) {
					var oAlert = new AlertDialog1('Thông báo');
					if (Number(idKeHoachVayHangNam) > 0) {
						return;
					}
					else {
						oAlert.show('Tổng số tiền vay không được vượt quá hạn mức vay', '40%', '50px');
					}
					$(this).val('0')
					$(this).trigger('keyup')
				}
				else {
					return;
				}
			})

			$('body').on('change', '.DONVITIENTE', function () {
				var soTienVay = $(this).attr('id').replace('DONVITIENTE', 'SOTIENVAY')
				$("#" + soTienVay).trigger('keyup')
			})

			$('body').on('change', '.DONVITIENTECP', function () {
				var soTienCapPhat = $(this).attr('id').replace('DONVITIENTECP', 'SOTIENCAPPHAT')
				$("#" + soTienCapPhat).trigger('keyup')
			})

			$('body').on('keyup', '.KHOILUONGPHATHANH', function () {
				fnc_formatKeyUp();
			})

			$('body').on('keyup', '.CHIPHIHUYDONG', function () {
				fnc_formatKeyUp();
				fnc_sum_up('CHIPHIHUYDONG', '' + $(this).attr('id').replace('CHIPHIHUYDONG', 'NGUYENTEVAY'));
				fnc_sum_up('NGUYENTEVAY', 'SOTIENVAY');

			})

			$('body').on('keyup', '.SOTIENVAYDUTOAN', function () {
				fnc_formatKeyUp();
				var banRaNguyenTe = JSON.parse(window.localStorage.getItem('TIENTE')).filter(a => a.MA == $("#ttduvldt").text())[0].BANRA.replace
					(',', '')
				var banRaTienTe = JSON.parse(window.localStorage.getItem('TIENTE')).filter(a => a.TIENTEID == Number($("#" + $(this).attr('id').replace('SOTIENVAYDUTOAN', 'DONVITIENTEDUTOAN')).val()))[0].BANRA.replace(',', '')
				var tyGiaQuyDoi = parseFloat(banRaTienTe) / parseFloat(banRaNguyenTe)
				$("#" + $(this).attr('id').replace('SOTIENVAYDUTOAN', 'NGUYENTEVAYDUTOAN')).val(formatMoney(Math.floor(Number(tyGiaQuyDoi) * Number(fnc_replace($(this).val(), ',', '')))))
				fnc_sum_up('NGUYENTEVAYDUTOAN', 'sotienvay');
				if (Number(fnc_replace($("#sotienvay").val(), ',', '')) > Number(fnc_replace($("#hanmucvay").val(), ',', ''))) {
					$(this).val('').trigger('keyup')
				}
			})

			$('body').on('keyup', '.SOTIENCAPPHATDUTOAN', function () {
				fnc_formatKeyUp();
				var banRaNguyenTe = JSON.parse(window.localStorage.getItem('TIENTE')).filter(a => a.MA == $("#ttduvldt").text())[0].BANRA.replace
					(',', '')
				var banRaTienTe = JSON.parse(window.localStorage.getItem('TIENTE')).filter(a => a.TIENTEID == Number($("#" + $(this).attr('id').replace('SOTIENCAPPHATDUTOAN', 'DONVITIENTECPDUTOAN')).val()))[0].BANRA.replace(',', '')
				var tyGiaQuyDoi = parseFloat(banRaTienTe) / parseFloat(banRaNguyenTe)
				$("#" + $(this).attr('id').replace('SOTIENCAPPHATDUTOAN', 'NGUYENTECAPPHATDUTOAN')).val(formatMoney(Math.floor(Number(tyGiaQuyDoi) * Number(fnc_replace($(this).val(), ',', '')))))
				fnc_sum_up('NGUYENTECAPPHATDUTOAN', 'sotiencapphat');
				if (Number(fnc_replace($("#sotiencapphat").val(), ',', '')) > Number(fnc_replace($("#hanmuccapphat").val(), ',', ''))) {
					$(this).val('').trigger('keyup')
				}
			})

			$('body').on('change', '.DONVITIENTEDUTOAN', function () {
				$("#" + $(this).attr('id').replace('DONVITIENTEDUTOAN', 'SOTIENVAYDUTOAN')).trigger('keyup');
			})

			$('body').on('change', '.DONVITIENTECPDUTOAN', function () {
				$("#" + $(this).attr('id').replace('DONVITIENTECPDUTOAN', 'SOTIENCAPPHATDUTOAN')).trigger('keyup');
			})

			$('body').on('keyup', '.KHOILUONGPHATHANHDUTOAN', function () {
				fnc_formatKeyUp();
			})

			$('body').on('keyup', '.CHIPHIHUYDONGDUTOAN', function () {
				fnc_formatKeyUp();
				$("#" + $(this).attr('id').replace('CHIPHIHUYDONGDUTOAN', 'NGUYENTEVAYDUTOAN')).val($(this).val());
				fnc_sum_up('NGUYENTEVAYDUTOAN', 'sotienvay');
			})

			$('body').on('change', '.NGUONVAYDUTOAN', function () {
				if ($(this).val() == 'TP') {
					$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'KHOILUONGPHATHANHDUTOAN')).prop("disabled", false)
					$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'KHOILUONGPHATHANHDUTOAN')).css("background-color", '#f9f9f9')
					$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'CHIPHIHUYDONGDUTOAN')).prop("disabled", false)
					$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'CHIPHIHUYDONGDUTOAN')).css("background-color", '#f9f9f9')
					$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'SOTIENVAYDUTOAN')).prop("disabled", true)
					$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'SOTIENVAYDUTOAN')).css("background-color", '#EEEEEE')
					$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'DONVITIENTEDUTOAN')).prop("disabled", true)
					$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'DONVITIENTEDUTOAN')).css("background-color", '#EEEEEE')
					$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'SOTIENCAPPHATDUTOAN')).prop("disabled", true)
					$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'SOTIENCAPPHATDUTOAN')).css("background-color", '#EEEEEE')
					$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'DONVITIENTECPDUTOAN')).prop("disabled", true)
					$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'DONVITIENTECPDUTOAN')).css("background-color", '#EEEEEE')
				}
				else {
					$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'KHOILUONGPHATHANHDUTOAN')).prop("disabled", true)
					$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'KHOILUONGPHATHANHDUTOAN')).css("background-color", '#EEEEEE')
					$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'CHIPHIHUYDONGDUTOAN')).prop("disabled", true)
					$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'CHIPHIHUYDONGDUTOAN')).css("background-color", '#EEEEEE')
					var coCheTaiChinh = oKeHoachVayHangNam.getCoCheTaiChinh(Number(idKeHoachVayHangNam)).COCHETAICHINH
					if (coCheTaiChinh == "VL") {
						$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'SOTIENVAYDUTOAN')).prop("disabled", false)
						$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'SOTIENVAYDUTOAN')).css("background-color", '#f9f9f9')
						$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'DONVITIENTEDUTOAN')).prop("disabled", false)
						$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'DONVITIENTEDUTOAN')).css("background-color", '#f9f9f9')
						$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'SOTIENCAPPHATDUTOAN')).prop("disabled", true)
						$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'SOTIENCAPPHATDUTOAN')).css("background-color", '#EEEEEE')
						$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'DONVITIENTECPDUTOAN')).prop("disabled", true)
						$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'DONVITIENTECPDUTOAN')).css("background-color", '#EEEEEE')
					}
					else
						if (coCheTaiChinh == "CP") {
							$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'SOTIENCAPPHATDUTOAN')).prop("disabled", false)
							$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'SOTIENCAPPHATDUTOAN')).css("background-color", '#f9f9f9')
							$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'DONVITIENTECPDUTOAN')).prop("disabled", false)
							$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'DONVITIENTECPDUTOAN')).css("background-color", '#f9f9f9')
							$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'SOTIENVAYDUTOAN')).prop("disabled", true)
							$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'SOTIENVAYDUTOAN')).css("background-color", '#EEEEEE')
							$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'DONVITIENTEDUTOAN')).prop("disabled", true)
							$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'DONVITIENTEDUTOAN')).css("background-color", '#EEEEEE')
						}
						else {
							$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'SOTIENVAYDUTOAN')).prop("disabled", false)
							$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'SOTIENVAYDUTOAN')).css("background-color", '#f9f9f9')
							$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'DONVITIENTEDUTOAN')).prop("disabled", false)
							$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'DONVITIENTEDUTOAN')).css("background-color", '#f9f9f9')
							$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'SOTIENCAPPHATDUTOAN')).prop("disabled", false)
							$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'SOTIENCAPPHATDUTOAN')).css("background-color", '#f9f9f9')
							$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'DONVITIENTECPDUTOAN')).prop("disabled", false)
							$("#" + $(this).attr('id').replace('NGUONVAYDUTOAN', 'DONVITIENTECPDUTOAN')).css("background-color", '#f9f9f9')
						}
				}
			})

			$('body').on('click', '.btnApproved', function () {
				$("#" + $(this).attr('id').replace('btnApproved', 'STATUS')).val('0')
				$("#" + $(this).attr('id').replace('btnApproved', 'SOTIENVAYDUTOAN')).trigger('keyup')
				$("#" + $(this).attr('id').replace('btnApproved', 'SOTIENCAPPHATDUTOAN')).trigger('keyup')
				$("#" + $(this).attr('id')).css('display', 'none')
				$("#" + $(this).attr('id').replace('btnApproved', 'btnRejected')).css('display', 'none')
			})

			$('body').on('click', '.btnRejected', function () {
				$("#" + $(this).attr('id').replace('btnRejected', 'STATUS')).val('0')
				$("#" + $(this).attr('id')).css('display', 'none')
				$("#" + $(this).attr('id').replace('btnRejected', 'btnApproved')).css('display', 'none')
				$('tr#' + $(this).attr('id').replace('btnRejected', 'elementdutoan-')).remove()
			})

			$('body').on('click', '#btnPheDuyetDuToan', function () {
				$('#modalPheDuyetDuToan').modal('toggle')
				oKeHoachVayHangNam.getById(idKeHoachVayHangNam);
				$("#duanid").val(oKeHoachVayHangNam.TENDUAN)
				$("#hopdongvaylaiid").val(oKeHoachVayHangNam.TENHOPDONG)
				$("#ma").val(oKeHoachVayHangNam.MA)
				$("#ten").val(oKeHoachVayHangNam.TEN)
				$("#namkehoach").val(oKeHoachVayHangNam.NAMKEHOACH)
				$("#donviid").val(oKeHoachVayHangNam.TENDONVI)
				$("#dunovay").val(formatMoney(oKeHoachVayHangNam.DUNOVAY))
				$("#dunocapphat").val(formatMoney(oKeHoachVayHangNam.DUNOCAPPHAT))
				$("#hanmucvay").val(formatMoney(oKeHoachVayHangNam.HANMUCVAY))
				$("#hanmuccapphat").val(formatMoney(oKeHoachVayHangNam.HANMUCCAPPHAT))
				$("#sotienvay").val(formatMoney(oKeHoachVayHangNam.SOTIENVAY))
				$("#sotiencapphat").val(formatMoney(oKeHoachVayHangNam.SOTIENCAPPHAT))
				$("#ttduvldt").text(oKeHoachVayHangNam.MATIENTE)
				$("#tthanmucvaydt").text(oKeHoachVayHangNam.MATIENTE)
				$("#tttongtienvaydt").text(oKeHoachVayHangNam.MATIENTE)
				$("#ttducpdt").text(oKeHoachVayHangNam.MATIENTE)
				$("#tthanmuccapdt").text(oKeHoachVayHangNam.MATIENTE)
				$("#tttongtiencapdt").text(oKeHoachVayHangNam.MATIENTE)
				oKeHoachVayHangNam.getByIdChaDuToan(oKeHoachVayHangNam.MA);
			})

			$('body').on('click', '#ActionThemMoiDuToan', function () {
				var DonViTienTes = new DonViTienTe();
				DonViTienTes.getAll();
				var resultDonViTienTe = DonViTienTes.LIST;
				var optionTiente = '';
				resultDonViTienTe.map(value => {
					optionTiente = optionTiente + "<option value='" + value.TIENTEID + "'>" + value.MA + "</option>"
				})
				var selectTiente = '<select class = "DONVITIENTEDUTOAN" id="DONVITIENTEDUTOAN' + id + '" data-index="' + id + '">' + optionTiente + '</select>'
				var selectTienteCP = '<select class = "DONVITIENTECPDUTOAN" id="DONVITIENTECPDUTOAN' + id + '" data-index="' + id + '">' + optionTiente + '</select>'
				var selectNguonvon = '<select class="NGUONVAYDUTOAN" id="NGUONVAYDUTOAN' + id + '" data-index="' + id + '">' +
					'<option value="ODA" selected >Vay ODA/Ưu đãi</option>' +
					'<option value="TP">Trái phiếu</option>' +
					'<option value="NQ">Ngân quỹ</option>' +
					'<option value="DT">Dự trữ cấp tỉnh</option>' +
					'<option value="VDB">Ngân hàng VDB</option>' +
					'<option value="TCTD">Tổ chức TC, TD</option>' +
					'</select>'
				elemnts = '<tr class="input-table" id="elementdutoan-' + id + '">\
                    <td>' + selectNguonvon + '</td>\
                    <td><input type="text" class="PHUONGANVAYDUTOAN" id="PHUONGANVAYDUTOAN' + id + '"></td>\
                    <td><input type="text" autocomplete="off" class="SOTIENVAYDUTOAN" id="SOTIENVAYDUTOAN' + id + '" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" data-type="money" style="text-align: right;"></td>\
                    <td>' + selectTiente + '</td>\
                    <td><input type="text" class="SOTIENCAPPHATDUTOAN" id="SOTIENCAPPHATDUTOAN' + id + '" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" data-type="money" style="text-align: right;"></td>\
                    <td>' + selectTienteCP + '</td>\
                    <td><input type="text" disabled style="background-color: #EEEEEE; text-align: right;" class="NGUYENTEVAYDUTOAN" id="NGUYENTEVAYDUTOAN' + id + '"></td>\
                    <td><input type="text" disabled style="background-color: #EEEEEE; text-align: right;" class="NGUYENTECAPPHATDUTOAN" id="NGUYENTECAPPHATDUTOAN' + id + '"></td>\
                    <td><input type="text" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" data-type="currency" class="KHOILUONGPHATHANHDUTOAN" style="text-align: right;" id="KHOILUONGPHATHANHDUTOAN' + id + '"></td>\
                    <td><input type="text" class="CHIPHIHUYDONGDUTOAN" id="CHIPHIHUYDONGDUTOAN' + id + '" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" data-type="currency" style="text-align: right;"></td>\
                    <td><input type="hidden" class="STATUS" id="STATUS'+ id + '" value="1"/><button class="btn btn-danger button-clear-dutoan" id="elementdutoan-' + id + '">Xóa</button></td></tr>';
				$('#table-multi-dutoan').append(elemnts)
				$("#KHOILUONGPHATHANHDUTOAN" + id).prop("disabled", true)
				$("#KHOILUONGPHATHANHDUTOAN" + id).css("background-color", '#EEEEEE')
				$("#CHIPHIHUYDONGDUTOAN" + id).prop("disabled", true)
				$("#CHIPHIHUYDONGDUTOAN" + id).css("background-color", '#EEEEEE')
				var coCheTaiChinh = oKeHoachVayHangNam.getCoCheTaiChinh(Number(idKeHoachVayHangNam)).COCHETAICHINH
				if (coCheTaiChinh == "VL") {
					$("#SOTIENVAYDUTOAN" + id).prop("disabled", false)
					$("#SOTIENVAYDUTOAN" + id).css("background-color", '#f9f9f9')
					$("#DONVITIENTEDUTOAN" + id).prop("disabled", false)
					$("#DONVITIENTEDUTOAN" + id).css("background-color", '#f9f9f9')
					$("#SOTIENCAPPHATDUTOAN" + id).prop("disabled", true)
					$("#SOTIENCAPPHATDUTOAN" + id).css("background-color", '#EEEEEE')
					$("#DONVITIENTECPDUTOAN" + id).prop("disabled", true)
					$("#DONVITIENTECPDUTOAN" + id).css("background-color", '#EEEEEE')
				}
				else
					if (coCheTaiChinh == "CP") {
						$("#SOTIENCAPPHATDUTOAN" + id).prop("disabled", false)
						$("#SOTIENCAPPHATDUTOAN" + id).css("background-color", '#f9f9f9')
						$("#DONVITIENTECPDUTOAN" + id).prop("disabled", false)
						$("#DONVITIENTECPDUTOAN" + id).css("background-color", '#f9f9f9')
						$("#SOTIENVAYDUTOAN" + id).prop("disabled", true)
						$("#SOTIENVAYDUTOAN" + id).css("background-color", '#EEEEEE')
						$("#DONVITIENTEDUTOAN" + id).prop("disabled", true)
						$("#DONVITIENTEDUTOAN" + id).css("background-color", '#EEEEEE')
					}
					else {
						$("#SOTIENVAYDUTOAN" + id).prop("disabled", false)
						$("#SOTIENVAYDUTOAN" + id).css("background-color", '#f9f9f9')
						$("#DONVITIENTEDUTOAN" + id).prop("disabled", false)
						$("#DONVITIENTEDUTOAN" + id).css("background-color", '#f9f9f9')
						$("#SOTIENCAPPHATDUTOAN" + id).prop("disabled", false)
						$("#SOTIENCAPPHATDUTOAN" + id).css("background-color", '#f9f9f9')
						$("#DONVITIENTECPDUTOAN" + id).prop("disabled", false)
						$("#DONVITIENTECPDUTOAN" + id).css("background-color", '#f9f9f9')
					}
				id = Number(id + 1);
				// $("#KHOILUONGPHATHANHDUTOAN" + id).prop("disabled", false)
				// $("#KHOILUONGPHATHANHDUTOAN" + id).css("background-color", '#f9f9f9')  mở input
				// $("#KHOILUONGPHATHANHDUTOAN" + id).prop("disabled", true)
				// $("#KHOILUONGPHATHANHDUTOAN" + id).css("background-color", '#EEEEEE') đóng input 
			})

			$('body').on('click', '.button-clear-dutoan', function () {
				var id = $(this).attr('id')
				$('tr#' + id).remove()
			})

			$('body').on('click', '#btnSaveDuToan', function () {
				String.prototype.replaceAll = function (search, replacement) {
					var target = this;
					return target.replace(new RegExp(search, 'g'), replacement);
				};
				var list_tr_NGUONVAY = $('.input-table .NGUONVAYDUTOAN')
				var list_tr_PHUONGANVAY = $('.input-table .PHUONGANVAYDUTOAN')
				var list_tr_SOTIENVAY = $('.input-table .SOTIENVAYDUTOAN')
				var list_tr_SOTIENCAPPHAT = $('.input-table .SOTIENCAPPHATDUTOAN')
				var list_tr_DONVITIENTE = $('.input-table .DONVITIENTEDUTOAN')
				var list_tr_DONVITIENTECP = $('.input-table .DONVITIENTECPDUTOAN')
				var list_tr_KHOILUONGPHATHANH = $('.input-table .KHOILUONGPHATHANHDUTOAN')
				var list_tr_CHIPHIHUYDONG = $('.input-table .CHIPHIHUYDONGDUTOAN')
				var list_tr_NGUYENTEVAY = $('.input-table .NGUYENTEVAYDUTOAN')
				var list_tr_NGUYENTECAPPHAT = $('.input-table .NGUYENTECAPPHATDUTOAN')
				var list_tr_STATUS = $('.input-table .STATUS')
				var r_list_tr_NGUONVAY = []
				var r_list_tr_PHUONGANVAY = []
				var r_list_tr_SOTIENVAY = []
				var r_list_tr_SOTIENCAPPHAT = []
				var r_list_tr_DONVITIENTE = []
				var r_list_tr_DONVITIENTECP = []
				var r_list_tr_KHOILUONGPHATHANH = []
				var r_list_tr_CHIPHIHUYDONG = []
				var r_list_tr_NGUYENTEVAY = []
				var r_list_tr_NGUYENTECAPPHAT = []
				var r_list_tr_STATUS = []
				list_tr_NGUONVAY.map((index, value) => {
					r_list_tr_NGUONVAY.push($(value).val())
				})
				list_tr_PHUONGANVAY.map((index, value) => {
					r_list_tr_PHUONGANVAY.push($(value).val())
				})
				list_tr_SOTIENVAY.map((index, value) => {
					r_list_tr_SOTIENVAY.push($(value).val().replaceAll(',', ''))
				})
				list_tr_SOTIENCAPPHAT.map((index, value) => {
					r_list_tr_SOTIENCAPPHAT.push($(value).val().replaceAll(',', ''))
				})
				list_tr_DONVITIENTE.map((index, value) => {
					r_list_tr_DONVITIENTE.push($(value).val())
				})
				list_tr_DONVITIENTECP.map((index, value) => {
					r_list_tr_DONVITIENTECP.push($(value).val())
				})
				list_tr_KHOILUONGPHATHANH.map((index, value) => {
					r_list_tr_KHOILUONGPHATHANH.push($(value).val().replaceAll(',', ''))
				})
				list_tr_CHIPHIHUYDONG.map((index, value) => {
					r_list_tr_CHIPHIHUYDONG.push($(value).val().replaceAll(',', ''))
				})
				list_tr_NGUYENTEVAY.map((index, value) => {
					r_list_tr_NGUYENTEVAY.push($(value).val().replaceAll(',', ''))
				})
				list_tr_NGUYENTECAPPHAT.map((index, value) => {
					r_list_tr_NGUYENTECAPPHAT.push($(value).val().replaceAll(',', ''))
				})
				list_tr_STATUS.map((index, value) => {
					r_list_tr_STATUS.push($(value).val())
				})
				var querry = '';
				var numberStatus = 0;
				querry = "Insert all ";
				for (var i = 0; i < list_tr_NGUONVAY.length; i++) {
					numberStatus = numberStatus + Number(r_list_tr_STATUS[i])
					querry = querry +
						" Into qln_detail_kehoachvayhangnam(NGUONVAY, STATUS, PHUONGANVAY, SOTIENVAY, SOTIENCAPPHAT, DONVITIENTE, KHOILUONGPHATHANH, CHIPHIHUYDONG, IDKEHOACHVAYHANGNAM,TIENCPID, NGUYENTEVAY, NGUYENTECAPPHAT) VALUES('" +
						r_list_tr_NGUONVAY[i] + "','" +
						r_list_tr_STATUS[i] + "','" +
						r_list_tr_PHUONGANVAY[i] + "', " +
						fnc_nvl(r_list_tr_SOTIENVAY[i], 0) + "," +
						fnc_nvl(r_list_tr_SOTIENCAPPHAT[i], 0) + ",'" +
						r_list_tr_DONVITIENTE[i] + "', '" +
						r_list_tr_KHOILUONGPHATHANH[i] + "' , '" +
						r_list_tr_CHIPHIHUYDONG[i] + "', '" +
						$('#ma').val() + "','" + r_list_tr_DONVITIENTECP[i] + "', '" +
						fnc_nvl(r_list_tr_NGUYENTEVAY[i], 0) + "', '" +
						fnc_nvl(r_list_tr_NGUYENTECAPPHAT[i], 0) + "') ";
				}
				querry = querry + " Select 1 from dual";
				var pDelete = '';
				pDelete = "Delete qln_detail_kehoachvayhangnam where idkehoachvayhangnam ='" + $('#ma').val() + "'"
				var rs = oKeHoachVayHangNam.savedtl(pDelete, querry);
				if (rs.CODE == 0) {
					if (numberStatus == 0) {
						oKeHoachVayHangNam.updateSoTien($("#ma").val(), Number(fnc_replace($("#sotienvay").val(), ',', '')), Number(fnc_replace($("#sotiencapphat").val(), ',', '')))
						oKeHoachVayHangNam.updateApproved(Number(idKeHoachVayHangNam), 3)
					}
					else {
						oKeHoachVayHangNam.updateApproved(Number(idKeHoachVayHangNam), 4)
					}
					that.bindGrid01();
					var oAlert = new AlertDialog('Thông báo');
					oAlert.show('Thay đổi dự toán thành công', '40%', '50px');
					$('#modalPheDuyetDuToan').modal('hide')
				}
				else {
					var oAlert = new AlertDialog1('Thông báo');
					oAlert.show('Có lỗi xảy ra, vui lòng nhập lại', '40%', '50px');
				}
			})

			$('#Grid01 tbody').on('click', 'tr', function () {
				if ($(this).hasClass('selected')) {
					$(this).removeClass('selected');
					oKeHoachVayHangNam.KEHOACHVAYHANGNAMID = 0;
					that.filterAction('NEW');
				}
				else {
					that.oTable.$('tr.selected').removeClass('selected');
					$(this).addClass('selected');
					idKeHoachVayHangNam = $(this).find('.rowID').val();
					oKeHoachVayHangNam.KEHOACHVAYHANGNAMID = idKeHoachVayHangNam;
					that.filterAction('SELECT');
					var approve = oKeHoachVayHangNam.getApprove(Number(idKeHoachVayHangNam))
					if (Number(approve[0].STATUS_APPROVE) == 3) {
						that.filterAction('APPROVE');
					}
					else
						if (Number(approve[0].STATUS_APPROVE) == 2) {
							that.filterAction('WAITING');
						}
						else
							if (Number(approve[0].STATUS_APPROVE) == 4) {
								that.filterAction('APPROVED')
							}
							else {
								that.filterAction('NOPE');
							}
				}
			})

			$('#btnConfirmReject').click(function (e) {
			})
		});
	})
}