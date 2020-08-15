require('dotenv').config();
const express = require('express');

const app = express();

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
})