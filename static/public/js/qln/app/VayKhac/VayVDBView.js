var vNgayVayNoGanDay;
var vTinhThanhGanDay;
var VayVDBView = function () {
	var idVayVDB = 0;
	var that = this;
	this.AppTitle = 'Vay VDB';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	oVayVDB = new VayVDB();
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
	this.init = function () {
		that.bindGrid01();
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
	}
	this.bindGrid01 = function () {
		oVayVDB.getAll();
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < oVayVDB.LIST.length; i++) {
			var _item = oVayVDB.LIST[i];
			var trangthai = _item.CANHBAO
			var vTrangThai = '';
			var vTrangThaiClass = "";
			var vStyle = "";
			var number = trangthai.match(/\d/g);
			if (number) {
				number = number.join("");
			}
			var resGoclai = oVayVDB.getGocLai(_item.VAYVDBID)
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
				if (trangthai.includes('Quá hạn trả nợ')) {
					vTrangThaiClass = 'label label-danger'; //Đỏ
					vStyle = 'style="font-size: 11px;"'
				}
				if (trangthai.includes('Đã trả')) {
					vTrangThaiClass = 'label label-success'; //Xanh		
					vStyle = 'style="font-size: 11px;"'
				}
				if (trangthai.includes('để trả nợ')) {
					if (Number(number) > 15) {
						vTrangThaiClass = 'label label-con'; //den
						vStyle = 'style="color: black; font-size: 11px;"'
					}
					else {
						vTrangThaiClass = 'label label-saptoi'; //vang
						vStyle = 'style="color: green; font-size: 11px; background-color:yellow;"'
					}
				}
				if (Number(number) == 0) {
					vTrangThai = vTrangThai + '<span style="color: black; font-size: 11px; color: red" class="label label-con">Đến ngày trả nợ</span>';
				}
				else {
					vTrangThai = vTrangThai + '<span @style class="@trangthaiclass">' + trangthai + '</span>';
					vTrangThai = vTrangThai.replace('@trangthaiclass', vTrangThaiClass);
					vTrangThai = vTrangThai.replace('@style', vStyle);
				}
			}

			// var number = trangthai.match(/\d/g);
			// if (number) {
			// 	number = number.join("");
			// }
			// var vTrangThai = '';
			// if (Number(number) == 0) {
			// 	vTrangThai = vTrangThai + '<span style="color: black; font-size: 11px; color: red" class="label label-con">Đến ngày trả nợ</span>';
			// }
			// else {
			// 	vTrangThai = vTrangThai + '<span @style class="@trangthaiclass">' + trangthai + '</span>';
			// }
			// var vTrangThaiClass = "";
			// var vStyle = "";
			// if (trangthai.includes('Quá hạn trả nợ')) {
			// 	vTrangThaiClass = 'label label-danger'; //Đỏ
			// 	vStyle = 'style="font-size: 11px;"'
			// }
			// if (trangthai.includes('Đã trả')) {
			// 	vTrangThaiClass = 'label label-success'; //Xanh		
			// 	vStyle = 'style="font-size: 11px;"'
			// }
			// // if (trangthai.includes('Sắp tới')) {
			// // 	vTrangThaiClass = 'label label-saptoi'; //vang
			// // 	vStyle = 'style="color: green; font-size: 11px; background-color:yellow;"'
			// // }
			// if (trangthai.includes('để trả nợ')) {
			// 	var number = trangthai.match(/\d/g);
			// 	if (number) {
			// 		number = number.join("");
			// 	}
			// 	if (Number(number) > 15) {
			// 		vTrangThaiClass = 'label label-con'; //den
			// 		vStyle = 'style="color: black; font-size: 11px;"'
			// 	}
			// 	else {
			// 		vTrangThaiClass = 'label label-saptoi'; //vang
			// 		vStyle = 'style="color: green; font-size: 11px; background-color:yellow;"'
			// 	}
			// }
			// if (trangthai.includes('Còn lại 0 ngày để trả nợ')) {
			// 	vTrangThaiClass = 'label label-saptoi'; //vang
			// 	vStyle = 'style="color: green; font-size: 11px; background-color:yellow;"'
			// }
			// vTrangThai = vTrangThai.replace('@trangthaiclass', vTrangThaiClass);
			// vTrangThai = vTrangThai.replace('@style', vStyle);
			_item.canhbao = vTrangThai;
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.VAYVDBID + '" />';
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
				formatMoney(_item.SOTIENVAY),
				formatMoney(_item.SOTIENTRA),
				_item.canhbao,
				download
			]);
		}
		that.oTable.rows.add(aRows).draw();
	}
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
		$('body').on('change', '#MAHOPDONG', function () {
			let txtDuAn = $("#MAHOPDONG option:selected").attr('data-duan')
			$("#txtThongTinDuAnHopDong").text(txtDuAn);
			var data = {
				i_ngayvay: $("#NGAYVAY").val(),
				i_mahopdong: $("#MAHOPDONG").val(),
				i_type: 'VDB',
				i_donvi: $("#DONVIID").val(),
			}
			var data = oVayVDB.getDauKyLuyKe(data)
			$("#DUNODAUKY").val(formatMoney(data[0].DUNODAUKY))
			$("#LUYKEVAYTRONGNAM").val(formatMoney(data[0].LUYKEVAYTRONGNAM))
		})
		if (fnc_danhsachdonvi()) {
			$("#DONVIID").html(fnc_danhsachdonvi())
		}
		$('body').on('change', '#DONVIID', function () {
			$("#MAHOPDONG").trigger('change')
		})
		$('body').on('change', '#THOIHANVAY', function () {
			vNgayVayNoGanDay = $("#NGAYVAY").val().replace('/', '-').replace('/', '-');
			fnc_ThayDoiNgayTraNo();
		})
		$('#NGAYVAY').on('blur', function () {
			fnc_getluykeduno();
			$("#MAHOPDONG").trigger('change')
			$("#THOIHANVAY").trigger('change')
		})

		if (idVayVDB > 0) {
			oVayVDB.getById(Number(idVayVDB));
			$('#NGAYVAY').val(oVayVDB.NGAYVAY);
			$('#THOIHANVAY').val(oVayVDB.THOIHANVAY).select2();
			$('#THOIHANVAYDATE').val(oVayVDB.THOIHANVAYDATE);
			$('#SOTIENVAY').val(formatMoney(oVayVDB.SOTIENVAY));
			$('#SOTIENTRA').val(formatMoney(oVayVDB.SOTIENTRA));
			$('#LUYKEVAYTRONGNAM').val(formatMoney(oVayVDB.LUYKEVAYTRONGNAM));
			$('#DUNODAUKY').val(formatMoney(oVayVDB.DUNODAUKY));
			$('#LAISUAT').val(Number(oVayVDB.LAISUAT));
			$('#DONVIID').val(oVayVDB.DONVIID).select2();
			$('#MAHOPDONG').val(oVayVDB.MAHOPDONG).select2();
			$('#STATUS').val(oVayVDB.STATUS);
			$('#CREATEDDATE').val(oVayVDB.CREATEDDATE);
			$('#CREATEDBY').val(oVayVDB.CREATEDBY);
			$('#UPDATEDDATE').val(oVayVDB.UPDATEDDATE);
			$('#UPDATEDBY').val(oVayVDB.UPDATEDBY);
			$("#THOIHANVAY").trigger('change')
			$("#MAHOPDONG").trigger('change')
		}
	}
	function fnc_getluykeduno() {
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
				that.bindGrid01();
				that.filterAction('NEW');
			}

			$('.ACTIONS').on('click', '#btnAddNew', function (e) {
				e.preventDefault()
				idVayVDB = 0;
				that.bindModal();
				$("#exampleModalLongTitle").text('Thêm mới đợt vay VDB')
				$("#Grid01").find('.selected').removeClass('selected');
				$("#NGAYVAY").val($.datepicker.formatDate('dd/mm/yy', new Date()))
				$('#SOTIENVAY').val('');
				$('#SOTIENTRA').val('');
				$('#LAISUAT').val('0.1');
				$('#STATUS').val('0');
				$('#CREATEDDATE').val('');
				$('#CREATEDBY').val('');
				$('#UPDATEDDATE').val('');
				$('#UPDATEDBY').val(1);
				$("#MAHOPDONG").trigger('change')
				$("#THOIHANVAY").trigger('change')
				$("#MAHOPDONG").prop('disabled', false)
			});
			$('.ACTIONS').on('click', '#btnEdit', function () {
				that.bindModal();
				$("#exampleModalLongTitle").text('Sửa đợt vay VDB')
				$("#MAHOPDONG").trigger('change')
				$("#MAHOPDONG").prop('disabled', true)
			});
			$('.ACTIONS').on('click', '#btnDelete', function (e) {
				e.preventDefault()
				if (!oVayVDB.VAYVDBID) {
					var oAlert = new AlertDialog('Cảnh báo');
					oAlert.show('Chưa chọn thông tin vay VDB để xóa', '40%', '50px');
					return false;
				}

				function ok() {
					var rs = oVayVDB.del(oVayVDB.VAYVDBID);
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
			$('body').on('click', '.btnTaixuong', function () {
				var url = CONFIG_API.URL.SEVER + $(this).attr('val')
				window.open(url)
			})
			document.getElementsByName("userPhoto")[0].addEventListener("click", fileUpload);
			function fileUpload(e) {
				var targetAfterX = e.offsetX >= 0 && e.offsetX <= 81;
				var targetAfterY = e.offsetY >= 0 && e.offsetY <= 40;
				if (targetAfterX && targetAfterY) {
				} else {
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
				oVayVDB.VAYVDBID = Number(idVayVDB);
				oVayVDB.NGAYVAY = $('#NGAYVAY').val();
				oVayVDB.THOIHANVAY = $('#THOIHANVAY').val();
				oVayVDB.THOIHANVAYDATE = $('#THOIHANVAYDATE').val();
				oVayVDB.SOTIENVAY = Number($('#SOTIENVAY').val().replaceAll(',', ''));
				oVayVDB.LAISUAT = $('#LAISUAT').val();
				oVayVDB.DONVIID = $('#DONVIID').val();
				oVayVDB.MAHOPDONG = $('#MAHOPDONG').val();
				var hsd = $("#MAHOPDONG option:selected").attr('ngayhopdong')
				var ngayhl = $("#MAHOPDONG option:selected").attr('ngayhieuluc')
				var ngayvay = Number(oVayVDB.NGAYVAY.split('/')[2] + oVayVDB.NGAYVAY.split('/')[1] + oVayVDB.NGAYVAY.split('/')[0])
				if (ngayvay <= Number(hsd.split('/')[2] + hsd.split('/')[1] + hsd.split('/')[0]) && ngayvay >= Number(ngayhl.split('/')[2] + ngayhl.split('/')[1] + ngayhl.split('/')[0])) {
					oVayVDB.UUID = uuidv4();
					var rs = oVayVDB.save();
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
							oVayVDB.deluid(rs.RESULT)
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
				else {
					var oAlert = new AlertDialog1('Thông báo');
					oAlert.show('Ngày vay phải lớn hơn ngày ký hợp đồng!', '40%', '50px');
					return
				}
			})
			$('#Grid01 tbody').on('click', 'tr', function () {
				if ($(this).hasClass('selected')) {
					$(this).removeClass('selected');
					oVayVDB.VAYVDBID = 0;
					that.filterAction('NEW');
				}
				else {
					that.oTable.$('tr.selected').removeClass('selected');
					$(this).addClass('selected');
					idVayVDB = $(this).find('.rowID').val();
					oVayVDB.VAYVDBID = idVayVDB;
					that.filterAction('SELECT');
				}
			});

			$('.ACTIONS').on('click', '#btnTroNo', function () {
				$('#modalTraNo #GHICHU').val('')
				if (!oVayVDB.VAYVDBID) {
					var oAlert = new AlertDialog('Cảnh báo');
					oAlert.show('Chưa chọn để trả nợ', '40%', '50px');
					return false;
				}
				$('#modalTraNo').modal('toggle')
				var res = oVayVDB.getById(idVayVDB)
				$('#modalTraNo #DONVI').val(res[0].DONVIID)
				$('#modalTraNo #NGAYVAY').val(res[0].NGAYVAY)
				$('#modalTraNo #TONGSOTIENVAY').val(formatMoney(res[0].SOTIENVAY), ',')
				$('#modalTraNo #THOIHANVAYDATE').val(res[0].THOIHANVAYDATE)
				$('#modalTraNo #LAIPHI').val(res[0].LAISUAT)

				//dang lam do phan ky han vay
				if (Number(res[0].THOIHANVAY) > 0) {
					$('#modalTraNo #THOIHANVAY').val(res[0].THOIHANVAY)
				}
				else {
					var month = Number(res[0].THOIHANVAYDATE.split('/')[2] - res[0].NGAYVAY.split('/')[2]) * 12 + Number(res[0].THOIHANVAYDATE.split('/')[1] - res[0].NGAYVAY.split('/')[1])
					$('#modalTraNo #THOIHANVAY').val(month)
				}
				var resGoclai = oVayVDB.getGocLai(idVayVDB)
				that.dttablemulti.clear().draw()
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
					var arr_ngaytra = ($.datepicker.formatDate('dd/mm/yy', new Date())).split('/')
					var ngaytra = new Date(Number(arr_ngaytra[2]), Number(arr_ngaytra[1]), Number(arr_ngaytra[0]));
					var months = parseInt(new Date((new Date(Number(ngaytragannhatarr[2]), Number(ngaytragannhatarr[1]), Number(ngaytragannhatarr[0]))).getTime() - (new Date(Number(ngaytra[2]), Number(ngaytra[1]), Number(ngaytra[0]))).getTime()).getMonth())
					var sotiengocphaitra = Number(res[0].SOTIENVAY)
					var sotiengocconlai = sotiengocphaitra - sotiengocdatra;
					$('#modalTraNo #TRAGOC').val(formatMoney(sotiengocconlai))
					$('#modalTraNo #TONGDUNOCONLAI').val(formatMoney(sotiengocconlai))
					$('#modalTraNo #TRALAI').val(formatMoney((sotiengocconlai) * (parseFloat(res[0].LAISUAT)) / 100 * months))

				} else {
					that.ngaytragannhat = res[0].NGAYVAY
					that.itemtragannhat = undefined
					var ngay = res[0].NGAYVAY.split('/')
					var ngayvay = new Date(Number(ngay[2]), Number(ngay[1]), Number(ngay[0]))
					var arr_ngaytra = ($.datepicker.formatDate('dd/mm/yy', new Date())).split('/')
					var ngaytra = new Date(Number(arr_ngaytra[2]), Number(arr_ngaytra[1]), Number(arr_ngaytra[0]));
					var months = Number(ngaytra.getFullYear() - ngayvay.getFullYear()) * 12 + Number(ngaytra.getMonth() - ngayvay.getMonth())
					$('#modalTraNo #TRAGOC').val(formatMoney(Number(res[0].SOTIENVAY)))
					$('#modalTraNo #TONGDUNOCONLAI').val(formatMoney(Number(res[0].SOTIENVAY)))
					$('#modalTraNo #TRALAI').val(formatMoney((Number(Number(res[0].SOTIENVAY)) * (parseFloat(res[0].LAISUAT)) / 100 * months)))
				}
				$('#modalTraNo #NGAYTRA').val(res[0].THOIHANVAYDATE).trigger('blur')
			});

			$('#modalTraNo #TRAGOC').keyup(function () {
				var tragoc = Number($(this).val().replace(/,/g, ''))
				var LAISUAT = parseFloat($('#modalTraNo #LAISUAT').val())
				var ngayvayarr = $('#modalTraNo #NGAYVAY').val().split('/')
				var ngaytraarr = $('#modalTraNo #NGAYTRA').val().split('/')
				var ngayvay = new Date(Number(ngayvayarr[2]), Number(ngayvayarr[1]), Number(ngayvayarr[0]))
				var ngaytra = new Date(Number(ngaytraarr[2]), Number(ngaytraarr[1]), Number(ngaytraarr[0]))
				var ngaytragannhat = that.ngaytragannhat.split('/');
				if (that.itemtragannhat === undefined) {
					var months = Number(ngaytra.getFullYear() - ngayvay.getFullYear()) * 12 + Number(ngaytra.getMonth() - ngayvay.getMonth())
					$('#modalTraNo #TRALAI').val(formatMoney((tragoc) * LAISUAT / 100 * months))
				} else {
					ngaytra = new Date(Number(ngaytragannhat[2]), Number(ngaytragannhat[1]), Number(ngaytragannhat[0]))
					var months = Number(ngaytra.getFullYear() - ngayvay.getFullYear()) * 12 + Number(ngaytra.getMonth() - ngayvay.getMonth())
					$('#modalTraNo #TRALAI').val(formatMoney((tragoc) * LAISUAT / 100 * months))
				}
				$('#modalTraNo #NGAYTRA').trigger('blur')
			})

			$('#modalTraNo #NGAYTRA').on('blur', function () {
				var tragoc = Number($('#modalTraNo #TRAGOC').val().replace(/,/g, ''))
				var LAISUAT = parseFloat($('#modalTraNo #LAIPHI').val())
				var ngayvayarr = $('#modalTraNo #NGAYVAY').val().split('/')
				var ngaytraarr = $(this).val().split('/')
				var ngayvay = new Date(Number(ngayvayarr[2]), Number(ngayvayarr[1]), Number(ngayvayarr[0]))
				var ngaytra = new Date(Number(ngaytraarr[2]), Number(ngaytraarr[1]), Number(ngaytraarr[0]))
				var ngaytragannhat = that.ngaytragannhat.split('/');
				if (that.itemtragannhat === undefined) {
					var months = Number($('#modalTraNo #NGAYTRA').val().split('/')[2] - $('#modalTraNo #NGAYVAY').val().split('/')[2]) * 12 + Number($('#modalTraNo #NGAYTRA').val().split('/')[1] - $('#modalTraNo #NGAYVAY').val().split('/')[1])
					$('#modalTraNo #THOIHANVAY').val(months)
					$('#modalTraNo #TRALAI').val(formatMoney((tragoc) * LAISUAT / 100 * months))
				} else {
					ngaytra = new Date(Number(ngaytragannhat[2]), Number(ngaytragannhat[1]), Number(ngaytragannhat[0]))
					var month = Number($('#modalTraNo #NGAYTRA').val().split('/')[2] - $('#modalTraNo #NGAYVAY').val().split('/')[2]) * 12 + Number($('#modalTraNo #NGAYTRA').val().split('/')[1] - $('#modalTraNo #NGAYVAY').val().split('/')[1])
					$('#modalTraNo #TRALAI').val(formatMoney((tragoc) * LAISUAT / 100 * months))
				}
			})

			$('#modalTraNo .btnSaveTraNo').click(function (e) {
				e.preventDefault()
				var datapost = {}
				datapost.i_vayvdbid = Number(idVayVDB)
				datapost.i_ngaytra = $('#modalTraNo #NGAYTRA').val()
				datapost.i_tragoc = Number($('#modalTraNo #TRAGOC').val().replace(/,/g, ''))
				datapost.i_tralai = Number($('#modalTraNo #TRALAI').val().replace(/,/g, ''))
				datapost.i_ghichu = $('#modalTraNo #GHICHU').val()
				datapost.i_donviid = Number($('#modalTraNo #DONVI').val())
				datapost.i_thoihanvay = Number($('#modalTraNo #THOIHANVAY').val())
				if ((datapost.i_tragoc > 0) && Number($('#modalTraNo #TONGDUNOCONLAI').val().replace(/,/g, '')) > 0 | datapost.i_tralai > 0) {
					if (datapost.i_tragoc <= Number($('#modalTraNo #TONGDUNOCONLAI').val().replace(/,/g, ''))) {
						var res = oVayVDB.GocLaiSave(datapost)
						$('#modalTraNo').modal('toggle')
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
				var resGoclai = oVayVDB.getGocLai(idVayVDB)
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
		});
	})

}