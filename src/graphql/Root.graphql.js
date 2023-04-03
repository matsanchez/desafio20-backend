import { userService, productService, cartService, orderService } from "../services/index.service.js";

export const rootGraphql = {
  getProducts: () => productService.get(),
  getProductById: (id) => productService.getById(id._id),
  deleteProductById: (id) => productService.delete(id), // Revisar que no anda!!!
  createProduct: (data) => productService.save(data),
  createCart: () => cartService.save(),
  getCart: (id) => cartService.getById(id._id),
  //addProductToCart: async (id, product) => {},
};
