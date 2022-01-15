const { intersection } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema({
    
    firmId: String,
    pricePer: Number,
    cutOrUncut: Number,
    productId: String,
    date: String,
    time: String, 
    placeId: String,
    billNumber: Number,
    CustomerName: String,
    
});

module.exports = mongoose.model('Sale', saleSchema);
