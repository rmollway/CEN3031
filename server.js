var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080,
    szListing = '/listings',
    szGetRequest = 'GET';

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  
  /*
    Your request handler should send listingData in the JSON format if a GET request
    is sent to the '/listings' path. Otherwise, it should send a 404 error.

    HINT: explore the request object and its properties
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */

   if((request.url === szListing) && (request.method === szGetRequest)) {
     response.writeHead(200, {
     'Content-Length': Buffer.byteLength(listingData),
     'Content-Type': 'application/json' });

     response.end(listingData, 'utf-8');
   } else {
     response.statusCode = 404;
     response.end('Bad gateway error');
   }
};

fs.readFile('listings.json', 'utf-8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable,
    then start the server.
   */

   listingData = new Buffer(data, 'utf-8');

   // the server is now started, listening for requests on port 8080
   server.listen(port, function() {
     //once the server is listening, this callback function is executed
     console.log('Server listening on: http://localhost:' + port);

   });
});


// a server is created, but not started
server = http.createServer(requestHandler);
