import env from "../config/env.js";
import { connectDB } from "../config/mongoose.config.js";

const DaoFactory = {
  CartsDao: null,
  ProductsDao: null,
  UsersDao: null,
};

switch (env.persistence) {
  case "MONGO": {
    connectDB();
    const { default: CartMongo } = await import("./mongo/carts.mongo.dao.js");
    DaoFactory.CartsDao = new CartMongo();
    const { default: ProductMongo } = await import("./mongo/products.mongo.dao.js");
    DaoFactory.ProductsDao = new ProductMongo();
    break;
  }
  case "MEMORY": {
    break;
  }
}
export default DaoFactory;
