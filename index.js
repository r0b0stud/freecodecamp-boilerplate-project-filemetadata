var express = require('express');
var cors = require('cors');
const multer  = require('multer');
var receivedFolder = multer({dest: "receivedFiles/"});
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", receivedFolder.single("upfile"), async function(req, res){
  var jsonRet = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };
  res.json(jsonRet);
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
