const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tabTwoSchema = Schema({
    "title": String,
    "desc": String,
    "text": String,
    "url": String,
    show: Boolean,
    

})

module.exports = mongoose.model("tabTwo", tabTwoSchema, "tabTwo")