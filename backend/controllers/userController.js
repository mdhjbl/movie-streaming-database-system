const db = require("../models/db");
const bcrypt = require("bcrypt");

// پروفایل

exports.getProfile = (req, res) => {

    db.query(

        "SELECT id,username,email,birth_year,role,created_at FROM users WHERE id=?",

        [req.user.id],

        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result[0]);

        }

    );

};

// ویرایش پروفایل

exports.updateProfile = async (req, res) => {

    const { username, email, birth_year, password } = req.body;

    const hash = await bcrypt.hash(password,10);

    db.query(

        `UPDATE users
        SET
        username=?,
        email=?,
        birth_year=?,
        password=?
        WHERE id=?`,

        [

            username,
            email,
            birth_year,
            hash,
            req.user.id

        ],

        err=>{

            if(err) return res.status(500).json(err);

            res.json({
                message:"Profile Updated"
            });

        }

    );

};

// حذف حساب

exports.deleteProfile=(req,res)=>{

    db.query(

        "DELETE FROM users WHERE id=?",

        [req.user.id],

        err=>{

            if(err) return res.status(500).json(err);

            res.json({
                message:"Account Deleted"
            });

        }

    );

}