var DonViTienTeCTView = function () {

    var that = this;
    this.oTable = null;
    this.oDialog = null;
    var oDonViTienTe = new DonViTienTe();
    this.initPage = function () {
        $('#AppTitle').html(that.AppTitle);
        oDonViTienTe.TIENTEID = Util.Url.getParameterByName('id');
        that.bindForm();
    }

    this.bindForm = function () {
        if (!oDonViTienTe.TIENTEID || oDonViTienTe.TIENTEID == '') {
            that.AppTitle = 'Thêm mới tiền tệ';
            oDonViTienTe.TIENTEID = 0;
            that.clearForm();
        } else {
            that.AppTitle = 'Cập nhật tiền tệ';
            oDonViTienTe.getById(oDonViTienTe.TIENTEID);
            $('#MA').val(oDonViTienTe.MA);
            $('#TEN').val(oDonViTienTe.TEN);
            $('#NOTE').val(oDonViTienTe.NOTE);
            $('#STATUS').val(oDonViTienTe.STATUS);
            $('#CREATEDDATE').val(oDonViTienTe.CREATEDDATE);
            $('#CREATEDBY').val(oDonViTienTe.CREATEDBY);
            $('#UPDATEDDATE').val(oDonViTienTe.UPDATEDDATE);
            $('#UPDATEDBY').val(oDonViTienTe.UPDATEDBY);
        }
    }

    this.clearForm = function () {
        $('#MA').val('');
        $('#TEN').val('');
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
            if (oDonViTienTe.TIENTEID == '')
                oDonViTienTe.TIENTEID = 0;
            oDonViTienTe.MA = $('#MA').val();
            oDonViTienTe.TEN = $('#TEN').val();
            oDonViTienTe.NOTE = $('#NOTE').val();
            var rs = oDonViTienTe.save();
            if (!rs.CODE) {
                that.initPage();
            }
            alert(rs.MESSAGE);
        });
    });
}