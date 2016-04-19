'use strict';

var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.sendFile(process.cwd() + '/public/index.html');
});

app.get('/new/:url', function(req, res) {
    var url = req.params.url;
    var result = 'create new entry for ' + url;
    res.end(result);
});

app.get('/:url', function(req, res) {
    var url = req.params.url;
    var result = 'redirect to entry for ' + url;
    res.end(result);
});

var port = process.env.PORT || 8080;
app.listen(port);
console.log('server listening on port', port, '...')