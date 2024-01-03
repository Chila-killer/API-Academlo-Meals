const express = require('express')
const ordersController = require('./orders.controller')
const { protect, restrictTo } = require('../../common/middlewares/middlewares')
const { validateExistOrder, validateExistMeal } = require('./orders.middleware')

const orderRouter = express.Router()

orderRouter.use(protect)

orderRouter.post('/', validateExistMeal, ordersController.createOrder)

orderRouter.get('/me', ordersController.findAllOrders)

orderRouter
    .route('/:id')
    .patch( validateExistOrder, ordersController.updateOrder)
    .delete( validateExistOrder, ordersController.deleteOrder)
    
module.exports = orderRouter