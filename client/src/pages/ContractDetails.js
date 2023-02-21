/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react'
import AppContext from '../components/AppContext'
import { Link } from 'react-router-dom'
import Axios from 'axios'
const { ethers } = require("ethers");

const ContractDetails = () => {


  const provider = new ethers.providers.JsonRpcProvider('http://99.80.123.81:8545')

  const { acc, setAcc } = useContext(AppContext)
  const [userDataFrom, setUserDataFrom] = useState([])
  const [bytecode, setBytecode] = useState([])
  const [userDataTo, setUserDataTo] = useState([])


const getBytecode = async () =>{
  const _bytecode = await provider.getCode(acc);
  setBytecode(_bytecode)
}  
  

  useEffect(() => {
    Axios.get(`http://localhost:3001/user-from/${acc}`).then(
      async (response) => {
        setUserDataFrom(await response.data)
      },
    )
    Axios.get(`http://localhost:3001/user-to/${acc}`).then(async (response) => {
      setUserDataTo(response.data)
    })

    getBytecode()
  }, [acc])

  return (
    <div className="flex flex-col justify-center items-center  w-full min-h-[95vh] ">
      <div className="w-11/12 min-h-[25rem]">
        <label className="text-2xl font-bold text-white mx-14 ">
          Contract Address Details
        </label>
        <div className=' flex flex-row justify-between items-center mx-16 '>
        <div className="font-semibold text-white text-xl underline">{acc}</div>
        <Link className=' border-[#89CDB3] text-center p-2 border-2 rounded w-40 h-10 text-base font-semibold text-[#89CDB3] hover:bg-[#89CDB3] hover:text-white' to={'/VerifyContract'} onClick={(e) =>{setAcc(acc)}} >
          Verify Contract 
        </Link>
        </div>
        <div className=' w-full flex justify-center items-center '>
          <div className="flex w-11/12 flex-col mt-10 bg-white justify-center items-center shadow-lg shadow-gray-400 rounded-lg">
          <label className="w-11/12 text-lg font-semibold text-left my-5 ">Deployed ByteCode</label> 
          <div className=" w-11/12 h-36 mb-5 text-sm font-light break-all overflow-auto  px-5 scrollbar-thin scrollbar-track-inherit scrollbar-thumb-gray-300  overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">{bytecode}</div>
          </div>
        </div>
       
      </div>

      <div className=" w-11/12 h-auto">
        <div className="flex flex-row text-white  h-[20rem] w-full py-4">
          <div className="  w-1/2 h-full mx-2 p-4 border-2 border-gray-400 rounded-3xl ">
            <div className=" h-16 border-b-2 mb-2 border-gray-400 flex items-center ">
              <label className=" text-white text-xl ">Transaction From</label>
            </div>

            <div className="overflow-auto h-[25rem] scrollbar-thin scrollbar-track-inherit scrollbar-thumb-gray-300  overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              {userDataTo.map((items, index) => {
                return (
                  <div
                    className=" h-16 border-b-2 border-gray-400 flex flex-row items-center "
                    key={index}
                  >
                    <div className="bg-gray-400 m-4 h-12 w-12 rounded-lg">
                      <label className="justify-center flex items-center h-full w-full text-black text-sm">
                        TX
                      </label>
                    </div>

                    <div className=" h-11 w-56 m-1 flex flex-col justify-center">
                      <label className="text-blue-500 truncate text-sm font-medium">
                        {items.transactions.transactionHash}
                      </label>
                      <label className="text-gray-300 text-sm">
                        {' '}
                        5 min ago...
                      </label>
                    </div>

                    <div className=" h-11 w-56 mx-4 flex flex-col justify-center ">
                      <label className="text-white truncate text-sm font-medium flex flex-row ">
                        From:
                        <small className="text-blue-500 mx-1 w-20 truncate text-sm font-light">
                          <Link
                            to={`/UserDetails`}
                            onClick={(e) => setAcc(e.target.textContent)}
                          >
                            {items.transactions.from}
                          </Link>
                        </small>
                      </label>
                      <label className="text-gray-300 truncate text-xs font-medium flex flex-row ">
                        BlockNumber:
                        <small className="text-gray-300 mx-1 w-20 truncate text-xs font-light">
                          {items.transactions.blockNumber}
                        </small>
                      </label>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className=" w-1/2 h-full mx-2 p-4 border-2 border-gray-400 rounded-3xl">
            <div className=" h-16 border-b-2 mb-2  border-gray-400 flex items-center ">
              <label className=" text-white text-xl ">Transactions To</label>
            </div>

            <div className="overflow-auto h-[25rem] scrollbar-thin scrollbar-track-inherit scrollbar-thumb-gray-300  overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              {userDataFrom.map((items, index) => {
                return (
                  <div
                    className=" h-16 border-b-2 border-gray-400 flex flex-row items-center "
                    key={index}
                  >
                    <div className="bg-gray-400 m-4 h-12 w-12 rounded-lg">
                      <label className="justify-center flex items-center h-full w-full text-black text-sm">
                        TX
                      </label>
                    </div>

                    <div className=" h-11 w-56 m-1 flex flex-col justify-center">
                      <label className="text-blue-500 truncate text-sm font-medium">
                        {items.transactions.transactionHash}
                      </label>
                      <label className="text-gray-300 text-sm">
                        {' '}
                        5 min ago...
                      </label>
                    </div>

                    <div className=" h-11 w-56 mx-4 flex flex-col justify-center ">
                      <label className="text-white truncate text-sm font-medium flex flex-row ">
                        To:
                        <small className="text-blue-500 mx-1 w-20 truncate text-sm font-light">
                          <Link
                            to={`/UserDetails`}
                            onClick={(e) => setAcc(e.target.textContent)}
                          >
                            {items.transactions.to}
                          </Link>
                        </small>
                      </label>
                      <label className="text-gray-300 truncate text-xs font-medium flex flex-row ">
                        BlockNumber:
                        <small className="text-gray-300 mx-1 w-20 truncate text-xs font-light">
                          {items.transactions.blockNumber}
                        </small>
                      </label>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContractDetails
