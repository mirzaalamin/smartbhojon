
"use client"

import { useState } from "react";
import { Search, Filter, Download, CreditCard } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Badge } from "@/components/admin/ui/badge";

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");

  const payments = [
    { id: "PAY-1234", orderId: "#1234", customer: "Sarah Johnson", amount: 32.50, method: "credit_card", status: "completed", date: "2024-01-16", time: "2:30 PM", fees: 1.28 },
    { id: "PAY-1235", orderId: "#1235", customer: "Mike Chen", amount: 18.75, method: "cash", status: "completed", date: "2024-01-16", time: "2:25 PM", fees: 0 },
    { id: "PAY-1236", orderId: "#1236", customer: "Emma Davis", amount: 45.00, method: "debit_card", status: "completed", date: "2024-01-16", time: "2:15 PM", fees: 0.90 },
    { id: "PAY-1237", orderId: "#1237", customer: "John Wilson", amount: 28.60, method: "digital_wallet", status: "pending", date: "2024-01-16", time: "2:35 PM", fees: 0.86 },
    { id: "PAY-1238", orderId: "#1238", customer: "Lisa Brown", amount: 22.30, method: "credit_card", status: "refunded", date: "2024-01-16", time: "2:10 PM", fees: 0.89 },
    { id: "PAY-1239", orderId: "#1239", customer: "David Lee", amount: 35.80, method: "cash", status: "completed", date: "2024-01-16", time: "2:40 PM", fees: 0 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "refunded": return "bg-red-100 text-red-700";
      case "failed": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getMethodDisplay = (method: string) => {
    switch (method) {
      case "credit_card": return "Credit Card";
      case "debit_card": return "Debit Card";
      case "digital_wallet": return "Digital Wallet";
      case "cash": return "Cash";
      default: return method;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    const matchesMethod = methodFilter === "all" || payment.method === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalRevenue = payments.filter(p => p.status === "completed").reduce((sum, p) => sum + p.amount, 0);
  const totalFees = payments.filter(p => p.status === "completed").reduce((sum, p) => sum + p.fees, 0);
  const pendingAmount = payments.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Payment Management</h1>
          <p className="text-slate-600">Track and manage all payment transactions</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-cream-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
                <p className="text-sm text-slate-600">Total Revenue</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-cream-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-yellow-600">${pendingAmount.toFixed(2)}</p>
                <p className="text-sm text-slate-600">Pending</p>
              </div>
              <CreditCard className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-cream-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-600">${totalFees.toFixed(2)}</p>
                <p className="text-sm text-slate-600">Processing Fees</p>
              </div>
              <CreditCard className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-cream-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-slate-900">{payments.length}</p>
                <p className="text-sm text-slate-600">Total Transactions</p>
              </div>
              <CreditCard className="h-8 w-8 text-slate-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-cream-200">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>Payment Transactions ({filteredPayments.length})</CardTitle>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="debit_card">Debit Card</SelectItem>
                  <SelectItem value="digital_wallet">Digital Wallet</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
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
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Transaction ID</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Order</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Method</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Fees</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Date & Time</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-cream-100 hover:bg-cream-25">
                    <td className="py-4 px-4 font-medium text-slate-900">{payment.id}</td>
                    <td className="py-4 px-4 text-slate-700">{payment.orderId}</td>
                    <td className="py-4 px-4 text-slate-700">{payment.customer}</td>
                    <td className="py-4 px-4 font-medium text-slate-900">${payment.amount.toFixed(2)}</td>
                    <td className="py-4 px-4 text-slate-600">{getMethodDisplay(payment.method)}</td>
                    <td className="py-4 px-4 text-slate-600">${payment.fees.toFixed(2)}</td>
                    <td className="py-4 px-4 text-slate-600">
                      <div>
                        <p>{payment.date}</p>
                        <p className="text-sm text-slate-500">{payment.time}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
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

export default Payments;
