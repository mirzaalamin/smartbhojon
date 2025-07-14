export type OrderStatus = 'in-progress' | 'ready' | 'completed';
export type OrderPriority = 'normal' | 'rush' | 'delayed';

export interface OrderItem {
    name: string;
    quantity: number;
    modifiers: string[];
}

export interface Order {
    id: string;
    orderNumber: number;
    tableNumber: number | null; // null for takeaway
    items: OrderItem[];
    status: OrderStatus;
    priority: OrderPriority;
    placedAt: Date;
    elapsedMinutes: number;
}