import { Button } from "@/components/ui/button";
import { OrderStatus } from "@/types/kds";

interface OrderFiltersProps {
    activeFilter: OrderStatus | 'all';
    onFilterChange: (filter: OrderStatus | 'all') => void;
    darkMode: boolean;
}

export const OrderFilters = ({ activeFilter, onFilterChange, darkMode }: OrderFiltersProps) => {
    const filters: { key: OrderStatus | 'all'; label: string; count?: number }[] = [
        { key: 'all', label: 'All Orders' },
        { key: 'in-progress', label: 'In Progress' },
        { key: 'ready', label: 'Ready to Serve' },
        { key: 'completed', label: 'Completed' }
    ];

    return (
        <div className="flex space-x-2 mb-6">
            {filters.map((filter) => (
                <Button
                    key={filter.key}
                    variant={activeFilter === filter.key ? 'default' : 'outline'}
                    onClick={() => onFilterChange(filter.key)}
                    className={`transition-colors ${activeFilter === filter.key
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : darkMode
                            ? 'border-gray-600 hover:bg-gray-700 text-black hover:text-white'
                            : 'hover:bg-gray-50'
                        }`}
                >
                    {filter.label}
                    {filter.count !== undefined && (
                        <span className="ml-2 px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">
                            {filter.count}
                        </span>
                    )}
                </Button>
            ))}
        </div>
    );
};