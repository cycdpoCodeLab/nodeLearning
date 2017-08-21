/**
 * visit http://localhost:3000/?tomd5=xyz
 * xxx => md5(xyz) => d16fb36f0911f878998c136191af705e
 */

const
  express = require('express')
  , utility = require('utility')
;

let
  app = new express()
;

app.get('/', (req, res) => {
  let
    toMd5Value = req.query.tomd5 || ''
    , finalMd5 = utility.md5(toMd5Value)
  ;

  res.send(finalMd5);
});

app.listen('3000', () => {
  console.log('app is listening at port 3000');
});
