import session from "express-session";
import MongoStore from "connect-mongo";
import { config } from "dotenv";

config();

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const dbName = process.env.MONGO_DBNAME;
const clusterUrl = process.env.MONGO_CLUSTER_URL;
const session_secret_key = process.env.SESSION_SECRET_KEY;

// Configura el servidor para usar Handlebars como motor de plantillas
export const configSession = (app, ttl) => {
    app.use(
        session({
          store: MongoStore.create({
            mongoUrl: `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}`,
            ttl,
          }),
          secret: session_secret_key,
          resave: false,
          saveUninitialized: false,
        })
      );
};