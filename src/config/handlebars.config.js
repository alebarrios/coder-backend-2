import handlebars from "express-handlebars";
import paths from "../utils/paths.js";

// Configura el servidor para usar Handlebars como motor de plantillas
export const config = (app) => {
    // Registra el motor de plantillas Handlebars
    app.engine("hbs", handlebars.engine({
        layoutsDir: paths.views + '/layouts',
        partialsDir: paths.views + '/partials/',
        extname: 'hbs'
    }));

    const hbs = handlebars.create({});
    hbs.handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
        return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
    });

    // Establece la carpeta donde se encuentran las vistas
    app.set("views", paths.views);

    // Define Handlebars como el motor de vistas por defecto
    app.set("view engine", "hbs");
};