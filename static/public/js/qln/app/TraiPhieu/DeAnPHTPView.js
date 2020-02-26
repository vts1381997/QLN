var DeAnPHTPView = function () {
	var idDeAnPHTP = 0;
	var that = this;
	this.AppTitle = 'Đề án phát hành trái phiếu';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oDeAnPHTP = new DeAnPHTP();
	$("#DONVIID").html(fnc_danhsachdonvi())

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
		}
	};
	this.init = function () {
		that.bindGrid01();
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
	}
	this.bindGrid01 = function () {
		oDeAnPHTP.getAll();
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < oDeAnPHTP.LIST.length; i++) {
			var _item = oDeAnPHTP.LIST[i];
			_item.menhgia = formatMoney(_item.MENHGIA)
			if (_item.LAISUATPHATHANH !== null) {
				_item.laisuat = JSON.stringify(_item.LAISUATPHATHANH + "%").replace('"', '').replace('"', '')
			}
			else {
				_item.laisuat = " "
			}
			_item.tong = parseInt(_item.KHOILUONGPHATHANH) * parseInt(_item.MENHGIA)
			if (_item.NGAYKYHANTRAIPHIEU > 0 && _item.NGAYKYHANTRAIPHIEU < 5) {
				_item.kyhantraiphieu = JSON.stringify(_item.NGAYKYHANTRAIPHIEU + ' Năm - Ngắn hạn').replace('"', '').replace('"', '')
			}
			else
				if (_item.NGAYKYHANTRAIPHIEU < 12) {
					_item.kyhantraiphieu = JSON.stringify(_item.NGAYKYHANTRAIPHIEU + ' Năm - Trung hạn').replace('"', '').replace('"', '')
				}
				else {
					_item.kyhantraiphieu = JSON.stringify(_item.NGAYKYHANTRAIPHIEU + ' Năm - Dài hạn').replace('"', '').replace('"', '')
				}
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.DEANPHATHANHTRAIPHIEUID + '" />';
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
				_item.MA,
				_item.TEN,
				_item.THOIGIANPHATHANH,
				_item.NGAYQUYETDINH,
				formatMoney(_item.KHOILUONGPHATHANH),
				_item.MENHGIA,
				_item.laisuat,
				_item.KYHANTHANHTOAN,
				_item.kyhantraiphieu,
				download
			]);
		}
		that.oTable.rows.add(aRows).draw();
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
	function fnc_tinhLaiNgayDaoHan() {
		var kyHanTraiPhieu = $("#NGAYKYHANTRAIPHIEU").val()
		var thoiGianPhatHanh = $("#THOIGIANPHATHANH").val().split('/')
		var ngay = thoiGianPhatHanh[0]
		var thang = thoiGianPhatHanh[1]
		var nam = parseInt(thoiGianPhatHanh[2]) + parseInt(kyHanTraiPhieu)
		$("#KYHANTHANHTOAN").val(ngay + '/' + thang + '/' + nam)
	}
	function fnc_remove0firt(p_string) {
		var vStringTmp = p_string;
		if (vStringTmp.length == 0)
			return vStringTmp;
		try {
			while (vStringTmp.substr(0, 1) == '0')
				vStringTmp = vStringTmp.substr(1, vStringTmp.length - 1);
		} catch (error) {
			vStringTmp = 'Vui lòng nhập số hoặc dấu chấm phảy';
		}
		return vStringTmp;
	}

	this.bindModal = function () {
		String.prototype.replaceAll = function (search, replacement) {
			var target = this;
			return target.replace(new RegExp(search, 'g'), replacement);
		};
		$(document).ready(function () {
			// oDeAnPHTP.getDonVi()
			// var optiondv = '';
			// for (var i = 0; i < oDeAnPHTP.LIST.length; i++) {
			// 	var val = oDeAnPHTP.LIST[i];
			// 	optiondv =
			// 		optiondv +
			// 		"<option value-tinhthanhid='" +
			// 		val.TINHTHANHID +
			// 		"' value-tentinhthanh='" + val.TINHTHANH +
			// 		"' value='" +
			// 		val.DONVIID +
			// 		"'>" +
			// 		val.TENDONVI +
			// 		"</option>";
			// }
			// $("#DONVIID").html(optiondv)
			$("#DONVIID").html(fnc_danhsachdonvi())
			var start = Date.now();
			$("#MA").val('DAPHTP-' + start + Math.floor(Math.random() * 10))
			$("#DONVIID").trigger('change')
			let valueTinhThanh = $("#DONVIID option:selected").attr('value-tentinhthanh')
			$("#TENTOCHUCPHATHANH").val('UBND ' + valueTinhThanh)
			$("#DONVIID").change(function () {
				let valueTinhThanh = $("#DONVIID option:selected").attr('value-tentinhthanh')
				$("#TENTOCHUCPHATHANH").val('UBND ' + valueTinhThanh)
			})
			$('body').on('keyup', '#LAISUATPHATHANH', function () {
				if (Number($("#LAISUATPHATHANH").val()) > 30) {
					$("#LAISUATPHATHANH").val('10')
				}
				if (Number($("#LAISUATPHATHANH").val()) < 0) {
					$("#LAISUATPHATHANH").val('0')
				}
			})
			$('body').on('keyup', '#NGAYKYHANTRAIPHIEU', function () {
				if (Number($("#NGAYKYHANTRAIPHIEU").val()) > 30) {
					$("#NGAYKYHANTRAIPHIEU").val('30')
				}
				if (Number($("#NGAYKYHANTRAIPHIEU").val()) < 0) {
					$("#NGAYKYHANTRAIPHIEU").val('1')
				}
				$("#NGAYKYHANTRAIPHIEU").trigger('change')
			})
			$("#NGAYKYHANTRAIPHIEU").change(function () {
				var kyHanTraiPhieu = $("#NGAYKYHANTRAIPHIEU").val()
				if (kyHanTraiPhieu > 0 && kyHanTraiPhieu < 5) {
					$("#NGAYKYHANTRAIPHIEULABEL").text('Ngắn hạn')
					$("#NGAYKYHANTRAIPHIEULABEL").addClass('label-success')
					$("#NGAYKYHANTRAIPHIEULABEL").removeClass('label-warning')
					$("#NGAYKYHANTRAIPHIEULABEL").removeClass('label-danger')
				}
				else
					if (kyHanTraiPhieu < 12) {
						$("#NGAYKYHANTRAIPHIEULABEL").text('Trung hạn')
						$("#NGAYKYHANTRAIPHIEULABEL").removeClass('label-success')
						$("#NGAYKYHANTRAIPHIEULABEL").addClass('label-warning')
						$("#NGAYKYHANTRAIPHIEULABEL").removeClass('label-danger')
					}
					else {
						$("#NGAYKYHANTRAIPHIEULABEL").text('Dài hạn')
						$("#NGAYKYHANTRAIPHIEULABEL").removeClass('label-success')
						$("#NGAYKYHANTRAIPHIEULABEL").removeClass('label-warning')
						$("#NGAYKYHANTRAIPHIEULABEL").addClass('label-danger')
					}
				fnc_tinhLaiNgayDaoHan();
			})
			$("#THOIGIANPHATHANH").change(function () {
				fnc_tinhLaiNgayDaoHan();
			})
			$("#THOIGIANPHATHANH").blur(function () {
				fnc_tinhLaiNgayDaoHan();
			})

		})
		if (idDeAnPHTP > 0) {
			oDeAnPHTP.getById(idDeAnPHTP);
			$('#MA').val(oDeAnPHTP.MA);
			$('#TEN').val(oDeAnPHTP.TEN);
			$('#DONVIID').val(oDeAnPHTP.DONVIID);
			$('#SOQUYETDINH').val(oDeAnPHTP.SOQUYETDINH);
			$('#NGAYQUYETDINH').val(oDeAnPHTP.NGAYQUYETDINH);
			$('#TENTOCHUCPHATHANH').val(oDeAnPHTP.TENTOCHUCPHATHANH);
			$('#KHOILUONGPHATHANH').val(formatMoney(oDeAnPHTP.KHOILUONGPHATHANH));
			$('#NGAYKYHANTRAIPHIEU').val(oDeAnPHTP.NGAYKYHANTRAIPHIEU);
			$('#LAISUATPHATHANH').val(oDeAnPHTP.LAISUATPHATHANH);
			$('#MENHGIA').val(oDeAnPHTP.MENHGIA);
			$('#PHUONGTHUCPHATHANH').val(oDeAnPHTP.PHUONGTHUCPHATHANH);
			$('#THOIGIANPHATHANH').val(oDeAnPHTP.THOIGIANPHATHANH);
			$('#KYHANTHANHTOAN').val(oDeAnPHTP.KYHANTHANHTOAN);
			$('#PHUONGTHUCTRALAI').val(oDeAnPHTP.PHUONGTHUCTRALAI);
			$('#PHUONGTHUCTRAGOC').val(oDeAnPHTP.PHUONGTHUCTRAGOC);
			$('#VANDEKHAC').val(oDeAnPHTP.VANDEKHAC);
		}
	}

	$("#KHOILUONGPHATHANH").keyup(function () {
		var khoiLuongPhatHanh = $("#KHOILUONGPHATHANH").val()
		$("#KHOILUONGPHATHANH").val(fnc_remove0firt(khoiLuongPhatHanh))
		if ($("#KHOILUONGPHATHANH").val().includes('.')) {
			var stringName = String($("#KHOILUONGPHATHANH").val()).split('.').join().replaceAll(',', '')
			$("#KHOILUONGPHATHANH").val(stringName)
		}
	})

	$('#MENHGIA').keyup(function (e) {
		if ($("#MENHGIA").val().includes('-')) {
			var menhGia = $("#MENHGIA").val().split("-").join("")
			$("#MENHGIA").val(menhGia)
		}
		else
			if ($("#MENHGIA").val().includes('.')) {
				var menhGia1 = $("#MENHGIA").val().split(".").join("")
				$("#MENHGIA").val(menhGia1)
			}
			else {
				e.preventDefault();
				e.stopPropagation();
				var menhgia = String($(this).val());
				var arr_menhgia = [];
				var arr_menhgia_fm = [];
				// Xử lý khi nhập có số 0 ở trước
				menhgia = fnc_remove0firt(menhgia);
				// Khi lớn hơn 3 thì xử lý format
				if (menhgia.length > 3) {
					if (menhgia.includes(';')) {
						arr_menhgia = menhgia.split(';')
						arr_menhgia.forEach(item => {
							var vRemove0Firt = fnc_remove0firt(item);
							if (vRemove0Firt.length > 0)
								arr_menhgia_fm.push(formatMoney(fnc_replace(vRemove0Firt, ',', '')));
							else
								arr_menhgia_fm.push(';');
						});
					}
					else {
						menhgia = fnc_replace(menhgia, ',', '');
						arr_menhgia_fm.push(formatMoney(menhgia))
					}
					//Ghép chuỗi
					if (arr_menhgia_fm.length == 1) {
						$(this).val(arr_menhgia_fm[0]);
					}
					else {
						var vReturn = arr_menhgia_fm.join(';');
						while (vReturn.includes(';;'))
							vReturn = fnc_replace(vReturn, ';;', ';');
						$(this).val(vReturn);
					}
				}
				else {
					$(this).val(menhgia);
				}
			}
	})

	$('body').on('change', '#MA', function () {
		if ($('#MA').val().length > 200) {
			var oAlert = new AlertDialog1('Thông báo');
			oAlert.show('Mã quá dài, vui lòng nhập lại', '40%', '50px');
			$('#MA').val('')
		}
	})
	$('body').on('keyup', '#TEN', function () {
		if ($('#TEN').val().length > 200) {
			var oAlert = new AlertDialog1('Thông báo');
			oAlert.show('Tên đề án quá dài, vui lòng nhập lại', '40%', '50px');
			$('#TEN').val('')
		}
	})
	$('body').on('keyup', '#SOQUYETDINH', function () {
		if ($('#SOQUYETDINH').val().length > 200) {
			var oAlert = new AlertDialog1('Thông báo');
			oAlert.show('Số quyết định quá dài, vui lòng nhập lại', '40%', '50px');
			$('#SOQUYETDINH').val('')
		}
	})
	$('body').on('keyup', '#TENTOCHUCPHATHANH', function () {
		if ($('#TENTOCHUCPHATHANH').val().length > 200) {
			var oAlert = new AlertDialog1('Thông báo');
			oAlert.show('Tên tổ chức phát hành quá dài, vui lòng nhập lại', '40%', '50px');
			$('#TENTOCHUCPHATHANH').val('')
		}
	})
	$('body').on('keyup', '#VANDEKHAC', function () {
		if ($('#VANDEKHAC').val().length > 500) {
			var oAlert = new AlertDialog1('Thông báo');
			oAlert.show('Các vấn đề khác liên quan quá dài, vui lòng nhập lại', '40%', '50px');
			$('#VANDEKHAC').val('')
		}
	})

	$(document).ready(function () {

		that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
		that.oDialog = new PopupDialog(reload);
		that.init();

		function reload() {
			that.bindGrid01();
			that.filterAction('NEW');
		}
		$('body').on('click', '.btnTaixuong', function () {
			var url = CONFIG_API.URL.SEVER + $(this).attr('val')
			window.open(url)
		})

		$('body').on('blur', '#KYHANTHANHTOAN', function () {
			var ngayDaoHan = new Date($("#KYHANTHANHTOAN").val().split('/')[2] + '-' + $("#KYHANTHANHTOAN").val().split('/')[1] + '-' + $("#KYHANTHANHTOAN").val().split('/')[0])
			var ngayPhatHanh = new Date($("#THOIGIANPHATHANH").val().split('/')[2] + '-' + $("#THOIGIANPHATHANH").val().split('/')[1] + '-' + $("#THOIGIANPHATHANH").val().split('/')[0])
			if (ngayDaoHan < ngayPhatHanh) {
				var dateNow = $.datepicker.formatDate('dd/mm/', new Date())
				var year = parseInt($.datepicker.formatDate('yy', new Date())) + 1
				$("#KYHANTHANHTOAN").val(dateNow + year)
			} else {
				return;
			}
		})
		$('body').on('blur', '#THOIGIANPHATHANH', function () {
			$("#KYHANTHANHTOAN").trigger('blur')
			$("#NGAYQUYETDINH").trigger('blur')
		})
		$('body').on('blur', '#NGAYQUYETDINH', function () {
			var ngayQuyetDinh = new Date($("#NGAYQUYETDINH").val().split('/')[2] + '-' + $("#NGAYQUYETDINH").val().split('/')[1] + '-' + $("#NGAYQUYETDINH").val().split('/')[0])
			var ngayPhatHanh = new Date($("#THOIGIANPHATHANH").val().split('/')[2] + '-' + $("#THOIGIANPHATHANH").val().split('/')[1] + '-' + $("#THOIGIANPHATHANH").val().split('/')[0])
			if (ngayQuyetDinh > ngayPhatHanh) {
				$("#NGAYQUYETDINH").val($("#THOIGIANPHATHANH").val())
			} else {
				return;
			}
		})

		$('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()
			$("#Grid01").find('.selected').removeClass('selected');
			$("#exampleModalLongTitle").text('Thêm mới đề án phát hành trái phiếu')
			var dateNow = $.datepicker.formatDate('dd/mm/', new Date())
			var year = parseInt($.datepicker.formatDate('yy', new Date())) + 1
			$('#list_uploadfile').html('');
			$('#MA').val('');
			$('#TEN').val('');
			$('#NGAYKYHANTRAIPHIEU').val('1');
			$('#LAISUATPHATHANH').val('0.1');
			$('#MENHGIA').val('100,000;');
			$('#SOQUYETDINH').val('');
			$('#NGAYQUYETDINH').val($.datepicker.formatDate('dd/mm/yy', new Date()));
			$('#DONVIID').val($('#DONVIID option:first-child').attr('value'));
			$('#THOIGIANPHATHANH').val($.datepicker.formatDate('dd/mm/yy', new Date()));
			$('#KYHANTHANHTOAN').val(dateNow + year);
			$('#VANDEKHAC').val('');
			$('#KHOILUONGPHATHANH').val('');
			$('#PHUONGTHUCTRALAI').val('DH');
			$('#PHUONGTHUCTRAGOC').val('DH');
			$('#PHUONGTHUCPHATHANH').val('1');
			idDeAnPHTP = 0;
			that.bindModal();
			$("#NGAYKYHANTRAIPHIEU").trigger('change')
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			// that.bindModal();
			$("#exampleModalLongTitle").text('Sửa đề án phát hành trái phiếu')
			oDeAnPHTP.getById(idDeAnPHTP);
			$('#MA').val(oDeAnPHTP.MA);
			$('#TEN').val(oDeAnPHTP.TEN);
			$('#DONVIID').val(oDeAnPHTP.DONVIID);
			$('#SOQUYETDINH').val(oDeAnPHTP.SOQUYETDINH);
			$('#NGAYQUYETDINH').val(oDeAnPHTP.NGAYQUYETDINH);
			$('#TENTOCHUCPHATHANH').val(oDeAnPHTP.TENTOCHUCPHATHANH);
			$('#KHOILUONGPHATHANH').val(formatMoney(oDeAnPHTP.KHOILUONGPHATHANH));
			$('#NGAYKYHANTRAIPHIEU').val(oDeAnPHTP.NGAYKYHANTRAIPHIEU);
			$('#LAISUATPHATHANH').val(oDeAnPHTP.LAISUATPHATHANH);
			$('#MENHGIA').val(oDeAnPHTP.MENHGIA);
			$('#PHUONGTHUCPHATHANH').val(oDeAnPHTP.PHUONGTHUCPHATHANH);
			$('#THOIGIANPHATHANH').val(oDeAnPHTP.THOIGIANPHATHANH);
			$('#KYHANTHANHTOAN').val(oDeAnPHTP.KYHANTHANHTOAN);
			$('#PHUONGTHUCTRALAI').val(oDeAnPHTP.PHUONGTHUCTRALAI);
			$('#PHUONGTHUCTRAGOC').val(oDeAnPHTP.PHUONGTHUCTRAGOC);
			$('#VANDEKHAC').val(oDeAnPHTP.VANDEKHAC);
			$("#NGAYKYHANTRAIPHIEU").trigger('change')
		});

		$('.ACTIONS').on('click', '#btnDelete', function (e) {
			e.preventDefault()
			if (!oDeAnPHTP.DEANPHATHANHTRAIPHIEUID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn Đề án phát hành trái phiếu để xóa', '40%', '50px');
				return false;
			}

			function ok() {
				var rs = oDeAnPHTP.del(idDeAnPHTP);
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
			if ($('#MA').val() == '' || $('#MA').val().includes(' ')) {
				var oAlert = new AlertDialog1('Thông báo');
				oAlert.show('Mã không được chứa khoảng trắng hoặc rỗng', '40%', '50px');
				return;
			}
			else {
				oDeAnPHTP.DEANPHATHANHTRAIPHIEUID = idDeAnPHTP
				oDeAnPHTP.MA = $('#MA').val();
				oDeAnPHTP.TEN = $('#TEN').val();
				oDeAnPHTP.SOQUYETDINH = $('#SOQUYETDINH').val();
				oDeAnPHTP.NGAYQUYETDINH = $('#NGAYQUYETDINH').val();
				oDeAnPHTP.TENTOCHUCPHATHANH = $('#TENTOCHUCPHATHANH').val();
				oDeAnPHTP.KHOILUONGPHATHANH = $('#KHOILUONGPHATHANH').val().replaceAll(',', '');
				oDeAnPHTP.NGAYKYHANTRAIPHIEU = $('#NGAYKYHANTRAIPHIEU').val();
				// return;
				oDeAnPHTP.LAISUATPHATHANH = $('#LAISUATPHATHANH').val();
				var vMenhGia = $('#MENHGIA').val();
				var vLengthMenhGia = vMenhGia.length;
				if (vMenhGia.substr(vLengthMenhGia - 1, 1) == ';')
					vMenhGia = vMenhGia.substr(0, vLengthMenhGia - 1);
				oDeAnPHTP.MENHGIA = vMenhGia;
				oDeAnPHTP.PHUONGTHUCPHATHANH = $('#PHUONGTHUCPHATHANH').val();
				oDeAnPHTP.THOIGIANPHATHANH = $('#THOIGIANPHATHANH').val();
				oDeAnPHTP.KYHANTHANHTOAN = $('#KYHANTHANHTOAN').val();
				oDeAnPHTP.PHUONGTHUCTRALAI = $('#PHUONGTHUCTRALAI').val();
				oDeAnPHTP.PHUONGTHUCTRAGOC = $('#PHUONGTHUCTRAGOC').val();
				oDeAnPHTP.VANDEKHAC = $('#VANDEKHAC').val();
				oDeAnPHTP.DONVIID = $('#DONVIID').val();
				oDeAnPHTP.UUID = uuidv4();
				var rs = oDeAnPHTP.save();
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
					// 	oDeAnPHTP.deluid(rs.RESULT)
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
			}
		})
		$('#Grid01 tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				oDeAnPHTP.DEANPHATHANHTRAIPHIEUID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				idDeAnPHTP = $(this).find('.rowID').val();
				oDeAnPHTP.DEANPHATHANHTRAIPHIEUID = idDeAnPHTP;
				that.filterAction('SELECT');
			}
		});
	});
}