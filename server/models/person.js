const { intersection } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: String,
    advance: Number,
    salry: Number,
    expenceAllowance: Number,
    firmId: String
});

module.exports = mongoose.model('Person', personSchema);
