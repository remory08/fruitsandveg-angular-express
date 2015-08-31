var app = require('./../app');
var db = require('monk')('localhost/fruits');
var vegetables = db.get('fruits');
var assert = require('assert');
var request = require('supertest');


before(function(done) {
  fruits.remove({}, function() {
    fruits.insert({name: 'blueberry', recipes: ['cobbler', 'muffins', 'crumble']})
    done()
  })
})

describe('POST api/fruits', function() {
  it('inserts a new fruit to the database', function(done) {
    request(app)
      .post('/api/fruits')
      .expect(201)
      .end
  })
})

describe('GET api/fruits', function () {
  it('gets an index of the fruits resource', function(done) {
    request(app)
      .get('/api/fruits')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          done()
        }
      })
  });
});
