const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var cors = require('cors')
const { verifier } = require('./src/verification')

app.use(bodyParser.json())
app.use(cors())

app.put('/verify', async (req, res) => {
  const chainChoice = req.body.chainChoice
  const solc_version = req.body.solc_version
  const file_name = req.body.file_name
  const contract_address = req.body.contract_address
  const is_optimized = req.body.is_optimized
  const solidity_code = req.body.solidity_code

  if (typeof chainChoice == 'undefined') {
    res.send({ message: 'Please specify a chain (e.g. mainnet)' })
  } else {
    console.log("You've chosen: " + chainChoice)

    const net_to_provider = {
      mainnet: 'https://mainnet.infura.io',
      ropsten: 'https://ropsten.infura.io',
      kovan: 'https://kovan.infura.io',
      rinkeby: 'https://rinkeby.infura.io',
      custom: 'http://99.80.123.81:8545',
      Goerli:
        'https://eth-goerli.g.alchemy.com/v2/rKOY5TxJrgsatqlZdnhKIeQBC3Xx5PUi',
    }

    if (
      chainChoice == 'mainnet' ||
      chainChoice == 'ropsten' ||
      chainChoice == 'kovan' ||
      chainChoice == 'rinkeby' ||
      chainChoice == 'custom' ||
      chainChoice == 'Goerli'
    ) {
      const provider = net_to_provider[chainChoice]
      const answers = {
        solc_version: solc_version,
        file_name: file_name,
        contract_address: contract_address,
        is_optimized: is_optimized,
        solidity_code : solidity_code,
        file_folder: process.cwd(),
      }
      // console.log(answers)
      // console.log(provider)
      var result = await verifier(answers, provider)
      console.log(await result)
    } else {
      res.send({
        message:
          'Invalid chain choice Your current choice is by default: mainchain',
      })
    }
  }
})

app.listen(3002, () => {
  console.log('Server started on port 3000')
})
