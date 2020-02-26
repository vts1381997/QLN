

$(document)
	.ready(
		function () {
			DashBoards = new DashBoard()
			var rs = DashBoards.getThongke() 
			$('#pTongKeHoachTrongNamNumber').html(rs[ 0 ].KEHOACHVAY)
			$('#pTongDuAnNumber').html(rs[ 0 ].TONGDUAN)
			$('#pTongDeAnTraiPhieuNumber').html(rs[ 0 ].TONGDEANPHATHANHTRAIPHIEU)
			$('#pTongKhacNumber').html(rs[ 0 ].TONGKHAC)

			// biểu đồ tròn
			var res_pie = DashBoards.getChartPie({})
			var tong_pie = 0
			res_pie.forEach(item => {
				tong_pie = Number(tong_pie) + Number(item.Y)
				item.name = item.NAME
				item.y = item.Y
			});
			// biểu đồ  cột
			var res_bar = DashBoards.getChartBar()

			
			var data_bieudo_nodauki = []
			var data_bieudo_vaytrongki = []
			var data_bieudo_nocuoiki = []
			var data_char_bar = []
			if (res_bar.length > 0) {
				res_bar[ 0 ].VAYODADUNOCUOIKY = Number(res_bar[ 0 ].VAYODADUNODAUKY) + Number(res_bar[ 0 ].TIENVAYODA)
				res_bar[ 0 ].VAYNGANQUYDUNOCUOIKY = Number(res_bar[ 0 ].VAYNGANQUYDUNODAUKY) + Number(res_bar[ 0 ].TIENVAYNGANQUY)
				res_bar[ 0 ].VAYTCTCDUNOCUOIKY = Number(res_bar[ 0 ].VAYTCTCDUNODAUKY) + Number(res_bar[ 0 ].TIENVAYTCTC)
				res_bar[ 0 ].VAYQUYDTDUNOCUOIKY = Number(res_bar[ 0 ].VAYQUYDTDUNODAUKY) + Number(res_bar[ 0 ].TIENVAYQUYDT)
				res_bar[ 0 ].VAYVDBDUNOCUOIKY = Number(res_bar[ 0 ].VAYVDBDUNODAUKY) + Number(res_bar[ 0 ].TIENVAYVDB)
				res_bar[ 0 ].VAYTPDUNOCUOIKY = Number(res_bar[ 0 ].VAYTPDUNODAUKY) + Number(res_bar[ 0 ].TIENVAYTP)
				var keys_bar = [ 'VAYODADUNODAUKY', 'TIENVAYODA', 'VAYODADUNOCUOIKY', 'VAYNGANQUYDUNODAUKY', 'TIENVAYNGANQUY', 'VAYNGANQUYDUNOCUOIKY', 'VAYVDBDUNODAUKY', 'TIENVAYVDB', 'VAYVDBDUNOCUOIKY', 'VAYTPDUNODAUKY', 'TIENVAYTP', 'VAYTPDUNOCUOIKY', 'VAYQUYDTDUNODAUKY', 'TIENVAYQUYDT', 'VAYQUYDTDUNOCUOIKY', 'VAYTCTCDUNODAUKY', 'TIENVAYTCTC', 'VAYTCTCDUNOCUOIKY' ]
				keys_bar.map(function (key, index) {
					key.includes('NODAUKY') ? data_bieudo_nodauki.push(res_bar[ 0 ][ key ]) : key.includes('NOCUOIKY') ? data_bieudo_nocuoiki.push(res_bar[ 0 ][ key ]) : data_bieudo_vaytrongki.push(res_bar[ 0 ][ key ])
				})

				data_char_bar = [
					{
						name: 'Nợ đầu kỳ',
						data: data_bieudo_nodauki,
						color: '#4995c1'

					}, {
						name: 'Vay trong kỳ',
						data: data_bieudo_vaytrongki,
						color: '#d1d5dd'

					}, {
						name: 'Dư nợ cuối kỳ',
						data: data_bieudo_nocuoiki,
						color: '#4CAF50'
					}
				]
			}



			Highcharts.setOptions({
				lang: {
					numericSymbols: [ " Nghìn đồng", " Triệu đồng", " Tỉ đồng", " Nghìn Tỉ đồng", "P", "E" ]
				}
			})
			$('#chart-pie').highcharts({
				chart: {
					type: 'pie',
					height: 400,
					options3d: {
						enabled: true,
						alpha: 65,
						beta: -5,
						depth: 100,
						viewDistance: 25
					}
				},
				title: {
					text: ''
				},
				tooltip: {
					formatter: function () {
						return '<b style="display:block; " >' + this.point.name + ' :' + numeral(Number(this.point.y).toFixed(2)).format('0,0') + '</b>' + '<b> ( ' + numeral((Number(this.point.y) / Number(tong_pie) * 100).toFixed(2)).format('0,0') + ' % )</b>'
					}
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						depth: 35,
						dataLabels: {
							enabled: false,
							formatter: function () {
								return ''
							}
						},
						showInLegend: true,
						allowPointSelect: true,
						slicedOffset: 10
					}
				},
				slicedOffset: 20,
				series: [ {
					type: 'pie',
					name: 'Browser share',
					data: res_pie,
					slicedOffset: 20,
				} ]
			});
			$("#chart-bar")
				.highcharts(
					{
						chart: {
							type: 'column',
							renderTo: 'container',
							height: 400,
							options3d: {
								enabled: true,
								alpha: 25,
								beta: 0,
								viewDistance: -25,
								depth: 120
							}
						},
						title: {
							text: '',
						},
						subtitle: {
							text: '',
						},
						xAxis: {
							categories: [
								'Vay ODA',
								'Vay Ngân quỹ',
								'Vay VDB',
								'Vay Trái phiếu',
								'Vay quỹ dự trữ',
								'Vay TCTCTD' ],
							crosshair: true
						},
						yAxis: {
							min: 0,
							title: {
								text: ''
							}
						},
						credits: {
							enabled: false
						},
						tooltip: {
							headerFormat: '',
							footerFormat: '',
							// formatter: function() {
							// 	return ''
							// },
							shared: true,
							useHTML: false
						},
						plotOptions: {
							column: {
								pointPadding: 0,
								borderWidth: 0
							}
						},
						series: data_char_bar
					});

			$('.highcharts-credits').hide()
		});