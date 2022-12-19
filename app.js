const express = require('express');
const expressHandlebars = require('express-handlebars');
// const handler = require('../handler.js');
const fortune = require('./lib/fortune.js');
const app = express();

// handlebar view engine setting
app.engine(
  'handlebars',
  expressHandlebars({
    defaultLayout: 'main',
  })
);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;

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

// const fortuneCookies = [
//   'Conquer your fears or they will conquer you.',
//   'Rivers need springs.',
//   "Do not fear what you don't know.",
//   'You will have a pleasant surprise.',
//   'Whenever possible, keep it simple.',
// ];

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
