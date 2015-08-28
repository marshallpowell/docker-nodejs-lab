var express = require('express');

// Constants
var PORT = 8001;

// App
var app = express();
app.use(express.json()); // to support JSON-encoded bodies


global.USERS = [];

//Routes
app.get('/getUsers', function (req, res) {

  console.log("enter getUsers");
  res.json(global.USERS);
});

app.post('/saveUser', function (req, res) {

  console.log("enter saveUser with " + JSON.stringify(req.body));

    var user = req.body;
    user.id = global.USERS.length+1;

  global.USERS.push(req.body);


  res.json(user);

});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
