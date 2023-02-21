module.exports = (req, res, next) => {
  // 플래시 메시지가 있을 때 콘텍스트에 전달하고 내용 비움
  res.locals.flash = req.session.flash
  delete req.session.flash
  next()
}