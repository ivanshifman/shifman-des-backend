import { Router } from "express";
import { generateRandomPets, generateRandomUsers } from "./mockGenerator.js";

const routerMock = Router();

routerMock.get("/mockingpets", async (req, res) => {
  try {
    const pets = await generateRandomPets(100);
    res.sendSuccess(200, pets);
  } catch (error) {
    res.sendServerError(500, error);
  }
});

routerMock.get("/mockingusers", async (req, res) => {
  try {
    const users = await generateRandomUsers(50);
    res.sendSuccess(200, users);
  } catch (error) {
    res.sendServerError(500, error);
  }
});

routerMock.post("/generateData", async (req, res) => {
  const { users: userCount, pets: petCount } = req.body;

  if (
    typeof userCount !== "number" ||
    isNaN(userCount) ||
    userCount <= 0 ||
    typeof petCount !== "number" ||
    isNaN(petCount) ||
    petCount <= 0
  ) {
    return res.sendUserError(400, {
      msg: "Los parámetros users y pets deben ser números positivos.",
    });
  }

  try {
    const createdUsers = await generateRandomUsers(userCount);
    const createdPets = await generateRandomPets(petCount);

    res.sendSuccess(200, {
      message: "Datos generados correctamente",
      users: createdUsers,
      pets: createdPets,
    });
  } catch (error) {
    res.sendServerError(500, error);
  }
});

export default routerMock;
