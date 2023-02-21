/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../components/AppContext'
import {
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
} from 'react-icons/ai'
import { BsFillInfoCircleFill } from 'react-icons/bs'

import Axios from 'axios'

const TransactionDetails = () => {
  const [ts, setTransactions] = useState([])
  const { txHashContext, setBlockNumberContext, setAcc } = useContext(AppContext)
  // console.log(txHashContext)

  useEffect(() => {
    const timer = setTimeout(() => {
      const value = txHashContext
      // console.log(value)

      Axios.get(`http://localhost:3001/tx/${value}`).then((response) => {
        setTransactions(response.data)
      })
    }, 1000)
    return () => clearTimeout(timer)
  }, [txHashContext])


  const _hash = String(ts.transactionHash)
  const _from = String(ts.from)
  const _to = String(ts.to)
  const _status = String(ts.status)
  const _number = String(ts.blockNumber)
  const _txFees = String(ts.gasUsed)
  const _gasPrice = String(ts.effectiveGasPrice)
  const _type = String(ts.type)
  const _contractAddress = String(ts.contractAddress)

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[95vh] ">
      <div className="bg-white min-h-[50vh] w-4/5 rounded-2xl flex flex-col shadow-2xl shadow-[#89cdb3b7]">
        <label className=" text-[#030214]  px-16 py-5 text-xl">
        Transaction Details
        </label>

        <div className="h-[35rem] w-full mb-10 flex justify-start items-center flex-col overflow-auto  scrollbar-thin scrollbar-track-inherit scrollbar-thumb-gray-300  overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-ful">
          <div className="  w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Transaction Hash</label>
            </div>
            <div className="   text-black font-light text-sm flex flex-row justify-start items-center ">
              <label>{_hash}</label>
            </div>
          </div>

          <div className="   w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Result</label>
            </div>
            <div className=" text-black font-light text-sm flex flex-row justify-start items-center ">
              {_status ? (
                <label className=" text-green-600 flex flex-row justify-start items-center  text-sm">
                  <AiOutlineCheckCircle className="mx-1 text-lg" />
                  Success
                </label>
              ) : (
                <label className=" text-yellow-600 flex flex-row justify-start items-center  text-sm ">
                  <AiOutlineExclamationCircle className="mx-1 text-lg" />
                  Waiting
                </label>
              )}
            </div>
          </div>

          <div className="   w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Status</label>
            </div>
            <div className="   text-black font-light text- flex flex-row justify-start items-center ">
              {_status ? (
                <label className=" text-green-600 bg-green-100 rounded-md p-1 font-light text-sm">
                  Complete
                </label>
              ) : (
                <label className=" text-yellow-600 bg-yellow-200 rounded text-sm">
                  Pending
                </label>
              )}
            </div>
          </div>

          <div className="   w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Block</label>
            </div>
            <div className="   text-black font-light text-sm flex flex-row justify-start items-center ">
              <Link className="text-blue-500 text-sm" to={'/blockDetails'} onClick={(e)=>{setBlockNumberContext(e.target.textContent)}}>{_number}</Link></div>
          </div>

          <div className="   w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>From</label>
            </div>
            <div className="   text-black font-light text-sm flex flex-row justify-start items-center ">
              <Link className="text-blue-500" to={`/UserDetails`} onClick={(e)=>setAcc(e.target.textContent)}>{_from}</Link>
            </div>
          </div>
          
          {_contractAddress === 'null'? <div className="   w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>To</label>
            </div>
            <div className="   text-black font-light text-sm flex flex-row justify-start items-center ">
              <Link className="text-blue-500" to={`/UserDetails`} onClick={(e)=>setAcc(e.target.textContent)}>{_to}</Link>
            </div>
          </div>
          : <div className="   w-full h-16 px-16 flex flex-row ">
          <div className="b w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
            <BsFillInfoCircleFill className="mx-2" />
            <label>ContractAddress</label>
          </div>
          <div className="   text-black font-light text-sm flex flex-row justify-start items-center ">
          <Link className="text-blue-500" to={`/ContractDetails`} onClick={(e)=>setAcc(e.target.textContent)}>{_contractAddress}</Link>
          </div>
        </div>
          }

          <div className="   w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Transaction Fee</label>
            </div>
            <div className="   text-black font-light text-sm flex flex-row justify-start items-center ">
              <label>{_txFees}</label>
            </div>
          </div>

          <div className="   w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Gas Price</label>
            </div>
            <div className="   text-black font-light text-sm flex flex-row justify-start items-center ">
              <label>{_gasPrice}</label>
            </div>
          </div>

          <div className="   w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Transaction Type</label>
            </div>
            <div className="  text-black font-light text-sm flex flex-row justify-start items-center ">
              <label>{_type}</label>
            </div>
          </div>

          <div className="  w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Gas Used</label>
            </div>
            <div className="   text-black font-light text-sm flex flex-row justify-start items-center ">
              <label>{_txFees}</label>
            </div>
          </div>

          <div className="   w-full h-16 px-16 flex flex-row ">
            <div className=" w-1/5 mx-2 text-gray-500  font-light text-sm h-full flex flex-row justify-start items-center">
              <BsFillInfoCircleFill className="mx-2" />
              <label>Gas Limit</label>
            </div>
            <div className="   text-black font-light text-sm flex flex-row justify-start items-center ">
              <label>{_txFees}</label>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default TransactionDetails
