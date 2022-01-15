const { intersection } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const refundSchema = new Schema({
    time: String,
    date: String,
    billNumber: Number

});

module.exports = mongoose.model('Refund', refundSchema);