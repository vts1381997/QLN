var vNgayVayNoGanDay;
var vTinhThanhGanDay;
var VayQuyDuTruTinhView = function () {
	var idVayQuyDuTruTinh = 0;
	var that = this;
	this.AppTitle = 'Vay dự trữ tỉnh';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oVayQuyDuTruTinh = new VayQuyDuTruTinh();
	$(".DONVIID").html(fnc_danhsachdonvi())
	var oHopDong = new HopDongVayLai()
	oHopDong.getAll();
	var resultHopDong = oHopDong.LIST
	var optionHopDong = '';
	resultHopDong.map((value, index) => {
		if (value.MADUAN) {
			optionHopDong = optionHopDong + "<option data-duan='(Dự án: " + value.MADUAN + " - " + value.TENDUAN + ")' ngayhieuluc='" + value.NGAYHIEULUC + "' ngayhopdong='" + value.NGAYTRANOGOCCUOICUNG + "' value='" + value.MA + "'>" + value.TEN + "</option>"
		}
		else {
			return;
		}
	})
	$("#MAHOPDONG").html(optionHopDong)
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
				break;
			default:
				break;
		}
	}

	this.bindGrid01 = function () {
		oVayQuyDuTruTinh.getAll();
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < oVayQuyDuTruTinh.LIST.length; i++) {
			var _item = oVayQuyDuTruTinh.LIST[i];
			var trangthai = _item.CANHBAO
			var vTrangThaiClass = "";
			var vStyle = "";
			var number = trangthai.match(/\d/g);
			if (number) {
				number = number.join("");
			}
			var resGoclai = oVayQuyDuTruTinh.getGocLai(_item.VAYQUYDUTRUTINHID)
			var vTrangThai = '';
			if (Number(resGoclai.length) > 0) {
				var sumTraGoc = 0;
				resGoclai.map(value => {
					sumTraGoc = Number(sumTraGoc + value.TRAGOC)
				})
				if (Number(sumTraGoc) === Number(_item.SOTIENVAY)) {
					vTrangThai = vTrangThai + '<span style="font-size: 11px;" class="label label-success">Đã trả nợ đủ</span>';
				}
				else {
					vTrangThai = vTrangThai + '<span style="font-size: 11px;" class="label label-success">Đã trả nợ</span>';
				}
			}
			else {
				if (Number(number) == 0) {
					vTrangThai = vTrangThai + '<span style="color: black; font-size: 11px; color: red;" class="label label-con">Đến ngày trả nợ</span>';
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
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.VAYQUYDUTRUTINHID + '" />';
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
				_item.NGAYVAY,
				_item.THOIHANVAYDATE,
				formatMoney(_item.HANMUCVAY),
				formatMoney(_item.SOTIENVAY),
				formatMoney(_item.SOTIENTRA),
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
		let txtDuAn = $("#MAHOPDONG option:selected").attr('data-duan')
		$("#txtThongTinDuAnHopDong").text(txtDuAn);
		if (fnc_danhsachdonvi()) {
			$("#DONVIID").html(fnc_danhsachdonvi())
		}
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
			fnc_getluykeduno();
			$("#MAHOPDONG").trigger('change')
			$("#THOIHANVAY").trigger('change')
		})

		$("#THOIHANVAY").trigger('change')
		$("#NGAYVAY").trigger('onchange')
		if (idVayQuyDuTruTinh > 0) {
			oVayQuyDuTruTinh.getById(Number(idVayQuyDuTruTinh));
			$('#MAHOPDONG').val(oVayQuyDuTruTinh.MAHOPDONG).select2();
			$('#DONVIID').val(oVayQuyDuTruTinh.DONVIID);
			$('#NGAYVAY').val(oVayQuyDuTruTinh.NGAYVAY);
			$('#THOIHANVAY').val(oVayQuyDuTruTinh.THOIHANVAY).select2();
			$('#THOIHANVAYDATE').val(oVayQuyDuTruTinh.THOIHANVAYDATE);
			$('#HANMUCVAY').val(formatMoney(oVayQuyDuTruTinh.HANMUCVAY));
			$('#SOTIENVAY').val(formatMoney(oVayQuyDuTruTinh.SOTIENVAY))
			$('#LUYKEVAYTRONGNAM').val(formatMoney(oVayQuyDuTruTinh.LUYKEVAYTRONGNAM));
			$('#DUNODAUKY').val(formatMoney(oVayQuyDuTruTinh.DUNODAUKY));
			$('#STATUS').val(oVayQuyDuTruTinh.STATUS);
			$('#CREATEDDATE').val(oVayQuyDuTruTinh.CREATEDDATE);
			$('#CREATEDBY').val(oVayQuyDuTruTinh.CREATEDBY);
			$('#UPDATEDDATE').val(oVayQuyDuTruTinh.UPDATEDDATE);
			$('#UPDATEDBY').val(oVayQuyDuTruTinh.UPDATEDBY);
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
		// 	oVayQuyDuTruTinh.getHanMuc(vNgayVayNoGanDay, vTinhThanhGanDay);

		// 	// //Reset lại dữ liệu dư nợ đầu kỳ và lũy kế

		// 	$('#HANMUCVAY').val(formatMoney(oVayQuyDuTruTinh.LIST[0].HANMUC));
		// 	$('#DUNODAUKY').val(formatMoney(oVayQuyDuTruTinh.LIST[0].DUNODAUKY));
		// 	$('#LUYKEVAYTRONGNAM').val(formatMoney(oVayQuyDuTruTinh.LIST[0].LUYKEVAYTRONGNAM));
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
	$(function () {
		$(document).ready(function () {

			that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
			that.dttablemulti = ControlHelper.Datatable.Init('table-multi', 25, true)
			that.oDialog = new PopupDialog(reload);
			that.init();

			function reload() {
				that.filterAction('NEW');
				that.bindGrid01();
			}
			$('body').on('change', '#MAHOPDONG', function () {
				let txtDuAn = $("#MAHOPDONG option:selected").attr('data-duan')
				$("#txtThongTinDuAnHopDong").text(txtDuAn);
				var data = {
					i_ngayvay: $("#NGAYVAY").val(),
					i_mahopdong: $("#MAHOPDONG").val(),
					i_type: 'QDTT',
					i_donvi: $("#DONVIID").val(),
				}
				var data = oVayQuyDuTruTinh.getDauKyLuyKe(data)
				$("#DUNODAUKY").val(formatMoney(data[0].DUNODAUKY))
				$("#LUYKEVAYTRONGNAM").val(formatMoney(data[0].LUYKEVAYTRONGNAM))
			})
			$('.ACTIONS').on('click', '#btnAddNew', function (e) {
				e.preventDefault()
				$("#exampleModalLongTitle").text('Thêm mới đợt vay quỹ dự trữ tỉnh')
				$("#NGAYVAY").val($.datepicker.formatDate('dd/mm/yy', new Date()))
				$("#HANMUCVAY").val('')
				$("#SOTIENVAY").val('')
				$("#THOIHANVAY").val(3)
				idVayQuyDuTruTinh = 0;
				that.bindModal();
				$("#MAHOPDONG").trigger('change')
				$("#MAHOPDONG").prop("disabled", false)
			});
			$('.ACTIONS').on('click', '#btnEdit', function () {
				that.bindModal();
				$("#exampleModalLongTitle").text('Sửa đợt vay quỹ dự trữ tỉnh')
				$("#MAHOPDONG").trigger('change')
				$("#MAHOPDONG").prop("disabled", true)
			});
			$('.ACTIONS').on('click', '#btnDelete', function (e) {
				e.preventDefault()
				if (!oVayQuyDuTruTinh.VAYQUYDUTRUTINHID) {
					var oAlert = new AlertDialog('Cảnh báo');
					oAlert.show('Chưa chọn để xóa', '40%', '50px');
					return false;
				}
				function ok() {
					var rs = oVayQuyDuTruTinh.del(oVayQuyDuTruTinh.VAYQUYDUTRUTINHID);
					var oAlert = new AlertDialog('Thông báo');
					oAlert.show(rs.MESSAGE, '40%', '50px');
					that.bindGrid01();
					reload();
				}
				function cancel() { }

				var oConfirmDialog = new ConfirmDialog('Xác nhận xóa', ok, cancel);
				oConfirmDialog.show('Bạn có chắc chắn muốn xóa bản ghi này không?', '40%', '50px');
			});
			$('body').on('click', '.btnTaixuong', function () {
				var url = CONFIG_API.URL.SEVER + $(this).attr('val')
				window.open(url)
			})
			$(".btnSave").on('click', function (e) {
				if (isDoubleClicked($(this))) return;
				e.preventDefault()
				String.prototype.replaceAll = function (search, replacement) {
					var target = this;
					return target.replace(new RegExp(search, 'g'), replacement);
				};
				oVayQuyDuTruTinh.VAYQUYDUTRUTINHID = Number(idVayQuyDuTruTinh);
				oVayQuyDuTruTinh.NGAYVAY = $('#NGAYVAY').val();
				oVayQuyDuTruTinh.THOIHANVAY = $('#THOIHANVAY').val();
				oVayQuyDuTruTinh.THOIHANVAYDATE = $('#THOIHANVAYDATE').val();
				oVayQuyDuTruTinh.HANMUCVAY = 0;
				oVayQuyDuTruTinh.SOTIENVAY = Number($('#SOTIENVAY').val().replaceAll(',', ''));
				oVayQuyDuTruTinh.DONVIID = $('#DONVIID').val();
				oVayQuyDuTruTinh.MAHOPDONG = $('#MAHOPDONG').val();
				var hsd = $("#MAHOPDONG option:selected").attr('ngayhopdong')
				var ngayhl = $("#MAHOPDONG option:selected").attr('ngayhieuluc')
				var ngayvay = Number(oVayQuyDuTruTinh.NGAYVAY.split('/')[2] + oVayQuyDuTruTinh.NGAYVAY.split('/')[1] + oVayQuyDuTruTinh.NGAYVAY.split('/')[0])
				if (ngayvay <= Number(hsd.split('/')[2] + hsd.split('/')[1] + hsd.split('/')[0]) && ngayvay >= Number(ngayhl.split('/')[2] + ngayhl.split('/')[1] + ngayhl.split('/')[0])) {
					oVayQuyDuTruTinh.UUID = uuidv4();
					var rs = oVayQuyDuTruTinh.save();
					if (rs.CODE = 3 && rs.MESSAGE == '-1') {
						var oAlert = new AlertDialog1('Thông báo');
						oAlert.show('Mã này đã tồn tại', '40%', '50px');
						that.bindGrid01();
					}
					else {
						// $("#idrowtable").val(rs.RESULT)
						// $("#tablename").val(CurrentLayout)
						// var rs1 = DATA.ajaxPostForm(CONFIG_API.URL.SEVER + 'upload', 'uploadForm')
						// if (!rs1.success) {
						// 	oVayQuyDuTruTinh.deluid(rs.RESULT)
						// 	var oAlert = new AlertDialog('Thông báo');
						// 	oAlert.show(rs1.message, '40%', '50px');
						// 	that.bindGrid01();
						// }
						// else {
						that.bindGrid01();
						var oAlert = new AlertDialog('Thông báo');
						oAlert.show(rs.MESSAGE, '40%', '50px');
						// }
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
					oVayQuyDuTruTinh.VAYQUYDUTRUTINHID = 0;
					that.filterAction('NEW');
				}
				else {
					that.oTable.$('tr.selected').removeClass('selected');
					$(this).addClass('selected');
					idVayQuyDuTruTinh = $(this).find('.rowID').val();
					oVayQuyDuTruTinh.VAYQUYDUTRUTINHID = idVayQuyDuTruTinh;
					that.filterAction('SELECT');
				}
			});
			$('.ACTIONS').on('click', '#btnTroNo', function () {
				$('#modalTraNo #GHICHU').val('')
				if (!oVayQuyDuTruTinh.VAYQUYDUTRUTINHID) {
					var oAlert = new AlertDialog('Cảnh báo');
					oAlert.show('Chưa chọn để trả nợ', '40%', '50px');
					return false;
				}
				$('#modalTraNo').modal('toggle')
				var res = oVayQuyDuTruTinh.getById(idVayQuyDuTruTinh)
				$('#modalTraNo #DONVIID').val(res[0].DONVIID)
				$('#modalTraNo #NGAYVAY').val(res[0].NGAYVAY)
				$('#modalTraNo #TONGSOTIENVAY').val(formatMoney(Number(res[0].SOTIENVAY)), ',')
				$('#modalTraNo #THOIHANVAYDATE').val(res[0].THOIHANVAYDATE)
				if (Number(res[0].THOIHANVAY) > 0) {
					$('#modalTraNo #THOIHANVAY').val(res[0].THOIHANVAY)
				}
				else {
					var month = Number(res[0].THOIHANVAYDATE.split('/')[2] - res[0].NGAYVAY.split('/')[2]) * 12 + Number(res[0].THOIHANVAYDATE.split('/')[1] - res[0].NGAYVAY.split('/')[1])
					$('#modalTraNo #THOIHANVAY').val(month)
				}
				that.dttablemulti.clear().draw()
				var resGoclai = oVayQuyDuTruTinh.getGocLai(idVayQuyDuTruTinh)
				if (resGoclai.length > 0) {
					var arows = []
					var sotiengocdatra = 0;
					resGoclai.map(function (item, index) {
						arows.push([
							index + 1,
							formatMoney(item.TRAGOC),
							item.NGAYTRA,
							item.GHICHU
						])
						sotiengocdatra = sotiengocdatra + Number(item.TRAGOC)
					})
					that.dttablemulti.rows.add(arows).draw()
					var sotiengocphaitra = Number(res[0].SOTIENVAY)
					var sotiengocconlai = sotiengocphaitra - sotiengocdatra;
					$('#modalTraNo #TRAGOC').val(formatMoney(sotiengocconlai))
					$('#modalTraNo #TONGDUNOCONLAI').val(formatMoney(sotiengocconlai))
				} else {
					$('#modalTraNo #TRAGOC').val(formatMoney(Number(res[0].SOTIENVAY)))
					$('#modalTraNo #TONGDUNOCONLAI').val(formatMoney(Number(res[0].SOTIENVAY)))
				}
				$('#modalTraNo #NGAYTRA').val(res[0].THOIHANVAYDATE).trigger('blur')
			});
			$('#modalTraNo .btnSaveTraNo').click(function (e) {
				e.preventDefault()
				var datapost = {}
				datapost.i_vayquydutrutinhid = Number(idVayQuyDuTruTinh)
				datapost.i_ngaytra = $('#modalTraNo #NGAYTRA').val()
				datapost.i_tragoc = Number($('#modalTraNo #TRAGOC').val().replace(/,/g, ''))
				datapost.i_ghichu = $('#modalTraNo #GHICHU').val()
				datapost.i_DONVIID = Number($('#modalTraNo #DONVIID').val())
				datapost.i_thoihanvay = Number($('#modalTraNo #THOIHANVAY').val())
				if ((datapost.i_tragoc > 0) && Number($('#modalTraNo #TONGDUNOCONLAI').val().replace(/,/g, '')) > 0) {
					if (datapost.i_tragoc <= Number($('#modalTraNo #TONGDUNOCONLAI').val().replace(/,/g, ''))) {
						var res = oVayQuyDuTruTinh.GocLaiSave(datapost)
						var oAlert = new AlertDialog('Thông báo');
						oAlert.show('Trả nợ thành công', '40%', '50px');
						$('#modalTraNo').modal('hide')
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
				var resGoclai = oVayQuyDuTruTinh.getGocLai(idVayQuyDuTruTinh)
				var arows = []
				that.dttablemulti.clear().draw()
				resGoclai.map(function (item, index) {
					arows.push([
						index + 1,
						formatMoney(item.TRAGOC),
						item.NGAYTRA,
						item.GHICHU
					])
				})
				that.dttablemulti.rows.add(arows).draw()
				that.bindGrid01()
			})
		});
	})
}