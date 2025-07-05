import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Heart, DollarSign, MessageSquare, Gift } from 'lucide-react';

interface PostOrderProps {
    orderId: string;
    totalAmount: number;
    onNewOrder: () => void;
}

const PostOrder = ({ orderId, totalAmount, onNewOrder }: PostOrderProps) => {
    const [currentStep, setCurrentStep] = useState<'complete' | 'tip' | 'feedback' | 'loyalty'>('complete');
    const [tipAmount, setTipAmount] = useState<number>(0);
    const [customTip, setCustomTip] = useState('');
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [email, setEmail] = useState('');

    const tipOptions = [
        { label: '15%', value: totalAmount * 0.15 },
        { label: '18%', value: totalAmount * 0.18 },
        { label: '20%', value: totalAmount * 0.20 },
        { label: '25%', value: totalAmount * 0.25 },
    ];

    const handleTipSubmit = () => {
        console.log('Tip submitted:', tipAmount);
        setCurrentStep('feedback');
    };

    const handleFeedbackSubmit = () => {
        console.log('Feedback submitted:', { rating, feedback });
        setCurrentStep('loyalty');
    };

    const handleLoyaltySubmit = () => {
        console.log('Loyalty program joined:', email);
        setTimeout(() => {
            onNewOrder();
        }, 2000);
    };

    if (currentStep === 'complete') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 flex items-center justify-center">
                <Card className="w-full max-w-md shadow-2xl">
                    <CardContent className="p-8 text-center">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Complete!</h1>
                        <p className="text-gray-600 mb-6">
                            Thank you for dining with us. Your order #{orderId.slice(-6)} has been delivered.
                        </p>
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <div className="text-lg font-semibold text-gray-800">
                                Total: ${totalAmount.toFixed(2)}
                            </div>
                        </div>
                        <Button
                            onClick={() => setCurrentStep('tip')}
                            className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium mb-3"
                        >
                            <Heart className="w-5 h-5 mr-2" />
                            Leave a Tip
                        </Button>
                        <Button
                            variant="outline"
                            onClick={onNewOrder}
                            className="w-full h-12 font-medium"
                        >
                            Start New Order
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (currentStep === 'tip') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4">
                <div className="max-w-md mx-auto">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center text-xl">
                                <DollarSign className="w-6 h-6 mr-2 text-green-500" />
                                Add a Tip
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-6">
                                Show your appreciation for great service
                            </p>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {tipOptions.map((option) => (
                                    <Button
                                        key={option.label}
                                        variant={tipAmount === option.value ? "default" : "outline"}
                                        onClick={() => {
                                            setTipAmount(option.value);
                                            setCustomTip('');
                                        }}
                                        className="h-12"
                                    >
                                        <div className="text-center">
                                            <div className="font-medium">{option.label}</div>
                                            <div className="text-sm">${option.value.toFixed(2)}</div>
                                        </div>
                                    </Button>
                                ))}
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Custom Amount
                                </label>
                                <Input
                                    type="number"
                                    placeholder="Enter custom tip amount"
                                    value={customTip}
                                    onChange={(e) => {
                                        setCustomTip(e.target.value);
                                        setTipAmount(parseFloat(e.target.value) || 0);
                                    }}
                                    className="text-center"
                                />
                            </div>

                            {tipAmount > 0 && (
                                <div className="bg-green-50 rounded-lg p-4 mb-6">
                                    <div className="text-center">
                                        <div className="text-lg font-semibold text-green-800">
                                            Total with tip: ${(totalAmount + tipAmount).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-3">
                                <Button
                                    onClick={handleTipSubmit}
                                    disabled={tipAmount <= 0}
                                    className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-medium"
                                >
                                    Add Tip ${tipAmount.toFixed(2)}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentStep('feedback')}
                                    className="w-full h-12 font-medium"
                                >
                                    Skip Tip
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (currentStep === 'feedback') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                <div className="max-w-md mx-auto">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center text-xl">
                                <MessageSquare className="w-6 h-6 mr-2 text-blue-500" />
                                Share Your Experience
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    How was your experience?
                                </label>
                                <div className="flex justify-center space-x-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className={`p-1 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        >
                                            <Star className="w-8 h-8 fill-current" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tell us more (optional)
                                </label>
                                <Textarea
                                    placeholder="Share your thoughts about the food, service, or atmosphere..."
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    rows={4}
                                />
                            </div>

                            <div className="space-y-3">
                                <Button
                                    onClick={handleFeedbackSubmit}
                                    disabled={rating === 0}
                                    className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium"
                                >
                                    Submit Feedback
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentStep('loyalty')}
                                    className="w-full h-12 font-medium"
                                >
                                    Skip Feedback
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
            <div className="max-w-md mx-auto">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center text-xl">
                            <Gift className="w-6 h-6 mr-2 text-purple-500" />
                            Join Our Loyalty Program
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Gift className="w-8 h-8 text-purple-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Earn Points & Rewards
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Get exclusive deals, birthday rewards, and earn points with every order
                            </p>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                                <Badge className="bg-purple-500">10%</Badge>
                                <span className="text-sm text-gray-700">Off your next order</span>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                                <Badge className="bg-purple-500">FREE</Badge>
                                <span className="text-sm text-gray-700">Birthday dessert</span>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                                <Badge className="bg-purple-500">2x</Badge>
                                <span className="text-sm text-gray-700">Points on weekends</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={handleLoyaltySubmit}
                                disabled={!email || !email.includes('@')}
                                className="w-full h-12 bg-purple-500 hover:bg-purple-600 text-white font-medium"
                            >
                                Join Loyalty Program
                            </Button>
                            <Button
                                variant="outline"
                                onClick={onNewOrder}
                                className="w-full h-12 font-medium"
                            >
                                Maybe Later
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PostOrder;
