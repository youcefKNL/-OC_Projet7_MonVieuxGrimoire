const request = require("supertest");
const app = require("../app");
const User = require("../models/User.model");

describe("Test des routes utilisateur", () => {
  test('La route "/signup" devrait retourner un code de statut 200', async () => {
    const response = await request(app).post("/signup").send({
      email: "testuser@example.com",
      password: "Test1234",
    });
    expect(response.status).toBe(200);
  });

  test('La route "/signup" devrait retourner un token d\'accès', async () => {
    const response = await request(app).post("/signup").send({
      email: "testuser@example.com",
      password: "Test1234",
    });
    expect(response.body.token).toBeDefined();
  });

  test('La route "/login" devrait retourner un code de statut 200', async () => {
    const response = await request(app).post("/login").send({
      email: "testuser@example.com",
      password: "Test1234",
    });
    expect(response.status).toBe(200);
  });

  test('La route "/login" devrait retourner un token d\'accès', async () => {
    const response = await request(app).post("/login").send({
      email: "testuser@example.com",
      password: "Test1234",
    });
    expect(response.body.token).toBeDefined();
  });
});

// Nettoyer la base de données après les tests
afterAll(async () => {
  await User.deleteMany();
});
