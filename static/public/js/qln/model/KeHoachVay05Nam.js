var KeHoachVay05Nam = function () {
	var that = this;

	const URL = {
		GETALL: CONFIG_API.URL.BASE_API + 'qln_kehoachvay5nam/getall',
		GETBYID: CONFIG_API.URL.BASE_API + 'qln_kehoachvay5nam/getbyid',
		GETBYIDCHA: CONFIG_API.URL.BASE_API + 'qln_kh5ndtl/getbyidcha',
		SEARCH: CONFIG_API.URL.BASE_API + 'qln_kehoachvay5nam/search',
		SAVE: CONFIG_API.URL.BASE_API + 'qln_kehoachvay5nam/save',
		DEL: CONFIG_API.URL.BASE_API + 'qln_kehoachvay5nam/del',
		DELUID: CONFIG_API.URL.BASE_API + 'qln_kehoachvay5nam/deluid',
		getAllTinhThanh: CONFIG_API.URL.BASE_API + 'dm_tinhthanh/getall',
		getALLTienTe: CONFIG_API.URL.BASE_API + 'dm_tiente/getall',
		SAVEDETAIL: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam_dtl/save',
	}

	this.KEHOACHVAY5NAMID = 0;
	this.MA = "";
	this.TEN = "";
	this.NAMBATDAU = 0;
	this.NAMKETTHUC = 0;
	this.NGAYQUYETDINH = "";
	this.HANMUCVAY = 0;
	this.DUNOVAY = 0;
	this.DONVIID = 0;
	this.STATUS = 0;
	this.CREATEDDATE = "";
	this.CREATEDBY = "";
	this.UPDATEDDATE = "";
	this.UPDATEDBY = "";
	this.DUKIENVAY = "";
	this.DUKIENTRANO = "";

	// Get all data
	this.getAll = function () {
		var rs = DATA.get(URL.GETALL);
		that.LIST = rs;
	}

	// get data by id
	this.getById = function (sId) {
		var rs = DATA.get(URL.GETBYID, { KEHOACHVAY5NAMID: sId });
		var item = rs[0];
		that.KEHOACHVAY3NAMID = item.KEHOACHVAY5NAMID;
		that.MA = item.MA;
		that.TEN = item.TEN;
		that.NAMBATDAU = item.NAMBATDAU;
		that.NAMKETTHUC = item.NAMKETTHUC;
		that.NGAYQUYETDINH = item.NGAYQUYETDINH;
		that.HANMUCVAY = item.HANMUCVAY;
		that.DUNOVAY = item.DUNOVAY;
		that.DONVIID = item.DONVIID;
		that.STATUS = item.STATUS;
		that.CREATEDDATE = item.CREATEDDATE;
		that.CREATEDBY = item.CREATEDBY;
		that.UPDATEDDATE = item.UPDATEDDATE;
		that.UPDATEDBY = item.UPDATEDBY;
		that.DUKIENVAY = item.DUKIENVAY;
		that.DUKIENTRANO = item.DUKIENTRANO;
	}
	this.getByIdCha = async function (sMa) {
		this.reSetDetail()
		const ketqua_detail = await DATA.get(URL.GETBYIDCHA, { MA: sMa });
		if (ketqua_detail[0]) {
			var arr_key_detail = Object.keys(ketqua_detail[0])
			ketqua_detail.map((value_keydetail, index_detail) => {
				this.loadDetail(value_keydetail, index_detail, arr_key_detail)
			})
		}
	}
	this.loadDetail = async function (value_row, id, arr_key_detail) {
		var selectNam = '<select class="NAM" id="NAM' + id + '" data-index="' + id + '">' +
			'<option value="NAM1" selected >Năm thứ nhất</option>' +
			'<option value="NAM2">Năm thứ hai</option>' +
			'<option value="NAM3">Năm thứ ba</option>' +
			'<option value="NAM4">Năm thứ tư</option>' +
			'<option value="NAM5">Năm thứ năm</option>' +
			'</select>'
		var selectNguonvon = '<select class="NGUONVAY" id="NGUONVAY' + id + '" data-index="' + id + '">' +
			'<option value="VAYODA" selected >Vay ODA</option>' +
			'<option value="VAYUUDAI">Vay ưu đãi</option>' +
			'<option value="VAYTRAIPHIEU">Vay trái phiếu CQĐP</option>' +
			'<option value="VAYKHAC">Vay khác</option>' +
			'</select>'
		var elemnt = '<tr class="input-table" id="element-' + id + '"><td>' + selectNam + '</td><td>' + selectNguonvon + '</td><td><input type="text" style="text-align: right" class="SOTIENVAY" id="SOTIENVAY' + id + '" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency"></td><td><input type="text" style="text-align: right" class="SOTIENTRA" id="SOTIENTRA' + id + '" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" value="" data-type="currency"></td><td><input type="text" class="NGUONTRA" id="NGUONTRA' + id + '"></td><td><input type="text" class="GHICHU" id="GHICHU' + id + '"></td><td style="text-align: center"><button class="btn btn-danger button-clear" id="element-' + id + '">Xóa</button></td></tr>';
		$('#table-multi').append(elemnt)
		$("input[data-type='currency']").on({
			keyup: function () {
				formatCurrency($(this));
			},
			blur: function () {
				formatCurrency($(this), "blur");
			}
		});
		function formatNumber(n) {
			return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		}
		function formatCurrency(input, blur) {
			var input_val = input.val();
			if (input_val === "") { return; }
			var original_len = input_val.length;
			var caret_pos = input.prop("selectionStart");
			if (input_val.indexOf(".") >= 0) {
				var decimal_pos = input_val.indexOf(".");
				var left_side = input_val.substring(0, decimal_pos);
				var right_side = input_val.substring(decimal_pos);
				left_side = formatNumber(left_side);
				right_side = formatNumber(right_side);
				if (blur === "blur") {
					right_side += "";
				}
				right_side = right_side.substring(0, 2);
				input_val = "" + left_side + "." + right_side;
			} else {
				input_val = formatNumber(input_val);
				input_val = "" + input_val;
				if (blur === "blur") {
					input_val += "";
				}
			}
			input.val(input_val);
			var updated_len = input_val.length;
			caret_pos = updated_len - original_len + caret_pos;
			input[0].setSelectionRange(caret_pos, caret_pos);
		}
		arr_key_detail.map(key => {
			if (key == "SOTIENVAY" || key == "SOTIENTRA")
				$('#' + key + id).val(formatMoney(eval('value_row.' + key)))
			else
				$('#' + key + id).val(eval('value_row.' + key))
		})
	}
	this.reSetDetail = function () {
		$('#table-multi').html('')
	}
	// get data with keyword
	this.search = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}

	this.searchkehoachvay5nam = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}

	//save data
	this.save = function () {
		var data = {
			KEHOACHVAY5NAMID: this.KEHOACHVAY5NAMID,
			MA: this.MA,
			TEN: this.TEN,
			NAMBATDAU: this.NAMBATDAU,
			NAMKETTHUC: this.NAMKETTHUC,
			NGAYQUYETDINH: this.NGAYQUYETDINH,
			HANMUCVAY: this.HANMUCVAY,
			DUNOVAY: this.DUNOVAY,
			DONVIID: this.DONVIID,
			DUKIENVAY: this.DUKIENVAY,
			DUKIENTRANO: this.DUKIENTRANO,
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
		return DATA.set(URL.DEL, { KEHOACHVAY5NAMID: sID });
	}
	this.deluid = function (sID) {
		return DATA.set(URL.DELUID, { KEHOACHVAY5NAMID: sID });
	}

}