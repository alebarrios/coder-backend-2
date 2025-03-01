import TicketsRepository from '../repositories/tickets.repository.js'
import Factory from '../dao/factory.js'

export const ticketService = new TicketsRepository(Factory.TicketsDao)