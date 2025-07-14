import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { X, Moon, Sun, Volume2, VolumeX, RefreshCw } from "lucide-react";

interface SettingsPanelProps {
    darkMode: boolean;
    soundEnabled: boolean;
    autoRefresh: boolean;
    onToggleDarkMode: () => void;
    onToggleSound: () => void;
    onToggleAutoRefresh: () => void;
    onClose: () => void;
}

export const SettingsPanel = ({
    darkMode,
    soundEnabled,
    autoRefresh,
    onToggleDarkMode,
    onToggleSound,
    onToggleAutoRefresh,
    onClose
}: SettingsPanelProps) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle>Kitchen Settings</CardTitle>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                            <span>Dark Mode</span>
                        </div>
                        <Switch
                            checked={darkMode}
                            onCheckedChange={onToggleDarkMode}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                            <span>Sound Alerts</span>
                        </div>
                        <Switch
                            checked={soundEnabled}
                            onCheckedChange={onToggleSound}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <RefreshCw className="h-4 w-4" />
                            <span>Auto Refresh</span>
                        </div>
                        <Switch
                            checked={autoRefresh}
                            onCheckedChange={onToggleAutoRefresh}
                        />
                    </div>

                    <div className="pt-4 border-t space-y-2">
                        <div className="text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Kitchen Station:</span>
                                <span className="font-medium">Main Kitchen</span>
                            </div>
                            <div className="flex justify-between mt-1">
                                <span>Chef:</span>
                                <span className="font-medium">Kitchen Staff</span>
                            </div>
                        </div>
                    </div>

                    <Button onClick={onClose} className="w-full">
                        Save Changes
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};