import env from "../config/env.js";
import { connectDB } from "../config/mongoose.config.js";

const DaoFactory = {
  CartsDao: null,
  ProductsDao: null,
  UsersDao: null,
  TicketsDao: null,
};

switch (env.persistence || "MONGO") {
  case "MONGO": {
    connectDB();
    const { default: CartMongo } = await import("./mongo/carts.mongo.dao.js");
    DaoFactory.CartsDao = new CartMongo();
    const { default: ProductMongo } = await import("./mongo/products.mongo.dao.js");
    DaoFactory.ProductsDao = new ProductMongo();
    const { default: UserMongo } = await import("./mongo/users.mongo.dao.js");
    DaoFactory.UsersDao = new UserMongo();
    const { default: TicketMongo } = await import("./mongo/tickets.mongo.dao.js");
    DaoFactory.TicketsDao = new TicketMongo();
    break;
  }
  case "MEMORY": {
    break;
  }
}
export default DaoFactory;
