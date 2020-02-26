var KeHoachVayHangNam = function () {
	var that = this;
	const apr = jwt.role.indexOf('VAYHANGNAM.APPROVE')
	const URL = {
		GETALL: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/getall',
		GETAPPROVE: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/getapprove',
		SENDAPPROVE: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/sendapprove',
		APPROVE: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/approve',
		REJECT: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/reject',
		GETBYNAM: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/getbynam',
		GETBYID: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/getbyid',
		GETBYIDCHA: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/getbyidcha',
		SEARCH: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/search',
		SAVE: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/save',
		SAVEDETAIL: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam_dtl/save',
		DEL: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/del',
		DELUID: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/deluid',
		DELETE: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/delete',
		getAllTinhThanh: CONFIG_API.URL.BASE_API + 'dm_tinhthanh/getall',
		getALLTienTe: CONFIG_API.URL.BASE_API + 'dm_tiente/getall',
		GETHANMUCDUNO: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/gethanmucdunovaycapphat',
		GETHANMUCDUNO1: CONFIG_API.URL.BASE_API + 'qln_khvhn/gethanmucdunovaycapphat',
		GETHANMUCCAPPHAT: CONFIG_API.URL.BASE_API + 'qln_khvhn/gethanmuccapphat',
		getAllDotRutVon: CONFIG_API.URL.BASE_API + 'qln_dotrutvon/getby_kehoach',
		searchkehoachvayhangnam: CONFIG_API.URL.USER_API + 'search/kehoachvayhangnam',
		GETNTTBYID: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/getnttbyid',
		GETNHATAITRO: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/getnhataitro',
		GETDUTOAN: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/getdutoan',
		GETCOCHETAICHINH: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/getcochetaichinh',
		UPDATE_APPROVE: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/update_approve',
		UPDATE_STATUS_APPROVE: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/status_approve',
		UPDATE_STATUS_APPROVED: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/status_approved',
		UPDATE_SOTIEN: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam/update_sotien',
	}

	this.KEHOACHVAYHANGNAMID = 0;
	this.MA = "";
	this.TEN = "";
	this.NAMKEHOACH = "";
	this.DONVIID = 0;
	this.HANMUCVAY = 0;
	this.HANMUCCAPPHAT = 0;
	this.SOTIENVAY = 0;
	this.SOTIENCAPPHAT = 0;
	this.DUNOVAY = 0;
	this.DUNOCAPPHAT = 0;
	this.TRANOGOC = 0;
	this.DUANID = 0;
	this.HOPDONGVAYLAIID = 0;
	this.BUDAPBOICHI = 0;
	this.PHANTRAMVAYLAI = 0;
	this.COCHETAICHINH = '';
	this.STATUS = 0;
	this.CREATEDDATE = "";
	this.CREATEDBY = "";
	this.UPDATEDDATE = "";
	this.UPDATEDBY = "";
	this.UID = ""

	// Get all data
	this.getAll = function () {
		var rs = DATA.get(URL.GETALL, { has_role: 1 });
		that.LIST = rs;
	}

	// get data by id
	this.getById = function (sId) {
		var rs = DATA.get(URL.GETBYID, { KEHOACHVAYHANGNAMID: sId });
		var item = rs[0];
		that.KEHOACHVAYHANGNAMID = item.KEHOACHVAYHANGNAMID;
		that.MA = item.MA;
		that.TEN = item.TEN;
		that.NAMKEHOACH = item.NAMKEHOACH;
		that.DONVIID = item.DONVIID;
		that.HANMUCVAY = item.HANMUCVAY;
		that.HANMUCCAPPHAT = item.HANMUCCAPPHAT;
		that.SOTIENVAY = item.SOTIENVAY;
		that.SOTIENCAPPHAT = item.SOTIENCAPPHAT;
		that.DUNOVAY = item.DUNOVAY;
		that.DUNOCAPPHAT = item.DUNOCAPPHAT;
		that.TRANOGOC = item.TRANOGOC;
		that.DUANID = item.DUANID;
		that.HOPDONGVAYLAIID = item.HOPDONGVAYLAIID;
		that.BUDAPBOICHI = item.BUDAPBOICHI;
		that.CREATEDDATE = item.CREATEDDATE;
		that.CREATEDBY = item.CREATEDBY;
		that.UPDATEDDATE = item.UPDATEDDATE;
		that.UPDATEDBY = item.UPDATEDBY;
		that.TENDUAN = item.TENDUAN;
		that.TENHOPDONG = item.TENHOPDONG;
		that.TENDONVI = item.TENDONVI;
		that.MATIENTE = item.MATIENTE;
	}
	this.getByNam = function (iNam) {
		var rs = DATA.get(URL.GETBYNAM, { NAMKEHOACH: iNam });
		that.LIST = rs
	}
	this.getHanMucDuNo = function (iNam, iDuanid, iHopdongvaylaiid) {
		var data = {
			NAMKEHOACH: Number(iNam),
			DUANID: Number(iDuanid),
			HOPDONGVAYLAIID: Number(iHopdongvaylaiid)
		}
		return DATA.get(URL.GETHANMUCDUNO, data);
	}
	this.getHanMucDuNo1 = function (iDuanid, iHopdongvaylaiid) {
		var data = {
			DUANID: Number(iDuanid),
			HOPDONGVAYLAIID: Number(iHopdongvaylaiid)
		}
		return DATA.get(URL.GETHANMUCDUNO1, data);
	}
	this.getHanMucCapPhat = function (iDuanid) {
		return DATA.get(URL.GETHANMUCCAPPHAT, { DUANID: iDuanid });
	}
	this.getByIdCha = async function (sMa) {
		this.reSetDetail()
		const ketqua_detail = await DATA.get(URL.GETBYIDCHA, { MA: sMa });
		if (ketqua_detail[0]) {
			var arr_key_detail = Object.keys(ketqua_detail[0])
			ketqua_detail.map((value_keydetail, index_detail) => {
				this.loadDetail(value_keydetail, index_detail, arr_key_detail)
				if (Number(value_keydetail.SOTIENVAY) > 0) {
					$("#SOTIENVAY" + index_detail).trigger('keyup')
				}
				if (Number(value_keydetail.SOTIENCAPPHAT) > 0) {
					$("#SOTIENCAPPHAT" + index_detail).trigger('keyup')
				}
			})
		}
	}
	this.getByIdChaDuToan = async function (sMa) {
		this.reSetDetailDuToan()
		const ketqua_detail = await DATA.get(URL.GETBYIDCHA, { MA: sMa });
		if (ketqua_detail[0]) {
			var arr_key_detail = Object.keys(ketqua_detail[0])
			ketqua_detail.map((value_keydetail, index_detail) => {
				this.loadDetailDuToan(value_keydetail, index_detail, arr_key_detail)
			})

		}
	}
	this.loadDetail = async function (value_row, id, arr_key_detail) {
		var elemnts = ''
		var oDonvitiente = new DonViTienTe()
		oDonvitiente.getAll()
		var olistTiente = oDonvitiente.LIST
		var optionTiente = ''
		olistTiente.map((value_tt, index_tt) => {
			optionTiente = optionTiente + '<option data-tygia="' + value_tt.BANRA + '" value="' + value_tt.TIENTEID + '"' + (index_tt === 0 ? ' selected' : '') + '>' + value_tt.MA + '</option>'
		})
		var selectTiente = '<select class = "DONVITIENTE" id="DONVITIENTE' + id + '" data-index="' + id + '">' + optionTiente + '</select>'
		var selectTienteCP = '<select class = "DONVITIENTECP" id="DONVITIENTECP' + id + '" data-index="' + id + '">' + optionTiente + '</select>'
		var selectNguonvon = '<select class="NGUONVAY" id="NGUONVAY' + id + '" data-index="' + id + '">' +
			'<option value="ODA" selected >Vay ODA/Ưu đãi</option>' +
			'<option value="TP">Trái phiếu</option>' +
			'<option value="NQ">Ngân quỹ</option>' +
			'<option value="DT">Dự trữ cấp tỉnh</option>' +
			'<option value="VDB">Ngân hàng VDB</option>' +
			'<option value="TCTD">Tổ chức TC, TD</option>' +
			'</select>'
		elemnts = '<tr class="input-table" id="element-' + id + '"><td>' + selectNguonvon + '</td>\
		<td><input type="text" class="PHUONGANVAY" id="PHUONGANVAY' + id + '"></td>\
		<td><input type="text" class="SOTIENVAY" id="SOTIENVAY' + id + '" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" data-type="currency" style="text-align: right;"></td>\
		<td>' + selectTiente + '</td>\
		<td><input type="text" class="SOTIENCAPPHAT" id="SOTIENCAPPHAT' + id + '" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" data-type="currency" style="text-align: right;"></td>\
		<td>' + selectTienteCP + '</td>\
		<td><input type="text" disabled style="background-color: #EEEEEE; text-align: right;" class="NGUYENTEVAY" id="NGUYENTEVAY' + id + '"></td>\
		<td><input type="text" disabled style="background-color: #EEEEEE; text-align: right;" class="NGUYENTECAPPHAT" id="NGUYENTECAPPHAT' + id + '"></td>\
		<td><input type="text" style="text-align: right;" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" data-type="currency" class="KHOILUONGPHATHANH" id="KHOILUONGPHATHANH' + id + '"></td>\
		<td><input type="text" class="CHIPHIHUYDONG" id="CHIPHIHUYDONG' + id + '" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" data-type="currency" style="text-align: right;"></td>\
		<td><button class="btn btn-danger button-clear" id="element-' + id + '">Xóa</button></td></tr>';
		$('#table-multi').append(elemnts)
		let cochetaichinh = $("#DUANID option:selected").attr('data-cochetaichinh')
		if (cochetaichinh.includes('HH') == true || cochetaichinh.includes('VL') == true) {
			$(".SOTIENVAY").css('background-color', '#FFFFFF');
			$(".SOTIENCAPPHAT").css('background-color', '#FFFFFF');
			$(".DONVITIENTE").css('background-color', '#FFFFFF');
			$(".DONVITIENTECP").css('background-color', '#FFFFFF');
			$(".SOTIENVAY").prop("disabled", false);
			$(".SOTIENCAPPHAT").prop("disabled", false);
			$(".DONVITIENTE").prop("disabled", false);
			$(".DONVITIENTECP").prop("disabled", false);
		} else {
			$(".SOTIENVAY").prop("disabled", true);
			$(".DONVITIENTE").prop("disabled", true);
			$(".SOTIENVAY").css('background-color', '#EEEEEE')
			$(".DONVITIENTE").css('background-color', '#EEEEEE')
			$(".SOTIENCAPPHAT").prop("disabled", true);
			$(".DONVITIENTECP").prop("disabled", true);
			$(".SOTIENCAPPHAT").css('background-color', '#EEEEEE')
			$(".DONVITIENTECP").css('background-color', '#EEEEEE')
		}
		if (cochetaichinh.includes('VL') == true) {
			$(".SOTIENVAY").css('background-color', '#FFFFFF')
			$(".DONVITIENTE").css('background-color', '#FFFFFF')
			$(".SOTIENCAPPHAT").prop("disabled", true);
			$(".DONVITIENTECP").prop("disabled", true);
			$(".SOTIENCAPPHAT").css('background-color', '#EEEEEE')
			$(".DONVITIENTECP").css('background-color', '#EEEEEE')
		}
		if (cochetaichinh.includes('CP') == true) {
			$(".SOTIENCAPPHAT").prop("disabled", false);
			$(".DONVITIENTECP").prop("disabled", false);
			$(".SOTIENCAPPHAT").css('background-color', '#FFFFFF')
			$(".DONVITIENTECP").css('background-color', '#FFFFFF')
			$(".SOTIENVAY").prop("disabled", true);
			$(".DONVITIENTE").prop("disabled", true);
			$(".SOTIENVAY").css('background-color', '#EEEEEE')
			$(".DONVITIENTE").css('background-color', '#EEEEEE')
		}
		$('body').on('change', '.NGUONVAY', function () {
			var idKHOILUONGPHATHANH = '#KHOILUONGPHATHANH' + $(this).attr('data-index')
			var idCHIPHIHUYDONG = '#CHIPHIHUYDONG' + $(this).attr('data-index')
			if ($(this).val() === 'TP') {
				$(idKHOILUONGPHATHANH).prop("disabled", false)
				$(idKHOILUONGPHATHANH).val('')
				$(idKHOILUONGPHATHANH).css('background-color', 'white')

				$(idCHIPHIHUYDONG).prop("disabled", false)
				$(idCHIPHIHUYDONG).val('')
				$(idCHIPHIHUYDONG).css('background-color', 'white')
			}
			else {
				$(idKHOILUONGPHATHANH).prop("disabled", true)
				$(idKHOILUONGPHATHANH).val('')
				$(idKHOILUONGPHATHANH).css('background-color', '#ebebe0')

				$(idCHIPHIHUYDONG).prop("disabled", true)
				$(idCHIPHIHUYDONG).val('')
				$(idCHIPHIHUYDONG).css('background-color', '#ebebe0')
			}
		})
		arr_key_detail.map(key => {
			if (key == 'DONVITIENTE') {
				$('#' + key + id).val(eval('parseInt(value_row.' + key + ')'))
			}
			else
				if (key == 'TIENCPID') {
					$('#DONVITIENTECP' + id).val(eval('parseInt(value_row.TIENCPID)'))
				}
				else
					if (key == 'PHUONGANVAY' || key == 'NGUONVAY') {
						$('#' + key + id).val(eval('value_row.' + key))
					}
					else {
						$('#' + key + id).val(eval('formatMoney(value_row.' + key + ')'))
					}
		})
		$('.NGUONVAY').map((index, value) => {
			if ($(value).val() !== 'TP') {
				$('#KHOILUONGPHATHANH' + $(value).attr('data-index')).prop("disabled", true)
				$('#KHOILUONGPHATHANH' + $(value).attr('data-index')).val('')
				$('#KHOILUONGPHATHANH' + $(value).attr('data-index')).css('background-color', '#ebebe0')
				$('#CHIPHIHUYDONG' + $(value).attr('data-index')).prop("disabled", true)
				$('#CHIPHIHUYDONG' + $(value).attr('data-index')).val('')
				$('#CHIPHIHUYDONG' + $(value).attr('data-index')).css('background-color', '#ebebe0  ')
			}
			else {
				$('#KHOILUONGPHATHANH' + $(value).attr('data-index')).prop("disabled", false)
				$('#KHOILUONGPHATHANH' + $(value).attr('data-index')).css('background-color', 'white')
				$('#CHIPHIHUYDONG' + $(value).attr('data-index')).prop("disabled", false)
				$('#CHIPHIHUYDONG' + $(value).attr('data-index')).css('background-color', 'white')
			}
		})
	}
	this.loadDetailDuToan = async function (value_row, id, arr_key_detail) {
		var elemnts = ''
		var oDonvitiente = new DonViTienTe()
		oDonvitiente.getAll()
		var olistTiente = oDonvitiente.LIST
		var optionTiente = ''
		olistTiente.map((value_tt, index_tt) => {
			optionTiente = optionTiente + '<option data-tygia="' + value_tt.BANRA + '" value="' + value_tt.TIENTEID + '"' + (index_tt === 0 ? ' selected' : '') + '>' + value_tt.MA + '</option>'
		})
		var selectTiente = '<select disabled style="background-color: #EEEEEE;" class = "DONVITIENTEDUTOAN" id="DONVITIENTEDUTOAN' + id + '" data-index="' + id + '">' + optionTiente + '</select>'
		var selectTienteCP = '<select disabled style="background-color: #EEEEEE;" class = "DONVITIENTECPDUTOAN" id="DONVITIENTECPDUTOAN' + id + '" data-index="' + id + '">' + optionTiente + '</select>'
		var selectNguonvon = '<select disabled style="background-color: #EEEEEE;" class="NGUONVAYDUTOAN" id="NGUONVAYDUTOAN' + id + '" data-index="' + id + '">' +
			'<option value="ODA" selected >Vay ODA/Ưu đãi</option>' +
			'<option value="TP">Trái phiếu</option>' +
			'<option value="NQ">Ngân quỹ</option>' +
			'<option value="DT">Dự trữ cấp tỉnh</option>' +
			'<option value="VDB">Ngân hàng VDB</option>' +
			'<option value="TCTD">Tổ chức TC, TD</option>' +
			'</select>'
		elemnts = '<tr class="input-table" id="elementdutoan-' + id + '">\
                    <td>' + selectNguonvon + '</td>\
                    <td><input type="text" class="PHUONGANVAYDUTOAN" id="PHUONGANVAYDUTOAN' + id + '" disabled style="background-color: #EEEEEE;"></td>\
                    <td><input disabled type="text" autocomplete="off" class="SOTIENVAYDUTOAN" id="SOTIENVAYDUTOAN' + id + '" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" data-type="currency" style="text-align: right; background-color: #EEEEEE"></td>\
                    <td>' + selectTiente + '</td>\
                    <td><input disabled type="text" class="SOTIENCAPPHATDUTOAN" id="SOTIENCAPPHATDUTOAN' + id + '" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" data-type="currency" style="text-align: right; background-color: #EEEEEE"></td>\
                    <td>' + selectTienteCP + '</td>\
                    <td><input type="text" disabled style="background-color: #EEEEEE; text-align: right;" class="NGUYENTEVAYDUTOAN" id="NGUYENTEVAYDUTOAN' + id + '"></td>\
                    <td><input type="text" disabled style="background-color: #EEEEEE; text-align: right;" class="NGUYENTECAPPHATDUTOAN" id="NGUYENTECAPPHATDUTOAN' + id + '"></td>\
                    <td><input type="text" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" data-type="currency" class="KHOILUONGPHATHANHDUTOAN" style="text-align: right; background-color: #EEEEEE" id="KHOILUONGPHATHANHDUTOAN' + id + '" disabled></td>\
                    <td><input type="text" class="CHIPHIHUYDONGDUTOAN" id="CHIPHIHUYDONGDUTOAN' + id + '" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" data-type="currency" style="text-align: right; background-color: #EEEEEE" disabled></td>\
                    <td id="TD'+ id + '"><input type="hidden" class="STATUS" id="STATUS' + id + '"/></td></tr>';
		$('#table-multi-dutoan').append(elemnts)
		$("#NGUONVAYDUTOAN" + id).val(value_row.NGUONVAY)
		$("#PHUONGANVAYDUTOAN" + id).val(value_row.PHUONGANVAY)
		$("#SOTIENVAYDUTOAN" + id).val(formatMoney(value_row.SOTIENVAY))
		$("#DONVITIENTEDUTOAN" + id).val(Number(value_row.DONVITIENTE))
		$("#SOTIENCAPPHATDUTOAN" + id).val(formatMoney(value_row.SOTIENCAPPHAT))
		$("#DONVITIENTECPDUTOAN" + id).val(Number(value_row.TIENCPID))
		$("#NGUYENTEVAYDUTOAN" + id).val(formatMoney(value_row.NGUYENTEVAY))
		$("#NGUYENTECAPPHATDUTOAN" + id).val(formatMoney(value_row.NGUYENTECAPPHAT))
		$("#KHOILUONGPHATHANHDUTOAN" + id).val(formatMoney(value_row.KHOILUONGPHATHANH))
		$("#CHIPHIHUYDONGDUTOAN" + id).val(formatMoney(value_row.CHIPHIHUYDONG))
		$("#STATUS" + id).val(value_row.STATUS) 
		if (Number(value_row.STATUS) == 1 && apr >= 0) {
			$("#TD" + id).append('<button style=" font-size: 14px; padding: 3px !important; float: left "  class= "btn btn-success btnApproved" id="btnApproved' + id + '" title="Phê duyệt"><i class="fa fa-check"></i> </button><button  class= "btn btn-danger btnRejected" style=" font-size: 14px; padding: 3px !important;" id="btnRejected' + id + '" title="Từ chối"> <i class="fa fa-times"></i> </button>')
			$("#elementdutoan" + id).css('display', 'none')
		}
	}
	this.reSetDetail = function () {
		$('#table-multi').html('')
	}
	this.reSetDetailDuToan = function () {
		$('#table-multi-dutoan').html('')
	}
	// get data with keyword
	this.search = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}
	this.searchkehoachvayhangnam = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}
	//save data
	this.save = function () {
		var data = {
			KEHOACHVAYHANGNAMID: this.KEHOACHVAYHANGNAMID,
			MA: this.MA,
			TEN: this.TEN,
			NAMKEHOACH: this.NAMKEHOACH,
			DONVIID: this.DONVIID,
			HANMUCVAY: this.HANMUCVAY,
			HANMUCCAPPHAT: this.HANMUCCAPPHAT,
			SOTIENVAY: this.SOTIENVAY,
			SOTIENCAPPHAT: this.SOTIENCAPPHAT,
			DUNOVAY: this.DUNOVAY,
			DUNOCAPPHAT: this.DUNOCAPPHAT,
			TRANOGOC: this.TRANOGOC,
			NGHIAVUTRANO: this.NGHIAVUTRANO,
			DUKIENNGUONTRA: this.DUKIENNGUONTRA,
			DUANID: this.DUANID,
			HOPDONGVAYLAIID: this.HOPDONGVAYLAIID,
			BUDAPBOICHI: this.BUDAPBOICHI,
			UID: this.UID
		}
		return DATA.set(URL.SAVE, data);
	}

	this.savedtl = function (pDelete, pData) {
		var dataDtl = {
			delete: pDelete,
			giatri: pData,
		}
		return DATA.set(URL.SAVEDETAIL, dataDtl);
	}

	//delete data
	this.del = function (sID) {
		return DATA.set(URL.DEL, { KEHOACHVAYHANGNAMID: sID });
	}
	this.deluid = function (sID) {
		return DATA.set(URL.DELUID, { KEHOACHVAYHANGNAMID: sID });
	}
	this.delete = function (sID) {
		return DATA.set(URL.DEL, { KEHOACHVAYHANGNAMID: sID });
	}
	this.sendApprove = function (sID) {
		return DATA.set(URL.SENDAPPROVE, { ID: sID });
	}
	this.approve = function (sID) {
		return DATA.set(URL.APPROVE, { ID: sID });
	}
	this.reject = function (sID) {
		return DATA.set(URL.REJECT, { ID: sID });
	}
	this.getDotRutVonByKeHoach = function (id) {
		var rs = DATA.get(URL.getAllDotRutVon, { id_kehoachvay: Number(id) });
		return rs;
	}
	this.getnttbyid = function (sKey) {
		var rs = DATA.get(URL.GETNTTBYID, { key: sKey });
		return rs
	}
	this.getnhataitro = function (sKey) {
		var rs = DATA.get(URL.GETNHATAITRO, { key: sKey });
		return rs
	}
	this.getDuToan = function (sID) {
		var rs = DATA.get(URL.GETDUTOAN, { KEHOACHVAYHANGNAMID: sID });
		return rs
	}
	this.getApprove = function (sID) {
		var rs = DATA.get(URL.GETAPPROVE, { KEHOACHVAYHANGNAMID: sID });
		return rs
	}
	this.update_approve = function (sKey, i) {
		var rs = DATA.set(URL.UPDATE_APPROVE, { key: sKey, id: i });
		return rs
	}
	this.updateApprove = function (sID) {
		var rs = DATA.set(URL.UPDATE_STATUS_APPROVE, { KEHOACHVAYHANGNAMID: sID });
		return rs
	}
	this.updateApproved = function (sID, i) {
		var rs = DATA.set(URL.UPDATE_STATUS_APPROVED, { KEHOACHVAYHANGNAMID: sID, NUMBER: i });
		return rs
	}
	this.updateSoTien = function (ma, sotienvay, sotiencapphat) {
		var rs = DATA.set(URL.UPDATE_SOTIEN, { MA: ma, SOTIENVAY: sotienvay, SOTIENCAPPHAT: sotiencapphat });
		return rs
	}
	this.getCoCheTaiChinh = function (sID) {
		var rs = DATA.set(URL.GETCOCHETAICHINH, { KEHOACHVAYHANGNAMID: sID });
		return rs
	}
}