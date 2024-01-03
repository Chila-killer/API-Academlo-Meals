const express = require('express')

const usersController = require('./users.controller')

const { validateExistUser, protectAccountOwner } = require('./users.middleware')

const { protect } = require('../../common/middlewares/middlewares')

const userRouter = express.Router()


userRouter.post('/signup', usersController.create)

userRouter.post('/login', usersController.login)

userRouter.use(protect)

userRouter
    .route('/:id')
    .patch(validateExistUser, protectAccountOwner, usersController.update)
    .delete(validateExistUser, protectAccountOwner, usersController.delete)

userRouter.get('/orders', usersController.findAllOrders)

userRouter.get('/orders/:id', usersController.findOneOrder)

module.exports = userRouter