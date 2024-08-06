const express = require('express');
const cors = require('cors');
const connectToMongoDB = require('./connection');
const userRouter = require('./routes/register');
const app = express();
require('dotenv').config();

const port = process.env.PORT;
const URL = process.env.MONGO_URL;

connectToMongoDB(URL);

app.use(cors());
app.use(express.json()); 
app.use('/', userRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
