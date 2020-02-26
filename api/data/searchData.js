var oracledb = require('oracledb');
var connectString = require('../controller/connect')
var dateFormat = require('dateformat');
var uuid = require('uuid')

var searchData = {

    searchtochuctaichinh: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (cot == 'MA') {
                cot = 'tc.ma'
            }
            if (cot == 'TEN') {
                cot = 'tc.ten'
            }
            if (cot == 'DIACHI') {
                cot = 'tc.diachi'
            }
            if (cot == 'SOGIAYPHEP') {
                cot = 'tc.sogiayphep'
            }
            if (cot == 'NGAYCAP') {
                cot = 'tc.ngaycap'
            }
            if (cot == 'VONDIEULE') {
                cot = 'tc.vondieule'
            }
            if (body[i].text.length > 0) {

                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    //console.error(err.message);
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {

                    query = "select tc.tochuctaichinhid\
                    ,tc.ma\
                    ,tc.ten\
                    ,tc.diachi\
                    ,tc.sogiayphep\
                    ,tc.ngaycap\
                    ,tc.vondieule\
                    ,tc.status\
                    ,af.id idfile\
		            ,af.URL url\
		            ,tc.uuid\
                FROM dm_tochuctaichinh tc\
                left join attach_file af on af.IDROWTABLE = tc.uuid\
                      where " + queryy + "and tc.status <> -1"
                } else {
                    query = "select tc.tochuctaichinhid\
                    ,tc.ma\
                    ,tc.ten\
                    ,tc.diachi\
                    ,tc.sogiayphep\
                    ,tc.ngaycap\
                    ,tc.vondieule\
                    ,tc.status\
                    ,af.id idfile\
		            ,af.URL url\
		            ,tc.uuid\
                FROM dm_tochuctaichinh tc\
                left join attach_file af on af.IDROWTABLE = tc.uuid\
                 where tc.status<>-1"
                }

                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []

                            var vICountOfKeys = keys.length;

                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT")
                                obj2.NGAYCAP = dateFormat(obj2.NGAYCAP, " dd/mm/yyyy"),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )

            }
        )
    },

    searchdonvi: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (cot == 'TENDVCHA') {
                cot = 'dvc.tendonvi'
            }
            if (cot == 'TINHTHANH') {
                cot = 'tt.ten'
            }
            if (cot == 'MA') {
                cot = 'dv.ma'
            }
            if (cot == 'TENDONVI') {
                cot = 'dv.tendonvi'
            }
            if (body[i].text.length > 0) {

                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    //console.error(err.message);
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {

                    query = " SELECT dv.donviid,\
                     dv.tendonvi,\
                     dv.idcha,\
                     dv.tinhthanhid,\
                     dv.ma,\
                     dvc.tendonvi     AS tendvcha,\
                     tt.ten           AS tinhthanh,\
                     dv.status\
                FROM dm_donvi dv\
                     LEFT JOIN dm_donvi dvc ON dvc.donviid = dv.idcha\
                     INNER JOIN dm_tinhthanh tt ON tt.tinhthanhid = dv.tinhthanhid where " + queryy + "and dv.status <> -1"
                } else {
                    query = " SELECT dv.donviid,\
                    dv.tendonvi,\
                    dv.idcha,\
                    dv.tinhthanhid,\
                    dv.ma,\
                    dvc.tendonvi     AS tendvcha,\
                    tt.ten           AS tinhthanh,\
                    dv.status\
               FROM dm_donvi dv\
                    LEFT JOIN dm_donvi dvc ON dvc.donviid = dv.idcha\
                    INNER JOIN dm_tinhthanh tt ON tt.tinhthanhid = dv.tinhthanhid where dv.status<>-1"
                }

                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []

                            var vICountOfKeys = keys.length;

                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )

            }
        )
    },

    searchduan: (body, callback) => {
        let qr = ''

        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (cot == 'MA') {
                cot = 'da.ma'
            }
            if (cot == 'TEN') {
                cot = 'da.ten'
            }
            if (cot == 'CHUDAUTU') {
                cot = 'da.chudautu'
            }
            if (cot == 'DONVITHUCHIEN') {
                cot = 'da.donvithuchien'
            }
            if (cot == 'TONGTIENVAYLAI') {
                cot = '(SELECT SUM (NVL (hd.tienkyvay, 0))\
                FROM qln_hopdongvaylai hd\
               WHERE 1 = 1 AND hd.status <> -1 AND da.DUANID = hd.DUANID)'
            }
            if (cot == 'TONGTIENCAPPHAT') {
                cot = '  (SELECT SUM (NVL (hd.sotiencapphat, 0))\
                FROM qln_hopdongvaylai hd\
               WHERE 1 = 1 AND hd.status <> -1 AND da.DUANID = hd.DUANID)'
            }
            if (cot == 'TONGTIEN') {
                cot = '(SELECT SUM (NVL (hd.tienkyvay, 0) + NVL (hd.sotiencapphat, 0))\
                FROM qln_hopdongvaylai hd\
               WHERE 1 = 1 AND hd.status <> -1 AND da.DUANID = hd.DUANID)'
            }
            if (body[i].text.length > 0) {

                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    //console.error(err.message);
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {

                    query = " SELECT da.duanid,\
                    da.ma,\
                    da.ten,\
                    da.chudautu,\
                    da.donvithuchien,\
                    da.status,\
                    (select sum(nvl(hd.tienkyvay, 0) + nvl(hd.sotiencapphat, 0)) from qln_hopdongvaylai hd where 1 = 1 and hd.status <> -1 and da.DUANID = hd.DUANID)  as tongtien,\
                    (select sum(nvl(hd.tienkyvay, 0)) from qln_hopdongvaylai hd where 1 = 1 and hd.status <> -1 and da.DUANID = hd.DUANID)  as tongtienvaylai,\
                    (select sum(nvl(hd.sotiencapphat, 0)) from qln_hopdongvaylai hd where 1 = 1 and hd.status <> -1 and da.DUANID = hd.DUANID)  as tongtiencapphat\
                    ,get_trangthaipheduyet(' dm_duan',da.duanid ,'3d064424-abcd-4879-a000-707b666afc97', da.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c') as ttpdcaptren\
                    ,get_action_pheduyet(' dm_duan',da.duanid ,'3d064424-abcd-4879-a000-707b666afc97', da.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c', 1) as roleapprove\
                    from dm_duan da\
                    where " + queryy + "and da.status <> -1"
                } else {
                    query = " SELECT da.duanid,\
                    da.ma,\
                    da.ten,\
                    da.chudautu,\
                    da.donvithuchien,\
                    da.status,\
                    (select sum(nvl(hd.tienkyvay, 0) + nvl(hd.sotiencapphat, 0)) from qln_hopdongvaylai hd where 1 = 1 and hd.status <> -1 and da.DUANID = hd.DUANID)  as tongtien,\
                    (select sum(nvl(hd.tienkyvay, 0)) from qln_hopdongvaylai hd where 1 = 1 and hd.status <> -1 and da.DUANID = hd.DUANID)  as tongtienvaylai,\
                    (select sum(nvl(hd.sotiencapphat, 0)) from qln_hopdongvaylai hd where 1 = 1 and hd.status <> -1 and da.DUANID = hd.DUANID)  as tongtiencapphat\
                    ,get_trangthaipheduyet(' dm_duan',da.duanid ,'3d064424-abcd-4879-a000-707b666afc97', da.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c') as ttpdcaptren\
                    ,get_action_pheduyet(' dm_duan',da.duanid ,'3d064424-abcd-4879-a000-707b666afc97', da.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c', 1) as roleapprove\
                    from dm_duan da\
                    where da.status<>-1"
                }
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []

                            var vICountOfKeys = keys.length;

                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )
            }
        )
    },

    searchbieumaubc: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (cot == 'MA') {
                cot = 'bm.ma'
            }
            if (cot == 'TIEUDE') {
                cot = 'bm.tieude'
            }
            if (cot == 'COQUANBANHANH') {
                cot = 'bm.coquanbanhanh'
            }
            if (cot == 'NGAYBANHANH') {
                cot = 'bm.ngaybanhanh'
            }
            if (cot == 'NGAYHIEULUC') {
                cot = 'bm.ngayhieuluc'
            }
            if (cot == 'TENNHOMBAOCAO') {
                cot = "Case Cast(bm.nhombaocao as nvarchar2(100))\
                When Cast('QT' as nvarchar2(100))   Then Cast('Quản trị' as nvarchar2(100))\
                When Cast('ND97' as nvarchar2(100)) Then Cast('NĐ 97' as nvarchar2(100))\
                When Cast('TT80' as nvarchar2(100)) Then Cast('TT 80' as nvarchar2(100)) \
                When Cast('KHAC' as nvarchar2(100)) Then Cast('Khác' as nvarchar2(100))\
            End"
            }

            if (body[i].text.length > 0) {

                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {

                    query = " SELECT \
                    bm.bieumaubaocaoid 	\
                    ,bm.ma\
                    ,bm.tieude\
                    ,bm.coquanbanhanh\
                    ,bm.nhombaocao\
                    ,Case Cast(bm.nhombaocao as nvarchar2(100))\
                        When Cast('QT' as nvarchar2(100))   Then Cast('Quản trị' as nvarchar2(100))\
                        When Cast('ND97' as nvarchar2(100)) Then Cast('NĐ 97' as nvarchar2(100))\
                        When Cast('TT80' as nvarchar2(100)) Then Cast('TT 80' as nvarchar2(100)) \
                        When Cast('KHAC' as nvarchar2(100)) Then Cast('Khác' as nvarchar2(100))\
                    End tennhombaocao\
                    ,bm.ngaybanhanh\
                    ,bm.ngayhieuluc\
                    ,bm.LINKFILE\
                    ,bm.rong\
                    ,bm.cao		\
                    ,bm.trangthai	\
                FROM \
                    dm_bieumaubaocao bm  \
                    where " + queryy + "and bm.status <> -1"
                } else {
                    query = " SELECT \
                    bm.bieumaubaocaoid 	\
                    ,bm.ma\
                    ,bm.tieude\
                    ,bm.coquanbanhanh\
                    ,bm.nhombaocao\
                    ,Case Cast(bm.nhombaocao as nvarchar2(100))\
                        When Cast('QT' as nvarchar2(100))   Then Cast('Quản trị' as nvarchar2(100))\
                        When Cast('ND97' as nvarchar2(100)) Then Cast('NĐ 97' as nvarchar2(100))\
                        When Cast('TT80' as nvarchar2(100)) Then Cast('TT 80' as nvarchar2(100)) \
                        When Cast('KHAC' as nvarchar2(100)) Then Cast('Khác' as nvarchar2(100))\
                    End tennhombaocao\
                    ,bm.ngaybanhanh\
                    ,bm.ngayhieuluc\
                    ,bm.LINKFILE\
                    ,bm.rong\
                    ,bm.cao		\
                    ,bm.trangthai	\
                FROM \
                    dm_bieumaubaocao bm  \
                    where bm.status<>-1"
                }

                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []

                            var vICountOfKeys = keys.length;

                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy "),
                                    obj2.NGAYBANHANH = dateFormat(obj2.NGAYBANHANH, " dd/mm/yyyy "),
                                    obj2.NGAYHIEULUC = dateFormat(obj2.NGAYHIEULUC, " dd/mm/yyyy "),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )

            }
        )
    },

    searchnhataitro: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (body[i].text.length > 0) {

                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {
                    query = "select * from dm_nhataitro where " + queryy + " and  status<>-1"
                } else {
                    query = "select * from dm_nhataitro where status<>-1"
                }
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []
                            var vICountOfKeys = keys.length;
                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )
            }
        )
    },

    searchtochucmuatp: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (body[i].text.length > 0) {

                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {
                    query = "select * from dm_tochucmuatp where " + queryy + " and  status<>-1"
                } else {
                    query = "select * from dm_tochucmuatp where status<>-1"
                }
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []
                            var vICountOfKeys = keys.length;
                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )
            }
        )
    },

    searchkehoachvayhangnam: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (cot == 'MA') {
                cot = 'khhn.ma'
            }
            if (cot == 'TEN') {
                cot = 'khhn.ten'
            }
            if (cot == 'NAMKEHOACH') {
                cot = 'khhn.namkehoach'
            }
            if (cot == 'SOTIENVAY') {
                cot = 'khhn.sotienvay'
            }
            if (cot == 'luykerutvonvaylai') {
                cot = 'Nvl(khhn.luykerutvonvaylai, 0)'
            }
            if (cot == 'dunovay') {
                cot = 'Nvl(khhn.luykerutvonvaylai, 0) - Nvl(khhn.luykesotientragoc, 0) As dunovay'
            }
            if (body[i].text.length > 0) {
                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {
                    query = " SELECT khhn.kehoachvayhangnamid\
                    ,khhn.ma\
                    ,khhn.ten\
                    ,khhn.namkehoach\
                    ,khhn.hanmucvay\
                    ,khhn.sotienvay\
                    ,khhn.sotiencapphat\
                    ,Nvl(khhn.luykerutvonvaylai, 0) - Nvl(khhn.luykesotientragoc, 0) As dunovay\
                    ,khhn.luykesotientragoc\
                    ,khhn.donviid\
                    ,duan.cochetaichinh as cochetaichinh\
                    ,duan.TEN as tenduan\
                    ,hopdong.MA as mahopdong\
                    ,hopdong.TEN as tenhopdong\
                    ,Nvl(khhn.luykerutvonvaylai, 0) As luykerutvonvaylai\
                    ,Nvl(khhn.luykerutvoncapphat, 0) As luykerutvoncapphat\
                    ,Nvl(khhn.luykesotientragoc, 0) As luykesotientragoc\
                    ,hopdong.TIENTEID tienteduocrut\
                    ,hopdong.TIENCPID\
                    ,duan.MA as maduan\
                    ,hopdong.PHUONGTHUCTRANOLAI as kytra\
                    ,hopdong.LAISUATVAY as laisuatvay\
                    ,hopdong.TIENPHIQUANLYCHOVAYLAI as sotientraphi\
                    ,hopdong.TIENLAIPHAT as laiphat\
                    ,to_char(hopdong.NGAYKY, 'DD/MM/YYYY') as ngaynhannotoithieu\
                    ,to_char(hopdong.NGAYTRANOGOCDAUTIEN, 'DD/MM/YYYY') as ngaynhannotoida\
                    ,(select nvl(count(*), 0) + 1 tongdottrano From qln_dottrano dtn where dtn.KEHOACHVAYHANGNAMID = khhn.KEHOACHVAYHANGNAMID and dtn.status <> -1) solantrano\
                    ,(select tiente.ma from dm_tiente tiente where tiente.TIENTEID = hopdong.TIENTEID) as matienteduocrut\
                    ,(select tiente.tienteid from dm_tiente tiente where tiente.TIENTEID = hopdong.TIENTEID) as idtienteduocrut\
                    ,(select tiente.banra from dm_tiente tiente where tiente.TIENTEID = hopdong.TIENTEID) as tientebanra\
                    ,nvl(khhn.sotienvay, 0) - nvl(khhn.luykerutvonvaylai, 0) as sotienvaylaitoida\
                    ,nvl(khhn.SOTIENCAPPHAT, 0) - nvl(khhn.luykerutvoncapphat, 0) as sotiencapphattoida\
                    ,(select nvl(count(*), 0) + 1 tongdotrutvon From qln_dotrutvon drv where drv.KEHOACHVAYHANGNAMID = khhn.KEHOACHVAYHANGNAMID) solankehoach\
                    ,'qln_kehoachvayhangnam' as matb\
                    ,get_trangthaipheduyet('qln_kehoachvayhangnam',khhn.kehoachvayhangnamid ,'3d064424-abcd-4879-a000-707b666afc97', khhn.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c') as ttpdcaptren\
                    ,get_action_pheduyet('qln_kehoachvayhangnam',khhn.kehoachvayhangnamid ,'3d064424-abcd-4879-a000-707b666afc97', khhn.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c', 1) as roleapprove\
                    ,af.URL url,\
                khhn.STATUS_APPROVE\
                FROM\
                    qln_kehoachvayhangnam khhn \
                    Inner join dm_duan duan on khhn.duanid = duan.duanid\
                    Left join qln_hopdongvaylai hopdong on khhn.hopdongvaylaiid = hopdong.hopdongvaylaiid\
                    left join attach_file af on af.IDROWTABLE = khhn.uuid where " + queryy + "and khhn.status <> -1"
                } else {
                    query = " SELECT khhn.kehoachvayhangnamid\
                    ,khhn.ma\
                    ,khhn.ten\
                    ,khhn.namkehoach\
                    ,khhn.hanmucvay\
                    ,khhn.sotienvay\
                    ,khhn.sotiencapphat\
                    ,Nvl(khhn.luykerutvonvaylai, 0) - Nvl(khhn.luykesotientragoc, 0) As dunovay\
                    ,khhn.luykesotientragoc\
                    ,khhn.donviid\
                    ,duan.cochetaichinh as cochetaichinh\
                    ,duan.TEN as tenduan\
                    ,hopdong.MA as mahopdong\
                    ,hopdong.TEN as tenhopdong\
                    ,Nvl(khhn.luykerutvonvaylai, 0) As luykerutvonvaylai\
                    ,Nvl(khhn.luykerutvoncapphat, 0) As luykerutvoncapphat\
                    ,Nvl(khhn.luykesotientragoc, 0) As luykesotientragoc\
                    ,hopdong.TIENTEID tienteduocrut\
                    ,hopdong.TIENCPID\
                    ,duan.MA as maduan\
                    ,hopdong.PHUONGTHUCTRANOLAI as kytra\
                    ,hopdong.LAISUATVAY as laisuatvay\
                    ,hopdong.TIENPHIQUANLYCHOVAYLAI as sotientraphi\
                    ,hopdong.TIENLAIPHAT as laiphat\
                    ,to_char(hopdong.NGAYKY, 'DD/MM/YYYY') as ngaynhannotoithieu\
                    ,to_char(hopdong.NGAYTRANOGOCDAUTIEN, 'DD/MM/YYYY') as ngaynhannotoida\
                    ,(select nvl(count(*), 0) + 1 tongdottrano From qln_dottrano dtn where dtn.KEHOACHVAYHANGNAMID = khhn.KEHOACHVAYHANGNAMID and dtn.status <> -1) solantrano\
                    ,(select tiente.ma from dm_tiente tiente where tiente.TIENTEID = hopdong.TIENTEID) as matienteduocrut\
                    ,(select tiente.tienteid from dm_tiente tiente where tiente.TIENTEID = hopdong.TIENTEID) as idtienteduocrut\
                    ,(select tiente.banra from dm_tiente tiente where tiente.TIENTEID = hopdong.TIENTEID) as tientebanra\
                    ,nvl(khhn.sotienvay, 0) - nvl(khhn.luykerutvonvaylai, 0) as sotienvaylaitoida\
                    ,nvl(khhn.SOTIENCAPPHAT, 0) - nvl(khhn.luykerutvoncapphat, 0) as sotiencapphattoida\
                    ,(select nvl(count(*), 0) + 1 tongdotrutvon From qln_dotrutvon drv where drv.KEHOACHVAYHANGNAMID = khhn.KEHOACHVAYHANGNAMID) solankehoach\
                    ,'qln_kehoachvayhangnam' as matb\
                    ,get_trangthaipheduyet('qln_kehoachvayhangnam',khhn.kehoachvayhangnamid ,'3d064424-abcd-4879-a000-707b666afc97', khhn.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c') as ttpdcaptren\
                    ,get_action_pheduyet('qln_kehoachvayhangnam',khhn.kehoachvayhangnamid ,'3d064424-abcd-4879-a000-707b666afc97', khhn.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c', 1) as roleapprove\
                    ,af.URL url,\
                khhn.STATUS_APPROVE\
                FROM\
                    qln_kehoachvayhangnam khhn \
                    Inner join dm_duan duan on khhn.duanid = duan.duanid\
                    Left join qln_hopdongvaylai hopdong on khhn.hopdongvaylaiid = hopdong.hopdongvaylaiid\
                    left join attach_file af on af.IDROWTABLE = khhn.uuid wheree khhn.status<>-1"
                }
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []
                            var vICountOfKeys = keys.length;
                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
                                    obj2.NGAYQUYETDINH = dateFormat(obj2.NGAYQUYETDINH, " dd/mm/yyyy "),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )
            }
        )
    },

    searchkehoachvay3nam: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (cot == 'TENDONVI') {
                cot = 'tendonvi'
            }
            if (cot == 'MA') {
                cot = 'khv.ma'
            }
            if (cot == 'TEN') {
                cot = 'khv.ten'
            }
            if (cot == 'NAMBATDAU') {
                cot = 'khv.nambatdau'
            }
            if (cot == 'NAMKETTHUC') {
                cot = 'khv.namketthuc'
            }
            if (cot == 'NGAYQUYETDINH') {
                cot = 'khv.ngayquyetdinh'
            }
            if (cot == 'HANMUCVAY') {
                cot = 'khv.hanmucvay'
            }
            if (cot == 'DUNOVAY') {
                cot = 'khv.dunovay'
            }
            if (body[i].text.length > 0) {

                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {
                    query = " SELECT khv.kehoachvay3namid,\
                    khv.ma,\
                    khv.ten,\
                    khv.donviid,\
                    dv.TENDONVI as tendonvi,\
                    khv.nambatdau,\
                    khv.namketthuc,\
                    khv.ngayquyetdinh,\
                    khv.hanmucvay,\
                    khv.dunovay,\
                    khv.status\
                FROM qln_kehoachvay3nam khv\
                INNER JOIN dm_donvi dv ON dv.donviid = khv.donviid where " + queryy + "and khv.status <> -1"
                } else {
                    query = " SELECT khv.kehoachvay3namid,\
                    khv.ma,\
                    khv.ten,\
                    khv.donviid,\
                    dv.TENDONVI as tendonvi,\
                    khv.nambatdau,\
                    khv.namketthuc,\
                    khv.ngayquyetdinh,\
                    khv.hanmucvay,\
                    khv.dunovay,\
                    khv.status\
                FROM qln_kehoachvay3nam khv\
                INNER JOIN dm_donvi dv ON dv.donviid = khv.donviid where khv.status<>-1"
                }
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []
                            var vICountOfKeys = keys.length;
                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
                                    obj2.NGAYQUYETDINH = dateFormat(obj2.NGAYQUYETDINH, " dd/mm/yyyy "),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )
            }
        )
    },

    searchtinhthanh: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (body[i].text.length > 0) {

                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }
        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {

                    query = "select * from dm_tinhthanh where " + queryy + " and  status<>-1"
                } else {
                    query = "select * from dm_tinhthanh where status<>-1"
                }

                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []
                            var vICountOfKeys = keys.length;
                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )
            }
        )
    },

    searchkehoachvay5nam: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (cot == 'TENTINHTHANH') {
                cot = 'dmtt.ten'
            }
            if (cot == 'MA') {
                cot = 'khv.ma'
            }
            if (cot == 'TEN') {
                cot = 'khv.ten'
            }
            if (cot == 'NAMBATDAU') {
                cot = 'khv.nambatdau'
            }
            if (cot == 'NAMKETTHUC') {
                cot = 'khv.namketthuc'
            }
            if (cot == 'NGAYQUYETDINH') {
                cot = 'khv.ngayquyetdinh'
            }
            if (cot == 'hanmucvay') {
                cot = 'khv.hanmucvay'
            }
            if (cot == 'dunovay') {
                cot = 'khv.dunovay'
            }
            if (cot == 'dukienvay') {
                cot = 'khv.dukienvay'
            }
            if (cot == 'dukientra') {
                cot = 'khv.dukientrano'
            }
            if (body[i].text.length > 0) {

                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {
                    query = " SELECT khv.kehoachvay5namid,\
                    khv.ma,\
                    khv.ten,\
                    khv.nambatdau,\
                    khv.namketthuc,\
                    khv.ngayquyetdinh,\
                    khv.donviid,\
                    dmtt.TENDONVI as tentinhthanh,\
                    khv.hanmucvay,\
                    khv.dunovay,\
                    khv.dukienvay,\
                    khv.dukientrano,\
                    khv.status\
                FROM qln_kehoachvay5nam khv left join dm_donvi dmtt on dmtt.donviid = khv.donviid\
                where " + queryy + "and khv.status <> -1"
                } else {
                    query = "  SELECT khv.kehoachvay5namid,\
                    khv.ma,\
                    khv.ten,\
                    khv.nambatdau,\
                    khv.namketthuc,\
                    khv.ngayquyetdinh,\
                    khv.donviid,\
                    dmtt.TENDONVI as tentinhthanh,\
                    khv.hanmucvay,\
                    khv.dunovay,\
                    khv.dukienvay,\
                    khv.dukientrano,\
                    khv.status\
                    FROM qln_kehoachvay5nam khv left join dm_donvi dmtt on dmtt.donviid = khv.donviid\
                    where khv.status<>-1"
                }
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []
                            var vICountOfKeys = keys.length;
                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
                                    obj2.NGAYQUYETDINH = dateFormat(obj2.NGAYQUYETDINH, " dd/mm/yyyy "),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )
            }
        )
    },

    searchphuluchopdongvaylai: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (cot == 'TENTINHTHANH') {
                cot = '  dmtt.ten '
            }
            if (cot == 'MA') {
                cot = 'pl.ma'
            }
            if (cot == 'TENPHULUC') {
                cot = 'pl.tenphuluc'
            }
            if (cot == 'NGAYKY') {
                cot = 'pl.ngayky'
            }
            if (cot == 'NGUOIKY') {
                cot = 'pl.nguoiky'
            }
            if (cot == 'TENHOPDONGVAYLAI') {
                cot = 'hd.ten'
            }

            if (body[i].text.length > 0) {

                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {
                    query = " SELECT pl.phuluchopdongvaylaiid,\
                    pl.ma,\
                    pl.tenphuluc,\
                    pl.ngayky,\
                    pl.nguoiky,\
                    pl.tinhthanhid,\
                    dmtt.ten                                   AS tentinhthanh,\
                    pl.hopdongvaylaiid,\
                    hd.ten                                     AS tenhopdongvaylai,\
                    pl.status\
                    FROM qln_phuluchopdongvaylai  pl\
                    left join qln_hopdongvaylai hd on hd.hopdongvaylaiid = pl.hopdongvaylaiid\
                    LEFT JOIN dm_tinhthanh dmtt\
                        ON dmtt.tinhthanhid = pl.tinhthanhid where " + queryy + "and pl.status <> -1"
                } else {
                    query = " SELECT pl.phuluchopdongvaylaiid,\
                    pl.ma,\
                    pl.tenphuluc,\
                    pl.ngayky,\
                    pl.nguoiky,\
                    pl.tinhthanhid,\
                    dmtt.ten                                   AS tentinhthanh,\
                    pl.hopdongvaylaiid,\
                    hd.ten                                     AS tenhopdongvaylai,\
                    pl.status\
                    FROM qln_phuluchopdongvaylai  pl\
                    left join qln_hopdongvaylai hd on hd.hopdongvaylaiid = pl.hopdongvaylaiid\
                    LEFT JOIN dm_tinhthanh dmtt\
                        ON dmtt.tinhthanhid = pl.tinhthanhid  where pl.status<>-1"
                }
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []
                            var vICountOfKeys = keys.length;
                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
                                    obj2.NGAYKY = dateFormat(obj2.NGAYKY, " dd/mm/yyyy "),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )
            }
        )
    },

    searchhopdongvaylai: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (cot == 'TENDUAN') {
                cot = 'dmda.ten'
            }
            if (cot == 'MA') {
                cot = 'hdv.ma'
            }
            if (cot == 'TEN') {
                cot = 'hdv.ten'
            }
            if (cot == 'TENDUAN') {
                cot = 'dmda.ten'
            }
            if (cot == 'NGAYKY') {
                cot = 'hdv.ngayky'
            }
            if (cot == 'NGAYHIEULUC') {
                cot = 'hdv.ngayhieuluc'
            }
            if (cot == 'COQUANUYQUYENVAYLAI') {
                cot = 'hdv.coquanuyquyenvaylai'
            }
            if (cot == 'TENDONVI') {
                cot = ' dmdv.tendonvi'
            }
            if (cot == 'tienkyvay') {
                cot = 'hdv.tienkyvay'
            }
            if (cot == 'laisuat') {
                cot = 'hdv.laisuatvay'
            }
            if (cot == 'COPHULUC') {
                cot = " (CASE NVL (phuluc.tongphuluc, 0)\
                WHEN 0 THEN 'Chưa có phụ lục'\
                ELSE 'Có ' || phuluc.tongphuluc || ' phụ lục'\
            END)"
            }
            if (body[i].text.length > 0) {
                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {
                    query = " SELECT hdv.hopdongvaylaiid\
                    ,hdv.ma\
                    ,hdv.ten\
                    ,hdv.ngayky\
                    ,hdv.coquanvaylai\
                    ,hdv.coquanuyquyenvaylai\
                    ,nvl(hdv.tienkyvay, 0) tienkyvay\
                    ,nvl(hdv.laisuatvay, 0) laisuatvay\
                    ,hdv.ngayky\
                    ,hdv.ngaytranogocdautien\
                    ,hdv.ngaytranolaidautien\
                    ,hdv.ngaytranogoccuoicung\
                    ,hdv.ngaytranolaicuoicung\
                    ,hdv.phuongthuctranogoc\
                    ,hdv.phuongthuctranolai\
                    ,hdv.tienlaiphat\
                    ,hdv.sohiepdinhvaynn\
                    ,hdv.tienphihiepdinhvaynn\
                    ,hdv.tienphiquanlychovaylai\
                    ,hdv.loailaisuat\
                    ,hdv.ghichu\
                    ,hdv.duanid\
                    ,dmda.ten as tenduan\
                    ,hdv.tienteid\
                    ,dmt.ten as tentiente\
                    ,nvl(hdv.sotiencapphat,0) sotiencapphat\
		            ,nvl(hdv.luykekehoachvaylai, 0) luykekehoachvaylai\
		            ,nvl(hdv.luykekehoachcapphat, 0) luykekehoachcapphat\
                    ,(select sum(nvl(khv.luykerutvonvaylai, 0)) from qln_kehoachvayhangnam khv where hdv.hopdongvaylaiid = khv.hopdongvaylaiid and khv.status <> -1) as luykerutvonvaylai\
		            ,(select sum(nvl(khv.luykerutvoncapphat, 0)) from qln_kehoachvayhangnam khv where hdv.hopdongvaylaiid = khv.hopdongvaylaiid and khv.status <> -1) as luykerutvoncapphat\
                    ,hdv.LUYKETRAGOC\
                    ,dmdv.tendonvi\
                    ,nvl(hdv.luyke, 0) luyke\
		            ,(nvl((select count(*) from qln_kehoachvayhangnam where hopdongvaylaiid = hdv.hopdongvaylaiid),0) + nvl((select count(*) from qln_phuluchopdongvaylai where hopdongvaylaiid = hdv.hopdongvaylaiid),0) ) as status_delete\
                    ,(Case nvl(phuluc.tongphuluc, 0) \
                    When 0 Then 'Chưa có phụ lục'\
                    Else\
                    'Có ' || phuluc.tongphuluc || ' phụ lục'\
                    End\
                     ) cophuluc\
                    ,hdv.status\
                FROM qln_hopdongvaylai hdv\
                left join dm_tiente dmt on hdv.tienteid = dmt.tienteid \
                LEFT JOIN dm_donvi dmdv ON hdv.DONVIID = dmdv.DONVIID\
                left join dm_duan dmda on hdv.duanid = dmda.duanid\
                left join (\
                    Select phuluchd.ma mahopdong, nvl(count(*), 0) tongphuluc\
                    From qln_hopdongvaylai_phuluc phuluchd \
                    Where 1 = 1\
                    group by phuluchd.ma\
                  ) phuluc on phuluc.mahopdong = hdv.ma\
                 where " + queryy + "and hdv.status <> -1"
                } else {
                    query = " SELECT hdv.hopdongvaylaiid\
                    ,hdv.ma\
                    ,hdv.ten\
                    ,hdv.ngayky\
                    ,hdv.coquanvaylai\
                    ,hdv.coquanuyquyenvaylai\
                    ,nvl(hdv.tienkyvay, 0) tienkyvay\
                    ,nvl(hdv.laisuatvay, 0) laisuatvay\
                    ,hdv.ngayky\
                    ,hdv.ngaytranogocdautien\
                    ,hdv.ngaytranolaidautien\
                    ,hdv.ngaytranogoccuoicung\
                    ,hdv.ngaytranolaicuoicung\
                    ,hdv.phuongthuctranogoc\
                    ,hdv.phuongthuctranolai\
                    ,hdv.tienlaiphat\
                    ,hdv.sohiepdinhvaynn\
                    ,hdv.tienphihiepdinhvaynn\
                    ,hdv.tienphiquanlychovaylai\
                    ,hdv.loailaisuat\
                    ,hdv.ghichu\
                    ,hdv.duanid\
                    ,dmda.ten as tenduan\
                    ,hdv.tienteid\
                    ,dmt.ten as tentiente\
                    ,nvl(hdv.sotiencapphat,0) sotiencapphat\
		            ,nvl(hdv.luykekehoachvaylai, 0) luykekehoachvaylai\
		            ,nvl(hdv.luykekehoachcapphat, 0) luykekehoachcapphat\
                    ,(select sum(nvl(khv.luykerutvonvaylai, 0)) from qln_kehoachvayhangnam khv where hdv.hopdongvaylaiid = khv.hopdongvaylaiid and khv.status <> -1) as luykerutvonvaylai\
		            ,(select sum(nvl(khv.luykerutvoncapphat, 0)) from qln_kehoachvayhangnam khv where hdv.hopdongvaylaiid = khv.hopdongvaylaiid and khv.status <> -1) as luykerutvoncapphat\
                    ,hdv.LUYKETRAGOC\
                    ,dmdv.tendonvi\
                    ,nvl(hdv.luyke, 0) luyke\
		            ,(nvl((select count(*) from qln_kehoachvayhangnam where hopdongvaylaiid = hdv.hopdongvaylaiid),0) + nvl((select count(*) from qln_phuluchopdongvaylai where hopdongvaylaiid = hdv.hopdongvaylaiid),0) ) as status_delete\
                    ,(Case nvl(phuluc.tongphuluc, 0) \
                    When 0 Then 'Chưa có phụ lục'\
                    Else\
                    'Có ' || phuluc.tongphuluc || ' phụ lục'\
                    End\
                     ) cophuluc\
                    ,hdv.status\
                FROM qln_hopdongvaylai hdv\
                left join dm_tiente dmt on hdv.tienteid = dmt.tienteid \
                LEFT JOIN dm_donvi dmdv ON hdv.DONVIID = dmdv.DONVIID\
                left join dm_duan dmda on hdv.duanid = dmda.duanid\
                left join (\
                    Select phuluchd.ma mahopdong, nvl(count(*), 0) tongphuluc\
                    From qln_hopdongvaylai_phuluc phuluchd \
                    Where 1 = 1\
                    group by phuluchd.ma\
                  ) phuluc on phuluc.mahopdong = hdv.ma\
                 where hdv.status<>-1"
                }
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []
                            var vICountOfKeys = keys.length;
                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
                                    obj2.NGAYKY = dateFormat(obj2.NGAYKY, " dd/mm/yyyy "),
                                    obj2.NGAYHIEULUC = dateFormat(obj2.NGAYHIEULUC, " dd/mm/yyyy "),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )
            }
        )
    },

    searchdotrutvon: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (cot == 'TENDUAN') {
                cot = 'kehoach.tenduan'
            }
            if (cot == 'MA') {
                cot = ' drv.ma'
            }
            if (cot == 'TENHOPDONG') {
                cot = 'kehoach.tenhopdong'
            }
            if (cot == 'NAMKEHOACH') {
                cot = 'kehoach.namkehoach'
            }
            if (cot == 'TENNHATAITRO') {
                cot = ' dmntt.ten'
            }
            if (cot == 'TENTINHTHANH') {
                cot = '   dmtt.ten'
            }
            if (cot == 'NGAYNHANNO') {
                cot = 'drv.ngaynhanno'
            }
            if (cot == 'nguyentevaylai') {
                cot = 'drv.nguyentevaylai'
            }
            if (cot == 'luykevaylai') {
                cot = '  kehoach.luykerutvonvaylai'
            }
            if (cot == 'nguyentecapphat') {
                cot = 'drv.nguyentecapphat'
            }
            if (cot == 'luykecapphat') {
                cot = 'kehoach.luykerutvoncapphat'
            }
            if (cot == 'phuongthucgiaingan') {
                cot = 'drv.phuongthucgiaingan'
            }
            if (body[i].text.length > 0) {

                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {
                    query = "select drv.dotrutvonid,\
                    drv.ma,\
                    kehoach.tenduan,\
                    kehoach.tenhopdong,\
                    kehoach.namkehoach,\
                    kehoach.luykerutvonvaylai,\
                    kehoach.luykerutvoncapphat,\
                    drv.ngaynhanno,\
                    drv.sotiengiainganvaylai,\
                    drv.sotiengiaingancapphat,\
                    drv.nguyentevaylai,\
                    drv.nguyentecapphat,\
                    drv.phuongthucgiaingan,\
                    drv.ghichu,\
                    drv.donviid,\
                    dmtt.tendonvi AS tendonvi,\
                    drv.nhataitroid,\
                    dmntt.ten AS tennhataitro,\
                    drv.status\
               FROM qln_dotrutvon  drv\
               LEFT JOIN dm_nhataitro dmntt ON dmntt.nhataitroid = drv.nhataitroid\
               LEFT JOIN dm_donvi dmtt ON dmtt.donviid = drv.donviid\
                    LEFT JOIN (SELECT khhn.kehoachvayhangnamid,\
                                      hd.TEN     tenhopdong,\
                                      da.ten     tenduan,\
                                      khhn.NAMKEHOACH namkehoach,\
                                      khhn.LUYKERUTVONVAYLAI luykerutvonvaylai,\
                                      khhn.LUYKERUTVONCAPPHAT luykerutvoncapphat\
                                FROM qln_kehoachvayhangnam khhn, dm_duan da, qln_hopdongvaylai hd\
                                WHERE 1 = 1\
                                 And khhn.DUANID = da.DUANID\
                                 And khhn.HOPDONGVAYLAIID = hd.HOPDONGVAYLAIID) kehoach\
                        ON kehoach.kehoachvayhangnamid = drv.kehoachvayhangnamid where " + queryy + "and drv.status <> -1"
                } else {
                    query = "select drv.dotrutvonid,\
                    drv.ma,\
                    kehoach.tenduan,\
                    kehoach.tenhopdong,\
                    kehoach.namkehoach,\
                    kehoach.luykerutvonvaylai,\
                    kehoach.luykerutvoncapphat,\
                    drv.ngaynhanno,\
                    drv.sotiengiainganvaylai,\
                    drv.sotiengiaingancapphat,\
                    drv.nguyentevaylai,\
                    drv.nguyentecapphat,\
                    drv.phuongthucgiaingan,\
                    drv.ghichu,\
                    drv.donviid,\
                    dmtt.tendonvi AS tendonvi,\
                    drv.nhataitroid,\
                    dmntt.ten AS tennhataitro,\
                    drv.status\
               FROM qln_dotrutvon  drv\
               LEFT JOIN dm_nhataitro dmntt ON dmntt.nhataitroid = drv.nhataitroid\
               LEFT JOIN dm_donvi dmtt ON dmtt.donviid = drv.donviid\
                    LEFT JOIN (SELECT khhn.kehoachvayhangnamid,\
                                      hd.TEN     tenhopdong,\
                                      da.ten     tenduan,\
                                      khhn.NAMKEHOACH namkehoach,\
                                      khhn.LUYKERUTVONVAYLAI luykerutvonvaylai,\
                                      khhn.LUYKERUTVONCAPPHAT luykerutvoncapphat\
                                FROM qln_kehoachvayhangnam khhn, dm_duan da, qln_hopdongvaylai hd\
                                WHERE 1 = 1\
                                 And khhn.DUANID = da.DUANID\
                                 And khhn.HOPDONGVAYLAIID = hd.HOPDONGVAYLAIID) kehoach\
                        ON kehoach.kehoachvayhangnamid = drv.kehoachvayhangnamid where drv.status<>-1"
                }
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []
                            var vICountOfKeys = keys.length;
                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
                                    obj2.NGAYNHANNO = dateFormat(obj2.NGAYNHANNO, " dd/mm/yyyy "),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )
            }
        )
    },

    searchdottrano: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (cot == 'TENHOPDONG') {
                cot = 'hd.ten'
            }
            if (cot == 'SOLENHCHI') {
                cot = 'dtn.solenhchi'
            }
            if (cot == 'KYTRA') {
                cot = 'dtn.kytra'
            }
            if (cot == 'NGAYTRA') {
                cot = 'dtn.ngaytra'
            }
            if (cot == 'sotientragoc') {
                cot = ' dtn.sotientragoc'
            }
            if (cot == 'sotientralai') {
                cot = 'dtn.sotientralai'
            }
            if (cot == 'sotientraphi') {
                cot = 'dtn.sotientraphi'
            }
            if (cot == 'sotienphat') {
                cot = 'dtn.sotienphat'
            }
            if (cot == 'duno') {
                cot = 'dtn.duno'
            }
            if (body[i].text.length > 0) {

                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {
                    query = " SELECT dtn.dottranoid,\
                    dtn.solenhchi,\
                    dtn.kehoachvayhangnamid,\
                    dtn.ma,\
                    dtn.ngaytra,\
                    dtn.kytra,\
                    dtn.nguonvay,\
                    dtn.tienkyvay,\
                    dtn.duno,\
                    dtn.sotientragoc,\
                    dtn.sotientralai,\
                    dtn.sotientraphi,\
                    dtn.sotienphat,\
                    dtn.luyketranogoc,\
                    dtn.solenhchi,     \
                    dtn.status,\
                    hd.ten as tenhopdong\
                FROM qln_dottrano dtn\
                left JOIN qln_kehoachvayhangnam khvhn\
           ON dtn.KEHOACHVAYHANGNAMID = khvhn.KEHOACHVAYHANGNAMID\
           left join qln_hopdongvaylai hd on hd.HOPDONGVAYLAIID = khvhn.HOPDONGVAYLAIID   where " + queryy + "and dtn.status <> -1"
                } else {
                    query = " SELECT dtn.dottranoid,\
                    dtn.solenhchi,\
                    dtn.kehoachvayhangnamid,\
                    dtn.ma,\
                    dtn.ngaytra,\
                    dtn.kytra,\
                    dtn.nguonvay,\
                    dtn.tienkyvay,\
                    dtn.duno,\
                    dtn.sotientragoc,\
                    dtn.sotientralai,\
                    dtn.sotientraphi,\
                    dtn.sotienphat,\
                    dtn.luyketranogoc,\
                    dtn.solenhchi,     \
                    dtn.status,\
                    hd.ten as tenhopdong\
                FROM qln_dottrano dtn\
                left JOIN qln_kehoachvayhangnam khvhn\
           ON dtn.KEHOACHVAYHANGNAMID = khvhn.KEHOACHVAYHANGNAMID\
           left join qln_hopdongvaylai hd on hd.HOPDONGVAYLAIID = khvhn.HOPDONGVAYLAIID  where dtn.status<>-1"
                }
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []
                            var vICountOfKeys = keys.length;
                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
                                    obj2.NGAYTRA = dateFormat(obj2.NGAYTRA, " dd/mm/yyyy "),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )
            }
        )
    },

    searchdeanphtp: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (cot == 'TENDONVI') {
                cot = 'dmdv.tendonvi'
            }
            if (cot == 'MA') {
                cot = 'datp.ma'
            }
            if (cot == 'TEN') {
                cot = 'datp.ten'
            }
            if (cot == 'THOIGIANPHATHANH') {
                cot = 'datp.thoigianphathanh'
            }
            if (cot == 'NGAYQUYETDINH') {
                cot = ' datp.ngayquyetdinh'
            }
            if (cot == 'KHOILUONGPHATHANH') {
                cot = 'datp.khoiluongphathanh'
            }
            if (cot == 'MENHGIA') {
                cot = 'datp.menhgia'
            }
            if (cot == 'laisuat') {
                cot = 'datp.laisuatphathanh'
            }
            if (cot == 'KYHANTHANHTOAN') {
                cot = 'datp.kyhanthanhtoan'
            }
            if (cot == 'kyhantraiphieu') {
                cot = 'datp.ngaykyhantraiphieu'
            }
            if (body[i].text.length > 0) {
                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {
                    query = "SELECT \
                    datp.deanphathanhtraiphieuid 		\
                    ,datp.ma 				\
                    ,datp.ten\
                    ,datp.soquyetdinh\
                    ,datp.ngayquyetdinh\
                    ,datp.tentochucphathanh\
                    ,Nvl(datp.khoiluongphathanh, 0) * 100000	As khoiluongphathanh\
                    ,datp.ngaykyhantraiphieu 		\
                    ,datp.laisuatphathanh 	\
                    ,datp.menhgia\
                    ,datp.phuongthucphathanh\
                    ,datp.thoigianphathanh\
                    ,datp.kyhanthanhtoan\
                    ,datp.loaithanhtoan\
                    ,datp.vandekhac\
                    ,datp.ghichu\
                    ,dmdv.tendonvi as tendonvi		\
                    ,datp.dongtienphathanh\
                    ,(Nvl((Select count(*) From qln_dotphathanhtraiphieu dotph where 1 = 1 and dotph.status <> -1 and dotph.deanphathanhtraiphieuid = datp.deanphathanhtraiphieuid), 0) + 1) as dotphathanh\
                    ,(Nvl((Select count(*) From qln_mualaitp mualaitp where 1 = 1 and mualaitp.status <> -1 and mualaitp.deanphathanhtraiphieuid = datp.deanphathanhtraiphieuid), 0) + 1) as dotmualai\
                    ,(Nvl(datp.khoiluongphathanh, 0) * 100000 - Nvl(datp.luykephathanh, 0))  as toidaduocphathanh\
                    ,datp.status\
                FROM \
                    qln_deanphathanhtraiphieu datp left join dm_donvi dmdv on datp.donviid = dmdv.donviid\
                    WHERE \
                    datp.status <> -1\
                     and "  + queryy + ""
                } else {
                    query = "SELECT \
                    datp.deanphathanhtraiphieuid 		\
                    ,datp.ma 				\
                    ,datp.ten\
                    ,datp.soquyetdinh\
                    ,datp.ngayquyetdinh\
                    ,datp.tentochucphathanh\
                    ,Nvl(datp.khoiluongphathanh, 0) * 100000	As khoiluongphathanh\
                    ,datp.ngaykyhantraiphieu 		\
                    ,datp.laisuatphathanh 	\
                    ,datp.menhgia\
                    ,datp.phuongthucphathanh\
                    ,datp.thoigianphathanh\
                    ,datp.kyhanthanhtoan\
                    ,datp.loaithanhtoan\
                    ,datp.vandekhac\
                    ,datp.ghichu\
                    ,dmdv.tendonvi as tendonvi		\
                    ,datp.dongtienphathanh\
                    ,(Nvl((Select count(*) From qln_dotphathanhtraiphieu dotph where 1 = 1 and dotph.status <> -1 and dotph.deanphathanhtraiphieuid = datp.deanphathanhtraiphieuid), 0) + 1) as dotphathanh\
                    ,(Nvl((Select count(*) From qln_mualaitp mualaitp where 1 = 1 and mualaitp.status <> -1 and mualaitp.deanphathanhtraiphieuid = datp.deanphathanhtraiphieuid), 0) + 1) as dotmualai\
                    ,(Nvl(datp.khoiluongphathanh, 0) * 100000 - Nvl(datp.luykephathanh, 0))  as toidaduocphathanh\
                    ,datp.status\
                FROM \
                    qln_deanphathanhtraiphieu datp left join dm_donvi dmdv on datp.donviid = dmdv.donviid  where datp.status<>-1"
                }
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []
                            var vICountOfKeys = keys.length;
                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
                                    obj2.KYHANTHANHTOAN = dateFormat(obj2.KYHANTHANHTOAN, " dd/mm/yyyy "),
                                    obj2.NGAYQUYETDINH = dateFormat(obj2.NGAYQUYETDINH, " dd/mm/yyyy "),
                                    obj2.THOIGIANPHATHANH = dateFormat(obj2.THOIGIANPHATHANH, " dd/mm/yyyy "),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )
            }
        )
    },

    searchdotphtp: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (cot == 'TENDUAN') {
                cot = 'dean.ten'
            }
            if (cot == 'MA') {
                cot = 'dtp.ma '
            }
            if (cot == 'TEN') {
                cot = 'dtp.ten'
            }
            if (cot == 'SOQUYETDINH') {
                cot = 'dtp.soquyetdinh'
            }
            if (cot == 'TENTOCHUCPHATHANH') {
                cot = 'dean.tentochucphathanh'
            }
            if (cot == 'KLPHDUKIEN') {
                cot = 'dtp.klphdukien'
            }
            if (cot == 'KLPHTHANHCONG') {
                cot = 'dtp.klphthanhcong'
            }
            if (cot == 'laisuatdukien') {
                cot = 'dtp.laisuatphdukien'
            }
            if (cot == 'laisuatthanhcong') {
                cot = 'dtp.laisuatphthanhcong'
            }
            if (cot == 'NGAYQUYETDINH') {
                cot = 'dtp.ngayquyetdinh'
            }
            if (body[i].text.length > 0) {

                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {
                    query = " SELECT dtp.dotphathanhtraiphieuid ,\
                    dtp.ma,\
                    dtp.ten,\
                    dtp.soquyetdinh,\
                    dtp.ngayquyetdinh,\
                    dtp.klphdukien,\
                    dtp.klphthanhcong,\
                    dean.tentochucphathanh,\
                    dtp.laisuatphdukien,\
                    dtp.laisuatphthanhcong,\
                    dtp.kyhantraiphieu,\
                    (select tentochucphathanh from qln_deanphathanhtraiphieu dean where 1 = 1 and dean.DEANPHATHANHTRAIPHIEUID = dtp.DEANPHATHANHTRAIPHIEUID) tentochucphathanh,\
                    dtp.tienthucnhan,\
                    dtp.ghichu\
                    ,dtp.deanphathanhtraiphieuid\
		            ,dean.ten as tenduan\
	            	,dtp.tochucphtpid\
		            ,dtp.status\
		            ,dtp.note	\
		            ,thoihantraiphieu\
		            ,ngayphathanh\
		            ,dtp.phuongthucphathanh\
                    FROM \
                    qln_dotphathanhtraiphieu dtp \
                    left join QLN_DEANPHATHANHTRAIPHIEU dean on dtp.deanphathanhtraiphieuid = dean.deanphathanhtraiphieuid  where " + queryy + "and dtp.status <> -1"
                } else {
                    query = " SELECT dtp.dotphathanhtraiphieuid ,\
                    dtp.ma,\
                    dtp.ten,\
                    dtp.soquyetdinh,\
                    dtp.ngayquyetdinh,\
                    dtp.klphdukien,\
                    dtp.klphthanhcong,\
                    dean.tentochucphathanh,\
                    dtp.laisuatphdukien,\
                    dtp.laisuatphthanhcong,\
                    dtp.kyhantraiphieu,\
                    (select tentochucphathanh from qln_deanphathanhtraiphieu dean where 1 = 1 and dean.DEANPHATHANHTRAIPHIEUID = dtp.DEANPHATHANHTRAIPHIEUID) tentochucphathanh,\
                    dtp.tienthucnhan,\
                    dtp.ghichu\
                    ,dtp.deanphathanhtraiphieuid\
		            ,dean.ten as tenduan\
	            	,dtp.tochucphtpid\
		            ,dtp.status\
		            ,dtp.note	\
		            ,thoihantraiphieu\
		            ,ngayphathanh\
		            ,dtp.phuongthucphathanh			\
                    FROM \
                    qln_dotphathanhtraiphieu dtp \
                    left join QLN_DEANPHATHANHTRAIPHIEU dean on dtp.deanphathanhtraiphieuid = dean.deanphathanhtraiphieuid  where  dtp.status<>-1"
                }
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []
                            var vICountOfKeys = keys.length;
                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
                                    obj2.NGAYQUYETDINH = dateFormat(obj2.NGAYQUYETDINH, " dd/mm/yyyy "),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )
            }
        )
    },

    searchmualaitp: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (cot == 'TENDEAN') {
                cot = 'dean.TEN'
            }
            if (cot == 'MA') {
                cot = 'mltp.ma'
            }
            if (cot == 'TEN') {
                cot = 'mltp.ten'
            }
            if (cot == 'NGAYTOCHUCMUA') {
                cot = 'mltp.ngaytochucmua'
            }
            if (cot == 'NGAYCUOIDANGKY') {
                cot = ' mltp.ngaycuoidangky'
            }
            if (cot == 'PHUONGTHUCMUA') {
                cot = 'mltp.phuongthucmua'
            }
            if (cot == 'KHOILUONGMUALAI') {
                cot = 'mltp.khoiluongmualai'
            }
            if (cot == 'GIA') {
                cot = 'mltp.gia'
            }
            if (cot == 'TONGSOTIENMUALAI') {
                cot = 'mltp.tongsotienmualai'
            }
            if (body[i].text.length > 0) {
                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {
                    query = " SELECT mltp.mualaitraiphieuid\
                    ,mltp.ma\
                    ,mltp.ten\
	            	,mltp.dukienmucvay\
	            	, mltp.ngaycuoidangky\
	            	,mltp.ngayphongtoa\
	            	,mltp.ngaytochucmua\
	            	,to_char(mltp.ngaymualai) ngaymualai\
	            	,mltp.phuongthucmua\
            		,mltp.chusohuutp\
	            	,dean.TEN as tendean\
	            	,mltp.deanphathanhtraiphieuid\
	            	,mltp.tochucmualai\
	            	,nvl(mltp.tongsotienmualai, 0) as tongsotienmualai\
	            	,nvl(mltp.gia, 0) as gia\
	            	,nvl(mltp.laisuat, 0) as laisuat\
                    ,nvl(mltp.khoiluongmualai, 0) as khoiluongmualai\
                    ,mltp.status\
                    FROM \
                    qln_mualaitp mltp left join qln_deanphathanhtraiphieu dean on mltp.DEANPHATHANHTRAIPHIEUID = dean.DEANPHATHANHTRAIPHIEUID\
                    WHERE \
                    mltp.status <> -1  and "  + queryy + ""
                } else {
                    query = " SELECT mltp.mualaitraiphieuid\
                    ,mltp.ma\
                    ,mltp.ten\
	            	,mltp.dukienmucvay\
	            	, mltp.ngaycuoidangky\
	            	,mltp.ngayphongtoa\
	            	,mltp.ngaytochucmua\
	            	,to_char(mltp.ngaymualai) ngaymualai\
	            	,mltp.phuongthucmua\
            		,mltp.chusohuutp\
	            	,dean.TEN as tendean\
	            	,mltp.deanphathanhtraiphieuid\
	            	,mltp.tochucmualai\
	            	,nvl(mltp.tongsotienmualai, 0) as tongsotienmualai\
	            	,nvl(mltp.gia, 0) as gia\
	            	,nvl(mltp.laisuat, 0) as laisuat\
                    ,nvl(mltp.khoiluongmualai, 0) as khoiluongmualai\
                    ,mltp.status\
                    FROM \
                    qln_mualaitp mltp left join qln_deanphathanhtraiphieu dean on mltp.DEANPHATHANHTRAIPHIEUID = dean.DEANPHATHANHTRAIPHIEUID\
                    WHERE \
                    mltp.status <> -1"
                }
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []
                            var vICountOfKeys = keys.length;
                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
                                    obj2.NGAYTOCHUCMUA = dateFormat(obj2.NGAYTOCHUCMUA, " dd/mm/yyyy "),
                                    obj2.NGAYCUOIDANGKY = dateFormat(obj2.NGAYCUOIDANGKY, " dd/mm/yyyy "),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )
            }
        )
    },

    searchhoandoitp: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (cot == 'MA') {
                cot = 'hdtp.ma'
            }
            if (cot == 'TEN') {
                cot = 'hdtp.ten'
            }
            if (cot == 'NGAYHOANDOI') {
                cot = 'hdtp.ngayhoandoi'
            }
            if (cot == 'KHOILUONGBIHOANDOI') {
                cot = 'hdtp.khoiluongbihoandoi'
            }
            if (cot == 'GIABIHOANDOI') {
                cot = 'hdtp.giabihoandoi'
            }
            if (cot == 'TONGSOTIENBIHOANDOI') {
                cot = 'hdtp.tongsotienbihoandoi'
            }
            if (cot == 'KHOILUONGDUOCHOANDOI') {
                cot = 'hdtp.khoiluongduochoandoi'
            }
            if (cot == 'GIADUOCHOANDOI') {
                cot = 'hdtp.giaduochoandoi'
            }
            if (cot == 'TONGSOTIENDUOCHOANDOI') {
                cot = 'hdtp.tongsotienduochoandoi'
            }
            if (body[i].text.length > 0) {
                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {
                    query = " SELECT hdtp.hoandoitraiphieuid\
                    ,hdtp.ma\
                    ,hdtp.ten\
	            	,hdtp.phuongthuchoandoi\
	            	,hdtp.ngayhoandoi\
	            	,hdtp.ngayphongtoa\
	            	,hdtp.tentaisanbihoandoi\
	            	,hdtp.tentaisanduochoandoi\
	            	,(Select ten from qln_deanphathanhtraiphieu dean Where 1 =1 And dean.DEANPHATHANHTRAIPHIEUID = hdtp.tentaisanbihoandoi) as tenmotataisanbihoandoi\
            		,(Select ten from qln_deanphathanhtraiphieu dean Where 1 =1 And dean.DEANPHATHANHTRAIPHIEUID = hdtp.tentaisanduochoandoi) as tenmotataisanduochoandoi\
	            	,hdtp.khoiluongbihoandoi\
	            	,hdtp.khoiluongduochoandoi\
	            	,hdtp.giabihoandoi\
	            	,hdtp.giaduochoandoi\
	            	,hdtp.tongsotienbihoandoi\
	            	,hdtp.tongsotienduochoandoi\
                    ,hdtp.laisuatbihoandoi\
                    ,hdtp.laisuatduochoandoi   \
                    ,hdtp.status\
                    FROM qln_hoandoitp hdtp\
                    WHERE 1 = 1\
                    and hdtp.status <> -1\
                     and "  + queryy + ""
                } else {
                    query = " SELECT hdtp.hoandoitraiphieuid\
                    ,hdtp.ma\
                    ,hdtp.ten\
	            	,hdtp.phuongthuchoandoi\
	            	,hdtp.ngayhoandoi\
	            	,hdtp.ngayphongtoa\
	            	,hdtp.tentaisanbihoandoi\
	            	,hdtp.tentaisanduochoandoi\
	            	,(Select ten from qln_deanphathanhtraiphieu dean Where 1 =1 And dean.DEANPHATHANHTRAIPHIEUID = hdtp.tentaisanbihoandoi) as tenmotataisanbihoandoi\
            		,(Select ten from qln_deanphathanhtraiphieu dean Where 1 =1 And dean.DEANPHATHANHTRAIPHIEUID = hdtp.tentaisanduochoandoi) as tenmotataisanduochoandoi\
	            	,hdtp.khoiluongbihoandoi\
	            	,hdtp.khoiluongduochoandoi\
	            	,hdtp.giabihoandoi\
	            	,hdtp.giaduochoandoi\
	            	,hdtp.tongsotienbihoandoi\
	            	,hdtp.tongsotienduochoandoi\
                    ,hdtp.laisuatbihoandoi\
                    ,hdtp.laisuatduochoandoi   \
                    ,hdtp.status\
                    FROM qln_hoandoitp hdtp\
                    WHERE 1 = 1\
                    and hdtp.status <> -1"
                }
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []
                            var vICountOfKeys = keys.length;
                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
                                    obj2.NGAYHOANDOI = dateFormat(obj2.NGAYHOANDOI, " dd/mm/yyyy "),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )
            }
        )
    },

    searchvaykbnn: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (cot == 'TENTINHTHANH') {
                cot = 'hdtp.ma'
            }
            if (cot == 'MUCDICHVAY') {
                cot = " CASE\
                WHEN (NVL (tranogoc, 0) <> 0) AND (NVL (budapboichi, 0) <> 0)\
                THEN\
                    'Trả gốc, bù đắp bội chi'\
                ELSE\
                    CASE\
                        WHEN (NVL (tranogoc, 0) <> 0) THEN 'Trả gốc'\
                        ELSE 'Bù đắp bội chi'\
                    END\
            END"
            }
            if (cot == 'NGAYVAY') {
                cot = 'vkbnn.ngayvay'
            }
            if (cot == 'THOIHANVAYDATE') {
                cot = 'vkbnn.thoihanvaydate'
            }
            if (cot == 'TRANOGOC') {
                cot = 'vkbnn.tranogoc'
            }
            if (cot == 'BUDAPBOICHI') {
                cot = 'vkbnn.budapboichi'
            }
            if (cot == 'TONGVAY') {
                cot = 'NVL (vkbnn.tranogoc, 0) + NVL (vkbnn.budapboichi, 0)'
            }
            if (cot == 'LAIPHI') {
                cot = 'vkbnn.laiphi'
            }
            if (cot == 'TONGTRAGOC') {
                cot = 'TONGTIENDATRAGOC'
            }
            if (cot == 'TONGTRALAI') {
                cot = 'TONGTIENDATRALAI'
            }
            if (cot == 'TONGTRA') {
                cot = 'TONGTIENDATRALAI+TONGTIENDATRAGOC'
            }
            if (cot == 'canhbao') {
                cot = "CASE\
                WHEN (    (TRUNC (thoihanvaydate) - TRUNC (SYSDATE) < 15)\
                      AND (TRUNC (thoihanvaydate) - TRUNC (SYSDATE) > 0))\
                THEN\
                    'Sắp tới ngày trả nợ'\
                ELSE\
                    CASE\
                        WHEN (TRUNC (thoihanvaydate) < TRUNC (SYSDATE))\
                        THEN\
                            CASE\
                                WHEN NVL (TONGTIENDATRAGOC, 0) > 0\
                                THEN\
                                    'Đã trả một phần'\
                                WHEN NVL (TONGTIENDATRAGOC, 0) =\
                                     (  NVL (vkbnn.tranogoc, 0)\
                                      + NVL (vkbnn.budapboichi, 0))\
                                THEN\
                                    'Đã trả hết'\
                                ELSE\
                                       'Quá hạn trả nợ '\
                                    || ((TRUNC (SYSDATE) - TRUNC (thoihanvaydate)))\
                                    || ' ngày'\
                            END\
                        ELSE\
                               'Còn lại '\
                            || ((TRUNC (thoihanvaydate)) - TRUNC (SYSDATE))\
                            || ' ngày để trả nợ'\
                    END\
            END"
            }
            if (body[i].text.length > 0) {

                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {
                    query = " SELECT vkbnn.vaykhobacnhanuocid\
                    ,Case When (nvl(tranogoc, 0) <> 0) and (nvl(budapboichi, 0) <> 0) then \
                    'Trả gốc, bù đắp bội chi'\
                    Else\
                    Case When (nvl(tranogoc, 0) <> 0) then\
                        'Trả gốc'\
                    Else\
                    'Bù đắp bội chi'\
                    End            \
                    End as mucdichvay\
                    ,vkbnn.ngayvay \
		            ,vkbnn.thoihanvay\
	            	,vkbnn.thoihanvaydate \
	            	,vkbnn.donviid	\
	            	,dmtt.tendonvi as tendonvi\
	            	,vkbnn.tranogoc	\
	            	,vkbnn.budapboichi\
	            	,nvl(vkbnn.tranogoc, 0) + nvl(vkbnn.budapboichi,0) as tongvay		\
                    ,luyketinhthanh.luyke as luyke\
                    ,vkbnn.laiphi\
                    ,vkbnn.status\
                    ,nvl(TONGTIENDATRAGOC,0) as tongtragoc\
                    ,nvl(TONGTIENDATRALAI,0) as tongtralai	\
                    ,get_trangthaipheduyet('qln_vaykhobacnhanuoc',vkbnn.vaykhobacnhanuocid ,'3d064424-abcd-4879-a000-707b666afc97', vkbnn.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c') as ttpdcaptren\
                    ,get_action_pheduyet('qln_vaykhobacnhanuoc',vkbnn.vaykhobacnhanuocid ,'3d064424-abcd-4879-a000-707b666afc97', vkbnn.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c', 1) as roleapprove\
                    ,(nvl(TONGTIENDATRAGOC,0)\
                    +nvl(TONGTIENDATRALAI,0)) as tongtra	\
                    ,case when ((trunc(thoihanvaydate) - trunc(sysdate) < 15) and (trunc(thoihanvaydate) - trunc(sysdate) > 0)) \
                    then\
                    'Sắp tới ngày trả nợ'\
                else		\
                case when (trunc(thoihanvaydate) < trunc(sysdate))\
                then\
                Case when nvl(TONGTIENDATRAGOC,0) > 0 \
                Then\
                    'Đã trả một phần'\
                when nvl(TONGTIENDATRAGOC,0) =  (nvl(vkbnn.tranogoc, 0) + nvl(vkbnn.budapboichi,0)) \
                Then\
                    'Đã trả hết'\
                Else\
                    'Quá hạn trả nợ ' || (( trunc(sysdate) - trunc(thoihanvaydate))) || ' ngày'\
                End\
        else\
            'Còn lại ' || ((trunc(thoihanvaydate)) - trunc(sysdate)) || ' ngày để trả nợ'\
        end\
        end canhbao\
                    FROM qln_vaykhobacnhanuoc vkbnn\
                    LEFT JOIN dm_donvi dmtt ON vkbnn.donviid = dmtt.donviid\
                    LEFT JOIN (  SELECT SUM (vkbnn1.tranogoc) luyke, vkbnn1.donviid\
                    FROM qln_vaykhobacnhanuoc vkbnn1\
                    GROUP BY vkbnn1.donviid) luyketinhthanh\
                    ON luyketinhthanh.donviid = vkbnn.donviid\
                    WHERE 1 = 1\
                    and vkbnn.status <> -1\
                     and "  + queryy + ""
                } else {
                    query = " SELECT vkbnn.vaykhobacnhanuocid\
                    ,Case When (nvl(tranogoc, 0) <> 0) and (nvl(budapboichi, 0) <> 0) then \
                    'Trả gốc, bù đắp bội chi'\
                    Else\
                    Case When (nvl(tranogoc, 0) <> 0) then\
                        'Trả gốc'\
                    Else\
                    'Bù đắp bội chi'\
                    End            \
                    End as mucdichvay\
                    ,vkbnn.ngayvay \
		            ,vkbnn.thoihanvay\
	            	,vkbnn.thoihanvaydate\
	            	,vkbnn.donviid	\
	            	,dmtt.tendonvi as tendonvi\
	            	,vkbnn.tranogoc	\
	            	,vkbnn.budapboichi\
	            	,nvl(vkbnn.tranogoc, 0) + nvl(vkbnn.budapboichi,0) as tongvay		\
	            	,luyketinhthanh.luyke as luyke\
                    ,vkbnn.laiphi\
                    ,vkbnn.status\
                    ,nvl(TONGTIENDATRAGOC,0) as tongtragoc\
                    ,nvl(TONGTIENDATRALAI,0) as tongtralai	\
                    ,get_trangthaipheduyet('qln_vaykhobacnhanuoc',vkbnn.vaykhobacnhanuocid ,'3d064424-abcd-4879-a000-707b666afc97', vkbnn.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c') as ttpdcaptren\
                    ,get_action_pheduyet('qln_vaykhobacnhanuoc',vkbnn.vaykhobacnhanuocid ,'3d064424-abcd-4879-a000-707b666afc97', vkbnn.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c', 1) as roleapprove\
                    ,(nvl(TONGTIENDATRAGOC,0)\
                    +nvl(TONGTIENDATRALAI,0)) as tongtra	\
                    ,case when ((trunc(thoihanvaydate) - trunc(sysdate) < 15) and (trunc(thoihanvaydate) - trunc(sysdate) > 0)) \
                    then\
                    'Sắp tới ngày trả nợ'\
                else		\
                case when (trunc(thoihanvaydate) < trunc(sysdate))\
                then\
                Case when nvl(TONGTIENDATRAGOC,0) > 0 \
                Then\
                    'Đã trả một phần'\
                when nvl(TONGTIENDATRAGOC,0) =  (nvl(vkbnn.tranogoc, 0) + nvl(vkbnn.budapboichi,0)) \
                Then\
                    'Đã trả hết'\
                Else\
                    'Quá hạn trả nợ ' || (( trunc(sysdate) - trunc(thoihanvaydate))) || ' ngày'\
                End\
        else\
            'Còn lại ' || ((trunc(thoihanvaydate)) - trunc(sysdate)) || ' ngày để trả nợ'\
        end\
        end canhbao\
                    FROM qln_vaykhobacnhanuoc vkbnn\
                    LEFT JOIN dm_donvi dmtt ON vkbnn.donviid = dmtt.donviid\
                    LEFT JOIN (  SELECT SUM (vkbnn1.tranogoc) luyke, vkbnn1.donviid\
                    FROM qln_vaykhobacnhanuoc vkbnn1\
                    GROUP BY vkbnn1.donviid) luyketinhthanh\
             ON luyketinhthanh.donviid = vkbnn.donviid\
                    WHERE 1 = 1\
                    and vkbnn.status <> -1"
                }

                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []
                            var vICountOfKeys = keys.length;
                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
                                    obj2.NGAYVAY = dateFormat(obj2.NGAYVAY, " dd/mm/yyyy "),
                                    obj2.THOIHANVAYDATE = dateFormat(obj2.THOIHANVAYDATE, " dd/mm/yyyy "),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )
            }
        )
    },

    searchvayquydutru: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (cot == 'TENTINHTHANH') {
                cot = 'dmtt.ten'
            }
            if (cot == 'NGAYVAY') {
                cot = 'vqdtt.ngayvay'
            }
            if (cot == 'THOIHANVAYDATE') {
                cot = 'vqdtt.thoihanvaydate'
            }
            if (cot == 'HANMUCVAY') {
                cot = ' vhm.sotienhanmuc'
            }
            if (cot == 'SOTIENVAY') {
                cot = 'vqdtt.sotienvay'
            }
            if (cot == 'SOTIENTRA') {
                cot = 'vqdtt.sotientra'
            }
            if (cot == 'canhbao') {
                cot = "CASE\
           WHEN (    (TRUNC (thoihanvaydate) - TRUNC (SYSDATE) < 15)\
                 AND (TRUNC (thoihanvaydate) - TRUNC (SYSDATE) > 0))\
           THEN\
               'Sắp tới ngày trả nợ'\
           ELSE\
               CASE\
                   WHEN (TRUNC (thoihanvaydate) < TRUNC (SYSDATE))\
                   THEN\
                       CASE\
                           WHEN NVL (vqdtt.sotientra, 0) > 0\
                           THEN\
                               'Đã trả'\
                           ELSE\
                                  'Quá hạn trả nợ '\
                               || ((TRUNC (SYSDATE) - TRUNC (thoihanvaydate)))\
                               || ' ngày'\
                       END\
                   ELSE\
                          'Còn lại '\
                       || ((TRUNC (thoihanvaydate)) - TRUNC (SYSDATE))\
                       || ' ngày để trả nợ'\
               END\
       END"
            }
            if (body[i].text.length > 0) {

                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {
                    query = " SELECT vqdtt.vayquydutrutinhid,\
                    (select sotienhanmuc from  qln_vayquydutrutinh_hanmuc where  1 = 1 And donviid = vqdtt.donviid And NAMTAICHINH = to_number(to_char(ngayvay, 'yyyy'))) as hanmucvay,\
               vqdtt.sotienvay,\
               vhm.sotienhanmuc,\
               vqdtt.sotientra,\
               vqdtt.ngayvay,\
               vqdtt.thoihanvaydate,\
               vqdtt.donviid,\
               dmtt.tendonvi as tendonvi,\
               Case when ((trunc(thoihanvaydate) - trunc(sysdate) < 15) and (trunc(thoihanvaydate) - trunc(sysdate) > 0)) \
               Then\
                    'Sắp tới ngày trả nợ'\
               Else		\
                   Case when (trunc(thoihanvaydate) < trunc(sysdate))\
                   Then\
                            Case when nvl(vqdtt.sotientra, 0)> 0 \
                            Then\
                                'Đã trả'\
                            Else\
                                'Quá hạn trả nợ ' || (( trunc(sysdate) - trunc(thoihanvaydate))) || ' ngày'\
                            End\
                   Else\
                        'Còn lại ' || ((trunc(thoihanvaydate)) - trunc(sysdate)) || ' ngày để trả nợ'\
                   End\
               End canhbao,\
                get_trangthaipheduyet('qln_vayquydutrutinh',vqdtt.vayquydutrutinhid ,'3d064424-abcd-4879-a000-707b666afc97', vqdtt.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c') as ttpdcaptren\
                ,get_action_pheduyet('qln_vayquydutrutinh',vqdtt.vayquydutrutinhid ,'3d064424-abcd-4879-a000-707b666afc97', vqdtt.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c', 1) as roleapprove,\
               vqdtt.status\
                    FROM qln_vayquydutrutinh  vqdtt\
                    left join qln_vayquydutrutinh_hanmuc vhm on vhm.donviid = vqdtt.donviid\
                    LEFT JOIN dm_donvi dmtt\
                    ON dmtt.donviid = vqdtt.donviid     \
                    WHERE 1 = 1\
                    and vqdtt.status <> -1\
                     and "  + queryy + ""
                } else {
                    query = " SELECT vqdtt.vayquydutrutinhid,\
                    (select sotienhanmuc from  qln_vayquydutrutinh_hanmuc where  1 = 1 And donviid = vqdtt.donviid And NAMTAICHINH = to_number(to_char(ngayvay, 'yyyy'))) as hanmucvay,\
               vqdtt.sotienvay,\
               vhm.sotienhanmuc,\
               vqdtt.sotientra,\
               vqdtt.ngayvay,\
               vqdtt.thoihanvaydate,\
               vqdtt.donviid,\
               dmtt.tendonvi as tendonvi,\
               Case when ((trunc(thoihanvaydate) - trunc(sysdate) < 15) and (trunc(thoihanvaydate) - trunc(sysdate) > 0)) \
               Then\
                    'Sắp tới ngày trả nợ'\
               Else		\
                   Case when (trunc(thoihanvaydate) < trunc(sysdate))\
                   Then\
                            Case when nvl(vqdtt.sotientra, 0)> 0 \
                            Then\
                                'Đã trả'\
                            Else\
                                'Quá hạn trả nợ ' || (( trunc(sysdate) - trunc(thoihanvaydate))) || ' ngày'\
                            End\
                   Else\
                        'Còn lại ' || ((trunc(thoihanvaydate)) - trunc(sysdate)) || ' ngày để trả nợ'\
                   End\
               End canhbao,\
               get_trangthaipheduyet('qln_vayquydutrutinh',vqdtt.vayquydutrutinhid ,'3d064424-abcd-4879-a000-707b666afc97', vqdtt.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c') as ttpdcaptren\
                ,get_action_pheduyet('qln_vayquydutrutinh',vqdtt.vayquydutrutinhid ,'3d064424-abcd-4879-a000-707b666afc97', vqdtt.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c', 1) as roleapprove,\
               vqdtt.status\
                    FROM qln_vayquydutrutinh  vqdtt\
                    left join qln_vayquydutrutinh_hanmuc vhm on vhm.donviid = vqdtt.donviid\
                    LEFT JOIN dm_donvi dmtt\
                    ON dmtt.donviid = vqdtt.donviid     \
                    WHERE 1 = 1\
                    and vqdtt.status <> -1"
                }
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []
                            var vICountOfKeys = keys.length;
                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
                                    obj2.NGAYVAY = dateFormat(obj2.NGAYVAY, " dd/mm/yyyy "),
                                    obj2.THOIHANVAYDATE = dateFormat(obj2.THOIHANVAYDATE, " dd/mm/yyyy "),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )
            }
        )
    },

    searchvayvdb: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (cot == 'TENTINHTHANH') {
                cot = 'dmtt.ten'
            }
            if (cot == 'NGAYVAY') {
                cot = 'vdb.ngayvay'
            }
            if (cot == 'THOIHANVAYDATE') {
                cot = 'vdb.thoihanvaydate'
            }
            if (cot == 'SOTIENVAY') {
                cot = 'vdb.sotienvay'
            }
            if (cot == 'SOTIENTRA') {
                cot = 'vdb.sotientra'
            }
            if (cot == 'canhbao') {
                cot = "CASE\
                WHEN (    (TRUNC (thoihanvaydate) - TRUNC (SYSDATE) < 15)\
                      AND (TRUNC (thoihanvaydate) - TRUNC (SYSDATE) > 0))\
                THEN\
                    'Sắp tới ngày trả nợ'\
                ELSE\
                    CASE\
                        WHEN (TRUNC (thoihanvaydate) < TRUNC (SYSDATE))\
                        THEN\
                            CASE\
                                WHEN NVL (vdb.sotientra, 0) > 0\
                                THEN\
                                    'Đã trả'\
                                ELSE\
                                       'Quá hạn trả nợ '\
                                    || ((TRUNC (SYSDATE) - TRUNC (thoihanvaydate)))\
                                    || ' ngày'\
                            END\
                        ELSE\
                               'Còn lại '\
                            || ((TRUNC (thoihanvaydate)) - TRUNC (SYSDATE))\
                            || ' ngày để trả nợ'\
                    END\
            END"
            }
            if (body[i].text.length > 0) {
                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {
                    query = " SELECT vdb.vayvdbid,\
                    vdb.sotienvay,\
                    vdb.sotientra,\
                    vdb.laisuat,\
                    vdb.ngayvay, \
               vdb.thoihanvaydate, \
               vdb.donviid,\
               dmtt.tendonvi as tendonvi,\
               Case when ((trunc(thoihanvaydate) - trunc(sysdate) < 15) and (trunc(thoihanvaydate) - trunc(sysdate) > 0)) \
               Then\
                    'Sắp tới ngày trả nợ'\
               Else		\
                   Case when (trunc(thoihanvaydate) < trunc(sysdate))\
                   Then\
                            Case when nvl(vdb.sotientra, 0)> 0 \
                            Then\
                                'Đã trả'\
                            Else\
                                'Quá hạn trả nợ ' || (( trunc(sysdate) - trunc(thoihanvaydate))) || ' ngày'\
                            End\
                   Else\
                        'Còn lại ' || ((trunc(thoihanvaydate)) - trunc(sysdate)) || ' ngày để trả nợ'\
                   End\
               End canhbao,\
                get_trangthaipheduyet('qln_vayvdb',vdb.vayvdbid ,'3d064424-abcd-4879-a000-707b666afc97', vdb.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c') as ttpdcaptren\
                ,get_action_pheduyet('qln_vayvdb',vdb.vayvdbid ,'3d064424-abcd-4879-a000-707b666afc97', vdb.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c', 1) as roleapprove,\
               vdb.status\
                    FROM qln_vayvdb  vdb\
                    LEFT JOIN dm_donvi dmtt\
                   ON dmtt.donviid = vdb.donviid     \
                    WHERE 1 = 1\
                    and vdb.status <> -1\
                     and "  + queryy + ""
                } else {
                    query = " SELECT vdb.vayvdbid,\
                    vdb.sotienvay,\
                    vdb.sotientra,\
                    vdb.laisuat,\
                    vdb.ngayvay, \
               vdb.thoihanvaydate, \
               vdb.donviid,\
               dmtt.tendonvi as tendonvi,\
               Case when ((trunc(thoihanvaydate) - trunc(sysdate) < 15) and (trunc(thoihanvaydate) - trunc(sysdate) > 0)) \
               Then\
                    'Sắp tới ngày trả nợ'\
               Else		\
                   Case when (trunc(thoihanvaydate) < trunc(sysdate))\
                   Then\
                            Case when nvl(vdb.sotientra, 0)> 0 \
                            Then\
                                'Đã trả'\
                            Else\
                                'Quá hạn trả nợ ' || (( trunc(sysdate) - trunc(thoihanvaydate))) || ' ngày'\
                            End\
                   Else\
                        'Còn lại ' || ((trunc(thoihanvaydate)) - trunc(sysdate)) || ' ngày để trả nợ'\
                   End\
               End canhbao,\
               get_trangthaipheduyet('qln_vayvdb',vdb.vayvdbid ,'3d064424-abcd-4879-a000-707b666afc97', vdb.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c') as ttpdcaptren\
               ,get_action_pheduyet('qln_vayvdb',vdb.vayvdbid ,'3d064424-abcd-4879-a000-707b666afc97', vdb.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c', 1) as roleapprove,\
               vdb.status\
                    FROM qln_vayvdb  vdb\
                    LEFT JOIN dm_donvi dmtt\
                   ON dmtt.donviid = vdb.donviid     \
                    WHERE 1 = 1\
                    and vdb.status <> -1"
                }
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []
                            var vICountOfKeys = keys.length;
                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
                                    obj2.NGAYVAY = dateFormat(obj2.NGAYVAY, " dd/mm/yyyy "),
                                    obj2.THOIHANVAYDATE = dateFormat(obj2.THOIHANVAYDATE, " dd/mm/yyyy "),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )
            }
        )
    },

    searchvaytctc: (body, callback) => {
        let qr = ''
        for (var i = 0; i < body.length; i++) {
            var cot = body[i].column.split('_')[1]
            if (cot == 'TENTINHTHANH') {
                cot = 'dmtt.ten'
            }
            if (cot == 'NGAYVAY') {
                cot = 'vdb.ngayvay'
            }
            if (cot == 'THOIHANVAYDATE') {
                cot = 'vdb.thoihanvaydate'
            }
            if (cot == 'SOTIENVAY') {
                cot = 'vdb.sotienvay'
            }
            if (cot == 'LAISUAT') {
                cot = 'vdb.laisuat'
            }
            if (cot == 'SOTIENTRA') {
                cot = 'vdb.sotientra'
            }
            if (cot == 'LUYKETRANO') {
                cot = 'vdb.luyketrano'
            }
            if (cot == 'DUNO') {
                cot = 'vdb.duno'
            }
            if (cot == 'canhbao') {
                cot = " CASE\
                WHEN (    (TRUNC (thoihanvaydate) - TRUNC (SYSDATE) < 15)\
                      AND (TRUNC (thoihanvaydate) - TRUNC (SYSDATE) > 0))\
                THEN\
                    'Sắp tới ngày trả nợ'\
                ELSE\
                    CASE\
                        WHEN (TRUNC (thoihanvaydate) < TRUNC (SYSDATE))\
                        THEN\
                            CASE\
                                WHEN NVL (vdb.luyketrano, 0) > 0\
                                THEN\
                                    'Đã trả'\
                                ELSE\
                                       'Quá hạn trả nợ '\
                                    || ((TRUNC (SYSDATE) - TRUNC (thoihanvaydate)))\
                                    || ' ngày'\
                            END\
                        ELSE\
                               'Còn lại '\
                            || ((TRUNC (thoihanvaydate)) - TRUNC (SYSDATE))\
                            || ' ngày để trả nợ'\
                    END\
            END"
            }
            if (body[i].text.length > 0) {
                qr = qr + "upper(" + cot + ") like upper('%" + body[i].text + "%') and "
            }
        }

        oracledb.getConnection(
            connectString,
            function (err, connection) {
                if (err) {
                    return;
                }
                let queryy = qr.slice(0, qr.length - 5)
                var query = ''
                if (queryy.length > 0) {
                    query = " SELECT vdb.vaytctctdtnid,\
                    vdb.sotienvay,\
               vdb.laisuat,\
               vdb.ngayvay,\
               vdb.thoihanvaydate,\
               vdb.donviid,\
               dmtt.tendonvi as tendonvi,\
               Case when ((trunc(thoihanvaydate) - trunc(sysdate) < 15) and (trunc(thoihanvaydate) - trunc(sysdate) > 0)) \
               Then\
                    'Sắp tới ngày trả nợ'\
               Else		\
                   Case when (trunc(thoihanvaydate) < trunc(sysdate))\
                   Then\
                            Case when nvl(vdb.luyketrano, 0)> 0 \
                            Then\
                                'Đã trả'\
                            Else\
                                'Quá hạn trả nợ ' || (( trunc(sysdate) - trunc(thoihanvaydate))) || ' ngày'\
                            End\
                   Else\
                        'Còn lại ' || ((trunc(thoihanvaydate)) - trunc(sysdate)) || ' ngày để trả nợ'\
                   End\
               End canhbao,\
               vdb.luyketrano,\
               vdb.duno,\
               get_trangthaipheduyet('qln_vaytctctdtn',vdb.vaytctctdtnid ,'3d064424-abcd-4879-a000-707b666afc97', vdb.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c') as ttpdcaptren\
               ,get_action_pheduyet('qln_vaytctctdtn',vdb.vaytctctdtnid ,'3d064424-abcd-4879-a000-707b666afc97', vdb.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c', 1) as roleapprove,\
               vdb.status\
                    FROM qln_vaytctctdtn  vdb\
                    LEFT JOIN dm_donvi dmtt\
                   ON dmtt.donviid = vdb.donviid\
                    WHERE 1 = 1\
                    and vdb.status <> -1\
                     and "  + queryy + ""
                } else {
                    query = " SELECT vdb.vaytctctdtnid,\
                    vdb.sotienvay,\
               vdb.laisuat,\
               vdb.ngayvay,\
               vdb.thoihanvaydate,\
               vdb.donviid,\
               dmtt.tendonvi as tendonvi,\
               Case when ((trunc(thoihanvaydate) - trunc(sysdate) < 15) and (trunc(thoihanvaydate) - trunc(sysdate) > 0)) \
               Then\
                    'Sắp tới ngày trả nợ'\
               Else		\
                   Case when (trunc(thoihanvaydate) < trunc(sysdate))\
                   Then\
                            Case when nvl(vdb.luyketrano, 0)> 0 \
                            Then\
                                'Đã trả'\
                            Else\
                                'Quá hạn trả nợ ' || (( trunc(sysdate) - trunc(thoihanvaydate))) || ' ngày'\
                            End\
                   Else\
                        'Còn lại ' || ((trunc(thoihanvaydate)) - trunc(sysdate)) || ' ngày để trả nợ'\
                   End\
               End canhbao,\
               vdb.luyketrano,\
               vdb.duno,\
               get_trangthaipheduyet('qln_vaytctctdtn',vdb.vaytctctdtnid ,'3d064424-abcd-4879-a000-707b666afc97', vdb.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c') as ttpdcaptren\
               ,get_action_pheduyet('qln_vaytctctdtn',vdb.vaytctctdtnid ,'3d064424-abcd-4879-a000-707b666afc97', vdb.CREATEDBY, 'beac614d-c7de-4cbd-b3ec-33fa670e726c', 1) as roleapprove,\
               vdb.status\
                    FROM qln_vaytctctdtn  vdb\
                    LEFT JOIN dm_donvi dmtt\
                   ON dmtt.donviid = vdb.donviid\
                    WHERE 1 = 1\
                    and vdb.status <> -1"
                }
                connection.execute(
                    query, [], function (error, rows) {
                        if (rows) {
                            var values = rows.rows
                            var keys = rows.metaData
                            var obj = []
                            var vICountOfKeys = keys.length;
                            values.forEach(element => {
                                var obj2 = {}
                                for (index = 0; index < vICountOfKeys; index++) {
                                    obj2[keys[index].name] = element[index]
                                }
                                obj2.CREATEDDATE = dateFormat(obj2.CREATEDDATE, " dd/mm/yyyy h:MM:ss TT"),
                                    obj2.NGAYVAY = dateFormat(obj2.NGAYVAY, " dd/mm/yyyy "),
                                    obj2.THOIHANVAYDATE = dateFormat(obj2.THOIHANVAYDATE, " dd/mm/yyyy "),
                                    obj.push(obj2)
                            });
                            callback({ CODE: "0", MESSAGE: 'SUCCESS', RESULT: obj })
                        }
                        else {
                            callback({ CODE: '100000', MESSAGE: 'lỗi cmnr' })
                        }
                    }
                )
            }
        )
    },
}

module.exports = searchData;