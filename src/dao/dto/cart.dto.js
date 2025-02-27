export default class CartDTO {
  #products = {};
  #id;

  constructor(cart) {
    this.#products = cart.products;
    this.#id = cart._id;
  }

  get products() {
    return this.#products;
  }

  get id() {
    return this.#id;
  }

}
