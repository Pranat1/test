const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discreteProductEntrySchema = new Schema({
        
        length: Number,
        width: Number,
        height: Number,
        pricePer: Number,
        productId: String

});
module.exports = mongoose.model('DiscreteProductEntry', discreteProductEntrySchema);
