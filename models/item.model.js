const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Decimal128,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: { type: String },
    SubCategory: { type: String }
});

module.exports = Item = mongoose.model('item', ItemSchema);