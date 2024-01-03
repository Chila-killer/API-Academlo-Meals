const z = require('zod')
const { extractValidationData } = require('../../common/utils/extractErrorData')

const registerSchema = z.object({
    quantity: z.number().int().min(1),
    mealId: z.number().int()
})

const validateOrder = (data) => {
    const result = registerSchema.safeParse(data);
  
    const {
      hasError,
      errorMessages,
      data: orderData
    } = extractValidationData(result);

    return {
      hasError,
      errorMessages,
      orderData,
    };
}

const validatePartialOrder = (data) => {
  const result = registerSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessages,
    data: orderData
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    orderData,
  };
}

module.exports = {
    validateOrder,
    validatePartialOrder
}