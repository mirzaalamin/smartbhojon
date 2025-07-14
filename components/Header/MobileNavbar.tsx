
import { User, ShoppingBag } from 'lucide-react';

interface Props {
    tableNumber: number | string
}

const MobileNavbar = ({ tableNumber }: Props) => {
    return (
        <header className="w-full bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between mx-auto">
                {/* Left - User Icon */}
                <h5 className='font-bold'>Menu</h5>

                {/* Center - Logo */}
                <div className="flex items-center">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-2 mr-2">
                        <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                            <span className="text-red-500 font-bold text-sm">🍽️</span>
                        </div>
                    </div>
                    <span className="text-red-500 font-bold text-xl">Bhojon</span>
                </div>

                {/* Right - Shopping Bag Icon */}

                <h5 className='font-bold'>Table: {tableNumber}</h5>
            </div>
        </header>
    );
};

export default MobileNavbar;