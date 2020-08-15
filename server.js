require('dotenv').config();
const express = require('express');
const app = express();

// Este middleware permite obtener el body de "req" en forma de objeto.

app.use(express.json());

// Get all Restaurants
app.get('/api/v1/restaurants', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      restaurants: ['la petaca', 'el pomodoro']
    }
  })
})

// Get a Restaurant
app.get('/api/v1/restaurants/:id', (req, res) => {
  console.log(req.params);
  res.status(200).json({
    status: 'success',
    data: 'mcdonalds'
  })
})

// Create Restaurant
app.post('/api/v1/restaurants/', (req, res) => {
  console.log(req.body);
  res.status(200).json({
    status: 'success',
    data: 'pomodoro'
  })
})

// Update restaurant
app.put('/api/v1/restaurants/:id', (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  res.status(200).json({
    status: 'success'
  })
})

// Delete Restaurant
app.delete('/api/v1/restaurants/:id', (req, res) => {
  res.status(204).json({
    status: 'success'
  })
})


const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
})