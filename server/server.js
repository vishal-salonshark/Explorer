/* eslint-disable no-unused-vars */
const express = require("express");
const Web3 = require('web3')
const app = express();
const mongoose = require("mongoose");
var UserData = require('./UserData')
const BlocksModel = require("./Blocks");
const TransactionsModel = require("./Transactions");
const {Worker}= require('worker_threads')

const cors = require("cors");

const web3 = new Web3(
  new Web3.providers.HttpProvider('http://99.80.123.81:8545'),
  )

// const web3 = new Web3(
//   new Web3.providers.HttpProvider('https://eth-goerli.g.alchemy.com/v2/rKOY5TxJrgsatqlZdnhKIeQBC3Xx5PUi'),
// )

app.use(express.json())
app.use(cors());


async function getBlockData() {
  var latestBlock = await web3.eth.getBlockNumber()
  var block = await web3.eth.getBlock(latestBlock)
  return block
};
async function getBlockDataOf(num) {
  // var latestBlock = await web3.eth.getBlockNumber()
  var block = await web3.eth.getBlock(num)
  return block
};

async function getTransactionDetails(t) {
  var _transaction = await web3.eth.getTransactionReceipt(t)
  return _transaction
};

async function dataLoder() {
  setInterval(async () => {
    var _block = await getBlockData();
    var number = _block.number;
    var _hash = _block.hash
    var _tx = await _block.transactions
    var _timestamp = _block.timestamp
    var _size = _block.size
    var _miner = _block.miner
    var _gasLimit = _block.gasLimit
    var _gasUsed = _block.gasUsed
    if (number !== _number) {
      const BLOCK = await BlocksModel.create({
        // block: _block,
        blockNumber: number,
        blockHash: _hash,
        timeStamp: _timestamp,
        blockSize : _size,
        miner: _miner,
        gasLimit : _gasLimit,
        gasUsed : _gasUsed,
        transactions: _tx,
      });
        // console.log(number);
        _number = number;
      }
    }, 3000)  
};

var _number = null;
mongoose.set('strictQuery', false);
mongoose
.connect(
  'mongodb+srv://Explorer:Exp121@explorer.fgll2dl.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(async () => {
    console.log('CONNECTED')
    dataLoder()
  })
  
  const worker = new Worker("./worker.js")
  worker.on('message', (msg) => console.log(msg));

  // TransactionsModel.find({ "transactions.from": "0xaaaaaaa3ea06c421c320903c77d8f1dde895690f"}, (err, result) => {
  //   console.log(result);
  // }).select('transactions.from transactions.to transactions.transactionHash').sort({ _id: -1 });


app.get("/", (req, res) => {
  BlocksModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  }).sort({ _id: -1 });
});

//app.get("/tarnsactions/:number", (req, res) => {
//  var num = parseInt(req.params.number);
//  console.log(`this is the number sent in req ${num}`)
// BlocksModel.find({ "blockNumber": num }, (err, result) => {
//    if (err) {
//      res.json(err);
//      res.json(result);
//    } else {
//    }
//  }).select('transactions');
//});

app.put('/signUp', async (req, res) => {
  const email = req.body.email
  const userID = req.body.userid
  const password = req.body.password

  const data = UserData.create({
    email : email,
    userID : userID,
    password: password,
  })

  res.json({result:"success"})

})

app.get('/login/:emailID',(req, res) => {
  var emailid = req.params.emailID
  UserData.find({"email" : emailid}).then( (result) => {
      res.json(result);
    })
  })



app.get("/tarnsactions/:number", (req, res) => {
  var num = parseInt(req.params.number);
  console.log(`this is the number sent in req ${num}`)
  TransactionsModel.find({ "blockNumber": num }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/tarnsactionsList/", (req, res) => {
  TransactionsModel.find({ }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  }).select('transactions').sort({ _id: -1 });
});


app.get("/block/:number", async (req, res) => {
  var num = parseInt(req.params.number);
  console.log(`this is the number sent in req ${num}`)
  var _block = await getBlockDataOf(num)
       res.json(_block);
});

app.get("/tx/:transactions", async (req, res) => {
  var tx = req.params.transactions;
  console.log(`this is the tx Hash sent in req ${tx}`)
  res.json(await getTransactionDetails(tx));
});


app.get("/user-from/:ux", (req, res) => {
  var _ux = req.params.ux;
  console.log(`this is the hash sent in req ${_ux}`)
  
  TransactionsModel.find({ "transactions.from": _ux }, (err, result) => {
    try {
      if ( result !== null){
        res.json(result);
      }
    } catch (error) {
      console.log(error)
    }

  }).select('transactions.from transactions.to transactions.transactionHash transactions.blockNumber transactions.contractAddress').sort({ _id: -1 });
});

app.get("/user-to/:ux", (req, res) => {
  var _ux = req.params.ux;
  console.log(`this is the hash sent in req ${_ux}`)
  
  TransactionsModel.find({ "transactions.to": _ux }, (err, result) => {
    try {
      if ( result !== null){
        res.json(result);
      }
    } catch (error) {
      console.log(error)
    }

  }).select(' transactions.to transactions.from transactions.transactionHash transactions.blockNumber').sort({ _id: -1 });
});

app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});
