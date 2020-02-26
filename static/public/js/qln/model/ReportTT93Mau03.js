var ReportTT93Mau03 = function () {
    var that = this;
    const URL = {
        GETBC: CONFIG_API.URL.BASE_API + 'report/tt93mau03',
        GETALL:CONFIG_API.URL.BASE_API + 'dm_tinhthanh/getall',
    }
    this.getBC = function (data) {
        var rs = DATA.get(URL.GETBC, data);
        that.LIST = rs;
    }
    this.getAll = function () {
        var rs = DATA.get(URL.GETALL);
       that.LIST = rs;
    }
}