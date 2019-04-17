const express = require('express');
const hbs = require('hbs');
const call_promise = require("./promise.js");

const app = express()
const port = process.env.PORT || 8080;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('message', (text) => {
    return text.toUpperCase();
})

//An example of serving 1 hbs website to 3 different urls
//With each page pointing to the right page
app.get('/main', (request, response) =>{
    response.render('index.hbs',{
        welcome: 'This is main',
        title: 'Main',
        body: "This is main",
        links: ['info', 'currency/USD'],
    })
});

app.get('/currency/:cur', (request, response) => {
    //request.params.cur let's us gram :cur from the url
    //simple go localhost:8080/currency/USD
    //And USD would be stored in request.params.cur
    var cur = request.params.cur
    call_promise.example_promise(cur).then((resolve) => {
        var sended = "1 " + cur + " = " + resolve["CNY"] + " CNY";
        response.render('index.hbs',{
            welcome: 'This is currency',
            title: 'Currency',
            body: sended,
            links: ['info', 'main'],
        })
    }).catch((error) => {
        console.log("This line shows up if an error happens")
        console.log(error)
    })
})

app.get('/info', (request, response) =>{
    response.render('index.hbs', {
        welcome: 'This is info',
        title: 'Info',
        body: "The name's francis gau",
        links: ['main', 'currency/USD'],
    })
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});