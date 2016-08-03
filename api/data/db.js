var mongoose = require('mongoose');
var dbUrl = "mongodb://localhost:27017/hotel_app";

mongoose.connect(dbUrl);

mongoose.connection.on('connected', function(){
    console.log("mongoose connected to ",dbUrl);
});
mongoose.connection.on('disconnected', function(){
    console.log("mongoose disconnected ");
});
mongoose.connection.on('error', function(err){
    console.log("mongoose error ",err);
});

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log(" SIGINT app termination");
        process.exit(0);
    });
});

process.on('SIGTERM', function(){
    mongoose.connection.close(function(){
        console.log(" SIGTERM heroku app termination");
        process.exit(0);
    });
});

process.once('SIGUSR2', function(){
    mongoose.connection.close(function(){
        console.log(" SIGTUSR2 app termination");
        process.kill(process.pid, 'SIGUSR2');
    });
});