const express = require("express");
const multer = require("multer");
const user = require("../controllers/productController")
const routes = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // Define the destination directory for uploaded files
    },
    filename: function (req, file, cb) {
      // Define how the file should be named
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

 
routes.get("/get",user.getAll);
routes.post("/addData", upload.single("image"), user.create); // Use multer middleware for single image upload
routes.put("/edit/:id",user.edit);
routes.delete("/delete/:id",user.delete);

module.exports = routes