# Sri Mahalakshmi Caterers - Backend API

Production-ready Node.js backend built with **Domain-Driven Design (DDD)** and **PostgreSQL**, mirroring all domains and client workflows from the Sri Mahalakshmi frontend application.

---

## 🏛️ Architecture Overview (Domain-Driven Design)

The codebase is partitioned into distinct bounded contexts. Each domain context is organized into strict architectural layers:

```
src/
├── config/                  # Environment & PostgreSQL connection pool setup
├── shared/                  # Shared Kernel (Error handling, ApiResponse envelope, middlewares)
├── infrastructure/          # Cross-cutting DB schema initialization and seeders
└── modules/                 # Bounded Contexts
    ├── menu/                # Menu & Catalog Domain
    │   ├── domain/          # Entities (MenuItem) & Repository Interfaces (IMenuRepository)
    │   ├── application/     # Use cases & business orchestrators (MenuService)
    │   ├── infrastructure/  # PostgreSQL persistence implementation (PostgresMenuRepository)
    │   └── presentation/    # HTTP Controllers & Express Routes
    ├── order/               # Online Delivery & Cart Orders Domain
    │   ├── domain/          # Entities (Order, OrderItem) & Value objects
    │   ├── application/     # Use cases (OrderService)
    │   ├── infrastructure/  # PostgreSQL transactional repository
    │   └── presentation/    # Controllers & Routes
    ├── reservation/         # Table Reservations Domain (Contact Page)
    │   ├── domain/          # Entity (Reservation)
    │   ├── application/     # Use cases (ReservationService)
    │   ├── infrastructure/  # PostgreSQL repository
    │   └── presentation/    # Controllers & Routes
    └── catering/            # Event & Bulk Catering Inquiries Domain
        ├── domain/          # Entity (CateringInquiry)
        ├── application/     # Use cases (CateringService)
        ├── infrastructure/  # PostgreSQL repository
        └── presentation/    # Controllers & Routes
```

---

## ⚙️ Environment Variables (`.env`)

Copy `.env.example` to `.env` and fill in your PostgreSQL credentials:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Allowed CORS Origins (comma-separated)
CORS_ORIGIN=http://localhost:5173,http://localhost:5174,http://localhost:3000

# PostgreSQL Database Connection
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sri_mahalakshmi_db

# Or discrete parameters:
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sri_mahalakshmi_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_SSL=false
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd Sri-Mahalakshmi-Caters/backend
npm install
```

### 2. Initialize Database & Seed Authentic Dishes
```bash
npm run db:init
npm run db:seed
```

### 3. Start Development Server
```bash
npm run dev
```

---

## 📡 API Endpoints Reference

### 🥗 1. Menu Domain (`/api/menu`)
- `GET /api/menu` - Fetch all dishes (Supports query params: `?category=Biryani&type=Veg&search=tikka`)
- `GET /api/menu/categories` - Fetch all unique menu categories
- `GET /api/menu/:id` - Fetch single dish details
- `POST /api/menu` - Add a new dish
- `PUT /api/menu/:id` - Update existing dish
- `DELETE /api/menu/:id` - Remove a dish

### 🛒 2. Order Domain (`/api/orders`)
- `POST /api/orders` - Place a delivery order (Direct match with `CartDrawer.jsx`)
  ```json
  {
    "customerName": "Ramesh Kumar",
    "phone": "+91 9876543210",
    "deliveryAddress": "Flat 402, Green Valley Apartments, Anna Nagar, Chennai",
    "paymentMethod": "COD",
    "items": [
      { "id": 1, "name": "Special Royal Hyderabadi Dum Biryani", "price": 280, "quantity": 2 },
      { "id": 8, "name": "Royal Elaneer Payasam", "price": 120, "quantity": 1 }
    ],
    "notes": "Please pack extra raita"
  }
  ```
- `GET /api/orders/track/:orderNumber` - Track order by code (e.g. `SMK-54219`)
- `GET /api/orders` - List all orders (Admin view with `?status=PENDING&phone=...`)
- `PATCH /api/orders/:id/status` - Update order status (`PENDING`, `CONFIRMED`, `PREPARING`, `OUT_FOR_DELIVERY`, `DELIVERED`, `CANCELLED`)

### 📅 3. Reservation Domain (`/api/reservations`)
- `POST /api/reservations` - Book table (Direct match with `Contact.jsx` Table form)
  ```json
  {
    "name": "Priya Sundaram",
    "phone": "+91 9845012345",
    "date": "2026-10-05",
    "time": "19:30",
    "guests": "5-8 People",
    "message": "Window seating preferred"
  }
  ```
- `GET /api/reservations` - List reservations (`?date=2026-10-05&status=PENDING`)
- `PATCH /api/reservations/:id/status` - Update status (`PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`)

### 🎉 4. Catering Domain (`/api/catering`)
- `POST /api/catering` - Submit event catering inquiry (Direct match with `Contact.jsx` & `Catering.jsx`)
  ```json
  {
    "name": "Karthik Raja",
    "phone": "+91 9884011223",
    "eventType": "Wedding/Reception",
    "guests": 250,
    "date": "2026-12-15",
    "message": "Looking for traditional South Indian banana leaf wedding feast + evening buffet"
  }
  ```
- `GET /api/catering` - List catering inquiries (`?eventType=Wedding/Reception&status=NEW`)
- `PATCH /api/catering/:id/status` - Update status (`NEW`, `CONTACTED`, `QUOTED`, `CONFIRMED`, `DECLINED`)
