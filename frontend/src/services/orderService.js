/**
 * Public Order Service Forwarder
 * Delegates to the Orders Feature Module
 */

export * from '../features/orders';
export { submitOrderToDatabase as default } from '../features/orders';
