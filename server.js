'use strict';

var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var dburl = 'mongodb://cj:loser@ds011241.mlab.com:11241/links'

app.get('/new/:url', function(req, res) {
    var url = req.params.url;

//   if (!/\./.test(url)) return res.end(JSON.stringify({ error: "check your URL format" }))
    
    mongo.connect(dburl, function(err, db) {
        if (err) return console.log(err);
        var links = db.collection('links');
        var maxShortened;
        
        maxShortened = links.find().sort({ shortened: -1 })
        console.log(maxShortened);
        db.close()
        
//        var maxshortened = db.links.find().sort({shortened: -1}).limit(1).shortened || 0;
/*            
        var result = {
            original: url,
            shortened: 'id'
        };

        links.insert(result, function(err) {
            if (err) return res.sent(err);
            db.close();
        });
 */       
    });
    
    res.end(url);
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