import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import {
  getUserByUserName,
  comparePassword,
  getUserById
} from "../models/userModel";
import config from "../config";

export const passportLocalStrategy = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "userName" },
      async (userName: string, password: string, done) => {
        try {
          const user = await getUserByUserName(userName);
          if (!user) {
            return done(null, false, {
              message: "Invalid Username or Password"
            });
          }
          const isMatch = await comparePassword(password, user.password);
          return isMatch
            ? done(null, user)
            : done(null, false, { message: "Invalid Username or Password" });
        } catch (error) {
          done(error, null);
          throw error;
        }
      }
    )
  );
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await getUserById(id);
      done(user);
    } catch (error) {
      done(error, null);
    }
  });
};

export const passportJwtStrategy = () => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SESSION_SECRET,
    issuer: "accounts.nyairo.com",
    audience: "nyairo.com"
  };
  passport.use(
    new JwtStrategy(options, async (jwtPayload, done) => {
      try {
        const user = await getUserById(jwtPayload.id);
        console.log("jwt here:", user);
        done(false, user);
      } catch (error) {
        console.log("jwt error:", error);
        done(error, false);
        throw error;
      }
    })
  );
};
