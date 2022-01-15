const { intersection } = require('lodash');
const mongoose = require('mongoose');
const purchase = require('./purchase');
const Schema = mongoose.Schema;

const lottSchema = new Schema({
    
    nameId: Number,
    productId: String,
    pricePer: Number,
    placeId: String,
    origin: String,
    firmId: String,
    purchaseId: String
});

module.exports = mongoose.model('Lott', lottSchema);
