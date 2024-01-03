const AppError = require("../../common/errors/appError");
const { catchAsync } = require("../../common/errors/catchAsync");
const { validateOrder, validatePartialOrder } = require("./orders.schema");
const  OrderServices  = require("./orders.services");
const { calculateTotalPrice } = require('../../common/utils/calculateTotalPrice')

exports.createOrder = catchAsync(async (req, res) => {
    const { hasError, errorMessages, orderData } = validateOrder(req.body) 

    if(hasError) {
        return res.status(422).json({
            status: "error",
            messages: errorMessages
        })
    }

    const currentUserId = req.sessionUser.id

    const mealPrice = req.meal.price

    const totalPrice = calculateTotalPrice( mealPrice, orderData.quantity)

    orderData.userId = currentUserId

    orderData.totalPrice = totalPrice

    const order = await OrderServices.createOrder(orderData)

    return res.status(201).json({
        messages: "method post - create: from orders",
        data: order
    })
})

exports.findAllOrders = catchAsync(async (req, res) => {
    const currentUserId = req.sessionUser.id
    
    const orders = await OrderServices.findAllOrders(currentUserId)

    return res.status(200).json({
        messages: "method get - findAll: from orders",
        data: orders
    })
})

exports.updateOrder = catchAsync(async (req, res, next) => {
    const { order } = req
    const currentUserId = req.sessionUser.id

    const validatedOrder = await OrderServices.findOneOrder(currentUserId, order.id)

    if(!validatedOrder) {
        return next(new AppError('You do not own the account of this order', 401)) 
    }

    const updatedOrder = await OrderServices.updateOrder(validatedOrder)

    return res.status(200).json({
        messages: "method patch - update: from orders",
        data: updatedOrder
    })
})

exports.deleteOrder = catchAsync(async (req, res, next) => {
    const { order } = req
    const currentUserId = req.sessionUser.id

    const validatedOrder = await OrderServices.findOneOrder(currentUserId, order.id)

    if(!validatedOrder) {
        return next(new AppError('You do not own the account of this order', 401)) 
    }

    await OrderServices.deleteOrder(validatedOrder)

    return res.status(204).json(null)
})