/**
 * Database Infrastructure Layer
 * PostgreSQL Connection Pool for Neon DB with SSL and Schema Initialization.
 */

const { Pool } = require('pg');
const env = require('./env');

const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});

pool.on('error', (err) => {
  console.error('❌ Unexpected idle client error on PostgreSQL pool:', err.message);
});

/**
 * Initializes and verifies required production tables on startup.
 */
const initDatabase = async () => {
  const client = await pool.connect();
  try {
    console.log('🔄 Initializing PostgreSQL database tables on Neon...');

    // 1. Food Orders Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_id VARCHAR(50) UNIQUE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        address TEXT,
        items TEXT NOT NULL,
        total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
        payment_method VARCHAR(50) DEFAULT 'COD',
        payment_status VARCHAR(50) DEFAULT 'Pending',
        payment_id VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      ALTER TABLE orders ALTER COLUMN items TYPE TEXT;
      CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_orders_order_id ON orders(order_id);
    `);

    // 2. Dining Reservations Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS dining_reservations (
        id SERIAL PRIMARY KEY,
        booking_id VARCHAR(50) UNIQUE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        guests VARCHAR(50) NOT NULL,
        date VARCHAR(50) NOT NULL,
        time VARCHAR(50) NOT NULL,
        message TEXT,
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_dining_created_at ON dining_reservations(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_dining_booking_id ON dining_reservations(booking_id);
    `);

    // 3. Catering Inquiries Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS catering_inquiries (
        id SERIAL PRIMARY KEY,
        inquiry_id VARCHAR(50) UNIQUE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        event_type VARCHAR(100),
        guests VARCHAR(50),
        date VARCHAR(50),
        message TEXT,
        status VARCHAR(50) DEFAULT 'New',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_catering_created_at ON catering_inquiries(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_catering_inquiry_id ON catering_inquiries(inquiry_id);
    `);

    // 4. Admin Credentials & Resets Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_credentials (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS admin_password_resets (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        otp_code VARCHAR(10) NOT NULL,
        reset_token VARCHAR(100) NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        is_used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ PostgreSQL database tables verified and active on Neon.');
  } catch (err) {
    console.error('❌ Database schema initialization error:', err.message);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
  initDatabase
};
