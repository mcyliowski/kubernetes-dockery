const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Item = require('./models/Item');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Pobieramy dane z Secret + ConfigMap
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoUrl = process.env.MONGO_URL;

// Walidacja zmiennych środowiskowych
if (!mongoUser || !mongoPassword || !mongoUrl) {
  console.error('Błąd: brak wymaganych zmiennych środowiskowych MONGO_USER, MONGO_PASSWORD lub MONGO_URL');
  process.exit(1); // kończymy proces, żeby Kubernetes mógł zrestartować Pod
}

// Tworzymy dynamiczny connection string
const MONGO_URI = `mongodb://${mongoUser}:${mongoPassword}@${mongoUrl}`;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Połączono z MongoDB'))
  .catch(err => {
    console.error('Błąd połączenia z MongoDB:', err);
    process.exit(1); // kończymy proces, żeby Pod spróbował restartu
  });

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd pobierania danych' });
  }
});

app.post('/items', async (req, res) => {
  try {
    const { name } = req.body;
    const newItem = new Item({ name });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd zapisu danych' });
  }
});

app.listen(PORT, () => console.log(`Backend działa na porcie ${PORT}`));
