const express = require('express');
const cors = require('cors');

const petRoutes = require('./routes/pet.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/pets', petRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'petly-backend',
  });
});

app.use(errorHandler);

module.exports = app;