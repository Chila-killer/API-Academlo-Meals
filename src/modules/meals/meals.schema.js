const z = require('zod')
const { extractValidationData } = require('../../common/utils/extractErrorData')

const registerSchema = z.object({
    name: z.string({invalid_type_error: 'name must be a string', required_error: 'name is required'})
      .min(3, { message: 'name is too short' })
      .max(50, { message: 'name is too long' }),
    price: z.number({invalid_type_error: 'price must be a number', required_error: 'price is required'})
})

const validateMeal = (data) => {
    const result = registerSchema.safeParse(data);
  
    const {
      hasError,
      errorMessages,
      data: mealData
    } = extractValidationData(result);

    return {
      hasError,
      errorMessages,
      mealData,
    };
}

const validatePartialMeal = (data) => {
  const result = registerSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessages,
    data: mealData
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    mealData,
  };
}

module.exports = {
    validateMeal,
    validatePartialMeal
}