const
  express = require('express')
  , session = require('express-session')
;

let
  app = express()
;

app.listen(5000, () => {
  console.log('app is listening at port 5000');
});


app.use(session({
  secret: '1234567890',        // recommand 128 bytes random string
  cookie: {
    maxAge: 60 * 1e3,
  },
}));

app.get('/', (req, res) => {
  console.log(req);
  if (req.session.isVisited) {
    req.session.isVisited += 1;
    res.send(req.session.isVisited + ' visit');
  } else {
    req.session.isVisited = 1;
    res.send('first visit');
    console.log(req.session);
  }
});
