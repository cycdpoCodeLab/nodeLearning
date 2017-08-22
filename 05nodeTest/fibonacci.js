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


if (require.main === module) {
  let
    num = Number(process.argv[2])
  ;
  console.log('fibonacci(' + num + ') is', fibonacci(num));
}

module.exports = fibonacci;

