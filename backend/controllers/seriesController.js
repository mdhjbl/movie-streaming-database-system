const db = require("../models/db");

// همه سریال ها
exports.getAllSeries = (req, res) => {

    db.query("SELECT * FROM series", (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);

    });

};

// یک سریال
exports.getSeriesById = (req, res) => {
    db.query(
        "SELECT * FROM series WHERE id=?",
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result[0]);
        }
    );
};

// افزودن سریال
exports.addSeries = (req, res) => {

    const {

        name,
        director,
        genre,
        country,
        imdb_rating,
        age_rating,
        language,
        dubbing_status,
        plot,
        release_year,
        end_year,
        is_animation,
        is_anime,
        poster

    } = req.body;

    db.query(

        `INSERT INTO series
        (name,director,genre,country,
        imdb_rating,age_rating,
        language,dubbing_status,
        plot,release_year,end_year,
        is_animation,is_anime,poster)

        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,

        [

            name,
            director,
            genre,
            country,
            imdb_rating,
            age_rating,
            language,
            dubbing_status,
            plot,
            release_year,
            end_year,
            is_animation,
            is_anime,
            poster

        ],

        err => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Series Added"
            });

        }

    );

};

// ویرایش
exports.updateSeries = (req, res) => {

    const id = req.params.id;

    const {

        name,
        director,
        genre,
        country,
        imdb_rating,
        age_rating,
        language,
        dubbing_status,
        plot,
        release_year,
        end_year,
        is_animation,
        is_anime,
        poster

    } = req.body;

    db.query(

        `UPDATE series SET

        name=?,
        director=?,
        genre=?,
        country=?,
        imdb_rating=?,
        age_rating=?,
        language=?,
        dubbing_status=?,
        plot=?,
        release_year=?,
        end_year=?,
        is_animation=?,
        is_anime=?,
        poster=?

        WHERE id=?`,

        [

            name,
            director,
            genre,
            country,
            imdb_rating,
            age_rating,
            language,
            dubbing_status,
            plot,
            release_year,
            end_year,
            is_animation,
            is_anime,
            poster,
            id

        ],

        err => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Series Updated"
            });

        }

    );

};

// حذف
exports.deleteSeries = (req, res) => {

    db.query(

        "DELETE FROM series WHERE id=?",

        [req.params.id],

        err => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Series Deleted"
            });

        }

    );

};

exports.addSeason = (req, res) => {

    const {

        series_id,
        season_number,
        episode_count,
        release_date

    } = req.body;

    db.query(

        `INSERT INTO seasons
        (series_id,season_number,episode_count,release_date)
        VALUES(?,?,?,?)`,

        [

            series_id,
            season_number,
            episode_count,
            release_date

        ],

        err => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Season Added"
            });

        }

    );

};

exports.addEpisode = (req, res) => {

    const {

        season_id,
        episode_number,
        title,
        runtime,
        air_date,
        plot

    } = req.body;

    db.query(

        `INSERT INTO episodes
        (season_id,episode_number,title,runtime,air_date,plot)

        VALUES(?,?,?,?,?,?)`,

        [

            season_id,
            episode_number,
            title,
            runtime,
            air_date,
            plot

        ],

        err => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "Episode Added"
            });

        }

    );

};

exports.getSeasons = (req, res) => {

    db.query(

        "SELECT * FROM seasons WHERE series_id=?",

        [req.params.id],

        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result);

        }

    );

};

exports.getEpisodes = (req, res) => {

    db.query(

        "SELECT * FROM episodes WHERE season_id=?",

        [req.params.id],

        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result);

        }

    );

};

