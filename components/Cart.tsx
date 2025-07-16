import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Minus, Trash2, CreditCard, MapPin, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../app/(root)/page';

interface CartProps {
    items: CartItem[];
    onUpdateItem: (id: string, quantity: number) => void;
    onCheckout: (paymentMethod: 'table' | 'counter') => void;
    onBackToMenu: () => void;
}

const Cart = ({ items, onUpdateItem, onCheckout, onBackToMenu }: CartProps) => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08875; // NY tax rate
    const total = subtotal + tax;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4">
                <div className="max-w-md mx-auto">
                    <div className="flex items-center mb-6">
                        <Button variant="ghost" size="sm" onClick={onBackToMenu}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Menu
                        </Button>
                    </div>

                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShoppingBag className="w-8 h-8 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
                        <p className="text-gray-600">Add some delicious items from our menu</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4">
            <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <Button variant="ghost" size="sm" onClick={onBackToMenu}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Menu
                    </Button>
                    <h1 className="text-xl font-bold text-gray-800">Your Order</h1>
                    <div></div>
                </div>

                <div className="space-y-4 mb-6">
                    {items.map(item => (
                        <Card key={item.id} className="shadow-md">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                        <p className="text-sm text-gray-600 mb-2">${item.price.toFixed(2)} each</p>
                                        {item.dietary.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {item.dietary.map(diet => (
                                                    <Badge key={diet} variant="secondary" className="text-xs capitalize">
                                                        {diet}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                        {item.notes && (
                                            <p className="text-sm text-gray-500 italic">Note: {item.notes}</p>
                                        )}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onUpdateItem(item.id, 0)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onUpdateItem(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </Button>
                                        <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onUpdateItem(item.id, item.quantity + 1)}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <span className="text-lg font-bold text-orange-600">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Order Summary */}
                <Card className="shadow-lg mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (8.875%)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Options */}
                <div className="space-y-3">
                    <Button
                        onClick={() => onCheckout('table')}
                        className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium"
                    >
                        <CreditCard className="w-5 h-5 mr-2" />
                        Pay at Table
                    </Button>

                    <Button
                        onClick={() => onCheckout('counter')}
                        variant="outline"
                        className="w-full h-12 font-medium"
                    >
                        <MapPin className="w-5 h-5 mr-2" />
                        Pay at Counter
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;