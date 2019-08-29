const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item'
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = Order = mongoose.model('cart', OrderSchema);
