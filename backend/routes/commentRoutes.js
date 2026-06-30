const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const admin = require("../middleware/admin");

const controller = require("../controllers/commentController");

router.get("/film/:id", controller.getFilmComments);

router.get("/series/:id", controller.getSeriesComments);

router.post("/", auth, controller.addComment);

router.delete("/:id", auth, admin, controller.deleteComment);

module.exports = router;