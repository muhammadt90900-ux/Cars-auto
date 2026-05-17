require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimiter = require('./middleware/rateLimiter');
const securityHeaders = require('./middleware/securityHeaders');
const errorHandler = require('./middleware/errorHandler');
const langMiddleware = require('./middleware/langMiddleware');

// Routes import
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const carRoutes = require('./routes/cars');
const partRoutes = require('./routes/parts');
const chatRoutes = require('./routes/chat');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');
const vinRoutes = require('./routes/vin');
const paymentRoutes = require('./routes/payment');
const shipmentRoutes = require('./routes/shipment');
const searchRoutes = require('./routes/search');
const favoritesRoutes = require('./routes/favorites');
const analyticsRoutes = require('./routes/analytics');

const app = express();

// Connect DB
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Middleware stack
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(securityHeaders);
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rateLimiter);
app.use(langMiddleware);

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/parts', partRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vin', vinRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/shipment', shipmentRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AutoKurd API is running', timestamp: new Date() });
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log('🚀 Server running on port ${PORT}'));

// Socket.io setup
const { initChat } = require('./sockets/chatSocket');
const { initNotifications } = require('./sockets/notificationSocket');
const io = require('socket.io')(server, { cors: { origin: '*' } });
initChat(io);
initNotifications(io);
app.set('io', io);

module.exports = server;
