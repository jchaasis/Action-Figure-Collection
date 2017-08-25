const express = require('express');
const mustache = require('mustache-express');
const bodyparser = require('body-parser');


const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const ActionFigure = require('./models/schema.js');

//establish server
const server = express();

// configure server

  //mustache-express
  server.engine('mustache', mustache());
  server.set('views', './views');
  server.set('view engine', 'mustache');

  //bodyparser
  server.use(bodyparser.urlencoded({ extended: false }));

  //connect to the database
  mongoose.connect('mongodb://localhost:27017/toysdb');


    // let actionfigures = db.collection('actionfigures');
  // });

  //get requests
  server.get('/index', function(req, res){
    ActionFigure.find().then(function (figures) {
          res.render('index', {
              actionfigure: figures,
          });
    });
    // actionfigures.find().then(function (actionfigures) {
    //     res.render('index', {
    //         actionfigure: actionfigures,
    //     });
    // });
    // res.render('index', {
    //                 actionfigure: actionfigures,
    // });
  });

    //add item page
  server.get('/add', function(req, res){
    res.render('add');
  });

  //delete item page
  server.get('/delete', function(req, res){
    res.render('delete');
  });

  //update item page
  server.get('/update-item', function(req, res){
    res.render('update-item');
  });

  //post requests
    //add a new item
  server.post('/add', function(req, res){
    ActionFigure.create({
      name: req.body.name,
      abilities: req.body.abilities,
      bio: req.body.bio,
    });

    //   let actionfigure = new ActionFigure({name: req.body.name});
    //   actionfigure.save()
    // .then(function () {
    //   // actions to take on success
    //   console.log('success');
    // })
    // .catch(function (err) {
    //   // handle error
    //   console.log(err);
    // });
});

  //delete an item
server.post('/delete', function(req, res){

  ActionFigure.deleteOne({
    name: req.body.deleteName})
    .then(function () {
      console.log('success');
    })
    .catch(function (err) {
      console.log(err);
    });

  res.redirect("/delete");
});

  //update an item
server.post('/update', function(req, res){
  // ActionFigure.updateOne({source: "Grandma"},
  //   {$push: {abilities: req.body.abilities}});

ActionFigure.updateOne({name: req.body.name},
    {$push: {abilities: req.body.abilities}});

});

//run the server
server.listen(5000, function (){
  console.log("Welcome to the Thunderdome!");
});
