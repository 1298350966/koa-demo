const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const grid2Schema   = Schema({
    url: String, 
    text: String, 
    show: Boolean,
})

module.exports = mongoose.model("grid2",grid2Schema,"grid2")