const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

    const {
        username,
        email,
        password,
        birth_year
    } = req.body;

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, result) => {

            if (result.length > 0) {

                return res.status(400).json({
                    message: "Email already exists"
                });

            }

            const hash = await bcrypt.hash(password, 10);

            db.query(

                "INSERT INTO users(username,email,password,birth_year) VALUES(?,?,?,?)",

                [
                    username,
                    email,
                    hash,
                    birth_year
                ],

                (err) => {

                    if (err) return res.status(500).json(err);

                    res.json({
                        message: "Register Successful"
                    });

                }

            );

        }

    );

}

exports.login = (req, res) => {

    const {
        email,
        password
    } = req.body;

    db.query(

        "SELECT * FROM users WHERE email=?",

        [email],

        async (err, result) => {

            if (result.length == 0) {

                return res.status(400).json({
                    message: "Email not found"
                });

            }

            const user = result[0];

            const match = await bcrypt.compare(password, user.password);

            if (!match) {

                return res.status(400).json({
                    message: "Wrong Password"
                });

            }

            const token = jwt.sign(

                {
                    id: user.id,
                    role: user.role
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "7d"
                }

            );

            res.json({

                token,

                role: user.role,

                username: user.username

            });

        }

    );

}