
"use client"

import { useState } from "react";
import { Search, Filter, Download, Eye } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Badge } from "@/components/admin/ui/badge";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const orders = [
    { id: "#1234", customer: "Sarah Johnson", items: "2x Margherita Pizza, 1x Caesar Salad", total: 32.50, status: "preparing", time: "2:30 PM", table: "A4" },
    { id: "#1235", customer: "Mike Chen", items: "1x Beef Burger, 1x Fries, 1x Coke", total: 18.75, status: "ready", time: "2:25 PM", table: "B2" },
    { id: "#1236", customer: "Emma Davis", items: "3x Pasta Carbonara, 2x Garlic Bread", total: 45.00, status: "delivered", time: "2:15 PM", table: "C1" },
    { id: "#1237", customer: "John Wilson", items: "2x Fish & Chips, 1x Mushy Peas", total: 28.60, status: "preparing", time: "2:35 PM", table: "A2" },
    { id: "#1238", customer: "Lisa Brown", items: "1x Chicken Tikka, 1x Naan, 1x Rice", total: 22.30, status: "cancelled", time: "2:10 PM", table: "B5" },
    { id: "#1239", customer: "David Lee", items: "2x Pepperoni Pizza, 1x Mozzarella Sticks", total: 35.80, status: "ready", time: "2:40 PM", table: "A1" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing": return "bg-yellow-100 text-yellow-700";
      case "ready": return "bg-blue-100 text-blue-700";
      case "delivered": return "bg-green-100 text-green-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Orders Management</h1>
          <p className="text-slate-600">Track and manage all restaurant orders</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700">
          <Download className="w-4 h-4 mr-2" />
          Export Orders
        </Button>
      </div>

      <Card className="bg-white border-cream-200">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search orders..."
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
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
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
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Order ID</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Items</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Table</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Time</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Total</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-cream-100 hover:bg-cream-25">
                    <td className="py-4 px-4 font-medium text-slate-900">{order.id}</td>
                    <td className="py-4 px-4 text-slate-700">{order.customer}</td>
                    <td className="py-4 px-4 text-slate-600 max-w-xs truncate">{order.items}</td>
                    <td className="py-4 px-4 text-slate-700">{order.table}</td>
                    <td className="py-4 px-4 text-slate-600">{order.time}</td>
                    <td className="py-4 px-4 font-medium text-slate-900">${order.total.toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
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

export default Orders;
