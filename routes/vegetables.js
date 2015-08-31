require('dotenv').load();
var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var Vegetables = db.get('vegetables');

router.get('/', function(req, res) {
  Vegetables.find({}, function(err, vegetables) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(vegetables);
  })
});

router.post('/', function(req, res) {
  Vegetables.insert(req.body, function(err, vegetable) {
    if (err) {
      res.send(err);
    }
    res.status(201).json(vegetable);
  });
})

router.get('/:id', function(req, res) {
  Vegetables.findOne({_id: req.params.id}, function(err, vegetable) {
    if (err) {
      res.send(err)
    }
    res.status(200).json(vegetable)
  })
})

router.put('/:id', function(req, res) {
  Vegetables.findAndModify({_id: req.params.id}, req.body, function(err, vegetable) {
    if (err) {
      throw err
    }
    console.log(vegetable)
    console.log(req.body);
    res.status(200).json(req.body)
  })
})

router.delete('/:id', function (req, res) {
  Vegetables.remove({_id: req.params.id}, function (err, vegetable) {
    if (err) {
      console.log(err)
    }
    res.status(200).send({message: 'deleted!'})
  })
})

module.exports = router
