const { UserModel } = require("../../../models/userSchema");

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

module.exports = { userSignupController };
