import passport from "passport";
import jwt from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils/cryptUtils.js";
import UserManager from "../managers/UserManager.js";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleCallbackURL = "http://localhost:3000/auth/google/callback"

const initializePassport = () => {
  const userManager = new UserManager();

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
          const userFound = await userManager.getOneByEmail(username);
          if (userFound) {
            console.log("Usuario ya existe");
            return done(null, false);
          }
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            cart_id: null,
            role: req.body?.role || "user",
            password: createHash(password),
          };
          console.log("Creando usuario...", newUser);
          const user = await userManager.insertOne(newUser);

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
          const userExist = await userManager.getOneByEmail(username);
          if (!userExist){
            console.log("Local Strategy - login - Usuario no encontrado");
            return done(null, false);
          }

          const isValid = isValidPassword(password, userExist.password);
          if (!isValid) {
            console.log("Local Strategy - login - Contraseña incorrecta");

            return done(null, false);
          } else {
            req.session.user = {
              first_name: userExist.first_name,
              last_name: userExist.last_name,
              email: userExist.email,
            };
            console.log("Local Strategy - login user: " , req.session.user);

            return done(null, userExist);
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
      clientID: googleClientId,
      clientSecret:googleClientSecret,
      callbackURL:googleCallbackURL,
      },
    async(request, accessToken, refreshToken,profile,done)=>{

      try {
        const userFound = await userManager.getOneByEmail(profile.emails[0]?.value);
        if(userFound){
          console.log("GoogleStrategy - Usuario encontrado -> Products");
          return done(null, userFound)
        }
        console.log("GoogleStrategy - Usuario no está registrado. Registrar");
          //si no existe lo crea
          const newUser = {
            first_name: profile.name.givenName || "",
            last_name: profile.name.familyName || "",
            email: profile.emails[0]?.value || "",
            age: 18,
            cart_id: null,
            password: "", // Dejar vacío ya que la autenticación es con Google
          };

         const user= await userManager.insertOne(newUser)
         return done(null, user)
      } catch (error) {
        return done(error)
      }
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userManager.findOneById(id);
    done(null, user);
  });

  passport.use(
    "jwt",
    new jwt.Strategy(
      {
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.SESSION_SECRET_KEY, //la misma que pase en utils al sign
      },
      async (jwt_payload, done) => {
        console.log("jwt.Strategy - jwt_payload: ", jwt_payload);

        try {
          return done(null, jwt_payload);//user o false
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["authCookie"];
  }
  return token;
};

export default initializePassport;
