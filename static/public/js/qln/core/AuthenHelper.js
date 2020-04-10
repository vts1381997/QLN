var AuthenHelper = function (oConfig) {
    var that = this;
    this.authen = function (sUser, sPass, sUnit) {
        var _rs = null;
        var _data = {
            unit: sUnit,
            username: sUser,
            password: sPass
        };
        var request = $.ajax({
            url: CONFIG_API.URL.COM_LOGIN,
            type: "POST",
            data: JSON.stringify(_data),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            async: false,
            beforeSend: function (xhr) { }
        });

        request.done(function (_response) {
            _rs = _response;
        });

        //request.fail(function (jqXHR, textStatus) {
        // return {CODE:"500", MESSAGE:"Đăng nhập lỗi.", RESULT:jqXHR};
        //});
        return _rs;
    }

    this.logout = function () { 
        //update status về 0
        var _data = {
            username: jwt.userName
        }
        var request = $.ajax({
            url: CONFIG_API.URL.COM_LOGIN.replace('login/', 'login/update'),
            type: "POST",
            data: JSON.stringify(_data),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            async: false,
        });
        request.done(function (_response) {
            console.log(_response);
        });
        //het
        jwt = {}
        localStorage.clear();
        window.location.href = CONFIG_API.URL.LOG_OUT;
    }

}