"use client"


import { useState } from "react";
import { Save, Building, Users, Calculator, Heart } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Textarea } from "@/components/admin/ui/textarea";
import { Switch } from "@/components/admin/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/admin/ui/label";
import { Separator } from "@/components/admin/ui/separator";

const Settings = () => {
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: "The Golden Spoon",
    address: "123 Main Street, Downtown",
    city: "New York",
    phone: "+1 (555) 123-4567",
    email: "info@goldenspoon.com",
    description: "Fine dining restaurant serving contemporary cuisine with a focus on fresh, local ingredients.",
    openingHours: "11:00 AM - 10:00 PM",
    capacity: 120,
  });

  const [taxSettings, setTaxSettings] = useState({
    salesTax: 8.5,
    serviceFee: 3.0,
    autoAddTax: true,
  });

  const [tippingSettings, setTippingSettings] = useState({
    enableTipping: true,
    suggestedTips: [15, 18, 20],
    allowCustomTip: true,
    minimumTip: 0,
  });

  const [staffRoles] = useState([
    { id: 1, name: "Manager", permissions: ["all"] },
    { id: 2, name: "Server", permissions: ["orders", "customers"] },
    { id: 3, name: "Chef", permissions: ["orders", "menu", "inventory"] },
    { id: 4, name: "Cashier", permissions: ["orders", "payments"] },
  ]);

  const handleSave = () => {
    console.log("Saving settings...", { restaurantInfo, taxSettings, tippingSettings });
    // In a real app, this would save to backend
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Restaurant Settings</h1>
          <p className="text-slate-600">Manage your restaurant configuration and preferences</p>
        </div>
        <Button onClick={handleSave} className="bg-amber-600 hover:bg-amber-700">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-cream-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Restaurant Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="restaurant-name">Restaurant Name</Label>
              <Input
                id="restaurant-name"
                value={restaurantInfo.name}
                onChange={(e) => setRestaurantInfo({ ...restaurantInfo, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={restaurantInfo.address}
                onChange={(e) => setRestaurantInfo({ ...restaurantInfo, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={restaurantInfo.city}
                  onChange={(e) => setRestaurantInfo({ ...restaurantInfo, city: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={restaurantInfo.capacity}
                  onChange={(e) => setRestaurantInfo({ ...restaurantInfo, capacity: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={restaurantInfo.phone}
                  onChange={(e) => setRestaurantInfo({ ...restaurantInfo, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={restaurantInfo.email}
                  onChange={(e) => setRestaurantInfo({ ...restaurantInfo, email: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="opening-hours">Opening Hours</Label>
              <Input
                id="opening-hours"
                value={restaurantInfo.openingHours}
                onChange={(e) => setRestaurantInfo({ ...restaurantInfo, openingHours: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={restaurantInfo.description}
                onChange={(e) => setRestaurantInfo({ ...restaurantInfo, description: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-white border-cream-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Tax & Fees
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sales-tax">Sales Tax (%)</Label>
                <Input
                  id="sales-tax"
                  type="number"
                  step="0.1"
                  value={taxSettings.salesTax}
                  onChange={(e) => setTaxSettings({ ...taxSettings, salesTax: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="service-fee">Service Fee (%)</Label>
                <Input
                  id="service-fee"
                  type="number"
                  step="0.1"
                  value={taxSettings.serviceFee}
                  onChange={(e) => setTaxSettings({ ...taxSettings, serviceFee: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-add-tax">Auto-add tax to prices</Label>
                <Switch
                  id="auto-add-tax"
                  checked={taxSettings.autoAddTax}
                  onCheckedChange={(checked) => setTaxSettings({ ...taxSettings, autoAddTax: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-cream-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Tipping Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="enable-tipping">Enable Tipping</Label>
                <Switch
                  id="enable-tipping"
                  checked={tippingSettings.enableTipping}
                  onCheckedChange={(checked) => setTippingSettings({ ...tippingSettings, enableTipping: checked })}
                />
              </div>
              <div>
                <Label>Suggested Tip Percentages</Label>
                <div className="flex gap-2 mt-2">
                  {tippingSettings.suggestedTips.map((tip, index) => (
                    <Input
                      key={index}
                      type="number"
                      value={tip}
                      onChange={(e) => {
                        const newTips = [...tippingSettings.suggestedTips];
                        newTips[index] = parseInt(e.target.value) || 0;
                        setTippingSettings({ ...tippingSettings, suggestedTips: newTips });
                      }}
                      className="w-20"
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="allow-custom-tip">Allow Custom Tip</Label>
                <Switch
                  id="allow-custom-tip"
                  checked={tippingSettings.allowCustomTip}
                  onCheckedChange={(checked) => setTippingSettings({ ...tippingSettings, allowCustomTip: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-white border-cream-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Staff Roles & Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {staffRoles.map((role) => (
              <div key={role.id} className="flex items-center justify-between p-4 bg-cream-25 rounded-lg">
                <div>
                  <h4 className="font-medium text-slate-900">{role.name}</h4>
                  <p className="text-sm text-slate-600">
                    Permissions: {role.permissions.join(", ")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Remove</Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Users className="w-4 h-4 mr-2" />
              Add New Role
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
