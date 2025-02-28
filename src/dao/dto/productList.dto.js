import ProductDTO from "./product.dto.js";

export default class ProductListDTO {
  #productList = [];
  #totalPages = 0;
  #page = 0;
  #hasNextPage = false;
  #hasPrevPage = false;
  #prevPage = 0;
  #nextPage = 0;
  #prevLink = "";
  #nextLink = "";

  constructor(products) {
    products.docs.map((product) => {
      this.#productList.push(new ProductDTO(product));
    });
    this.#totalPages = products.totalPages;
    this.#page = products.page;
    this.#hasNextPage = products.hasNextPage;
    this.#hasPrevPage = products.hasPrevPage;
    this.#prevPage = products.prevPage;
    this.#nextPage = products.nextPage;
    this.#prevLink = products.prevPage ? "&page=" + products.prevPage : null;
    this.#nextLink = products.nextPage ? "&page=" + products.nextPage : null;
  }

  toJSON() {
    return {
      docs: this.#productList,
      totalPages: this.#totalPages,
      page: this.#page,
      hasPrevPage: this.#hasPrevPage,
      hasNextPage: this.#hasNextPage,
      prevPage: this.#prevPage,
      nextPage: this.#nextPage,
      prevLink: this.#prevLink,
      nextLink: this.#nextLink,
    };
  }

}
