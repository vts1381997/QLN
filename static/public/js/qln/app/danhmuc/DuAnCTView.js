var DuAnCTView = function () {

    var that = this;
    this.oTable = null;
    this.oDialog = null;
    var oDuAn = new DuAn();

    this.initPage = function () {
        $('#AppTitle').html(that.AppTitle);
        oDuAn.DUANID = Util.Url.getParameterByName('id');
        that.bindForm();
    }

    this.bindForm = function () {
        if (!oDuAn.DUANID || oDuAn.DUANID == '') {
            that.AppTitle = 'Thêm mới dự án';
            oDuAn.DUANID = 0;
            that.clearForm();
        } else {
            that.AppTitle = 'Cập nhật dự án';
            oDuAn.getById(oDuAn.DUANID);
            $('#MA').val(oDuAn.MA);
            $('#TEN').val(oDuAn.TEN);
            $('#SOQUYETDINH').val(oDuAn.SOQUYETDINH);
            $('#NGAYKY').val(oDuAn.NGAYKY);
            $('#TONGGIATRI').val(oDuAn.TONGGIATRI);
            $('#DUNOVAY').val(oDuAn.DUNOVAY);
            $('#CHUDAUTU').val(oDuAn.CHUDAUTU);
            $('#DONVITHUCHIEN').val(oDuAn.DONVITHUCHIEN);
            $('#NOTE').val(oDuAn.NOTE);
            $('#STATUS').val(oDuAn.STATUS);
            $('#CREATEDDATE').val(oDuAn.CREATEDDATE);
            $('#CREATEDBY').val(oDuAn.CREATEDBY);
            $('#UPDATEDDATE').val(oDuAn.UPDATEDDATE);
            $('#UPDATEDBY').val(oDuAn.UPDATEDBY);
        }
    }

    this.clearForm = function () {
        $('#MA').val('');
        $('#TEN').val('');
        $('#SOQUYETDINH').val('');
        $("#NGAYKY").val($.datepicker.formatDate('dd/mm/yy', new Date()))
        $('#TONGGIATRI').val('');
        $('#DUNOVAY').val('');
        $('#CHUDAUTU').val('');
        $('#DONVITHUCHIEN').val('');
        $('#NOTE').val('');
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
        $('.ACTIONS').on('click', '#btnSave', function () {
            oDuAn.DUANID = oDuAn.DUANID
            if (oDuAn.DUANID == '')
                oDuAn.DUANID = 0;
            oDuAn.MA = $('#MA').val();
            oDuAn.TEN = $('#TEN').val();
            oDuAn.SOQUYETDINH = $('#SOQUYETDINH').val();
            oDuAn.NGAYKY = $('#NGAYKY').val();
            oDuAn.TONGGIATRI = $('#TONGGIATRI').val();
            oDuAn.DUNOVAY = $('#DUNOVAY').val();
            oDuAn.CHUDAUTU = $('#CHUDAUTU').val();
            oDuAn.DONVITHUCHIEN = $('#DONVITHUCHIEN').val();
            oDuAn.NOTE = $('#NOTE').val();
            var rs = oDuAn.save();
            if (!rs.CODE) {
                that.initPage();
            }
            alert(rs.MESSAGE);
        });
    });
}