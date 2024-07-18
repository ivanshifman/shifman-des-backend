import * as services from "../services/user.services.js";
import passport from "passport";
import local from "passport-local";

const LocalStrategy = local.Strategy;

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const existingUser = await services.getUserByEmail(email);
        if (existingUser) {
          return done(null, false, { message: "User already exists" });
        }
        const hashPassword = await createHash(password);
        const newUser = await services.register({
          ...req.body,
          password: hashPassword,
        });
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email"},
    async (email, password, done) => {
      try {
        const user = await services.login({ email, password });
        if (!user) {
          return done(null, false, { message: "Incorrect email or password" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
