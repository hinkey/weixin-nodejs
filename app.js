var express = require('express');
var ejs = require('ejs');
var fs = require('fs');
var http = require('http');
var https = require('https');
var path = require('path');
//var rest = require('./model/rest');

//var options = {
//    key: fs.readFileSync('./ssl-key.unsecure'),
//    cert: fs.readFileSync('./ssl-crt.pem')
//};

var routes = require('./api/routes/routes');
var weixin = require('./api/weixin/demo');
var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.multipart());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: "keyboard cat", secureProxy: false}));
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.query());
app.use(app.router);
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
routes(app);
//weixin(app);


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
//https.createServer(options, server).listen(3000,function(){
//    console.log('https server listening on port 3000');
//});