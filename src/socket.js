import { Server } from "socket.io";
import ProductManager from "./daos/filesystem/ProductManager.js";
import { logger } from "./utils/loggers/logger.js";

const productManager = new ProductManager();

const initializeSocket = async (httpServer) => {
  const socketServer = new Server(httpServer);

  socketServer.on("connection", (socket) => {
    logger.info(`New connection ${socket.id}`);

    socket.on("disconnect", () => {
      logger.info(`Disconnect ${socket.id}`);
    });

    socket.on("requestProducts", async () => {
      const products = await productManager.getProducts();
      socket.emit("productsAll", products);
    });

    socket.on("newProduct", async (prod) => {
      await productManager.addProducts(prod);
      const products = await productManager.getProducts();
      socketServer.emit("productsAll", products);
    });

    socket.on("deleteProduct", async (btnId) => {
      await productManager.deleteProducts(btnId);
      const products = await productManager.getProducts();
      socketServer.emit("productsAll", products);
    });
  });
};

export default initializeSocket;
