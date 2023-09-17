const products = require("../Models/products");
const multer = require("multer");
const date = require("date-and-time");
const User = require("../Models/Users");

// Configure multer for file storage
const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (req, file, callback) => {
    const fileName = Date.now() + file.originalname.replace(/ /g, "");
    callback(null, fileName);
  },
});
exports.upload = multer({ storage: fileStorage });

exports.addProduct = (req, res) => {
  const { description, name, price, category, stock, rate, reviews, seller } =
    req.body;
  const product = new products({
    name,
    price,
    description,
    category,
    stock,
    image: req.file.filename,
    rate,
    reviews,
    seller,
  });
  product
    .save()
    .then((product) => {
      res.status(201).json(product);
    })
    .catch((err) => {
      res.send(err);
    });
};


//Get all products
exports.getAllProducts = async (req, res) => {
  const product = await products.find();
  res.send(product);
};

//Get Seller`s products \
exports.getSellerProducts = async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await products.find({ seller: _id });
    res.send(product);
  } catch (error) {
    console.log(error);
  }
};

//Get product by it`s id
exports.getById = async (req, res) => {
  const product = await products.findById(req.params._id);
  res.send(product);
};

//Update existing product
exports.updateProduct = async (req, res) => {
  try {
    console.log(req.body)
    const update = await products.findByIdAndUpdate(req.params.id, { ...req.body });
    console.log(update)
    res.send(update);
  } catch (error) {
    console.log(error)
  }
};

//Delete existing product by Id
exports.delProduct = async (req, res) => {
  const deleted = await products.findByIdAndDelete(req.params.id);
  res.send(deleted);
};



//Delete all products 
exports.delAllProducts = async (req, res) => {
  const deleted = await products.deleteMany()
  res.send(deleted)
}


//Product Rate
exports.productRate = async (req, res) => {
  try {
    const product = await products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    console.log("before");
    const averageRate = calculateAverageRate(product.rate);
    console.log("after");
    res.json({ averageRate });
  } catch (error) {
    console.error("Error calculating average rate:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//use put or patch if user make rate update product rate
//find by id and update
//  calculate the average rate
function calculateAverageRate(rate) {
  let totalRate = 0;
  let numRate = rate.length;

  if (numRate === 0) {
    return 0;
  }

  for (let i = 0; i < numRate; i++) {
    totalRate += rate[i];
  }

  return totalRate / numRate;
}

//Product Patch or update
exports.updateProductRate = async (req, res) => {
  try {
    const productId = req.params.id;
    const newRate = req.body.rate;

    const product = await products.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.rate.push(newRate);
    await product.save();

    const averageRate = calculateAverageRate(product.rate);

    res.json({ averageRate });
  } catch (error) {
    console.error("Error updating product rate:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
