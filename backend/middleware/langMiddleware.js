// langMiddleware.js
module.exports = (req, res, next) => {
  const lang = req.headers['accept-language'] || 'ku';
  req.language = lang.startsWith('ku') ? 'ku' : lang.startsWith('ar') ? 'ar' : 'en';
  next();
};
