var DuAnView = function () {
	var idDuAn = 0;
	var that = this;
	this.AppTitle = 'Danh sách dự án';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var oDuAn = new DuAn();
	listTinhthanh = []
	listNhaTaiTro = []
	var idduan1 = ''
	var $exampleMulti
	var $nhataitro
	var nguoidungs = new NguoiDung();
	var duans = new DuAn();
	var TienTes = new TienTe()
	TienTes.getAll();
	var resultTiente = TienTes.LIST
	var optionTienTe = ''
	resultTiente.map(value => {
		optionTienTe = optionTienTe + "<option data-tygia='" + value.BANRA + "' value='" + value.TIENTEID + "'>" + value.MA + "</option>"
	})
	$('#TIENTEID').html(optionTienTe)
	var tt_id = nguoidungs.getTinhThanhs();
	var list_tt = nguoidungs.getTinhThanh(tt_id[0].TINHTHANHID);
	var NhaTaiTros = new NhaTaiTro()
	NhaTaiTros.getAll();
	var resultNhaTaiTro = NhaTaiTros.LIST
	var option1 = ''
	resultNhaTaiTro.map(value => {
		if (value.TRANGTHAI == "1") {
			option1 = option1 + "<option value='" + value.NHATAITROID + "'>" + value.TEN + "</option>"
		}
	})
	$('#NHATAITROID').html(option1)
	$nhataitro = $("#NHATAITROID").select2();
	var optt = ''
	list_tt.map(val => {
		optt = optt + "<option value='" + val.TINHTHANHID + "'>" + val.TEN + "</option>"
	})
	$("#TINHTHANHID").html(optt)
	$exampleMulti = $("#TINHTHANHID").select2();

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

	function _mapUrlParams(queryString) {
		return queryString
			.split('&')
			.map(function (keyValueString) { return keyValueString.split('=') })
			.reduce(function (urlParams, [key, value]) {
				if (Number.isInteger(parseInt(value)) && parseInt(value) == value) {
					urlParams[key] = parseInt(value);
				} else {
					urlParams[key] = decodeURI(value);
				}
				return urlParams;
			}, {});
	}

	function getUrlParams(urlOrQueryString) {
		if ((i = urlOrQueryString.indexOf('?')) >= 0) {
			const queryString = urlOrQueryString.substring(i + 1);
			if (queryString) {
				return _mapUrlParams(queryString);
			}
		}
		return {};
	}
	this.bindGrid01 = function () {
		var vParams;
		if (location.href.includes('?')) {
			vParams = getUrlParams(location.href);
			oDuAn.getAllByNhaTaiTro(vParams);
		}
		else {
			oDuAn.getAll();
		}
		that.oTable.clear().draw();
		var aRows = [];
		for (var i = 0; i < oDuAn.LIST.length; i++) {
			var _item = oDuAn.LIST[i];
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.DUANID + '" />';
			var _hidden1 = '<p style="display:none" class="rowID1"  />' + JSON.stringify(_item) + '</p>';
			var trangThaiDuAn = '';
			if (_item.COCHETAICHINH == 'CP') {
				trangThaiDuAn = '<div class="alert-danger" style="font-size:10px; text-align:center">100% cấp phát</div>'
			}
			else {
				_item.STATUS_DELETE + '' !== '0' ? trangThaiDuAn = '<div class="alert-danger" style="font-size:10px; text-align:center">Đã tạo hợp đồng</div>' : trangThaiDuAn = '<div class="alert-success" style="font-size:10px;  text-align:center">Chưa tạo hợp đồng</div>'
			}
			aRows.push([
				(i + 1) + _hidden + _hidden1,
				_item.MA,
				_item.TEN,
				_item.CHUDAUTU,
				_item.DONVITHUCHIEN,
				formatMoney(_item.TONGTIENVAYLAI),
				formatMoney(_item.TONGTIENCAPPHAT),
				formatMoney(_item.TONGTIEN),
				formatMoney(fnc_nvl(_item.TONGSOTIENKEHOACHVAY)),
				formatMoney(fnc_nvl(_item.TONGSOTIENKEHOACHCAPPHAT)),
				formatMoney(fnc_nvl(_item.TONGTIENKEHOACH)),
				trangThaiDuAn
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
		$exampleMulti.val(null)
		$(document).ready(function () {
			$("#displayHideOrShow").html('')
			if (idDuAn > 0) {
				if ($("#COCHETAICHINH").attr('disabled') + '' === 'disabled') {
					$('#alert-cctc').html('Dự án đã có hợp đồng nên không được thay đổi cơ chế  tài chính!')
				} else {
					$('#alert-cctc').html('')
				}
				oDuAn.getById(idDuAn);
				$('#MA').val(oDuAn.MA);
				$('#TEN').val(oDuAn.TEN);
				$('#CHUDAUTU').val(oDuAn.CHUDAUTU);
				$('#DONVITHUCHIEN').val(oDuAn.DONVITHUCHIEN);
				$('#TRANGTHAI').val(oDuAn.TRANGTHAI).select2();
				$('#COCHETAICHINH').val(oDuAn.COCHETAICHINH).select2();
				$('#COCHETAICHINH').trigger('change')
				$('#NOTE').val(oDuAn.NOTE);
				$('#NHATAITROID').val(oDuAn.NHATAITROID);
				$('#TONGMUCDAUTU').val(formatMoney(oDuAn.TONGMUCDAUTU));
				$('#TIENTEID').val(oDuAn.TIENTEID).select2();
				$('#PHANTRAMVAYLAI').val(oDuAn.PHANTRAMVAYLAI)
			}
		})
	}

	$(function () {
		that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
		that.oDialog = new PopupDialog(reload);
		setTimeout(() => {
			that.init();
		}, 200);

		$("#NHATAITROID").select2({
			placeholder: "Select a state"
		});

		$("#TINHTHANHID").on('select2:select', function (e) {
			var data = e.params.data;
			listTinhthanh.push(data.id)
		});
		$("#TINHTHANHID").on("select2:unselect", function (e) {
			var data = e.params.data;
			listTinhthanh = listTinhthanh.filter(a => a != data.id)
		});
		$("#NHATAITROID").on('select2:select', function (e) {
			var data = e.params.data;
			listNhaTaiTro.push(data.id)
		});
		$("#NHATAITROID").on("select2:unselect", function (e) {
			var data = e.params.data;
			listNhaTaiTro = listNhaTaiTro.filter(a => a != data.id)
		});
		function reload() {
			that.filterAction('NEW');
			that.bindGrid01();
		}
		$('body').on('change', '#COCHETAICHINH', function () {
			if ($("#COCHETAICHINH").val() == 'HH') {
				// $("#PHANTRAMVAYLAI").prop('disabled', false)
				$("#displayHideOrShow").html('<div class="input-group">\
					<input type="number" class="form-control" value="50" min="1"\
						style="text-align: right;" max="99" step="1"\
						id="PHANTRAMVAYLAI" name="PHANTRAMVAYLAI"\
						autocomplete="off" />\
					<span class="input-group-btn">\
						<button type="button" class="btn btn-default">% vay lại\
						</button>\
					</span>\
			</div>')
			}
			else {
				$("#displayHideOrShow").html('')
			}
		})
		$('body').on('keyup', '#PHANTRAMVAYLAI', function () {
			if ($("#PHANTRAMVAYLAI").val().includes('-')) {
				$("#PHANTRAMVAYLAI").val('1')
			}
			else
				if ($("#PHANTRAMVAYLAI").val() >= 100) {
					$("#PHANTRAMVAYLAI").val('99')
				}
				else {
					return;
				}
		})
		$('body').on('change', '#PHANTRAMVAYLAI', function () {
			if ($("#PHANTRAMVAYLAI").val() == 0) {
				$("#PHANTRAMVAYLAI").val('1')
			}
		})
		$('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault();
			$("#exampleModalLongTitle").text('Thêm mới dự án');
			$("#Grid01").find('.selected').removeClass('selected');
			$("#alert-cctc").hide();
			$("#TINHTHANHID").val(null).select2();
			$exampleMulti.val(null).trigger("change");
			$nhataitro.val(null).trigger("change");
			listNhaTaiTro = [];
			listTinhthanh = [];
			$exampleMulti.val(listTinhthanh).trigger("change");
			$nhataitro.val(listNhaTaiTro).trigger("change");
			$('#MA').val('');
			$('#TEN').val('');
			$('#CHUDAUTU').val('');
			$('#DONVITHUCHIEN').val('');
			$('#TONGMUCDAUTU').val('');
			$('#NHATAITROID').val('').select2();
			$('#TRANGTHAI').val('HD').select2();
			$('#NOTE').val('');
			// $("#TIEUDUAN").attr("checked","checked");
			// $("#TIEUDUAN").removeAttr("checked");
			idDuAn = 0;
			that.bindModal();
			$("#COCHETAICHINH").prop('disabled', false);
			fnc_validateSpace("TEN");
			$('#COCHETAICHINH').val('VL').select2();
			$('#COCHETAICHINH').trigger('change');
			$('#TIENTEID').val('19').select2();
			oDuAn.getAll();
			var dataSourceDuAn = oDuAn.LIST;
			var option = ''
			dataSourceDuAn.map(value => {
				if (value.TIEUDUAN != 't') {
					option += "<option value='" + value.MA + "'>" + value.MA + " - " + value.TEN + "</option>"
				}
			})
			$("#MADUANCHA").html(option).select2();
			$("#MADUANCHA").val(null).select2();
			$("#TIEUDUAN").prop('checked', false)
			$("#TIEUDUAN").val('f')
			$(".tieu-du-an").hide()
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			// listNhaTaiTro = []
			$("#exampleModalLongTitle").text('Sửa dự án');
			$("#alert-cctc").show();
			that.bindModal();
			var $cochetaichinh = $("#COCHETAICHINH").select2()
			var $nhataitro = $("#NHATAITROID").select2()
			var $trangthai = $("#TRANGTHAI").select2()
			$cochetaichinh.val(JSON.parse(idduan1).COCHETAICHINH).trigger('change')
			$trangthai.val(JSON.parse(idduan1).TRANGTHAI).trigger('change')
			listTinhthanh = JSON.parse(idduan1).TINHTHANHID.split('@')
			// if (JSON.parse(idduan1).NHATAITROID)
			listNhaTaiTro = JSON.parse(idduan1).NHATAITROID.split('@')
			// $nhataitro.val(JSON.parse(idduan1).NHATAITROID).trigger('change')
			$("#TONGMUCDAUTU").on('change', function () {
				if (Number($("#TONGMUCDAUTU").val()) > JSON.parse(idduan1).TONGTIEN) {
				}
			})
			$exampleMulti.val(listTinhthanh).trigger("change");
			$nhataitro.val(listNhaTaiTro).trigger("change");
			var oHopDongVayLai = new HopDongVayLai();
			oHopDongVayLai.getAll();
			var oHopDongVayLaiList = oHopDongVayLai.LIST
			var kq = 0;
			oHopDongVayLaiList.map(value => {
				if (Number(value.DUANID) == Number(idDuAn)) {
					return kq = Number(kq) + 1
				}
				else {
					return kq;
				}
			})

			if (Number(JSON.parse(idduan1).STATUS_DELETE) > 0) {
				$("#COCHETAICHINH").prop('disabled', true)

			}
			else {
				$("#COCHETAICHINH").prop('disabled', false)
			}
		});
		$('.ACTIONS').on('click', '#btnDelete', function (e) {
			e.preventDefault()
			if (!oDuAn.DUANID) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn kế hoạch để xóa', '40%', '50px');
				return false;
			}
			function ok() {
				var ls_Duan = [...oDuAn.LIST]
				var duan_filter = ls_Duan.filter(function (item) {
					return (item.STATUS_DELETE + '' !== '0' & item.DUANID + '' === oDuAn.DUANID)
				})

				if (duan_filter.length > 0) {
					var oAlert = new AlertDialog('Cảnh báo');
					oAlert.show('Kế hoạch đã chọn đã có hợp đồng không cho phép xóa!', '40%', '50px');
				} else {
					var rs = oDuAn.del(oDuAn.DUANID);
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
			e.preventDefault();
			var oAlert1 = new AlertDialog1('Thông báo');
			var tinhthanhid = ''
			listTinhthanh.map(val => {
				tinhthanhid = tinhthanhid + val + '@'
			})
			tinhthanhid = tinhthanhid.substring(0, tinhthanhid.length - 1)
			var nttid = ''
			listNhaTaiTro.map(val => {
				nttid = nttid + val + '@'
			})
			nttid = nttid.substring(0, nttid.length - 1)
			oDuAn.NHATAITROID = nttid
			oDuAn.TINHTHANHID = tinhthanhid
			if ($('#MA').val() == '' || $('#MA').val().includes(' ')) {
				var oAlert = new AlertDialog1('Thông báo');
				oAlert.show('Mã không được chứa khoảng trắng hoặc rỗng', '40%', '50px');
			}
			else
				if ($('#TEN').val() == '') {
					var oAlert = new AlertDialog1('Thông báo');
					oAlert.show('Tên dự án không được để trống', '40%', '50px');
				}
				else
					if ($('#TEN').val().trim().includes('  ')) {
						var oAlert = new AlertDialog1('Thông báo');
						oAlert.show('Tên dự án bị thừa khoảng trắng', '40%', '50px');
					}
					else {
						const regexMa = /[^a-zA-Z0-9_ ]/
						const regex = /[^a-zA-Z0-9_ ,.()áÁàÀảẢãÃạẠăĂắẮằẰẳẲẵẴặẶâÂấẤầẦẩẨẫẪậẬđĐéÉèÈẻẺẽẼẹẸêÊếẾềỀểỂễỄệỆíÍìÌỉỈĩĨịỊóÓòÒỏỎõÕọỌôÔốỐồỒổỔỗỖộỘơƠớỚờỜởỞỡỠợỢúÚùÙủỦũŨụỤưƯứỨừỪửỬữỮựỰ]/;
						if (regexMa.test($('#MA').val())) {
							oAlert1.show('Mã dự án không được chứa ký tự đặc biệt', '40%', '50px');
							return;
						}
						console.log($('#TEN').val());
						if (regex.test($('#TEN').val())) {
							oAlert1.show('Tên dự án không được chứa ký tự đặc biệt', '40%', '50px');
							return;
						}
						if (regex.test($('#CHUDAUTU').val())) {
							oAlert1.show('Chủ đầu tư không được chứa ký tự đặc biệt', '40%', '50px');
							return;
						}
						if (regex.test($('#DONVITHUCHIEN').val())) {
							oAlert1.show('Đơn vị thực hiện không được chứa ký tự đặc biệt', '40%', '50px');
							return;
						}
						if (regex.test($('#NOTE').val())) {
							oAlert1.show('Ghi chú không được chứa ký tự đặc biệt', '40%', '50px');
							return;
						}
						if ($("#TIEUDUAN").val() == 'f') {
							$("#MA").css('border-color', '')
							$("#TEN").css('border-color', '')
							$("#TINHTHANHID").css('border-color', '')
							oDuAn.DUANID = idDuAn;
							oDuAn.MA = $('#MA').val();
							oDuAn.TEN = $('#TEN').val().trim();
							oDuAn.CHUDAUTU = $('#CHUDAUTU').val();
							oDuAn.DONVITHUCHIEN = $('#DONVITHUCHIEN').val();
							oDuAn.TRANGTHAI = $('#TRANGTHAI').val();
							oDuAn.COCHETAICHINH = $('#COCHETAICHINH').val();
							oDuAn.NOTE = $('#NOTE').val();
							oDuAn.TONGMUCDAUTU = fnc_replace($('#TONGMUCDAUTU').val(), ',', '');
							oDuAn.TIENTEID = $('#TIENTEID').val();
							oDuAn.MADUANCHA = $('#MADUANCHA').val();
							oDuAn.TIEUDUAN = $('#TIEUDUAN').val();
							var rs = oDuAn.save();
							that.bindGrid01();
							if (rs.CODE == 3) {
								var oAlert = new AlertDialog1('Thông báo');
								oAlert.show('Mã này đã được sử dụng', '40%', '50px');
							}
							else {
								var oAlert = new AlertDialog('Thông báo');
								oAlert.show(rs.MESSAGE, '40%', '50px');
								if (rs.LOAI == 1) {
									$(function () {
										$('#exampleModalCenter').modal('toggle');
									});
								}
							}
						}
						else
							if ($('#TONGMUCDAUTU').val() == '') {
								var oAlert = new AlertDialog1('Thông báo');
								oAlert.show('Tổng tiền vay và cấp phát không được để trống', '40%', '50px');
							}
							else {
								if ($exampleMulti.val().length > 0 && $("#MA").val().length > 0 && $("#TEN").val().length > 0) {
									$("#MA").css('border-color', '')
									$("#TEN").css('border-color', '')
									$("#TINHTHANHID").css('border-color', '')
									oDuAn.DUANID = idDuAn;
									oDuAn.MA = $('#MA').val();
									oDuAn.TEN = $('#TEN').val().trim();
									oDuAn.CHUDAUTU = $('#CHUDAUTU').val();
									oDuAn.DONVITHUCHIEN = $('#DONVITHUCHIEN').val();
									oDuAn.TRANGTHAI = $('#TRANGTHAI').val();
									oDuAn.COCHETAICHINH = $('#COCHETAICHINH').val();
									oDuAn.NOTE = $('#NOTE').val();
									// oDuAn.NHATAITROID = $('#NHATAITROID').val();
									oDuAn.TONGMUCDAUTU = fnc_replace($('#TONGMUCDAUTU').val(), ',', '');
									oDuAn.TIENTEID = $('#TIENTEID').val();
									oDuAn.MADUANCHA = $('#MADUANCHA').val();
									oDuAn.TIEUDUAN = $('#TIEUDUAN').val();
									if ($('#COCHETAICHINH').val() == "HH") {
										oDuAn.PHANTRAMVAYLAI = $("#PHANTRAMVAYLAI").val()
									}
									else
										if ($('#COCHETAICHINH').val() == "VL") {
											oDuAn.PHANTRAMVAYLAI = 100
										}
										else {
											oDuAn.PHANTRAMVAYLAI = 0
										}
									var rs = oDuAn.save();
									that.bindGrid01();
									if (rs.CODE == 3) {
										var oAlert = new AlertDialog1('Thông báo');
										oAlert.show('Mã này đã được sử dụng', '40%', '50px');
									}
									else {
										var oAlert = new AlertDialog('Thông báo');
										oAlert.show(rs.MESSAGE, '40%', '50px');
										if (rs.LOAI == 1) {
											$(function () {
												$('#exampleModalCenter').modal('toggle');
											});
										}
									}
								}
								else {
									// if ($exampleMulti.val().length == 0)
									// 	$("#TINHTHANHID").css('border-color', 'red')
									// if ($("#TEN").val().length > 0)
									// 	$("#TEN").css('border-color', 'red')
									// if ($("#MA").val().length > 0)
									// 	$("#MA").css('border-color', 'red')
									var oAlert = new AlertDialog1('Thông báo');
									oAlert.show('Tỉnh thành phố không được để trống', '40%', '50px');
								}
							}
					}
		})
		$('#TIEUDUAN').change(function () {
			if ($('#TIEUDUAN').val() == 'f') {
				$(this).val('t');
				//hiển thị class tieu-du-an
				$(".tieu-du-an").show();
			}
			else {
				$(this).val('f');
				//ẩn class tieu-du-an
				$(".tieu-du-an").hide();
			}
		});
		$('#Grid01 tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				oDuAn.DUANID = 0;
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				idDuAn = $(this).find('.rowID').val();
				idduan1 = $(this).find('.rowID1').text();
				oDuAn.DUANID = idDuAn;
				that.filterAction('SELECT');
			}
		});
	});
}