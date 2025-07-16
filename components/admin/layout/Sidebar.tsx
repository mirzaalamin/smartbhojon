
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Menu,
  Package,
  CreditCard,
  BarChart3,
  Settings,
  ChefHat,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Create Order", href: "/create-order", icon: Plus },
  { name: "Orders", href: "/orders", icon: ShoppingBag },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Menu", href: "/menu", icon: Menu },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-sm border-r border-cream-200 flex flex-col">
      <div className="p-6 border-b border-cream-200">
        <div className="flex items-center gap-2">
          <ChefHat className="h-8 w-8 text-amber-600" />
          <span className="text-xl font-bold text-slate-800">RestaurantPro</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : "text-slate-600 hover:bg-cream-50 hover:text-slate-900"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
