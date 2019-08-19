
const router = require('express').Router();
let Item = require('../models/item.model');

router.route('/').get((req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const price = Number(req.body.price);
    const image = req.body.image;
    const category = req.body.category;
    const subcategory = req.body.subcategory;

    const newItem = new Item({
        name,
        price,
        image,
        category,
        subcategory
    });

    newItem.save()
        .then(() => res.json('Item Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;