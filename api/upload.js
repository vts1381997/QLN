var express = require("express");
var app = express();
var fs = require('fs');
const cors = require("cors");
var multer = require('multer')
var bodyParser = require('body-parser')
var uploadController = require('./controller/uploadController')
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // if(req.body.tablename=='VAYHANGNAM'){
    //   callback(null, './uploads/vayhangnam');
    // }
    // if(req.body.tablename=='HOPDONGVAYLAI'){
    //   callback(null, './uploads/hopdongvaylai');
    // }
    // else{
    callback(null, './uploads');
    // }
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  }
});

var upload = multer({ storage: storage }).single('userPhoto');


app.use('/uploads', express.static('uploads'))
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json({ type: 'application/json' }))



app.post('/upload', upload, function (req, res, next) {
  var size = 0
  var URL = ''
  var IDROWTABLE = ''
  var TBLNAME = ''
  var FILENAME = ''
  var ROWID = ''
  if (req.file) {
    size = req.file.size
    URL = req.file.path
    IDROWTABLE = req.body.idrowtable
    TBLNAME = req.body.tablename
    FILENAME = req.file.filename
    if (req.body.rowid) {
      ROWID = req.body.rowid
  
    }

  }
  
  let dt = {
    URL, IDROWTABLE, TBLNAME, FILENAME, ROWID
  }
  console.log(size,'size');
  if (size > 5242880) {
    fs.unlink(URL, function (err) {
      if (err) throw err;
      res.send({ success: false, data: req.body.rowid, message: 'File tải lên quá lớn' })
    });
  } else {
    if (req.body.rowid) {
      if (req.file) {
        uploadController.uploadData(dt, data => {
          if (data.success) {
            fs.unlink(req.body.url, function (err) {
              if (err) throw err;
              res.send({ success: true, message: 'ok' })
            });

          } else {
            res.send({ success: false, message: "tải file bị lỗi" })
          }
        })
      }
      else {
        res.send({ success: true, message: 'Success' })
      }

    } else {
      if (req.file) {
        uploadController.uploadData(dt, data => {
          res.send(data)
        })
      } else {
        res.send({ success: true, message: 'Success' })
      }
    }


  }
})

// app.listen(3000, function () {
//   console.log("Working on port 3000");
// });