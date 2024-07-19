export const authenticated = (req, res, next) => {
  if (req.cookies && req.cookies.access_token) {
    return res.status(403).json({ message: "User already authenticated" });
  }
  next();
};
