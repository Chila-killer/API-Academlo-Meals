const z = require('zod')
const { extractValidationData } = require('../../common/utils/extractErrorData')

const registerSchema = z.object({
    name: z.string({invalid_type_error: 'name must be a string', required_error: 'name is required'})
      .min(3, { message: 'name is too short' })
      .max(50, { message: 'name is too long' }),
    address: z.string({ message: 'Invalid e-mail'}),
    rating: z.number().int().min(1).max(5)
})

const validateRestaurant = (data) => {
    const result = registerSchema.safeParse(data);
  
    const {
      hasError,
      errorMessages,
      data: restaurantData
    } = extractValidationData(result);

    return {
      hasError,
      errorMessages,
      restaurantData,
    };
}

const validatePartialRestaurant = (data) => {
  const result = registerSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessages,
    data: restaurantData
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    restaurantData,
  };
}

module.exports = {
    validateRestaurant,
    validatePartialRestaurant
}