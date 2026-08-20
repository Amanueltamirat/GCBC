export const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not found — ${req.originalUrl}`));
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).send({ message: err.message || 'Server error.' });
};
