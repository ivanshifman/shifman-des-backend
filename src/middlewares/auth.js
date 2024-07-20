export const authenticated = (req, res, next) => {
  if (req.cookies && req.cookies.access_token) {
    return res.status(403).json({ message: "User already authenticated" });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).send({ msg: 'Access denied. Admins only.' });
  }
};
