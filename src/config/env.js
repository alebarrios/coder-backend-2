import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  mongoUsername: process.env.MONGO_USERNAME,
  mongoPassword: process.env.MONGO_PASSWORD,
  mongoDbName: process.env.MONGO_DBNAME,
  mongoClusterUrl: process.env.MONGO_CLUSTER_URL,
  sessionSecret: process.env.SESSION_SECRET_KEY,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  persistence: process.env.PERSISTENCE
};