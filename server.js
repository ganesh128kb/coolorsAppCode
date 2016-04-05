var express = require('express');

/*------ Initialize ------*/
var app = express();

/*--------Template Engine--------*/
app.engine('html',require('ejs').renderFile); // render HTML Files
app.use('/public',express.static(__dirname+'/public')); // Folder Access

app.get('/', function(req, res) {
    res.render('index.html');
});

/*------- Server ---------*/
var port = Number(process.env.PORT || 3000);
app.listen(port);