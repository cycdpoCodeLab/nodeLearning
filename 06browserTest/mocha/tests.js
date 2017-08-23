let should = chai.should();

describe('05nodeTest/fibonacci.test.js', () => {
  it('should equal 0 when num === 0', () => {
    fibonacci(0).should.equal(0);
  });

  it('should equal 1 when num === 1', () => {
    fibonacci(1).should.equal(1);
  });

  it('should equal 55 when num === 10', () => {
    fibonacci(10).should.equal(55);
  });

  it('should throw when num > 10', () => {
    (() => {
      fibonacci(11);
    }).should.throw('num should <= 10');
  });

  it('should throw when num < 0', () => {
    (() => {
      fibonacci(-1);
    }).should.throw('num should >= 0');
  });

  it('should throw when num is not Number', () => {
    (() => {
      fibonacci('中文');
    }).should.throw('num should be a number');
  });
});