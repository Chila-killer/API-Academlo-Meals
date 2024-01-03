const express = require('express')
const userRouter = require('../modules/users/users.route')
// const { protect } = require('../common/middlewares/middlewares');
const restaurantRouter = require('../modules/restaurants/restaurants.route')
const mealRouter = require('../modules/meals/meals.route')
const orderRouter = require('../modules/orders/orders.route')

const router = express.Router()

router.use('/users', userRouter)
router.use('/restaurants', restaurantRouter)
router.use('/meals', mealRouter)
router.use('/orders', orderRouter)
// router.use(protect);

module.exports = router
