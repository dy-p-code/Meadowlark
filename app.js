const express = require('express');
const expressHandlebars = require('express-handlebars');
const weatherMiddleware = require('./lib/middleware/weather.js');
const bodyParser = require('body-parser');

const handler = require('./lib/handler.js');
const fortune = require('./lib/fortune.js');

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

// JSON body
app.post('/api/newsletter-signup', handlers.api.newsletterSighup)

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
