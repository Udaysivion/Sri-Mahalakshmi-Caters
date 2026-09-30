import pkg from 'pg';
const { Pool } = pkg;
import { config } from './env.js';

const poolConfig = config.db.connectionString
  ? {
      connectionString: config.db.connectionString,
      ssl: config.db.ssl,
      max: config.db.max,
      idleTimeoutMillis: config.db.idleTimeoutMillis,
      connectionTimeoutMillis: config.db.connectionTimeoutMillis,
    }
  : {
      host: config.db.host,
      port: config.db.port,
      database: config.db.database,
      user: config.db.user,
      password: config.db.password,
      ssl: config.db.ssl,
      max: config.db.max,
      idleTimeoutMillis: config.db.idleTimeoutMillis,
      connectionTimeoutMillis: config.db.connectionTimeoutMillis,
    };

export const pool = new Pool(poolConfig);

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err.message);
});

/**
 * Execute a parameterized SQL query against the connection pool
 */
export const query = async (text, params) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  if (!config.isProduction) {
    console.log(`[SQL Query] duration=${duration}ms | rows=${res.rowCount}`);
  }
  return res;
};

/**
 * Get a client from the pool for manual transactions
 */
export const getClient = async () => {
  const client = await pool.connect();
  return client;
};

/**
 * Check if PostgreSQL connection is operational
 */
export const testDatabaseConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW() AS now, current_database() AS db');
    console.log(`✅ PostgreSQL Connected successfully to: ${res.rows[0].db} (Server time: ${res.rows[0].now})`);
    return true;
  } catch (err) {
    console.error('❌ PostgreSQL connection error:', err.message);
    return false;
  }
};
