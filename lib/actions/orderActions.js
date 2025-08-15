export const getOrders = async () => {
    try {
        const response = await fetch(`http://localhost:8000/orders`)
        const data = response.json()

        return data;
    } catch (error) {
        console.log(error)
    }
}

export const createOrder = async (order) => {
    try {

        const newOrder = await fetch(`http://localhost:8000/orders`, {
            method: "POST",
            body: JSON.stringify(order)
        })

        return newOrder

    } catch (error) {
        console.log(error)
    }
}


export const updateOrderStatus = async (orderId, order) => {
    try {

        const updatedOrder = await fetch(`http://localhost:8000/orders/${orderId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        });

        return updatedOrder

    } catch (error) {
        console.log(error)
    }
}