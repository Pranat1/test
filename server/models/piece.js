const { intersection } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pieceSchema = new Schema({
    nameId: Number,
    placeId: String,
    length: Number,
    width: Number,
    lottId: String,
    firmId: String,
    saleId: String

});

module.exports = mongoose.model('Piece', pieceSchema);
