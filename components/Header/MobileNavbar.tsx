
import { User, ShoppingBag, ChefHat } from 'lucide-react';

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
                    <div className="flex items-center gap-2">
                        <ChefHat className="h-8 w-8 text-amber-600" />
                        <span className="text-xl font-bold text-slate-800 ">BHOJON</span>
                    </div>
                </div>

                {/* Right - Shopping Bag Icon */}

                <h5 className='font-bold'>Table: {tableNumber}</h5>
            </div>
        </header>
    );
};

export default MobileNavbar;