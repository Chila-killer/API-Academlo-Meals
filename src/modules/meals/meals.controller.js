const AppError = require("../../common/errors/appError");
const { catchAsync } = require("../../common/errors/catchAsync");
const { validateMeal, validatePartialMeal } = require("./meals.schema");
const  MealServices  = require("./meals.services");

exports.create = catchAsync(async (req, res) => {
    const { hasError, errorMessages, mealData } = validateMeal(req.body)

    if(hasError) {
        return res.status(422).json({
            status: 'error',
            messages: errorMessages
        })
    }

    const { restaurantId } = req.params

    mealData.restaurantId = restaurantId

    const meal = await MealServices.create(mealData)

    return res.status(201).json({
        messages: "method post - create: from meals",
        data: meal
    })
})

exports.findAll = catchAsync(async (req, res) => {
    const meals = await MealServices.findAll()

    return res.status(200).json({
        message: "method get - findAll: from meals",
        data: meals
    })
})

exports.findOne = catchAsync(async (req, res) => {
    const { meal } = req
    
    return res.status(200).json({
        message: "method get - findOne: from meals",
        data: meal
    }) 
})

exports.update = catchAsync(async (req, res) => {
    const { meal } = req
    const { hasError, errorMessages, mealData } = validatePartialMeal(req.body)

    if (hasError) {
        return res.status(422).json({
            status: "error",
            messages: errorMessages
        })
    }

    const mealUpdateInfo = {
        name: mealData.name,
        price: mealData.price
    }

    const updatedMeal = await MealServices.update( meal, mealUpdateInfo )

    return res.status(200).json({
        message: "method patch - update: from meals",
        data: updatedMeal
    })
})

exports.delete = catchAsync(async (req, res) => {
    const { meal } = req

    await MealServices.delete(meal)

    return res.status(204).json(null)
})
