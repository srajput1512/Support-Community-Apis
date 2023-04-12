var express = require('express');  //Creates instance of expres js
var app = express();
var cors = require('cors')
app.use(cors());
var bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

app.use(bodyParser.urlencoded({extended:true}));
// parse application/json
app.use(bodyParser.json())
var routes = require('./Route');

routes(app);




//Creating the server at port : 3001
app.listen(3001, function () {
  console.log("Example app listening at port 3001");
})
