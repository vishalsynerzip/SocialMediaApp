function TIMELINE_ROUTER(router,connection) {
  var self = this;
  self.handleRoutes(router,connection);
}

TIMELINE_ROUTER.prototype.handleRoutes= function(router,connection) {

  router.get("/timeline",function(req,res){//function start

    res.status(200).send({"user" : "Pravin","message" : "Testing the connection."});

  });

  router.post("/timeline",function(req,res){//function start

    res.status(200).send({"user" : "Pravin","message" : "Testing the connection."});

  });
}

module.exports = TIMELINE_ROUTER; //routing module
