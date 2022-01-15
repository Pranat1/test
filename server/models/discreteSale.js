const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discreteSaleSchema = new Schema({
        
    discreteProductEntryId: String,
    quantity: Number,
    saleId: String

});
module.exports = mongoose.model('DiscreteSale', discreteSaleSchema);