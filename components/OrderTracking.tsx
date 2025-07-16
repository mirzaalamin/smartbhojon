import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, Utensils, MapPin } from 'lucide-react';
import type { CartItem, OrderStatus } from '../app/(root)/page';

interface OrderTrackingProps {
    orderId: string;
    status: OrderStatus;
    items: CartItem[];
    tableNumber: string;
}

const OrderTracking = ({ orderId, status, items, tableNumber }: OrderTrackingProps) => {
    const [progress, setProgress] = useState(0);
    const [estimatedTime, setEstimatedTime] = useState(15);

    useEffect(() => {
        let newProgress = 0;
        let newTime = 15;

        switch (status) {
            case 'preparing':
                newProgress = 33;
                newTime = 12;
                break;
            case 'ready':
                newProgress = 66;
                newTime = 5;
                break;
            case 'delivered':
                newProgress = 100;
                newTime = 0;
                break;
        }

        setProgress(newProgress);
        setEstimatedTime(newTime);
    }, [status]);

    const getStatusIcon = () => {
        switch (status) {
            case 'preparing':
                return <Utensils className="w-5 h-5 text-orange-500" />;
            case 'ready':
                return <Clock className="w-5 h-5 text-blue-500" />;
            case 'delivered':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'preparing':
                return 'Your order is being prepared';
            case 'ready':
                return 'Your order is ready!';
            case 'delivered':
                return 'Order delivered!';
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case 'preparing':
                return 'bg-orange-500';
            case 'ready':
                return 'bg-blue-500';
            case 'delivered':
                return 'bg-green-500';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4">
            <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Tracking</h1>
                    <div className="flex items-center justify-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        Table {tableNumber} • Order #{orderId.slice(-6)}
                    </div>
                </div>

                {/* Status Card */}
                <Card className="shadow-lg mb-6">
                    <CardContent className="p-6">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
                                {getStatusIcon()}
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                {getStatusText()}
                            </h2>
                            {estimatedTime > 0 && (
                                <p className="text-gray-600">
                                    Estimated time: {estimatedTime} minutes
                                </p>
                            )}
                        </div>

                        <div className="space-y-3">
                            <Progress value={progress} className="h-2" />

                            <div className="flex justify-between text-sm">
                                <div className="flex flex-col items-center">
                                    <div className={`w-3 h-3 rounded-full ${progress >= 33 ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                                    <span className="text-xs mt-1">Preparing</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className={`w-3 h-3 rounded-full ${progress >= 66 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                                    <span className="text-xs mt-1">Ready</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className={`w-3 h-3 rounded-full ${progress >= 100 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    <span className="text-xs mt-1">Delivered</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Order Items */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg">Your Order</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {items.map(item => (
                                <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                                            {item.dietary.length > 0 && (
                                                <div className="flex space-x-1">
                                                    {item.dietary.map(diet => (
                                                        <Badge key={diet} variant="secondary" className="text-xs capitalize">
                                                            {diet}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <span className="font-medium text-orange-600">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {status === 'ready' && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-center">
                            <h3 className="font-semibold text-blue-800 mb-1">Your order is ready!</h3>
                            <p className="text-sm text-blue-600">Please come to the counter to collect your order</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderTracking;