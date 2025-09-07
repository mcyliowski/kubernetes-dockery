const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Item = require('./models/Item');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:nimda@mongo:27017/testdb?authSource=admin";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Połączono z MongoDB'))
  .catch(err => console.error(err));

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/items', async (req, res) => {
  const { name } = req.body;
  const newItem = new Item({ name });
  await newItem.save();
  res.json(newItem);
});

app.listen(PORT, () => console.log(`Backend działa na porcie ${PORT}`));
