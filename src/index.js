import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import homeRouter from "./routes/home.router.js";
import realTimeProductsRouter from "./routes/realTimeProducts.router.js";
import ProductManager from "./controllers/ProductManager.js";

const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () =>
  console.log(`Server in port ${PORT}`)
);

const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", homeRouter);
app.use("/realTimeProducts", realTimeProductsRouter);

const productManager = new ProductManager();

socketServer.on('connection', (socket) => {
    console.log(`New connection ${socket.id}`)

    socket.on('disconnect', ()=> {
        console.log(`Disconnect ${socket.id}`)
    })

    socket.on('requestProducts', async () => {
      const products = await productManager.getProducts();
      socket.emit('productsAll', products);
    });

    socket.on('newProduct', async (prod) => {
      await productManager.addProducts(prod);
      const products = await productManager.getProducts();
      socketServer.emit('productsAll', products)
    })
})