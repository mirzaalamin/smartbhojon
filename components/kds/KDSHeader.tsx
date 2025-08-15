import { Button } from "@/components/ui/button";
import { Clock, Settings, RefreshCw, Wifi, ChefHat } from "lucide-react";
import { useState, useEffect } from "react";

interface KDSHeaderProps {
    darkMode: boolean;
    onToggleDarkMode: () => void;
    onToggleSettings: () => void;
    autoRefresh: boolean;
}

export const KDSHeader = ({ darkMode, onToggleDarkMode, onToggleSettings, autoRefresh }: KDSHeaderProps) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [refreshCountdown, setRefreshCountdown] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!autoRefresh) return;

        const interval = setInterval(() => {
            setRefreshCountdown(prev => {
                if (prev <= 1) {
                    return 30; // Reset countdown
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [autoRefresh]);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <header className={`px-6 py-4 border-b transition-colors ${darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
            }`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center gap-2">
                        <ChefHat className="h-8 w-8 text-amber-600" />
                        <span className="text-xl font-bold text-slate-800">BHOJON</span>
                    </div>
                    <div className="text-sm dark:text-white">
                        Bhojon - Main Kitchen
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span className="font-mono text-lg">
                            {formatTime(currentTime)}
                        </span>
                    </div>

                    {autoRefresh && (
                        <div className="flex items-center space-x-2 text-sm ">
                            <Wifi className="h-4 w-4 text-green-500" />
                            <span>Auto-refresh: {refreshCountdown}s</span>
                        </div>
                    )}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.reload()}
                        className={`flex items-center space-x-1 ${darkMode && "text-black"}`}
                    >
                        <RefreshCw className="h-4 w-4" />
                        <span>Refresh</span>
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onToggleSettings}
                        className={`flex items-center space-x-1 ${darkMode && "text-black"}`}
                    >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                    </Button>
                </div>
            </div>
        </header>
    );
};