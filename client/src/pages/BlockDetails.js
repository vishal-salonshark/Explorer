/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../components/AppContext'
import { BsArrowRight, BsFillInfoCircleFill } from 'react-icons/bs'

import Axios from 'axios'

const BlockDetails = () => {
  const [blockDetails, setBlockDetails] = useState({})
  const [ts, setTransactions] = useState([])
  const [ txLenghth, setTxLength] = useState()
  const { blockNumberContext, setTxHashContext, setBlockNumberContext, setAcc } = useContext(AppContext)
  useEffect(() => {
    const timer = setTimeout(() => {
      const value = Number(blockNumberContext)
      Axios.get(`http://localhost:3001/block/${value}`).then(
        async (response) => {
          setBlockDetails(response.data)
          setTxLength(response.data.transactions.length)
          // console.log(blockDetails)
        },
      )

      Axios.get(`http://localhost:3001/tarnsactions/${value}`).then(
        (response) => {
          setTransactions(response.data)
          
        },
      )
    }, 1000)
    return () => clearTimeout(timer)
  }, [blockNumberContext])

  console.log(txLenghth)

  const newTs= String(new Date((blockDetails.timestamp)*1000))
  const _number = blockDetails.number
  const _timestamp = newTs
  const _miner = blockDetails.miner
  const _size = blockDetails.size
  const _hash = blockDetails.hash
  const _parentHash = blockDetails.parentHash
  const _difficulty = blockDetails.difficulty
  const _totalDifficulty = blockDetails.totalDifficulty
  const _gasUsed = blockDetails.gasUsed
  const _gasLimit = blockDetails.gasLimit
  const _nonce = blockDetails.nonce

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen py-2">
      <div className="bg-white min-h-[80vh] w-4/5 mt-16 rounded-2xl flex flex-col shadow-2xl shadow-[#89cdb3b7]">
        <label className=" text-[#030214]  px-16 py-5 text-xl">
          Blocks Details
        </label>

        <div className="h-[35rem] w-full mb-10 flex justify-start items-center flex-col overflow-auto  scrollbar-thin scrollbar-track-inherit scrollbar-thumb-gray-300  overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-ful">
          <div className="  w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Block Height</label>
            </div>
            <div className="   text-black font-light text-sm flex flex-row justify-start items-center ">
              <label>{_number}</label>
            </div>
          </div>

          <div className="   w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Timestamp</label>
            </div>
            <div className=" text-black font-light text-sm flex flex-row justify-start items-center ">
              <label>{_timestamp}</label>
            </div>
          </div>

          <div className="   w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Transactions</label>
            </div>
            <div className="   text-black font-light text-sm flex flex-row justify-start items-center ">
              <label className="p-1 bg-blue-100 text-blue-500 rounded">
                {txLenghth} Transaction
              </label>
            </div>
          </div>

          <div className="   w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Miner</label>
            </div>
            <div className="   text-black font-light text-sm flex flex-row justify-start items-center ">
              <label className="text-blue-500">{_miner}</label>
            </div>
          </div>

          <div className="   w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Size</label>
            </div>
            <div className="   text-black font-light text-sm flex flex-row justify-start items-center ">
              <label>{_size} bytes</label>
            </div>
          </div>

          <div className="   w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Hash</label>
            </div>
            <div className="   text-black font-light text-sm flex flex-row justify-start items-center ">
              <label>{_hash}</label>
            </div>
          </div>

          <div className="   w-full h-16 px-16 flex flex-row ">
            <div className="b w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Parent Hash</label>
            </div>
            <div className="   text-black font-light text-sm flex flex-row justify-start items-center ">
              <label className="text-blue-500">{_parentHash}</label>
            </div>
          </div>

          <div className="   w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Difficulty</label>
            </div>
            <div className="   text-black font-light text-sm flex flex-row justify-start items-center ">
              <label>{_difficulty}</label>
            </div>
          </div>

          <div className="   w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Total Difficulty</label>
            </div>
            <div className="  text-black font-light text-sm flex flex-row justify-start items-center ">
              <label>{_totalDifficulty}</label>
            </div>
          </div>

          <div className="  w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Gas Used</label>
            </div>
            <div className="   text-black font-light text-sm flex flex-row justify-start items-center ">
              <label>{_gasUsed}</label>
            </div>
          </div>

          <div className="   w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Gas Limit</label>
            </div>
            <div className="   text-black font-light text-sm flex flex-row justify-start items-center ">
              <label>{_gasLimit}</label>
            </div>
          </div>

          <div className="   w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Nonce</label>
            </div>
            <div className="   text-black font-light text-sm flex flex-row justify-start items-center ">
              <label>{_nonce}</label>
            </div>
          </div>

          <div className="  w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Miner Reward</label>
            </div>
            <div className="   text-black font-light text-sm flex flex-row justify-start items-center ">
              <label>4.756468797564687975 BIGB</label>
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-white  my-16 min-h-[80vh] w-4/5 rounded-2xl flex flex-col shadow-2xl shadow-[#89cdb3b7]">
        <label className=" text-[#030214]  px-16 py-5 text-xl">
          Transactions
        </label>
        <div className=" w-full h-[40rem] mb-10 flex justify-start items-center flex-col overflow-auto  scrollbar-thin scrollbar-track-inherit scrollbar-thumb-gray-300  overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">
          
          { ts.map((tx, index)=> {
            const transactionReceipt = tx.transactions
            const _hash = String(transactionReceipt.transactionHash)
            const _from = String(transactionReceipt.from)
            const _to = String(transactionReceipt.to)
            const _number = String(transactionReceipt.blockNumber)
            const _txFees = String(transactionReceipt.gasUsed)
            const _contractAddress = String(transactionReceipt.contractAddress)
            return (
              _contractAddress === 'null' ?
              <div className="w-11/12 h-28 m-2 flex flex-row " key={index}>
                <div className="bg-blue-100  w-[15rem] flex flex-col justify-center items-center h-full border border-blue-500 border-l-4 rounded-sm ">
                  <Link
                    className="font-bold  text-xs text-blue-700"
                    to={`/ blockDetails`}
                  >
                    Transactions
                  </Link>
                  <label className="font-light text-xs text-blue-500">
                    Success
                  </label>
                </div>
                <div className="w-full h-full border border-gray-300 rounded flex flex-row justify-start items-center py-2">
                  <div className=" w-full h-full flex flex-col justify-center items-start text-gray-400 p-4 mx-2">
                    <Link className="text-blue-500 text-sm" to={'/transactionDetails'} onClick={()=> setTxHashContext(_hash)} >
                      {_hash}
                      <small className="text-black font-light bg-gray-300 rounded-sm my-1 p-1 ">
                        Transfer
                      </small>
                    </Link>
                    <small className=" text-blue-500 flex flex-row justify-end text-xs">
                    <Link to={`/UserDetails`} onClick={(e)=>setAcc(e.target.textContent)}>{_from}</Link>{' '}
                      <BsArrowRight className=" text-blue-500 text-base font-bold" />{' '}
                      <Link to={`/UserDetails`} onClick={(e)=>setAcc(e.target.textContent)}>{_to}</Link>
                    </small>
                    <small className="text-black font-light text-xs">
                      {_txFees} <label className="text-gray-400 "> TX Fee</label>
                    </small>
                  </div>
                  <div className=" w-1/4 flex flex-col justify-center items-end text-gray-400 h-full p-4 mx-2">
                    <small className="text-blue-500">Block #<Link to={'/blockDetails'} onClick={(e)=>setBlockNumberContext(e.target.textContent)}>{_number}</Link></small>
                    <small>22 hours ago</small>
                  </div>
                </div>
              </div>
              : <div className="w-11/12 h-28 m-2 flex flex-row " key={index}>
              <div className="bg-green-100  opacity-70 w-[15rem] flex flex-col justify-center items-center h-full border border-green-500 border-l-4 rounded-sm ">
                <label className="font-bold  text-xs text-green-700">
                Contract Creation
                </label>
                <label className="font-light text-sm text-green-500">
                  Success
                </label>
              </div>
              <div className="w-full h-full border border-gray-300 rounded flex flex-row justify-start items-center py-2">
                <div className=" w-full h-full flex flex-col justify-center items-start text-gray-400 p-4 mx-2">
                  <div className=' flex flex-row items-center'>
                  <Link className='text-blue-500 flex flex-row justify-end text-xs' to={`/transactionDetails`} onClick={(el) => setTxHashContext(el.target.textContent)}>{_hash}{' '}</Link>
                    <small className="text-black font-light bg-gray-300 rounded-sm m-2 p-1 ">
                      Transfer
                    </small></div>
                  <label className=" text-blue-500 flex flex-row justify-end text-xs">
                    <label className=' text-gray-400'>Created By :</label><Link className="mx-2 truncate" to={`/UserDetails`} onClick={(e)=>setAcc(e.target.textContent)}>{_from}</Link>
                    {/* <BsArrowRight className=" text-blue-500" />{' '} */}
                    <label className=' text-gray-400'>Contract Address :</label><Link className="mx-2 truncate" to={`/UserDetails`} onClick={(e)=>setAcc(e.target.textContent)}>{_contractAddress}</Link>
                  </label>
                  <small className="text-black font-light">
                    {_gasUsed}{' '}
                    <label className="text-gray-400 "> TX Fee</label>
                  </small>
                </div>
                <div className=" w-1/5 flex flex-col justify-center items-end text-gray-400 h-full p-4 mx-2">
                  <small className="text-blue-500">
                    Block #<Link to={'/blockDetails'} onClick={(e)=>setBlockNumberContext(e.target.textContent)}> {_number} </Link>
                  </small>
                  <small>22 hours ago</small>
                </div>
              </div>
            </div>
            )
          })}

        </div>
      </div>
    </div>
  )
}

export default BlockDetails
