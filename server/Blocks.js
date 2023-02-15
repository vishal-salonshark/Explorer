const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const blockSchema = new Schema({
  blockNumber: String,
  blockHash: String,
  timeStamp: String,
  blockSize: Number,
  miner : String,
  gasLimit : String,
  gasUsed : String,
  transactions: Array,
});

const Blocks = model("Blocks", blockSchema);
module.exports = Blocks; 