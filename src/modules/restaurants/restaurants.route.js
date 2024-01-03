const express = require('express')

const restaurantController = require('./restaurants.controller')

const { protect, restrictTo } = require('../../common/middlewares/middlewares')
const { validateExistRestaurant } = require('./restaurants.middleware')

const restaurantRouter = express.Router()


restaurantRouter.get('/', restaurantController.findAll)

restaurantRouter
.route('/:id')
.get(validateExistRestaurant, restaurantController.findOne)
.patch(protect, restrictTo('admin'),validateExistRestaurant,  restaurantController.update)
.delete(protect, restrictTo('admin'),validateExistRestaurant,  restaurantController.delete)

restaurantRouter.use(protect)

restaurantRouter.post('/', restrictTo('admin'), restaurantController.create)

restaurantRouter.post('/reviews/:restaurantId', restaurantController.createReview)
restaurantRouter.patch('/reviews/:restaurantId/:id', restaurantController.updateReview)
restaurantRouter.delete('/reviews/:restaurantId/:id', restaurantController.deleteReview)

module.exports = restaurantRouter