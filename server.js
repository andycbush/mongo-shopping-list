var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
};

//require the models object
var Item = require('./models/item');

//GET route, displays a list of all the items in DB
app.get('/items', function(req, res) {
    Item.find(function(err, items) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(items);
    });
});

//POST route, creates the new item in the DB
app.post('/items', function(req, res) {
    Item.create({
        name: req.body.name
    }, function(err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});

//PUT route, updates the item by id from the DB
app.put('/items/:id', function(req,res) {
    var id = {_id:req.body._id};
    var update = {name:req.body.name};
   Item.findOneAndUpdate(id,update, function(err,items) {
         if (err) {
             return res.status(500).json({
                 message: 'Internal Server Error'
             });
         }
         res.status(201).json(items);
   });
});

//DELETE route, removes the item by name from the DB
app.delete('/items/:id', function(req,res) {
   Item.remove({
       _id: req.params.id
   }, function(err,item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
   });
});



app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;