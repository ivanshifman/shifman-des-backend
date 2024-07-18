import passport from "passport";

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(
      strategy,
      { session: false },
      (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          const errorMessage = info?.message || info?.toString() || "Unauthorized";
          return res.status(401).send({ message: errorMessage });
        }
        req.user = user;
        next();
      }
    )(req, res, next);
  };
};
