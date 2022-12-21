const fortune = require('../lib/fortune');

exports.home = (req, res) => res.render('home');

exports.about = (req, res) =>
  res.render('about', { fortune: fortune.getFortune() });

exports.notFound = (req, res) => res.render('404');

exports.serverError = (err, req, res, next) => {
  // console.log(serverError);
  res.render('500');
};

exports.sectionTest = (req, res) => res.render('section-test');
