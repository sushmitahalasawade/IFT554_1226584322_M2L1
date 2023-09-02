const httpServer = require('http');
const url = require('url');
const fs = require('fs');

// Read data from file
const tempCourse = fs.readFileSync(
    `${__dirname}/data.txt`,
    'utf-8'
);

//create server
const server = httpServer.createServer((req,res) => { // callback function
    const urlParameter = url.parse(req.url,true);
    console.log(urlParameter.query);
    console.log(urlParameter.pathname);
    if(urlParameter.query.id){
        //course page
        if(urlParameter.pathname === "/" || urlParameter.pathname.toLowerCase() === '/courses'){
            res.writeHead(200,{ // successfull
                'Content-type':'text/html'
            });
            res.end(` we received our first request from the client at resource ${urlParameter.pathname.toLowerCase()} with query parameter ${urlParameter.query.id}
            ${tempCourse}`);

        }
  
    }
    else{
        res.writeHead(404,{ // server did not found what you were looking for
            'Content-type':'text/html'
        });
        res.end('resource not found');
}
    
});

//start listning to request
server.listen(8000,'localhost', function(){
    console.log('Listening to requests on port 8000');
});