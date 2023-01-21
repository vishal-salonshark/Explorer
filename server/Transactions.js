const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const txSchema = new Schema({
  blockNumber: String,
  blockHash: String,
  transactions: Object,
});

const Transactions = model("Transactions", txSchema);
module.exports = Transactions; 