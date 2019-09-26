const router = require('express').Router();
const Item = require('../models/item.model');
const auth = require('../middleware/auth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './client/public/images/stock');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: imageFilter
});

router.route('/').get((req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(upload.single('image'), (req, res) => {
  const name = req.body.name;
  const price = Number(req.body.price);
  const image = req.file.originalname;
  const category = req.body.category;
  const subcategory = req.body.subcategory;

  const newItem = new Item({
    name,
    price,
    image,
    category,
    subcategory
  });

  newItem
    .save()
    .then(() => res.json({ msg: 'Item Added!', item: newItem }))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete(auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json(req.params.id)))
    .catch(err => res.status(404).json());
});

module.exports = router;
