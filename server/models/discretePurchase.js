const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discretePurchaseSchema = new Schema({
        
    discreteProductEntryId: String,
    quantity: Number,
    purchaseId: String,
    firmId: String,
    placeId: String

});
module.exports = mongoose.model('DiscretePurchase', discretePurchaseSchema);
