import app from "../index.js";
import supertest from "supertest";
import { expect } from "chai";

const request = supertest(app);

describe("Auth Routes", () => {
  let userToken;

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const response = await request.post("/api/auth/register").send({
        first_name: "Name",
        last_name: "LastName",
        email: "name@gmail.com",
        password: "password123",
        age: 25,
        phone: "+541112345678",
        countryCode: "AR",
      });

      expect(response.statusCode).to.equal(201);
      expect(response._body).to.have.property("success", true);
    });

    it("should not register an existing user", async () => {
      const response = await request.post("/api/auth/register").send({
        first_name: "Name",
        last_name: "LastName",
        email: "name@gmail.com",
        password: "password123",
        age: 25,
        phone: "+541112345678",
        countryCode: "AR",
      });

      expect(response.statusCode).to.equal(401);
      expect(response._body).to.have.property("success", false);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with valid credentials", async () => {
      const response = await request.post("/api/auth/login").send({
        email: "name@gmail.com",
        password: "password123",
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
        email: "name@gmail.com",
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
        "name@gmail.com"
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