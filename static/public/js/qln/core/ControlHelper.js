var ControlHelper = {
    Datatable: {
        Init: function (pId, pPageLength, pQuichSearch, pOrder) {
            var _pagelength = 5;
            var _quichSearch = false;   
            var _order = false;
            if (typeof pPageLength !== 'undefined') { _pagelength = pPageLength; }
            if (typeof pQuichSearch !== 'undefined') { _quichSearch = pQuichSearch; }
            if (typeof pOrder !== 'undefined') { _order = pOrder; }
            var _table = $('#' + pId).DataTable({
                "pageLength": _pagelength,
                "paging": true,
                "autoWidth": false,
                "destroy": true,
                "searching": _quichSearch,
                "ordering": _order,
                "language": {

                    "decimal": "",
                    "emptyTable": "Danh sách trống",
                    "info": "Hiển thị _START_ đến _END_ trong _TOTAL_ kết quả",
                    "infoEmpty": "Hiển thị 0 đến 0 trong 0 kết quả",
                    "infoFiltered": "(lọc từ _MAX_ kết quả)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "Hiển thị _MENU_ kết quả",
                    "loadingRecords": "Loading...",
                    "processing": "Processing...",
                    "search": "Tìm kiếm nhanh: ",
                    "zeroRecords": "Không tìm thấy kết quả",
                    "paginate": {
                        "first": "Đầu ",
                        "last": "Cuối",
                        "next": "Sau",
                        "previous": "Trước"
                    },
                    "aria": {
                        "sortAscending": ": activate to sort column ascending",
                        "sortDescending": ": activate to sort column descending"
                    }
                }
            });

            return _table;

        },

        BindFilterSearch: function (pTable) {
            $("#" + pTable.table().node().id + ' thead tr').clone(true).appendTo("#" + pTable.table().node().id + ' thead');
            $("#" + pTable.table().node().id + ' thead tr:eq(1) th').each(function (i) {
                var title = $(this).text();
                $(this).html('<input type="text" style="width: 100%" />');

                $('input', this).on('keyup change', function () {
                    if (pTable.column(i).search() !== this.value) {
                        pTable
                            .column(i)
                            .search(this.value)
                            .draw();
                    }
                });
            });

        },

        BindFilterSelect: function (pTable) {
            $("#" + pTable.table().node().id + ' thead tr').clone(true).appendTo("#" + pTable.table().node().id + ' thead');
            $("#" + pTable.table().node().id + ' thead tr:eq(1) th').each(function (i) {
                if ($(this).text() !== '') {
                    var isStatusColumn = (($(this).text() == 'Status') ? true : false);
                    var select = $('<select><option value=""></option></select>')
                        .appendTo($(this).empty())
                        .on('change', function () {
                            var val = $(this).val();

                            pTable.column(i)
                                .search(val ? '^' + $(this).val() + '$' : val, true, false)
                                .draw();
                        });

                    // Get the Status values a specific way since the status is a anchor/image
                    if (isStatusColumn) {
                        var statusItems = [];

                        /* ### IS THERE A BETTER/SIMPLER WAY TO GET A UNIQUE ARRAY OF <TD> data-filter ATTRIBUTES? ### */
                        pTable.column(i).nodes().to$().each(function (d, j) {
                            var thisStatus = $(j).attr("data-filter");
                            if ($.inArray(thisStatus, statusItems) === -1) statusItems.push(thisStatus);
                        });

                        statusItems.sort();

                        $.each(statusItems, function (i, item) {
                            select.append('<option value="' + item + '">' + item + '</option>');
                        });

                    }
                    // All other non-Status columns (like the example)
                    else {
                        pTable.column(i).data().unique().sort().each(function (d, j) {
                            select.append('<option value="' + d + '">' + d + '</option>');
                        });
                    }

                }
            });

        }

    },

    Select2: {
        Init: function (pId) {
            var _controlID = '#' + pId;
            var _dataSource = $(_controlID).data('source');
            var _dataKey = $(_controlID).data('key');
            var _dataValue = $(_controlID).data('value');
            var _dataLimit = $(_controlID).data('limit');
            var _dataMaxSelect = $(_controlID).data('maxselect');
            var _localStorageKey = _dataSource;
            var _data = [];

            if (!(_localStorageKey in localStorage) || localStorage.getItem(_localStorageKey) == 'undefined') {

                var _pars = {
                    TableName: _dataSource,
                    Key: _dataKey,
                    Value: _dataValue,
                    Limit: _dataLimit
                };
                var _rs = COD.GetTableNoAsync('sp_sys_combobox_datasource', _pars);
                localStorage.setItem(_localStorageKey, JSON.stringify(_rs.RESULT));
                _data = _rs.RESULT;


            } else {
                _data = JSON.parse(localStorage.getItem(_localStorageKey));
            }


            $(_controlID).select2({
                data: _data, maximumSelectionLength: _dataMaxSelect,
                templateResult: function (data) {
                    var $result = $(
                        '<div class="row">' +
                        //'<div class="col-md-4">' + data.id + '</div>' +
                        '<div class="col-md-12">' + data.text + '</div>' +
                        '</div>'
                    );
                    return $result;
                },
                allowClear: true,
                placeholder: {
                    id: '',
                    text: '- Lựa chọn -',
                    selected: 'selected'
                }
            });

            $(_controlID).val('val', '');
            $(_controlID).trigger('change');

        },

        loadData: function (pControl, pProcSource, pParams) {
            var _controlID = '#' + pControl;
            var _dataSource = $(_controlID).data('source');
            var _dataKey = $(_controlID).data('key');
            var _dataValue = $(_controlID).data('value');
            var _dataLimit = $(_controlID).data('limit');
            var _dataMaxSelect = $(_controlID).data('maxselect');
            var _localStorageKey = _dataSource;
            var _data = [];
            var _rs = COD.GetTableNoAsync(pProcSource, pParams);
            var _data = _rs.RESULT;
            $(_controlID).select2({
                data: { results: _data, text: 'Name', id: 'Code' },
                templateResult: function (_data) {
                    var $result = $(
                        '<div class="row">' +
                        //'<div class="col-md-4">' + data.id + '</div>' +
                        '<div class="col-md-12">' + _data.text + '</div>' +
                        '</div>'
                    );
                    return $result;
                },
                allowClear: true,
                placeholder: {
                    id: '',
                    text: '- Lựa chọn -',
                    selected: 'selected'
                }
            });

            $(_controlID).val('val', '');
            $(_controlID).trigger('change');
        }


    },

    Input: {
        enable: function (_ena) {
            for (var i = 0; i < _ena.length; i++) {
                $(_ena[ i ]).attr('disabled', false);
            }
        },
        disable: function (_dis) {
            for (var i = 0; i < _dis.length; i++) {
                $(_dis[ i ]).attr('disabled', true);
            }
        },
        hide: function (_dis) {
            for (var i = 0; i < _dis.length; i++) {
                $(_dis[ i ]).attr('style', 'display:none');
            }
        },
        show: function (_dis) {
            for (var i = 0; i < _dis.length; i++) {
                $(_dis[ i ]).attr('style', '');
            }
        }
    },
}
