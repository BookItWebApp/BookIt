const User = require("../db/models/User.js");

const validUserOrEmail = async (req, res, next) => {
    try {
        if (
            req.body.username === "" ||
            req.body.email === "" ||
            req.body.password === ""
        ) {
            const error = Error("Failed! Input can not be empty!");
            error.status = 401;
            throw error;
        }

        let existUser = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (existUser) {
            const error = Error("Failed! Username is already in use!");
            error.status = 401;
            throw error;
        }

        let existEmail = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (existEmail) {
            const error = Error("Failed! Email is already in use!");
            error.status = 400;
            throw error;
        }

        next();
    } catch (err) {
        console.log("CATCH INVALID_USER_OR_EMAIL ERROR > ", err);
        next(err);
    }
};

//
const isValidUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        // const authHeader = "yo";

        if (!authHeader) {
            const error = Error("Your request is not authorized!");
            error.status = 401;
            throw error;
        }

        const user = await User.findByToken(authHeader);

        if (user.id != req.body.userId) {
            const error = Error("Your request is not authorized!");
            error.status = 401;
            throw error;
        }
        next();
    } catch (err) {
        console.log("CATCH IS_VALID_USER_TOKEN ERROR > ", err);
        next(err);
    }
};

module.exports = { validUserOrEmail, isValidUser };
