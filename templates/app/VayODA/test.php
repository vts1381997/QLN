 <?php
    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        print_r($_FILES);
    }
    ?>
 <!DOCTYPE html>
<html xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout" layout:decorator="layout/popup">

<head>
	<link rel="stylesheet" type="text/css" th:href="@{/public/template/zend/css/_all.css}">
	<script type="text/javascript" src="/qln/public/js/qln/app/HopDong/PhuLucHopDongVayLaiCTView.js"></script>
	<script type="text/javascript" src="/qln/public/js/qln/model/PhuLucHopDongVayLai.js"></script>
	<script type="text/javascript" src="/qln/public/js/qln/model/TinhThanh.js"></script>
	<script type="text/javascript" src="/qln/public/js/qln/model/DuAn.js"></script>
	<script type="text/javascript" src="/qln/public/js/qln/model/HopDongVayLai.js"></script>
	<script type="text/javascript">
		var oPhuLucHopDongVayLaiCTView = new PhuLucHopDongVayLaiCTView();
	</script>
</head>

<body>
	<div layout:fragment="content">
		<div class="row">
			<div class="row">
				<div class="col-sm-2"><label>Mã<span class="require">(*)</span></label></div>
				<div class="col-sm-4">
					<input type="text" style="text-align: center" class="form-control" name="name" id="MA" value="" />
				</div>
				<div class="col-sm-2"><label>Tên phụ lục</label></div>
				<div class="col-sm-4">
					<input type="text" style="text-align: center" class="form-control" name="name" id="TENPHULUC"
						value="" />
				</div>
			</div>
			<div class="row">
				<div class="col-sm-2"><label>Hợp đồng vay lại</label></div>
				<div class="col-sm-4">
					<select style="text-align: center" id="HOPDONGVAYLAIID" class="form-control" value="">
					</select>
				</div>
				<div class="col-sm-2"><label>Dự án</label></div>
				<div class="col-sm-4">
					<input type="text" style="text-align: center" disabled class="form-control" value="" id="TENDUAN"
						name="TENDUAN" autocomplete="off" />
				</div>
				<div class="col-sm-2"><label>Ngày ký</label></div>
				<div class="col-sm-4">
					<div class="input-group">
						<input type="text" style="text-align: center" class="form-control wec-control-date" value=""
							id="NGAYKY" name="NGAYKY" autocomplete="off" />
						<span class="input-group-btn">
							<button type="button" class="btn btn-default" onclick="$('#NGAYKY').focus()"><i
									class="glyphicon glyphicon-calendar"></i></button>
						</span>
					</div>
				</div>
				<div class="col-sm-2"><label>Người ký</label></div>
				<div class="col-sm-4">
					<input type="text" style="text-align: center" class="form-control" name="name" id="NGUOIKY"
						value="" />
				</div>
			</div>
			<div class="row">
				<div class="col-sm-2"><label>Tỉnh thành</label></div>
				<div class="col-sm-4">
					<select style="text-align: center" id="TINHTHANHID" class="form-control" value="">
					</select>
				</div>
				<div class="col-sm-2"><label>Ghi chú</label></div>
				<div class="col-sm-4">
					<input style="text-align: center" type="text" class="form-control" name="name" id="GHICHU"
						value="" />
				</div>
			</div>
		</div>
		<div class="row pull-right ACTIONS" style="padding:10px; margin-top:0px">
			<div class="row" style="margin-left: 590px">
				<div class="col-sm-2"></div>
				<div class="col-sm-4">
					<form action="xuly.php" method="POST" enctype="multipart/form-data">
						<div>
							<input type="file" name="fileUpload" id="fileUpload" />
							<input type="submit" name="submit"/>
						</div>
					</form>
				</div>
				<div class="col-sm-2"></div>
				<div class="col-sm-4">
					<button type="button" style="margin-left: 50px" class="btn btn-info" id="btnSave"><i
							class="glyphicon glyphicon-save"></i>
						Lưu</button>
				</div>
			</div>
		</div>
	</div>
</body>

</html>