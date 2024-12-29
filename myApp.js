var express = require('express');
var app = express();

absolutePath=__dirname+'/public/index.html';
app.get('/',function(req,res){
    res.sendFile(absolutePath);
});

app.get('/data', function(req, res, next) {
    req.unixTimestamp = new Date().getTime();
    req.utcString = new Date().toUTCString();
    next();
  }, function(req, res) {
    res.json({"unix":req.unixTimestamp, "utc":req.utcString});
  });


var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});