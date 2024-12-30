var express = require('express');
var app = express();
app.use(express.json());

const absolutePath = __dirname + '/public/index.html';
app.get('/', function (req, res) {
  res.sendFile(absolutePath);
});

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let parsedDate = new Date(dateParam);
  console.log(parsedDate)
  if (isNaN(parsedDate)) {
    parsedDate = new Date(Number(dateParam));
    console.log(parsedDate)
    if (isNaN(parsedDate)) {
      return res.json({ error: "Invalid Date" });
    }
  }
  res.json({
    "unix": Number(parsedDate.getTime()),
    "utc": parsedDate.toUTCString()
  });
});

app.get('/data', function (req, res, next) {
  req.unixTimestamp = new Date("2015-12-25T00:00:00").getTime();
  req.utcString = new Date("2015-12-25T00:00:00").toUTCString();
  next();
}, function (req, res) {
  res.json({ "unix": req.unixTimestamp, "utc": req.utcString });
});
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});