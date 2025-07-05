import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface FloatingCartProps {
    itemCount: number;
    totalPrice: number;
    onViewCart: () => void;
}

const FloatingCart = ({ itemCount, totalPrice, onViewCart }: FloatingCartProps) => {
    return (
        <div className="fixed bottom-4 left-4 right-4 z-50">
            <Button
                onClick={onViewCart}
                className="w-full h-14 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-2xl text-white font-medium text-lg"
            >
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-2">
                        <ShoppingBag className="w-5 h-5" />
                        <span>{itemCount} item{itemCount !== 1 ? 's' : ''}</span>
                    </div>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
            </Button>
        </div>
    );
};

export default FloatingCart;