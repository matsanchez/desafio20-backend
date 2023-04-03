import loggerApp from "../utils/logger.utils.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";

mongoose.set("strictQuery", false);

export default class ModelsMongoDAO {
  constructor(config) {
    this.mongoose = mongoose
      .connect(config.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch((error) => {
        loggerApp.error(error);
        process.exit();
      });

    const userSchema = mongoose.Schema(User.schema);
    const productSchema = mongoose.Schema(Product.schema);
    const cartSchema = mongoose.Schema(Cart.schema);
    const orderSchema = mongoose.Schema(Order.schema);

    this.models = {
      [User.model]: mongoose.model(User.model, userSchema),
      [Product.model]: mongoose.model(Product.model, productSchema),
      [Cart.model]: mongoose.model(Cart.model, cartSchema),
      [Order.model]: mongoose.model(Order.model, orderSchema),
    };
  }

  get = async (options, entity) => {
    if (!this.models[entity]) throw new Error("Entity not found in models");
    let results = await this.models[entity].find(options).lean();
    return results;
  };

  getById = async (options, entity) => {
    let result = await this.models[entity].findOne({ _id: options }).lean();
    return result;
  };

  create = async (document, entity) => {
    let results = await this.models[entity].create(document);
    return results;
  };

  delete = async (params, entity) => {
    let result = await this.models[entity].deleteOne({ _id: params });
    return result;
  };

  update = async (id, body, entity) => {
    let result = await this.models[entity].updateOne({ _id: id }, body);
    return result;
  };

  deleteAll = async (id_cart, entity) => {
    try {
      await this.models[entity].findByIdAndUpdate(id_cart, { products: [] });
      return;
    } catch (error) {
      loggerApp.error(error);
    }
  };

  createProductInCart = async (id, document, entity) => {
    if (id) {
      try {
        let list = [];
        const dataObj = await this.models[entity].findOne({ _id: id }).lean();
        list.push(...dataObj.products);
        list.push(document);
        return this.models[entity].updateOne({ _id: id }, { products: list });
      } catch (error) {
        loggerApp.error(error);
      }
    }
  };

  deleteProductInCart = async (id_cart, id_prod, entity) => {
    try {
      let list = [];
      let newList = [];
      const dataObj = await this.models[entity].findOne({ _id: id_cart }).lean();
      list.push(...dataObj.products);
      for (let i = 0; i <= list.length - 1; i++) {
        if (list[i]._id.toString() != id_prod) {
          newList.push(list[i]);
        }
      }
      return this.models[entity].updateOne({ _id: id_cart }, { products: newList });
    } catch (error) {
      loggerApp.error(error);
    }
  };

  createOrder = async (params, products, total, entity) => {
    try {
      const order = await this.models[entity].create({
        name: params.user.name,
        email: params.user.username,
        products: products.products,
        total: total,
      });
      return order;
    } catch (error) {
      loggerApp.error(error);
    }
  };
}
