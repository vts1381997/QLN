// Hàm kiểm tra giá trị có bị null hoặc rỗng không thì trả về giá trị mặc định
function fnc_nvl(p_GiaTriKiemTra, p_GiaTriMacDinh) {
  return p_GiaTriKiemTra === null || String(p_GiaTriKiemTra).length === 0
    ? p_GiaTriMacDinh
    : p_GiaTriKiemTra;
}

// Hàm kiểm tra nếu giá trị bằng 0 thì đổi về rỗng
function fnc_hollowValue(p_GiaTriKiemTraRong) {
  if (Number(p_GiaTriKiemTraRong) == 0) {
    return ''
  }
  return p_GiaTriKiemTraRong;
}

// Hàm chuyển đổi danh tiền
$("input[data-type='currency']").on({
  keyup: function () {
    formatCurrency($(this));
  },
  blur: function () {
    formatCurrency($(this), "blur");
  }
});
function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  // get input value
  var input_val = input.val();
  // don't validate empty input
  if (input_val === "") {
    return;
  }
  // original length
  var original_len = input_val.length;
  // initial caret position
  var caret_pos = input.prop("selectionStart");
  // check for decimal
  if (input_val.indexOf(".") >= 0) {
    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");
    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);
    // add commas to left side of number
    left_side = formatNumber(left_side);
    // validate right side
    right_side = formatNumber(right_side);
    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "";
    }
    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);
    // join number by .
    input_val = "" + left_side + "." + right_side;
  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "" + input_val;
    // final formatting
    if (blur === "blur") {
      input_val += "";
    }
  }
  // send updated string to input
  input.val(input_val);
  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}
function fnc_formatKeyUp() {
  $("input[data-type='currency']").on({
    keyup: function () {
      formatCurrency($(this));
    },
    blur: function () {
      formatCurrency($(this), "blur");
    }
  });
  $("input[data-type='money']").on({
    keyup: function () { 
      formatCurrency($(this));
    },
    blur: function () { 
      formatCurrency($(this), "blur");
    }
  });
  function formatNumber(n) {
    // format number 1000000 to 1,234,567
    if (Number(fnc_replace(n, ',', '')) < 0) {
      var soDuong = n.replace('-','') 
      return '-' + soDuong.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    else {
      return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  function formatCurrency(input, blur) { 
    // appends $ to value, validates decimal side
    // and puts cursor back in right position.
    // get input value
    var input_val = input.val(); 
    // don't validate empty input
    if (input_val === "") {
      return;
    }
    // original length
    var original_len = input_val.length;
    // initial caret position
    var caret_pos = input.prop("selectionStart");
    // check for decimal
    if (input_val.indexOf(".") >= 0) {
      // get position of first decimal
      // this prevents multiple decimals from
      // being entered
      var decimal_pos = input_val.indexOf(".");
      // split number by decimal point
      var left_side = input_val.substring(0, decimal_pos);
      var right_side = input_val.substring(decimal_pos);
      // add commas to left side of number
      left_side = formatNumber(left_side);
      // validate right side
      right_side = formatNumber(right_side);
      // On blur make sure 2 numbers after decimal
      if (blur === "blur") {
        right_side += "";
      }
      // Limit decimal to only 2 digits
      right_side = right_side.substring(0, 2);
      // join number by .
      input_val = "" + left_side + "." + right_side;
    } else {
      // no decimal entered
      // add commas to number
      // remove all non-digits
      input_val = formatNumber(input_val);
      input_val = "" + input_val;
      // final formatting
      if (blur === "blur") {
        input_val += "";
      }
    }
    // send updated string to input
    input.val(input_val);
    // put caret back in the right position
    var updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    input[0].setSelectionRange(caret_pos, caret_pos);
  }
}

//Hàm replaceAll
// function fnc_replace(target, search, replacement) {
//     return String(target).replace(new RegExp(search, 'g'), replacement);
// };
function fnc_replace(target, search, replacement) {
  return String(target)
    .split(search)
    .join(replacement);
}

//Hàm lấy ngày hiện tại
function fnc_ngayhientai(format = "yy-mm-dd") {
  return $.datepicker.formatDate(format, new Date());
}

//Hàm format date dạng Fri Dec 20 2019 07:00:00 GMT+0700 (Giờ Đông Dương) sang dd/mm/yyyy
function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [day, mnth, date.getFullYear()].join("/");
}

//Hàm trả về danh sách đơn vị cây gia phả
function fnc_danhsachdonvi() {
  var nguoidungs = new NguoiDung();
  let dt = nguoidungs.getcayphahenew(jwt.unitid); //comment
  var optiondv = "";
  if (dt) {
    dt.map(val => {
      optiondv =
        optiondv +
        "<option value-tinhthanhid='" +
        fnc_nvl(val.TINHTHANH, '') +
        "' value-tentinhthanh='" + fnc_nvl(val.TEN, '') +
        "' value='" +
        val.DONVIID +
        "'>" +
        val.TENDONVIHIENTHI +
        "</option>";
    });
    return optiondv;
  }

}

//Hàm trả về danh sách tỉnh thành phố ăn theo đơn vị
function fnc_danhsachtinhthanh() {
  var nguoidungs = new NguoiDung();
  let dt = nguoidungs.getdvcha(tt_id[0].TINHTHANHID);
  var optiontt = "";
  var arrTinhThanh = [];


  for (var i = 0; i < dt.length; i++) {
    // for (var j = i + 1; j < dt.length; j++) {
    // deduplicate(dt[i].TINHTHANH)
    if (dt[i].TINHTHANH) {
      arrTinhThanh.push(dt[i].TINHTHANH)
      // optiontt =
      //   optiontt +
      //   "<option value='" +
      //   dt[j].TINHTHANH +
      //   "' data-tentinhthanh='"+ dt[j].TEN +"'>" +
      //   dt[j].TEN +
      //   "</option>";
    }
    // }
  }
  // return optiontt;
  var obj = JSON.stringify(deduplicate(arrTinhThanh)).replace('[', '').replace(']', '').split(',')
  // dt.map(val => {
  for (var i = 0; i < dt.length; i++) {
    for (var j = 0; j < obj.length; j++) {
      optiontt =
        optiontt +
        "<option value='" +
        val.TINHTHANH +
        "' data-tentinhthanh='" + val.TEN + "'>" +
        val.TEN +
        "</option>";
    }
  }
  // });
  return optiontt;
}

function fnc_optiontinh() {
  var nguoidungs = new NguoiDung();
  var tt_id = nguoidungs.getTinhThanhs();
  let list_tt = nguoidungs.getTinhThanh(tt_id[0].TINHTHANHID);
  var optt = ''
  list_tt.map(val => {
    optt = optt + "<option value='" + val.TINHTHANHID + "'>" + val.TEN + "</option>"
  })

  return optt
}

// Hàm đọc số thành chữ
var ChuSo = new Array(
  " không ",
  " một ",
  " hai ",
  " ba ",
  " bốn ",
  " năm ",
  " sáu ",
  " bảy ",
  " tám ",
  " chín "
);
var Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");

//1. Hàm đọc số có ba chữ số;
function DocSo3ChuSo(baso) {
  var tram;
  var chuc;
  var donvi;
  var KetQua = "";
  tram = parseInt(baso / 100);
  chuc = parseInt((baso % 100) / 10);
  donvi = baso % 10;
  if (tram == 0 && chuc == 0 && donvi == 0) return "";
  if (tram != 0) {
    KetQua += ChuSo[tram] + " trăm ";
    if (chuc == 0 && donvi != 0) KetQua += " linh ";
  }
  if (chuc != 0 && chuc != 1) {
    KetQua += ChuSo[chuc] + " mươi";
    if (chuc == 0 && donvi != 0) KetQua = KetQua + " linh ";
  }
  if (chuc == 1) KetQua += " mười ";
  switch (donvi) {
    case 1:
      if (chuc != 0 && chuc != 1) {
        KetQua += " mốt ";
      } else {
        KetQua += ChuSo[donvi];
      }
      break;
    case 5:
      if (chuc == 0) {
        KetQua += ChuSo[donvi];
      } else {
        KetQua += " lăm ";
      }
      break;
    default:
      if (donvi != 0) {
        KetQua += ChuSo[donvi];
      }
      break;
  }
  return KetQua;
}

//2. Hàm đọc số thành chữ (Sử dụng hàm đọc số có ba chữ số)

function DocTienBangChu(SoTien) {
  var lan = 0;
  var i = 0;
  var so = 0;
  var KetQua = "";
  var tmp = "";
  var ViTri = new Array();
  var flag_soAm = "+";
  if (SoTien < 0) flag_soAm = "-";
  if (SoTien == 0) return "Không đồng";
  if (SoTien > 0) {
    so = SoTien;
  } else {
    so = -SoTien;
  }
  if (SoTien > 8999999999999999) {
    return "Số quá lớn!";
  }
  ViTri[5] = Math.floor(so / 1000000000000000);
  if (isNaN(ViTri[5])) ViTri[5] = "0";
  so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
  ViTri[4] = Math.floor(so / 1000000000000);
  if (isNaN(ViTri[4])) ViTri[4] = "0";
  so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
  ViTri[3] = Math.floor(so / 1000000000);
  if (isNaN(ViTri[3])) ViTri[3] = "0";
  so = so - parseFloat(ViTri[3].toString()) * 1000000000;
  ViTri[2] = parseInt(so / 1000000);
  if (isNaN(ViTri[2])) ViTri[2] = "0";
  ViTri[1] = parseInt((so % 1000000) / 1000);
  if (isNaN(ViTri[1])) ViTri[1] = "0";
  ViTri[0] = parseInt(so % 1000);
  if (isNaN(ViTri[0])) ViTri[0] = "0";
  if (ViTri[5] > 0) {
    lan = 5;
  } else if (ViTri[4] > 0) {
    lan = 4;
  } else if (ViTri[3] > 0) {
    lan = 3;
  } else if (ViTri[2] > 0) {
    lan = 2;
  } else if (ViTri[1] > 0) {
    lan = 1;
  } else {
    lan = 0;
  }
  for (i = lan; i >= 0; i--) {
    tmp = DocSo3ChuSo(ViTri[i]);
    KetQua += tmp;
    if (ViTri[i] > 0) KetQua += Tien[i];
    if (i > 0 && tmp.length > 0) KetQua += ",";
  }
  if (KetQua.substring(KetQua.length - 1) == ",") {
    KetQua = KetQua.substring(0, KetQua.length - 1);
  }

  if (flag_soAm == "-") KetQua = "Âm " + KetQua + " đồng";
  else
    KetQua =
      KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2) + " đồng";
  KetQua = fnc_replace(KetQua, "  ", " ");
  return KetQua;
}

//Hàm format tiền
function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
  if (amount == null || amount == 0) {
    return ""
  }
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 0 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
};

//Hàm loại bỏ phần tử trùng lặp trong mảng
function deduplicate(arr) {
  let isExist = (arr, x) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === x) return true;
    }
    return false;
  }

  let ans = [];
  arr.forEach(element => {
    if (!isExist(ans, element)) ans.push(element);
  });
  return ans;
}

//Hàm loại bỏ dấu -
function fnc_dvl(value) {
  if (value.includes('-')) {
    return value.replace('-', '');
  }
  else {
    return value;
  }
}

//Hàm loại bỏ dấu cách khi nhập mã
function fnc_removeSpace() {
  String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
  };
  $('body').on('keyup', '#MA', function () {
    if ($("#MA").val().includes(' ')) {
      var stringCode = String($("#MA").val()).split(" ").join().replaceAll(',', '')
      $("#MA").val(stringCode)
    }
  })
}

//Hàm loại bỏ dấu cách thừa khi nhập tên
function fnc_removeName() {
  String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
  };
  $('body').on('keyup', '#TEN', function () {
    if ($("#TEN").val().includes('  ')) {
      var stringName = String($("#TEN").val()).split("  ").join().replaceAll(',', '')
      $("#TEN").val(stringName)
    }
  })
}
function fnc_validateSpace(code) {
  String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
  };
  $('body').on('keyup', '#' + code, function () {
    if ($("#" + code).val().includes('  ')) {
      var stringName = String($("#" + code).val()).split("  ").join().replaceAll(',', '')
      $("#" + code).val(stringName)
    }
  })
}

//Hàm validate khi nhập email
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//Hàm tự động sinh mã
function fnc_createCode(code) {
  var start = Date.now();
  return code + start + Math.floor(Math.random() * 10)
}

//Hàm remove số 0 ở vị trí đầu tiên
function fnc_remove0firt(p_string) {
  var vStringTmp = p_string;
  if (vStringTmp.length == 0)
    return vStringTmp;
  try {
    while (vStringTmp.substr(0, 1) == '0')
      vStringTmp = vStringTmp.substr(1, vStringTmp.length - 1);
  } catch (error) {
    vStringTmp = 'Vui lòng nhập số hoặc dấu chấm phảy';
  }
  return vStringTmp;
}

//Hàm format date to yyyy-mm-dd
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

//Hàm kiểm tra có phải là click 2 lần không
function isDoubleClicked(element) {
  //if already clicked return TRUE to indicate this click is not allowed
  if (element.data("isclicked")) return true;

  //mark as clicked for 1 second
  element.data("isclicked", true);
  setTimeout(function () {
    element.removeData("isclicked");
  }, 1000);

  //return FALSE to indicate this click was allowed
  return false;
}


function readURL(input, selector, custom) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $(selector).attr('src', e.target.result).css('width', custom ? custom.width ? custom.width : '100px' : '100px');
    }

    reader.readAsDataURL(input.files[0]);
  }
}


$('input[type="file"]').attr('title', 'Chọn tệp đính kèm')
$('input[type="file"]').change(function (e) {
  var reader = new FileReader();
  $(this).next().attr('id') === 'list_uploadfile' ? $(this).next().remove() : () => { return }

  $(this).after(' <ul class="list-inline" style="margin-top:10px" id="list_uploadfile">\
                        <li class="list-inline-item image-upload-name">' + e.target.files[0].name + '</li>\
                        <li class="list-inline-item">' + parseFloat(Number(e.target.files[0].size) / 1024).toFixed(2) + ' ( KB )' + '</li>\
                        <li class="list-inline-item"><button class="btn btn-danger delete-file-upload"><i class="fa fa-trash"></i></button></li>\
                    </ul>')

  if (e.target.files[0].type.includes('image')) {
    $('.image-upload-name').html('<img class="display-image-upload" /> <p>' + e.target.files[0].name + '</p>')
    readURL(this, '.display-image-upload')
  }
})

$('body').on('click', '.delete-file-upload', function (e) {
  e.stopPropagation()
  $('input[type="file"]').val('')
  $(this).parent().parent().remove()
})