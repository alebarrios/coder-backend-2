export default class UserDTO {
  #id;
  #first_name;
  #last_name;
  #email;
  #age;
  #cart_id;
  #role;

  constructor(user) {
    this.#id = user._id;
    this.#first_name = user.first_name;
    this.#last_name = user.last_name;
    this.#email = user.email;
    this.#age = user.age;
    this.#cart_id = user.cart_id;
    this.#role = user.role;
  }

  get id() {
    return this.#id;
  }

  get first_name() {
    return this.#first_name;
  }

  get last_name() {
    return this.#last_name;
  }

  get email() {
    return this.#email;
  }

  get age() {
    return this.#age;
  }

  get cart_id() {
    return this.#cart_id;
  }

  get role() {
    return this.#role;
  }

  toJSON() {
    return {
      id: this.#id,
      first_name: this.#first_name,
      last_name: this.#last_name,
      email: this.#email,
      age: this.#age,
      cart_id: this.#cart_id,
      role: this.#role,
    };
  }

}
