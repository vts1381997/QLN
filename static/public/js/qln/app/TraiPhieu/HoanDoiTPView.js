
const NgayHomNay = $.datepicker.formatDate('yy-mm-dd', new Date());
var HoanDoiTPView = function () {
	var idHoanDoiTP = 0;
	var that = this;
	this.AppTitle = 'Hoán đổi trái phiếu';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oHoanDoiTP = new HoanDoiTP();
	var Validate = new validate();
	var DeAns = new DeAnPHTP()
	DeAns.getAll();
	var resultDeAns = DeAns.LIST
	var optionTaiSanBiHoanDoi = ''
	resultDeAns.map(value => {
		if (value.SOQUYETDINH != null) {
			optionTaiSanBiHoanDoi = optionTaiSanBiHoanDoi + "<option data-menhgia-ngaydaohan ='" + value.MENHGIA + '@' + value.KYHANTHANHTOAN + "' data-phuongthuc='" + value.PHUONGTHUCPHATHANH + "' data-laisuat='" + value.LAISUATPHATHANH + "' data-toida='" + value.TOIDADUOCPHATHANH + "' data-ma='" + value.MA + "' data-maDotPhatHanh='" + "PHTP/" + value.MA + "/" + value.SOQUYETDINH + "/" +
				(value.DOTPHATHANH < 10 ? ("00" + value.DOTPHATHANH) : value.DOTPHATHANH < 100 ? ("0" + value.DOTPHATHANH) : value.DOTPHATHANH) +
				"' data-dotphathanh='" + value.DOTPHATHANH + "' data-chitiet= '" +
				"QĐ số: " + value.SOQUYETDINH +
				"; Thời gian phát hành: " + value.THOIGIANPHATHANH +
				"; Kỳ hạn thanh toán: " + value.KYHANTHANHTOAN +
				"; Loại " + (value.NGAYKYHANTRAIPHIEU < 5 ? "ngắn hạn" : value.NGAYKYHANTRAIPHIEU < 12 ? "trung hạn" : "dài hạn") +
				"; Khối lượng: " + value.KHOILUONGPHATHANH +
				"; Mệnh giá: " + formatMoney(value.MENHGIA) + " VNĐ" +
				"; Lãi suất: " + value.LAISUATPHATHANH + "%" +
				"' data-kyhantraiphieu='" + value.NGAYKYHANTRAIPHIEU + "' value='" + value.DEANPHATHANHTRAIPHIEUID + "'>" + value.TEN + "</option>"
		} else {
			optionTaiSanBiHoanDoi = optionTaiSanBiHoanDoi + "<option data-menhgia-ngaydaohan ='" + value.MENHGIA + '@' + value.KYHANTHANHTOAN + "' data-phuongthuc='" + value.PHUONGTHUCPHATHANH + "' data-laisuat='" + value.LAISUATPHATHANH + "' data-toida='" + value.TOIDADUOCPHATHANH + "' data-ma='" + value.MA + "' data-maDotPhatHanh='" + "PHTP/" + value.MA + "/" +
				(value.DOTPHATHANH < 10 ? ("00" + value.DOTPHATHANH) : value.DOTPHATHANH < 100 ? ("0" + value.DOTPHATHANH) : value.DOTPHATHANH) +
				"' data-dotphathanh='" + value.DOTPHATHANH + "' data-chitiet= '" +
				"Thời gian phát hành: " + value.THOIGIANPHATHANH +
				"; Kỳ hạn thanh toán: " + value.KYHANTHANHTOAN +
				"; Loại " + (value.NGAYKYHANTRAIPHIEU < 5 ? "ngắn hạn" : value.NGAYKYHANTRAIPHIEU < 12 ? "trung hạn" : "dài hạn") +
				"; Khối lượng: " + value.KHOILUONGPHATHANH +
				"; Mệnh giá: " + formatMoney(value.MENHGIA) + " VNĐ" +
				"; Lãi suất: " + value.LAISUATPHATHANH + "%" +
				"' data-kyhantraiphieu='" + value.NGAYKYHANTRAIPHIEU + "' value='" + value.DEANPHATHANHTRAIPHIEUID + "'>" + value.TEN + "</option>"
		}
	})

	function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
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
	function addCommas(nStr) {
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
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
		oHoanDoiTP.getAll();
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < oHoanDoiTP.LIST.length; i++) {
			var _item = oHoanDoiTP.LIST[i];
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.HOANDOITRAIPHIEUID + '" />';
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
				_item.NGAYHOANDOI,
				formatMoney(_item.KHOILUONGBIHOANDOI),
				formatMoney(_item.TONGSOTIENBIHOANDOI),
				formatMoney(_item.KHOILUONGDUOCHOANDOI),
				formatMoney(_item.TONGSOTIENDUOCHOANDOI),
				download
			]);
		}
		that.oTable.rows.add(aRows).draw();
	}
	this.init = function () {
		that.bindGrid01();
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');


		$('#TENTAISANBIHOANDOI').html(optionTaiSanBiHoanDoi)

	}
	this.bindModal = function () {
		String.prototype.replaceAll = function (search, replacement) {
			var target = this;
			return target.replace(new RegExp(search, 'g'), replacement);
		};
		$(document).ready(() => {
			var MuaLai = new MuaLaiTP()
			MuaLai.getAll();
			var resultMuaLai = MuaLai.LIST
			var optionMuaLai = "";
			resultMuaLai.map(value => {
				optionMuaLai = optionMuaLai + "<option value='" + value.CHUSOHUUTP + "'>" + value.CHUSOHUUTP + "</option>"
			})
			$("#DANHSACHCHUSOHUU").html(optionMuaLai)
			if (idHoanDoiTP == 0) {
				$('#TENTAISANBIHOANDOI').trigger('change')
			}

			// $('#TENTAISANBIHOANDOI').val('')
			$('#GIADUOCHOANDOI').on('change', function (e) {
				$('.MENHGIASAUHOANDOI').val($(this).val())
			})

			$('body').on('change', '#TENTAISANBIHOANDOI', function () {
				var optionTaiSanDuocHoanDoi1 = ""
				resultDeAns.map(value => {
					if (Number($("#TENTAISANBIHOANDOI").val()) != value.DEANPHATHANHTRAIPHIEUID) {
						optionTaiSanDuocHoanDoi1 = optionTaiSanDuocHoanDoi1 + "<option data-menhgia-ngaydaohan ='" + value.MENHGIA + '@' + value.KYHANTHANHTOAN + "' data-phuongthuc='" + value.PHUONGTHUCPHATHANH + "' data-laisuat='" + value.LAISUATPHATHANH + "' data-toida='" + value.TOIDADUOCPHATHANH + "' data-ma='" + value.MA + "' data-maDotPhatHanh='" + "PHTP/" + value.MA + "/" +
							(value.DOTPHATHANH < 10 ? ("00" + value.DOTPHATHANH) : value.DOTPHATHANH < 100 ? ("0" + value.DOTPHATHANH) : value.DOTPHATHANH) +
							"' data-dotphathanh='" + value.DOTPHATHANH + "' data-chitiet= '" +
							"Thời gian phát hành: " + value.THOIGIANPHATHANH +
							"; Kỳ hạn thanh toán: " + value.KYHANTHANHTOAN +
							"; Loại " + (value.NGAYKYHANTRAIPHIEU < 5 ? "ngắn hạn" : value.NGAYKYHANTRAIPHIEU < 12 ? "trung hạn" : "dài hạn") +
							"; Khối lượng: " + value.KHOILUONGPHATHANH +
							"; Mệnh giá: " + formatMoney(value.MENHGIA) + " VNĐ" +
							"; Lãi suất: " + value.LAISUATPHATHANH + "%" +
							"' data-kyhantraiphieu='" + value.NGAYKYHANTRAIPHIEU + "' value='" + value.DEANPHATHANHTRAIPHIEUID + "'>" + value.TEN + "</option>"
					}
				})
				$('#TENTAISANDUOCHOANDOI').html(optionTaiSanDuocHoanDoi1).trigger('change');
				// MenhGiaTraiPhieu = formatMoney(Number($('#TENTAISANBIHOANDOI option:selected').attr('data-menhgia-ngaydaohan').split('@')[0]), ',')
				// $('#MENHGIATRUOCHOANDOI').html(MenhGiaTraiPhieu);
				// $('#GIABIHOANDOI').val(MenhGiaTraiPhieu);
				// $('.GIATRUOCHOANDOI').val(MenhGiaTraiPhieu);
				// giaTruocHoanDoi = MenhGiaTraiPhieu;
				fnc_loadChiTietTheoDeAn();
			})
			$('body').on('change', '#TENTAISANDUOCHOANDOI', function () {
				// $('#TONGSOTIENDUOCHOANDOI').val(formatMoney(Number($('#TENTAISANDUOCHOANDOI option:selected').attr('data-menhgia-ngaydaohan').split('@')[ 0 ]), ','))
				$('#GIADUOCHOANDOI').val(formatMoney($('#TENTAISANDUOCHOANDOI option:selected').attr('data-menhgia-ngaydaohan').split('@')[0], ','))
				var vMenhGiaSauHoanDoi = $('#TENTAISANDUOCHOANDOI option:selected').attr('data-menhgia-ngaydaohan').split('@')[0];
				var arrMenhGiaSauHoanDoi = [];
				arrMenhGiaSauHoanDoi = vMenhGiaSauHoanDoi.split(';')
				optionMenhGiaSauHoanDoi = '';
				for (var i = 0; i < arrMenhGiaSauHoanDoi.length; i++) {
					if (arrMenhGiaSauHoanDoi[i] != "") {
						optionMenhGiaSauHoanDoi = optionMenhGiaSauHoanDoi + '<option value="' + fnc_replace(arrMenhGiaSauHoanDoi[i], ',', '') + '">' + arrMenhGiaSauHoanDoi[i] + ' VNĐ' + '</option>'
					}
					else {
						return;
					}
				}

				$('.MENHGIASAUHOANDOI').val(formatMoney(vMenhGiaSauHoanDoi, ','))
				var vMenhGiaNumber = Number(fnc_replace(vMenhGiaSauHoanDoi, ',', ''));
				$('.THANHTIENSAUHOANDOI').map((index, value) => {
					var vSoLuong = Number(fnc_replace($(value).parent().parent().find(".SOLUONGHOANDOI").val(), ',', ''));

					$(value).val(formatMoney(vMenhGiaNumber * vSoLuong, ','));
				})
				var vTongTienSauHoanDoi = Number(fnc_replace($("#KHOILUONGDUOCHOANDOI").val(), ',', '')) * vMenhGiaNumber;
				$("#TONGSOTIENDUOCHOANDOI").val(formatMoney(vTongTienSauHoanDoi, ','));
				// fnc_TinhLaiTienChiTietDuocHoanDoi();
				// MenhGiaSauHoanDoi = formatMoney(Number($('#TENTAISANDUOCHOANDOI option:selected').attr('data-menhgia-ngaydaohan').split('@')[0]), ',')
				// if ($('.MENHGIAHOANDOI').length > 0) {
				// 	$('.MENHGIASAUHOANDOI').val(MenhGiaSauHoanDoi)
				// 	$('.SOLUONGHOANDOI').trigger('keyup')
				// }
			})
			// $('body').on('change', '#THANHIENTRUOCHOANDOI', function () {
			// 	$('#' + $(this).attr('id').replace('THANHIENTRUOCHOANDOI', 'THANHTIENSAUHOANDOI')).val(Number($(this).val().replaceAll(',', '')) / (Number($('#' + $(this).attr('id').replace('THANHIENTRUOCHOANDOI', 'THANHTIENSAUHOANDOI')))))
			// })
			$('body').on('keyup', '#GIABIHOANDOI', function () {
				giaTruocHoanDoi = $(this).val()
				if ($('.GIATRUOCHOANDOI').length > 0) {
					$('.GIATRUOCHOANDOI').val($(this).val())
					$('.SOLUONG').trigger('keyup')
				}
			})
			$('body').on('change', '.GIADUOCHOANDOI', function () {
				$(".SOLUONG").trigger('keyup')
			})
			$('body').on('change', '.MENHGIASAUHOANDOI', function () {
				$(".SOLUONGHOANDOI").trigger('keyup')
			})
			$('body').on('keyup', '.SOLUONGHOANDOI', function () {
				var soLuongSauHoanDoi = fnc_replace($(this).val(), ',', '')
				var menhGiaSauHoanDoi = $('#' + $(this).attr('id').replace('SOLUONGHOANDOI', 'MENHGIASAUHOANDOI')).val()
				$('#' + $(this).attr('id').replace('SOLUONGHOANDOI', 'THANHTIENSAUHOANDOI')).val(formatMoney(Number(soLuongSauHoanDoi) * Number(menhGiaSauHoanDoi)))
				var tongtien = 0;
				var tongsoluong = 0;
				$('.THANHTIENSAUHOANDOI').map(function (index, item) {
					tongtien = tongtien + Number($(item).val().replaceAll(',', ''))
				})
				$("#TONGSOTIENDUOCHOANDOI").val(formatMoney(tongtien))
				$('.SOLUONGHOANDOI').map(function (index, item) {
					tongsoluong = tongsoluong + Number($(item).val().replaceAll(',', ''))
				})
				$("#KHOILUONGDUOCHOANDOI").val(formatMoney(tongsoluong))

			})
			$('body').on('keyup', '.SOLUONG', function () {
				var soLuongTruocHoanDoi = fnc_replace($(this).val(), ',', '')
				var menhGiaTruocHoanDoi = $('#' + $(this).attr('id').replace('SOLUONG', 'GIADUOCHOANDOI')).val()
				$('#' + $(this).attr('id').replace('SOLUONG', 'THANHIENTRUOCHOANDOI')).val(formatMoney(Number(soLuongTruocHoanDoi) * Number(menhGiaTruocHoanDoi)))
				// $('#' + $(this).attr('id').replace('SOLUONG', 'SOLUONGHOANDOI')).val(formatMoney(Number($('#' + $(this).attr('id').replace('SOLUONG', 'THANHIENTRUOCHOANDOI')).val().replaceAll(',', '')) / Number($('#' + $(this).attr('id').replace('SOLUONG', 'MENHGIASAUHOANDOI')).val().replaceAll(',', ''))))
				// $('.SOLUONGHOANDOI').trigger('keyup')

				var tongtien = 0
				var tongsol = 0
				$('.THANHIENTRUOCHOANDOI').map(function (index, item) {
					tongtien = tongtien + Number($(item).val().replaceAll(',', ''))
				})
				$('#TONGSOTIENBIHOANDOI').val(formatMoney(tongtien, ','))
				$('.SOLUONG').map(function (value, index) {
					tongsol = tongsol + Number($(this).val().replaceAll(',', ''))
				})
				$('#KHOILUONGBIHOANDOI').val(formatMoney(tongsol, ','))
			})
			// $('body').on('change', '.THANHIENTRUOCHOANDOI', function () {
			// 	var tongtien = 0;
			// 	$('.THANHIENTRUOCHOANDOI').map(function (value, index) {
			// 		tongtien = tongtien + Number($(value).val().replaceAll(',', ''))
			// 	})
			// 	$('#TONGSOTIENBIHOANDOI').val(formatMoney(tongtien, ','))
			// })
			// $('body').on('change', '#TENTAISANDUOCHOANDOI', function () {
			// 	$('#GIADUOCHOANDOI').val(formatMoney($('#TENTAISANBIHOANDOI option:selected').attr('data-menhgia-ngaydaohan').split('@')[ 0 ], ','))
			// 	// $('#GIADUOCHOANDOI').trigger('change')
			// })
			$('body').on('keyup', '#KHOILUONGBIHOANDOI', function () {
				var a = $("#KHOILUONGBIHOANDOI").val().replaceAll(',', '')
				var b = $("#GIABIHOANDOI").val().replaceAll(',', '')
				if ($("#KHOILUONGBIHOANDOI").val().length > 0 && $("#GIABIHOANDOI").val().length) {
					$("#TONGSOTIENBIHOANDOI").val(addCommas(parseInt(a) * parseInt(b)))
				}
				else {
					$("#TONGSOTIENBIHOANDOI").val('')
				}
			})
			$('body').on('keyup', '#GIABIHOANDOI', function () {
				if ($("#KHOILUONGBIHOANDOI").val().length > 0 && $("#GIABIHOANDOI").val().length) {
					var a = $("#KHOILUONGBIHOANDOI").val().replaceAll(',', '')
					var b = $("#GIABIHOANDOI").val().replaceAll(',', '')
					$("#TONGSOTIENBIHOANDOI").val(addCommas(parseInt(a) * parseInt(b)))
				}
				else {
					$("#TONGSOTIENBIHOANDOI").val('')
				}
			})
			$('body').on('keyup', '#KHOILUONGDUOCHOANDOI', function () {
				var a = $("#KHOILUONGDUOCHOANDOI").val().replaceAll(',', '')
				var b = $("#GIADUOCHOANDOI").val().replaceAll(',', '')
				if ($("#KHOILUONGDUOCHOANDOI").val().length > 0 && $("#GIADUOCHOANDOI").val().length) {
					$("#TONGSOTIENDUOCHOANDOI").val(addCommas(parseInt(a) * parseInt(b)))
				}
				else {
					$("#TONGSOTIENDUOCHOANDOI").val('')
				}
			})
			// $('body').on('keyup', '#GIADUOCHOANDOI', function () {
			// 	if ($("#KHOILUONGDUOCHOANDOI").val().length > 0 && $("#GIADUOCHOANDOI").val().length) {
			// 		var a = $("#KHOILUONGDUOCHOANDOI").val().replaceAll(',', '')
			// 		var b = $("#GIADUOCHOANDOI").val().replaceAll(',', '')
			// 		$("#TONGSOTIENDUOCHOANDOI").val(addCommas(parseInt(a) * parseInt(b)))
			// 	}
			// 	else {
			// 		$("#TONGSOTIENDUOCHOANDOI").val('')
			// 	}
			// })


		})
		if (idHoanDoiTP > 0) {
			oHoanDoiTP.getById(idHoanDoiTP);
			$('#MA').val(oHoanDoiTP.MA);
			$('#TEN').val(oHoanDoiTP.TEN);
			$('#PHUONGTHUCHOANDOI').val(oHoanDoiTP.PHUONGTHUCHOANDOI);
			$('#DANHSACHCHUSOHUU').val(oHoanDoiTP.DANHSACHCHUSOHUU);
			$('#TINHTHANHID').val(oHoanDoiTP.TINHTHANHID);
			$('#TENTAISANMUALAI').val(oHoanDoiTP.TENTAISANMUALAI);
			$('#TENTAISANBIHOANDOI').val(oHoanDoiTP.TENTAISANBIHOANDOI);
			$('#NGAYCUOIDANGKYBAN').val(oHoanDoiTP.NGAYCUOIDANGKYBAN);
			$('#NGAYPHONGTOA').val(oHoanDoiTP.NGAYPHONGTOA);
			$('#NGAYHOANDOI').val(oHoanDoiTP.NGAYHOANDOI);
			$('#NGAYMUALAI').val(oHoanDoiTP.NGAYMUALAI);
			$('#KHOILUONGBIHOANDOI').val(oHoanDoiTP.KHOILUONGBIHOANDOI);
			$('#LAISUAT').val(oHoanDoiTP.LAISUAT);
			$('#GIABIHOANDOI').val(formatMoney(oHoanDoiTP.GIABIHOANDOI));
			$('#GIADUOCHOANDOI').val(formatMoney(oHoanDoiTP.GIADUOCHOANDOI));
			giaTruocHoanDoi = oHoanDoiTP.GIADUOCHOANDOI
			$('#TONGSOTIENBIHOANDOI').val(formatMoney(oHoanDoiTP.TONGSOTIENBIHOANDOI));
			$('#TOCHUCMUALAI').val(oHoanDoiTP.TOCHUCMUALAI);
			// setTimeout(() => {
			var optionTaiSanDuocHoanDoi1 = ""
			resultDeAns.map((value, index) => {
				if (Number($("#TENTAISANBIHOANDOI").val()) != value.DEANPHATHANHTRAIPHIEUID) {
					optionTaiSanDuocHoanDoi1 = optionTaiSanDuocHoanDoi1 + "<option data-menhgia-ngaydaohan ='" + value.MENHGIA + '@' + value.KYHANTHANHTOAN + "' data-phuongthuc='" + value.PHUONGTHUCPHATHANH + "' data-laisuat='" + value.LAISUATPHATHANH + "' data-toida='" + value.TOIDADUOCPHATHANH + "' data-ma='" + value.MA + "' data-maDotPhatHanh='" + "PHTP/" + value.MA + "/" +
						(value.DOTPHATHANH < 10 ? ("00" + value.DOTPHATHANH) : value.DOTPHATHANH < 100 ? ("0" + value.DOTPHATHANH) : value.DOTPHATHANH) +
						"' data-dotphathanh='" + value.DOTPHATHANH + "' data-chitiet= '" +
						"Thời gian phát hành: " + value.THOIGIANPHATHANH +
						"; Kỳ hạn thanh toán: " + value.KYHANTHANHTOAN +
						"; Loại " + (value.NGAYKYHANTRAIPHIEU < 5 ? "ngắn hạn" : value.NGAYKYHANTRAIPHIEU < 12 ? "trung hạn" : "dài hạn") +
						"; Khối lượng: " + value.KHOILUONGPHATHANH +
						"; Mệnh giá: " + formatMoney(value.MENHGIA) + " VNĐ" +
						"; Lãi suất: " + value.LAISUATPHATHANH + "%" +
						"' data-kyhantraiphieu='" + value.NGAYKYHANTRAIPHIEU + "' value='" + value.DEANPHATHANHTRAIPHIEUID + "'>" + value.TEN + "</option>"
				}
				if (index === resultDeAns.length - 1) {

					$('#TENTAISANDUOCHOANDOI').html(optionTaiSanDuocHoanDoi1);
					$('#TENTAISANDUOCHOANDOI').val(oHoanDoiTP.TENTAISANDUOCHOANDOI)
					$('#MENHGIATRUOCHOANDOI').html(oHoanDoiTP.GIABIHOANDOI)

				}
			})
			// }, 400);

			$('#TENTAISANDUOCHOANDOI').html(oHoanDoiTP.TENTAISANDUOCHOANDOI)

			// setTimeout(() => {
			var hoandoidt = oHoanDoiTP.getDetail(idHoanDoiTP)
			$('#TENTAISANBIHOANDOI').trigger('change')
			// $('#TENTAISANDUOCHOANDOI').trigger('change')
			// $('#table-multi').empty()
			// fnc_loadChiTietTheoDeAn();


			for (var i = 0; i < hoandoidt.length; i++) {
				$("#ActionThemMoi").trigger('click');
				$("#DOTPHATHANH" + Number(i + 1)).val(hoandoidt[i].DOTPHATHANH)
				$("#TOCHUC" + Number(i + 1)).val(Number(hoandoidt[i].TOCHUC))
				$("#SOLUONG" + Number(i + 1)).val(hoandoidt[i].SOLUONGTRUOCHOANDOI)
				$("#GIADUOCHOANDOI" + Number(i + 1)).val(hoandoidt[i].MENHGIATRUOCHOANDOI)
				$("#THANHIENTRUOCHOANDOI" + Number(i + 1)).val(hoandoidt[i].THANHTIENTRUOCHOANDOI)
				$("#SOLUONGHOANDOI" + Number(i + 1)).val(hoandoidt[i].SOLUONGSAUHOANDOI)
				$("#MENHGIASAUHOANDOI" + Number(i + 1)).val(hoandoidt[i].MENHGIASAUHOANDOI)
				$("#THANHTIENSAUHOANDOI" + Number(i + 1)).val(hoandoidt[i].THANHTIENSAUHOANDOI)
				$("#NGAYHOANDOI" + Number(i + 1)).val(hoandoidt[i].NGAYHOANDOI)
				$("#NGAYPHONGTOA" + Number(i + 1)).val(hoandoidt[i].NGAYPHONGTOA)
				$("#GHICHU" + Number(i + 1)).val(hoandoidt[i].GHICHU)
				$(".SOLUONGHOANDOI").trigger('keyup')
				$(".SOLUONG").trigger('keyup')
			}
			// }, 500);

			// fnc_loadToChucMuaTP();
			// $('#table-multi').empty()
			// var hoandoidt = oHoanDoiTP.getDetail(idHoanDoiTP)
			// hoandoidt.map(function (item, index) {

			// 	// 	var selectDotPhatHanh = '<select style="width: 150px" class = "DOTPHATHANH" id="DOTPHATHANH' + id + '" data-index="' + id + '">' + optionDotPhatHanh + '</select>'
			// 	//     var selectMenhgia = '<select style="width: 75px" class="GIADUOCHOANDOI" id="GIADUOCHOANDOI' + id + '" data-index="' + id + '">' + optionMenhGia + '</select>'
			// 	//     var selectMenhGia = '<select style="width: 75px" class="MENHGIASAUHOANDOI" id="MENHGIASAUHOANDOI' + id + '" data-index="' + id + '">' + optionMenhGiaSauHoanDoi + '</select>'
			// 	//     var optionel = '<tr class="input-table" id="element-' + id + '"><td><label class="stt">' + id + '</label></td><td>\
			// 	// '+ selectDotPhatHanh + '</td><td>\
			// 	//         <select style="width: 100px" class="TOCHUC" id="TOCHUC' + id + '" data-index="' + id + '">' + optionToChucMuaTP + ' </select></td><td><input\
			// 	//             style="text-align: right; width: 50px" type="text" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"\
			// 	// 	  data-type="currency"\
			// 	//             value="" class="SOLUONG" id="SOLUONG' + id + '" /></td><td>' + selectMenhgia + '</td><td><input disabled type="text" style="width: 100px" class="THANHIENTRUOCHOANDOI NUMBER_DISABLED"\
			// 	//                      id="THANHIENTRUOCHOANDOI' + id + '" /></td><td><input type="text" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" \
			// 	// 	  data-type="currency" style="width: 50px; text-align: right" class="SOLUONGHOANDOI"\
			// 	//                          id="SOLUONGHOANDOI' + id + '" /></td><td>' + selectMenhGia + '\
			// 	//                              </td><td><input style="width: 100px" type="text" data-type="currency" class="THANHTIENSAUHOANDOI NUMBER_DISABLED"\
			// 	//                                  disabled="disabled" id="THANHTIENSAUHOANDOI' + id + '" /></td><td><input style="width:140px" type="date"\
			// 	//                                       class="NGAYHOANDOI" id="NGAYHOANDOI' + id + '" value="' + fnc_ngayhientai() + '"/></td><td><input style="width:140px" type="date"\
			// 	//                                           class="NGAYPHONGTOA" id="NGAYPHONGTOA' + id + '" value="' + fnc_ngayhientai() + '"/></td><td><input type="text"\
			// 	//                                              class="GHICHU" id="GHICHU' + id + '" /></td><td><button class="btn btn-danger\
			// 	//                                                  button-clear" id="element-' + id + '">Xóa</button></td></tr>';
			// 	// 	id++
			// 	// 	$('#table-multi').append(optionel)
			// 	$('#' + $($('#table-multi tr')[index]).attr('id') + ' td ' + '.DOTPHATHANH').val(item.DOTPHATHANH)
			// 	$('#' + $($('#table-multi tr')[index]).attr('id') + ' td ' + '.SOLUONG').val(item.SOLUONGTRUOCHOANDOI)
			// 	$('#' + $($('#table-multi tr')[index]).attr('id') + ' td ' + '.TOCHUC').val(item.TOCHUC)
			// 	$('#' + $($('#table-multi tr')[index]).attr('id') + ' td ' + '.GIATRUOCHOANDOI').val(item.MENHGIATRUOCHOANDOI)
			// 	$('#' + $($('#table-multi tr')[index]).attr('id') + ' td ' + '.THANHIENTRUOCHOANDOI').val(item.THANHIENTRUOCHOANDOI)
			// 	$('#' + $($('#table-multi tr')[index]).attr('id') + ' td ' + '.SOLUONGHOANDOI').val(item.SOLUONGSAUHOANDOI)
			// 	$('#' + $($('#table-multi tr')[index]).attr('id') + ' td ' + '.MENHGIASAUHOANDOI').val(item.MENHGIASAUHOANDOI)
			// 	$('#' + $($('#table-multi tr')[index]).attr('id') + ' td ' + '.THANHTIENSAUHOANDOI').val(item.THANHTIENSAUHOANDOI)
			// 	$('#' + $($('#table-multi tr')[index]).attr('id') + ' td ' + '.NGAYHOANDOI').val($.datepicker.formatDate('yy-mm-dd', new Date(item.NGAYHOANDOI)))
			// 	$('#' + $($('#table-multi tr')[index]).attr('id') + ' td ' + '.NGAYPHONGTOA').val($.datepicker.formatDate('yy-mm-dd', new Date(item.NGAYPHONGTOA)))
			// 	$('#' + $($('#table-multi tr')[index]).attr('id') + ' td ' + '.GHICHU').val(item.GHICHU)
			// })
		}
	}

	$('body').on('keyup', '#MA', function () {
		if ($('#MA').val().length > 200) {
			var oAlert = new AlertDialog1('Thông báo');
			oAlert.show('Mã quá dài, vui lòng nhập lại', '40%', '50px');
			$('#MA').val('')
		}
	})
	$('body').on('keyup', '#TEN', function () {
		if ($('#TEN').val().length > 200) {
			var oAlert = new AlertDialog1('Thông báo');
			oAlert.show('Tên đợt hoán đổi quá dài, vui lòng nhập lại', '40%', '50px');
			$('#TEN').val('')
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
		$('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()
			$("#exampleModalLongTitle").text('Thêm mới đợt hoán đổi trái phiếu')
			$('#list_uploadfile').html('');
			$('#MA').val('');
			$('#TEN').val('');
			$('#DANHSACHCHUSOHUU').val('');
			$('#NGAYHOANDOI').val($.datepicker.formatDate('dd/mm/yy', new Date()));
			$('#NGAYPHONGTOA').val($.datepicker.formatDate('dd/mm/yy', new Date()));
			$('#NGAYTOCHUCMUA').val($.datepicker.formatDate('dd/mm/yy', new Date()));
			$('#NGAYMUALAI').val($.datepicker.formatDate('dd/mm/yy', new Date()));
			$('#KHOILUONGBIHOANDOI').val('');
			$('#LAISUAT').val('');
			$('#GIABIHOANDOI').val('');
			$('#TONGSOTIENBIHOANDOI').val('');
			$('#TOCHUCMUALAI').val('');
			idHoanDoiTP = 0;
			that.bindModal();
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			that.bindModal();
			$("#exampleModalLongTitle").text('Sửa đợt hoán đổi trái phiếu')

			var hoandoidt = oHoanDoiTP.getDetail(idHoanDoiTP)
			for (var i = 0; i < hoandoidt.length; i++) {
				$("#DOTPHATHANH" + Number(i + 1)).val(hoandoidt[i].DOTPHATHANH)
				$("#DOTPHATHANH" + Number(i + 1)).trigger('change')
				$("#TOCHUC" + Number(i + 1)).val(Number(hoandoidt[i].TOCHUC))
				$("#TOCHUC" + Number(i + 1)).trigger('change')
				$("#GIADUOCHOANDOI" + Number(i + 1)).val(hoandoidt[i].MENHGIATRUOCHOANDOI)
			}
		});
		$('.ACTIONS').on('click', '#btnDelete', function (e) {
			e.preventDefault()
			if (!oHoanDoiTP.HOANDOITRAIPHIEUID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn hoán đổi trái phiếu để xóa', '40%', '50px');
				return false;
			}

			function ok() {
				var rs = oHoanDoiTP.del(oHoanDoiTP.HOANDOITRAIPHIEUID);
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
		document.getElementsByName("userPhoto")[0].addEventListener("click", fileUpload);
		function fileUpload(e){
			var targetAfterX = e.offsetX >= 0 && e.offsetX <= 81;
			var targetAfterY = e.offsetY >= 0 && e.offsetY <= 40;
			if(targetAfterX && targetAfterY){
			}else{
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
			var fl = Validate.required();
			if (fl) {
				var list_tr_DOTPHATHANH = $('.input-table .DOTPHATHANH')
				var list_tr_TOCHUC = $('.input-table .TOCHUC')
				var list_tr_SOLUONG = $('.input-table .SOLUONG')
				var list_tr_GIADUOCHOANDOI = $('.input-table .GIADUOCHOANDOI')
				var list_tr_SOLUONGHOANDOI = $('.input-table .SOLUONGHOANDOI')
				var list_tr_MENHGIASAUHOANDOI = $('.input-table .MENHGIASAUHOANDOI')
				var list_tr_NGAYHOANDOI = $('.input-table .NGAYHOANDOI')
				var list_tr_NGAYPHONGTOA = $('.input-table .NGAYPHONGTOA')
				var list_tr_GHICHU = $('.input-table .GHICHU')
				var r_list_tr_DOTPHATHANH = []
				var r_list_tr_TOCHUC = []
				var r_list_tr_SOLUONG = []
				var r_list_tr_GIADUOCHOANDOI = []
				var r_list_tr_SOLUONGHOANDOI = []
				var r_list_tr_MENHGIASAUHOANDOI = []
				var r_list_tr_NGAYHOANDOI = []
				var r_list_tr_NGAYPHONGTOA = []
				var r_list_tr_GHICHU = []
				list_tr_DOTPHATHANH.map((index, value) => {
					r_list_tr_DOTPHATHANH.push($(value).val())
				})
				list_tr_TOCHUC.map((index, value) => {
					r_list_tr_TOCHUC.push($(value).val())
				})
				list_tr_SOLUONG.map((index, value) => {
					r_list_tr_SOLUONG.push($(value).val())
				})
				list_tr_GIADUOCHOANDOI.map((index, value) => {
					r_list_tr_GIADUOCHOANDOI.push($(value).val())
				})
				list_tr_SOLUONGHOANDOI.map((index, value) => {
					r_list_tr_SOLUONGHOANDOI.push($(value).val())
				})
				list_tr_MENHGIASAUHOANDOI.map((index, value) => {
					r_list_tr_MENHGIASAUHOANDOI.push($(value).val())
				})
				list_tr_NGAYHOANDOI.map((index, value) => {
					r_list_tr_NGAYHOANDOI.push($(value).val())
				})
				list_tr_NGAYPHONGTOA.map((index, value) => {
					r_list_tr_NGAYPHONGTOA.push($(value).val())
				})
				list_tr_GHICHU.map((index, value) => {
					r_list_tr_GHICHU.push($(value).val())
				})
				oHoanDoiTP.HOANDOITRAIPHIEUID = idHoanDoiTP;
				oHoanDoiTP.MA = $('#MA').val();
				oHoanDoiTP.TEN = $('#TEN').val();
				oHoanDoiTP.PHUONGTHUCHOANDOI = $('#PHUONGTHUCHOANDOI').val();
				oHoanDoiTP.NGAYHOANDOI = $('#NGAYHOANDOI').val();
				oHoanDoiTP.TENTAISANBIHOANDOI = Number($('#TENTAISANBIHOANDOI').val());
				oHoanDoiTP.TENTAISANDUOCHOANDOI = Number($('#TENTAISANDUOCHOANDOI').val());
				oHoanDoiTP.KHOILUONGBIHOANDOI = Number($('#KHOILUONGBIHOANDOI').val().replaceAll(',', ''));
				oHoanDoiTP.KHOILUONGDUOCHOANDOI = Number($('#KHOILUONGDUOCHOANDOI').val().replaceAll(',', ''));
				oHoanDoiTP.TONGSOTIENBIHOANDOI = Number($('#TONGSOTIENBIHOANDOI').val().replaceAll(',', ''));
				oHoanDoiTP.TONGSOTIENDUOCHOANDOI = Number($('#TONGSOTIENDUOCHOANDOI').val().replaceAll(',', ''));
				oHoanDoiTP.LAISUATBIHOANDOI = Number($('#LAISUATBIHOANDOI').val());
				oHoanDoiTP.LAISUATDUOCHOANDOI = Number($('#LAISUATDUOCHOANDOI').val());
				oHoanDoiTP.UUID = uuidv4();
				var querry = '';
				querry = "Insert all ";
				for (var i = 0; i < list_tr_TOCHUC.length; i++) {
					querry = querry +
						" Into QLN_HOANDOITP_CHITIET(HOANDOITRAIPHIEUID, TOCHUC, SOLUONGTRUOCHOANDOI, SOLUONGSAUHOANDOI, NGAYHOANDOI, NGAYPHONGTOA, GHICHU, DOTPHATHANH, MENHGIATRUOCHOANDOI, MENHGIASAUHOANDOI) VALUES(" +
						'@@@' + "," +
						fnc_nvl(r_list_tr_TOCHUC[i], 0) + ", " +
						fnc_nvl(r_list_tr_SOLUONG[i].replaceAll(',', ''), 0) + ", " +
						fnc_nvl(r_list_tr_SOLUONGHOANDOI[i].replaceAll(',', ''), 0) + ", to_date('" +
						r_list_tr_NGAYHOANDOI[i] + "' , 'yyyy-MM-dd'), to_date('" +
						r_list_tr_NGAYPHONGTOA[i] + "' , 'yyyy-MM-dd'), '" +
						r_list_tr_GHICHU[i] + "', " +
						fnc_nvl(r_list_tr_DOTPHATHANH[i], 0) + ", " +
						fnc_nvl(r_list_tr_GIADUOCHOANDOI[i], 0) + ", " +
						fnc_nvl(r_list_tr_MENHGIASAUHOANDOI[i], 0) + ") ";
				}
				querry = querry + " Select 1 from dual";
				if (querry == "Insert all  Select 1 from dual") {
					var rs = oHoanDoiTP.save("Select 1 from dual");
					that.bindGrid01();
					var oAlert = new AlertDialog('Thông báo');
					oAlert.show(rs.MESSAGE, '40%', '50px');
				}
				else {
					var rs = oHoanDoiTP.save(querry);
					$("#idrowtable").val(rs.RESULT)
					$("#tablename").val(CurrentLayout)
					var rs1 = DATA.ajaxPostForm(CONFIG_API.URL.SEVER + 'upload', 'uploadForm')
					if (!rs1.success) {
						oHoanDoiTP.deluid(rs.RESULT)
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
				oHoanDoiTP.HOANDOITRAIPHIEUID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				idHoanDoiTP = $(this).find('.rowID').val();
				oHoanDoiTP.HOANDOITRAIPHIEUID = idHoanDoiTP;
				that.filterAction('SELECT');
			}
		});
	});
}