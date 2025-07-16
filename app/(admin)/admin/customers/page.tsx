"use client"

import { useState } from "react";
import { Search, Filter, UserPlus, Star } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Badge } from "@/components/admin/ui/badge";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const customers = [
    { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", phone: "+1 234 567 8901", orders: 23, totalSpent: 567.80, lastVisit: "2024-01-15", type: "frequent", rating: 5 },
    { id: 2, name: "Mike Chen", email: "mike.chen@email.com", phone: "+1 234 567 8902", orders: 8, totalSpent: 189.45, lastVisit: "2024-01-14", type: "regular", rating: 4 },
    { id: 3, name: "Emma Davis", email: "emma.d@email.com", phone: "+1 234 567 8903", orders: 2, totalSpent: 87.30, lastVisit: "2024-01-16", type: "new", rating: 5 },
    { id: 4, name: "John Wilson", email: "j.wilson@email.com", phone: "+1 234 567 8904", orders: 15, totalSpent: 423.60, lastVisit: "2024-01-13", type: "frequent", rating: 4 },
    { id: 5, name: "Lisa Brown", email: "lisa.brown@email.com", phone: "+1 234 567 8905", orders: 1, totalSpent: 22.30, lastVisit: "2024-01-16", type: "new", rating: 3 },
    { id: 6, name: "David Lee", email: "david.lee@email.com", phone: "+1 234 567 8906", orders: 31, totalSpent: 892.15, lastVisit: "2024-01-15", type: "vip", rating: 5 },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "vip": return "bg-purple-100 text-purple-700";
      case "frequent": return "bg-green-100 text-green-700";
      case "regular": return "bg-blue-100 text-blue-700";
      case "new": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || customer.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Customer Management</h1>
          <p className="text-slate-600">Manage and view customer information</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-cream-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">156</p>
              <p className="text-sm text-slate-600">Total Customers</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-cream-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">12</p>
              <p className="text-sm text-slate-600">VIP Customers</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-cream-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">45</p>
              <p className="text-sm text-slate-600">Frequent Diners</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-cream-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">23</p>
              <p className="text-sm text-slate-600">New This Month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-cream-200">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="frequent">Frequent</SelectItem>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="new">New</SelectItem>
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
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Orders</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Total Spent</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Last Visit</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Rating</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-cream-100 hover:bg-cream-25">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-slate-900">{customer.name}</p>
                        <p className="text-sm text-slate-600">{customer.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600">{customer.phone}</td>
                    <td className="py-4 px-4 text-slate-900 font-medium">{customer.orders}</td>
                    <td className="py-4 px-4 text-slate-900 font-medium">${customer.totalSpent.toFixed(2)}</td>
                    <td className="py-4 px-4 text-slate-600">{customer.lastVisit}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        {renderStars(customer.rating)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getTypeColor(customer.type)}>
                        {customer.type.charAt(0).toUpperCase() + customer.type.slice(1)}
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

export default Customers;
