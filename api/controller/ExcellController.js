var Knex = require('../configurations/knexConnect')
const XlsxPopulate = require('xlsx-populate');
var Xlsx = require('xlsx')
var arrCharCode = getArrCharCode()

function getArrCharCode() {
    var arr_char = []
    var arr_char_return = [ ...arr_char ]

    for (let index = 65; index <= 90; index++) {
        arr_char.push(String.fromCharCode(index))
    }
    var arr_char_return = [ ...arr_char ]

    arr_char.map((item1) => {
        arr_char.map(function (item2) {
            arr_char_return.push(item1 + item2)
        })
    })
    return arr_char_return;
}

var Num = require('numeral')
const regex = {
    number: /\d+/g
}

var Query = require('./query')

const ExcellController = {
    export: (data, callback) => {
        Export[ (data.i_fnc + '').toLocaleLowerCase() ](data, function (data_callback) {
            callback({ RESULT: data_callback, CODE: 1 })
        })
    },
    exportTamplate: (data, callback) => {
        ExportTamplate[ (data.i_fnc + '').toLocaleLowerCase() ](data, function (data_callback) {
            callback({ RESULT: data_callback, CODE: 1 })
        })
    },
    import: (data, callback) => {
        Import[ (data.i_fnc + '').toLocaleLowerCase() ](data, function (data_callback) {
            callback({ RESULT: data_callback, CODE: 1 })
        })
    }
}


const Export = {
    vaykbnn: (data, callback) => {
        idlogin = data.idlogin
        data.unitid = data.i_donviid
        delete data.i_donviid
        delete data.i_fnc
        var keys = []
        try {
            Query(data, 'fn_qln_vaykbnn_getall', function (_rs) {
                _rs_format = []
                keys = _rs.length > 0 ? Object.keys(_rs[ 0 ]) : []
                _rs.map((item, index_item) => {
                    item.THOIHANVAY = item.THOIHANVAY + ' (tháng)'
                    item.LAIPHI = item.LAIPHI + ' (%)'
                    delete item.VAYKHOBACNHANUOCID
                    delete item.DONVIID
                    delete item.THOIHANVAYDATE
                    delete item.MAHOPDONG
                    item_format = {
                        STT: index_item + 1,
                        ...item
                    }
                    _rs_format.push(item_format)
                });

                keys_format = Object.keys(_rs_format[ 0 ])
                var arr_cell = arrCharCode.slice(0, keys_format.length)
                XlsxPopulate.fromBlankAsync()
                    .then(async workbook => {
                        var sheetExport = workbook.addSheet("Danh sách vay kho bạc nhà nước");
                        workbook.deleteSheet("Sheet1")


                        const arrHeadTitle = [
                            'Stt',
                            'Hợp đồng',
                            'Mục đích vay',
                            'Ngày vay',
                            'Thời hạn vay',
                            'Tên đơn vị',
                            'Số tiền vay mục đích trả nợ gốc',
                            'Số tiền vay mục đích bù đắp bội chi',
                            'Tổng tiền vay',
                            'Lũy kê vay',
                            'Lãi phí',
                            'Tổng tiền trả gốc',
                            'Tổng tiền trả lãi',
                            'Tổng trả',
                            'Cảnh báo'
                        ]

                        const rangeHead = sheetExport.range("A1:" + arr_cell[ arr_cell.length - 1 ] + 1); // vẽ  title
                        rangeHead.merged(true)
                        rangeHead.value('Danh sách vay kho bạc nhà nước kết xuất ngày ' + (((new Date()).getUTCDay() + 7) + '/' + (new Date()).getMonth() + '/' + (new Date()).getFullYear()))
                        rangeHead.style("verticalAlignment", "center")
                        rangeHead.style("horizontalAlignment", "center")
                        rangeHead.style('fontColor', 'FFFFFF')
                        rangeHead.style("fill", '3366FF');
                        rangeHead.style("fontSize", 20);


                        sheetExport.row(1).height(80);
                        sheetExport.row(2).style("verticalAlignment", "center")
                        sheetExport.row(2).style("horizontalAlignment", "center")
                        sheetExport.row(2).height(60)

                        arr_cell.map((itemCelldraw, index) => { //vẽ head
                            sheetExport.column(itemCelldraw).width(15)
                            sheetExport.cell(itemCelldraw + 2).value(arrHeadTitle[ index ])
                            sheetExport.cell(itemCelldraw + 2).style("fill", 'FFFF99')
                            sheetExport.cell(itemCelldraw + 2).style('fontColor', '000000')
                            sheetExport.cell(itemCelldraw + 2).style('fontSize', 14)
                            sheetExport.cell(itemCelldraw + 2).style('wrapText', true)
                            sheetExport.cell(itemCelldraw + 2).style('border', true)
                        })



                        _rs_format.map((item_rs, index_rs) => {
                            arr_cell.map((itemCell, index_cell) => {
                                sheetExport.cell(itemCell + (Number(index_rs) + 3)).value(item_rs[ keys_format[ index_cell ] ])
                                if (regex.number.test(item_rs[ keys_format[ index_cell ] ]) & keys_format[ index_cell ].toUpperCase() !== 'STT') {
                                    sheetExport.cell(itemCell + (Number(index_rs) + 3)).style("numberFormat", "0,0.0")
                                    sheetExport.cell(itemCell + (Number(index_rs) + 3)).style("wrapText", true)
                                }
                                if (keys_format[ index_cell ].toUpperCase() !== 'STT') {
                                    sheetExport.cell(itemCell + (Number(index_rs) + 3)).style('horizontalAlignment', 'center')
                                }
                                sheetExport.cell(itemCell + (Number(index_rs) + 3)).style("border", true)
                            })
                        })


                        var filename = 'Danh_sách_vay_kho_bạc_nhà_nước_kết_xuất_ngày_' + (((new Date()).getUTCDay() + 7) + '-' + (new Date()).getMonth() + '-' + (new Date()).getFullYear() + '-') + ((new Date()).getTime()) + idlogin + '.xlsx'
                        var urlFile = 'storage/excell/export/' + filename

                        let _pWriteFile = new Promise((resolve, reject) => {
                            var buildFile = workbook.toFileAsync(urlFile, {});
                            resolve(buildFile)

                        })
                        _pWriteFile.then((buildFile) => {
                            callback({ CODE: 1, urlFile: urlFile, MESSAGE: 'Xuất thành công!' })
                        })

                        _pWriteFile.catch(err => {
                            callback({ CODE: 0, urlFile: urlFile, MESSAGE: 'Xuất không thành công!' })
                        })
                    });

            })
        } catch (err) {
            callback({ CODE: 0, MESSAGE: 'Xuất không thành công!' }) 
            console.log(err); 
        }
    }
}


const ExportTamplate = {
    vaykbnn: (data, callback) => {
        idlogin = data.idlogin
        delete data.i_fnc
        var keys = []
        try {
            Query(data, 'fn_qln_vaykbnn_getall', function (_rs) {
                _rs_format = []
                keys = _rs.length > 0 ? Object.keys(_rs[ 0 ]) : []
                _rs = _rs.slice(0, 1) 
                _rs.map((item, index_item) => {
                    delete item.VAYKHOBACNHANUOCID
                    delete item.DONVIID
                    delete item.THOIHANVAYDATE
                    delete item.TENHOPDONG
                    delete item.TONGTRAGOC
                    delete item.TONGTRALAI
                    delete item.TONGTRA
                    delete item.CANHBAO
                    delete item.LUYKE
                    delete item.TENDONVI
                    delete item.MUCDICHVAY
                    delete item.TONGVAY

                    item_format = {
                        STT: index_item + 1,
                        ...item
                    }
                    _rs_format.push(item_format)
                });

                _rs_format.length == 0 ? _rs_format.push({
                    STT: 1,
                    MAHOPDONG: 'test',
                    NGAYVAY: '01/01/2019',
                    THOIHANVAY: 1,
                    TRANOGOC: 0,
                    BUDAPBOICHI: 0,
                    LAIPHI: 0.1
                }) : () => { return }

                keys_format = Object.keys(_rs_format[ 0 ])
                var arr_cell = arrCharCode.slice(0, keys_format.length)
                XlsxPopulate.fromBlankAsync()
                    .then(workbook => {
                        var sheetExport = workbook.addSheet("Danh sách vay kho bạc nhà nước");
                        workbook.deleteSheet("Sheet1")


                        const arrHeadTitle = [
                            'Stt',
                            'Hợp đồng',
                            'Ngày vay',
                            'Thời hạn vay (tháng)',
                            'Số tiền vay mục đích trả nợ gốc',
                            'Số tiền vay mục đích bù đắp bội chi',
                            'Lãi phí (%)'
                        ]

                        const rangeHead = sheetExport.range("A1:" + arr_cell[ arr_cell.length - 1 ] + 1); // vẽ  title
                        rangeHead.merged(true)
                        rangeHead.value('Danh sách vay kho bạc nhà nước kết xuất ngày ' + (((new Date()).getUTCDay() + 7) + '/' + (new Date()).getMonth() + '/' + (new Date()).getFullYear()))
                        rangeHead.style("verticalAlignment", "center")
                        rangeHead.style("horizontalAlignment", "center")
                        rangeHead.style('fontColor', 'FFFFFF')
                        rangeHead.style("fill", '3366FF');
                        rangeHead.style("fontSize", 20);


                        sheetExport.row(1).height(80);
                        sheetExport.row(2).style("verticalAlignment", "center")
                        sheetExport.row(2).style("horizontalAlignment", "center")
                        sheetExport.row(2).height(60)

                        arr_cell.map((itemCelldraw, index) => { //vẽ head
                            sheetExport.column(itemCelldraw).width(15)
                            sheetExport.cell(itemCelldraw + 2).value(arrHeadTitle[ index ])
                            sheetExport.cell(itemCelldraw + 2).style("fill", 'FFFF99')
                            sheetExport.cell(itemCelldraw + 2).style('fontColor', '000000')
                            sheetExport.cell(itemCelldraw + 2).style('fontSize', 14)
                            sheetExport.cell(itemCelldraw + 2).style('wrapText', true)
                            sheetExport.cell(itemCelldraw + 2).style('border', true)
                        })

                        Query(data, 'fn_qln_hopdongvaylai_getall', (_rs_hopdong) => {
                            var sheetHopDong = workbook.addSheet('Danh sách hợp đồng vạy lại')
                            if (_rs_hopdong.length > 0) {
                                _rs_hopdong_format = []

                                _rs_hopdong.map((item_hopdong, index_rs_hd) => {
                                    var item_forat = { STT: index_rs_hd + 1, MA: item_hopdong.MA, TEN: item_hopdong.TEN }
                                    _rs_hopdong_format = [ ..._rs_hopdong_format, item_forat ]
                                })
                                _key_hopdong_format = Object.keys(_rs_hopdong_format[ 0 ])
                                _arr_head_hopdong = [
                                    'Stt',
                                    'Mã hợp đồng',
                                    'Tên hợp đồng'
                                ]
                                _arr_cell_hopdong = arrCharCode.slice(0, _key_hopdong_format.length)

                                const _rangeHeadHopDong = sheetHopDong.range("A1:" + _arr_cell_hopdong[ _arr_cell_hopdong.length - 1 ] + 1); // vẽ  title

                                _rangeHeadHopDong.merged(true)
                                _rangeHeadHopDong.value('Danh sách hợp đồng vay lại kết xuất ngày ' + (((new Date()).getUTCDay() + 7) + '/' + (new Date()).getMonth() + '/' + (new Date()).getFullYear()))
                                _rangeHeadHopDong.style("verticalAlignment", "center")
                                _rangeHeadHopDong.style("horizontalAlignment", "center")
                                _rangeHeadHopDong.style('fontColor', 'FFFFFF')
                                _rangeHeadHopDong.style("fill", '3366FF');
                                _rangeHeadHopDong.style("fontSize", 20);


                                sheetHopDong.row(1).height(80);
                                sheetHopDong.row(2).style("verticalAlignment", "center")
                                sheetHopDong.row(2).style("horizontalAlignment", "center")
                                sheetHopDong.row(2).height(60)


                                _arr_cell_hopdong.map((itemCelldrawHopDong, index) => { //vẽ head
                                    sheetHopDong.column(itemCelldrawHopDong).width(30)
                                    sheetHopDong.column('A').width(15)
                                    sheetHopDong.cell(itemCelldrawHopDong + 2).value(_arr_head_hopdong[ index ])
                                    sheetHopDong.cell(itemCelldrawHopDong + 2).style("fill", 'FFFF99')
                                    sheetHopDong.cell(itemCelldrawHopDong + 2).style('fontColor', '000000')
                                    sheetHopDong.cell(itemCelldrawHopDong + 2).style('fontSize', 14)
                                    sheetHopDong.cell(itemCelldrawHopDong + 2).style('wrapText', true)
                                    sheetHopDong.cell(itemCelldrawHopDong + 2).style('border', true)
                                })
                                _rs_hopdong_format.map((item_hopdong_rs, index_hopdong_rs) => {// vẽ body hdvl
                                    _arr_cell_hopdong.map((itemCellHopDong, index_cell_hopdong) => {
                                        sheetHopDong.cell(itemCellHopDong + (Number(index_hopdong_rs) + 3)).value(item_hopdong_rs[ _key_hopdong_format[ index_cell_hopdong ] ])

                                        sheetHopDong.cell(itemCellHopDong + (Number(index_hopdong_rs) + 3)).style("wrapText", true)
                                        sheetHopDong.cell(itemCellHopDong + (Number(index_hopdong_rs) + 3)).style('horizontalAlignment', 'center')

                                        sheetHopDong.cell(itemCellHopDong + (Number(index_hopdong_rs) + 3)).style("border", true)
                                    })
                                })


                                _rs_format.map((item_rs, index_rs) => { // vẽ body vkbnn
                                    arr_cell.map((itemCell, index_cell) => {

                                        if (keys_format[ index_cell ] === 'MAHOPDONG') {
                                            sheetExport.cell(itemCell + (Number(index_rs) + 3)).dataValidation({
                                                type: 'list',
                                                promptTitle: 'Hợp đồng vay lại',
                                                allowBlank: true,
                                                showInputMessage: true,
                                                prompt: true,
                                                showErrorMessage: true,
                                                formula1: "'Danh sách hợp đồng vạy lại'!$C$3:$C$" + (_rs_hopdong_format.length + 2)

                                            });
                                        }

                                        else {
                                            sheetExport.cell(itemCell + (Number(index_rs) + 3)).value(item_rs[ keys_format[ index_cell ] ])
                                        }


                                        if (regex.number.test(item_rs[ keys_format[ index_cell ] ]) & keys_format[ index_cell ].toUpperCase() !== 'STT' & keys_format[ index_cell ].toUpperCase() !== 'THOIHANVAY' & keys_format[ index_cell ].toUpperCase() !== 'LAIPHI') {
                                            sheetExport.cell(itemCell + (Number(index_rs) + 3)).style("numberFormat", "0,0")
                                            sheetExport.cell(itemCell + (Number(index_rs) + 3)).style("wrapText", true)
                                        }
                                        if (itemCell.toUpperCase() !== 'STT') {
                                            sheetExport.cell(itemCell + (Number(index_rs) + 3)).style('horizontalAlignment', 'center')
                                        }

                                        sheetExport.cell(itemCell + (Number(index_rs) + 3)).style("border", true)
                                    })
                                })

                                var filename = 'file_mẫu_nhập_dữ_liêu_vay_kho_bạc_nhà_nước' + (((new Date()).getUTCDay() + 7) + '-' + (new Date()).getMonth() + '-' + (new Date()).getFullYear() + '-') + ((new Date()).getTime()) + idlogin + '.xlsx'
                                var urlFile = 'storage/excell/tamplate/' + filename

                                let _pWriteFile = new Promise((resolve, reject) => {
                                    var buildFile = workbook.toFileAsync(urlFile, {});
                                    resolve(buildFile)

                                })
                                _pWriteFile.then((buildFile) => {
                                    callback({ CODE: 1, urlFile: urlFile, MESSAGE: 'Xuất thành công!' })
                                })

                                _pWriteFile.catch(err => {
                                    callback({ CODE: 0, urlFile: urlFile, MESSAGE: 'Xuất không thành công!' })
                                })//        
                            }

                        })
                    });

            })
        } catch (err) {
            callback({ CODE: 0, MESSAGE: 'Xuất không thành công!' }) 
            console.log(err); 
        }
    }
}



const Import = {
    vaykbnn: (data, callback) => {
        var id_user = data.idlogin
        var i_donviid = data.i_donviid
        try {
            delete data.i_sheetimport[ 'Danh sách vay kho bạc nhà nước' ][ '!merges' ]
            delete data.i_sheetimport[ 'Danh sách vay kho bạc nhà nước' ][ 'A1' ]
            var arr_data_vaykbnn = Xlsx.utils.sheet_to_json(data.i_sheetimport[ 'Danh sách vay kho bạc nhà nước' ])
            var arr_data_hopdong = Xlsx.utils.sheet_to_json(data.i_sheetimport[ 'Danh sách hợp đồng vạy lại' ])
            delete data.i_sheetimport[ 'Danh sách hợp đồng vạy lại' ][ '!merges' ]
            delete data.i_sheetimport[ 'Danh sách hợp đồng vạy lại' ][ 'A1' ]
            var arr_data_vaykbnn_format = []
            var arr_data_hopdongvaylai_format = []
            var keys_vaykbnn = Object.keys(arr_data_vaykbnn[ 0 ])
            var keys_hopdongvaylai = Object.keys(arr_data_hopdong[ 0 ])
        
            arr_data_hopdong.map((_item_hopdongvaylai, index_hdvl) => {
                arr_data_hopdongvaylai_format.push({ MAHOPDONG: _item_hopdongvaylai[ keys_hopdongvaylai[ 1 ] ], TENHOPDONG: _item_hopdongvaylai[ keys_hopdongvaylai[ 2 ] ] })
            }) 
            str_insert_head = 'insert into qln_vaykhobacnhanuoc ( NGAYVAY, THOIHANVAY, TRANOGOC, LAIPHI, STATUS,CREATEDBY, BUDAPBOICHI, TONGTIENDATRAGOC ,TONGTIENDATRALAI, DONVIID, MAHOPDONG) '
            str_insert_value = ''
            arr_data_vaykbnn.map((_item_vaykbnn, index_hdvl) => {
                var i_mahd = ''
                arr_data_hopdongvaylai_format.map((value_filter) => {
                    if (value_filter.TENHOPDONG === _item_vaykbnn[ keys_vaykbnn[ 1 ] ]) {
                        i_mahd = value_filter.MAHOPDONG
                    }
                })
                if (index_hdvl !== 0 & _item_vaykbnn[ keys_vaykbnn[ 2 ] ] != undefined) {
                    arr_data_vaykbnn_format.push({
                        NGAYVAY: _item_vaykbnn[ keys_vaykbnn[ 2 ] ],
                        THOIHANVAY: _item_vaykbnn[ keys_vaykbnn[ 3 ] ],
                        TRANOGOC: _item_vaykbnn[ keys_vaykbnn[ 4 ] ],
                        LAIPHI: _item_vaykbnn[ keys_vaykbnn[ 6 ] ],
                        STATUS: 1,
                        CREATEDBY: id_user,
                        BUDAPBOICHI: _item_vaykbnn[ keys_vaykbnn[ 5 ] ],
                        TONGTIENDATRAGOC: 0,
                        TONGTIENDATRALAI: 0,
                        DONVIID: i_donviid,
                        MAHOPDONG: i_mahd
                    })

                    str_insert_value = str_insert_value + (!str_insert_value ? '' : ' union') + " select  to_date('" + _item_vaykbnn[ keys_vaykbnn[ 2 ] ] + "' , 'dd/MM/yyyy') NGAYVAY ," +
                        _item_vaykbnn[ keys_vaykbnn[ 3 ] ] + " THOIHANVAY, " + _item_vaykbnn[ keys_vaykbnn[ 4 ] ].replace(/,/g, '') + " TRANOGOC, " + _item_vaykbnn[ keys_vaykbnn[ 6 ] ] + " LAIPHI , " + 1 + " STATUS, '" + id_user + "' CREATEDBY, " +
                        _item_vaykbnn[ keys_vaykbnn[ 5 ] ].replace(/,/g, '') + " BUDAPBOICHI," + 0 + " TONGTIENDATRAGOC, " + 0 + " TONGTIENDATRALAI, '" + i_donviid + "' DONVIID, '" + i_mahd + "' MAHOPDONG  from dual"
                }
            })  
            Knex.raw(str_insert_head + str_insert_value).then(_rs_select => {
                callback({ CODE: 1, MESSAGE: 'Nhận dữ liệu thành công' })
            })
                .catch(err => { 
                    console.log(err); 
                })


        } catch (err) { 
            console.log(err); 
        }

        callback(null)

    }
}


module.exports = ExcellController