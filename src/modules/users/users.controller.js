const AppError = require('../../common/errors/appError')
const UserServices = require('./users.services')
const OrderServices = require('../orders/orders.services')
const { validateUser, validatePartialUser, validateLogin } = require('./users.schema')
const { catchAsync } = require('../../common/errors/catchAsync')
const { verifyPassword } = require('../../config/plugins/encryptedPassword.plugin')
const { generateJWT } = require('../../config/plugins/generateJwt.plugin')

exports.findAllOrders = catchAsync(async (req, res) => {
    const currentUserId = req.sessionUser.id

    const orders = await OrderServices.findAllOrders(currentUserId)

    return res.status(200).json({
        message: "method get - findAll: from users",
        data: orders
    })
})

exports.create = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, userData } = validateUser(req.body)

    const emailUser = await UserServices.validateEmail(userData.email)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        })
    }

    if (emailUser) {
        return next(new AppError(`User with email: ${userData.email} already exists`, 409))
    }


    const user = await UserServices.create(userData)

    const token = await generateJWT(user.id)

    return res.status(201).json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    })
})

exports.login = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, userData } = validateLogin(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        })
    }

    const user = await UserServices.validateEmail(userData.email)

    if (!user) {
        return next(new AppError('This account does not exist', 404))
    }

    const isCorrectPassword = await verifyPassword(
        userData.password,
        user.password
    )

    if (!isCorrectPassword) {
        return next(new AppError('Incorrect email or password', 401))
    }

    const token = await generateJWT(user.id)

    return res.status(200).json({
        token,
        user: {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            photo: user.photo,
        }
    })
})

exports.findOneOrder = catchAsync(async (req, res, next) => {
    const currentUserId = req.sessionUser.id
    const { id } = req.params

    const order = await OrderServices.findOneOrder(currentUserId, id)

    if (!order) {
        return next(new AppError(`The order with id: ${id} does not exist on this account`, 404)) 
    }

    return res.status(200).json({
        message: "method get - findOne: from users",
        data: order
    })
})

exports.update = catchAsync(async (req, res) => {
    const { user } = req
    const { hasError, errorMessages, userData } = validatePartialUser(req.body);

    if (hasError) {
        return res.status(422).json({
          status: 'error',
          message: errorMessages,
        });
      }

    const userUpdateInfo = {
        name: userData.name,
        email: userData.email
    }

    const updateUser = await UserServices.update(user, userUpdateInfo)

    return res.status(200).json({
        message: "method patch - update: from users",
        updateUser
    })
})

exports.delete = catchAsync(async (req, res) => {
    const { user } = req

    await UserServices.delete(user)

    return res.status(204).json(null)
})