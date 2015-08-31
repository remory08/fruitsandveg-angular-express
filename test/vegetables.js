var app = require('./../app');
var db = require('monk')('localhost/vegetables');
var vegetables = db.get('vegetables');
var assert = require('assert');
var request = require('supertest');

before(function(done) {
  vegetables.remove({}, function() {
    vegetables.insert({title: 'cucumber', _id: '55c050595ae876b6b79ad318'}, function() {
      done()
    });
  });
});

describe('GET api/vegetables', function () {
  it('gets an index of the vegetables resource', function (done) {
    request(app)
      .get('/api/vegetables')
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

describe('POST api/vegetables', function () {
  it('creates a new resource', function (done) {
    request(app)
      .post('/api/vegetables')
      .send({title: 'from test'})
      .expect(201)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          done()
        }
      })
  });
});

describe('PUT api/vegetables/:id', function () {
  it('updates a resource', function (done) {
    request(app)
      .put('/api/vegetables/55c050595ae876b6b79ad318')
      .send({title: 'from test'})
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.body.title, 'from test')
          done()
        }
      })
  });
});

describe('GET api/vegetables/:id', function () {
  it('gets a resource', function (done) {
    request(app)
      .get('/api/vegetables/55c050595ae876b6b79ad318')
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


describe('DELETE api/vegetables/:id', function () {
  it('deletes a resource', function (done) {
    request(app)
      .delete('/api/vegetables/55c050595ae876b6b79ad318')
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
