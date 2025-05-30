const express = require("express");

const {
  addFeatureImage,
  getFeatureImages,
  removeFeatureImage, // Import the removeFeatureImage controller
} = require("../../controllers/common/feature-controller");

const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImages);

router.delete("/remove/:id", removeFeatureImage); // Add route for removing feature images
module.exports = router;
