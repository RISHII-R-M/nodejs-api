const Note = require("../models/note.model.js");
// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request

  if (!req.body.ProductName) {
    return res.status(400).send({
      message: "product name  can not be empty",
    });
  }

  // Create a Notes
  const note = new Note({
    ProductName: req.body.ProductName || "Untitled Note",
    Date: req.body.Date,
    Quantity: req.body.Quantity,
  });

  // Save Note in the database
  note
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
    });
};
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Note.find()
    .then((notes) => {
      res.send(notes);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
  Note.findById(req.body.noteId)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.body.noteId,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.body.noteId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + req.body.noteId,
      });
    });
};
// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.ProductName) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  // Find note and update it with the request body
  Note.findByIdAndUpdate(
    req.params.noteId,
    {
      ProductName: req.body.ProductName || "Untitled Note",
      Quantity: req.body.Quantity,
      Date: req.body.Date,
    },
    { new: true }
  )
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId,
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.body.id)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.body.id,
        });
      }
      res.send({ message: "Note deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Note not found with id " + req.body.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.body.id,
      });
    });
};
