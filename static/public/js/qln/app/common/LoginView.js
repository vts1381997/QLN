
var LoginView = function () {
	var code = {};
	var countError = 0;
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
			countError = Number(countError) + 1;
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
			var today = new Date();
			var day = today.getDate() + "";
			var month = (today.getMonth() + 1) + "";
			var year = today.getFullYear() + "";
			var hour = today.getHours() + "";
			var minutes = today.getMinutes() + "";
			var seconds = today.getSeconds() + "";
			var timeLogin = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds
			localStorage.setItem('timelogin', timeLogin)
		} else {
			countError = countError + 1;
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
				if (localStorage.getItem("timeLoginFail")) {
					return;
				}
				else {
					that.login();
				}
			} else {
				$('#Message').html('Sai mã bảo mật vui lòng thử lại!').show()
				if (localStorage.getItem("countError")) {
					countError = Number(localStorage.getItem("countError")) + 1
					localStorage.setItem("countError", countError)
				}
				else {
					countError = Number(countError) + 1
					localStorage.setItem("countError", countError)
				}
			}
			if (Number(localStorage.getItem("countError")) > 9) {
				alert('Bạn đã nhập sai 10 lần, tài khoản của bạn sẽ bị khóa 15 phút')
				// $("#btnLogin").unbind();
				var today = new Date();
				var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
				if (localStorage.getItem("timeLoginFail")) {
					return;
				}
				else {
					localStorage.setItem("timeLoginFail", time);
				}
			}
		});
		$(document).click(function (e) {
			var timeload = localStorage.getItem('timeLoginFail');
			if (timeload) {
				var secondsTimeLoad = (Number(timeload.split(':')[0]) * 3600) + (Number(timeload.split(':')[1]) * 60) + Number(timeload.split(':')[2])
				var today = new Date();
				var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
				var secondsTimeClick = (Number(time.split(':')[0]) * 3600) + (Number(time.split(':')[1]) * 60) + Number(time.split(':')[2])
				var subtractionTime = secondsTimeClick - secondsTimeLoad;
				// console.log(subtractionTime, 'subtractionTime');
				if (subtractionTime > 899) {
					countError = 0;
					localStorage.setItem("countError", 0)
					localStorage.removeItem("timeLoginFail")
				}
			}
		});
		$(document).on('keypress', function (e) {
			if (e.which == 13) {
				$("#btnLogin").trigger('click')
				// if (countError < 10) {
				// 	if (Number($('#captcha').val()) === Number(that.captcha)) {
				// 		$('#error-captcha').hide()
				// 		that.login();
				// 	} else {
				// 		$('#Message').html('Sai mã bảo mật vui lòng thử lại!').show()
				// 	}
				// }
				// else {
				// 	alert('Bạn đã nhập sai quá 10 lần')
				// 	$("#btnLogin").unbind();
				// 	setTimeout(() => {
				// 		$("#btnLogin").bind();
				// 	}, 900000)
				// }
			}
		});
		var myWindow = window.open(CONFIG_API.URL.USER_API + 'verify', "myWindow", "width=1000, height=1000")		//myWindow.close()
	});
}