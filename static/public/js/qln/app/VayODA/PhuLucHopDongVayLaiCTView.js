var PhuLucHopDongVayLaiCTView = function () {

    var that = this;
    this.oTable = null;
    this.oDialog = null;
    var oPhuLucHopDongVayLai = new PhuLucHopDongVayLai();
    this.initPage = function () {
        $('#AppTitle').html(that.AppTitle);
        oPhuLucHopDongVayLai.PHULUCHOPDONGVAYLAIID = Util.Url.getParameterByName('id');
        that.bindForm();
    }

    this.bindForm = function () {
        if (!oPhuLucHopDongVayLai.PHULUCHOPDONGVAYLAIID || oPhuLucHopDongVayLai.PHULUCHOPDONGVAYLAIID == '') {
            that.AppTitle = 'Thêm mới Kế hoạch';
            oPhuLucHopDongVayLai.PHULUCHOPDONGVAYLAIID = 0;
            that.clearForm();
        } else {
            var HopDongVayLais = new HopDongVayLai()
            HopDongVayLais.getAll();
            $(document).ready(() => {
                let id_f = $("#HOPDONGVAYLAIID").val();
                var result_f = HopDongVayLais.getById(id_f);
                if (result_f) {
                    $("#TENDUAN").val(result_f[0].TENDUAN)
                }
            })
            that.AppTitle = 'Cập nhật Kế hoạch';
            oPhuLucHopDongVayLai.getById(oPhuLucHopDongVayLai.PHULUCHOPDONGVAYLAIID);
            $('#MA').val(oPhuLucHopDongVayLai.MA);
            $('#TENPHULUC').val(oPhuLucHopDongVayLai.TENPHULUC);
            $('#HOPDONGVAYLAIID').val(oPhuLucHopDongVayLai.HOPDONGVAYLAIID);
            $('#NGAYKY').val(oPhuLucHopDongVayLai.NGAYKY);
            $('#NGUOIKY').val(oPhuLucHopDongVayLai.NGUOIKY);
            $('#TINHTHANHID').val(oPhuLucHopDongVayLai.TINHTHANHID);
            $('#GHICHU').val(oPhuLucHopDongVayLai.GHICHU);
            $('#STATUS').val(oPhuLucHopDongVayLai.STATUS);
            $('#CREATEDDATE').val(oPhuLucHopDongVayLai.CREATEDDATE);
            $('#CREATEDBY').val(oPhuLucHopDongVayLai.CREATEDBY);
            $('#UPDATEDDATE').val(oPhuLucHopDongVayLai.UPDATEDDATE);
            $('#UPDATEDBY').val(oPhuLucHopDongVayLai.UPDATEDBY);
        }
    }

    this.clearForm = function () {
        $('#MA').val('');
        $('#TENPHULUC').val('');
        $("#NGAYKY").val($.datepicker.formatDate('dd/mm/yy', new Date()))
        $('#NGUOIKY').val('');
        $('#GHICHU').val('');
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
        var TinhThanhs = new TinhThanh()
        TinhThanhs.getAll();
        $(document).ready(() => {
            var resultTinhthanh = TinhThanhs.LIST
            var option = ''
            resultTinhthanh.map(value => {
                option = option + "<option value='" + value.TINHTHANHID + "'>" + value.TEN + "</option>"
            })
            $('#TINHTHANHID').append(option)
            that.initPage();
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

        var HopDongVayLais = new HopDongVayLai()
        HopDongVayLais.getAll();
        $(document).ready(() => {
            var resultHopDongVayLai = HopDongVayLais.LIST
            var option = ''
            resultHopDongVayLai.map((value, index) => {
                option = option + "<option value='" + value.HOPDONGVAYLAIID + "'>" + value.TEN + "</option>"
            })
            $('#HOPDONGVAYLAIID').append(option)
            let id_f = $("#HOPDONGVAYLAIID").val();
            var result_f = HopDongVayLais.getById(id_f);
            if (result_f) {
                $("#TENDUAN").val(result_f[0].TENDUAN)
            }
            $("#HOPDONGVAYLAIID").change(() => {
                let id = $("#HOPDONGVAYLAIID").val();
                var result = HopDongVayLais.getById(id);
                if (result) {
                    $("#TENDUAN").val(result[0].TENDUAN)
                }
            })
        })

        that.oDialog = new PopupDialog(reload);
        that.initPage();
        function reload() {
            that.initPage();
        }

        $(function () {
            that.oDialog = new PopupDialog(reload);
            that.initPage();
            function reload() {
                that.initPage();
            }
            $('.ACTIONS').on('click', '#btnSave', function () {
                oPhuLucHopDongVayLai.PHULUCHOPDONGVAYLAIID = oPhuLucHopDongVayLai.PHULUCHOPDONGVAYLAIID
                if (oPhuLucHopDongVayLai.PHULUCHOPDONGVAYLAIID == '') {
                    oPhuLucHopDongVayLai.PHULUCHOPDONGVAYLAIID = 0;
                }
                oPhuLucHopDongVayLai.MA = $('#MA').val();
                oPhuLucHopDongVayLai.TENPHULUC = $('#TENPHULUC').val();
                oPhuLucHopDongVayLai.HOPDONGVAYLAIID = $('#HOPDONGVAYLAIID').val();
                oPhuLucHopDongVayLai.NGAYKY = $('#NGAYKY').val();
                oPhuLucHopDongVayLai.NGUOIKY = $('#NGUOIKY').val();
                oPhuLucHopDongVayLai.TINHTHANHID = $('#TINHTHANHID').val();
                oPhuLucHopDongVayLai.GHICHU = $('#GHICHU').val();
                oPhuLucHopDongVayLai.STATUS = $('#STATUS').val();
                oPhuLucHopDongVayLai.CREATEDDATE = $('#CREATEDDATE').val();
                oPhuLucHopDongVayLai.CREATEDBY = $('#CREATEDBY').val();
                oPhuLucHopDongVayLai.UPDATEDDATE = $('#UPDATEDDATE').val();
                oPhuLucHopDongVayLai.UPDATEDBY = $('#UPDATEDBY').val();
                var rs = oPhuLucHopDongVayLai.save();
                if (!rs.CODE) {
                    that.initPage();
                }
                alert(rs.MESSAGE);
            });
        });
    });
}