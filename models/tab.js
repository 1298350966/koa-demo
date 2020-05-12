const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tabSchema = Schema({
    "title": String,
    "desc": String,
    "text": String,
    "thumb": String,
    "url":String,
    show: Boolean,


})

module.exports = mongoose.model("tab", tabSchema)