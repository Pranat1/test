const { intersection } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    thickness: Number,
    name: String,
    unit: String,
    color: String,
    image: {
        data: Buffer,
        contentType: String
    },
    productType: String,
    placeOfOrigin: String
});

module.exports = mongoose.model('Product', productSchema);
