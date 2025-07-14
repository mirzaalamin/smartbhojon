import { Order } from "@/types/kds";

export const mockOrders: Order[] = [
    {
        id: "order-1",
        orderNumber: 3042,
        tableNumber: 15,
        items: [
            { name: "Grilled Salmon", quantity: 1, modifiers: ["No lemon", "Extra herbs"] },
            { name: "Caesar Salad", quantity: 1, modifiers: ["Dressing on side"] },
            { name: "Garlic Bread", quantity: 2, modifiers: [] }
        ],
        status: 'in-progress',
        priority: 'normal',
        placedAt: new Date(Date.now() - 4 * 60000), // 4 minutes ago
        elapsedMinutes: 4
    },
    {
        id: "order-2",
        orderNumber: 3043,
        tableNumber: null, // Takeaway
        items: [
            { name: "Margherita Pizza", quantity: 1, modifiers: ["Extra cheese"] },
            { name: "Pepperoni Pizza", quantity: 1, modifiers: ["Thin crust"] }
        ],
        status: 'in-progress',
        priority: 'rush',
        placedAt: new Date(Date.now() - 8 * 60000), // 8 minutes ago
        elapsedMinutes: 8
    },
    {
        id: "order-3",
        orderNumber: 3044,
        tableNumber: 8,
        items: [
            { name: "Beef Burger", quantity: 2, modifiers: ["Medium rare", "No pickles"] },
            { name: "French Fries", quantity: 2, modifiers: ["Extra crispy"] },
            { name: "Coca Cola", quantity: 2, modifiers: [] }
        ],
        status: 'in-progress',
        priority: 'normal',
        placedAt: new Date(Date.now() - 12 * 60000), // 12 minutes ago
        elapsedMinutes: 12
    },
    {
        id: "order-4",
        orderNumber: 3045,
        tableNumber: 22,
        items: [
            { name: "Chicken Alfredo", quantity: 1, modifiers: ["Extra parmesan"] },
            { name: "Garden Salad", quantity: 1, modifiers: ["Italian dressing"] }
        ],
        status: 'ready',
        priority: 'normal',
        placedAt: new Date(Date.now() - 15 * 60000), // 15 minutes ago
        elapsedMinutes: 15
    },
    {
        id: "order-5",
        orderNumber: 3046,
        tableNumber: null, // Takeaway
        items: [
            { name: "Fish & Chips", quantity: 1, modifiers: ["Malt vinegar"] },
            { name: "Mushy Peas", quantity: 1, modifiers: [] }
        ],
        status: 'in-progress',
        priority: 'delayed',
        placedAt: new Date(Date.now() - 18 * 60000), // 18 minutes ago
        elapsedMinutes: 18
    }
];
