const
  Benchmark = require('benchmark')
;

let
  suite = new Benchmark.Suite
  , testNum = '100'
;

let
  int1 = (n) => +n
  , int2 = (n) => parseInt(n, 10)
  , int3 = (n) => Number(n)
;


suite
  .add('+', () => int1(testNum))
  .add('parseInt', () => int2(testNum))
  .add('Number', () => int3(testNum))
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({
    'async': true,
  });
