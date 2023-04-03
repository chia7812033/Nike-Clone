const express = require("express");
const { getAllProducts, getProduct } = require("../database/product");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.send({ status: 200, data: products });
});

router.get("/:productId", async (req, res) => {
  try {
    const product = await getProduct(req.params.productId);

    if (!product) {
      res.status(404).send({ status: "FAILED", error: "Product not found" });
    }

    res.send({ status: 200, data: product });
  } catch (error) {
    res.status(401).send({ status: "FAILED", error: error.message });
  }
});

module.exports = router;
