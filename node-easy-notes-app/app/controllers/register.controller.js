const Register = require("../models/register.model.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Create and Save a newRegister register
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    return res.status(400).send({
      message: "regsiter content can not be empty",
    });
  }

  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    const register = new Register({
      email: req.body.email || "Untitled regsiter",
      name: req.body.name,
      password: hash,
    });

    // SaveRegister in the database
    register
      .save()
      .then((data) => {
        return res.status(200).send({
          status: true,
          message: "registered successfully",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the regsiter",
        });
      });
  });
};

// Login
exports.login = (req, res) => {
  // Validate request
  if (!req.body.email) {
    return res.status(400).send({
      message: "regsiter content can not be empty",
    });
  }

  // login;
  Register.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              return res.status(200).send({
                status: true,
                message: "success ",
              });
            } else {
              return res.status(200).send({
                status: false,
                message: "password is wrong ",
              });
            }
          }
        );
      } else {
        return res.status(404).send({
          status: false,
          message: "user not found ",
        });
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "user not found with email " + req.body.email,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Register with id " + req.body.email,
      });
    });
};

// Retrieve and return allRegisters from the database.
exports.findAll = (req, res) => {
  Register.find()
    .then((register) => {
      res.send(register);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrievingRegisters.",
      });
    });
};

// Find a singleRegister with aRegisterId
exports.findOne = (req, res) => {
  Register.findOne(req.body.registerId)
    .then((register) => {
      if (!register) {
        return res.status(404).send({
          message: "register not found with id " + req.body.registerId,
        });
      }
      res.send(register);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "register not found with id " + req.body.registerId,
        });
      }
      return res.status(500).send({
        message: "Error retrievingRegister with id " + req.body.registerId,
      });
    });
};
// Update aRegister identified by theRegisterId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "register content can not be empty",
    });
  }

  // FindRegister and update it with the request body
  Register.findByIdAndUpdate(
    req.params.registerId,
    {
      email: req.body.email || "UntitledRegister",
      name: req.body.name,
      password: req.body.password,
    },
    { new: true }
  )
    .then((register) => {
      if (!register) {
        return res.status(404).send({
          message: "register not found with id " + req.params.registerId,
        });
      }
      res.send(register);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "register not found with id " + req.params.registerId,
        });
      }
      return res.status(500).send({
        message: "Error updatingRegister with id " + req.params.registerId,
      });
    });
};

// Delete aRegister with the specifiedRegisterId in the request
exports.delete = (req, res) => {
  Register.findByIdAndRemove(req.body.id)
    .then((register) => {
      if (!register) {
        return res.status(404).send({
          message: "register not found with id " + req.body.id,
        });
      }
      res.send({ message: "register deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "register not found with id " + req.body.id,
        });
      }
      return res.status(500).send({
        message: "Could not deleteRegister with id " + req.body.id,
      });
    });
};
