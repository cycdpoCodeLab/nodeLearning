const
  express = require('express')
  , cookieParser = require('cookie-parser')
;

let
  app = express()
;

app.listen(3000, () => {
  console.log('app is listening at port 3000');
});

app.use(cookieParser());

app.get('/', (req, res) => {
  if (req.cookies.isVisited) {
    console.log(req.cookies);
    res.send('Not first visit');
  } else {
    res.cookie('isVisited', 1, {
      maxAge: 60 * 1e3,
    });
    res.send('First visit!');
  }
});

