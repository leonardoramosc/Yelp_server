require("dotenv").config();
const express = require("express");
const db = require("./db/index");
const app = express();

// Este middleware permite obtener el body de "req" en forma de objeto.

app.use(express.json());

// Get all Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const { rows: restaurants } = await db.query("SELECT * FROM restaurants");

    res.status(200).json({
      status: "success",
      results: restaurants.length,
      data: {
        restaurants,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const {rows} = await db.query('SELECT * FROM restaurants WHERE  id = $1', [req.params.id]);

    res.status(200).json({
      status: "success",
      data: {
        restaurant: rows[0]
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Create Restaurant
app.post("/api/v1/restaurants/", (req, res) => {
  console.log(req.body);
  res.status(200).json({
    status: "success",
    data: "pomodoro",
  });
});

// Update restaurant
app.put("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  res.status(200).json({
    status: "success",
  });
});

// Delete Restaurant
app.delete("/api/v1/restaurants/:id", (req, res) => {
  res.status(204).json({
    status: "success",
  });
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
