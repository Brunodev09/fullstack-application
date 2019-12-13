let mongoose, { Schema, model } = require("mongoose");
/**
 * Standard initialization of Mongoose Models to use it as documents inside MongoDB.
 */

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