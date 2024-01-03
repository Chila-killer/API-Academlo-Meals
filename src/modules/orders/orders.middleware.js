const AppError = require('../../common/errors/appError')
const { catchAsync } = require('../../common/errors/catchAsync')
const OrderServices = require('./orders.services')
const MealServices = require('../meals/meals.services')

const validateExistOrder = catchAsync(async ( req, res, next) => {
    const { id } = req.params
    const currentUserId = req.sessionUser.id
    
    const activeOrder = await OrderServices.validateFindOne(id)
    
    const order = await OrderServices.findOneOrder(currentUserId, id)

    if(!activeOrder && order) {
        return next(new AppError(`Order with id: ${id} has already been ${order.status}`, 404))
    }
    
    if(!activeOrder) {
        return next(new AppError(`Order with id: ${id} not found`, 404))
    }

    req.order = order
    next()
})

const validateExistMeal = catchAsync(async ( req, res, next) => {
    const { mealId } = req.body

    const meal = await MealServices.findOne(mealId)

    if(!meal) {
        return next(new AppError(`Meal with id: ${mealId} not found`, 404))
    }

    req.meal = meal
    next()
})

module.exports = {
    validateExistOrder,
    validateExistMeal
}