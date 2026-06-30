const express = require("express");

const router = express.Router();

const controller = require("../controllers/seriesController");

const auth = require("../middleware/auth");

const admin = require("../middleware/admin");

router.get("/", controller.getAllSeries);

router.get("/:id", controller.getSeriesById);

router.post("/", auth, admin, controller.addSeries);

router.put("/:id", auth, admin, controller.updateSeries);

router.delete("/:id", auth, admin, controller.deleteSeries);

router.post("/season", auth, admin, controller.addSeason);

router.post("/episode", auth, admin, controller.addEpisode);

router.get("/:id/seasons", controller.getSeasons);

router.get("/season/:id/episodes", controller.getEpisodes);

module.exports = router;