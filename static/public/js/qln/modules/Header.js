var Header = function() {

	var that = this;
	var oAuthenHelper = new AuthenHelper();
	
	this.init = function() {
		if (!window.localStorage.getItem('AUTH')) {
			window.location.href = CONFIG_API.URL.LOG_OUT;
		}
		// var UserInfo =JSON.parse(window.localStorage.getItem('AUTH'));
		// $('#UserInfo .name').html(UserInfo.Username);
		// $('#UserInfo .pos').html(UserInfo.Ten);
		
	}

	this.getClock = function() {
		var date = new Date();
		function addZero(x) {
			if (x < 10) {
				return x = '0' + x;
			} else {
				return x;
			}
		}

		function twelveHour(x) {
			if (x > 12) {
				return x = x - 12;
			} else if (x == 0) {
				return x = 12;
			} else {
				return x;
			}
		}

		var h = addZero(twelveHour(date.getHours()));
		var m = addZero(date.getMinutes());
		var s = addZero(date.getSeconds());
		return h + ':' + m + ':' + s;
	}
	
	
	this.updateClock = function(){
		$('#DongHo').text(that.getClock());
	}
	
	$(function(){
		
		that.init();
		
		setInterval(that.updateClock, 1000);

		$('#btnSignOut').on('click',function(){
			oNguoiDung = new NguoiDung();
			oNguoiDung.deleteInformationLogin();
			oAuthenHelper.logout();
			//update status về 0
		});
		
		$(".menus .item").click(function () {
            $(this).toggleClass("active").siblings().removeClass('active');

        });
		
        $(".header .nav-icon").click(function () {
			window.location.href = CONFIG_API.URL.COM_DASHBOARD;

        });
        
        $(".menus li").each(function(){
            if($(this).hasClass("active")){
                $(this).parent().parent().addClass("active");
            }
        });
        
        $(".overlay-common").click(function () {
            $("body").removeClass("minimize-menu");
        }); 
        
        $('#btnSignOut').click(function(){
        	oAuthenHelper.logout();
		});

		$('#btnChangePass').click(function(){
			var UserInfo =JSON.parse( window.localStorage.getItem('USERINFO'));
			var _user = UserInfo.Username;
			var _passOld = $('#PASSWORD_OLD').val();
			var _passNew = $('#PASSWORD_NEW').val();
			var _passNew1 = $('#PASSWORD_NEW_1').val();

			if (_passOld.length < 3 || _passNew < 3 || _passNew1.length < 3) {
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show('Mật khẩu không hợp lệ, vui lòng nhập lại','40%', '50px');
				$('#PASSWORD_OLD').val('');
				$('#PASSWORD_NEW').val('');
				$('#PASSWORD_NEW_1').val('');
				$('#PASSWORD_OLD').focus();
				return false;
			}

			if (_passNew !=_passNew1) {
				var oAlert = new AlertDialog('Thông báo');
				oAlert.show('Mật khẩu mới không khớp, vui lòng nhập lại','40%', '50px');
				$('#PASSWORD_OLD').val('');
				$('#PASSWORD_NEW').val('');
				$('#PASSWORD_NEW_1').val('');
				$('#PASSWORD_OLD').focus();
				return false;
			}
			var rs = that.DmNhanVien.changepass(_user,_passOld,_passNew);
			var oAlert = new AlertDialog('Thông báo');
			if (rs.CODE==0) {
				oAlert.show(rs.MESSAGE,'40%', '50px');
				oAuthenHelper.logout();
			}else{
				oAlert.show(rs.MESSAGE,'40%', '50px');
			}
		});
	})
	
}