var express = require("express");
var app = express(); 
var multer = require('multer');
var bodyParser = require('body-parser');
var uploadController = require('./controller/uploadController')
var storage = multer.diskStorage({
  destination: function (req, file, callback) { 
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({ storage: storage }).single('userPhoto');
const https = require('https');
const fs = require('fs');
const cors = require("cors");
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
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
// app.listen(port, () => console.log(`Example app listening on port ${port}!`)) //80
https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  passphrase: 'Admin123'
}, app)
.listen(3000); 

