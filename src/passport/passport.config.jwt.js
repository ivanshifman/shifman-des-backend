import * as services from "../services/user.services.js";
import passport from "passport";
import jwt from "passport-jwt";
import "dotenv/config";
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.SECRET_KEY_JWT,
};

function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }

  return token;
}

export const initializePassportJwt = () => {
  passport.use(
    "current",
    new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
      try {
        const user = await services.getUserById(jwtPayload._id);
        if (!user) return done(null, false, { message: "User not found" });
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
