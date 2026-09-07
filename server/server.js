const express = require('express');
const menuRoutes = require('./routes/menuRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/api', (request, response) => {
  response.status(200).json({
    success: true,
    message: 'SnapBite REST API is running',
  });
});

app.use('/api/menu', menuRoutes);

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
    console.log(`SnapBite API running at http://localhost:${port}`);
  });
}

module.exports = app;
