"use client"
import { useState } from "react";
import { Search, Filter, Plus, Edit, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Badge } from "@/components/admin/ui/badge";
import { Switch } from "@/components/admin/ui/switch";
import { MenuItem } from "@/app/page";

const MenuManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const menuItems = [
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Fresh mozzarella, tomato sauce, basil, and olive oil',
      price: 16.99,
      image: 'https://images.pexels.com/photos/16890470/pexels-photo-16890470.jpeg',
      category: 'Pizza',
      dietary: ['vegetarian'],
      rating: 4.5,
      available: true, popular: true
    },
    {
      id: 2,
      name: 'Spicy Chicken Wings',
      description: 'Buffalo wings with celery sticks and blue cheese dip',
      price: 12.99,
      image: 'https://images.pexels.com/photos/29908653/pexels-photo-29908653.jpeg',
      category: 'Appetizers',
      dietary: ['spicy'],
      spiceLevel: 3,
      rating: 5,
      available: true, popular: false
    },
    {
      id: 3,
      name: 'Caesar Salad',
      description: 'Romaine lettuce, parmesan, croutons, caesar dressing',
      price: 11.99,
      image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg',
      category: 'Salads',
      dietary: ['vegetarian'],
      rating: 3.3,
      available: false, popular: true
    },
    {
      id: 4,
      name: 'Grilled Salmon',
      description: 'Atlantic salmon with lemon butter and seasonal vegetables',
      price: 24.99,
      image: 'https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg',
      category: 'Main Course',
      dietary: ['gluten-free'],
      rating: 4.7,
      available: false, popular: false
    },
    {
      id: 5,
      name: 'Veggie Burger',
      description: 'Plant-based patty with avocado, lettuce, and sweet potato fries',
      price: 15.99,
      image: 'https://images.pexels.com/photos/3607284/pexels-photo-3607284.jpeg',
      category: 'Main Course',
      dietary: ['vegetarian', 'vegan'],
      rating: 4,
      available: true, popular: false
    },
    {
      id: 6,
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with vanilla ice cream',
      price: 8.99,
      image: 'https://images.pexels.com/photos/32645223/pexels-photo-32645223.jpeg',
      category: 'Desserts',
      dietary: ['vegetarian'],
      rating: 4.4,
      available: true, popular: false
    },
  ];



  const categories = ["all", "pizza", "burgers", "salads", "pasta", "mains", "desserts"];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const toggleAvailability = (itemId: number) => {
    // In a real app, this would update the backend
    console.log(`Toggling availability for item ${itemId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Menu Management</h1>
          <p className="text-slate-600">Manage your restaurant menu items</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Menu Item
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <Filter className="w-4 h-4 mr-2" />
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
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            List
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="bg-white border-cream-200 overflow-hidden">
              <div className="aspect-video bg-cream-100 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.popular && (
                  <Badge className="absolute top-2 right-2 bg-amber-600 text-white">
                    Popular
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-slate-900">{item.name}</h3>
                  <span className="font-bold text-slate-900">${item.price}</span>
                </div>
                <p className="text-sm text-slate-600 mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={item.available}
                      onCheckedChange={() => toggleAvailability(item.id)}
                    />
                    <span className="text-sm text-slate-600">
                      {item.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-white border-cream-200">
          <CardHeader>
            <CardTitle>Menu Items ({filteredItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cream-200">
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Item</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b border-cream-100 hover:bg-cream-25">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-slate-900">{item.name}</p>
                            <p className="text-sm text-slate-600">{item.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-600 capitalize">{item.category}</td>
                      <td className="py-4 px-4 font-medium text-slate-900">${item.price}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {item.available ? (
                            <Eye className="w-4 h-4 text-green-600" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-red-600" />
                          )}
                          <span className={`text-sm ${item.available ? "text-green-600" : "text-red-600"}`}>
                            {item.available ? "Available" : "Unavailable"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={item.available}
                            onCheckedChange={() => toggleAvailability(item.id)}
                          />
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MenuManagement;
