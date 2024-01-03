const Meal = require("../../modules/meals/meals.model")
const Order = require("../../modules/orders/orders.model")
const Restaurant = require("../../modules/restaurants/restaurants.model")
const Review = require("../../modules/reviews/reviews.model")
const User = require("../../modules/users/users.model")

exports.initModel = () => {

    Restaurant.hasMany(Meal, { foreignKey: 'restaurant_id' })
    Meal.belongsTo(Restaurant, { foreignKey: 'restaurant_id' })
    
    Restaurant.hasMany(Review, { foreignKey: 'restaurant_id' })
    Review.belongsTo(Restaurant, { foreignKey: 'restaurant_id' })
    
    Meal.hasOne(Order, { foreignKey: 'meal_id' })
    Order.belongsTo(Meal, { foreignKey: 'meal_id' })
    
    Order.belongsTo(User, { foreignKey: 'user_id' })
    User.hasMany(Order, { foreignKey: 'user_id' })
    
    User.hasMany(Review, { foreignKey: 'user_id' })
    Review.belongsTo(User, { foreignKey: 'user_id' })
    
}
