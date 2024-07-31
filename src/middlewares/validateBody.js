import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });

    next();
  } catch (error) {
    //   const error = createHttpError(400, error.details[0].message);
    console.log(error.details);
    next(
      createHttpError(
        400,
        error.details.map((error) => error.message).join(', '),
      ),
    );
  }
};
