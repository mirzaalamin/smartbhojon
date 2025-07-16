
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "increase" | "decrease";
  icon: LucideIcon;
}

const StatsCard = ({ title, value, change, changeType, icon: Icon }: StatsCardProps) => {
  return (
    <Card className="bg-white border-cream-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            {change && (
              <p className={`text-sm ${
                changeType === "increase" ? "text-green-600" : "text-red-600"
              }`}>
                {change}
              </p>
            )}
          </div>
          <div className="p-3 bg-amber-50 rounded-full">
            <Icon className="h-6 w-6 text-amber-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
