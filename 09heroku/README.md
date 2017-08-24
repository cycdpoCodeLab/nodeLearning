# NodeJs App on Heroku

## Create [a Heroku account](https://www.heroku.com) and install it

## Clone or Initialize the Project

## create [Procfile](https://devcenter.heroku.com/articles/procfile) file
```text
web: node index.js
```

## Modify app listen for index.js
```javascript
app.listen(process.env.PORT || 5000);
```

## login heroku
```shell
$ heroku login
```

## Create heroku APP
```shell
$ heroku create
```

## Deploy the application to heroku
```shell
$ git init
$ heroku git:remote -a [my-app-name]
$ git add .
$ git commit -m 'first deploy'
$ git push heroku master
```
Push to heroku, heroku will automatically install dependent files, run the project build
