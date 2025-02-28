import ProductsRepository from '../repositories/products.repository.js'
import Factory from '../dao/factory.js'

export const productService = new ProductsRepository(Factory.ProductsDao)