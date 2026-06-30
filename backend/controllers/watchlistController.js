const db=require("../models/db");

exports.addWatchlist=(req,res)=>{

    const {film_id,series_id}=req.body;

    db.query(

        "INSERT INTO watchlist(user_id,film_id,series_id) VALUES(?,?,?)",

        [

            req.user.id,

            film_id || null,

            series_id || null

        ],

        err=>{

            if(err) return res.status(500).json(err);

            res.json({
                message:"Added"
            });

        }

    );

};

exports.getWatchlist=(req,res)=>{

    db.query(

        "SELECT * FROM watchlist WHERE user_id=?",

        [req.user.id],

        (err,result)=>{

            if(err) return res.status(500).json(err);

            res.json(result);

        }

    );

};

exports.deleteWatchlist=(req,res)=>{

    db.query(

        "DELETE FROM watchlist WHERE id=?",

        [req.params.id],

        err=>{

            if(err) return res.status(500).json(err);

            res.json({
                message:"Deleted"
            });

        }

    );

};