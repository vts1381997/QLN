const express = require('express');
//const bodyParser = require("body-parser");
const cors = require("cors");
app = express();
var formidable = require('formidable');
const port = 8094;
var bodyParser = require('body-parser');
var apiSendMail = require('./router/sendMail');
var apii = require('./router/api')
var xml = require('./router/xml')
var login = require('./router/login')
var userRouter = require('./router/userRouter')
var claim = require('./router/claimRouter')
var tree = require('./router/treeRouter')
var role = require('./router/roleRouter')
var search = require('./router/search')
var Upload = require('./upload')
var Server = require('./server')
var authorize = require('./middleware/authorize')
var DetailRouter = require('./router/DetailRouter')
var excellRouter = require('./router/excellRouter')
var schedule = require('node-schedule');
var scheduleSendMail = require('./controller/shedule/sendMailSchedule')
let multer = require("multer");
let path = require("path");
const https = require('https')
const fs = require('fs')

var j = schedule.scheduleJob({ rule: '0 8 * * *', start: new Date() }, function () {
  scheduleSendMail()
});
// var i = schedule.scheduleJob('* * * * *', function () {
//   scheduleSendMail()
// });

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(cors());
app.use('/api', authorize, apii);
// app.use('/upload',Upload);
app.use('/phanquyen/claim', authorize, claim);
app.use('/phanquyen/xml', authorize, xml);
app.use('/phanquyen/tree', authorize, tree);
app.use('/login', login);
app.use('/phanquyen/role', authorize, role);
app.use('/phanquyen/search', authorize, search);
app.use('/phanquyen/nguoidung', authorize, userRouter);
app.use('/phanquyen/detail', authorize, DetailRouter);
app.use('/sendmail', authorize, apiSendMail);
app.use('/excell', authorize, excellRouter)

app.use('/storage', express.static('storage'))

app.get('/verify', (rq, res) => {
  res.send("<h1> Xác thực ứng dụng thành công </h1> <button onclick='window.close()'>Đóng</button>")
})

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {

    cb(null, file.originalname)
  }
});
let upload = multer({ storage: storage }).single("file");
app.post('/upload', (req, res) => { 
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.filetoupload.path;
    var newpath = 'D:/1977/' + files.filetoupload.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.write('File uploaded and moved!');
      res.end();
    });
  });
})

// app.listen(port, () => console.log(`Example app listening on port ${port}!`)) //80
https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  passphrase: 'Admin123'
}, app)
  .listen(8094);


