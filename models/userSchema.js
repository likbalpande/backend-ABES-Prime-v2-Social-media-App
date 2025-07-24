const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            minLength: 2,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        dob: {
            type: String,
            trim: true,
        },
        image: {
            type: String,
            trim: true,
        },
        hasOnboardingCompleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        // number of rounds to hash the password (2^num)
        // more rounds ==> more security ==> more cpu intensive ==> slower
    }
});

const UserModel = model("user", userSchema);

module.exports = { UserModel };
