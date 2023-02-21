/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react'
import AppContext from '../components/AppContext'

const { ethers } = require("ethers");

const AccountBal = () => {

    const { acc} = useContext(AppContext)

    // eslint-disable-next-line
    const [errorMessage, setErrorMessage] = useState(null)
    const [defaultAccount, setDefaultAccount] = useState(null)
    const [userBalance, setUserBalance] = useState(null)
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
            // console.log(tokenData)
            setTokenBalances(tokenData)
        }
        
        
        const onSub = async (acc) => {
            try {
                accountChangedHandler(await acc)
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
        try {
            window.ethereum.on('accountsChanged', accountChangedHandler)
        } catch (error) {
            if (window.ethereum === undefined) {
                console.log("please install Metamask ...")
            } else {
                console.log(error)
            }
        }
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
        <div className='w-11/12 min-h-22 p-16 text-white'>
            <div className='font-bold text-3xl my-5'>Address Details</div>
            <div className='font-bold text-xl underline'>{acc}</div>
            <div className=' h-28 py-3 flex flex-row   my-3 overflow-x-scroll scrollbar-hide w-[75rem] '>

                <div className=' w-44  rounded-lg mx-3 flex flex-col justify-center items-center bg-white text-black'>
                    <label className='w-44 text-center text-lg font-extrabold'>ETH :</label>
                    <label className='w-44 text-center text-base font-semibold my-1 px-5 truncate'>{userBalance}</label>
                    {/* <label className='w-44 text-center text-base font-semibold my-1 px-5 truncate'>18.2046795</label> */}
                </div>

                {Object.entries(tokenBalances).map(([token, { symbol, balance }]) => (
                    <div className=' w-44  rounded-lg mx-3 flex flex-col justify-center items-center bg-white text-black' key={token}>
                        <label className='w-44 text-center text-lg font-extrabold'>{symbol} :</label>
                        <label className='w-44 text-center text-base font-semibold my-1 px-5 truncate'>{balance}</label>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default AccountBal
