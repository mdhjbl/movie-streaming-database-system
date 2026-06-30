const express=require("express");

const router=express.Router();

const auth=require("../middleware/auth");

const controller=require("../controllers/watchlistController");

router.get("/",auth,controller.getWatchlist);

router.post("/",auth,controller.addWatchlist);

router.delete("/:id",auth,controller.deleteWatchlist);

module.exports=router;