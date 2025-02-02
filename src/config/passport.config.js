import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import userManager from "../managers/UserManager.js";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleCallbackURL = process.env.GOOGLE_CALLBACK_URL;

const initializePassport = () => {

  // GOOGLE register/login
  passport.use('google',
    new GoogleStrategy({
      clientID: googleClientId,
      clientSecret:googleClientSecret,
      callbackURL:googleCallbackURL
      },
    async(request, accessToken, refreshToken,profile,done)=>{
      console.log("GoogleStrategy: ", profile);

      try {
        const userFound = await userManager.getOneById({ email: profile.emails[0]?.value });
        if(userFound){
          return done(null, userFound)
        }
        console.log("GoogleStrategy - Usuario no está registrado. Registrar");
          //si no existe lo crea
          const newUser = {
            first_name: profile.name.givenName || "",
            last_name: profile.name.familyName || "",
            email: profile.emails[0]?.value || "",
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
    const user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;
