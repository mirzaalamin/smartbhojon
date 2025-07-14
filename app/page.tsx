
"use client"
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cart from '@/components/Cart';
import OrderTracking from '@/components/OrderTracking';
import PostOrder from '@/components/PostOrder';
import FloatingCart from '@/components/FloatingCart';
import Welcome from '@/components/Welcome';
import Menu from '@/components/Menu';
import Processing from '@/components/Processing';
import ViewItem from '@/components/ViewItem';
import { Star, StarHalf } from 'lucide-react';

export type OrderStatus = 'preparing' | 'ready' | 'delivered';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  dietary: string[];
  spiceLevel?: number;
  rating: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
  notes?: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'menu' | 'cart' | 'tracking' | 'post-order' | 'pending'>('welcome');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('preparing');
  const [tableNumber, setTableNumber] = useState<string>('');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>()
  const [selectedViewItem, setSelectedViewItem] = useState<MenuItem | null>(null);

  const addToCart = (item: MenuItem, quantity: number = 1, notes?: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity, notes: notes || cartItem.notes }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity, notes }];
    });
  };

  const viewItem = (item: MenuItem) => setSelectedViewItem(item);

  const onClosePopup = () => setSelectedViewItem(null);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="text-sm text-gray-600 ml-2">({rating})</span>
      </div>
    );
  };

  const updateCartItem = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item => item.id === id ? { ...item, quantity } : item)
      );
    }
  };

  const getTotalItems = () => cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () => cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleStartOrder = (table: string) => {
    setTableNumber(table);
    setCurrentStep('menu');
  };

  const handleCheckout = (paymentMethod: 'table' | 'counter') => {
    const newOrderId = `ORD-${Date.now()}`;
    setOrderId(newOrderId);
    setPaymentStatus('pending')
    setCurrentStep('pending');

    console.log(cartItems)

    if (paymentMethod === 'table') {
      setTimeout(() => {
        setPaymentStatus('success')
        setCurrentStep('tracking');

        // Simulate order progress
        setTimeout(() => setOrderStatus('ready'), 8000);
        setTimeout(() => setOrderStatus('delivered'), 15000);
      }, 5000)
    } else {
      setTimeout(() => {
        setPaymentStatus('success')
        setCurrentStep('tracking');

        // Simulate order progress
        setTimeout(() => setOrderStatus('ready'), 8000);
        setTimeout(() => setOrderStatus('delivered'), 15000);
      }, 5000)
    }



  };

  const handleOrderComplete = () => {
    setCurrentStep('post-order');
  };

  useEffect(() => {
    if (orderStatus === 'delivered') {
      setTimeout(() => handleOrderComplete(), 2000);
    }
  }, [orderStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {currentStep === 'welcome' && (
        <Welcome onStartOrder={handleStartOrder} />
      )}

      {currentStep === 'menu' && (
        <>
          <Menu
            onAddToCart={addToCart}
            onViewCart={() => setCurrentStep('cart')}
            tableNumber={tableNumber}
            viewItem={viewItem}
            renderStars={renderStars}
          />
          {cartItems.length > 0 && (
            <FloatingCart
              itemCount={getTotalItems()}
              totalPrice={getTotalPrice()}
              onViewCart={() => setCurrentStep('cart')}
            />
          )}
        </>
      )}

      {currentStep === 'cart' && (
        <Cart
          items={cartItems}
          onUpdateItem={updateCartItem}
          onCheckout={handleCheckout}
          onBackToMenu={() => setCurrentStep('menu')}
        />
      )}

      {currentStep === 'pending' && (
        <Processing />
      )}

      {currentStep === 'tracking' && orderId && (
        <OrderTracking
          orderId={orderId}
          status={orderStatus}
          items={cartItems}
          tableNumber={tableNumber}
        />
      )}

      {currentStep === 'post-order' && orderId && (
        <PostOrder
          orderId={orderId}
          totalAmount={getTotalPrice()}
          onNewOrder={() => {
            setCurrentStep('welcome');
            setCartItems([]);
            setOrderId(null);
            setOrderStatus('preparing');
            setTableNumber('');
          }}
        />
      )}

      {selectedViewItem && (
        <ViewItem selectedViewItem={selectedViewItem} onClose={onClosePopup} renderStars={renderStars}
        />
      )}
    </div>
  );
};

export default Index;
