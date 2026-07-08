import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    cidade: {type: String},
    password: {type: String}
});

export const User = mongoose.model("User", UserSchema);