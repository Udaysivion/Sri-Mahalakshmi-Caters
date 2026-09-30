import app from './app.js';
import { config } from './config/env.js';
import { pool, testDatabaseConnection } from './config/database.js';
import { initializeDatabase } from './infrastructure/database/initDb.js';

const startServer = async () => {
  try {
    console.log(`====================================================`);
    console.log(`🚀 Starting Sri Mahalakshmi Caterers Backend (DDD)`);
    console.log(`🌍 Environment: ${config.env}`);
    console.log(`⚙️  Target Port: ${config.port}`);
    console.log(`====================================================`);

    // 1. Verify PostgreSQL connection
    const isDbConnected = await testDatabaseConnection();
    if (isDbConnected) {
      // 2. Ensure tables & indexes exist
      try {
        await initializeDatabase();
      } catch (dbInitErr) {
        console.warn('⚠️ Notice during database schema verification:', dbInitErr.message);
      }
    } else {
      console.warn('⚠️ Starting HTTP server in degraded mode (Database connection failed). Please check your .env settings.');
    }

    // 3. Start Express server
    const server = app.listen(config.port, () => {
      console.log(`✨ Server running at: http://localhost:${config.port}`);
      console.log(`📋 API Health Check: http://localhost:${config.port}/api/health`);
      console.log(`🍛 Menu Endpoints:   http://localhost:${config.port}/api/menu`);
      console.log(`🛒 Order Endpoints:  http://localhost:${config.port}/api/orders`);
      console.log(`📅 Reservation API:  http://localhost:${config.port}/api/reservations`);
      console.log(`🎉 Catering API:     http://localhost:${config.port}/api/catering`);
    });

    // 4. Graceful shutdown handler
    const gracefulShutdown = async (signal) => {
      console.log(`\n🛑 Received ${signal}. Closing HTTP server & Database pool gracefully...`);
      server.close(async () => {
        console.log('HTTP server closed.');
        try {
          await pool.end();
          console.log('PostgreSQL connection pool closed.');
          process.exit(0);
        } catch (err) {
          console.error('Error during pool closure:', err.message);
          process.exit(1);
        }
      });

      // Force close if graceful shutdown takes too long
      setTimeout(() => {
        console.error('Forced shutdown after timeout.');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

  } catch (err) {
    console.error('Fatal server startup failure:', err);
    process.exit(1);
  }
};

startServer();
