const app = require("../app");

const request = require("supertest");
const Genre = require("../models/Genre");
const Director = require("../models/Director");
const Actor = require("../models/Actor");

let id;

test("GET /movies debe traer todas las películas ", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /movies debe crear una película ", async () => {
  const newAlbum = {
    name: "Barbie",
    releaseYear: 2023,
    synopsis:
      "Después de ser expulsada de Barbieland por no ser una muñeca de aspecto perfecto, Barbie parte hacia el mundo humano para encontrar la verdadera felicidad.",
    image: "https://image.com",
  };
  const res = await request(app).post("/movies").send(newAlbum);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(newAlbum.name);
});

test("PUT /movies/:id debe actualizar un artista ", async () => {
  const updateAlbum = {
    image: "https://image-barbie.com",
  };
  const res = await request(app)
    .put("/movies/" + id)
    .send(updateAlbum);
  expect(res.status).toBe(200);
  expect(res.body.image).toBe(updateAlbum.image);
});

test("POST /movies/:id/actors debe insertar los actores de una película ", async () => {
  const actor = await Actor.create({
    firstName: "Margot",
    lastName: "Robbie",
    nationality: "Australia",
    image: "https://images.com",
    birthday: "1991-06-19",
  });
  const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBe(1);
});

test("POST /movies/:id/directors debe insertar los directores de una película ", async () => {
  const director = await Director.create({
    firstName: "Greta",
    lastName: "Gerwig",
    nationality: "estadounidense",
    image: "https://image.com",
    birthday: "1989-01-23",
  });
  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBe(1);
});

test("POST /movies/:id/genres debe insertar los géneros de una película ", async () => {
  const genre = await Genre.create({
    name: "pop",
  });
  const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
  expect(res.body.length).toBe(1);
});

test("DELETE /movies/:id debe eliminar una película ", async () => {
  const res = await request(app).delete("/movies/" + id);
  id = res.body.id;
  expect(res.status).toBe(204);
});
