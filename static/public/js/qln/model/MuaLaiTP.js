var MuaLaiTP = function () {
	var that = this;

	const URL = {
		GETALL: CONFIG_API.URL.BASE_API + 'qln_mualaitp/getall',
		GETBYID: CONFIG_API.URL.BASE_API + 'qln_mualaitp/getbyid',
		GETBYIDCHA: CONFIG_API.URL.BASE_API + 'qln_mualaitp/getbyidcha',
		GETMAXQUANTITY: CONFIG_API.URL.BASE_API + 'qln_mualaitp/getmaxquantity',
		SAVEDETAIL: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam_dtl/save',
		SEARCH: CONFIG_API.URL.BASE_API + 'qln_mualaitp/search',
		SAVE: CONFIG_API.URL.BASE_API + 'qln_mualaitp/save',
		DEL: CONFIG_API.URL.BASE_API + 'qln_mualaitp/del',
		searchmualaitp:CONFIG_API.URL.USER_API+'search/mualaitp',
		DELUID: CONFIG_API.URL.BASE_API + 'qln_mualaitp/deluid',


	}

	this.MUALAITRAIPHIEUID = 0;
	this.MA = "";
	this.TEN = "";
	this.NGAYCUOIDANGKY = "";
	this.NGAYPHONGTOA = "";
	this.NGAYTOCHUCMUA = "";
	this.NGAYMUALAI = "";
	this.PHUONGTHUCMUA = "";
	this.CHUSOHUUTP = "";
	this.TINHTHANHID = 0;
	this.DEANPHATHANHTRAIPHIEUID = "";
	this.TOCHUCMUALAI = "";
	this.TONGSOTIENMUALAI = 0;
	this.GIA = 0;
	this.LAISUAT = 0;
	this.KHOILUONGMUALAI = 0;
	this.STATUS = 0;
	this.CREATEDDATE = "";
	this.CREATEDBY = "";
	this.UPDATEDDATE = "";
	this.UPDATEDBY = "";
	this.UUID=''
	// Get all data
	this.getAll = function () {
		var rs = DATA.get(URL.GETALL);
		that.LIST = rs;
	}

	// get data by id
	this.getById = function (sId) {
		var rs = DATA.get(URL.GETBYID, { MUALAITRAIPHIEUID: sId });
		var item = rs[0];
		that.MUALAITRAIPHIEUID = item.MUALAITRAIPHIEUID;
		that.MA = item.MA;
		that.TEN = item.TEN;
		that.NGAYCUOIDANGKY = item.NGAYCUOIDANGKY;
		that.NGAYPHONGTOA = item.NGAYPHONGTOA;
		that.NGAYTOCHUCMUA = item.NGAYTOCHUCMUA;
		that.NGAYMUALAI = item.NGAYMUALAI;
		that.PHUONGTHUCMUA = item.PHUONGTHUCMUA;
		that.CHUSOHUUTP = item.CHUSOHUUTP;
		that.TINHTHANHID = item.TINHTHANHID;
		that.DEANPHATHANHTRAIPHIEUID = item.DEANPHATHANHTRAIPHIEUID;
		that.TOCHUCMUALAI = item.TOCHUCMUALAI;
		that.TONGSOTIENMUALAI = item.TONGSOTIENMUALAI;
		that.GIA = item.GIA;
		that.LAISUAT = item.LAISUAT;
		that.KHOILUONGMUALAI = item.KHOILUONGMUALAI;
		that.STATUS = item.STATUS;
		that.CREATEDDATE = item.CREATEDDATE;
		that.CREATEDBY = item.CREATEDBY;
		that.UPDATEDDATE = item.UPDATEDDATE;
		that.UPDATEDBY = item.UPDATEDBY;
	}
	this.getMaxQuantity = function(data){
		var rs = DATA.get(URL.GETMAXQUANTITY, data);
		return rs
	}
	this.getByIdDetail = function (sMa) {
		var rs = DATA.get(URL.GETBYIDCHA, { MA: sMa });
		that.LIST = rs;
	}

	this.getByIdCha = async function (sMa) {
		this.reSetDetail();
		const ketqua_detail = await DATA.get(URL.GETBYIDCHA, { MA: sMa });
		fnc_loadChiTietTheoDeAn();
		if (ketqua_detail[0]) {
			var arr_key_detail = Object.keys(ketqua_detail[0])
			// Lấy dữ liệu option
			// Lặp dữ liệu đã có và fill ra màn hình gridview
			ketqua_detail.map((value_keydetail, index_detail) => {
				// Vẽ thêm một dòng dữ liệu
				this.loadDetail(value_keydetail, index_detail, arr_key_detail)
				// Gọi hàm nhảy xuống dưới danh sách

			})
		}
	}
	this.loadDetail = async function (value_row, id, arr_key_detail) {
		// Lấy dữ liệu các chủ sở hữu		
		var vOptionTochuc = fnc_getOptionTochucTheoDotPhatHanh(value_row.DOTPHATHANHTRAIPHIEUID);
		// Lấy dữ liệu mệnh giá theo tổ chức
		var vOptionMenhGia = fnc_getOptionMenhGiaTheoDotPhatHanhVaToChuc(value_row.DOTPHATHANHTRAIPHIEUID, value_row.TOCHUC);
		var selectToChuc = '<select class = "TOCHUC" id="TOCHUC' + id + '" data-index="' + id + '">' + vOptionTochuc + '</select>'
		var selectDotPhatHanh = '<select style="width: 150px;" class = "DOTPHATHANH" id="DOTPHATHANH' + id + '" data-index="' + id + '">' + optionDotPhatHanh + '</select>'
		var option = '<tr class="input-table" id="element-' + id + '"><td><label class="stt">' + (Number(id) + 1) + '</label></td><td>' + selectDotPhatHanh + '</td><td>'
			+ selectToChuc + '</td><td><input style="text-align: right; width: 90px" type="text" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"\
				  data-type="currency" value="" onkeyup="fnc_onKeyUpKhoiLuong($(this))" onfocus="fnc_focus_luugiatricu($(this))"\
				   class="SOLUONG" id="SOLUONG' + id + '" /></td><td><select style="width: 90px" class="GIA" id="GIA' + id + '" data-index="' + id + '">' + vOptionMenhGia + '</select></td><td><input disabled type="text" style="width: 100px" class="TIEN NUMBER_DISABLED"\
					 id="TIEN' + id + '" /></td><td><input disabled type="text" style="width: 100px" class="TIENMUALAI NUMBER_DISABLED" id="TIENMUALAI' + id + '" /></td><td><input type="date" style="width:140px" class="NGAYMUA" id="NGAYMUA' + id + '" value="' + NgayHomNay + '" />\
					 </td><td><input type="date" style="width:140px" class="NGAYPHONGTOA" id="NGAYPHONGTOA' + id + '" value="' + NgayHomNay + '" /></td>\
					 <td><input type="text" class="GHICHU" id="GHICHU' + id + '" /></td><td style="text-align: center"><button class="btn btn-danger button-clear"\
					  id="element-' + id + '">Xóa</button></td></tr>';
		$('#table-multi').append(option)
		var ypos = $('#hdScrolltbl-1 table tr').offset().top;
		$('#hdScrolltbl-1').animate({
			scrollTop: $('#hdScrolltbl-1').scrollTop() + ypos
		}, 500);
		var my = setInterval(() => {
			$('#hdtbl-1') ? $('#hdtbl-1').css('top', '') : () => {
				return
			};
		}, 10);

		// Fill dữ liệu chi tiết
		$('#DOTPHATHANH' + id).val(value_row.DOTPHATHANHTRAIPHIEUID);
		$('#TOCHUC' + id).val(value_row.TOCHUC);
		$('#SOLUONG' + id).val(value_row.SOLUONG);
		$('#GIA' + id).val(value_row.MENHGIA);
		$('#NGAYMUA' + id).val(JSON.stringify(value_row.NGAYMUA).slice(1, 11));
		$('#NGAYPHONGTOA' + id).val(JSON.stringify(value_row.NGAYPHONGTOA).slice(1, 11));
		$('#GHICHU' + id).val(value_row.GHICHU);
		$('#SOLUONG' + id).trigger('keyup');
		// Tăng id cho lần add tiếp theo
		id++;
	}


	this.reSetDetail = function () {
		$("#table-multi").html('')
	}

	// get data with keyword
	this.search = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}

	this.searchmualaitp = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}


	//save data
	this.save = function () {
		var data = {
			MUALAITRAIPHIEUID: that.MUALAITRAIPHIEUID,
			MA: that.MA,
			TEN: that.TEN,
			NGAYCUOIDANGKY: that.NGAYCUOIDANGKY,
			NGAYTOCHUCMUA: that.NGAYTOCHUCMUA,
			PHUONGTHUCMUA: that.PHUONGTHUCMUA,
			DEANPHATHANHTRAIPHIEUID: that.DEANPHATHANHTRAIPHIEUID,
			TONGSOTIENMUALAI: that.TONGSOTIENMUALAI,
			GIA: that.GIA,
			LAISUAT: that.LAISUAT,
			KHOILUONGMUALAI: that.KHOILUONGMUALAI,
			UUID:that.UUID
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
		return DATA.set(URL.DEL, { MUALAITRAIPHIEUID: sID });
	}
	this.deluid = function (sID) {
		return DATA.set(URL.DELUID, { MUALAITRAIPHIEUID: sID });
	}

}