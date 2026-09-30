/**
 * Backward compatibility bridge:
 * Re-exports domain-driven API modules from their respective feature slices
 * and the core apiClient infrastructure.
 */
import { apiClient } from '@/core/api';

export { apiClient };
export default apiClient;

export { menuApi } from '@/features/menu';
export { orderApi } from '@/features/cart';
export { reservationApi } from '@/features/reservation';
export { cateringApi } from '@/features/catering';
