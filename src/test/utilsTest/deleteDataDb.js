import { UserModel } from "../../daos/mongoDB/models/user.model.js";
import { ProductModel } from "../../daos/mongoDB/models/product.model.js";
import { CartModel } from "../../daos/mongoDB/models/cart.model.js";
import { TicketModel } from "../../daos/mongoDB/models/ticket.model.js";
import { logger } from "../../utils/loggers/logger.js";

export const deleteUserByEmail = async (email) => {
    if (email) {
      const user = await UserModel.findOne({ email });
      if (user) {
        await UserModel.deleteOne({ email });
        logger.info(`User with email ${email} deleted`);
      }
    }
  }
  
  export const deleteProductById = async (productId) => {
    if (productId) {
      const product = await ProductModel.findById(productId);
      if (product) {
        await ProductModel.deleteOne({ _id: productId });
        logger.info(`Product with Id ${productId} deleted`);
      }
    }
  }
  
  export const deleteCartById = async (cartId) => {
    if (cartId) {
      const cart = await CartModel.findById(cartId);
      if (cart) {
        await CartModel.deleteOne({ _id: cartId });
        logger.info(`Cart with Id ${cartId} deleted`);
      }
    }
  }
  
  export const deleteTicketById = async (ticketId) => {
    if (ticketId) {
      const ticket = await TicketModel.findById(ticketId);
      if (ticket) {
        await TicketModel.deleteOne({ _id: ticketId });
        logger.info(`Ticket with Id ${ticketId} deleted`);
      }
    }
  }