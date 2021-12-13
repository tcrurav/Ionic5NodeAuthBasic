const db = require("../models");
const Motorbike = db.motorbike;
const Op = db.Sequelize.Op;

// Create and Save a new Motorbike
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Motorbike
    const motorbike = {
        id: req.body.id,
        userId: req.body.userId,
        brand: req.body.brand,
        model: req.body.model
    };

    // Save Motorbike in the database
    Motorbike.create(motorbike)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Motorbike."
            });
        });
};

// Retrieve all Motorbikes from the database.
exports.findAll = (req, res) => {
    Motorbike.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving motorbikes."
            });
        });
};

// Retrieve all Motorbikes from the database.
exports.findAllByUserId = (req, res) => {
    const id = req.params.id;

    Motorbike.findAll({ where: { userId: id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving motorbikes."
            });
        });
};

// Find a single Motorbike with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Motorbike.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Motorbike with id=" + id
            });
        });
};

// Update a Motorbike by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Motorbike.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Motorbike was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Motorbike with id=${id}. Maybe Motorbike was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Motorbike with id=" + id
            });
        });
};

// Delete a Motorbike with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Motorbike.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Motorbike was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Motorbike with id=${id}. Maybe Motorbike was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Motorbike with id=" + id
            });
        });
};