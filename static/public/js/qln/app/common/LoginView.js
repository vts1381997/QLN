
var LoginView = function () {
	var code = {};

	this.canvasCaptcha = function () {

		var createdImage = that.drawImage();
		//wait till image is loaded then draw canvas
		createdImage.onload = function () {
			var canvas = document.getElementById('canvas');
			var ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			ctx.drawImage(createdImage, 0, 0);
			var list = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
			var i;
			for (i = 0; i < 4; i++) {
				var a = list[Math.floor(Math.random() * list.length)];
				var b = list[Math.floor(Math.random() * list.length)];
				var c = list[Math.floor(Math.random() * list.length)];
				var d = list[Math.floor(Math.random() * list.length)];

			}
			code.value = a + b + c + d;
			that.captcha = a + b + c + d;

			ctx.font = "bold 42px Brush Script MT";
			ctx.fillStyle = "#0c2990";
			ctx.textAlign = "center";
			ctx.fillText(code.value, canvas.width / 2, canvas.height / 2);
		}

	}

	this.drawImage = () => {
		var background = new Image();
		background.src = "/qln/public/skinmedic/img/bg_captcha.png";

		return background;
	}
	var that = this;
	var oAuthenHelper = new AuthenHelper();

	this.initPage = function () {

	}
	this.decode = function (token) {
		return;
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
		return JSON.parse(jsonPayload);
	}

	this.login = function () {
		var sUsername = $('#Username').val();
		var sPassword = $('#Password').val();
		if (sUsername.length < 3 || sPassword.length < 3) {
			$('#Message').html('Tài khoản hoặc mật khẩu không hợp lệ.');
			$('#Username').focus();
			that.canvasCaptcha()
			return false;
		}
		var resp = oAuthenHelper.authen(sUsername, sPassword, '0');
		if (resp.token) {  
			// var aaa = that.decode(resp.token);
			localStorage.AUTH = JSON.stringify(resp.token);
			localStorage.ID = JSON.stringify(resp.id);
			window.location.href = CONFIG_API.URL.COM_DASHBOARD;
		} else {
			$('#Username').val('');
			$('#Password').val('');
			$('#Username').focus();
			$('#Message').html(resp.message);
			that.canvasCaptcha()
		}
	}

	$(function () {
		that.initPage();
		that.canvasCaptcha()
		$('#btnrefreshCaptcha').click(function (e) {
			e.preventDefault()
			$('#captcha').val('')
			$('#error-captcha').hide()
			that.canvasCaptcha()
		})
		$('.actions #btnLogin').on('click', function (e) {
			e.preventDefault()
			if (Number($('#captcha').val()) === Number(that.captcha)) {
				$('#error-captcha').hide()
				that.login();
			} else {
				$('#Message').html('Sai mã bảo mật vui lòng thử lại!').show()
			}
		});

		$(document).on('keypress', function (e) {
			if (e.which == 13) {
				if (Number($('#captcha').val()) === Number(that.captcha)) {
					$('#error-captcha').hide()
					that.login();
				} else {
					$('#Message').html('Sai mã bảo mật vui lòng thử lại!').show()
				}
			}
		});
		var myWindow = window.open(CONFIG_API.URL.USER_API + 'verify', "myWindow", "width=1000, height=1000")		//myWindow.close()
	});
}