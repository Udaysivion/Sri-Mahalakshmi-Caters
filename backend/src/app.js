import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env.js';
import { requestLogger } from './shared/middlewares/requestLogger.js';
import { errorHandler } from './shared/middlewares/errorHandler.js';
import { ApiResponse } from './shared/utils/apiResponse.js';

// Module Routes
import menuRoutes from './modules/menu/presentation/menuRoutes.js';
import orderRoutes from './modules/order/presentation/orderRoutes.js';
import reservationRoutes from './modules/reservation/presentation/reservationRoutes.js';
import cateringRoutes from './modules/catering/presentation/cateringRoutes.js';
import adminRoutes from './modules/admin/presentation/adminRoutes.js';
import galleryRoutes from './modules/gallery/presentation/galleryRoutes.js';

const app = express();

// Security & Parsing Middlewares
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      if (config.cors.allowedOrigins.indexOf(origin) !== -1 || !config.isProduction) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy blocked access from origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Health check endpoint
app.get('/api/health', (req, res) => {
  return ApiResponse.success(res, {
    status: 'UP',
    timestamp: new Date().toISOString(),
    environment: config.env,
    service: 'Sri Mahalakshmi Caterers API',
  });
});

// Domain Routes
app.use('/api/admin', adminRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/catering', cateringRoutes);

// 404 Route Catch-all
app.use((req, res) => {
  return ApiResponse.error(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
});

// Global Centralized Error Handler
app.use(errorHandler);

export default app;
