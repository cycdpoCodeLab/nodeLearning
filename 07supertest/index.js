/**
 * visit http://localhost:3000/fib?num=10
 */

const
  express = require('express')
;

let
  fibonacci = (num) => {
    if (typeof num !== 'number') {
      throw new Error('num should be a number');
    }

    if (num > 10) {
      throw new Error('num should <= 10');
    }

    if (num < 0) {
      throw new Error('num should >= 0');
    }

    if (num === 0) {
      return 0;
    }

    if (num === 1) {
      return 1;
    }

    return fibonacci(num - 1) + fibonacci(num - 2);
  };


let
  app = express()
;

app.get('/fib', (req, res) => {
  let
    queryNum = req.query.num
    , nQueryNum = Number(queryNum)
    , num = Number.isNaN(nQueryNum)
    ? queryNum
    : nQueryNum
  ;

  try {
    res.send(String(fibonacci(num)));
  } catch (e) {
    res
      .status(500)
      .send(e.message);
  }

});

module.exports = app;

app.listen('3000', () => {
  console.log('app is listening at port 3000');
});
