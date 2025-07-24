const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema, model } = mongoose;

const otpSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
        },
        otp: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

otpSchema.pre("save", async function () {
    if (this.isModified("otp")) {
        this.otp = await bcrypt.hash(this.otp, 12);
        // number of rounds to hash the password (2^num)
        // more rounds ==> more security ==> more cpu intensive ==> slower
    }
});

const OtpModel = model("otp", otpSchema);

module.exports = { OtpModel };
