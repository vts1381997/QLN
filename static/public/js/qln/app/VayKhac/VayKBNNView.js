var vNgayVayNoGanDay;
var vTinhThanhGanDay;
var vNamVayOld = '-1';
var VayKBNNView = function (isOtherView) {
	var idVayKBNN = 0;
	var that = this;
	this.AppTitle = 'Vay kho bạc nhà nước';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oVayKBNN = new VayKBNN();
	$(".DONVIID").html(fnc_danhsachdonvi())

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
	this.filterAction = function (sState) {
		switch (sState) {
			case 'NEW':
				ControlHelper.Input.disable(['#btnEdit', '#btnSave', '#btnDelete', '#btnCancel', '#btnTroNo']);
				ControlHelper.Input.enable(['#btnAddNew']);
				break;
			case 'SELECT':
				ControlHelper.Input.enable(['#btnEdit', '#btnCancel', '#btnDelete', '#btnTroNo']);
				break;
			case 'EDIT':
				ControlHelper.Input.disable(['#btnEdit']);
				ControlHelper.Input.enable(['#btnSave', '#btnCancel', '#btnDelete']);
			case 'PAY':
				ControlHelper.Input.disable(['#btnTroNo']);
				ControlHelper.Input.enable(['#btnSave', '#btnCancel', '#btnDelete', '#btnEdit']);
				break;
			default:
				break;
		}
	}

	this.bindGrid01 = function () {
		oVayKBNN.getAll();
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < oVayKBNN.LIST.length; i++) {
			var _item = oVayKBNN.LIST[i];
			_item.tranogoc = formatMoney(_item.TRANOGOC)
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.VAYKHOBACNHANUOCID + '" />';
			var trangthai = _item.CANHBAO
			var vTrangThaiClass = "";
			var vStyle = "";
			var number = trangthai.match(/\d/g);
			if (number) {
				number = number.join("");
			}
			var resGoclai = oVayKBNN.getGocLai(_item.VAYKHOBACNHANUOCID)
			var vTrangThai = '';
			if (Number(resGoclai.length) > 0) {
				var sumTraGoc = 0;
				resGoclai.map(value => {
					sumTraGoc = Number(sumTraGoc + value.TRAGOC)
				})
				if (Number(sumTraGoc) === Number(_item.TRANOGOC)) {
					vTrangThai = vTrangThai + '<span style="font-size: 11px;" class="label label-success">Đã trả nợ đủ</span>';
				}
				else {
					vTrangThai = vTrangThai + '<span style="font-size: 11px;" class="label label-success">Đã trả nợ</span>';
				}
			}
			else {
				if (Number(number) == 0) {
					vTrangThai = vTrangThai + '<span style="color: black; font-size: 11px; color: red" class="label label-con">Đến ngày trả nợ</span>';
				}
				else {
					vTrangThai = vTrangThai + '<span @style class="@trangthaiclass">' + trangthai + '</span>';
				}
				var vTrangThaiClass = "";
				var vStyle = "";
				if (trangthai.includes('Quá hạn trả nợ')) {
					vTrangThaiClass = 'label label-danger'; //Đỏ
					vStyle = 'style="font-size: 11px;"'
				}
				if (trangthai.includes('Đã trả')) {
					vTrangThaiClass = 'label label-success'; //Xanh		
					vStyle = 'style="font-size: 11px;"'
				}
				// if (trangthai.includes('Sắp tới')) {
				// 	vTrangThaiClass = 'label label-saptoi'; //vang
				// 	vStyle = 'style="color: green; font-size: 11px; background-color:yellow;"'
				// }
				if (trangthai.includes('để trả nợ')) {
					var number = trangthai.match(/\d/g);
					if (number) {
						number = number.join("");
					}
					if (Number(number) > 15) {
						vTrangThaiClass = 'label label-con'; //den
						vStyle = 'style="color: black; font-size: 11px;"'
					}
					else {
						vTrangThaiClass = 'label label-saptoi'; //vang
						vStyle = 'style="color: green; font-size: 11px; background-color:yellow;"'
					}
				}
				vTrangThai = vTrangThai.replace('@trangthaiclass', vTrangThaiClass);
				vTrangThai = vTrangThai.replace('@style', vStyle);
			}
			_item.canhbao = vTrangThai;
			var download = ''
			if (_item.URL) {
				download = '<button  val="' + _item.URL + '" class= "btn btn-primary btnTaixuong" >Tải xuống</button>'
			}
			else {
				download = ''
			}
			aRows.push([
				(i + 1) + _hidden,
				_item.TENDONVI,
				_item.MUCDICHVAY,
				_item.NGAYVAY,
				_item.THOIHANVAYDATE,
				formatMoney(_item.TRANOGOC),
				formatMoney(_item.BUDAPBOICHI),
				formatMoney(_item.TONGVAY),
				_item.LAIPHI,
				formatMoney(_item.TONGTRAGOC),
				formatMoney(_item.TONGTRALAI),
				formatMoney(_item.TONGTRA),
				_item.canhbao,
				download
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
		var oHopDong = new HopDongVayLai()
		oHopDong.getAll();
		var resultHopDong = oHopDong.LIST
		var optionHopDong = '';
		resultHopDong.map((value, index) => {

			optionHopDong = optionHopDong + "<option data-duan='(Dự án: " + value.MADUAN + " - " + value.TENDUAN + ")' ngayhieuluc='" + value.NGAYHIEULUC + "' ngayhopdong='" + value.NGAYTRANOGOCCUOICUNG + "' value='" + value.MA + "'>" + value.TEN + "</option>"
		})
		$("#MAHOPDONG").html(optionHopDong)
		let txtDuAn = $("#MAHOPDONG option:selected").attr('data-duan')
		$("#txtThongTinDuAnHopDong").text(txtDuAn);
		if (fnc_danhsachdonvi()) {
			$("#DONVIID").html(fnc_danhsachdonvi())
		}
		$('body').on('change', '#MAHOPDONG', function () {
			let txtDuAn = $("#MAHOPDONG option:selected").attr('data-duan')
			$("#txtThongTinDuAnHopDong").text(txtDuAn);
			var data = {
				i_ngayvay: $("#NGAYVAY").val(),
				i_mahopdong: $("#MAHOPDONG").val(),
				i_type: 'KBNN',
				i_donvi: $("#DONVIID").val(),
			}
			var data = oVayKBNN.getDauKyLuyKe(data)
			$("#DUNODAUKY").val(formatMoney(data[0].DUNODAUKY))
			$("#LUYKETRANOGOC").val(formatMoney(data[0].LUYKEVAYTRONGNAM))
		})
		$('body').on('change', '#THOIHANVAY', function () {
			vNgayVayNoGanDay = $("#NGAYVAY").val().replace('/', '-').replace('/', '-');
			fnc_ThayDoiNgayTraNo();
		})

		$('body').on('change', '#DONVIID', function (e) {
			e.preventDefault();
			fnc_getluykeduno();
			$("#MAHOPDONG").trigger('change')
		})

		$('#NGAYVAY').on('blur', function () {
			$("#THOIHANVAY").trigger('change')
			var vNamVayMoi = $('#NGAYVAY').val().split('/')[2];
			if (vNamVayMoi != vNamVayOld) {
				$("#MAHOPDONG").trigger('change')
				fnc_getluykeduno();
			}
			vNamVayOld = vNamVayMoi;
		})

		$("#THOIHANVAY").trigger('change')
		$("#NGAYVAY").trigger('onchange')
		if (idVayKBNN > 0) {
			oVayKBNN.getById(idVayKBNN);
			$('#NGAYVAY').val(oVayKBNN.NGAYVAY);
			$('#DONVIID').val(oVayKBNN.DONVIID).trigger('change');
			$('#MAHOPDONG').val(oVayKBNN.MAHOPDONG).trigger('change');
			$('#NGAYHOPDONG').val(oVayKBNN.NGAYHOPDONG);
			$('#THOIHANVAY').val(oVayKBNN.THOIHANVAY);

			$('#THOIHANVAYDATE').val(oVayKBNN.THOIHANVAYDATE);
			$('#LAIPHI').val(oVayKBNN.LAIPHI);
			$('#TRANOGOC').val(formatMoney(oVayKBNN.TRANOGOC));
			$('#NOGOC').val(formatMoney(oVayKBNN.NOGOC));
			$('#BUDAPBOICHI').val(formatMoney(oVayKBNN.BUDAPBOICHI));
			$('#BOICHI').val(formatMoney(oVayKBNN.BOICHI));
			$('#DUNODAUKY').val(formatMoney(oVayKBNN.DUNODAUKY));
			$('#LUYKETRANOGOC').val(formatMoney(oVayKBNN.LUYKETRANOGOC));
			$('#STATUS').val(oVayKBNN.STATUS);
			$('#CREATEDDATE').val(oVayKBNN.CREATEDDATE);
			$('#CREATEDBY').val(oVayKBNN.CREATEDBY);
			$('#UPDATEDDATE').val(oVayKBNN.UPDATEDDATE);
			$('#UPDATEDBY').val(oVayKBNN.UPDATEDBY);
		}
	}


	function fnc_getluykeduno() {
		// Lấy dữ liệu khi Ngay vay thay đổi hoặc tỉnh thành thay đổi
		// var reloadData = false;
		// if (vTinhThanhGanDay != $('#DONVIID').val()) {
		// 	vTinhThanhGanDay = $('#DONVIID').val();
		// 	reloadData = true;
		// }

		// if (vNgayVayNoGanDay != $("#NGAYVAY").val()) {
		// 	if (vNgayVayNoGanDay.substr(6) != $("#NGAYVAY").val().substr(6)) {
		// 		reloadData = true;
		// 	}
		// 	vNgayVayNoGanDay = $("#NGAYVAY").val();
		// 	fnc_ThayDoiNgayTraNo();
		// }

		// if (reloadData) {
		// 	//Gọi API lấy dữ liệu
		// 	oVayKBNN.getDuNoLuyKe(vNgayVayNoGanDay, vTinhThanhGanDay);

		// 	//Reset lại dữ liệu dư nợ đầu kỳ và lũy kế
		// 	$('#DUNODAUKY').val(formatMoney(oVayKBNN.LIST[0].DUNODAUKY));
		// 	$('#LUYKETRANOGOC').val(formatMoney(oVayKBNN.LIST[0].LUYKETRANOGOC));
		// }
	}

	function fnc_ThayDoiNgayTraNo() {
		var month = $("#THOIHANVAY").val();
		if (month > 0) {
			var vngayvay = vNgayVayNoGanDay.replace('/', '-').replace('/', '-');
			var vngaytra = new Date(vngayvay.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
			vngaytra.setMonth(vngaytra.getMonth() + parseInt(month));
			var date_e = ((vngaytra.getDate() > 9) ? vngaytra.getDate() : ('0' + vngaytra.getDate())) + '/' + ((vngaytra.getMonth() > 8) ? (vngaytra.getMonth() + 1) : ('0' + (vngaytra.getMonth() + 1))) + '/' + vngaytra.getFullYear();
			$('#THOIHANVAYDATE').val(date_e)
			$("#THOIHANVAYDATE").prop('disabled', true);
			$("#btnTHOIHANVAYDATE").prop('disabled', true);
		}
		else {
			$("#THOIHANVAYDATE").prop('disabled', false);
			$("#btnTHOIHANVAYDATE").prop('disabled', false);
		}
	}

	that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
	that.dttablemulti = ControlHelper.Datatable.Init('table-multi', 25, true)
	that.oDialog = new PopupDialog(reload);
	that.init();

	function reload() {
		that.filterAction('NEW');
		that.bindGrid01();
	}
	$('.ACTIONS').on('click', '#btnAddNew', function (e) {
		e.preventDefault()
		$("#exampleModalLongTitle").text('Thêm mới đợt vay ngân quỹ nhà nước')
		$("#NGAYVAY").val($.datepicker.formatDate('dd/mm/yy', new Date()))
		$("#NGAYHOPDONG").val($.datepicker.formatDate('dd/mm/yy', new Date()))
		$('#VAYTRONGKY').val('');
		$('#DUNODAUKY').val('');
		$('#STATUS').val('');
		$('#CREATEDDATE').val('');
		$('#CREATEDBY').val('');
		$('#UPDATEDDATE').val('');
		$('#UPDATEDBY').val(1);
		$('#exampleModalCenter #TRANOGOC').val('');
		$('#exampleModalCenter #BUDAPBOICHI').val('');
		idVayKBNN = 0;
		that.bindModal();
		$("#DONVIID").trigger('change')
		$("#MAHOPDONG").trigger('change')
		$("#MAHOPDONG").prop("disabled", false)
	});
	$('.ACTIONS').on('click', '#btnEdit', function () {
		that.bindModal();
		$("#exampleModalLongTitle").text('Sửa đợt vay ngân quỹ nhà nước')
		$("#MAHOPDONG").prop("disabled", true)
	});
	$('.ACTIONS').on('click', '#btnDelete', function (e) {
		e.preventDefault()
		if (!oVayKBNN.VAYKHOBACNHANUOCID) {
			var oAlert = new AlertDialog('Cảnh báo');
			oAlert.show('Chưa chọn để xóa', '40%', '50px');
			return false;
		}
		function ok() {
			var rs = oVayKBNN.del(oVayKBNN.VAYKHOBACNHANUOCID);
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(rs.MESSAGE, '40%', '50px');
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
		oVayKBNN.VAYKHOBACNHANUOCID = Number(idVayKBNN);
		oVayKBNN.NGAYVAY = $('#NGAYVAY').val();
		oVayKBNN.DONVIID = $('#DONVIID').val();
		oVayKBNN.THOIHANVAY = Number($('#THOIHANVAY').val());
		oVayKBNN.LAIPHI = Number($('#LAIPHI').val());
		oVayKBNN.TRANOGOC = Number($('#TRANOGOC').val().replaceAll(',', ''));
		oVayKBNN.BUDAPBOICHI = Number($('#BUDAPBOICHI').val().replaceAll(',', ''));
		oVayKBNN.THOIHANVAYDATE = $('#THOIHANVAYDATE').val();
		oVayKBNN.MAHOPDONG = $('#MAHOPDONG').val();
		var hsd = $("#MAHOPDONG option:selected").attr('ngayhopdong')
		var ngayhl = $("#MAHOPDONG option:selected").attr('ngayhieuluc')
		var ngayvay = Number(oVayKBNN.NGAYVAY.split('/')[2] + oVayKBNN.NGAYVAY.split('/')[1] + oVayKBNN.NGAYVAY.split('/')[0])
		if (ngayvay <= Number(hsd.split('/')[2] + hsd.split('/')[1] + hsd.split('/')[0]) && ngayvay >= Number(ngayhl.split('/')[2] + ngayhl.split('/')[1] + ngayhl.split('/')[0])) {
			oVayKBNN.UUID = uuidv4();
			var rs = oVayKBNN.save();
			if (rs.CODE = 3 && rs.MESSAGE == '-1') {
				var oAlert = new AlertDialog1('Thông báo');
				oAlert.show('Mã này đã tồn tại', '40%', '50px');
				that.bindGrid01();
			}
			else {
				$("#idrowtable").val(rs.RESULT)
				$("#tablename").val(CurrentLayout)
				var rs1 = DATA.ajaxPostForm(CONFIG_API.URL.SEVER + 'upload', 'uploadForm')
				if (!rs1.success) {
					oVayKBNN.deluid(rs.RESULT)
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
		} else {
			var oAlert = new AlertDialog1('Thông báo');
			oAlert.show('Ngày vay phải lớn hơn ngày ký hợp đồng!', '40%', '50px');
			return
		}
	})
	$('#Grid01 tbody').on('click', 'tr', function () {
		if ($(this).hasClass('selected')) {
			$(this).removeClass('selected');
			oVayKBNN.VAYKHOBACNHANUOCID = 0;
			that.filterAction('NEW');
		}
		else {
			that.oTable.$('tr.selected').removeClass('selected');
			$(this).addClass('selected');
			idVayKBNN = $(this).find('.rowID').val();
			oVayKBNN.VAYKHOBACNHANUOCID = idVayKBNN;
			that.filterAction('SELECT');
		}
	});
	$('body').on('click', '.btnTaixuong', function () {
		var url = CONFIG_API.URL.SEVER + $(this).attr('val')
		window.open(url)
	})
	$('.ACTIONS').on('click', '#btnTroNo', function () {
		$('#modalTraNo #GHICHU').val('')
		if (!oVayKBNN.VAYKHOBACNHANUOCID) {
			var oAlert = new AlertDialog('Cảnh báo');
			oAlert.show('Chưa chọn để trả nợ', '40%', '50px');
			return false;
		}
		$('#modalTraNo').modal('toggle')
		var res = oVayKBNN.getById(idVayKBNN)
		$('#modalTraNo #DONVIID').val(res[0].DONVIID).select2()
		$('#modalTraNo #NGAYVAY').val(res[0].NGAYVAY)
		$('#modalTraNo #TONGSOTIENVAY').val(formatMoney(Number(res[0].TRANOGOC) + Number(res[0].BUDAPBOICHI)), ',')
		$('#modalTraNo #THOIHANVAYDATE').val(res[0].THOIHANVAYDATE)
		$('#modalTraNo #LAIPHI').val(res[0].LAIPHI)
		var month = Number(res[0].THOIHANVAYDATE.split('/')[2] - res[0].NGAYVAY.split('/')[2]) * 12 + Number(res[0].THOIHANVAYDATE.split('/')[1] - res[0].NGAYVAY.split('/')[1])
		if (Number(res[0].THOIHANVAY) > 0) {
			$('#modalTraNo #THOIHANVAY').val(res[0].THOIHANVAY)
		}
		else {
			$('#modalTraNo #THOIHANVAY').val(month)
		}
		that.dttablemulti.clear().draw()
		var resGoclai = oVayKBNN.getGocLai(idVayKBNN)
		if (resGoclai.length > 0) {
			var ngaytragannhat;
			var itemtragannhat;

			var arows = []
			var sotiengocdatra = 0;
			resGoclai.map(function (item, index) {
				arows.push([
					index + 1,
					formatMoney(item.TRAGOC),
					formatMoney(item.TRALAI),
					item.NGAYTRA,
					item.GHICHU
				])

				sotiengocdatra = sotiengocdatra + Number(item.TRAGOC)
				if (item.NGAYTRA == item.ngaytragannhat) {

					that.itemtragannhat = itemtragannhat
				}
				that.ngaytragannhat = item.NGAYTRAGANNHAT

			})
			that.dttablemulti.rows.add(arows).draw()
			var ngaytragannhatarr = that.ngaytragannhat.split('/');
			var ngaytra = new Date(Number($('#NGAYTRA').val().split('/')[0]), Number($('#NGAYTRA').val().split('/')[1]), Number($('#NGAYTRA').val().split('/')[2]));
			var months = parseInt(new Date((new Date(Number(ngaytragannhatarr[2]), Number(ngaytragannhatarr[1]), Number(ngaytragannhatarr[0]))).getTime() - (new Date(Number(ngaytra[2]), Number(ngaytra[1]), Number(ngaytra[0]))).getTime()).getMonth())
			var sotiengocphaitra = Number(res[0].BUDAPBOICHI) + Number(res[0].TRANOGOC)
			var sotiengocconlai = sotiengocphaitra - sotiengocdatra;
			$('#modalTraNo #TRAGOC').val(formatMoney(sotiengocconlai))
			$('#modalTraNo #TONGDUNOCONLAI').val(formatMoney(sotiengocconlai))
			$('#modalTraNo #TRALAI').val(formatMoney((sotiengocconlai) * (parseFloat(res[0].LAIPHI)) / 100 * months))

		} else {
			that.ngaytragannhat = res[0].NGAYVAY
			that.itemtragannhat = undefined
			var ngay = res[0].NGAYVAY.split('/')
			var ngayvay = new Date(Number(ngay[2]), Number(ngay[1]), Number(ngay[0]))
			var arr_ngaytra = ($.datepicker.formatDate('dd/mm/yy', new Date())).split('/')
			var ngaytra = new Date(Number(arr_ngaytra[2]), Number(arr_ngaytra[1]), Number(arr_ngaytra[0]));
			var months = parseInt((new Date(((ngaytra.getTime() - ngayvay.getTime())))).getMonth());
			$('#modalTraNo #TRAGOC').val(formatMoney(Number(res[0].BUDAPBOICHI) + Number(res[0].TRANOGOC)))
			$('#modalTraNo #TONGDUNOCONLAI').val(formatMoney(Number(res[0].BUDAPBOICHI) + Number(res[0].TRANOGOC)))
			$('#modalTraNo #TRALAI').val(formatMoney((Number(res[0].BUDAPBOICHI) + Number(res[0].TRANOGOC)) * (parseFloat(res[0].LAIPHI)) / 100 * months))
		}
		$('#modalTraNo #NGAYTRA').val(res[0].THOIHANVAYDATE).trigger('blur')
	});

	$('#modalTraNo #TRAGOC').keyup(function () {
		var tragoc = Number($(this).val().replace(/,/g, ''))
		var laiphi = parseFloat($('#modalTraNo #LAIPHI').val())
		var ngayvayarr = $('#modalTraNo #NGAYVAY').val().split('/')
		var ngaytraarr = $('#modalTraNo #NGAYTRA').val().split('/')
		var ngayvay = new Date(Number(ngayvayarr[2]), Number(ngayvayarr[1]), Number(ngayvayarr[0]))
		var ngaytra = new Date(Number(ngaytraarr[2]), Number(ngaytraarr[1]), Number(ngaytraarr[0]))
		var ngaytragannhat = that.ngaytragannhat.split('/');
		if (that.itemtragannhat === undefined) {
			var months = Number(ngaytra.getFullYear() - ngayvay.getFullYear()) * 12 + Number(ngaytra.getMonth() - ngayvay.getMonth())
			$('#modalTraNo #TRALAI').val(formatMoney((tragoc) * laiphi / 100 * months))
		} else {
			ngaytra = new Date(Number(ngaytragannhat[2]), Number(ngaytragannhat[1]), Number(ngaytragannhat[0]))
			var months = Number(ngaytra.getFullYear() - ngayvay.getFullYear()) * 12 + Number(ngaytra.getMonth() - ngayvay.getMonth())
			$('#modalTraNo #TRALAI').val(formatMoney((tragoc) * laiphi / 100 * months))
		}
	})

	$('#modalTraNo #NGAYTRA').on('blur', function () {
		var tragoc = Number($('#modalTraNo #TRAGOC').val().replace(/,/g, ''))
		var laiphi = parseFloat($('#modalTraNo #LAIPHI').val())
		var ngayvayarr = $('#modalTraNo #NGAYVAY').val().split('/')
		var ngaytraarr = $(this).val().split('/')
		var ngayvay = new Date(Number(ngayvayarr[2]), Number(ngayvayarr[1]), Number(ngayvayarr[0]))
		var ngaytra = new Date(Number(ngaytraarr[2]), Number(ngaytraarr[1]), Number(ngaytraarr[0]))
		var ngaytragannhat = that.ngaytragannhat.split('/');
		if (that.itemtragannhat === undefined) {
			var months = Number(ngaytra.getFullYear() - ngayvay.getFullYear()) * 12 + Number(ngaytra.getMonth() - ngayvay.getMonth())
			$('#modalTraNo #TRALAI').val(formatMoney((tragoc) * laiphi / 100 * months))
		} else {
			ngaytra = new Date(Number(ngaytragannhat[2]), Number(ngaytragannhat[1]), Number(ngaytragannhat[0]))
			var months = Number(ngaytra.getFullYear() - ngayvay.getFullYear()) * 12 + Number(ngaytra.getMonth() - ngayvay.getMonth())
			$('#modalTraNo #TRALAI').val(formatMoney((tragoc) * laiphi / 100 * months))
		}
	})

	$('#modalTraNo .btnSaveTraNo').click(function (e) {
		e.preventDefault()
		var datapost = {}
		datapost.i_vaykhobacnhanuocid = Number(idVayKBNN)
		datapost.i_ngaytra = $('#modalTraNo #NGAYTRA').val()
		datapost.i_tragoc = Number($('#modalTraNo #TRAGOC').val().replace(/,/g, ''))
		datapost.i_tralai = Number($('#modalTraNo #TRALAI').val().replace(/,/g, ''))
		datapost.i_ghichu = $('#modalTraNo #GHICHU').val()
		datapost.i_thoihanvay = Number($('#modalTraNo #THOIHANVAY').val())
		if ((datapost.i_tragoc > 0) && Number($('#modalTraNo #TONGDUNOCONLAI').val().replace(/,/g, '')) > 0 && datapost.i_tralai > 0) {
			if (datapost.i_tragoc <= Number($('#modalTraNo #TONGDUNOCONLAI').val().replace(/,/g, ''))) {
				var res = oVayKBNN.GocLaiSave(datapost)
				$('#modalTraNo').modal('hide')
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show('Trả nợ thành công', '40%', '50px');
			} else {
				var alertcb = new AlertDialog('Cảnh báo')
				alertcb.show('Số tiền trả không được lớn hơn tổng số tiền dư nợ còn lại!', '40%', '50px')
				return;
			}
		} else {
			var alertcb = new AlertDialog('Cảnh báo')
			alertcb.show('Chưa có thông tin trả nợ trả lãi hoặc đã hoàn thành đợt trả nợ!', '40%', '50px')
			return;
		}
		var resGoclai = oVayKBNN.getGocLai(idVayKBNN)
		var arows = []
		that.dttablemulti.clear().draw()
		resGoclai.map(function (item, index) {
			arows.push([
				index + 1,
				formatMoney(item.TRAGOC),
				formatMoney(item.TRALAI),
				item.NGAYTRA,
				item.GHICHU
			])
		})
		that.dttablemulti.rows.add(arows).draw()
		that.bindGrid01()
	})

}