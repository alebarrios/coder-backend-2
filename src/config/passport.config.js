import env from "./env.js";
import passport from "passport";
import jwt from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import local from "passport-local";
import { createHash } from "../utils/cryptUtils.js";
import { userService } from '../services/UserService.js';
import { cartService } from '../services/CartService.js';

const googleCallbackURL = "http://localhost:3000/auth/google/callback"

const initializePassport = () => {

  passport.use(
    "register",
    new local.Strategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        console.log("LocalStrategy: ", req.body);

        const { first_name, last_name, age, email } = req.body;
        try {
          const userFound = await userService.findOneByEmail(username);
          if (userFound) {
            console.log("Usuario ya existe");
            return done(null, false);
          }

          const newCart = await cartService.insertOne({});
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            cart_id: newCart.id,
            role: req.body?.role || "user",
            password: createHash(password),
          };
          console.log("Creando usuario...", newUser);
          const user = await userService.insertOne(newUser);

          return done(null, user);
        } catch (error) {
          return done(`Error al crear el usuario ${error}`, false);
        }
      }
    )
  );

  passport.use(
    "login",
    new local.Strategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const userFound = await userService.validateEmailAndPass(username, password, false);
          if (!userFound) {
            console.log("Local Strategy - login - Usuario o Contraseña incorrecta");

            return done(null, false);
          } else {
            req.session.user = userFound.toJSON();
            console.log("Local Strategy - login user: " , req.session.user);

            return done(null, userFound);
          }
        } catch (error) {
          return done(error.message);
        }
      }
    )
  );
  // GOOGLE register/login
  passport.use('google',
    new GoogleStrategy({
      clientID: env.googleClientId,
      clientSecret: env.googleClientSecret,
      callbackURL:googleCallbackURL,
      },
    async(request, accessToken, refreshToken,profile,done)=>{

      try {
        const userFound = await userService.findOneByEmail(profile.emails[0]?.value);
        if(userFound){
          console.log("GoogleStrategy - Usuario encontrado -> Products");
          return done(null, userFound)
        }
        console.log("GoogleStrategy - Usuario no está registrado. Registrar");
        const newCart = await cartService.insertOne({});
        console.log("new cart: ", newCart);
        console.log("id: ", newCart.id);
        
          //si no existe lo crea
          const newUser = {
            first_name: profile.name.givenName || "",
            last_name: profile.name.familyName || "",
            email: profile.emails[0]?.value || "",
            age: 18,
            cart_id: newCart.id,
            password: "", // Dejar vacío ya que la autenticación es con Google
          };

         const user= await userService.insertOne(newUser)
         return done(null, user)
      } catch (error) {
        return done(error)
      }
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userService.findOneById(id);
    done(null, user);
  });

  passport.use(
    "jwt",
    new jwt.Strategy(
      {
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: env.sessionSecret, //la misma que pase en utils al sign
      },
      async (jwt_payload, done) => {
        const userDTO = await userService.findOneById(jwt_payload.id);
        try {
          return done(null, userDTO);//user o false
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

const cookieExtractor = (req) => {
  let token = null;
  if (req?.cookies) {
    token = req.cookies["authCookie"];
  }
  console.log("cookieExtractor - token: ", token);
  return token;
};

export default initializePassport;
