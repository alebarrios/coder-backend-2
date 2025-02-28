import env from "./config/env.js";
import express from "express";
import cookieParser from "cookie-parser";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import productsViewRouter from "./routes/products.view.router.js";
import cartsViewRouter from "./routes/carts.view.router.js";
import usersViewRouter from "./routes/users.view.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import { config as configHandlebars } from "./config/handlebars.config.js";
//import { connectDB } from "./config/mongoose.config.js";
import { configSession } from "./config/session.config.js";
import initializePassport from "./config/passport.config.js";
import passport from "passport";

const app = express();
const PORT = env.port || 3000;
const SESSION_TTL = 100;
// Conexión con la Base de Datos del Cloud de MongoDB
//connectDB();


app.use("/api/public", express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

configHandlebars(app);
configSession(app, SESSION_TTL);
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/products', productsViewRouter);
app.use('/carts', cartsViewRouter);
app.use('/', usersViewRouter);

// API
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
sessionsRouter(app);


app.use("*", (req, res) => {
    res.status(404).render('error404', {layout : 'index', style: 'index.css', title: 'Error 404'});
});

const httpServer = app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});

export default app;