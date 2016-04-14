var express = require('express');
var app = express();

app.use(express.static('./public/'));

var port = process.env.PORT || 8080;
app.listen(port, function(req, res) {
  console.log('Listening on: ' + port + '...');
});
