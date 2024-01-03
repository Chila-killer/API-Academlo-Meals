const z = require('zod')
const { extractValidationData } = require('../../common/utils/extractErrorData')

const registerSchema = z.object({
    comment: z.string({invalid_type_error: 'name must be a string', required_error: 'comment is required'})
      .min(10, { message: 'comment is too short' }),
    rating: z.number().int().min(1).max(5)
})

const validateReview = (data) => {
    const result = registerSchema.safeParse(data);
  
    const {
      hasError,
      errorMessages,
      data: reviewData
    } = extractValidationData(result);

    return {
      hasError,
      errorMessages,
      reviewData,
    };
  }

const validatePartialReview = (data) => {
    const result = registerSchema.partial().safeParse(data);
  
    const {
      hasError,
      errorMessages,
      data: reviewData,
    } = extractValidationData(result);
  
    return {
      hasError,
      errorMessages,
      reviewData,
    };
  }

module.exports = {
    validateReview,
    validatePartialReview
}