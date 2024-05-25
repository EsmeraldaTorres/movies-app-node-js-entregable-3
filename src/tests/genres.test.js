const request = require("supertest");
const app = require("../app");

let id;

test("GET /genres debe traer todos los géneros ", async () => {
  const res = await request(app).get("/genres");
  expect(res.status).toBe(200);
});

test("POST /genres debe crear un género ", async () => {
  const newGenre = {
    name: "comedy",
  };
  const res = await request(app).post("/genres").send(newGenre);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(newGenre.name);
});

test("PUT /genres/:id debe actualizar un género ", async () => {
  const updateGenre = {
    name: "action",
  };
  const res = await request(app)
    .put("/genres/" + id)
    .send(updateGenre);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updateGenre.name);
});

test("DELETE /genres/:id debe eliminar un género ", async () => {
  const res = await request(app).delete("/genres/" + id);
  id = res.body.id;
  expect(res.status).toBe(204);
});
