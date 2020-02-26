var Sidebar = function() {

	var that = this;
	
	this.init = function() {
		that.checkQuyenHan();
	}
	
	this.checkQuyenHan = function(){
		var UserInfo =JSON.parse( window.localStorage.getItem('USERINFO'));
		
		ControlHelper.Input.hide([
			'#com_dashboard',
			'#ht_nguoidung',
			'#ht_huongdansudung',
			'#dtcp_nhapchiphi',
			'#dtcp_danhsachchiphi',
			'#dtcp_hopdong',
			'#dtcp_tonghopre',
			'#dm_nhanvien',
			'#dm_chucnang',
			'#dm_khoanchi',
			'#dm_loaichungtu',
			'#dm_loaidichvu',
			'#dm_loaichiphi',
			'#dm_test'
			]);
		let quyenhan = UserInfo.QuyenHan;
		oDmChucNangSideBar.getAll();
		var _show = [];
		for (var i = 0; i < oDmChucNangSideBar.LIST.length; i++) {
			var item = oDmChucNangSideBar.LIST[i];
			if(item.DSQUYENTRUYCAP && item.DSQUYENTRUYCAP !=''){
				if(item.DSQUYENTRUYCAP.includes(quyenhan)){
					_show.push('#' + item.MA);					
				}
			}
			
		}
		ControlHelper.Input.show(_show);
		
		
//		console.log('quyenhan',quyenhan);
//		ControlHelper.Input.hide([
//			'#com_dashboard',
//			'#ht_nguoidung',
//			'#ht_huongdansudung',
//			'#dtcp_nhapchiphi',
//			'#dtcp_danhsachchiphi',
//			'#dtcp_hopdong',
//			'#dtcp_tonghopre',
//			'#dm_nhanvien',
//			'#dm_chucnang',
//			'#dm_khoanchi',
//			'#dm_loaichungtu',
//			'#dm_loaidichvu',
//			'#dm_loaichiphi',
//			'#dm_test'
//			]);
//		switch (quyenhan) {
//			case '0':
//				ControlHelper.Input.show([
//					'#com_dashboard',
//					'#ht_huongdansudung'
//					]);
//				break;
//			case '1':
//				ControlHelper.Input.show([
//					'#com_dashboard',
//					'#ht_nguoidung',
//					'#ht_huongdansudung',
//					'#dtcp_nhapchiphi',
//					'#dtcp_danhsachchiphi',
//					'#dtcp_hopdong',
//					'#dtcp_tonghopre',
//					'#dm_nhanvien',
//					'#dm_chucnang',
//					'#dm_khoanchi',
//					'#dm_loaichungtu',
//					'#dm_loaidichvu',
//					'#dm_loaichiphi',
//					'#dm_test'
//					]);
//				break;
//			case '2':
//				ControlHelper.Input.show([
//					'#com_dashboard',
//					'#ht_huongdansudung',
//					'#dtcp_nhapchiphi',
//					'#dtcp_danhsachchiphi',
//					'#dtcp_tonghopre',
//					'#dm_loaichungtu',
//					'#dm_loaidichvu',
//					'#dm_loaichiphi'
//					]);
//				break;
//			case '3':
//				ControlHelper.Input.show([
//					'#com_dashboard',
//					'#ht_huongdansudung',
//					'#dtcp_danhsachchiphi',
//					'#dtcp_hopdong',
//					'#dtcp_tonghopre',
//					'#dm_nhanvien',
//					'#dm_loaidichvu'
//					]);
//				break;
//		default:
//			break;
//		}
		
	}
	
	

	 
     
     $(function(){
 		that.init();
    	 
 	})
	
}