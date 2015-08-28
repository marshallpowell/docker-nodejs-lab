var Q = require('q');
var http = require('http');
var UserDto = require(global.APP_ROOT+'/public/js/models/UserDto.js');

var UserService = module.exports = {};



UserService.getUser = function(userId){

    var user = new UserDto();
    user.firstName = "john";
    user.lastName = "Doe";
    user.email = "john@doe.com";

    return user;
}

UserService.saveUser = function(user){

    var json = JSON.stringify(user);

    console.log("enter saveUser with " + json);

    var headers = {
        'Content-Type': 'application/json',
        'Content-Length': json.length
    };

    var requestOptions = {
        host : 'myserver', //this name is set in your /etc/host file for the docker service you are linking to
        port : process.env.MYSERVER_PORT_8001_TCP_PORT,
        path : '/saveUser', // url with parameters
        method : 'POST', // GET Method
        headers : headers
    };

    var deferred = Q.defer();

    var restCall = http.request(requestOptions, function(response) {
        response.on('data', function(data) {
            console.log('data received: ' + data);
            deferred.resolve(JSON.parse(data));
        });
    });

    restCall.on('error', function(e) {
        console.log('error received: ' + e);
        deferred.reject(e);
    });



    restCall.write(json);
    restCall.end();



    return deferred.promise;
}