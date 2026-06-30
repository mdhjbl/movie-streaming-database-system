const db=require("../models/db");

exports.addFavorite=(req,res)=>{

    const {film_id,series_id}=req.body;

    db.query(

        "INSERT INTO favorites(user_id,film_id,series_id) VALUES(?,?,?)",

        [

            req.user.id,

            film_id || null,

            series_id || null

        ],

        err=>{

            if(err) return res.status(500).json(err);

            res.json({
                message:"Added To Favorite"
            });

        }

    );

};

exports.getFavorites=(req,res)=>{

    db.query(

        "SELECT * FROM favorites WHERE user_id=?",

        [req.user.id],

        (err,result)=>{

            if(err) return res.status(500).json(err);

            res.json(result);

        }

    );

};

exports.deleteFavorite=(req,res)=>{

    db.query(

        "DELETE FROM favorites WHERE id=?",

        [req.params.id],

        err=>{

            if(err) return res.status(500).json(err);

            res.json({
                message:"Deleted"
            });

        }

    );

};