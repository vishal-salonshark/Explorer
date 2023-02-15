/* eslint-disable no-unused-vars */
const express = require("express");
const Web3 = require('web3')
const app = express();
const mongoose = require("mongoose");
const BlocksModel = require("./Blocks");
const TransactionsModel = require("./Transactions");

const {parentPort} = require('worker_threads')


const cors = require("cors");
const { response } = require("express");

const web3 = new Web3(
  new Web3.providers.HttpProvider('http://99.80.123.81:8545'),
  )

// const web3 = new Web3(
//   new Web3.providers.HttpProvider('https://eth-goerli.g.alchemy.com/v2/rKOY5TxJrgsatqlZdnhKIeQBC3Xx5PUi'),
// )

app.use(express.json())
app.use(cors());

parentPort.postMessage(`Worker thread in Action....`)

async function getBlockData() {
  var latestBlock = await web3.eth.getBlockNumber()
  var block = await web3.eth.getBlock(latestBlock)
  return block
};

async function getTransactionDetails(t) {
  var _transaction = await web3.eth.getTransactionReceipt(t)
  return _transaction
};

function txLoder() {
  BlocksModel.findOne({}, async (err, result) => {
    if (err || result == null) {
      console.log(err);
      // setImmediate(txLoder)
    } else {
      // result.map(async (result) => {
      // })
      var number = (await result.blockNumber);
      // console.log(await result.blockNumber)
      if (number !== _number) {
        var tx = (await result.transactions);
        var _num = (await result.blockNumber)
        var _hash = (await result.blockHash)
        var n = 0;
        // console.time(" tx loading...")
        tx.map(async (tx) => {
          // console.log(tx)
          const data = await getTransactionDetails(tx)
          const transactions = await TransactionsModel.create({
            blockNumber: _num,
            blockHash: _hash,
            transactions: data,
          });
          console.log(`transaction added succsessfully ${++n}`);
        })
        // console.timeEnd(" tx loading...")
        // _number = number;
      }
      // setImmediate(txLoder)
    }
  }).sort({ _id: -1 });
}
var _number = null;
mongoose.set('strictQuery', false);
mongoose
  .connect(
    'mongodb+srv://Explorer:Exp121@explorer.fgll2dl.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(async () => {
    console.log('CONNECTED')
    setInterval(async () => {
      txLoder()
    }, 3000)
    })


