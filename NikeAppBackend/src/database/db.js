const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://dan891221:${process.env.MONGO_PASSWORD}@cluster0.pyfxgkx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

const database = client.db("Nike");
const products = database.collection("products");
const orders = database.collection("orders");

module.exports = {
  products,
  orders,
};
