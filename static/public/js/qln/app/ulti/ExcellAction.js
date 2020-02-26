const apiExcell = {
    apiExport: CONFIG_API.URL.USER_API + 'excell/export',
    apiExportTemplate: CONFIG_API.URL.USER_API + 'excell/exporttamplate',
    apiImport: CONFIG_API.URL.USER_API + 'excell/import',
}
var paramPostExport = {}
var paramPostExportTamplate = {}
var paramPostImportTamplate = {}

var ExcelToJSON = function () {
    var resultExcel = []

    this.parseExcel = function (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type: 'binary'
            });

            fn_import(workbook.Sheets)
        };

        reader.onerror = function (ex) {

        };

        reader.readAsBinaryString(file);

        return resultExcel
    };
};

$(document).ready(() => {
    $('#modalExport #btnConfirmExport').click(function (e) {
        e.preventDefault()
        paramPostExport.i_donviid = $('#modalExport #DONVIID').val()
        paramPostExport.i_fnc = CurrentLayout
        var _res = DATA.get(apiExcell.apiExport, paramPostExport)
        var linkDown = document.createElement('a')
        linkDown.href = CONFIG_API.URL.FILE + decodeURIComponent(_res.urlFile)
        linkDown.click()
        $('#modalExport').modal('hide')
        var oAlert = new AlertDialog('Thông báo');
        oAlert.show(_res.MESSAGE, '40%', '50px');
    })

    $('#btnExportTemplate').click(function (e) {
        e.preventDefault()
        paramPostExportTamplate.i_fnc = CurrentLayout
        var _res = DATA.get(apiExcell.apiExportTemplate, paramPostExportTamplate)
        var linkDown = document.createElement('a')
        linkDown.href = CONFIG_API.URL.FILE + decodeURIComponent(_res.urlFile)
        linkDown.click()

        $('#modalExport').modal('hide')
        var oAlert = new AlertDialog('Thông báo');
        oAlert.show(_res.MESSAGE, '40%', '50px');
    })

    $('#btnConfirmImport').click(function (e) {
        e.preventDefault()
        var oExcelToJSON = new ExcelToJSON()
        var inputfile = document.getElementById('FILEIMPORT')
        oExcelToJSON.parseExcel(inputfile.files[ 0 ])

    })
})

fn_import = (i_sheets) => {
    paramPostImportTamplate.i_fnc = CurrentLayout
    paramPostImportTamplate.i_sheetimport = i_sheets
    paramPostImportTamplate.i_donviid = $('#modalImport #DONVIID').val()
    var _res = DATA.get(apiExcell.apiImport, paramPostImportTamplate)
    window.location.reload()
}