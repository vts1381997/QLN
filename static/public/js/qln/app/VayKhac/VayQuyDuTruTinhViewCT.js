var VayQuyDuTruTinhViewCT = function () {

    var that = this;
    this.oTable = null;
    this.oDialog = null;
    var oVayQuyDuTruTinh = new VayQuyDuTruTinh();
    this.initPage = function () {
        $('#AppTitle').html(that.AppTitle);
        oVayQuyDuTruTinh.VAYQUYDUTRUTINHID = Util.Url.getParameterByName('id');
        that.bindForm();
    }

    this.bindForm = function () {
        if (!oVayQuyDuTruTinh.VAYQUYDUTRUTINHIDID || oVayQuyDuTruTinh.VAYQUYDUTRUTINHIDID == '') {
            that.AppTitle = 'Thêm mới';
            oVayQuyDuTruTinh.VAYQUYDUTRUTINHIDID = 0;
            that.clearForm();
        } else {
            that.AppTitle = 'Cập nhật';
            oVayQuyDuTruTinh.getById(oVayQuyDuTruTinh.VAYQUYDUTRUTINHIDID);
            $('#NGUONVAY').val(oVayQuyDuTruTinh.NGUONVAY);
            $('#COQUANTAICHINH').val(oVayQuyDuTruTinh.COQUANTAICHINH);
            $('#NGAYVAY').val(oVayQuyDuTruTinh.NGAYVAY);
            $('#HYHANVAY').val(oVayQuyDuTruTinh.HYHANVAY);
            $('#SOTIENVAY').val(oVayQuyDuTruTinh.SOTIENVAY);
            $('#LAISUATVAY').val(oVayQuyDuTruTinh.LAISUATVAY);
            $('#TIENTEID').val(oVayQuyDuTruTinh.TIENTEID);
            $('#TINHTHANHID').val(oVayQuyDuTruTinh.TINHTHANHID);
            $('#TIEUDE').val(oVayQuyDuTruTinh.TIEUDE);
            $('#STATUS').val(oVayQuyDuTruTinh.STATUS);
            $('#CREATEDDATE').val(oVayQuyDuTruTinh.CREATEDDATE);
            $('#CREATEDBY').val(oVayQuyDuTruTinh.CREATEDBY);
            $('#UPDATEDDATE').val(oVayQuyDuTruTinh.UPDATEDDATE);
            $('#UPDATEDBY').val(oVayQuyDuTruTinh.UPDATEDBY);
        }
    }

    this.clearForm = function () {
		$('#COQUANTAICHINH').val('');
		$("#NGAYVAY").val($.datepicker.formatDate('dd/mm/yy', new Date()))
		$("#HYHANVAY").val($.datepicker.formatDate('dd/mm/yy', new Date()))
        $('#SOTIENVAY').val('');
        $('#LAISUATVAY').val('');
        $('#TIEUDE').val('');
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
        
		var oTinhThanh = new TinhThanh()
        oTinhThanh.getAll();
        $(document).ready(() => {
            var resultTinhThanh = oTinhThanh.LIST
            var option = ''
            resultTinhThanh.map(value => {
                option = option + "<option value='" + value.TINHTHANHID + "'>" + value.TEN + "</option>"
            })
            $('#TINHTHANHID').append(option)
            that.initPage();
        })
        $('.ACTIONS').on('click', '#btnSave', function () {
            oVayQuyDuTruTinh.VAYQUYDUTRUTINHIDID = oVayQuyDuTruTinh.VAYQUYDUTRUTINHIDID
            if (oVayQuyDuTruTinh.VAYQUYDUTRUTINHIDID == '') {
                oVayQuyDuTruTinh.VAYQUYDUTRUTINHIDID = 0;
            }
            oVayQuyDuTruTinh.NGUONVAY = $('#NGUONVAY').val();
            oVayQuyDuTruTinh.COQUANTAICHINH = $('#COQUANTAICHINH').val();
            oVayQuyDuTruTinh.NGAYVAY = $('#NGAYVAY').val();
            oVayQuyDuTruTinh.HYHANVAY = $('#HYHANVAY').val();
            oVayQuyDuTruTinh.SOTIENVAY = $('#SOTIENVAY').val();
            oVayQuyDuTruTinh.LAISUATVAY = $('#LAISUATVAY').val();
            oVayQuyDuTruTinh.TIENTEID = $('#TIENTEID').val();
            oVayQuyDuTruTinh.TINHTHANHID = $('#TINHTHANHID').val();
            oVayQuyDuTruTinh.TIEUDE = $('#TIEUDE').val();
            oVayQuyDuTruTinh.STATUS = $('#STATUS').val();
            oVayQuyDuTruTinh.CREATEDDATE = $('#CREATEDDATE').val();
            oVayQuyDuTruTinh.CREATEDBY = $('#CREATEDBY').val();
            oVayQuyDuTruTinh.UPDATEDDATE = $('#UPDATEDDATE').val();
            oVayQuyDuTruTinh.UPDATEDBY = $('#UPDATEDBY').val();
            var rs = oVayQuyDuTruTinh.save();
            // if (!rs.CODE) {
            //     that.initPage();
            // }
            var oAlert = new AlertDialog('Thông báo');
            oAlert.show(rs.MESSAGE, '40%', '50px');
            oVayQuyDuTruTinh.getAll();
        });
    });
}
