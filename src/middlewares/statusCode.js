export const getCustomResponses = (req, res, next) => {
  res.sendSuccess = (status, payload) =>
    res.status(status).json({ success: true, payload });
  res.sendServerError = (status, error) =>
    res.status(status).json({ success: false, details: error.message });
  res.sendUserError = (status, msg) =>
    res.status(status).json({ success: false, msg });

  next();
};
