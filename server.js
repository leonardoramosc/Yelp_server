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
    const { rows } = await db.query(
      "SELECT * FROM restaurants WHERE  id = $1",
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurant: rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create Restaurant
app.post("/api/v1/restaurants/", async (req, res) => {
  const {
    body: { name, location, price_range },
  } = req;

  try {
    const result = await db.query(
      "INSERT INTO restaurants(name, location, price_range) VALUES($1, $2, $3) returning *",
      [name, location, price_range]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  const {
    body: { name, location, price_range },
    params: { id },
  } = req;

  try {
    const result = await db.query(
      "UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id = $4 returning *",
      [name, location, price_range, id]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete Restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    db.query("DELETE FROM restaurants WHERE id=$1", [req.params.id]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
