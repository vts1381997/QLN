var HopDongVayLai = function () {
	var that = this;

	const URL = {
		GETALL: CONFIG_API.URL.BASE_API + 'qln_hopdongvaylai/getall',
		GETBYID: CONFIG_API.URL.BASE_API + 'qln_hopdongvaylai/getbyid',
		GETBYIDCHA: CONFIG_API.URL.BASE_API + 'qln_hopdongvaylai/getbyidcha',
		GETBYDUANID: CONFIG_API.URL.BASE_API + 'qln_hopdongvaylai/getbyduanid',
		SEARCH: CONFIG_API.URL.BASE_API + 'qln_hopdongvaylai/search',
		SAVE: CONFIG_API.URL.BASE_API + 'qln_hopdongvaylai/save',
		DEL: CONFIG_API.URL.BASE_API + 'qln_hopdongvaylai/del',
		DELUID: CONFIG_API.URL.BASE_API + 'qln_hopdongvaylai/deluid',
		SAVEDETAIL: CONFIG_API.URL.BASE_API + 'qln_kehoachvayhangnam_dtl/save',
		gethd: CONFIG_API.URL.BASE_API + 'qln_hopdongvaylai/gethd',
		searchhopdongvaylai: CONFIG_API.URL.USER_API + 'search/hopdongvaylai',
		getAllGocLaiDotTraNo: CONFIG_API.URL.BASE_API + 'qln_hopdongvaylai/getall_goclai',
	}

	this.HOPDONGVAYLAIID = 0;
	this.MA = "";
	this.TEN = "";
	this.NGAYKY = "";
	this.COQUANUYQUYENVAYLAI = "";
	this.TIENKYVAY = 0;
	this.LAISUATVAY = 0;
	this.NGAYHIEULUC = "";
	this.NGAYTRANOGOCDAUTIEN = "";
	this.NGAYTRANOLAIDAUTIEN = "";
	this.NGAYTRANOGOCCUOICUNG = "";
	this.NGAYTRANOLAICUOICUNG = "";
	this.PHUONGTHUCTRANOGOC = 0;
	this.PHUONGTHUCTRANOLAI = 0;
	this.TIENLAIPHAT = 0;
	this.SOHIEPDINHVAYNN = "";
	this.TIENPHIHIEPDINHVAYNN = 0;
	this.TIENPHIQUANLYCHOVAYLAI = 0;
	this.LOAILAISUAT = 0;
	this.GHICHU = "";
	this.DONVIID = 0;
	this.DUANID = 0;
	this.TIENTEID = 0;
	this.STATUS = 0;
	this.NOTE = "";
	this.CREATEDDATE = "";
	this.CREATEDBY = "";
	this.UPDATEDDATE = "";
	this.UPDATEDBY = "";
	this.SOTIENCAPPHAT = 0;
	this.MAPHULUC = "";
	this.TENPHULUC = "";
	this.NGAYKYPHULUC = "";
	this.NGUOIKY = "";
	this.TIENTEIDCP = 0
	this.UID = ""
	this.TYGIA = ''
	// Get all data
	this.getAll = function () {
		var rs = DATA.get(URL.GETALL);

		that.LIST = rs;
	}
	this.gethd = function () {
		var rs = DATA.get(URL.gethd);

		that.LIST = rs;
	}

	// get data by id
	this.getById = function (sId) {
		var rs = DATA.get(URL.GETBYID, { HOPDONGVAYLAIID: sId });
		var item = rs[ 0 ];
		that.HOPDONGVAYLAIID = item.HOPDONGVAYLAIID;
		that.MA = item.MA;
		that.TEN = item.TEN;
		that.NGAYKY = item.NGAYKY;
		that.COQUANUYQUYENVAYLAI = item.COQUANUYQUYENVAYLAI;
		that.TIENKYVAY = item.TIENKYVAY;
		that.LAISUATVAY = item.LAISUATVAY;
		that.NGAYHIEULUC = item.NGAYHIEULUC;
		that.NGAYTRANOGOCDAUTIEN = item.NGAYTRANOGOCDAUTIEN;
		that.NGAYTRANOLAIDAUTIEN = item.NGAYTRANOLAIDAUTIEN;
		that.NGAYTRANOGOCCUOICUNG = item.NGAYTRANOGOCCUOICUNG;
		that.NGAYTRANOLAICUOICUNG = item.NGAYTRANOLAICUOICUNG;
		that.PHUONGTHUCTRANOGOC = item.PHUONGTHUCTRANOGOC;
		that.PHUONGTHUCTRANOLAI = item.PHUONGTHUCTRANOLAI;
		that.TIENLAIPHAT = item.TIENLAIPHAT;
		that.SOHIEPDINHVAYNN = item.SOHIEPDINHVAYNN;
		that.TIENPHIHIEPDINHVAYNN = item.TIENPHIHIEPDINHVAYNN;
		that.TIENPHIQUANLYCHOVAYLAI = item.TIENPHIQUANLYCHOVAYLAI;
		that.LOAILAISUAT = item.LOAILAISUAT;
		that.GHICHU = item.GHICHU;
		that.DONVIID = item.DONVIID;
		that.DUANID = item.DUANID;
		that.TIENTEID = item.TIENTEID;
		that.STATUS = item.STATUS;
		that.NOTE = item.NOTE;
		that.CREATEDDATE = item.CREATEDDATE;
		that.CREATEDBY = item.CREATEDBY;
		that.UPDATEDDATE = item.UPDATEDDATE;
		that.UPDATEDBY = item.UPDATEDBY;
		that.SOTIENCAPPHAT = item.SOTIENCAPPHAT;
		that.MAPHULUC = item.MAPHULUC;
		that.TENPHULUC = item.TENPHULUC;
		that.NGAYKYPHULUC = item.NGAYKYPHULUC;
		that.NGUOIKY = item.NGUOIKY;
		return rs;
	}

	this.getByIdCha = async function (sMa) {
		this.reSetDetail();
		const ketqua_detail = await DATA.get(URL.GETBYIDCHA, { MA: sMa });
		if (ketqua_detail[ 0 ]) {
			var arr_key_detail = Object.keys(ketqua_detail[ 0 ])
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
		var option = '<tr class="input-table" id="element-' + id + '"><td><input type="text" class="MAPHULUC" id="MAPHULUC' + id + '" />\
		</td><td><input type="text" class="TENPHULUC" id="TENPHULUC'+ id + '" />\
		</td><td><input type="date" class="NGAYKYPHULUC" id="NGAYKYPHULUC'+ id + '" value="' + NgayHomNay + '" />\
		</td><td><input type="text" class="NGUOIKYPHULUC" id="NGUOIKYPHULUC'+ id + '" /></td>\
		<td><button class="btn btn-danger button-clear" id="element-' + id + '">Xóa</button></td>\
		</tr>'
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
		$('#MAPHULUC' + id).val(value_row.MAPHULUC);
		$('#TENPHULUC' + id).val(value_row.TENPHULUC);
		$('#NGAYKYPHULUC' + id).val(JSON.stringify(value_row.NGAYKYPHULUC).slice(1, 11));
		$('#NGUOIKYPHULUC' + id).val(value_row.NGUOIKYPHULUC);
		// Tăng id cho lần add tiếp theo
		id++;
	}


	this.reSetDetail = function () {
		$("#table-multi").html('')
	}

	this.getByDuanId = function (sDuanId) {
		var rs = DATA.get(URL.GETBYDUANID, { DUANID: sDuanId });
		return rs;
	}

	// get data with keyword
	this.search = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}

	this.searchhopdongvaylai = function (sKey) {
		var rs = DATA.get(URL.SEARCH, { key: sKey });
		that.LIST = rs;
	}

	//save data
	this.save = function () {
		var data = {
			HOPDONGVAYLAIID: that.HOPDONGVAYLAIID,
			MA: that.MA,
			TEN: that.TEN,
			NGAYKY: that.NGAYKY,
			COQUANUYQUYENVAYLAI: that.COQUANUYQUYENVAYLAI,
			TIENKYVAY: that.TIENKYVAY,
			LAISUATVAY: that.LAISUATVAY,
			NGAYHIEULUC: that.NGAYHIEULUC,
			NGAYTRANOGOCDAUTIEN: that.NGAYTRANOGOCDAUTIEN,
			NGAYTRANOLAIDAUTIEN: that.NGAYTRANOLAIDAUTIEN,
			NGAYTRANOGOCCUOICUNG: that.NGAYTRANOGOCCUOICUNG,
			NGAYTRANOLAICUOICUNG: that.NGAYTRANOLAICUOICUNG,
			PHUONGTHUCTRANOGOC: that.PHUONGTHUCTRANOGOC,
			PHUONGTHUCTRANOLAI: that.PHUONGTHUCTRANOLAI,
			TIENLAIPHAT: that.TIENLAIPHAT,
			SOHIEPDINHVAYNN: that.SOHIEPDINHVAYNN,
			TIENPHIHIEPDINHVAYNN: that.TIENPHIHIEPDINHVAYNN,
			TIENPHIQUANLYCHOVAYLAI: that.TIENPHIQUANLYCHOVAYLAI,
			LOAILAISUAT: that.LOAILAISUAT,
			DONVIID: that.DONVIID,
			DUANID: that.DUANID,
			TIENTEID: that.TIENTEID,
			SOTIENCAPPHAT: that.SOTIENCAPPHAT,
			TIENTEIDCP: that.TIENTEIDCP,
			UID: that.UID,
			TYGIA: that.TYGIA
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
		return DATA.set(URL.DEL, { HOPDONGVAYLAIID: sID });	
	}
	this.deluid = function (sID) {
		return DATA.set(URL.DELUID, { UID: sID });
	}
	this.getAllGocLaiDotTraNo = (sHopDongVayLaiId) => {
		var rs = DATA.get(URL.getAllGocLaiDotTraNo, { i_hopdongvaylaiid: Number(sHopDongVayLaiId) });
		return rs
	}

}