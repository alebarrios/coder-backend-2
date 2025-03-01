export default class TicketDTO {
  #id;
  #code;
  #amount;
  #purchaser;
  #purchased_datetime;

  constructor(ticket) {
    this.#id = ticket._id;
    this.#code = ticket.code;
    this.#amount = ticket.amount;
    this.#purchaser = ticket.purchaser;
    this.#purchased_datetime = ticket.purchased_datetime;
  }

  get id() {
    return this.#id;
  }

  get code() {
    return this.#code;
  }

  get amount() {
    return this.#amount;
  }

  get purchaser() {
    return this.#purchaser;
  }

  get purchased_datetime() {
    return this.#purchased_datetime;
  }

  toJSON() {
    return {
      id: this.#id,
      code: this.#code,
      amount: this.#amount,
      purchaser: this.#purchaser,
      purchased_datetime: this.#purchased_datetime,
    };
  }

}
