'use strict';

var express = require('express');
var app = express();

app.get('/new/:url', function(req, res) {
    var url = req.params.url;
    if (!/\./.test(url)) return res.end(JSON.stringify({ error: "check your URL format" }))
    
    var result = {
        original: url,
        shortened: 'id'
    }
    
    res.end(JSON.stringify(result));
});

app.get('/:id', function(req, res) {
    var id = req.params.id;
    
    // if (id not in db) return res.end(JSON.stringify({ error: 'invalid shortened URL id' })
    var url = 'google.com'
    res.redirect('http://' + url)
});

app.get('/', function(req, res) {
	res.sendFile(process.cwd() + '/public/index.html');
});

var port = process.env.PORT || 8080;
app.listen(port);
console.log('server listening on port', port, '...')