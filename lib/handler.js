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

exports.newsletterSignup = (req, res) => {
  // CSRF는 나중에 확인, 더미 값만 넣어두기
  res.render('newsletter-signup', { csrf: 'CSRF token goes here' })
}

exports.newsletterSignupProcess = (req, res) => {
  res.redirect(303, '/newsletter-sighup/thank-you')
}

exports.newsletterSignupThankYou = (req, res) =>
  res.render('newsletter-signup-thank-you')