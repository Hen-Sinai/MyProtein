const User = require("../models/User");
const Protein = require("../models/Protein");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");

const getProteins = asyncHandler(async (req, res) => {
  const me = await User.findOne({_id: req.user._id}).select('-password').lean()
  const proteins = await Protein.find({seller: {"$ne": me}}).lean();

  if (!proteins) {
    return res.status(400).json({ message: "No protein found" });
  }

  // Add seller name to each protein before sending the response
  const proteinsWithUser = await Promise.all(
    proteins.map(async (protein) => {
      const user = await User.findOne(protein.seller).lean().exec();
      return { ...protein, username: user.username }
    })
  );

  res.json(proteinsWithUser);
});

const getUserProteins = asyncHandler(async (req, res) => {
  const me = await User.findOne({_id: req.user._id}).select('-password').lean()
  const proteins = await Protein.find({seller: {"$eq": me}}).lean();

  if (!proteins) {
    return res.status(400).json({ message: "No protein found" });
  }

  // Add seller name to each protein before sending the response
  const proteinsWithUser = await Promise.all(
    proteins.map(async (protein) => {
      const user = await User.findOne(protein.seller).lean().exec();
      return { ...protein, username: user.username };
    })
  );

  res.json(proteinsWithUser);
});

const createNewProtein = asyncHandler(async (req, res) => {
  const { name, description, price, flavour, image } = req.body;

  if (!name || !description || !price || !flavour || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicate = await Protein.findOne({ name }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate protein title" });
  }

  const proteinImage = await cloudinary.uploader.upload(image);

  const seller = req.user._id
  const protein = await Protein.create({
    seller,
    name,
    description,
    price,
    flavour,
    proteinImage: proteinImage.secure_url,
  });

  if (protein) {
    return res.status(201).json({ message: "New protein created" });
  } else {
    return res.status(400).json({ message: "Invalid protein data received" });
  }
});

const updateProtein = asyncHandler(async (req, res) => {
  let { name, description, price, flavour } = req.body;
  const proteinImage = req.file.path;

  if (!name && !description && !price && !flavour && !proteinImage) {
    return res.status(400).json({ message: "No field got changed" });
  }

  const protein = await Protein.findById(req.params.id).exec(); // need {}?

  if (!protein) {
    return res.status(400).json({ message: "Protein not found" });
  }

  const duplicate = await Protein.findById(req.params.id).lean().exec();

  if (duplicate && duplicate.length > 1) {
    return res.status(409).json({ message: "Duplicate protein title" });
  }

  if (protein) {
    if (name) protein.name = name;
    if (description) protein.description = description;
    if (price) protein.price = price;
    if (flavour) protein.flavour = flavour;

    if (proteinImage) {
      await cloudinary.uploader.destroy(protein.proteinImage);
      const proteinImage = await cloudinary.uploader.upload(image);
      protein.proteinImage = proteinImage.secure_url;
    }

    const updatedProtein = await protein.save();

    res.json(`${updatedProtein.name} updated`);
  }
});

const deleteProtein = asyncHandler(async (req, res) => {
  const id = req.params.id //id??

  if (!id) {
    return res.status(400).json({ message: "Protein name required" });
  }

  const protein = await Protein.findById(id).exec();

  if (!protein) {
    return res.status(400).json({ message: "Protein not found" });
  }

  await cloudinary.uploader.destroy(protein.proteinImage);
  const result = await protein.deleteOne();

  const reply = `Protein with name ${result.name} deleted`;

  res.json(reply);
});


module.exports = {
  getProteins,
  getUserProteins,
  createNewProtein,
  updateProtein,
  deleteProtein,
};
