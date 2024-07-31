export const authenticated = (req, res, next) => {
  if (req.cookies && req.cookies.access_token) {
    return res.sendUserError(403, { message: "User already authenticated" });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.sendUserError(403, { message: "Access denied. Admins only." });
  }
};
