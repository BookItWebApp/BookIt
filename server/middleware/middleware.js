const User = require("../db/models/User.js");

const validUserOrEmail = async (req, res, next) => {
    try {
        // console.log("IN validUserOrEmail MIDDLEWARE >>>>>>>>>>>>>>>>>>>>>>>>>>");
        let existUser = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        // console.log("INVALID_USER_OR_EMAIL FOUND EXISTING_USER > ", existUser);
        if (existUser) {
            const error = Error("Failed! Username is already in use!");
            error.status = 401;
            // console.log("INVALID_USER_OR_EMAIL FOUND EXISTING_USER > ", error);
            throw error;
        }

        let existEmail = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        // console.log("INVALID_USER_OR_EMAIL FOUND EXISTING_EMAIL: ", existEmail);
        if (existEmail) {
            const error = Error("Failed! Email is already in use!");
            error.status = 400;
            // console.log("INVALID_USER_OR_EMAIL FOUND EXISTING_EMAIL ERR > ", error);
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
        console.log("IN isValidUser MIDDLEWARE >>>>>>>>>>>>>>>>>>>>>>>>>>");

        // const authHeader = req.headers.authorization;
        const authHeader = "yo";

        // console.log("IS_VALID_USER req.headers: ", req.headers);

        console.log("IS_VALID_USER authHeader: ", authHeader);

        if (!authHeader) {
            return res.status(403).json({
                status: 403,
                message: "Access denied! Permission required!"
            });
        }

        const user = await User.findByToken(authHeader);
        // console.log("IS_VALID_USER user: ", user);
        // console.log("IS_VALID_USER req.params: ", req.params);

        if (user.id != req.params.id) {
            return res.status(403).json({
                status: 403,
                message: "Access denied! Permission required!"
            });
        }
        next();
    } catch (err) {
        console.log("CATCH IS_VALID_USER_TOKEN ERROR > ", err);
        next(err);
    }
};

module.exports = { validUserOrEmail, isValidUser };
