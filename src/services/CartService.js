import CartsRepository from '../repositories/carts.repository.js'
import CartFactory from '../dao/factory.js'

export const cartService = new CartsRepository(CartFactory.CartsDao)