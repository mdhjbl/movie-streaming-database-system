const express = require("express");

const router = express.Router();

const controller = require("../controllers/adminController");

const auth = require("../middleware/auth");

const admin = require("../middleware/admin");

// Users

router.get("/users", auth, admin, controller.getUsers);

router.delete("/users/:id", auth, admin, controller.deleteUser);

router.put("/users/:id/role", auth, admin, controller.updateUserRole);

module.exports = router;