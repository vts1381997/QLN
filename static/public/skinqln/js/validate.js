var validate = function () {
    this.required = function () {
        if ($(".validate-form").val() == '') {
            $(".validate-form").css("border", "1px solid red");
            return false
        }
        else {
            return true
        }
    }
    this.number = () => {
        var isNum = /^[0-9]*$/;
        if ((inputtxt.value.match(isNum))){
            return true;
        }
        else {
            alert("message");
            return false;
        }
    }
    this.email = (emailStr) => {
        var emailPat = /^(.+)@(.+)$/
        var specialChars = "\\(\\)<>@,;:\\\\\\\"\\.\\[\\]"
        var validChars = "\[^\\s" + specialChars + "\]"
        var quotedUser = "(\"[^\"]*\")"
        var ipDomainPat = /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/
        var atom = validChars + '+'
        var word = "(" + atom + "|" + quotedUser + ")"
        var userPat = new RegExp("^" + word + "(\\." + word + ")*$")
        var domainPat = new RegExp("^" + atom + "(\\." + atom + ")*$")
        var matchArray = emailStr.match(emailPat)
        if (matchArray == null) {
            return false
        }
        var user = matchArray[1]
        var domain = matchArray[2]

        // See if "user" is valid
        if (user.match(userPat) == null) {
            return false
        }
        var IPArray = domain.match(ipDomainPat)
        if (IPArray != null) {
            // this is an IP address
            for (var i = 1; i <= 4; i++) {
                if (IPArray[i] > 255) {
                    return false
                }
            }
            return true
        }
        var domainArray = domain.match(domainPat)
        if (domainArray == null) {
            return false
        }

        var atomPat = new RegExp(atom, "g")
        var domArr = domain.match(atomPat)
        var len = domArr.length

        if (domArr[domArr.length - 1].length < 2 ||
            domArr[domArr.length - 1].length > 3) {
            return false
        }

        // Make sure there's a host name preceding the domain.
        if (len < 2) {
            return false
        }

        // If we've gotten this far, everything's valid!
        return true;
    }

    this.datetime = (dateStr, format) => {
        if (format == null) {
            format = "MDY";
        }
        format = format.toUpperCase();
        if (format.length != 3) {
            format = "MDY";
        }
        if ((format.indexOf("M") == -1) || (format.indexOf("D") == -1) ||
            (format.indexOf("Y") == -1)) {
            format = "MDY";
        }
        if (format.substring(0, 1) == "Y") { // If the year is first
            var reg1 = /^\d{2}(\-|\/)\d{1,2}\1\d{1,2}$/
            var reg2 = /^\d{4}(\-|\/)\d{1,2}\1\d{1,2}$/
        } else if (format.substring(1, 2) == "Y") { // If the year is second
            var reg1 = /^\d{1,2}(\-|\/)\d{2}\1\d{1,2}$/
            var reg2 = /^\d{1,2}(\-|\/)\d{4}\1\d{1,2}$/
        } else { // The year must be third
            // Tan :: Start : if 'd-m-Y' is invalid format (only remove -)
            var reg1 = /^\d{1,2}(\/)\d{1,2}\1\d{2}$/
            var reg2 = /^\d{1,2}(\/)\d{1,2}\1\d{4}$/
            // Tan :: End
        }

        // If it doesn't conform to the right format (with either a 2 digit year or 4 digit year), fail
        if ((reg1.test(dateStr) == false) && (reg2.test(dateStr) == false)) {
            return false;
        }
        var parts = dateStr.split(RegExp.$1); // Split into 3 parts based on what the divider was
        // Check to see if the 3 parts end up making a valid date
        if (format.substring(0, 1) == "M") {
            var mm = parts[0];
        }
        else if (format.substring(1, 2) == "M") {
            var mm = parts[1];
        }
        else {
            var mm = parts[2];
        }
        if (format.substring(0, 1) == "D") {
            var dd = parts[0];
        }
        else if (format.substring(1, 2) == "D") {
            var dd = parts[1];
        }
        else {
            var dd = parts[2];
        }

        if (format.substring(0, 1) == "Y") {
            var yy = parts[0];
        }
        else
            if (format.substring(1, 2) == "Y") {
                var yy = parts[1];
            }
            else {
                var yy = parts[2];
            }
        if (parseFloat(yy) <= 50) {
            yy = (parseFloat(yy) + 2000).toString();
        }
        if (parseFloat(yy) <= 99) {
            yy = (parseFloat(yy) + 1900).toString();
        }
        var dt = new Date(parseFloat(yy), parseFloat(mm) - 1, parseFloat(dd), 0, 0, 0, 0);
        if (parseFloat(dd) != dt.getDate()) {
            return false;
        }
        if (parseFloat(mm) - 1 != dt.getMonth()) {
            return false;
        }

        return true;
    }
}
