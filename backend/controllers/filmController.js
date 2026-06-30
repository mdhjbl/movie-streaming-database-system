const db = require("../models/db");

exports.getAllFilms = (req, res) => {

    db.query("SELECT * FROM films", (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);

    });

};

exports.getFilmById = (req, res) => {
    db.query(
        "SELECT * FROM films WHERE id=?",
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result[0]);
        }
    );
};

exports.addFilm = (req, res) => {

    const {

        name,
        director,
        genre,
        country,
        runtime,
        imdb_rating,
        age_rating,
        language,
        dubbing_status,
        plot,
        release_year,
        is_animation,
        is_anime,
        poster

    } = req.body;

    db.query(

        `INSERT INTO films
        (name,director,genre,country,runtime,imdb_rating,
        age_rating,language,dubbing_status,plot,
        release_year,is_animation,is_anime,poster)

        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,

        [

            name,
            director,
            genre,
            country,
            runtime,
            imdb_rating,
            age_rating,
            language,
            dubbing_status,
            plot,
            release_year,
            is_animation,
            is_anime,
            poster

        ],

        (err) => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Film Added Successfully"
            });

        }

    );

};

exports.updateFilm = (req, res) => {

    const id = req.params.id;

    const {

        name,
        director,
        genre,
        country,
        runtime,
        imdb_rating,
        age_rating,
        language,
        dubbing_status,
        plot,
        release_year,
        is_animation,
        is_anime,
        poster

    } = req.body;

    db.query(

        `UPDATE films
        SET
        name=?,
        director=?,
        genre=?,
        country=?,
        runtime=?,
        imdb_rating=?,
        age_rating=?,
        language=?,
        dubbing_status=?,
        plot=?,
        release_year=?,
        is_animation=?,
        is_anime=?,
        poster=?
        WHERE id=?`,

        [

            name,
            director,
            genre,
            country,
            runtime,
            imdb_rating,
            age_rating,
            language,
            dubbing_status,
            plot,
            release_year,
            is_animation,
            is_anime,
            poster,
            id

        ],

        (err) => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Film Updated"
            });

        }

    );

};

exports.deleteFilm = (req, res) => {

    const id = req.params.id;

    db.query(

        "DELETE FROM films WHERE id=?",

        [id],

        (err) => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Film Deleted"
            });

        }

    );

};