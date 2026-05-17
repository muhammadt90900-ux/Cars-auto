// csrfProtection.js (using csurf)
const csrf = require('csurf');
module.exports = csrf({ cookie: true });
