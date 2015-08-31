require('dotenv').load();
var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var Fruits = db.get('fruits');

router.get('/', function(req, res) {
  Fruits.find({}, function(err, fruits) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(fruits);
  })
});

router.post('/', function(req, res) {
  Fruits.insert(req.body, function(err, fruit) {
    if (err) {
      res.send(err);
    }
    console.log(fruit)
    res.status(201).json(fruit);
  });
})

router.get('/:id', function(req, res) {
  Fruits.findOne({_id: req.params.id}, function(err, fruit) {
    if (err) {
      res.send(err)
    }
    res.status(200).json(fruit)
  })
})

router.put('/:id', function(req, res) {
  Fruits.findAndModify({_id: req.params.id}, req.body, function(err, fruit) {
    if (err) {
      throw err
    }
    res.json(req.body)
  })
})

router.delete('/:id', function (req, res) {
  Fruits.remove({_id: req.params.id}, function (err, fruit) {
    if (err) {
      console.log(err)
    }
    console.log('deleted');
    res.status(202).send({message: 'Good job'})
  })
})

module.exports = router
