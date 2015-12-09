var express = require("express");  //for express framework
var bodyParser = require("body-parser"); // for parsing data

var timeline = require("./timeline/timeline.js"); //for routing to login page

var app = express();

function REST() {
  var self = this;
  self.configureExpress();
};

/*this is for configuration for express framework*/
REST.prototype.configureExpress = function () {
  var self = this;
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  var router = express.Router();
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
  app.use('/api', router);
  var timeline_router = new timeline(router);
  self.startServer();
}

//starting server
REST.prototype.startServer = function () {
  app.listen(3600, function () {
    console.log("Server started..");
  });
}

//stop server
REST.prototype.stop = function (err) {
  console.log("Server Stopping...... \n" + err);
  process.exit(1);
}

new REST();
