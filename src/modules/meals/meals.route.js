const express = require('express')
const mealsController = require('./meals.controller')
const { protect, restrictTo } = require('../../common/middlewares/middlewares')
const { validateExistMeal } = require('./meals.middleware')

const mealRouter = express.Router()

mealRouter.get('/', mealsController.findAll)

mealRouter.get('/:id', validateExistMeal, mealsController.findOne)

mealRouter.use(protect)

mealRouter.post('/:restaurantId', restrictTo("admin"), mealsController.create)

mealRouter
    .route('/:id')
    .patch(restrictTo("admin"), validateExistMeal, mealsController.update)
    .delete(restrictTo("admin"), validateExistMeal, mealsController.delete)
    
module.exports = mealRouter