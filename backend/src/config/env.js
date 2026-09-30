import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const parseOrigins = (rawOrigins) => {
  if (!rawOrigins) return ['http://localhost:5173', 'http://localhost:5174'];
  return rawOrigins.split(',').map((origin) => origin.trim()).filter(Boolean);
};

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  isProduction: process.env.NODE_ENV === 'production',
  cors: {
    allowedOrigins: parseOrigins(process.env.CORS_ORIGIN),
  },
  db: {
    connectionString: process.env.DATABASE_URL,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME || 'sri_mahalakshmi_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    ssl:
      process.env.DB_SSL === 'true' ||
      (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('sslmode='))
        ? { rejectUnauthorized: false }
        : false,
    max: parseInt(process.env.DB_MAX_CONNECTIONS || '20', 10),
    idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT_MS || '30000', 10),
    connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT_MS || '10000', 10),
  },
  admin: {
    username: process.env.ADMIN_USERNAME || 'admin',
    email: process.env.ADMIN_EMAIL || 'admin@srimahalakshmi.com',
    password: process.env.ADMIN_PASSWORD || 'admin123',
    tokenSecret: process.env.ADMIN_TOKEN_SECRET || 'srimahalakshmi_secret_auth_token_key_2026',
  },
};
