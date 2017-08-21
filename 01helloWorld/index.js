/**
 * visit http://localhost:3000/
 */

const express = require('express');

let
  app = new express()
;

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(3000, () => {
  console.log('app is listening at port 3000')
});
