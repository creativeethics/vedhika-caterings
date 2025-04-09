const Feature = require("../../models/Feature");

const removeFeatureImage = async (req, res) => {
  try {
    const { id } = req.params; // Get the image ID from the request parameters
    const deletedImage = await Feature.findByIdAndDelete(id); // Delete the image by ID

    if (!deletedImage) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedImage,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    console.log(image, "image");

    const featureImages = new Feature({
      image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

exports.removeFeatureImage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "Image ID is required" });
    }

    const deletedImage = await FeatureImage.findByIdAndDelete(id);
    if (!deletedImage) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    res.json({ success: true, data: { id } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting image" });
  }
};

module.exports = { addFeatureImage, getFeatureImages, removeFeatureImage };
