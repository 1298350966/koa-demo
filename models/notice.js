const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const noticeSchema   = Schema({
    notice: String, 
    show: Boolean,
})

module.exports = mongoose.model("notice",noticeSchema)