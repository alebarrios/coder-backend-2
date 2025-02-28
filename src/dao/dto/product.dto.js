export default class ProductDTO {
  #id;
  #title;
  #description;
  #price;
  #stock;
  #category;
  #code;
  #status;

  constructor(product) {
    this.#id = product._id;
    this.#title = product.title;
    this.#description = product.description;
    this.#price = product.price;
    this.#stock = product.stock;
    this.#category = product.category;
    this.#code = product.code;
    this.#status = product.status;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get description() {
    return this.#description;
  }

  get price() {
    return this.#price;
  }

  get stock() {
    return this.#stock;
  }

  get category() {
    return this.#category;
  }

  get code() {
    return this.#code;
  }

  get status() {
    return this.#status;
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      price: this.#price,
      stock: this.#stock,
      category: this.#category,
      code: this.#code,
      status: this.#status,
    };
  }

}
