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