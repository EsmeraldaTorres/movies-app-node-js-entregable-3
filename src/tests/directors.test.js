const request = require("supertest");
const app = require("../app");

let id;

test("GET /directors debe traer todos los directores ", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /directors debe crear un directores ", async () => {
  const newActor = {
    firstName: "James",
    lastName: "Cameron",
    nationality: "Estados Unidos",
    image: "https://image.com",
    birthday: "1972-11-22",
  };
  const res = await request(app).post("/directors").send(newActor);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(newActor.name);
});

test("PUT /directors/:id debe actualizar un director ", async () => {
  const updateActor = {
    firstName: "James Francis",
  };
  const res = await request(app)
    .put("/directors/" + id)
    .send(updateActor);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updateActor.firstName);
});

test("DELETE /directors/:id debe eliminar un director ", async () => {
  const res = await request(app).delete("/directors/" + id);
  id = res.body.id;
  expect(res.status).toBe(204);
});
