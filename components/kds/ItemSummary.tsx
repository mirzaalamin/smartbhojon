import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types/kds";


interface ItemSummaryProps {
    orders: Order[];
    darkMode: boolean;
}

export const ItemSummary = ({ orders, darkMode }: ItemSummaryProps) => {
    // Aggregate all items from in-progress orders
    const itemCounts = orders.reduce((acc, order) => {
        order.items.forEach(item => {
            const key = item.name;
            acc[key] = (acc[key] || 0) + item.quantity;
        });
        return acc;
    }, {} as Record<string, number>);

    const sortedItems = Object.entries(itemCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10); // Show top 10 items

    if (sortedItems.length === 0) {
        return (
            <aside className={`w-72 p-6 border-l ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                }`}>
                <Card className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                    <CardHeader>
                        <CardTitle className="text-lg">Now Preparing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className=" text-center py-4">
                            No items currently being prepared
                        </p>
                    </CardContent>
                </Card>
            </aside>
        );
    }

    return (
        <aside className={`w-82 p-6 border-l ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
            <Card className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                        <span>Now Preparing</span>
                        <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                            {orders.length} orders
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {sortedItems.map(([itemName, count]) => (
                            <div key={itemName} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-600">
                                <span className="font-medium text-sm">{itemName}</span>
                                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                                    {count}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                        <div className="flex justify-between">
                            <span>Total Items:</span>
                            <span className="font-bold">
                                {Object.values(itemCounts).reduce((a, b) => a + b, 0)}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </aside>
    );
};