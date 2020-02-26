var DotTraNoCTView = function () {

    var that = this;
    this.oTable = null;
    this.oDialog = null;
    var oDotTraNo = new DotTraNo();
    this.initPage = function () {
        $('#AppTitle').html(that.AppTitle);
        oDotTraNo.DOTTRANOID = Util.Url.getParameterByName('id');
        that.bindForm();
    }

    this.bindForm = function () {
        if (!oDotTraNo.DOTTRANOID || oDotTraNo.DOTTRANOID == '') {
            that.AppTitle = 'Thêm mới đợt trả nợ';
            oDotTraNo.DOTTRANOID = 0;
            that.clearForm();
        } else {
            var oHopDong = new HopDongVayLai();
            oHopDong.getAll();
            $(document).ready(() => {
                let id_first = $("#HOPDONGVAYLAIID").val();
                var result_first = oHopDong.getById(id_first);
                if (result_first) {
                    $("#TIENKYVAY").val(result_first[0].TIENKYVAY)
                    $("#TENDUAN").val(result_first[0].TENDUAN)
                }
                $("#SOTIENTRAGOC").on('keyup change', function () {
                    var tg = $("#TIENKYVAY").val() - $("#SOTIENTRAGOC").val()
                    $("#DUNO").val(tg)
                })
            })
            that.AppTitle = 'Cập nhật đợt trả nợ';
            oDotTraNo.getById(oDotTraNo.DOTTRANOID);
            $('#MA').val(oDotTraNo.MA);
            $('#HOPDONGVAYLAIID').val(oDotTraNo.HOPDONGVAYLAIID);
            $('#NGUONVAY').val(oDotTraNo.NGUONVAY);
            $('#KYTRA').val(oDotTraNo.KYTRA);
            $('#TIENTEID').val(oDotTraNo.TIENTEID);
            $('#SOTIENTRAGOC').val(oDotTraNo.SOTIENTRAGOC);
            $('#SOTIENTRALAI').val(oDotTraNo.SOTIENTRALAI);
            $('#SOTIENTRAPHI').val(oDotTraNo.SOTIENTRAPHI);
            $('#SOTIENPHAT').val(oDotTraNo.SOTIENPHAT);
            $('#SOLECHCHI').val(oDotTraNo.SOLECHCHI);
            $('#DUNO').val(oDotTraNo.DUNO);
            $('#NGAYTRA').val(oDotTraNo.NGAYTRA);
            $('#STATUS').val(oDotTraNo.STATUS);
            $('#CREATEDDATE').val(oDotTraNo.CREATEDDATE);
            $('#CREATEDBY').val(oDotTraNo.CREATEDBY);
            $('#UPDATEDDATE').val(oDotTraNo.UPDATEDDATE);
            $('#UPDATEDBY').val(oDotTraNo.UPDATEDBY);
        }
    }

    this.clearForm = function () {
        $('#MA').val('');
        $("#KYTRA").val($.datepicker.formatDate('dd/mm/yy', new Date()))
        $('#SOTIENTRAGOC').val('');
        $('#SOTIENTRALAI').val('');
        $('#SOTIENTRAPHI').val('');
        $('#SOTIENPHAT').val('');
        $('#SOLECHCHI').val('');
        $("#NGAYTRA").val($.datepicker.formatDate('dd/mm/yy', new Date()))
        $('#DUNO').val('');
        $('#STATUS').val('');
        $('#CREATEDDATE').val('');
        $('#CREATEDBY').val('');
        $('#UPDATEDDATE').val('');
        $('#UPDATEDBY').val(1);
    }

    $(function () {
        that.oDialog = new PopupDialog(reload);
        that.initPage();

        function reload() {
            that.initPage();
        }
        var oHopDong = new HopDongVayLai();
        oHopDong.getAll();
        $(document).ready(() => {
            var resultHopDong = oHopDong.LIST
            var option = ''
            resultHopDong.map((value, index) => {
                option = option + "<option value='" + value.HOPDONGVAYLAIID + "'>" + value.TEN + "</option>"
            })

            $('#HOPDONGVAYLAIID').append(option)
            let id_f = $("#HOPDONGVAYLAIID").val();
            var result_f = oHopDong.getById(id_f);
            if (result_f) {
                $("#TIENKYVAY").val(result_f[0].TIENKYVAY)
                $("#TENDUAN").val(result_f[0].TENDUAN)
                $("LUYKETRANOGOC").val(result_f[0].LUYKETRAGOC)
            }
            $("#HOPDONGVAYLAIID").change(() => {
                let id = $("#HOPDONGVAYLAIID").val();
                var result = oHopDong.getById(id);
                if (result) {
                    $("#TIENKYVAY").val(result[0].TIENKYVAY)          
                }
                $("#TENDUAN").val(result[0].TENDUAN)
                $("#LUYKETRANOGOC").val(result[0].LUYKETRAGOC)
                var inp = $("#SOTIENVAY").val() - ("#LUYKETRANOGOC").val()
            })
            $("#SOTIENTRAGOC").on('keyup change', function () {
                var tg = $("#TIENKYVAY").val() - $("#SOTIENTRAGOC").val()
                $("#DUNO").val(tg)
            })
        })

        var DuAns = new HopDongVayLai()
        DuAns.getAll();
        $(document).ready(() => {
            var resultDuAn = DuAns.LIST
            var option = ''
            resultDuAn.map((value, index) => {
                option = option + "<option " + (index === 0 ? 'select="select"' : '') + "value =" + value.TENDUAN + ">"
            })
            $('#TENDUAN').append(option)
            that.initPage();
        })

        var SoTienVays = new HopDongVayLai()
        SoTienVays.getAll();
        $(document).ready(() => {
            var resultSoTienVay = SoTienVays.LIST
            // console.log(SoTienVays, 'list')
            var option = ''
            resultSoTienVay.map((value, index) => {
                option = option + "<option " + (index === 0 ? 'select="select"' : '') + "value =" + value.TIENVAY + ">"
            })
            $('#TIENVAY').append(option)
            that.initPage();
        })

        var TienTes = new DonViTienTe()
        TienTes.getAll();
        $(document).ready(() => {
            var resultTienTe = TienTes.LIST
            var option = ''
            resultTienTe.map(value => {
                option = option + "<option value='" + value.TIENTEID + "'>" + value.TEN + "</option>"
            })
            $('#TIENTEID').append(option)
            that.initPage();
        })

        that.oDialog = new PopupDialog(reload);
        that.initPage();

        function reload() {
            that.initPage();
        }

        $('.ACTIONS').on('click', '#btnLuu', function () {
            oDotTraNo.DOTTRANOID = oDotTraNo.DOTTRANOID
            if (oDotTraNo.DOTTRANOID == '') {
                oDotTraNo.DOTTRANOID = 0;
            }
            oDotTraNo.MA = $('#MA').val();
            oDotTraNo.HOPDONGVAYLAIID = $('#HOPDONGVAYLAIID').val();
            oDotTraNo.NGUONVAY = $('#NGUONVAY').val();
            oDotTraNo.KYTRA = $('#KYTRA').val();
            oDotTraNo.TIENTEID = $('#TIENTEID').val();
            oDotTraNo.SOTIENTRAGOC = $('#SOTIENTRAGOC').val();
            oDotTraNo.SOTIENTRALAI = $('#SOTIENTRALAI').val();
            oDotTraNo.SOTIENTRAPHI = $('#SOTIENTRAPHI').val();
            oDotTraNo.SOTIENPHAT = $('#SOTIENPHAT').val();
            oDotTraNo.SOLECHCHI = $('#SOLECHCHI').val();
            oDotTraNo.DUNO = $('#DUNO').val();
            oDotTraNo.NGAYTRA = $('#NGAYTRA').val();
            oDotTraNo.STATUS = $('#STATUS').val();
            oDotTraNo.CREATEDDATE = $('#CREATEDDATE').val();
            oDotTraNo.CREATEDBY = $('#CREATEDBY').val();
            oDotTraNo.UPDATEDDATE = $('#UPDATEDDATE').val();
            oDotTraNo.UPDATEDBY = $('#UPDATEDBY').val();
            var rs = oDotTraNo.save();
            // if (!rs.CODE) {
            //     that.initPage();
            // }
            var oAlert = new AlertDialog('Thông báo');
            oAlert.show(rs.MESSAGE, '40%', '50px');
            oDotTraNo.getAll();
        });
    });
}
