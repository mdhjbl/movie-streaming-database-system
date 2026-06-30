const db = require("../models/db");

// ===== USERS =====

exports.getUsers = (req, res) => {

    db.query(
        "SELECT id,username,email,birth_year,role FROM users",
        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result);

        }
    );

};

exports.deleteUser = (req, res) => {

    db.query(
        "DELETE FROM users WHERE id=?",
        [req.params.id],
        err => {

            if (err) return res.status(500).json(err);

            res.json({
                message: "User Deleted"
            });

        }
    );

};

exports.updateUserRole = (req, res) => {

    const { role } = req.body;

    db.query(

        "UPDATE users SET role=? WHERE id=?",

        [

            role,

            req.params.id

        ],

        err => {

            if (err) return res.status(500).json(err);

            res.json({

                message: "Role Updated"

            });

        }

    );

};