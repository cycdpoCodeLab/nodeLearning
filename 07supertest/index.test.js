const
  should = require('should')
  , supertest = require('supertest')
;

let
  app = require('./')
  , request = supertest(app)
;

describe('07supertest/index.test.js', () => {


  /**
   * single

   it('should return 55 when num ===10', (done) => {
    request
      .get('/fib')
      .query({
        num: 10
      })
      .end((err, res) => {
        res.text.should.equal('55');
        done(err);
      });
  });
   */


  let
    testFib = (num, statusCode, expect, done) => {
      request
        .get('/fib')
        .query({
          num: num
        })
        .expect(statusCode)
        .end((err, res) => {
          res.text.should.equal(expect);
          done(err);
        });
    };


  it('should return 0 when num === 0', (done) => {
    testFib(0, 200, '0', done);
  });

  it('should equal 1 when num === 1', (done) => {
    testFib(1, 200, '1', done);
  });

  it('should equal 55 when num === 10', (done) => {
    testFib(10, 200, '55', done);
  });

  it('should throw when num > 10', (done) => {
    testFib(11, 500, 'num should <= 10', done);
  });

  it('should throw when num < 0', (done) => {
    testFib(-1, 500, 'num should >= 0', done);
  });

  it('should throw when num isnt Number', (done) => {
    testFib('good', 500, 'num should be a number', done);
  });

  it('should status 500 when error', (done) => {
    request.get('/fib')
      .query({n: 100})
      .expect(500)
      .end((err, res) => {
        done(err);
      });
  });

});


