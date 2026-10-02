/**
 * Sri Mahalakshmi Caters - Admin Feature Module
 * Architecture: Feature-based Modular Monolith
 */

export { AdminDashboardPage } from './pages/AdminDashboardPage';
export { AdminLoginPage } from './pages/AdminLoginPage';
export { useAdminAuth } from './hooks/useAdminAuth';
export { useAdminOrders } from './hooks/useAdminOrders';
export { fetchAllOrders, updateLocalOrderStatus, exportOrdersToCSV } from './services/adminOrderService';
export { AdminNavbar } from './components/AdminNavbar';
export { AdminStats } from './components/AdminStats';
export { OrdersTable } from './components/OrdersTable';
export { OrderDetailsModal } from './components/OrderDetailsModal';
export { OrderStatusBadge } from './components/OrderStatusBadge';
export { KitchenTicketPrint, parseOrderItems } from './components/KitchenTicketPrint';
export { DailyKitchenSummaryModal } from './components/DailyKitchenSummaryModal';
export { AdminSidebar } from './components/AdminSidebar';
export { DiningReservationsTable } from './components/DiningReservationsTable';
export { CateringInquiriesTable } from './components/CateringInquiriesTable';
export { AdminPagination } from './components/AdminPagination';
