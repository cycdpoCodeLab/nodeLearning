/**
 * visit http://localhost:3000
 * show CNode(https://cnodejs.org/) info
 */

const
  express = require('express')
  , url = require('url')
  , eventproxy = require('eventproxy')
  , superagent = require('superagent')
  , cheerio = require('cheerio')
;

let
  app = express()
;

app.get('/', (req, res, next) => {

  let
    cnodeUrl = 'https://cnodejs.org'
  ;

  superagent
    .get(cnodeUrl)
    .end((err, s_res) => {
      if (err) {
        return next(err);
      }

      let
        $ = cheerio.load(s_res.text)
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

      let
        ep = new eventproxy()
      ;

      ep.after('inner_html', aItems.length, (inner) => {

        inner.map(pair => {
          let
            item = pair.item
            , $inner = cheerio.load(pair.html)
          ;

          item.auther = $inner('#sidebar .user_name>a').text();
        });

        res.send(aItems);
      });

      aItems.forEach(item => {
        superagent.get(item.href)
          .end((err, res) => {
            ep.emit('inner_html', {
              item: item,
              html: res.text,
            });
          });
      });


    });

});

app.listen('3000', () => {
  console.log('app is listening at port 3000');
});
