'use strict';

var express = require('express');
var app = express();
var Config = require('./config');
var mongo = require('mongodb').MongoClient;
var dburl = 'mongodb://' + Config.dblogin + ':' + Config.dbpassword + '@ds011241.mlab.com:11241/links'

app.get('/new/:url', function(req, res) {
    var result = { original: req.params.url }
    if (!/\./.test(result.original)) return res.end(JSON.stringify({ error: "check your URL format" }))
    
    mongo.connect(dburl, function(err, db) {
        if (err) return console.log(err);
        
        var links = db.collection('links');
        links.find().sort({ shortened: -1}).toArray(function(err, docs) {
            if (err) return console.error(err);

            result.shortened = docs[0].shortened + 1;
            links.insert(result, function(err) {
                if (err) return console.error(err);
            });
            
            res.send(result);
            db.close();
        });
    });
});

app.get('/:id', function(req, res) {

    mongo.connect(dburl, function(err, db) {
        if (err) return console.error(err);
        var links = db.collection('links');
        var query = {};
        query['shortened'] = +req.params.id;

        links.find(query).toArray(function(err, doc) {
            if (err) return console.error(err);
            if (doc.length === 0) {
                res.send('Invalid shortened url. If you meant to create a new one, add <code>/new/URL</code> (where URL is your target) to the end of the address.')
                db.close();
            } else {
                res.redirect('http://'+ doc[0].original);
                res.end();
                db.close();
            }
        })
    })
});

app.get('/', function(req, res) {
	res.sendFile(process.cwd() + '/public/index.html');
});

var port = process.env.PORT || 8080;
app.listen(port);
console.log('server listening on port', port, '...')