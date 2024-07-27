// {
// 		status: 500,
// 		message: "Something went wrong",
// 		data:
// 		// конкретне повідомлення про помилку, отримане з об'єкта помилки
// }
import { isHttpError } from 'http-errors';

export const errorHandler = (error, _req, res, _next) => {
  if (isHttpError(error) === true) {
    return res.status(error.status).send({
      status: error.status,
      message: error.message,
    });
  }

  res.status(500).send({
    status: 500,
    message: 'Something went wrong',
    data: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
  });
};
