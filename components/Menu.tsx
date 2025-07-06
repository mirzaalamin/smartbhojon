import { useState, useMemo, ReactElement } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Filter, Search, Plus, MapPin } from 'lucide-react';
import type { MenuItem } from '../app/page';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface MenuProps {
    onAddToCart: (item: MenuItem, quantity?: number, notes?: string) => void;
    onViewCart: () => void;
    tableNumber: string;
    viewItem: (item: MenuItem) => void;
    renderStars: (rating: number) => ReactElement;
}

const mockMenuItems: MenuItem[] = [
    {
        id: '1',
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella, tomato sauce, basil, and olive oil',
        price: 16.99,
        image: 'https://images.pexels.com/photos/16890470/pexels-photo-16890470.jpeg',
        category: 'Pizza',
        dietary: ['vegetarian'],
        rating: 4.5,
    },
    {
        id: '2',
        name: 'Spicy Chicken Wings',
        description: 'Buffalo wings with celery sticks and blue cheese dip',
        price: 12.99,
        image: 'https://images.pexels.com/photos/29908653/pexels-photo-29908653.jpeg',
        category: 'Appetizers',
        dietary: ['spicy'],
        spiceLevel: 3,
        rating: 5,
    },
    {
        id: '3',
        name: 'Caesar Salad',
        description: 'Romaine lettuce, parmesan, croutons, caesar dressing',
        price: 11.99,
        image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg',
        category: 'Salads',
        dietary: ['vegetarian'],
        rating: 3.3,
    },
    {
        id: '4',
        name: 'Grilled Salmon',
        description: 'Atlantic salmon with lemon butter and seasonal vegetables',
        price: 24.99,
        image: 'https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg',
        category: 'Main Course',
        dietary: ['gluten-free'],
        rating: 4.7,
    },
    {
        id: '5',
        name: 'Veggie Burger',
        description: 'Plant-based patty with avocado, lettuce, and sweet potato fries',
        price: 15.99,
        image: 'https://images.pexels.com/photos/3607284/pexels-photo-3607284.jpeg',
        category: 'Main Course',
        dietary: ['vegetarian', 'vegan'],
        rating: 4,
    },
    {
        id: '6',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with vanilla ice cream',
        price: 8.99,
        image: 'https://images.pexels.com/photos/32645223/pexels-photo-32645223.jpeg',
        category: 'Desserts',
        dietary: ['vegetarian'],
        rating: 4.4,
    },
];

const categories = ['All', 'Appetizers', 'Pizza', 'Main Course', 'Desserts'];
const dietaryFilters = ['vegetarian', 'vegan', 'gluten-free', 'spicy'];

const Menu = ({ onAddToCart, onViewCart, tableNumber, viewItem, renderStars }: MenuProps) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const filteredItems = useMemo(() => {
        return mockMenuItems.filter(item => {
            const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
            const matchesDietary = selectedDietary.length === 0 || selectedDietary.some(diet => item.dietary.includes(diet));
            const matchesSearch = searchQuery === '' ||
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesDietary && matchesSearch;
        });
    }, [selectedCategory, selectedDietary, searchQuery]);

    const toggleDietary = (dietary: string) => {
        setSelectedDietary(prev =>
            prev.includes(dietary)
                ? prev.filter(d => d !== dietary)
                : [...prev, dietary]
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
            {/* Header */}
            <div className="sticky top-0 z-1 bg-white/95 backdrop-blur-sm border-b shadow-sm">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Menu</h1>
                            <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="w-4 h-4 mr-1" />
                                Table {tableNumber}
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center space-x-2"
                        >
                            <Filter className="w-4 h-4" />
                            <span>Filters</span>
                        </Button>
                    </div>

                    {/* Search */}
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search menu items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Category Filters */}
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                        {categories.map(category => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                                className="whitespace-nowrap"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>

                    {/* Dietary Filters */}
                    {showFilters && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Dietary Preferences</h3>
                            <div className="flex flex-wrap gap-2">
                                {dietaryFilters.map(dietary => (
                                    <Badge
                                        key={dietary}
                                        variant={selectedDietary.includes(dietary) ? "default" : "outline"}
                                        className="cursor-pointer capitalize"
                                        onClick={() => toggleDietary(dietary)}
                                    >
                                        {dietary}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Menu Items */}
            <div className="px-4 py-6 pb-20">
                <div className="grid lg:grid-cols-5 gap-4">
                    {filteredItems.map(item => (
                        // <Card key={item.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        //     <CardContent className="p-0">
                        //         <div className="flex">
                        //             <div className="flex-1 p-4">
                        //                 <div className="flex items-start justify-between mb-2">
                        //                     <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        //                     <span className="text-lg font-bold text-orange-600">${item.price}</span>
                        //                 </div>
                        //                 <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                        //                 <div className="flex items-center justify-between">
                        //                     <div className="flex flex-wrap gap-1">
                        //                         {item.dietary.map(diet => (
                        //                             <Badge key={diet} variant="secondary" className="text-xs capitalize">
                        //                                 {diet}
                        //                             </Badge>
                        //                         ))}
                        //                         {item.spiceLevel && (
                        //                             <Badge variant="destructive" className="text-xs">
                        //                                 🌶️ {item.spiceLevel}/5
                        //                             </Badge>
                        //                         )}
                        //                     </div>
                        //                     <Button
                        //                         size="sm"
                        //                         onClick={() => onAddToCart(item)}
                        //                         className="bg-orange-500 hover:bg-orange-600"
                        //                     >
                        //                         <Plus className="w-4 h-4 mr-1" />
                        //                         Add
                        //                     </Button>
                        //                 </div>
                        //             </div>
                        //             <div className="w-24 h-24 bg-gray-200 rounded-r-lg flex-shrink-0">
                        //                 <img
                        //                     src={item.image}
                        //                     alt={item.name}
                        //                     className="w-full h-full object-cover rounded-r-lg"
                        //                 />
                        //             </div>
                        //         </div>
                        //     </CardContent>
                        // </Card>
                        <div key={item.id}
                            className=" m-2 bg-white border border-indigo-100 rounded-[25px] shadow-lg overflow-hidden"
                        >
                            {/* angled hero photo */}
                            <div className="relative h-62">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    sizes="295px"
                                    className="rotate-6 -translate-x-2 -translate-y-10 rounded-br-[20px] object-cover object-center"
                                    priority
                                />
                            </div>

                            {/* info */}
                            <div className="flex justify-between items-end px-6 pb-5 space-x-4">
                                <div>
                                    <div className='flex gap-2'>
                                        {item.dietary.map((diet, index) => (
                                            <span key={index} className="inline-block mb-1 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-600">
                                                {diet}
                                            </span>

                                        ))}
                                        {item.spiceLevel && (
                                            <span className="inline-block mb-1 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-red-600">
                                                🌶️ {item.spiceLevel}/5
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold">{item.name}</h3>

                                </div>

                                <div className="text-right">
                                    <p className="text-orange-500 font-bold">${item.price}</p>
                                    <div className="flex justify-end gap-[1px]">
                                        {renderStars(item.rating)}
                                    </div>
                                </div>
                            </div>

                            {/* actions */}
                            <div className="border-t flex gap-3 px-6 py-4">
                                <Button
                                    type="submit"
                                    className="flex-1 h-12 text-lg font-medium bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg"
                                    onClick={() => onAddToCart(item)}
                                >
                                    Add to cart
                                </Button>
                                <Button className="flex-1 h-12 text-sm font-semibold py-2 border border-orange-500 text-orange-500 bg-transparent hover:bg-indigo-50 transition-colors" onClick={() => viewItem(item)}>
                                    View
                                </Button>
                            </div>
                        </div>

                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No items match your current filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;