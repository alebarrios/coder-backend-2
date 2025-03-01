import ErrorManager from "../managers/ErrorManager.js";
import TicketDTO from "../dao/dto/ticket.dto.js";

export default class TicketsRepository {
    #ticketsDao;

    constructor(dao) {
        this.#ticketsDao = dao;
    }

    // Crea un nuevo ticket
    async insertOne(data) {
        try {
            const ticket = await this.#ticketsDao.post(data);
            return new TicketDTO(ticket);

        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

}