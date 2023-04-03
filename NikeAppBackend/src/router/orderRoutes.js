const express = require("express");
const { createOrder, getOrder } = require("../database/orders");
const router = express.Router();

router.get("/:reference", async (req, res) => {

  try {
    const order = await getOrder(req.params.reference);

    if (!order) {
      res.status(404).send({ status: "FAILED", error: "Order not found" });
      return;
    }

    res.send({ status: "OK", data: order });
  } catch (error) {
    res.send({ status: "Failed", error: error.message });
  }

});

router.post("/", async (req, res) => {
  const order = req.body;
  const ref = (Math.random() + 1).toString(36).substring(7);
  order.ref = ref;
  try {
    const newOrder = await createOrder(order);
    res.status(201).send({ status: 201, data: newOrder });
  } catch (error) {
    res.status(401).send({ status: "Failed", error: error.message });
  }
});

module.exports = router;
