const router = require('express').Router();
const Cart = require('../models/cart.model');
const auth = require('../middleware/auth');
const Item = require('../models/item.model');

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
              .then(result => {
                Item.findOne({ _id: item.item }).then(NewItem => {
                  const newQuantity = JSON.stringify(
                    result.items.find(r => r.item == item.item).quantity +
                      +item.quantity
                  );
                  const cartItemId = result.items.find(r => r.item == item.item)
                    .id;
                  res.send({
                    item: NewItem,
                    id: cartItemId,
                    quantity: newQuantity
                  });
                });
              })
              .catch(err => res.status(400).json('Error: ' + err));
          } else {
            Cart.findOneAndUpdate({ user: user }, { $push: { items: item } })
              .then(result => {
                console.log(result);
                Item.findOne({ _id: item.item }).then(NewItem => {
                  const cartItemId = result.items.find(r => r.item == item.item)
                    .id;
                  res.send({
                    item: NewItem,
                    id: cartItemId,
                    quantity: item.quantity
                  });
                });
              })
              .catch(err => res.status(400).json('Error: ' + err));
          }
        })
        .catch(err => res.status(400).json('Error: ' + err));
    } else {
      Cart.create({
        user: user,
        items: [item]
      })
        .then(result => {
          Item.findOne({ _id: item.item }).then(NewItem => {
            const cartItemId = result.items.find(r => r.item == item.item).id;
            res.send({
              item: NewItem,
              id: cartItemId,
              quantity: item.quantity
            });
          });
        })
        .catch(err => res.status(400).json('Error: ' + err));
    }
  });
});

module.exports = router;
