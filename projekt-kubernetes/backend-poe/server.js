const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Item = require('./models/Item');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:nimda@mongodb:27017/testdb?authSource=admin";

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

// NOWY ENDPOINT – USUWANIE WSZYSTKICH
app.delete('/items', async (req, res) => {
  try {
    await Item.deleteMany({});
    res.json({ message: "Wszystkie wpisy usunięte" });
  } catch (err) {
    res.status(500).json({ error: "Błąd podczas czyszczenia" });
  }
});

app.listen(PORT, () => console.log(`Backend działa na porcie ${PORT}`));
