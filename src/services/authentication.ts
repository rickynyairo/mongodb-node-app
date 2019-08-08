import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import {
  getUserByUserName,
  comparePassword,
  getUserById
} from "../models/userModel";
import config from "../config";

export const passportLoginStrategy = () => {
  passport.use(
    "login",
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
          console.log("error>>>>>>>", error);
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
    secretOrKey: config.SESSION_SECRET
  };
  passport.use(
    "jwt",
    new JwtStrategy(options, async (jwtPayload, done) => {
      try {
        const user = await getUserById(jwtPayload.id);
        return done(false, user);
      } catch (error) {
        done(error, false);
      }
    })
  );
};
