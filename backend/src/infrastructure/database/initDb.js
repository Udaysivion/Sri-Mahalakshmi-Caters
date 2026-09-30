import { query } from '../../config/database.js';

export const initializeDatabase = async () => {
  console.log('🔄 Checking and initializing PostgreSQL tables...');

  const ddl = `
    -- 1. Menu Items Table
    CREATE TABLE IF NOT EXISTS menu_items (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      category VARCHAR(100) NOT NULL,
      price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
      type VARCHAR(20) NOT NULL DEFAULT 'Veg' CHECK (type IN ('Veg', 'Non-Veg')),
      image_url TEXT,
      description TEXT,
      is_popular BOOLEAN DEFAULT false,
      is_signature BOOLEAN DEFAULT false,
      is_available BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

    -- 2. Orders Table
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      order_number VARCHAR(30) UNIQUE NOT NULL,
      customer_name VARCHAR(150) NOT NULL,
      phone VARCHAR(30) NOT NULL,
      delivery_address TEXT NOT NULL,
      payment_method VARCHAR(30) NOT NULL DEFAULT 'COD',
      payment_status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
      order_status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
      subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0,
      delivery_fee NUMERIC(10, 2) NOT NULL DEFAULT 0,
      total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

    -- 3. Order Items Table
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE SET NULL,
      item_name VARCHAR(150) NOT NULL,
      unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
      quantity INTEGER NOT NULL CHECK (quantity > 0),
      item_total NUMERIC(10, 2) NOT NULL CHECK (item_total >= 0),
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

    -- 4. Reservations Table
    CREATE TABLE IF NOT EXISTS reservations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      phone VARCHAR(30) NOT NULL,
      reservation_date DATE NOT NULL,
      reservation_time TIME NOT NULL,
      guests VARCHAR(50) NOT NULL,
      special_requests TEXT,
      status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

    -- 5. Catering Inquiries Table
    CREATE TABLE IF NOT EXISTS catering_inquiries (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      phone VARCHAR(30) NOT NULL,
      event_type VARCHAR(100) NOT NULL,
      guest_count INTEGER NOT NULL DEFAULT 0,
      event_date DATE NOT NULL,
      message TEXT,
      status VARCHAR(30) NOT NULL DEFAULT 'NEW',
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

    -- 6. Gallery Items Table
    CREATE TABLE IF NOT EXISTS gallery_items (
      id SERIAL PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      category VARCHAR(100) NOT NULL,
      image_url TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

    -- Indexes for performance
    CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items (category);
    CREATE INDEX IF NOT EXISTS idx_menu_items_type ON menu_items (type);
    CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders (order_number);
    CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders (phone);
    CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations (reservation_date);
    CREATE INDEX IF NOT EXISTS idx_catering_event_date ON catering_inquiries (event_date);
    CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_items (category);
  `;

  await query(ddl);
  console.log('✅ PostgreSQL tables and indexes are ready.');
};

// If run directly via node src/infrastructure/database/initDb.js
if (process.argv[1]?.endsWith('initDb.js')) {
  initializeDatabase()
    .then(() => {
      console.log('Database initialization complete.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Database initialization failed:', err);
      process.exit(1);
    });
}
