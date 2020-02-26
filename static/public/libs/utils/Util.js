var Util ={

    Url:{
        getParameterByName: function (name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
    },

    Base64:{
        fromObject:function(oParams) {
            var sParams = JSON.stringify(oParams);
            return btoa(sParams);
        },
        toObject: function (sBase64) {
            sParams = atob(sBase64);
            return JSON.parse(sParams);
        }
    },

    Convert:{
        toOracleDateTime:function(sDate) {
            from = sDate.split("/");
			var  rs = from[2] + '-' + from[1] + '-' + from[0] + ' 00:00:00';
			return rs;
        }
    }
}
var decodeJwt= function(){
    
}