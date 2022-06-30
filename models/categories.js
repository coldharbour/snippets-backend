
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const categorySchema = Schema({
    category: String,
    items: Array

})

module.exports = mongoose.model('categoryCollection', categorySchema)