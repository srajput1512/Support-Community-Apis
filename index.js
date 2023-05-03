const express = require("express");

var routes = require("./Route");

const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

const { setMongooseConnection } = require("./Config/config");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routes(app);
app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});
