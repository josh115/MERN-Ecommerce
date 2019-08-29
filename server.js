const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const uri = process.env.DATABASE_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Database connection successful');
});

const CartRouter = require('./routes/cart');
app.use('/api/cart', CartRouter);

const ItemsRouter = require('./routes/items');
app.use('/api/items', ItemsRouter);

const UsersRouter = require('./routes/users');
app.use('/api/users', UsersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
