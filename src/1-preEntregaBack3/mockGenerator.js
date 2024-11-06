import { faker } from "@faker-js/faker";
import { createHash } from "../utils/hashFunctions.js";
import { PetMockModel } from "./petMock.model.js";
import { UserMockModel } from "./userMock.model.js";

export const generateRandomUsers = async (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    const passwordHash = await createHash("coder123", 10);
    const user = {
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: passwordHash,
      role: Math.random() > 0.5 ? "admin" : "user",
      pets: [],
    };
    users.push(user);
  }
  try {
    const insertedUsers = await UserMockModel.insertMany(users);
    return insertedUsers;
  } catch (error) {
    throw new Error("Error al insertar mascotas en la base de datos");
  }
};

export const generateRandomPets = async (count) => {
  const pets = [];
  for (let i = 0; i < count; i++) {
    const pet = {
      name: faker.animal.petName(),
      type: faker.animal.type(),
      owner: null,
    };
    pets.push(pet);
  }
  try {
    const insertedPets = await PetMockModel.insertMany(pets);
    return insertedPets;
  } catch (error) {
    throw new Error("Error al insertar mascotas en la base de datos");
  }
};
