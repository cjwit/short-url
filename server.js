'use strict';

var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var dburl = 'mongodb://cj:loser@ds011241.mlab.com:11241/links'

app.get('/new/:url', function(req, res) {
    var result = { original: req.params.url }
        

   if (!/\./.test(result.original)) return res.end(JSON.stringify({ error: "check your URL format" }))
    
    mongo.connect(dburl, function(err, db) {
        if (err) return console.log(err);
        
        var links = db.collection('links');
        links.find().sort({ shortened: -1}).toArray(function(err, docs) {
            if (err) return console.error(err);
            var maxShortened = docs[0].shortened;
            result.shortened = maxShortened + 1;
            
            links.insert(result, function(err) {
                if (err) return console.error(err);
            });
            
            res.send(result);
            db.close();
        });
    });
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