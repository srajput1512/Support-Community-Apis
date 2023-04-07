var express = require("express"); //Creates instance of expres js
const Route = require("./Route");
var app = express();


app.use(express.json());

var routes = require("./Route");

routes(app);

app.listen(3001, function () {
  console.log("Example app listening at port 3001");
});
