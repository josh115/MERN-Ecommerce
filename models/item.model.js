const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  image: { type: String },
  category: { type: String },
  subcategory: { type: String }
});

module.exports = Item = mongoose.model('item', ItemSchema);
