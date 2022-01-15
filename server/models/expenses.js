const { intersection } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expensesSchema = new Schema({
    
    date: String,
    biltyNumber: Number,
    freight: Number,
    loading: Number,
    unloading: Number,
    weight: Number, 
});

module.exports = mongoose.model('Expenses', expensesSchema);
