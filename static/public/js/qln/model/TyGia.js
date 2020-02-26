var TyGia = function() {
  var that = this;
  var url = "http://103.74.123.193:8094/xml";
  var urlupdate = "http://103.74.123.193:8094/xml/update";
  // Get all data
  this.getAll = function() {
    var rs = DATA.get(url);
    that.LIST = rs;
  };
  this.update = () => {
    return DATA.set(urlupdate);
  };
};
