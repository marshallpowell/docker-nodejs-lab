var express = require('express');
var expressHbs = require('express-handlebars');
var http = require('http');
var path = require('path');

global.APP_ROOT = path.resolve(__dirname);

var UserDto = require(global.APP_ROOT+'/public/js/models/UserDto.js');
var UserValidation = require(global.APP_ROOT+'/public/js/validation/UserValidation.js');
var UserService = require(global.APP_ROOT+'/services/UserService.js');


// Constants
var PORT = 8000;


// Initialize Express
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser());
app.use(express.session({secret: 'kdijeieimiw238748283492uwhfsfdi3RANDOM'}));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
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


app.get("/showProfile", function(req,res){

    var data = {};
    data.user = new UserDto();


    if(req.query.id){

        console.log("looking for user with id: " + req.query.id)

    }
    else{
        res.render('user_profile', data);
    }

});

app.post("/saveProfile", function(req,res){

    console.log("enter saveProfile with: " + req.body);

    var data = {};
    data.errors=[];

    var user = req.body;

    console.log("user is: " + user.email);

    data.errors = UserValidation.validateUser(user);

    if(data.errors.length){

        res.render('user_profile', data);
        return;
    }

    UserService.saveUser(user).then(function(userIn){
        console.log("in then for saveUser: " + JSON.stringify(userIn));
        data.user = userIn;
        res.json(data);
    }, function(e){
        console.log(JSON.stringify(e));
        data.errors.push("There was an error saving this user: " + e);
        console.error(e);
    });


});

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



app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
