
import { DollarSign, Users, ShoppingBag, TrendingUp } from "lucide-react";
import StatsCard from "@/components/admin/ui/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Button } from "@/components/admin/ui/button";

const Overview = () => {
  const recentOrders = [
    { id: "#1234", customer: "Sarah Johnson", items: "2x Margherita Pizza, 1x Caesar Salad", total: "$32.50", status: "Preparing" },
    { id: "#1235", customer: "Mike Chen", items: "1x Beef Burger, 1x Fries", total: "$18.75", status: "Ready" },
    { id: "#1236", customer: "Emma Davis", items: "3x Pasta Carbonara", total: "$45.00", status: "Delivered" },
    { id: "#1237", customer: "John Wilson", items: "2x Fish & Chips", total: "$28.60", status: "Preparing" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-600">Welcome back! Here's what's happening at your restaurant today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Today's Revenue"
          value="$1,245"
          change="+12.5% from yesterday"
          changeType="increase"
          icon={DollarSign}
        />
        <StatsCard
          title="Active Orders"
          value="23"
          change="+5 from last hour"
          changeType="increase"
          icon={ShoppingBag}
        />
        <StatsCard
          title="Customers Served"
          value="87"
          change="+8.2% from yesterday"
          changeType="increase"
          icon={Users}
        />
        <StatsCard
          title="Average Order"
          value="$28.30"
          change="+3.1% from yesterday"
          changeType="increase"
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-cream-200">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-cream-25 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium text-slate-900">{order.id}</p>
                        <p className="text-sm text-slate-600">{order.customer}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-600">{order.items}</p>
                        <p className="font-medium text-slate-900">{order.total}</p>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === "Delivered" ? "bg-green-100 text-green-700" :
                    order.status === "Ready" ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Orders
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border-cream-200">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              Add New Menu Item
            </Button>
            <Button className="w-full justify-start" variant="outline">
              Process Refund
            </Button>
            <Button className="w-full justify-start" variant="outline">
              Update Inventory
            </Button>
            <Button className="w-full justify-start" variant="outline">
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
