# Frontend Architecture: Feature-Based Modular Monolith

Sri Mahalakshmi Kitchen & Caterers frontend follows a **Feature-Based Modular Monolithic Architecture**.

Instead of organizing code by technical layers alone (all components in one place, all hooks in another), code is organized primarily around **business domain features**. Each feature encapsulates its own API clients, components, hooks, and context with clear public interfaces.

---

## 🏛️ Directory Structure

```
src/
├── core/                                # Cross-cutting infrastructure
│   ├── api/
│   │   ├── apiClient.js                 # Central fetch HTTP client with error handling
│   │   └── index.js
│   └── config/
│       └── env.js                       # Environment configurations (API URL, app config)
│
├── shared/                              # Shared reusable cross-feature resources
│   ├── layouts/
│   │   └── AppLayout.jsx                # Global application shell
│   └── utils/
│       └── formatters.js                # Currency (₹ INR), date formatters
│
├── features/                            # Domain Feature Slices (Modular Monolith)
│   ├── menu/                            # Menu & Catalog Domain
│   │   ├── api/menuApi.js               # Backend /api/menu integration
│   │   ├── hooks/useMenu.js             # Menu fetching hook with fallback
│   │   └── index.js                     # Public barrel export
│   │
│   ├── cart/                            # Cart & Orders Domain
│   │   ├── api/orderApi.js              # Backend /api/orders integration
│   │   ├── context/CartContext.jsx      # Persistent cart state & operations
│   │   ├── components/CartDrawer.jsx    # Checkout flow & order confirmation
│   │   └── index.js
│   │
│   ├── reservation/                     # Table Reservation Domain
│   │   ├── api/reservationApi.js        # Backend /api/reservations integration
│   │   ├── components/TableReservationForm.jsx # Validated table booking form
│   │   └── index.js
│   │
│   ├── catering/                        # Catering & Bulk Inquiries Domain
│   │   ├── api/cateringApi.js           # Backend /api/catering integration
│   │   ├── components/CateringInquiryForm.jsx  # Event catering inquiry form
│   │   └── index.js
│   │
│   ├── home/                            # Home page sections & experiences
│   │   └── index.js
│   │
│   └── about/                           # Brand story, philosophy & leadership
│       └── index.js
│
├── services/
│   └── api.js                           # Unified API re-export bridge
│
└── pages/                               # Thin routing entry points orchestrating feature slices
    ├── Home.jsx
    ├── Menu.jsx
    ├── Catering.jsx
    ├── Contact.jsx
    └── ...
```

---

## 🔑 Key Architectural Rules

1. **Feature Encapsulation**: A feature owns its internal components, API queries, and state.
2. **Public Barrel Exports (`index.js`)**: Outside code interacts with a feature only through its `index.js` barrel export.
3. **Thin Pages**: Pages inside `src/pages/` serve strictly as orchestrators and routing entry points.
4. **Path Aliasing**: `@/` maps directly to `src/` (e.g. `import { TableReservationForm } from '@/features/reservation'`).
