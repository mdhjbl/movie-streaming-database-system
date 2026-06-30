const db = require("../models/db");

exports.addComment = (req, res) => {

    const { film_id, series_id, comment } = req.body;

    db.query(

        `INSERT INTO comments(user_id,film_id,series_id,comment)
        VALUES(?,?,?,?)`,

        [

            req.user.id,

            film_id || null,

            series_id || null,

            comment

        ],

        err => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Comment Added"
            });

        }

    );

};

exports.getFilmComments = (req, res) => {

    db.query(

        `SELECT comments.id,
                comments.comment,
                comments.created_at,
                users.username
         FROM comments
         JOIN users
         ON comments.user_id=users.id
         WHERE film_id=?
         ORDER BY created_at DESC`,

        [req.params.id],

        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result);

        }

    );

};

exports.getSeriesComments = (req, res) => {

    db.query(

        `SELECT comments.id,
                comments.comment,
                comments.created_at,
                users.username
         FROM comments
         JOIN users
         ON comments.user_id=users.id
         WHERE series_id=?
         ORDER BY created_at DESC`,

        [req.params.id],

        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result);

        }

    );

};

exports.deleteComment = (req, res) => {

    db.query(

        "DELETE FROM comments WHERE id=?",

        [req.params.id],

        err => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Comment Deleted"
            });

        }

    );

};