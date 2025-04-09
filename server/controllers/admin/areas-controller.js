const { imageUploadUtil } = require("../../helpers/cloudinary");
const Area = require("../../models/Area");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

const Area = require('../../models/Area');

exports.getAreas = async (req, res) => {
    try {
        const areas = await Area.find(); // Fetch areas from the database
        res.status(200).json(areas);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching areas', error });
    }
};

//add a new Area
const addArea = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      order,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    console.log(averageReview, "averageReview");

    const newlyCreatedArea = new Area({
      image,
      title,
      description,
      category,
      order,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    await newlyCreatedArea.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedArea,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//fetch all Areas

const fetchAllAreas = async (req, res) => {
  try {
    const listOfAreas = await Area.find({});
    res.status(200).json({
      success: true,
      data: listOfAreas,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit a Area
const editArea = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      order,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    let findArea = await Area.findById(id);
    if (!findArea)
      return res.status(404).json({
        success: false,
        message: "Area not found",
      });

    findArea.title = title || findArea.title;
    findArea.description = description || findArea.description;
    findArea.category = category || findArea.category;
    findArea.order = order || findArea.order;
    findArea.price = price === "" ? 0 : price || findArea.price;
    findArea.salePrice =
      salePrice === "" ? 0 : salePrice || findArea.salePrice;
    findArea.totalStock = totalStock || findArea.totalStock;
    findArea.image = image || findArea.image;
    findArea.averageReview = averageReview || findArea.averageReview;

    await findArea.save();
    res.status(200).json({
      success: true,
      data: findArea,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//delete a Area
const deleteArea = async (req, res) => {
  try {
    const { id } = req.params;
    const area = await Area.findByIdAndDelete(id);

    if (!area)
      return res.status(404).json({
        success: false,
        message: "Area not found",
      });

    res.status(200).json({
      success: true,
      message: "Area delete successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  addArea,
  fetchAllAreas,
  editArea,
  deleteArea,
};
