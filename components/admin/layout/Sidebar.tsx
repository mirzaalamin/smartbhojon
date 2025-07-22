"use client"

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
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Create Order", href: "/admin/create-order", icon: Plus },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Menu", href: "/admin/menu", icon: Menu },
  { name: "Inventory", href: "/admin/inventory", icon: Package },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-sm border-r border-cream-200 flex flex-col">
      <div className="p-6 border-b border-cream-200">
        <div className="flex items-center gap-2">
          <ChefHat className="h-8 w-8 text-amber-600" />
          <span className="text-xl font-bold text-slate-800">BHOJON</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (<Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-amber-50 text-amber-800 border border-amber-300'
                : 'text-slate-600 hover:bg-cream-50 hover:text-slate-900'
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
          )
        }
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
