/**
 * Application Entrypoint
 * Verifies Neon DB schema initialization and launches HTTP server
 */

const app = require('./app');
const env = require('./config/env');
const { initDatabase, pool } = require('./config/database');

const startServer = async () => {
  try {
    // 1. Verify / migrate database tables
    await initDatabase();

    // 2. Start HTTP server
    const server = app.listen(env.port, () => {
      console.log(`🚀 Sri Mahalakshmi Caters Backend Server running on http://localhost:${env.port}`);
      console.log(`📡 Connected to Neon PostgreSQL DB (${env.nodeEnv} mode)`);
    });

    // Graceful Shutdown
    const shutdown = async (signal) => {
      console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        try {
          await pool.end();
          console.log('✅ PostgreSQL connection pool closed cleanly.');
          process.exit(0);
        } catch (err) {
          console.error('❌ Error closing database pool:', err);
          process.exit(1);
        }
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (err) {
    console.error('❌ Fatal error during backend startup:', err);
    process.exit(1);
  }
};

startServer();
