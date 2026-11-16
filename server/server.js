const express = require('express');
const path = require('path');
const menuRoutes = require('./routes/menuRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
const port = process.env.PORT || 3001;

const allowedOrigins = new Set([
  'http://localhost:3000',
  process.env.FRONTEND_ORIGIN,
].filter(Boolean));

app.use((request, response, next) => {
  const origin = request.get('Origin');

  if (origin && allowedOrigins.has(origin)) {
    response.set('Access-Control-Allow-Origin', origin);
    response.set('Vary', 'Origin');
    response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json());

app.get('/api', (request, response) => {
  response.status(200).json({
    success: true,
    message: 'SnapBite REST API is running',
  });
});

app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);

app.use(express.static(path.resolve(__dirname, '../dist')));

app.use((request, response) => {
  response.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

app.use((error, request, response, next) => {
  const statusCode = error.statusCode || error.status || 500;
  const message = statusCode === 500 ? 'Internal server error' : 'Invalid JSON request body';

  if (statusCode === 500) {
    console.error(error);
  }

  response.status(statusCode).json({
    success: false,
    error: message,
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`SnapBite server listening on port ${port}`);
  });
}

module.exports = app;
