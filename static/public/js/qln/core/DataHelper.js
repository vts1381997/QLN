var DataHelper = function () {
    let token = JSON.parse(window.localStorage.getItem('AUTH'))
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    var jwt = JSON.parse(jsonPayload)

    this.get = function (sUrl, oParams) {
        if (typeof oParams === 'undefined') {
            oParams = {};
        }
        var _rs = null;

        try {
            // oParams.token = token
            oParams.idlogin = jwt.id
            oParams.unitid = jwt.unitid
            // var UserInfo = JSON.parse(window.localStorage.getItem('AUTH'));
            var request = $.ajax({
                url: sUrl,
                type: "POST",
                data: JSON.stringify(oParams),
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                async: false,
                timeout: 3000
                // beforeSend: function (xhr) {
                //     xhr.setRequestHeader("Authorization", UserInfo.TokenType + ' ' + UserInfo.Token);
                // }
            });

            request.done(function (_response) {
                _rs = _response;
            });

            request.fail(function (jqXHR, textStatus) {
                switch (jqXHR.status) {
                    case 401:
                        //alert('Lỗi xác thực');
                        localStorage.clear();
                        window.location.href = CONFIG_API.URL.COM_HOME;
                        break;
                    default:
                        //alert(textStatus);
                        break;
                }

                return false;
            });

            // if (_rs.CODE != '0') {
            //     if (_rs.indexOf('JWT expired') != -1) {
            //         //alert(oConfig.Message.VN.SESSION_EXPIRED);
            //         localStorage.clear();
            //         window.location.href = CONFIG_API.URL.COM_HOME;
            //         return false;
            //     }

            //     //alert(_rs.MESSAGE); return false;
            // }
            if (_rs.role) {
                return _rs
            }
            else
                return _rs.RESULT;
        } catch (error) {
        }



    }

    this.set = function (sUrl, oParams) {
        if (typeof oParams === 'undefined') {
            oParams = {};
        }
        // oParams.token = token
        oParams.idlogin = jwt.id
        oParams.unitid = jwt.unitid
        var _rs = null;
        var request = $.ajax({
            url: sUrl,
            type: "POST",
            data: JSON.stringify(oParams),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            async: false,
            timeout: 3000
            // beforeSend: function (xhr) {
            //     xhr.setRequestHeader("Authorization", UserInfo.TokenType + ' ' + UserInfo.Token);
            // }
        });



        request.done(function (_response) {
            _rs = _response;
        });

        request.fail(function (jqXHR, textStatus) {
            switch (jqXHR.status) {
                case 401:
                    //aleralert(oConfig.Message.VN.SESSION_UNAUTHORIZE);
                    localStorage.clear();
                    window.location.href = CONFIG_API.URL.COM_HOME;
                    break;
                default:

                    break;
            }

            return false;
        });
        if (_rs.RESULT) {

            return _rs.RESULT[0];
        }
        else {
            return _rs
        }
    }


    this.ajaxPostForm = function (url, formid) {
        var _rs = false
        try {
            var request = $.ajax({
                url: url,
                type: "POST",
                data: new FormData(document.getElementById(formid)),
                async: false,
                cache: true,
                contentType: false,
                processData: false,
                timeout: 3000,
            });
            request.done(function (res) {
                _rs = res
            })
            request.fail(function (jqXHR, textStatus) {
                _rs = false
            })
            //if (!_rs) { alert('null value') } else { return _rs }
        }
        catch (err) {
            _rs = false
        }
        return _rs

    }

}     