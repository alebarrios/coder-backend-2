import env from "./env.js";
import session from "express-session";
import MongoStore from "connect-mongo";

// Configura el servidor para usar Handlebars como motor de plantillas
export const configSession = (app, ttl) => {
    app.use(
        session({
          store: MongoStore.create({
            mongoUrl:
            `mongodb+srv://${env.mongoUsername}:${env.mongoPassword}@${env.mongoClusterUrl}/${env.mongoDbName}`,
            ttl,
          }),
          secret: env.sessionSecret,
          resave: false,
          saveUninitialized: false,
        })
      );
};