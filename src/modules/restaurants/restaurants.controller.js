const AppError = require("../../common/errors/appError")
const { catchAsync } = require("../../common/errors/catchAsync")
const { validateReview, validatePartialReview } = require("../reviews/reviews.schema")
const ReviewServices = require("../reviews/reviews.services")
const { validateRestaurant, validatePartialRestaurant } = require("./restaurants.schema")
const RestaurantServices = require("./restaurants.services")

exports.findAll = catchAsync(async (req, res) => {
    const restaurants = await RestaurantServices.findAll()

    return res.status(200).json({
        message: "method get - findAll: from restaurants",
        data: restaurants
    })
})

exports.findOne = catchAsync(async (req, res) => {
    const { restaurant } = req

    return res.status(200).json({
        message: "method get - findOne: from restaurants",
        data: restaurant
    })
})

exports.update = catchAsync(async (req, res) => {
    const { restaurant } = req
    const { hasError, errorMessages, restaurantData } = validatePartialRestaurant(req.body);

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        });
    }

    const restaurantUpdateInfo = {
        name: restaurantData.name,
        address: restaurantData.address
    }

    const updatedRestaurant = await RestaurantServices.update(restaurant, restaurantUpdateInfo)

    return res.status(200).json({
        message: "method patch - update: from restaurants",
        updatedRestaurant
    })
})

exports.delete = catchAsync(async (req, res) => {
    const { restaurant } = req

    await RestaurantServices.delete(restaurant)

    return res.status(204).json(null)
})

exports.create = catchAsync(async (req, res) => {
    const { hasError, errorMessages, restaurantData } = validateRestaurant(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        })
    }

    const restaurant = await RestaurantServices.create(restaurantData)

    return res.status(201).json({
        message: "method post - create: from restaurants",
        restaurant: {
            name: restaurant.name,
            address: restaurant.address,
            rating: restaurant.rating
        }
    })
})

exports.createReview = catchAsync(async (req, res) => {
    const { hasError, errorMessages, reviewData } = validateReview(req.body)
    
    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        })
    }

    const { restaurantId } = req.params

    const { sessionUser } = req

    reviewData.restaurantId = restaurantId
    reviewData.userId = sessionUser.id
 
    const review = await ReviewServices.create(reviewData)

    return res.status(201).json({
        message: "method post - create: from reviews",
        data: review
    })
})

exports.updateReview = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { hasError, errorMessages, reviewData } = validatePartialReview(req.body);
    const { sessionUser } = req

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        });
    }

    const review = await ReviewServices.findOne(id)

    if (sessionUser.id !== review.userId){
        return next(new AppError('You do not own the account of this review', 401))
    }

    const updateRestaurant = await ReviewServices.update(review, reviewData)

    return res.status(200).json({
        message: "method patch - update: from reviews",
        updateRestaurant
    })
})

exports.deleteReview = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { sessionUser } = req

    const review = await ReviewServices.findOne(id)

    if (sessionUser.id !== review.userId){
        return next(new AppError('You do not own the account of this review', 401))
    }

    await ReviewServices.delete(review)

    return res.status(204).json(null)
})
