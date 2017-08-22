/**
 * visit http://localhost:3000
 * show CNode(https://cnodejs.org/) info
 */

const
  express = require('express')
  , url = require('url')
  , async = require('async')
  , superagent = require('superagent')
  , cheerio = require('cheerio')
;

let
  app = express()
  , concurrencyCount = 0
;


let fetchUrl = (url, callback) => {
  concurrencyCount++;

  console.log('concurrencyCount: ' + concurrencyCount, ', url: ' + url);

  superagent
    .get(url)
    .end((err, res) => {
      concurrencyCount--;
      callback(err, res);
    });
};


app.get('/', (req, res, next) => {

  let
    cnodeUrl = 'https://cnodejs.org'
  ;

  fetchUrl(cnodeUrl, (err, f_res) => {
    if (err) {
      return next(err);
    }

    let
      $ = cheerio.load(f_res.text)
      , aItems = []
    ;

    $('#topic_list .topic_title').each((index, el) => {
      let
        $el = $(el)
        , title = $el.attr('title')
        , href = url.resolve(cnodeUrl, $el.attr('href'))
      ;

      aItems.push({
        title: title,
        href: href,
      });
    });


    setTimeout(() => {
      async.mapLimit(aItems, 5, (item, aCallback) => {

          fetchUrl(item.href, (err, res) => {

            let
              $inner = cheerio.load(res.text)
            ;

            item.auther = $inner('#sidebar .user_name>a').text();

            aCallback(err, {
              title: item.title,
              author: item.auther,
              href: item.href,
            });
          });

        }, (err, result) => {
          console.log('final:');
          console.log(result);

          res.send(result);
        }
      );
    }, 0);

  });
});


app.listen('3000', () => {
  console.log('app is listening at port 3000');
});
