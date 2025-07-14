import { Order } from "@/types/kds";
import { OrderCard } from "./OrderCard";

interface OrderGridProps {
    orders: Order[];
    onMarkReady: (orderId: string) => void;
    onCompleteOrder: (orderId: string) => void;
    darkMode: boolean;
}

export const OrderGrid = ({ orders, onMarkReady, onCompleteOrder, darkMode }: OrderGridProps) => {
    if (orders.length === 0) {
        return (
            <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <div className="text-6xl mb-4">🍽️</div>
                <h3 className="text-xl font-semibold mb-2">No orders to display</h3>
                <p>Orders will appear here when they come in from the dining area.</p>
            </div>
        );
    }

    // Sort orders by time (oldest first) and priority
    const sortedOrders = [...orders].sort((a, b) => {
        // Rush orders first
        if (a.priority === 'rush' && b.priority !== 'rush') return -1;
        if (b.priority === 'rush' && a.priority !== 'rush') return 1;

        // Then by time placed (oldest first)
        return a.placedAt.getTime() - b.placedAt.getTime();
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedOrders.map((order) => (
                <OrderCard
                    key={order.id}
                    order={order}
                    onMarkReady={onMarkReady}
                    onCompleteOrder={onCompleteOrder}
                    darkMode={darkMode}
                />
            ))}
        </div>
    );
};
