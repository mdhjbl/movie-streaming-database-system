const express=require("express");

const router=express.Router();

const auth=require("../middleware/auth");

const controller=require("../controllers/favoriteController");

router.get("/",auth,controller.getFavorites);

router.post("/",auth,controller.addFavorite);

router.delete("/:id",auth,controller.deleteFavorite);

module.exports=router;