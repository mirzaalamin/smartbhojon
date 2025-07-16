"use client"


import { useState } from "react";
import { Search, Filter, ShoppingCart, Plus, Minus, User, Phone, StickyNote, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/admin/ui/badge";
import { Textarea } from "@/components/admin/ui/textarea";
import { Label } from "@/components/admin/ui/label";
import { useToast } from "@/hooks/use-toast";

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  available: boolean;
  tags: string[];
}

interface OrderItem extends MenuItem {
  quantity: number;
  notes?: string;
}

interface CustomerInfo {
  name: string;
  phone: string;
  notes: string;
}

interface OrderDetails {
  table?: string;
  orderType: "dine-in" | "takeaway";
}

const CreateOrder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    phone: "",
    notes: ""
  });
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    orderType: "dine-in"
  });
  const { toast } = useToast();

  const menuItems: MenuItem[] = [
    { id: 1, name: "Margherita Pizza", category: "pizza", price: 16.99, description: "Fresh tomatoes, mozzarella, basil", image: "/placeholder.svg", available: true, tags: ["vegetarian", "popular"] },
    { id: 2, name: "Pepperoni Pizza", category: "pizza", price: 18.99, description: "Pepperoni, mozzarella, tomato sauce", image: "/placeholder.svg", available: true, tags: ["popular"] },
    { id: 3, name: "Spicy Beef Burger", category: "burgers", price: 14.50, description: "Angus beef, jalapeños, spicy mayo", image: "/placeholder.svg", available: true, tags: ["spicy"] },
    { id: 4, name: "Chicken Caesar Salad", category: "salads", price: 12.99, description: "Grilled chicken, romaine, parmesan", image: "/placeholder.svg", available: true, tags: ["healthy"] },
    { id: 5, name: "Veggie Wrap", category: "wraps", price: 9.99, description: "Mixed vegetables, hummus, spinach tortilla", image: "/placeholder.svg", available: true, tags: ["vegetarian", "healthy"] },
    { id: 6, name: "Fish Tacos", category: "tacos", price: 13.99, description: "Grilled fish, cabbage slaw, chipotle sauce", image: "/placeholder.svg", available: true, tags: ["spicy"] },
    { id: 7, name: "Chocolate Brownie", category: "desserts", price: 8.50, description: "Warm brownie with vanilla ice cream", image: "/placeholder.svg", available: true, tags: ["sweet"] },
    { id: 8, name: "Green Smoothie", category: "beverages", price: 6.99, description: "Spinach, apple, banana, coconut water", image: "/placeholder.svg", available: true, tags: ["healthy", "vegetarian"] },
  ];

  const categories = ["all", "pizza", "burgers", "salads", "wraps", "tacos", "desserts", "beverages"];
  const tags = ["all", "vegetarian", "spicy", "healthy", "popular", "sweet"];
  const tables = Array.from({ length: 20 }, (_, i) => `Table ${i + 1}`);

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesTag = tagFilter === "all" || item.tags.includes(tagFilter);
    return matchesSearch && matchesCategory && matchesTag && item.available;
  });

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(prev => prev.filter(item => item.id !== id));
    } else {
      setCart(prev => prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const updateItemNotes = (id: number, notes: string) => {
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, notes } : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const submitOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your order before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (!customerInfo.name.trim()) {
      toast({
        title: "Customer Name Required",
        description: "Please enter the customer's name.",
        variant: "destructive",
      });
      return;
    }

    if (orderDetails.orderType === "dine-in" && !orderDetails.table) {
      toast({
        title: "Table Required",
        description: "Please select a table for dine-in orders.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the order to your backend
    console.log("Order submitted:", {
      customer: customerInfo,
      orderDetails,
      items: cart,
      total: calculateTotal(),
      timestamp: new Date().toISOString(),
    });

    toast({
      title: "Order Created Successfully",
      description: `Order for ${customerInfo.name} has been sent to the kitchen.`,
    });

    // Reset form
    setCart([]);
    setCustomerInfo({ name: "", phone: "", notes: "" });
    setOrderDetails({ orderType: "dine-in" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Create Order</h1>
          <p className="text-slate-600">Take orders from customers at the counter</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-slate-600">Cart Total</p>
            <p className="text-2xl font-bold text-slate-900">${calculateTotal().toFixed(2)}</p>
          </div>
          <Button
            onClick={submitOrder}
            className="bg-amber-600 hover:bg-amber-700"
            disabled={cart.length === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Submit Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Items Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <Card className="bg-white border-cream-200">
            <CardHeader>
              <CardTitle>Browse Menu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={tagFilter} onValueChange={setTagFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    {tags.map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag === "all" ? "All Items" : tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="bg-white border-cream-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-slate-900">{item.name}</h3>
                        <span className="font-bold text-slate-900">${item.price}</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          onClick={() => addToCart(item)}
                          size="sm"
                          className="bg-amber-600 hover:bg-amber-700"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary & Customer Details */}
        <div className="space-y-6">
          {/* Customer Information */}
          <Card className="bg-white border-cream-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Customer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input
                  id="customerName"
                  placeholder="Enter customer name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="customerPhone">Phone Number</Label>
                <Input
                  id="customerPhone"
                  placeholder="Enter phone number"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="customerNotes">Customer Notes</Label>
                <Textarea
                  id="customerNotes"
                  placeholder="Any special requests..."
                  value={customerInfo.notes}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card className="bg-white border-cream-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Order Type</Label>
                <Select
                  value={orderDetails.orderType}
                  onValueChange={(value: "dine-in" | "takeaway") =>
                    setOrderDetails(prev => ({ ...prev, orderType: value, table: undefined }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dine-in">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Dine In
                      </div>
                    </SelectItem>
                    <SelectItem value="takeaway">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Takeaway
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {orderDetails.orderType === "dine-in" && (
                <div>
                  <Label>Table Assignment *</Label>
                  <Select
                    value={orderDetails.table}
                    onValueChange={(value) => setOrderDetails(prev => ({ ...prev, table: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select table" />
                    </SelectTrigger>
                    <SelectContent>
                      {tables.map((table) => (
                        <SelectItem key={table} value={table}>
                          {table}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cart */}
          <Card className="bg-white border-cream-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Order Summary ({cart.length} items)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-slate-500 text-center py-4">No items in cart</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="border-b border-cream-100 pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-slate-900">{item.name}</h4>
                        <span className="font-semibold text-slate-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm text-slate-600 ml-2">
                          @ ${item.price}
                        </span>
                      </div>
                      <Input
                        placeholder="Special instructions..."
                        value={item.notes || ""}
                        onChange={(e) => updateItemNotes(item.id, e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  ))}
                  <div className="pt-2 border-t border-cream-200">
                    <div className="flex justify-between items-center text-lg font-bold text-slate-900">
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
