var MenhGiaTraiPhieu;
var optionMenhGia = '';
var NgayDaoHanTraiPhieu;
const NgayHomNay = $.datepicker.formatDate('yy-mm-dd', new Date());
var DotPHTPView = function () {
    var idDotPHTP = 0;
    var that = this;
    this.AppTitle = 'Đợt phát hành trái phiếu';
    this.Id = '';
    this.oTable = null;
    this.oDialog = null;
    var oDotPHTP = new DotPHTP();
    var Validate = new validate();
    var madphtp
    var maDotphtp
    var id = 0
    var DeAnPHTPs = new DeAnPHTP()
    this.init = function () {
        that.bindGrid01();
        $('#AppTitle').html(that.AppTitle);
        that.filterAction('NEW');
    }
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
    function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 0 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
        }
    }
    function addCommas(nStr) {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }
    this.bindGrid01 = function () {
        oDotPHTP.getAll();
        that.oTable.clear().draw();
        var aRows = [];
        for (var i = 0; i < oDotPHTP.LIST.length; i++) {
            var _item = oDotPHTP.LIST[i];
            if (_item.LAISUATPHDUKIEN !== null) {
                _item.laisuatdukien = JSON.stringify(_item.LAISUATPHDUKIEN + "%").replace('"', '').replace('"', '')
            } else {
                _item.laisuatdukien = ""
            }
            if (_item.LAISUATPHTHANHCONG !== null) {
                _item.laisuatthanhcong = JSON.stringify(_item.LAISUATPHTHANHCONG + "%").replace('"', '').replace('"', '')
            } else {
                _item.laisuatthanhcong = ""
            }
            var _hiddenId = '<input type="hidden" class="rowID" value="' + _item.DOTPHATHANHTRAIPHIEUID + '" />';
            var _hidden = '<p style="display:none" class="rowMA"  />' + JSON.stringify(_item) + '</p>';
            var trangthai = _item.STATUS == 1 ? '<span class="label label-success">Đang hoạt động</span>' : '<span class="label label-danger">Khóa</span>';
            var download = ''
            if (_item.URL) {
                download = '<button  val="' + _item.URL + '" class= "btn btn-primary btnTaixuong" >Tải xuống</button>'
            }
            else {
                download = ''
            }
            aRows.push([
                (i + 1) + _hiddenId + _hidden,
                _item.TENDUAN,
                _item.MA,
                _item.TEN,
                _item.SOQUYETDINH,
                _item.TENTOCHUCPHATHANH,
                formatMoney(_item.KLPHDUKIEN),
                formatMoney(_item.KLPHTHANHCONG),
                _item.laisuatdukien,
                _item.laisuatthanhcong,
                _item.NGAYQUYETDINH,
                _item.GHICHU,
                trangthai,
                download
            ]);
        }
        that.oTable.rows.add(aRows).draw();
    }
    this.filterAction = function (sState) {
        switch (sState) {
            case 'NEW':
                ControlHelper.Input.disable(['#btnEdit', '#btnSave', '#btnDelete', '#btnCancel']);
                ControlHelper.Input.enable(['#btnAddNew']);
                break;
            case 'SELECT':
                ControlHelper.Input.enable(['#btnEdit', '#btnCancel', '#btnDelete']);
                break;
            case 'EDIT':
                ControlHelper.Input.disable(['#btnEdit']);
                ControlHelper.Input.enable(['#btnSave', '#btnCancel', '#btnDelete']);
                break;
            default:
                break;
        }
    }
    this.bindModal = function () {
        String.prototype.replaceAll = function (search, replacement) {
            var target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
        };
        $(document).ready(() => {
            String.prototype.replaceAll = function (search, replacement) {
                var target = this;
                return target.replace(new RegExp(search, 'g'), replacement);
            };
            let dataChiTiet = $("#DEANPHATHANHTRAIPHIEUID option:selected").attr('data-chitiet')
            let dataDotPhatHanh = $("#DEANPHATHANHTRAIPHIEUID option:selected").attr('data-dotphathanh')
            $("#exampleModalLongTitle").text('Thêm mới đợt phát hành trái phiếu (Lần thứ ' + dataDotPhatHanh + ')')
            $("#txtThongTinDuAnHopDong").text(dataChiTiet)
            $('body').on('change', '.GIA', function () {
                var Gia = $(this).val();
                var SoLuongChiTiet = $(this).parent().parent().find(".SOLUONG").val();
                var ThanhTien = Number(SoLuongChiTiet.replaceAll(',', '')) * Number(Gia);
                $(this).parent().parent().find(".TIEN").val(formatMoney(ThanhTien));
                var tongtien = 0;
                $('.TIEN').map(function (index, el) {
                    tongtien = Number(tongtien) + Number($(el).val().replaceAll(',', ''))
                })
                $("#KLPHTHANHCONG").val(addCommas(tongtien))
            })
            $('body').on('keyup', '.SOLUONG', function (e) {
                var idEl = $(this).attr('id');
                var SoLuong = $('#' + idEl).val();
                var MenhGiaChiTiet = $(this).parent().parent().find(".GIA").val();
                var ThanhTien = Number(SoLuong.replaceAll(',', '')) * Number(MenhGiaChiTiet);
                $(this).parent().parent().find(".TIEN").val(formatMoney(ThanhTien));
                var tongtien = 0;
                $('.TIEN').map(function (index, el) {
                    tongtien = Number(tongtien) + Number($(el).val().replaceAll(',', ''))
                })
                $("#KLPHTHANHCONG").val(addCommas(tongtien))
            })
        })
    }
    $('body').on('keyup', '#MA', function () {
        if ($('#MA').val().length > 200) {
            var oAlert = new AlertDialog1('Thông báo');
            oAlert.show('Mã quá dài, vui lòng nhập lại', '40%', '50px');
            $('#MA').val('')
        }
    })
    $('body').on('keyup', '#TEN', function () {
        if ($('#TEN').val().length > 200) {
            var oAlert = new AlertDialog1('Thông báo');
            oAlert.show('Tên đợt phát hành trái phiếu quá dài, vui lòng nhập lại', '40%', '50px');
            $('#TEN').val('')
        }
    })
    $('body').on('keyup', '#SOQUYETDINH', function () {
        if ($('#SOQUYETDINH').val().length > 200) {
            var oAlert = new AlertDialog1('Thông báo');
            oAlert.show('Số quyết định quá dài, vui lòng nhập lại', '40%', '50px');
            $('#SOQUYETDINH').val('')
        }
    })
    $('body').on('keyup', '#MATRAIPHIEU', function () {
        if ($('#MATRAIPHIEU').val().length > 200) {
            var oAlert = new AlertDialog1('Thông báo');
            oAlert.show('Mã trái phiếu quá dài, vui lòng nhập lại', '40%', '50px');
            $('#MATRAIPHIEU').val('')
        }
    })
    $('body').on('keyup', '#GHICHU', function () {
        if ($('#GHICHU').val().length > 300) {
            var oAlert = new AlertDialog1('Thông báo');
            oAlert.show('Ghi chú quá dài, vui lòng nhập lại', '40%', '50px');
            $('#GHICHU').val('')
        }
    })

    $(document).ready(function () {
        $(document).ready(function () {
            var oDonvitiente = new ToChucMuaTP()
            oDonvitiente.getAll()
            var olistTiente = oDonvitiente.LIST
            var optionTiente = ''
            olistTiente.map((value, index) => {
                if (value.TRANGTHAI == "Đang hoạt động") {
                    optionTiente = optionTiente + '<option value="' + value.TOCHUCMUATPID + '"' + (index === 0 ? ' selected' : '') + '>' + value.TOCHUC + '</option>'
                }
            })
            $('body').on('change', '#DEANPHATHANHTRAIPHIEUID', function () {
                let dataDotPhatHanh = $("#DEANPHATHANHTRAIPHIEUID option:selected").attr('data-dotphathanh')
                let dataChiTiet = $("#DEANPHATHANHTRAIPHIEUID option:selected").attr('data-chitiet')
                $("#txtThongTinDuAnHopDong").text(dataChiTiet)
                $("#exampleModalLongTitle").text('Thêm mới đợt phát hành trái phiếu (Lần thứ ' + dataDotPhatHanh + ')')
                if (oDotPHTP.DOTPHATHANHTRAIPHIEUID == 0) {
                    $("#MA").val($("#DEANPHATHANHTRAIPHIEUID option:selected").attr('data-maDotPhatHanh'))
                }
                $("#TEN").val('Đợt phát hành trái phiếu (Mã đề án: ' + $("#DEANPHATHANHTRAIPHIEUID option:selected").attr('data-ma') + ');(Lần thứ: ' + $("#DEANPHATHANHTRAIPHIEUID option:selected").attr('data-dotphathanh') + ')')
                $("#KLPHDUKIEN").val(formatMoney($("#DEANPHATHANHTRAIPHIEUID option:selected").attr('data-toida')))
                $("#LAISUATPHDUKIEN").val($("#DEANPHATHANHTRAIPHIEUID option:selected").attr('data-laisuat'))
                $("#LAISUATPHTHANHCONG").val($("#DEANPHATHANHTRAIPHIEUID option:selected").attr('data-laisuat'))
                $("#PHUONGTHUCPHATHANH").val($("#DEANPHATHANHTRAIPHIEUID option:selected").attr('data-phuongthuc'))
                var MenhGiaNgayDaoHan = $("#DEANPHATHANHTRAIPHIEUID option:selected").attr('data-menhgia-ngaydaohan');
                MenhGiaTraiPhieu = MenhGiaNgayDaoHan.split('@')[0];
                optionMenhGia = '';
                MenhGiaTraiPhieu.split(';').map(value => {
                    var vConvertGiaTri = fnc_replace(value, ',', '').trim();
                    if (String(vConvertGiaTri).length > 1) {
                        optionMenhGia = optionMenhGia + "<option value='" + vConvertGiaTri + "'>" + formatMoney(vConvertGiaTri) + " VNĐ</option>"
                    }
                })
                $(".GIA").html(optionMenhGia).trigger('change')
                NgayDaoHanTraiPhieu = MenhGiaNgayDaoHan.split('@')[1].split('/')[2] + '-' + MenhGiaNgayDaoHan.split('@')[1].split('/')[1] + "-" + MenhGiaNgayDaoHan.split('@')[1].split('/')[0];
            })
            $('body').on('click', '#ActionThemMoi', function () {
                id++;
                var selectToChuc = '<select class = "TOCHUC" id="TOCHUC' + id + '" data-index="' + id + '">' + optionTiente + '</select>'
                var option = '<tr class="input-table" id="element-' + id + '">\
                    <td><label class="stt">' + id + '</label></td>\
                    <td>' + selectToChuc + '</td>\
                    <td><input style="text-align: right;" type="text" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" data-type="currency" value="" class="SOLUONG" id="SOLUONG' + id + '" /></td>\
                    <td><select class="GIA">"'+ optionMenhGia + '"</select></td>\
                    <td><input disabled style="background-color: #d5d5d5;" type="text" class="TIEN NUMBER_DISABLED" id="TIEN' + id + '" /></td>\
                    <td><input type="date"  data-date="" data-date-format="DD MMMM YYYY" class="NGAYMUA" id="NGAYMUA' + id + '" value="' + NgayHomNay + '" /></td>\
                    <td><input type="text" class="GHICHU" id="GHICHU' + id + '" /></td>\
                    <td style="text-align: center"><button class="btn btn-danger button-clear" id="element-' + id + '">Xóa</button></td>\
                    </tr>';
                $('#table-multi').append(option)
                var ypos = $('#hdScrolltbl-1 table tr').offset().top;
                $('#hdScrolltbl-1').animate({
                    scrollTop: $('#hdScrolltbl-1').scrollTop() + ypos
                }, 500);
                var my = setInterval(() => {
                    $('#hdtbl-1') ? $('#hdtbl-1').css('top', '') : () => {
                        return
                    };
                }, 10);
                $('#table-multi tr').map((index, el) => {
                    $('#' + $(el).attr('id') + ' td .stt').html(Number(index) + 1)
                })
            })
            $('body').on('click', '.button-clear', function () {
                var id_1 = $(this).attr('id')
                var stt = Number($('#' + $(this).attr('id') + ' td .stt').html())
                $('tr#' + id_1).remove()
                stt = stt
                $('#table-multi tr').map((index, el) => {
                    var stt_el = Number($('#' + $(el).attr('id') + ' td .stt').html());
                    if (stt_el > stt) {
                        $('#' + $(el).attr('id') + ' td .stt').html(stt_el - 1)
                    }
                })
                $('.SOLUONGSAUHOANDOI').trigger('keyup')
            })
            $('body').on('keyup', '.SOLUONG', function () {
                var arrObj = [];
                var list_tr_TOCHUC = $('.input-table .TOCHUC')
                var list_tr_GIA = $('.input-table .GIA')
                var list_tr_NGAYMUA = $('.input-table .NGAYMUA')
                var r_list_tr_TOCHUC = []
                var r_list_tr_GIA = []
                var r_list_tr_NGAYMUA = []
                list_tr_TOCHUC.map((index, value) => {
                    r_list_tr_TOCHUC.push($(value).val())
                })
                list_tr_GIA.map((index, value) => {
                    r_list_tr_GIA.push($(value).val())
                })
                list_tr_NGAYMUA.map((index, value) => {
                    r_list_tr_NGAYMUA.push($(value).val())
                })
                for (var i = 0; i < r_list_tr_TOCHUC.length; i++) {
                    arrObj.push({
                        toChuc: r_list_tr_TOCHUC[i],
                        menhGia: r_list_tr_GIA[i],
                        ngayMua: r_list_tr_NGAYMUA[i]
                    })
                }
                if (arrObj.length > 1) {
                    for (var i = 0; i < arrObj.length; i++) {
                        for (var j = i + 1; j < arrObj.length; j++) {
                            if (arrObj[i].toChuc == arrObj[j].toChuc && arrObj[i].menhGia == arrObj[j].menhGia && arrObj[i].ngayMua == arrObj[j].ngayMua) {
                                var ngayMuaTren = $("#NGAYMUA" + j).val()
                                var today = new Date(ngayMuaTren);
                                var tomorrow = new Date(today);
                                tomorrow.setDate(today.getDate() + 1);
                                $("#NGAYMUA" + Number(j + 1)).val(formatDate(tomorrow))
                            }
                            else {
                                if (arrObj[i].toChuc == arrObj[j].toChuc && arrObj[i].menhGia == arrObj[j].menhGia && arrObj[i].ngayMua == arrObj[j].ngayMua) {
                                    var ngayMuaTren = $("#NGAYMUA" + j).val()
                                    var today = new Date(ngayMuaTren);
                                    var tomorrow = new Date(today);
                                    tomorrow.setDate(today.getDate() + 1);
                                    $("#NGAYMUA" + Number(j + 1)).val(formatDate(tomorrow))
                                }
                            }
                        }
                    }
                }
            })
            $('body').on('change', '.NGAYMUA', function () {
                var ngayPhatHanh = $("#NGAYPHATHANH").val().split('/')[2] + $("#NGAYPHATHANH").val().split('/')[1] + $("#NGAYPHATHANH").val().split('/')[0]
                var ngayMua = fnc_replace($(this).val(), '-', '')
                if (Number(ngayMua) < Number(ngayPhatHanh)) {
                    $(this).val($("#NGAYPHATHANH").val().split('/')[2] + '-' + $("#NGAYPHATHANH").val().split('/')[1] + '-' + $("#NGAYPHATHANH").val().split('/')[0])
                }
            })
            $('body').on('keyup', '.SOLUONG', function () {
                fnc_formatKeyUp();
                var soLuong = $(this).val()
                var soLuongRemove = fnc_remove0firt(soLuong)
                $(this).val(soLuongRemove)
                if ($(this).val().includes('.')) {
                    var soLuongCham = $(this).val().split('.').join('')
                    $(this).val(soLuongCham)
                }
            })

            that.oTable = ControlHelper.Datatable.Init('Grid01', 25, true);
            that.oDialog = new PopupDialog(reload);
            that.init();

            function reload() {
                that.bindGrid01();
                that.filterAction('NEW');
            }
            $('.price').on('keyup', '.GHICHU', function () {
                if (Number($(this).val().length) > 500) {
                    $(this).val('Ghi chú quá dài!')
                }
            })
            $('body').on('click', '.btnTaixuong', function () {
                var url = CONFIG_API.URL.SEVER + $(this).attr('val')
                window.open(url)
            })
            $('.ACTIONS').on('click', '#btnAddNew', function (e) {
                e.preventDefault()
                DeAnPHTPs.getAll();
                var resultDeAn = DeAnPHTPs.LIST
                var option = ''
                resultDeAn.map(value => {
                    if (value.SOQUYETDINH != null) {
                        option = option + "<option data-menhgia-ngaydaohan ='" + value.MENHGIA + '@' + value.KYHANTHANHTOAN + "' data-phuongthuc='" + value.PHUONGTHUCPHATHANH + "' data-laisuat='" + value.LAISUATPHATHANH + "' data-toida='" + value.TOIDADUOCPHATHANH + "' data-ma='" + value.MA + "' data-maDotPhatHanh='" + "PHTP/" + value.MA + "/" + value.SOQUYETDINH + "/" +
                            (value.DOTPHATHANH < 10 ? ("00" + value.DOTPHATHANH) : value.DOTPHATHANH < 100 ? ("0" + value.DOTPHATHANH) : value.DOTPHATHANH) +
                            "' data-dotphathanh='" + value.DOTPHATHANH + "' data-chitiet= '" +
                            "QĐ số: " + value.SOQUYETDINH +
                            "; Ngày phát hành: " + value.THOIGIANPHATHANH +
                            "; Ngày đáo hạn: " + value.KYHANTHANHTOAN +
                            "; Loại " + (value.NGAYKYHANTRAIPHIEU < 5 ? "ngắn hạn" : value.NGAYKYHANTRAIPHIEU < 12 ? "trung hạn" : "dài hạn") +
                            "; Khối lượng: " + formatMoney(value.KHOILUONGPHATHANH) +
                            " VNĐ; Mệnh giá: " + value.MENHGIA + " VNĐ" +
                            "; Lãi suất: " + value.LAISUATPHATHANH + "%" +
                            "' data-kyhantraiphieu='" + value.NGAYKYHANTRAIPHIEU + "' value='" + value.DEANPHATHANHTRAIPHIEUID + "'>" + value.TEN + "</option>"
                    } else {
                        option = option + "<option data-menhgia-ngaydaohan ='" + value.MENHGIA + '@' + value.KYHANTHANHTOAN + "' data-phuongthuc='" + value.PHUONGTHUCPHATHANH + "' data-laisuat='" + value.LAISUATPHATHANH + "' data-toida='" + value.TOIDADUOCPHATHANH + "' data-ma='" + value.MA + "' data-maDotPhatHanh='" + "PHTP/" + value.MA + "/" +
                            (value.DOTPHATHANH < 10 ? ("00" + value.DOTPHATHANH) : value.DOTPHATHANH < 100 ? ("0" + value.DOTPHATHANH) : value.DOTPHATHANH) +
                            "' data-dotphathanh='" + value.DOTPHATHANH + "' data-chitiet= '" +
                            "Ngày phát hành: " + value.THOIGIANPHATHANH +
                            "; Ngày đáo hạn: " + value.KYHANTHANHTOAN +
                            "; Loại " + (value.NGAYKYHANTRAIPHIEU < 5 ? "ngắn hạn" : value.NGAYKYHANTRAIPHIEU < 12 ? "trung hạn" : "dài hạn") +
                            "; Khối lượng: " + formatMoney(value.KHOILUONGPHATHANH) +
                            " VNĐ; Mệnh giá: " + value.MENHGIA + " VNĐ" +
                            "; Lãi suất: " + value.LAISUATPHATHANH + "%" +
                            "' data-kyhantraiphieu='" + value.NGAYKYHANTRAIPHIEU + "' value='" + value.DEANPHATHANHTRAIPHIEUID + "'>" + value.TEN + "</option>"
                    }
                })
                $('#DEANPHATHANHTRAIPHIEUID').html(option)
                $("#Grid01").find('.selected').removeClass('selected');
                id = 0;
                idDotPHTP = 0;
                maDotphtp = '';
                $('#table-multi').empty();
                $('#list_uploadfile').html('');
                $('#MA').val('');
                $('#TEN').val('');
                $('#SOQUYETDINH').val('');
                $('#TENTOCHUCPHATHANH').val('');
                $('#KLPHDUKIEN').val('');
                $('#KLPHTHANHCONG').val('');
                $('#LAISUATPHDUKIEN').val('');
                $('#LAISUATPHTHANHCONG').val('');
                $('#KYHANTRAIPHIEU').val('');
                $('#TIENTHUCNHAN').val('');
                $('#NGAYQUYETDINH').val($.datepicker.formatDate('dd/mm/yy', new Date()));
                $('#GHICHU').val('');
                $('#MATRAIPHIEU').val('');
                $('#THOIHANTRAIPHIEU').val('');
                $('#NGAYPHATHANH').val($.datepicker.formatDate('dd/mm/yy', new Date()));
                $("#DEANPHATHANHTRAIPHIEUID").prop('disabled', false)
                that.bindModal();
                $("#DEANPHATHANHTRAIPHIEUID").trigger('change')
            });
            $('.ACTIONS').on('click', '#btnEdit', function () {
                oDotPHTP.getById(idDotPHTP);
                let data = JSON.parse(maDotphtp)
                $('#DEANPHATHANHTRAIPHIEUID').val(data.DEANPHATHANHTRAIPHIEUID).select2();
                $('#MA').val(data.MA);
                $('#TEN').val(data.TEN);
                $('#SOQUYETDINH').val(data.SOQUYETDINH);
                $('#NGAYQUYETDINH').val(data.NGAYQUYETDINH);
                $('#PHUONGTHUCPHATHANH').val(data.PHUONGTHUCPHATHANH).select2();
                $('#NGAYPHATHANH').val(data.NGAYPHATHANH);
                $('#KLPHDUKIEN').val(formatMoney(data.KLPHDUKIEN));
                $('#KLPHTHANHCONG').val(formatMoney(data.KLPHTHANHCONG));
                $('#LAISUATPHDUKIEN').val(data.LAISUATPHDUKIEN);
                $('#LAISUATPHTHANHCONG').val(data.LAISUATPHTHANHCONG);
                $('#GHICHU').val(data.GHICHU);
                $('#MATRAIPHIEU').val(data.MATRAIPHIEU);
                $("#exampleModalLongTitle").text('Sửa đợt phát hành trái phiếu')
                $("#DEANPHATHANHTRAIPHIEUID").trigger('change')
                id = 1
                $('#table-multi').empty();
                var listphtp = oDotPHTP.getDetail(madphtp);
                listphtp.map(value => {
                    var oDonvitiente = new ToChucMuaTP()
                    oDonvitiente.getAll()
                    var olistTiente = oDonvitiente.LIST
                    var optionTiente = ''
                    olistTiente.map((value, index) => {
                        if (value.TRANGTHAI == "Đang hoạt động") {
                            optionTiente = optionTiente + '<option value="' + value.TOCHUCMUATPID + '"' + (index === 0 ? ' selected' : '') + '>' + value.TOCHUC + '</option>'
                        }
                    })
                    var selectToChuc = '<select class = "TOCHUC" id="TOCHUC' + id + '" data-index="' + id + '">' + optionTiente + '</select>'
                    var MenhGiaNgayDaoHan = $("#DEANPHATHANHTRAIPHIEUID option:selected").attr('data-menhgia-ngaydaohan');
                    MenhGiaTraiPhieu = MenhGiaNgayDaoHan.split('@')[0];
                    optionMenhGia = '';
                    MenhGiaTraiPhieu.split(';').map(value => {
                        var vConvertGiaTri = fnc_replace(value, ',', '').trim();
                        if (String(vConvertGiaTri).length > 1) {
                            optionMenhGia = optionMenhGia + "<option value='" + vConvertGiaTri + "'>" + formatMoney(vConvertGiaTri) + " VNĐ</option>"
                        }
                    })
                    var option = '<tr class="input-table" id="element-' + id + '">\
                    <td><label class="stt">' + id + '</label></td>\
                    <td>' + selectToChuc + '</td>\
                    <td><input style="text-align: right;" type="text" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" data-type="currency" value="" class="SOLUONG" id="SOLUONG' + id + '" /></td>\
                    <td><select class="GIA" id="GIA' + id + '" data-index="' + id + '">' + optionMenhGia + '</select></td>\
                    <td><input disabled style="background-color: #d5d5d5;" type="text" class="TIEN NUMBER_DISABLED" id="TIEN' + id + '" /></td>\
                    <td><input type="date"  data-date="" data-date-format="DD MMMM YYYY" class="NGAYMUA" id="NGAYMUA' + id + '" value="' + NgayHomNay + '" /></td>\
                    <td><input type="text" class="GHICHU" id="GHICHU' + id + '" /></td>\
                    <td style="text-align: center"><button class="btn btn-danger button-clear" id="element-' + id + '">Xóa</button></td>\
                    </tr>';
                    $('#table-multi').append(option)
                    $('#GIA' + id + '').val(value.GIA)
                    $('#SOLUONG' + id + '').val(formatMoney(value.SOLUONGMUA))
                    $('#NGAYMUA' + id + '').val(value.NGAYMUA)
                    $('#GHICHU' + id + '').val(value.GHICHU)
                    $('#TOCHUC' + id + '').val(value.TOCHUCTAICHINHID)
                    id++;
                })
                $(".SOLUONG").trigger('keyup')
                $('body').on('keyup', '.SOLUONG', function (e) {
                    var idEl = $(this).attr('id');
                    var SoLuong = $('#' + idEl).val();
                    var MenhGiaChiTiet = $(this).parent().parent().find(".GIA").val();
                    var ThanhTien = Number(SoLuong.replaceAll(',', '')) * Number(MenhGiaChiTiet);
                    $(this).parent().parent().find(".TIEN").val(formatMoney(ThanhTien));
                    var tongtien = 0;
                    $('.TIEN').map(function (index, el) {
                        tongtien = Number(tongtien) + Number($(el).val().replaceAll(',', ''))
                    })
                    $("#KLPHTHANHCONG").val(addCommas(tongtien))
                })
                $("#DEANPHATHANHTRAIPHIEUID").prop('disabled', true)
            });
            $('.ACTIONS').on('click', '#btnDelete', function (e) {
                e.preventDefault()

                if (!idDotPHTP) {
                    var oAlert = new AlertDialog('Cảnh báo');
                    oAlert.show('Chưa chọn đợt phát hành trái phiếu để xóa', '40%', '50px');
                    return false;
                }

                function ok() {
                    var rs = oDotPHTP.del(idDotPHTP);
                    var oAlert = new AlertDialog('Thông báo');
                    oAlert.show(rs.MESSAGE, '40%', '50px');
                    //reload sau khi delete
                    that.bindGrid01();
                    reload();
                }

                function cancel() { }

                var oConfirmDialog = new ConfirmDialog('Xác nhận xóa', ok, cancel);
                oConfirmDialog.show('Bạn có chắc chắn muốn xóa bản ghi này không?', '40%', '50px');
            });
            $(".btnSave").on('click', function (e) {
                if (isDoubleClicked($(this))) return;
                e.preventDefault()
                oDotPHTP.DOTPHATHANHTRAIPHIEUID = 0
                String.prototype.replaceAll = function (search, replacement) {
                    var target = this;
                    return target.replace(new RegExp(search, 'g'), replacement);
                };
                var fl = Validate.required();
                if (fl) {
                    var list_tr_TOCHUC = $('.input-table .TOCHUC')
                    var list_tr_SOLUONG = $('.input-table .SOLUONG')
                    var list_tr_GIA = $('.input-table .GIA')
                    var list_tr_NGAYMUA = $('.input-table .NGAYMUA')
                    var list_tr_GHICHU = $('.input-table .GHICHU')
                    var r_list_tr_TOCHUC = []
                    var r_list_tr_SOLUONG = []
                    var r_list_tr_GIA = []
                    var r_list_tr_NGAYMUA = []
                    var r_list_tr_GHICHU = []
                    list_tr_TOCHUC.map((index, value) => {
                        r_list_tr_TOCHUC.push($(value).val())
                    })
                    list_tr_SOLUONG.map((index, value) => {
                        r_list_tr_SOLUONG.push($(value).val())
                    })
                    list_tr_GIA.map((index, value) => {
                        r_list_tr_GIA.push($(value).val())
                    })
                    list_tr_NGAYMUA.map((index, value) => {
                        r_list_tr_NGAYMUA.push($(value).val())
                    })
                    list_tr_GHICHU.map((index, value) => {
                        r_list_tr_GHICHU.push($(value).val())
                    })
                    if (maDotphtp.length > 0) {
                        oDotPHTP.DOTPHATHANHTRAIPHIEUID = JSON.parse(maDotphtp).DOTPHATHANHTRAIPHIEUID;
                    }
                    oDotPHTP.MA = $('#MA').val();
                    oDotPHTP.TEN = $('#TEN').val();
                    oDotPHTP.SOQUYETDINH = $('#SOQUYETDINH').val();
                    oDotPHTP.NGAYQUYETDINH = $('#NGAYQUYETDINH').val();
                    oDotPHTP.KLPHDUKIEN = Number(fnc_replace($('#KLPHDUKIEN').val(), ',', ''));
                    oDotPHTP.KLPHTHANHCONG = Number(fnc_replace($('#KLPHTHANHCONG').val(), ',', ''));
                    oDotPHTP.LAISUATPHDUKIEN = Number($('#LAISUATPHDUKIEN').val());
                    oDotPHTP.LAISUATPHTHANHCONG = Number($('#LAISUATPHTHANHCONG').val());
                    oDotPHTP.GHICHU = $('#GHICHU').val();
                    oDotPHTP.DEANPHATHANHTRAIPHIEUID = Number($('#DEANPHATHANHTRAIPHIEUID').val());
                    oDotPHTP.NGAYPHATHANH = $('#NGAYPHATHANH').val();
                    oDotPHTP.PHUONGTHUCPHATHANH = Number($('#PHUONGTHUCPHATHANH').val());
                    oDotPHTP.MATRAIPHIEU = $('#MATRAIPHIEU').val();
                    oDotPHTP.UUID = uuidv4();
                    var querry = '';
                    querry = "Insert all ";
                    for (var i = 0; i < r_list_tr_TOCHUC.length; i++) {
                        var uuid = uuidv4();
                        querry = querry +
                            " Into QLN_DOTPHATHANHTRAIPHIEU_CHITIET(DOTPHATHANHTRAIPHIEUID, TOCHUCTAICHINHID, SOLUONGMUA, NGAYMUA, GHICHU, GIA,UUID) VALUES('" +
                            $("#MA").val() + "'," +
                            fnc_nvl(r_list_tr_TOCHUC[i], 0) + ", " +
                            fnc_nvl(r_list_tr_SOLUONG[i], 0).replaceAll(',', '') + ",  to_date('" +
                            r_list_tr_NGAYMUA[i] + "', 'yyyy-MM-dd'), '" +
                            r_list_tr_GHICHU[i] + "', " +
                            fnc_nvl(r_list_tr_GIA[i], 0) + ",'" + uuid + "' )";
                    }
                    querry = querry + " Select 1 from dual";
                    var pDelete = '';
                    pDelete = "Delete QLN_DOTPHATHANHTRAIPHIEU_CHITIET where DOTPHATHANHTRAIPHIEUID ='" + $('#MA').val() + "'"
                    var rs = oDotPHTP.save();
                    if (rs.CODE == 0) {
                        oDotPHTP.savedtl(pDelete, querry);
                    }
                    // $("#idrowtable").val(rs.RESULT)
                    // $("#tablename").val(CurrentLayout)
                    // var rs1 = DATA.ajaxPostForm(CONFIG_API.URL.SEVER + 'upload', 'uploadForm')
                    // if (!rs1.success) {
                    //     oDotPHTP.deluid(rs.RESULT)
                    //     var oAlert = new AlertDialog('Thông báo');
                    //     oAlert.show(rs1.message, '40%', '50px');
                    //     that.bindGrid01();
                    // }
                    // else {
                    that.bindGrid01();
                    var oAlert = new AlertDialog('Thông báo');
                    oAlert.show(rs.MESSAGE, '40%', '50px');
                    // }
                }
            })
            $('#Grid01 tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                    oDotPHTP.DOTPHATHANHTRAIPHIEUID = 0;
                    that.filterAction('NEW');
                } else {
                    that.oTable.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    idDotPHTP = $(this).find('.rowID').val();
                    maDotphtp = $(this).find('.rowMA').text();
                    madphtp = JSON.parse(maDotphtp).MA
                    that.filterAction('SELECT');
                }
            });
        });
    })
}