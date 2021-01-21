var NguoiDungView = function () {
	var idd = ''
	var that = this;
	this.AppTitle = 'Người dùng';
	this.Id = '';
	this.oTable = null;
	this.oDialog = null;
	var menuInDB = []
	var userchecked = []
	var listt = {}
	var idnd = ''
	var oNguoiDung = new NguoiDung();
	var BMBaoCao = new BieuMauBaoCao()

	var listTinhthanh = []
	var list_tt = oNguoiDung.getTinhThanh(jwt.tinhthanh);

	var $Tinhthanh = $("#TINHTHANHID").select2();

	var listlevel = oNguoiDung.getlv();
	var optionlv = ''
	BMBaoCao.getAll()

	function removeDuplicates(originalArray, prop) {
		var newArray = [];
		var lookupObject  = {};
   
		for(var i in originalArray) {
		   lookupObject[originalArray[i][prop]] = originalArray[i];
		}
   
		for(i in lookupObject) {
			newArray.push(lookupObject[i]);
		}
		 return newArray;
	}

	// listlevel.map(valu => {
	// 	optionlv = optionlv + "<option value='" + valu.LVL + "'>" + valu.TENLV + "</option>"
	// })
	// console.log('000000000000000',listlevel)
	// $("#LEVEL").html(optionlv)

	this.init = function () {
		$('#AppTitle').html(that.AppTitle);
		that.filterAction('NEW');
		that.bindGrid01();
	}

	this.filterAction = function (sState) {
		switch (sState) {
			case 'NEW':
				ControlHelper.Input.disable(['#btnEdit', '#btnResetpassword', '#btnSave', '#btnDelete', '#btnPhanQuyen', '#btnCancel']);
				ControlHelper.Input.enable(['#btnAddNew']);
				break;
			case 'SELECT':
				ControlHelper.Input.enable(['#btnEdit', '#btnResetpassword', '#btnCancel', '#btnPhanQuyen', '#btnDelete']);
				break;
			case 'EDIT':
				ControlHelper.Input.disable(['#btnEdit', '#btnAddNew']);
				ControlHelper.Input.enable(['#btnSave', '#btnCancel', '#btnDelete']);
				break;
			default:
				break;
		}
	}

	this.bindModal = function () {
		$(".sim-tree li").css('margin-left', '30px')
		$('#treeMenu').html('')
		$('#treeChucnang').html('')
		$('#treeBC').html('') 
		let obj = []
		let nd = []
		let roledata = []
		oNguoiDung = new NguoiDung();
		nd = oNguoiDung.getRole()
		// nd = oNguoiDung.getClaim(jwt.id).role
		userchecked = oNguoiDung.getClaim(idd).RESULT;
		userchecked1 = oNguoiDung.getClaim(jwt.id).RESULT;
		if (jwt.userName == 'trungnq94') {
			menuInDB = oNguoiDung.getMenu()
		}
		else {
			menuInDB = jwt.menu;
		}
		roledata = oNguoiDung.getClaim(idd).role
		// roledata = jwt.role
		if (userchecked.length > 0) {
			for (var i = 0; i < menuInDB.length; i++) {
				let con = menuInDB[i]
				var obj2 = {}
				for (var j = 0; j < userchecked.length; j++) {
					let cha = userchecked[j]
					if (con.ID === cha.ID) {
						obj2.id = con.ID;
						obj2.pid = con.IDCHA;
						obj2.name = con.NAME;
						obj2.checked = 'checked'
					}
					else {
						obj2.id = con.ID;
						obj2.pid = con.IDCHA;
						obj2.name = con.NAME;
						//obj2.checked = ''
					}
				}
				obj.push(obj2)
			}
		}
		else {
			menuInDB.map(function (value) {
				obj.push({ id: value.ID, pid: value.IDCHA, name: value.NAME })
			})
		}
		listt.listRole = roledata.map(valu => {
			return {
				pid: valu.split('.')[0],
				value: valu.split('.')[1]
			}
		})
		listt.listMenu = userchecked.map(val => {
			return {
				id: val.ID,
				pid: val.IDCHA,
				name: val.NAME
			}
		})
		var xxx = []
		var ccc = [] 
		jwt.role.map(val => {
			xxx.push(nd.filter(a => a.pid == val.split('.')[0] && a.value == val.split('.')[1])[0])
		})
		xxx.map(valu => {
			if (ccc.indexOf(valu.pid) < 0) {
				ccc.push(valu.pid)
			}
		})
		nd.map(value => {
			if (ccc.indexOf(value.id) >= 0 && value.pid == '') {
				xxx.push(value)
			}
		})
		if (jwt.userName != 'trungnq94') {
			nd = xxx
		}
		for (i = 0; i < nd.length; i++) {
			var a = nd[i].pid + '.' + nd[i].value
			var x = roledata.indexOf(a)
			if (x >= 0) {
				nd[i].checked = 'checked'
			}
			else {
				nd[i].checked = ''
			}
		}

		simTree({
			// linkParent: false,
			childNodeAsy: false,
			el: '#treeMenu',
			data: obj,
			check: true,
			linkParent: true,
			//check: true,
			onClick: function (item) {
			},
			onChange: function (item) {
				var listpid = []
				var listid = []
				item.map(val => {
					listid.push(val.id)
					if (listpid.indexOf(val.pid) < 0) {
						listpid.push(val.pid)
					}
				})
				for (i = 0; i < listpid.length; i++) {
					if (listid.indexOf(listpid[i]) < 0) {
						var x = { id: listpid[i], pid: '' }
						item.push(x)
					}
				}
				listt.listMenu = item;
			}
		});

		var BCchecked = oNguoiDung.getbaocaobyid(idd)
		var BCchecked1 = oNguoiDung.getbaocaobyid(jwt.id)
		var BCchecked2 = oNguoiDung.getbaocao()
		var listbc = []

		if (jwt.userName == 'trungnq94') {
			BCchecked2.map(val => {
				listbc.push({ id: val.BIEUMAUBAOCAOID, pid: val.NHOMBAOCAO, name: val.TIEUDE })
			})
		}
		else {
			BCchecked1.map(val => {
				listbc.push({ id: val.BIEUMAUBAOCAOID, pid: val.NHOMBAOCAO, name: val.TIEUDE })
			})
		}

		if (listbc.filter(a => a.pid == 'QT').length > 0)
			listbc.push(
				{ id: 'QT', pid: '', name: 'Báo cáo quản trị' })
		if (listbc.filter(a => a.pid == 'ND97').length > 0)
			listbc.push(
				{ id: 'ND97', pid: '', name: 'Báo cáo theo nghị định 97' })
		if (listbc.filter(a => a.pid == 'TT80').length > 0)
			listbc.push(
				{ id: 'TT80', pid: '', name: 'Báo cáo theo thông tư 80' })
		if (listbc.filter(a => a.pid == 'KHAC').length > 0)
			listbc.push(
				{ id: 'KHAC', pid: '', name: 'Báo cáo khác' })

		// listbc.push(
		// 	{ id: 'QT', pid: '', name: 'Báo cáo quản trị' },
		// 	{ id: 'ND97', pid: '', name: 'Báo cáo theo nghị định 97' },
		// 	{ id: 'TT80', pid: '', name: 'Báo cáo theo thông tư 80' },
		// 	{ id: 'KHAC', pid: '', name: 'Báo cáo khác' }
		// )

		var objectxx = []
		if (BCchecked.length > 0) {
			for (var i = 0; i < listbc.length; i++) {
				let con = listbc[i]
				var obj2 = {}
				for (var j = 0; j < BCchecked.length; j++) {
					let cha = BCchecked[j]
					if (con.id === cha.BIEUMAUBAOCAOID) {
						obj2.id = con.id;
						obj2.pid = con.pid;
						obj2.name = con.name;
						obj2.checked = 'checked'
					}
					else {
						obj2.id = con.id;
						obj2.pid = con.pid;
						obj2.name = con.name;
						// obj2.checked = false
					}
				}
				objectxx.push(obj2)
			}
		}
		else {
			listbc.map(function (value) {
				objectxx.push({ id: value.id, pid: value.pid, name: value.name, checked: false })
			})
		}
		listt.listBaocao = BCchecked.map(val => {
			return {
				id: val.BIEUMAUBAOCAOID,
				pid: val.NHOMBAOCAO,
				name: val.TIEUDE
			}
		})
		simTree({
			linkParent: false,
			childNodeAsy: false,
			el: '#treeBC',
			data: objectxx,
			check: true,
			linkParent: true,
			//check: true,
			onClick: function (item) {
			},
			onChange: function (item) {
				listt.listBaocao = item;
			}
		});

		simTree({
			el: '#treeChucnang',
			data: nd,
			check: true,
			linkParent: true,
			//check: true,
			onClick: function (item) {
			},
			onChange: function (item) {
				listt.listRole = item;
			}
		});

		$(".btnSave").on('click', function (e) {
			e.preventDefault();
			var a = oNguoiDung.setClaims(listt, idd);
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(a.MESSAGE, '40%', '50px');

		})
	}

	this.bindGrid01 = function () {
		var dta = {}
		dta.donvi = jwt.donvi
		dta.level = jwt.level
		dta.tinhthanh = jwt.tinhthanh

		oNguoiDung.getAll(dta);
		that.oTable.clear().draw();
		listnd = removeDuplicates(oNguoiDung.LIST, "ID");  
		var aRows = [];
		for (var i = 0; i < listnd.length; i++) {
			var _item = listnd[i];
			var _hidden = '<p style="display:none" class="rowID"  />' + JSON.stringify(_item) + '</p>';
			var trangthai = _item.status == 1 ? '<span class="label label-success">Kích hoạt</span>' : '<span class="label label-danger">Khóa</span>';
			aRows.push([
				(i + 1) + _hidden,
				_item.USERNAME,
				_item.EMAIL,
				_item.TENLV,
				_item.PHONENUMBER,
				_item.TENDONVI,
				_item.CREATEDDATE,
				_item.NGUOITAO

			]);
		}
		that.oTable.rows.add(aRows).draw();
	}

	this.modal1 = function () {
		var optt = ''
		list_tt.map(val => {
			optt = optt + "<option value='" + val.TINHTHANHID + "'>" + val.TEN + "</option>"
		})
		$("#TINHTHANHID").html(optt)
		$("#DONVI").change(function () {
			if ($("#DONVI").val() == jwt.unitid) {
				let optlv = ''
				listlevel.map(val => {
					if (val.LVL > jwt.level || val.LVL == jwt.level) {
						optlv = optlv + "<option value='" + val.LVL + "'>" + val.TENLV + "</option>"
					}
				})
				if (optlv == '') {
					optlv = "<option value='error'>Không có quyền tạo đơn vị này</option>"
				}
				$("#LEVEL").html(optlv)
				$("#LEVEL").val($("#LEVEL option:selected").attr('value')).select2()
			}
			else {
				var optlv = ''
				listlevel.map(val => {
					optlv = optlv + "<option value='" + val.LVL + "'>" + val.TENLV + "</option>"
				})
				$("#LEVEL").html(optlv)
				$("#LEVEL").val($("#LEVEL option:selected").attr('value')).select2()
			}
			if ($("#DONVI").val() == jwt.dvtong) {
				$("#tinhthanhselect").show();
			}
			else {
				$("#tinhthanhselect").hide();
			}
		})
		$("#DONVI").trigger('change');
	}
	$(function () {
		that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
		that.oDialog = new PopupDialog(reload);
		that.init();
		$('#TINHTHANHID').on('select2:select', function (e) {
			var data = e.params.data;
			listTinhthanh.push(data.id)
		});
		$('#TINHTHANHID').on('select2:unselect', function (e) {
			var data = e.params.data;
			listTinhthanh = listTinhthanh.filter(a => a != data.id)
		});

		var dvcha = oNguoiDung.getdvcha();
		var dt = oNguoiDung.getcayphahenew(jwt.unitid); //comment
		var optiondv = '';
		dt.map(val => {
			dvcha.map(value => {
				if (value.DONVIID == val.DONVIID) {
					optiondv = optiondv + "<option value='" + val.DONVIID + "'>" + val.TENDONVIHIENTHI + "</option>"
				}
			})
		});

		$("#DONVI").html(optiondv)

		$('#exampleModalCenter').on('hidden.bs.modal', function () {
			nd = []
			obj = []
			listRole = []
			listMenu = []
			listt = {}
		})

		function reload() {
			that.filterAction('NEW');
		}

		$('body').on('blur', '#USERNAME', function (e) {
			e.preventDefault();
		})

		$('.btn2Save').on('click', function (e) {
			e.preventDefault();
			var tinhthanhid = ''
			listTinhthanh.map(val => {
				tinhthanhid = tinhthanhid + val + '@'
			})
			var statusCheck = '';
			if ($("#CHKNHANTHONGBAO").prop('checked') == true) {
				statusCheck = 1
			} else {
				statusCheck = 0
			}
			tinhthanhid = tinhthanhid.substring(0, tinhthanhid.length - 1)
			oNguoiDung.TINHTHANHID = tinhthanhid
			oNguoiDung.USERNAME = $('#USERNAME').val();
			oNguoiDung.PASSWORD = $('#PASSWORD').val();
			oNguoiDung.EMAIL = $('#EMAIL').val();
			oNguoiDung.PHONENUMBER = $('#PHONENUMBER').val();
			oNguoiDung.FULLNAME = $('#FULLNAME').val();
			oNguoiDung.SHKB = $('#SOHIEUKHOBAC').val();
			oNguoiDung.DIABAN = $('#DONVI').val();
			oNguoiDung.LVL = Number($('#LEVEL').val());
			var newArray = dvcha.filter(m => m.DONVIID == $("#DONVI").val())
			if (newArray[0].TINHTHANH) {
				oNguoiDung.TINHTHANHID = newArray[0].TINHTHANH
			}
			if ($("#LEVEL").val() == 'error') {
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show('Bạn không có quyền tạo đơn vị này', '40%', '50px');
			}
			else {
				oNguoiDung.NHANTHONGBAO = statusCheck;
				var rs = oNguoiDung.save(); 
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show(rs.MESSAGE, '40%', '50px');
				that.bindGrid01();
			}
		});

		$('.ACTIONS').on('click', '#btnAddNew', function (e) {
			e.preventDefault()
			$(".modal-title").text('Thêm mới tài khoản')
			$Tinhthanh.val(null).trigger("change");
			that.modal1();
			oNguoiDung.ID = 0;
			$('#CHKNHANTHONGBAO').bootstrapToggle('off')
			$(".labelmk").show();
			$(".inputmk").show();
			$('#USERNAME').val('');
			$('#PASSWORD').val('');
			$('#EMAIL').val('');
			$('#PHONENUMBER').val('');
			$('#FULLNAME').val('');
			$('#SHKB').val('');
			$('#DIABAN').val('');
			$('#STATUS').val('0');
			$('#CREATEDDATE').val('');
			$('#CREATEDBY').val('');
			$('#UPDATEDDATE').val('');
			$('#UPDATEDBY').val(1);
			$("#LEVEL").val($("#LEVEL option:selected").attr('value')).select2()
			$("#PASSWORD").css('background-color', 'white')
			$("#PASSWORD").prop("disabled", false)
		});
		$('.ACTIONS').on('click', '#btnPhanQuyen', function () {
			that.bindModal();
		});
		$(".ACTIONS").on('click', '#btnResetpassword', function () {
			var response = oNguoiDung.resetPassword(JSON.parse(idnd).ID);
			var oAlert = new AlertDialog('Thông báo');
			oAlert.show(response.MESSAGE, '40%', '50px');
		})
		$('.ACTIONS').on('click', '#btnPhanNhom', function () {
			that.oDialog.show('Phân nhóm Người dùng', 'NguoiDungPhanNhom', '80%', '500px');
		});
		$('.ACTIONS').on('click', '#btnEdit', function () {
			var getNDbyId = JSON.parse(idnd);

			$("#TINHTHANHID").html('')
			$(".modal-title").text('Sửa tài khoản')
			$(".labelmk").hide();
			$(".inputmk").hide();
			that.modal1();
			if (JSON.parse(idnd).TINHTHANHID)
				listTinhthanh = JSON.parse(idnd).TINHTHANHID.split('@')
			$('#DONVI').val(getNDbyId.DIABAN).trigger('change');
			if (listTinhthanh.length > 1) {
				$("#tinhthanhselect").show()
			} else {
				$("#tinhthanhselect").hide()
			}
			$("#TINHTHANHID").val(listTinhthanh)
			oNguoiDung.ID = getNDbyId.ID;
			$('#USERNAME').val(getNDbyId.USERNAME);
			$('#LEVEL').val(getNDbyId.LVL).select2();
			$('#PASSWORD').val(getNDbyId.PASSWORD);
			$('#EMAIL').val(getNDbyId.EMAIL);
			$('#PHONENUMBER').val(getNDbyId.PHONENUMBER);
			$('#FULLNAME').val(getNDbyId.FULLNAME);
			$('#SOHIEUKHOBAC').val(getNDbyId.SHKB);
			$('#DIABAN').val(getNDbyId.DIABAN);
			$('#STATUS').val(getNDbyId.STATUS);
			$('#CREATEDDATE').val(getNDbyId.CREATEDDATE);
			$('#CREATEDBY').val(getNDbyId.CREATEDBY);
			$('#UPDATEDDATE').val(getNDbyId.UPDATEDDATE);
			$('#UPDATEDBY').val(getNDbyId.UPDATEDBY);
			if (getNDbyId.NHANTHONGBAO == 1) {
				$("#CHKNHANTHONGBAO").bootstrapToggle('on')
			}
			else {
				$("#CHKNHANTHONGBAO").bootstrapToggle('off')
			}
			$("#PASSWORD").css('background-color', '#eee')
			$("#PASSWORD").prop("disabled", true)
		});
		$('.ACTIONS').on('click', '#btnDelete', function (e) {
			e.preventDefault()
			if (idd.length == 0) {
				var oAlert = new AlertDialog('Cảnh báo');
				oAlert.show('Chưa chọn Người dùng để xóa', '40%', '50px');
				return false;
			}

			function ok() {
				if (idd == jwt.id) {
					var oAlert = new AlertDialog('Cảnh báo');
					oAlert.show('Bạn không thể xóa chính mình', '40%', '50px');
					return false;
				}
				else {
					var rs = oNguoiDung.del(idd)
					var oAlert = new AlertDialog('Thông báo');
					oAlert.show(rs.MESSAGE, '40%', '50px');
					//reload sau khi delete
					that.bindGrid01();
				}

			}
			function cancel() { }

			var oConfirmDialog = new ConfirmDialog('Xác nhận xóa', ok, cancel);
			oConfirmDialog.show('Bạn có chắc chắn muốn xóa bản ghi này không?', '40%', '50px');
		});
		$('#Grid01 tbody').on('click', 'tr', function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				idd = ''
				that.filterAction('NEW');
			}
			else {
				that.oTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
				idnd = $(this).find('.rowID').text();
				idd = JSON.parse(idnd).ID
				that.filterAction('SELECT');
			}
		});
	})
}