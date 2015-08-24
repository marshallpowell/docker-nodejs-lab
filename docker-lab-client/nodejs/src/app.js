var express = require('express');
var expressHbs = require('express-handlebars');
var http = require('http');

// Constants
var PORT = 8000;

// Initialize Express
var app = express();

app.configure(function() {
    app.set('views', __dirname+'/views');
    app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs',layoutsDir: __dirname + '/views/layouts'}));
    app.set('view engine', 'hbs');
});

/*
#These are example environment variables set by Docker at run time
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=fb70526e3fde
MYSERVER_PORT=tcp://172.17.0.10:8001
MYSERVER_PORT_8001_TCP=tcp://172.17.0.10:8001
MYSERVER_PORT_8001_TCP_ADDR=172.17.0.10
MYSERVER_PORT_8001_TCP_PORT=8001
MYSERVER_PORT_8001_TCP_PROTO=tcp
MYSERVER_NAME=/client/myserver
*/

var requestOptions = {
    host : 'myserver', //this name is set in your /etc/host file for the docker service you are linking to
    port : process.env.MYSERVER_PORT_8001_TCP_PORT,
    path : '/', // url with parameters
    method : 'GET' // GET Method
};


//Routes
app.get("/helloWorld/", function (req, res) {

        // HTTP GET request
	console.log('Request made to /helloWorld/');

	res.send('Hello World');

});

//Routes
app.get("/", function (req, res) {

        // HTTP GET request
        console.log('Request made to / views dir: ' + app.get('views'));

  var basketballPlayers = [
    {name: 'Lebron James', team: 'the Heat'},
    {name: 'Kevin Durant', team: 'the Thunder'},
    {name: 'Kobe Jordan',  team: 'the Lakers'}
  ];
  
  var days = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];
  
  var person = {
    name: 'Gorilla',
    address: {
      streetName: 'Broadway',
      streetNumber: '721',
      floor: 4,
      addressType: {
        typeName: 'residential'
      }
    }
  };

  var logic = {
    upIsUp: true,
    downIsUp: false,
    skyIsBlue: "yes"
  };

  var data = {
    basketballPlayers: basketballPlayers,
    days: days,
    person: person,
    logic: logic
  };


        res.render('template_samples', data);

});

app.get("/service/", function(req, res){

	res.writeHead(200, {'Content-Type': 'application/json'});

        var reqGet = http.request(requestOptions, function(response) {
            response.on('data', function(data) { 
		console.log(data);
                  res.end(data); 
            });
        });

        reqGet.end();
        reqGet.on('error', function(e) {
            console.error(e);
        });

});



app.listen(PORT);
console.log('Running on  33o http://localhost:' + PORT);
