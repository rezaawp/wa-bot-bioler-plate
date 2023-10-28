module.exports = (
  res,
  status,
  { message = null, error = null, data = null }
) => {
  return res.status(status).json({
    message,
    data,
    error,
  });
};
