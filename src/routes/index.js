const express = require("express");
const router = express.Router();
const movieRouter = require("./movie.router");
const actorRouter = require("./actor.router");
const genreRouter = require("./genre.router");
const directorRouter = require("./director.router");

// colocar las rutas aquí
router.use(movieRouter);
router.use(actorRouter);
router.use(genreRouter);
router.use(directorRouter);

module.exports = router;
