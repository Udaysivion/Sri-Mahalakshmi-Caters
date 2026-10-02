/**
 * Express Application Setup
 * Domain-Driven Architecture Router Mounting & Middlewares
 */

const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const requestLogger = require('./middlewares/requestLogger');
const errorHandler = require('./middlewares/errorHandler');

// Domain Route Modules
const orderRoutes = require('./domains/orders/order.routes');
const diningRoutes = require('./domains/dining/dining.routes');
const cateringRoutes = require('./domains/catering/catering.routes');
const adminRoutes = require('./domains/admin/admin.routes');

const app = express();

// Middlewares
app.use(cors({
  origin: env.corsOrigin === '*' ? '*' : env.corsOrigin.split(','),
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(requestLogger);

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Sri Mahalakshmi Caters API',
    architecture: 'Domain-Driven Architecture (DDD)',
    environment: env.nodeEnv,
    database: 'Neon Cloud PostgreSQL'
  });
});

// Domain Routes Mounting
app.use('/api/orders', orderRoutes);
app.use('/api/dining', diningRoutes);
app.use('/api/catering', cateringRoutes);
app.use('/api/admin', adminRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found.`
  });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
