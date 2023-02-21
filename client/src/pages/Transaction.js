import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import AppContext from '../components/AppContext'

import Axios from 'axios'

const Transaction = () => {
  const [transaction, setTransactions] = useState([])
  const { setTxHashContext, setBlockNumberContext, setAcc} = useContext(AppContext)

  useEffect(() => {
    const timer = setTimeout(() => {
      Axios.get(`http://localhost:3001/tarnsactionsList/`).then((response) => {
        setTransactions(response.data)
      })
    }, 1000)
    return () => clearTimeout(timer)
  }, [])
  

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen py-2">
      <div className=" bg-white  my-16 min-h-[80vh] w-4/5 rounded-2xl flex flex-col shadow-2xl shadow-[#89cdb3b7]">
        <label className=" text-[#030214]  px-16 py-5 text-xl">
          Validated Transactions
        </label>
        <div className=" w-full h-[40rem] mb-10 flex justify-start items-center flex-col overflow-auto  scrollbar-thin scrollbar-track-inherit scrollbar-thumb-gray-300  overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">
          {transaction.map((e, index) => {
            return (
             e.transactions.contractAddress === null? 
              <div className="w-11/12 h-28 m-2 flex flex-row " key={index}>
                <div className="bg-blue-200  opacity-70 w-[15rem] flex flex-col justify-center items-center h-full border border-blue-500 border-l-4 rounded-sm ">
                  <label className="font-bold  text-xs text-blue-700">
                    Transactions
                  </label>
                  <label className="font-light text-sm text-blue-500">
                    Success
                  </label>
                </div>
                <div className="w-full h-full border border-gray-300 rounded flex flex-row justify-start items-center py-2">
                  <div className=" w-full h-full flex flex-col justify-center items-start text-gray-400 p-4 mx-2">
                    <div className=' flex flex-row items-center'>
                    <Link className='text-blue-500 flex flex-row justify-end text-xs' to={`/transactionDetails`} onClick={(el) => setTxHashContext(el.target.textContent)}>{e.transactions.transactionHash}{' '}</Link>
                      <small className="text-black font-light bg-gray-300 rounded-sm m-2 p-1 ">
                        Transfer
                      </small></div>
                    <label className=" text-blue-500 flex flex-row justify-end text-xs">
                      <Link className="mx-2" to={`/UserDetails`} onClick={(e)=>setAcc(e.target.textContent)}>{e.transactions.from}</Link>
                      <BsArrowRight className=" text-blue-500" />{' '}
                      <Link className="mx-2" to={`/UserDetails`} onClick={(e)=>setAcc(e.target.textContent)}>{e.transactions.to}</Link>
                    </label>
                    <small className="text-black font-light">
                      {e.transactions.gasUsed}{' '}
                      <label className="text-gray-400 "> TX Fee</label>
                    </small>
                  </div>
                  <div className=" w-1/4 flex flex-col justify-center items-end text-gray-400 h-full p-4 mx-2">
                    <small className="text-blue-500">
                      Block #<Link to={'/blockDetails'} onClick={(e)=>setBlockNumberContext(e.target.textContent)}> {e.transactions.blockNumber} </Link>
                    </small>
                    <small>22 hours ago</small>
                  </div>
                </div>
              </div>
              : <div className="w-11/12 h-28 m-2 flex flex-row " key={index}>
              <div className="bg-green-100  opacity-70 w-[15rem] flex flex-col justify-center items-center h-full border border-green-500 border-l-4 rounded-sm ">
                <label className="font-bold  text-xs text-green-700">
                Contract Creation
                </label>
                <label className="font-light text-sm text-green-700">
                  Success
                </label>
              </div>
              <div className="w-full h-full border border-gray-300 rounded flex flex-row justify-start items-center py-2">
                <div className=" w-full h-full flex flex-col justify-center items-start text-gray-400 p-4 mx-2">
                  <div className=' flex flex-row items-center'>
                  <Link className='text-blue-500 flex flex-row justify-end text-xs' to={`/transactionDetails`} onClick={(el) => setTxHashContext(el.target.textContent)}>{e.transactions.transactionHash}{' '}</Link>
                    <small className="text-black font-light bg-gray-300 rounded-sm m-2 p-1 ">
                      Transfer
                    </small></div>
                  <label className=" text-blue-500 flex flex-row justify-end text-xs">
                    <label className=' text-gray-400'>Created By :</label><Link className="mx-2 truncate" to={`/UserDetails`} onClick={(e)=>setAcc(e.target.textContent)}>{e.transactions.from}</Link>
                    {/* <BsArrowRight className=" text-blue-500" />{' '} */}
                    <label className=' text-gray-400'>Contract Address :</label><Link className="mx-2 truncate" to={`/ContractDetails`} onClick={(e)=>setAcc((e.target.textContent).toLowerCase())}>{e.transactions.contractAddress}</Link>
                  </label>
                  <small className="text-black font-light">
                    {e.transactions.gasUsed}{' '}
                    <label className="text-gray-400 "> TX Fee</label>
                  </small>
                </div>
                <div className=" w-1/5 flex flex-col justify-center items-end text-gray-400 h-full p-4 mx-2">
                  <small className="text-blue-500">
                    Block #<Link to={'/blockDetails'} onClick={(e)=>setBlockNumberContext(e.target.textContent)}> {e.transactions.blockNumber} </Link>
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

export default Transaction
