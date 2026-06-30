const express = require("express");

const router = express.Router();

const filmController = require("../controllers/filmController");

const auth = require("../middleware/auth");

const admin = require("../middleware/admin");

router.get("/", filmController.getAllFilms);

router.get("/:id", filmController.getFilmById);

router.post("/", auth, admin, filmController.addFilm);

router.put("/:id", auth, admin, filmController.updateFilm);

router.delete("/:id", auth, admin, filmController.deleteFilm);

module.exports = router;