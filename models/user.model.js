const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },

        posts: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        ],

    },

    {
        timestamps: false,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);







userSchema.pre("save", async function (next) {
    const user = this;

    try {

        if (!user.isModified("password")) {
            next();
        }

        const salt_round = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(user.password, salt_round);

        user.password = hashedPassword;
    } catch (error) {
        next(error);
    }
});



userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};



userSchema.methods.generateToken = async function (next) {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "30d" }
        );
    } catch (error) {
        next(error);
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
