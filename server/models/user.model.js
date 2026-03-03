import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required field"],
    },
    // age: {
    //     type: Number,
    //     required: [true, "Age is required field"],
    // },
    email: {
        type: String,
        required: [true, "Email is required field"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Password is required field"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    lastLogin: Date,
    isMarried: Boolean,
    verficationToken: String,
    verficationTokenExpiresAt: Date,

}, { timestamps: true }

)

const UserModel = mongoose.model("User", userSchema);

export default UserModel;