const AppError = require('../../common/errors/appError')
const { catchAsync } = require('../../common/errors/catchAsync')
const UsersServices = require('./users.services')

const validateExistUser = catchAsync(async ( req, res, next) => {
    const { id } = req.params

    const user = await UsersServices.findOne(id)

    if(!user) {
        return next(new AppError(`User with id: ${id} not found`, 404))
    }

    req.user = user
    next()
})


const protectAccountOwner = (req, res, next) => {
    const { user, sessionUser } = req
  
    if (user.id !== sessionUser.id) {
      return next(new AppError('You do not own this account', 401))
    }
  
    next()
}

module.exports = {
    validateExistUser, 
    protectAccountOwner
}