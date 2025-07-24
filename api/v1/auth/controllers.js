const { UserModel } = require("../../../models/userSchema");
const bcrypt = require("bcrypt");

const userSignupController = async (req, res) => {
    try {
        // validation --> it will be done by D. T. O. (security guard)
        console.log("------ inside userSignupController -------");

        const { email, password } = req.body;

        const newUser = await UserModel.create({
            email,
            password,
        });

        res.status(201).json({
            isSuccess: true,
            message: "User created!",
            data: {
                user: newUser,
            },
        });
    } catch (err) {
        console.log("------ 🔴 Error in userSignupController -------", err.message);

        if (err.name == "ValidationError" || err.code == 11000) {
            res.status(400).json({
                isSuccess: false,
                message: err.message,
            });
        } else {
            res.status(500).json({
                isSuccess: false,
                message: "Internal Server Error",
            });
        }
    }
};

const userLoginController = async (req, res) => {
    try {
        // validate for email and password in D.T.O
        const { email, password: userPassword } = req.body;

        const userDoc = await UserModel.findOne({ email: email });

        if (userDoc === null) {
            res.status(400).json({
                isSuccess: false,
                message: "User does not exist! Please signup.",
            });
            return;
        }

        const { password: hashedPassword } = userDoc;

        const isCorrect = await bcrypt.compare(userPassword, hashedPassword);

        if (!isCorrect) {
            res.status(400).json({
                isSuccess: false,
                message: "Password does not match. Please try again...",
            });
            // password attempt count ++
            // if attempt > threshold then block the user for sometime, send a email regarding this to the user
            return;
        }

        res.status(200).json({
            isSuccess: true,
            message: "Login successful!",
            data: {
                user: {
                    email: userDoc.email,
                },
            },
        });
    } catch (err) {
        console.log("------- 🔴 Error in userLoginController -------", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { userSignupController, userLoginController };
