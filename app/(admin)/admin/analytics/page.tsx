"use client"


import { useState } from "react";
import { Calendar, TrendingUp, DollarSign, Users, ShoppingBag } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import StatsCard from "@/components/admin/ui/stats-card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const Analytics = () => {
  const [dateRange, setDateRange] = useState("7days");
  const [channel, setChannel] = useState("all");

  const revenueData = [
    { name: "Mon", revenue: 1200, orders: 45 },
    { name: "Tue", revenue: 1500, orders: 52 },
    { name: "Wed", revenue: 1800, orders: 61 },
    { name: "Thu", revenue: 2200, orders: 73 },
    { name: "Fri", revenue: 2800, orders: 89 },
    { name: "Sat", revenue: 3200, orders: 95 },
    { name: "Sun", revenue: 2600, orders: 81 },
  ];

  const salesChannelData = [
    { name: "Dine-in", value: 45, color: "#F59E0B" },
    { name: "Takeout", value: 30, color: "#10B981" },
    { name: "Delivery", value: 20, color: "#3B82F6" },
    { name: "Online", value: 5, color: "#8B5CF6" },
  ];

  const popularItemsData = [
    { name: "Margherita Pizza", orders: 89, revenue: 1511.11 },
    { name: "Beef Burger", orders: 76, revenue: 1102.00 },
    { name: "Caesar Salad", orders: 65, revenue: 843.35 },
    { name: "Fish & Chips", orders: 54, revenue: 1079.46 },
    { name: "Pasta Carbonara", orders: 43, revenue: 806.25 },
  ];

  const hourlyData = [
    { hour: "9 AM", orders: 5 },
    { hour: "10 AM", orders: 8 },
    { hour: "11 AM", orders: 12 },
    { hour: "12 PM", orders: 24 },
    { hour: "1 PM", orders: 32 },
    { hour: "2 PM", orders: 28 },
    { hour: "3 PM", orders: 15 },
    { hour: "4 PM", orders: 10 },
    { hour: "5 PM", orders: 18 },
    { hour: "6 PM", orders: 35 },
    { hour: "7 PM", orders: 42 },
    { hour: "8 PM", orders: 38 },
    { hour: "9 PM", orders: 25 },
    { hour: "10 PM", orders: 12 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
          <p className="text-slate-600">Detailed insights and performance metrics</p>
        </div>
        <div className="flex gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={channel} onValueChange={setChannel}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Channels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              <SelectItem value="dine-in">Dine-in</SelectItem>
              <SelectItem value="takeout">Takeout</SelectItem>
              <SelectItem value="delivery">Delivery</SelectItem>
              <SelectItem value="online">Online</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value="$15,340"
          change="+18.2% vs last period"
          changeType="increase"
          icon={DollarSign}
        />
        <StatsCard
          title="Total Orders"
          value="496"
          change="+12.5% vs last period"
          changeType="increase"
          icon={ShoppingBag}
        />
        <StatsCard
          title="Average Order Value"
          value="$30.93"
          change="+5.1% vs last period"
          changeType="increase"
          icon={TrendingUp}
        />
        <StatsCard
          title="Customer Count"
          value="312"
          change="+8.7% vs last period"
          changeType="increase"
          icon={Users}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-cream-200">
          <CardHeader>
            <CardTitle>Daily Revenue & Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#F59E0B" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white border-cream-200">
          <CardHeader>
            <CardTitle>Sales by Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesChannelData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {salesChannelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-cream-200">
          <CardHeader>
            <CardTitle>Peak Hours Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white border-cream-200">
          <CardHeader>
            <CardTitle>Top Performing Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularItemsData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between p-4 bg-cream-25 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-600">{item.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-900">${item.revenue.toFixed(2)}</p>
                    <p className="text-sm text-slate-600">revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
