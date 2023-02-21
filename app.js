const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const multiparty = require('multiparty')
const expressSession = require('express-session')

const handler = require('./lib/handler.js');
const fortune = require('./lib/fortune.js');
const weatherMiddleware = require('./lib/middleware/weather.js');
const credentials = require('./.credentials.development.json');
const flashMiddleware = require('./lib/middleware/flash')

const app = express();

// handlebar view engine setting
app.engine(
  'handlebars',
  expressHandlebars({
    defaultLayout: 'main',
    helper: {
      section: function (name, options) {
        if (!this._section) this._section = {};
        this._section[name] = options.fn(this);
        return null;
      },
    },
  })
);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(weatherMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(handler.notFound);
app.use(handler.serverError);
app.use(flashMiddleware)

const port = process.env.PORT || 3000;

app.get('/', handler.home);
app.get('/about', handler.about);
app.get('/section-test', handler.sectionTest);
app.get('/newsletter-signup', handlers.newsletterSignup);
app.get('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)
app.get('/newsletter', handlers.newsletter)


// main page
app.get('/', (req, res) => {
  res.status(200);
  res.render('home');
});

// about page
app.get('/about', (req, res) => {
  //  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', { fortune: fortune.getFortune() });
});

// custom 404 page
app.use((req, res) => {
  res.status(404);
  res.render('404-Not Found');
});

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render('500-Server Error');
});

// express-session 연결
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: credentials.cookieSecret
}))

// JSON body
app.post('/api/newsletter-signup', handlers.api.newsletterSighup)

// photo upload
app.post('/contest/vacation-photo/:year/:month', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).send({ error: err.message })
    handlers.vacationPhotoContestProcess(req, res, fields, files)
  })
})

// app.listen(port, () =>
//   console.log(`Express Started on http://localhost:${port}`)
// );

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Express Started on http://localhost:${port}`);
  });
} else {
  module.exports = app;
}
