const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gridSchema   = Schema({
    url: String, 
    text: String, 
    show: Boolean
})

module.exports = mongoose.model("grid",gridSchema)