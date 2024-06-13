import { Server } from "socket.io";
import ProductManager from "./daos/filesystem/ProductManager.js";

const productManager = new ProductManager();

const initializeSocket = async (httpServer) => {
  const socketServer = new Server(httpServer);

  socketServer.on("connection", (socket) => {
    console.log(`New connection ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Disconnect ${socket.id}`);
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
