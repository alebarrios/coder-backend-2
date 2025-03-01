import UsersRepository from '../repositories/users.repository.js'
import Factory from '../dao/factory.js'

export const userService = new UsersRepository(Factory.UsersDao)