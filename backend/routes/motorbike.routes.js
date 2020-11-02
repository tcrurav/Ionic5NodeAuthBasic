module.exports = app => {
    const motorbikes = require("../controllers/motorbike.controller.js");
    const auth = require("../controllers/auth.js");
  
    var router = require("express").Router();
  
    // Create a new Motorbikes
    router.post("/", auth.isAuthenticated, motorbikes.create);
  
    // Retrieve all Motorbikes
    router.get("/", auth.isAuthenticated, motorbikes.findAll);

    // Retrieve a single Motorbikes with id
    router.get("/:id", auth.isAuthenticated, motorbikes.findOne);
  
    // Update a Motorbikes with id
    router.put("/:id", auth.isAuthenticated, motorbikes.update);
  
    // Delete a Motorbikes with id
    router.delete("/:id", auth.isAuthenticated, motorbikes.delete);
  
    app.use('/api/motorbike', router);
  };