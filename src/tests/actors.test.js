const request = require("supertest");
const app = require("../app");

let id;

test("GET /actors debe traer todos los actores ", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /actors debe crear un actors ", async () => {
  const newActor = {
    firstName: "Esmeralda",
    lastName: "Torres",
    nationality: "México",
    image: "https://image.com",
    birthday: "1997-06-26",
  };
  const res = await request(app).post("/actors").send(newActor);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(newActor.name);
});

test("PUT /actors/:id debe actualizar un actor ", async () => {
  const updateActor = {
    nationality: "Brasil",
  };
  const res = await request(app)
    .put("/actors/" + id)
    .send(updateActor);
  expect(res.status).toBe(200);
  expect(res.body.nationality).toBe(updateActor.nationality);
});

test("DELETE /actors/:id debe eliminar un actor ", async () => {
  const res = await request(app).delete("/actors/" + id);
  id = res.body.id;
  expect(res.status).toBe(204);
});
