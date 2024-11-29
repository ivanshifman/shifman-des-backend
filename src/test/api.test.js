import app from "../index.js";
import supertest from "supertest";
import { expect } from "chai";
import { adminUser, regularUser } from "./userExample/userExample.js";

const request = supertest(app);

let userToken;
let productId;
let cartId;

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
      const newProduct = {
        title: "Test Product",
        description: "A test product",
        code: "TEST123",
        price: 100,
        stock: 50,
        category: "kitchen",
      };

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
      const invalidProduct = {
        title: "",
        price: -5,
      };

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
      const updateData = {
        title: "Updated Product",
        price: 120,
      };

      const response = await request
        .put(`/api/products/${productId}`)
        .send(updateData)
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response.statusCode).to.equal(200);
      expect(response._body).to.have.property("success", true);
      expect(response._body.payload).to.equal("Updated product");
    });

    it("should return validation errors for invalid updates", async () => {
      const invalidUpdate = {
        price: -10,
      };

      const response = await request
        .put(`/api/products/${productId}`)
        .send(invalidUpdate)
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response.statusCode).to.equal(400);
      expect(response._body.details.message).to.equal("Validation error");
    });
  });

  describe("DELETE /api/products/:id", () => {
    it("should delete an existing product", async () => {
      const response = await request
        .delete(`/api/products/${productId}`)
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response.statusCode).to.equal(200);
      expect(response._body).to.have.property("success", true);
      expect(response._body.payload).to.equal("Product deleted");
    });

    it("should return an error for non-existent product ID", async () => {
      const response = await request
        .delete(`/api/products/000000000000000000000000`)
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response.statusCode).to.equal(404);
      expect(response._body.details.msg).to.equal("Product not found");
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
    before(async () => {
      let response = await request.post("/api/auth/register").send(regularUser);
      expect(response.statusCode).to.equal(201);
      expect(response._body).to.have.property("success", true);
      cartId = response._body.payload.message.cart_id
      console.log(response_body);
      console.log(cartId);
      
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
      //
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
      expect(response._body.payload).to.equal("Product added to cart");
    });

    it("should return error for non-existent product", async () => {
      const response = await request
        .post(`/api/carts/${cartId}/products/000000000000000000000000`)
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response._body).to.have.property("success", false);
      expect(response.statusCode).to.equal(400);
    });
  });

  describe("PUT /api/carts/:cartId", () => {
    it("should update a cart", async () => {
      const updateData = {
        products: [
          {
            product: productId,
            quantity: 2,
          },
        ],
      };

      const response = await request
        .put(`/api/carts/${cartId}`)
        .send(updateData)
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response._body).to.have.property("success", true);
      expect(response.statusCode).to.equal(200);
      expect(response._body.payload).to.have.property("products");
    });
  });

  describe("PUT /api/carts/:cartId/products/:prodId", () => {
    it("should update the quantity of a product in a cart", async () => {
      const updateData = { quantity: 3 };

      const response = await request
        .put(`/api/carts/${cartId}/products/${productId}`)
        .send(updateData)
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response.statusCode).to.equal(200);
      expect(response._body.payload).to.equal(
        "Updated quantity product in cart"
      );
    });

    it("should return validation error for invalid quantity", async () => {
      const updateData = { quantity: -1 };

      const response = await request
        .put(`/api/carts/${cartId}/products/${productId}`)
        .send(updateData)
        .set("Cookie", `${userToken.name}=${userToken.value}`);
      expect(response.statusCode).to.equal(400);
      expect(response._body).to.have.property("success", false);
      expect(response._body.details.message).to.equal(
        "Error update product quantity to cart"
      );
    });
  });

  describe("POST /api/carts/:cartId/purchase", () => {
    it("should finalize the purchase of a cart", async () => {
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
    });
  });
});
