import app from "../index.js";
import supertest from "supertest";
import { expect } from "chai";
import {
  adminUser,
  invalidProduct,
  invalidUpdate,
  newProduct,
  regularUser,
  updateData,
  updateDataCart,
  updateDataQuantityNegative,
  updateDataQuantityPositive,
} from "./utilsTest/fieldsTest.js";
import {
  deleteCartById,
  deleteProductById,
  deleteTicketById,
  deleteUserByEmail,
} from "./utilsTest/deleteDataDb.js";

const request = supertest(app);

let userToken;
let productId;
let cartId;
let ticketId;

describe("Auth Routes", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const response = await request.post("/api/auth/register").send(adminUser);
      expect(response.statusCode).to.equal(201);
      expect(response._body).to.have.property("success", true);
    });

    it("should not register an existing user", async () => {
      const response = await request.post("/api/auth/register").send(adminUser);
      expect(response.statusCode).to.be.equal(401);
      expect(response._body).to.have.property("success", false);
      expect(response._body.details.message).to.equal("User already exists");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with valid credentials", async () => {
      const response = await request.post("/api/auth/login").send({
        email: adminUser.email,
        password: adminUser.password,
      });

      expect(response.statusCode).to.equal(200);
      expect(response._body).to.have.property("success", true);
      expect(response._body.payload).to.have.property("token");

      const cookieRes = response.header["set-cookie"][0];
      expect(cookieRes).to.be.ok;
      userToken = {
        name: cookieRes.split("=")[0],
        value: cookieRes.split("=")[1].split(";")[0],
      };
      expect(userToken.name).to.equal("access_token");
      expect(userToken.value).to.be.ok;
    });

    it("should fail to login with invalid credentials", async () => {
      const response = await request.post("/api/auth/login").send({
        email: "wrongemail@gmail.com",
        password: "wrongpassword",
      });

      expect(response.statusCode).to.equal(401);
      expect(response._body).to.have.property("success", false);
    });
  });

  describe("GET /api/auth/current", () => {
    it("should return the current user data when authenticated", async () => {
      const response = await request
        .get("/api/auth/current")
        .set("Cookie", `${userToken.name}=${userToken.value}`);

      expect(response.statusCode).to.equal(200);
      expect(response._body).to.have.property("success", true);
      expect(response._body.payload.user).to.have.property(
        "email",
        adminUser.email
      );
    });

    it("should fail to return user data without authentication", async () => {
      const response = await request.get("/api/auth/current");

      expect(response.statusCode).to.equal(401);
      expect(response._body).to.have.property("success", false);
      expect(response._body.details.message).to.equal("No auth token");
    });
  });

  describe("GET /api/auth/logout", () => {
    it("should log out the user", async () => {
      const response = await request
        .get("/api/auth/logout")
        .set("Cookie", `${userToken.name}=${userToken.value}`);

      expect(response.statusCode).to.equal(200);
      expect(response._body).to.have.property("success", true);
    });
  });
});

describe("Product Routes", () => {
  describe("GET /api/products", () => {
    it("should return a list of products", async () => {
      const response = await request.get("/api/products");
      expect(response.statusCode).to.equal(200);
      expect(response._body.payload.payload).to.be.an("array");
      expect(response._body).to.have.property("success", true);
    });

    it("should return a paginated response", async () => {
      const response = await request.get("/api/products?page=1&limit=5");
      expect(response.statusCode).to.equal(200);
      expect(response._body.payload).to.have.property("info");
      expect(response._body.payload.info).to.have.keys([
        "count",
        "limit",
        "page",
        "totalPages",
        "nextLink",
        "prevLink",
        "hasPrevPage",
        "hasNextPage",
      ]);
    });

    it("should return products filtered by category", async () => {
      const response = await request.get("/api/products?category=kitchen");
      expect(response.statusCode).to.equal(200);
      response._body.payload.payload.forEach((product) =>
        expect(product.category).to.equal("kitchen")
      );
    });
  });

  describe("POST /api/products", () => {
    it("should create a new product", async () => {
      const response = await request
        .post("/api/products")
        .send(newProduct)
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response.statusCode).to.equal(200);
      expect(response._body).to.have.property("success", true);
      expect(response._body.payload).to.have.property("_id");
      productId = response._body.payload._id;
    });

    it("should return validation errors for invalid data", async () => {
      const response = await request
        .post("/api/products")
        .send(invalidProduct)
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response.statusCode).to.equal(400);
      expect(response._body.details.message).to.equal("Validation error");
    });
  });

  describe("GET /api/products/:id", () => {
    it("should return the product details for a valid ID", async () => {
      const response = await request
        .get(`/api/products/${productId}`)
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response.statusCode).to.equal(200);
      expect(response._body).to.have.property("success", true);
      expect(response._body.payload).to.have.property("_id", productId);
    });

    it("should return an error for a non-existent product ID", async () => {
      const response = await request
        .get(`/api/products/000000000000000000000000`)
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response.statusCode).to.equal(404);
      expect(response._body.details.msg).to.equal("Product not found");
    });
  });

  describe("PUT /api/products/:id", () => {
    it("should update an existing product", async () => {
      const response = await request
        .put(`/api/products/${productId}`)
        .send(updateData)
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response.statusCode).to.equal(200);
      expect(response._body).to.have.property("success", true);
      expect(response._body.payload).to.equal("Updated product");
    });

    it("should return validation errors for invalid updates", async () => {
      const response = await request
        .put(`/api/products/${productId}`)
        .send(invalidUpdate)
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response.statusCode).to.equal(400);
      expect(response._body.details.message).to.equal("Validation error");
    });
  });
});

describe("Cart Routes", () => {
  describe("GET /api/carts", () => {
    before(async () => {
      const response = await request.post("/api/auth/login").send({
        email: adminUser.email,
        password: adminUser.password,
      });

      expect(response.statusCode).to.equal(200);
      expect(response._body).to.have.property("success", true);
      expect(response._body.payload).to.have.property("token");

      const cookieRes = response.header["set-cookie"][0];
      expect(cookieRes).to.be.ok;
      userToken = {
        name: cookieRes.split("=")[0],
        value: cookieRes.split("=")[1].split(";")[0],
      };
      expect(userToken.name).to.equal("access_token");
      expect(userToken.value).to.be.ok;
    });
    it("should get all carts as an admin", async () => {
      const response = await request
        .get("/api/carts")
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response.statusCode).to.equal(200);
      expect(response._body.payload).to.be.an("array");
    });
    after(async () => {
      const response = await request
        .get("/api/auth/logout")
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response.statusCode).to.equal(200);
      expect(response._body).to.have.property("success", true);
    });
  });

  describe("GET /api/carts/:cartId", () => {
    before(async function () {
      this.timeout(5000);
      let response = await request.post("/api/auth/register").send(regularUser);
      expect(response.statusCode).to.equal(201);
      expect(response._body).to.have.property("success", true);
      cartId = response._body?.payload?.message?.cart_id;
      expect(cartId).to.exist;

      response = await request.post("/api/auth/login").send({
        email: regularUser.email,
        password: regularUser.password,
      });
      expect(response.statusCode).to.equal(200);
      expect(response._body).to.have.property("success", true);
      expect(response._body.payload).to.have.property("token");

      const cookieRes = response.header["set-cookie"][0];
      expect(cookieRes).to.be.ok;
      userToken = {
        name: cookieRes.split("=")[0],
        value: cookieRes.split("=")[1].split(";")[0],
      };
      expect(userToken.name).to.equal("access_token");
      expect(userToken.value).to.be.ok;
    });
    it("should get a cart by ID", async () => {
      const response = await request
        .get(`/api/carts/${cartId}`)
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response.statusCode).to.equal(200);
      expect(response._body.payload).to.have.property("_id");
    });

    it("should return error for non-existent cart ID", async () => {
      const response = await request
        .get("/api/carts/000000000000000000000000")
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response._body).to.have.property("success", false);
      expect(response.statusCode).to.equal(403);
      expect(response._body.details.message).to.equal(
        "You do not have access to this cart"
      );
    });
  });

  describe("POST /api/carts/:cartId/products/:prodId", () => {
    it("should add a product to a cart", async () => {
      const response = await request
        .post(`/api/carts/${cartId}/products/${productId}`)
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response._body).to.have.property("success", true);
      expect(response.statusCode).to.equal(200);
      expect(response._body.payload).to.have.property("products");
    });

    it("should return error for non-existent product", async () => {
      const response = await request
        .post(`/api/carts/${cartId}/products/000000000000000000000000`)
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response._body).to.have.property("success", false);
      expect(response.statusCode).to.equal(404);
    });
  });

  describe("PUT /api/carts/:cartId", () => {
    it("should update a cart", async () => {
      const response = await request
        .put(`/api/carts/${cartId}`)
        .send(updateDataCart(productId))
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response._body).to.have.property("success", true);
      expect(response.statusCode).to.equal(200);
      expect(response._body.payload).to.have.property("products");
    });
  });

  describe("PUT /api/carts/:cartId/products/:prodId", () => {
    it("should update the quantity of a product in a cart", async () => {  
      const response = await request
        .put(`/api/carts/${cartId}/products/${productId}`)
        .send(updateDataQuantityPositive)
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response.statusCode).to.equal(200);
      expect(response._body.payload).to.equal(
        "Updated quantity product in cart"
      );
    });

    it("should return validation error for invalid quantity", async () => {
      const response = await request
        .put(`/api/carts/${cartId}/products/${productId}`)
        .send(updateDataQuantityNegative)
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response.statusCode).to.equal(400);
      expect(response._body).to.have.property("success", false);
      expect(response._body.details.msg).to.equal(
        "Quantity cannot be negative or zero"
      );
    });
  });

  describe("POST /api/carts/:cartId/purchase", () => {
    it("should finalize the purchase of a cart", async function () {
      this.timeout(5000);
      const response = await request
        .post(`/api/carts/${cartId}/purchase`)
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response._body).to.have.property("success", true);
      expect(response.statusCode).to.equal(200);
      expect(response._body.payload).to.have.keys([
        "code",
        "purchase_datetime",
        "amount",
        "purchaser",
        "_id",
      ]);
      ticketId = response._body?.payload?._id;
    });
  });

  after(async function () {
    this.timeout(10000);

    if (adminUser) {
      await deleteUserByEmail(adminUser.email);
    }

    if (regularUser) {
      await deleteUserByEmail(regularUser.email);
    }

    if (productId) {
      await deleteProductById(productId);
    }

    if (cartId) {
      await deleteCartById(cartId);
    }

    if (ticketId) {
      await deleteTicketById(ticketId);
    }
  });
});
