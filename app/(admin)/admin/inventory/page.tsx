
"use client"

import { useState } from "react";
import { Search, Filter, AlertTriangle, Package, Plus } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Badge } from "@/components/admin/ui/badge";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const inventory = [
    { id: 1, name: "Tomatoes", category: "vegetables", currentStock: 45, minStock: 20, unit: "kg", supplier: "Fresh Farms Ltd", lastRestocked: "2024-01-14", status: "good" },
    { id: 2, name: "Mozzarella Cheese", category: "dairy", currentStock: 8, minStock: 15, unit: "kg", supplier: "Dairy Co", lastRestocked: "2024-01-12", status: "low" },
    { id: 3, name: "Ground Beef", category: "meat", currentStock: 25, minStock: 10, unit: "kg", supplier: "Prime Meats", lastRestocked: "2024-01-15", status: "good" },
    { id: 4, name: "Pasta", category: "grains", currentStock: 2, minStock: 5, unit: "kg", supplier: "Italian Imports", lastRestocked: "2024-01-10", status: "critical" },
    { id: 5, name: "Olive Oil", category: "condiments", currentStock: 12, minStock: 8, unit: "L", supplier: "Mediterranean Co", lastRestocked: "2024-01-13", status: "good" },
    { id: 6, name: "Flour", category: "grains", currentStock: 18, minStock: 15, unit: "kg", supplier: "Mill Direct", lastRestocked: "2024-01-11", status: "good" },
    { id: 7, name: "Chicken Breast", category: "meat", currentStock: 6, minStock: 12, unit: "kg", supplier: "Poultry Plus", lastRestocked: "2024-01-14", status: "low" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-red-100 text-red-700";
      case "low": return "bg-yellow-100 text-yellow-700";
      case "good": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical": return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "low": return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "good": return <Package className="w-4 h-4 text-green-600" />;
      default: return <Package className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const criticalItems = inventory.filter(item => item.status === "critical").length;
  const lowStockItems = inventory.filter(item => item.status === "low").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Inventory Management</h1>
          <p className="text-slate-600">Track and manage your restaurant inventory</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-cream-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-slate-900">{inventory.length}</p>
                <p className="text-sm text-slate-600">Total Items</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-cream-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-600">{criticalItems}</p>
                <p className="text-sm text-slate-600">Critical Stock</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-cream-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-yellow-600">{lowStockItems}</p>
                <p className="text-sm text-slate-600">Low Stock</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-cream-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">85%</p>
                <p className="text-sm text-slate-600">Stock Health</p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-cream-200">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>Inventory Items ({filteredInventory.length})</CardTitle>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="low">Low Stock</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cream-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Item</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Current Stock</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Min. Stock</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Supplier</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Last Restocked</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="border-b border-cream-100 hover:bg-cream-25">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(item.status)}
                        <div>
                          <p className="font-medium text-slate-900">{item.name}</p>
                          <p className="text-sm text-slate-600 capitalize">{item.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600 capitalize">{item.category}</td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-slate-900">{item.currentStock} {item.unit}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-600">{item.minStock} {item.unit}</td>
                    <td className="py-4 px-4 text-slate-600">{item.supplier}</td>
                    <td className="py-4 px-4 text-slate-600">{item.lastRestocked}</td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
