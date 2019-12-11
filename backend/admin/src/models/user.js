let mongoose, { Schema, model } = require("mongoose");

const User = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    songs: [String]
}, {
    timestamps: true
});

module.exports = model("User", User);