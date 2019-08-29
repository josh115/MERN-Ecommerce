const router = require('express').Router();
const Cart = require('../models/cart.model');
const auth = require('../middleware/auth');

router.route('/:userid').get((req, res) => {
  Cart.findOne({ user: req.params.userid })
    .populate('items.item')
    .exec((err, cart) => {
      if (!cart) {
        return res.send({ msg: 'Cart Is Empty', items: [] });
      }
      res.send(cart);
    });
});
router.route('/add').post((req, res) => {
  const user = req.body.user;
  const item = {
    item: req.body.item,
    quantity: req.body.quantity
  };

  Cart.findOne({ user: user }).then(foundCart => {
    if (foundCart) {
      Order.findOne({ user: user, 'items.item': item.item })
        .then(itemInCart => {
          if (itemInCart) {
            Cart.findOneAndUpdate(
              {
                user: user,
                items: {
                  $elemMatch: { item: item.item }
                }
              },
              {
                $inc: { 'items.$.quantity': item.quantity }
              }
            )
              .exec()
              .then(result => res.send(result));
          } else {
            Cart.updateOne({ user: user }, { $push: { items: item } })
              .then(result => res.send(result))
              .catch(err => res.status(400).json('Error: ' + err));
          }
        })
        .catch(err => res.status(400).json('Error: ' + err));
    } else {
      Cart.create({
        user: user,
        items: [item]
      })
        .then(documents => res.send(documents))
        .catch(err => res.status(400).json('Error: ' + err));
    }
  });
});

module.exports = router;
