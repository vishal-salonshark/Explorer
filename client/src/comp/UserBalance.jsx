/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { ethers } from 'ethers'
import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

export function UserBalance(acc) {
  const [errorMessage, setErrorMessage] = useState(null)
  const [defaultAccount, setDefaultAccount] = useState(null)
  const [userBalance, setUserBalance] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [tokenBalances, setTokenBalances] = useState({})

  const provider = new ethers.providers.JsonRpcProvider('http://99.80.123.81:8545')
  const tokenAddresses = {
    mctk: '0xd33709aD9462FEaF29f32C1db0e1Cf529305282f',
    alpha: '0xf2567A10b2A0EC62990d36516865CFC2b401B07F',
    theta: '0x7adC438a3E0Da710D610e576515899EF17b9119B',
    gamma: '0xb9Ae6CBa61d964A838555d1b3cD4a89b20f40b4A',
    lambda: '0xD376ebe2C747dbC9876C039E7511E867c503877e',
  }

  // The ERC-20 Contract ABI, which is a common contract interface
  // for tokens (this is the Human-Readable ABI format)
  const contractAbi = [
    // Some details about the token
    'function name() view returns (string)',
    'function symbol() view returns (string)',

    // Get the account balance
    'function balanceOf(address) view returns (uint)',

    // Send some of your tokens to someone else
    // 'function transfer(address to, uint amount)',

    // An event triggered whenever anyone transfers to someone else
    // 'event Transfer(address indexed from, address indexed to, uint amount)',
  ]

  useEffect(() => {
    async function fetchData() {
      let tokenData = {}
      for (const [token, address] of Object.entries(tokenAddresses)) {
        const contract = new ethers.Contract(address, contractAbi, provider)
        const symbol = await contract.symbol()
        const balance = await contract.balanceOf(defaultAccount)
        tokenData[token] = {
          symbol,
          balance: ethers.utils.formatUnits(balance, 18),
        }
      }
      console.log(tokenData)
      setTokenBalances(tokenData)
    }
    const onSub = async (acc) => {
      try {
        accountChangedHandler( await acc.acc)
      //   setDefaultAccount(acc.acc)
      // getAccountBalance(acc.acc)
      } catch (error) {
        console.log(error)
      }
    }
    onSub(acc)

    if (defaultAccount) {
      fetchData()
    }
  }, [defaultAccount, acc])

  useEffect(() => {
    // window.ethereum.on('accountsChanged', accountChangedHandler)
    window.ethereum.on('accountsChanged', accountChangedHandler )
  }, [])

  const accountChangedHandler = async (newAccount) => {
    if (newAccount) {
      setDefaultAccount(newAccount)
      getAccountBalance(newAccount)
    }
  }

  const getAccountBalance = (account) => {
    window.ethereum
      .request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance))
      })
      .catch((error) => {
        setErrorMessage(error.message)
      })
  }
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Header>Balance</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item><small><strong>ETH :</strong> {userBalance}</small></ListGroup.Item>
            {Object.entries(tokenBalances).map(([token, { symbol, balance }]) => (
              <ListGroup.Item key={token}><small><strong>{symbol} :</strong>{balance}</small></ListGroup.Item>
            ))} 
        </ListGroup>
      </Card>
    </div>
    //   </div>
    // </div>
  )
}
export default UserBalance
