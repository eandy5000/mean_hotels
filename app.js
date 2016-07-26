var express = require('express');
var app = express();
var path = require('path');

var routes = require('./routes');


app.set('port', (5000 || process.env.PORT));

app.use(function(req, res, next){
    console.log(req.method,  req.url);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', routes);

// TO EXPRESS.STATIC
// app.get('/', function(req, res){
//     console.log("GET the homepage");
//     res
//         .status(200)
//         .sendFile(path.join(__dirname, 'public', 'index.html'));
// });

//to index.js
// app.get('/json', function(req, res){
//     console.log('Get json');
//         res
//             .status(200)
//             .json({json : true});
// });

app.get('/file', function(req, res){
    console.log("GET file");
    res
        .status(200)
        .sendFile(path.join(__dirname, 'app.js'));
});

// to server listen configuration
// app.listen(app.get('port'), function(){
//     console.log("listening on port: ",app.get('port'));
// });

var server = app.listen(app.get('port'), function(){
    var port = server.address().port;
    console.log("listening on port: ", port);
});