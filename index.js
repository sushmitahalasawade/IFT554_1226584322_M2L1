const httpServer = require('http');
const url = require('url');
const fs = require('fs');

// Read data from file
const tempCourse = fs.readFileSync(
    `${__dirname}/data.json`,
    'utf-8'
);

const templateHTMLCourse = fs.readFileSync(
    `${__dirname}/templateCourse.html`,
    'utf-8'
);

const replaceTemplate = (htmlStr,course)=>{
    let output = htmlstr.replace(/{%Name%}/g, course.courseName);
    output = output.replace(/{%IMAGE%}/g, course.image);
    output = output.replace(/{%DEPARTMENT%}/g, course.department);
    output = output.replace(/{%INSTRUCTOR%}/g, course.instructor);
    output = output.replace(/{%CREDITS%}/g, course.credits);
    output = output.replace(/{%DESCRIPTION%}/g, course.description);
    output = output.replace(/{%ID%}/g, course.id);
    output = output.replace(/{%IMAGE%}/g, course.image);
    return output;

}

const dataObj = JSON.parse(tempCourse);

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
            const course =  dataObj[Number(urlParameter.query.id)];
            const strCourseName = JSON.stringify(course);
            const courseHTML = replaceTemplate(templateHTMLCourse,course); // function that will replace course values in html
            // res.end(` we received our first request from the client at resource ${urlParameter.pathname.toLowerCase()} with query parameter ${urlParameter.query.id}
            // ${JSON.stringify(course)}`);
            res.end(courseHTML);

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
server.listen(8000,'localhost', ()=>{
    console.log('Listening to requests on port 8000');
});