import TicketModel from "./models/ticket.model.js";

export default class TicketsDAO{

    post = async (data)=>{

        const ticket = await TicketModel.create(data);
        return ticket;

    }

}