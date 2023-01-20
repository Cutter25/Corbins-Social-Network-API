// Requiring packages for node

const mongoose = require('mongoose');
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Setting port and app for express

const PORT = 3001;
const app = express();

// App.use methods

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongoose.set('debug', true);

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });

  // Figured node out lol
