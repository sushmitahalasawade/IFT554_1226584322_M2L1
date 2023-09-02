const httpServer = require('http');
const url = require('url')
//create server
const server = httpServer.createServer((req,res) => { // callback function
    const urlParameter = url.parse(req.url,true);
    console.log(urlParameter.query);
    console.log(urlParameter.pathname);
    res.end(` we received our first request from the client`);

});

//start listning to request
server.listen(8000,'localhost', function(){
    console.log('Listening to requests on port 8000');
});