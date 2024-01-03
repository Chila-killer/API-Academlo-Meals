const Review = require("../../modules/reviews/reviews.model")

class ReviewServices {

    static async findOne(id) {
        return await Review.findOne({
            where: {
                id
            }
        })
    }

    static async create(data) {
        return await Review.create(data)
    }

    static async update(review, data) {
        return await review.update(data)
    }

    static async delete(review) {
        return await review.update({
            status: 'deleted'
        })
    }

}

module.exports = ReviewServices