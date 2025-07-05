import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Utensils, Wifi, QrCode } from 'lucide-react';
import CardTwo from './Card';

interface WelcomeProps {
    onStartOrder: (tableNumber: string) => void;
}

const Welcome = ({ onStartOrder }: WelcomeProps) => {
    const [tableNumber, setTableNumber] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (tableNumber.trim()) {
            onStartOrder(tableNumber.trim());
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                    <div className="mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Utensils className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Bella Vista</h1>
                        <p className="text-gray-600">Welcome to your dining experience</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                                <QrCode className="w-4 h-4" />
                                <span>QR Menu</span>
                            </div>
                            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                            <div className="flex items-center space-x-2">
                                <Wifi className="w-4 h-4" />
                                <span>Free WiFi</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="table" className="block text-sm font-medium text-gray-700 mb-2">
                                    Table Number
                                </label>
                                <Input
                                    id="table"
                                    type="text"
                                    placeholder="Enter your table number"
                                    value={tableNumber}
                                    onChange={(e) => setTableNumber(e.target.value)}
                                    className="text-center text-lg font-medium h-12"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-lg font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg"
                            >
                                Start Ordering
                            </Button>
                        </form>

                        <p className="text-xs text-gray-500">
                            Scan the QR code at your table or enter your table number to begin
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Welcome;
