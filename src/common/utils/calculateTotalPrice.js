const calculateTotalPrice = (price, quantity) => {
    const totalPrice = price * quantity
    return totalPrice
}

module.exports = {
    calculateTotalPrice,
}