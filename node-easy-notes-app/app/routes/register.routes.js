module.exports = (app) => {
  const register = require("../controllers/register.controller.js");
  // Create a new Note
  app.post("/register", register.create);

  // Create a new Note
  app.post("/login", register.login);

  // Retrieve all register
  app.get("/register", register.findAll);

  // Retrieve a single Note with noteId
  app.post("/findone", register.findOne);

  // Update a Note with noteId
  app.put("/register/:noteId", register.update);

  // Delete a Note with noteId
  app.delete("/register/delete", register.delete);
};
