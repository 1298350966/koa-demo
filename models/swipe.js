const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const swipeSchema   = Schema({
    "url": String, 
    show: Boolean,
})

module.exports = mongoose.model("swipe",swipeSchema)