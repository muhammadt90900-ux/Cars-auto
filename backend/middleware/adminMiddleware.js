// adminMiddleware.js – same as authorize, can be specialized
const { authorize } = require('./authMiddleware');
exports.adminOnly = authorize('admin');
