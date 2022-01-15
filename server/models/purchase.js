const { intersection } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
    royelty: Number,
    weight: Number, 
    firmId: String,
    date: String,
    time: String, 
    billNumber: Number,
    expensesId: String,
});

module.exports = mongoose.model('Purchase', purchaseSchema);
