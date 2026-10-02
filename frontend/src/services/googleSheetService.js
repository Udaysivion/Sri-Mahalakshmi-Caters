/**
 * Service to record restaurant orders directly into PostgreSQL Database (Neon DB).
 * Re-exports submitOrderToDatabase from orderService.
 */

import { submitOrderToDatabase } from './orderService';

export const submitOrderToGoogleSheet = submitOrderToDatabase;
export default submitOrderToDatabase;
