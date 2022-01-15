const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleCutEntrySchema = new Schema({
    
    quantity: Number,
    pieceId: String,
    saleId: String
    
});

module.exports = mongoose.model('SaleCutEntry', saleCutEntrySchema);
