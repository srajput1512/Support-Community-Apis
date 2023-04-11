var express = require("express"); //Creates instance of expres js
const Route = require("./Route");
var app = express();
var cors = require('cors')
app.use(cors());
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

app.use(express.json());

var routes = require("./Route");

routes(app);

app.listen(3001, function () {
  console.log("Example app listening at port 3001");
});
