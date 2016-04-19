'use strict';

var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.sendFile(process.cwd() + '/public/index.html');
});

app.get('/new/:url', function(req, res) {
    var url = req.params.url;
    res.send('create new entry for ', url);
});

app.get('/:url', function(req, res) {
    var url = req.params.url;
    res.send('redirect to database entry for', url);
});

app.listen(process.env.PORT || 8080);