import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Order } from "@/types/kds";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface OrderCardProps {
    order: Order;
    onMarkReady: (orderId: string) => void;
    onCompleteOrder: (orderId: string) => void;
    darkMode: boolean;
}

export const OrderCard = ({ order, onMarkReady, onCompleteOrder, darkMode }: OrderCardProps) => {
    const getTimerColor = (minutes: number) => {
        if (minutes <= 5) return 'text-green-600';
        if (minutes <= 10) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getTimerBgColor = (minutes: number) => {
        if (minutes <= 5) return 'bg-green-100';
        if (minutes <= 10) return 'bg-yellow-100';
        return 'bg-red-100';
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'rush':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'delayed':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ready':
                return 'border-green-400 bg-green-50';
            case 'completed':
                return 'border-gray-300 bg-gray-50 opacity-75';
            default:
                return darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-200 bg-white';
        }
    };

    return (
        <Card className={`transition-all duration-300 hover:shadow-lg ${getStatusColor(order.status)} ${order.priority === 'rush' ? 'animate-pulse' : ''
            }`}>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <h3 className={`text-xl font-bold`}>#{order.id}</h3>
                        {order.priority !== 'normal' && (
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(order.priority)}`}>
                                {order.priority.toUpperCase()}
                            </span>
                        )}
                    </div>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${getTimerBgColor(order.elapsedMinutes)}`}>
                        <Clock className="h-4 w-4" />
                        <span className={getTimerColor(order.elapsedMinutes)}>
                            {order.elapsedMinutes}m
                        </span>
                    </div>
                </div>

                <div className="flex items-center text-sm">
                    <span className="font-medium">
                        {order.tableNumber ? `Table ${order.tableNumber}` : 'Takeaway'}
                    </span>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="space-y-2">
                    {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                    <span className="font-medium">{item.quantity}x</span>
                                    <span className="text-lg">{item.name}</span>
                                </div>
                                {/* {item.modifiers.length > 0 && (
                                    <div className="ml-6 text-sm text-gray-600 mt-1">
                                        {item.modifiers.map((modifier, idx) => (
                                            <div key={idx} className={`flex items-center space-x-1`}>

                                                <span>•</span>
                                                <span>{modifier}</span>
                                            </div>
                                        ))}
                                    </div>
                                )} */}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-3 border-t">
                    {order.status === 'in-progress' && (
                        <Button
                            onClick={() => onMarkReady(order.id)}
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark Ready
                        </Button>
                    )}

                    {order.status === 'ready' && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-center space-x-2 text-green-600 font-medium">
                                <CheckCircle className="h-5 w-5" />
                                <span>Ready to Serve</span>
                            </div>
                            <Button
                                onClick={() => onCompleteOrder(order.id)}
                                variant="outline"
                                className="w-full"
                            >
                                Complete Order
                            </Button>
                        </div>
                    )}

                    {order.status === 'completed' && (
                        <div className="flex items-center justify-center space-x-2 text-gray-500">
                            <CheckCircle className="h-5 w-5" />
                            <span>Completed</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
