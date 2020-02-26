const ReataConfig = function(){
	this.AuthenUrl = 'http://103.9.77.49/qlnapi/api/v1/public/auth/signin';
	this.DataUrl = 'http://103.9.77.49/qlnapi/api/v1.0/cmd/';
	this.HomeUrl = '/reata/app/common/dashboard';
	this.LogoutUrl = '/reata';

	this.Message = {
		VN:{
			SESSION_EXPIRED:'Phiên làm việc bị quá hạn',
			SESSION_UNAUTHORIZE:'Phiên làm việc không hợp lệ',
			WAR_ACTION_DEL_INVALID:'Chưa chọn mục cần xóa',
		}
		
	}
}