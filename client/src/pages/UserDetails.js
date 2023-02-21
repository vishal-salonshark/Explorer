import React, { useEffect, useState, useContext } from 'react'
import AccountBal from "../components/AccountBal";
import AppContext from '../components/AppContext'
import { Link } from 'react-router-dom'

import Axios from 'axios'

const UserDetails = () => {

  const { acc, setAcc, setTxHashContext } = useContext(AppContext)
  const [userDataFrom, setUserDataFrom] = useState([])
  const [userDataTo, setUserDataTo] = useState([])

  useEffect(() => {
    Axios.get(`http://localhost:3001/user-from/${acc}`).then(async (response) => {
      setUserDataFrom(await response.data)
      // console.log(await response.data);
    })
    Axios.get(`http://localhost:3001/user-to/${acc}`).then(async (response) => {
      setUserDataTo(response.data)
      // console.log(response.data);
    })
  }, [acc])


  return (

    <div className='flex flex-col justify-center items-center w-full min-h-screen px-8 py-2'>

      <AccountBal />

      <div className=' w-11/12 h-auto'>
        <div className="flex flex-row text-white  h-[36rem] w-full py-4">
          <div className="  w-1/2 h-full mx-2 p-4 border-2 border-gray-400 rounded-3xl ">
            <div className=" h-16 border-b-2 mb-2 border-gray-400 flex items-center ">
              <label className=" text-white text-xl ">Transaction From</label>
            </div>

            <div className="overflow-auto h-[25rem] scrollbar-thin scrollbar-track-inherit scrollbar-thumb-gray-300  overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">

              {
                userDataTo.map((items, index) => {
                  return (
                    <div className=" h-16 border-b-2 border-gray-400 flex flex-row items-center " key={index}>
                      <div className="bg-gray-400 m-4 h-12 w-12 rounded-lg">
                        <label className="justify-center flex items-center h-full w-full text-black text-sm">
                          TX
                        </label>
                      </div>

                      <div className=" h-11 w-56 m-1 flex flex-col justify-center">
                        <label className="text-blue-500 truncate text-sm font-medium">
                        <Link to={`/transactionDetails`} onClick={(e) => setTxHashContext(e.target.textContent)}>{items.transactions.transactionHash}</Link>
                        </label>
                        <label className="text-gray-300 text-sm"> 5 min ago...</label>
                      </div>

                      <div className=" h-11 w-56 mx-4 flex flex-col justify-center ">
                        <label className="text-white truncate text-sm font-medium flex flex-row ">
                          From:
                          <small className="text-blue-500 mx-1 w-20 truncate text-sm font-light">
                            <Link to={`/UserDetails`} onClick={(e) => setAcc(e.target.textContent)}>{items.transactions.from}</Link>
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
                })
              }

            </div>
            <label className="animate-text bg-gradient-to-r flex justify-center m-4 from-[#8dd9cc] via-[#89cdb3] to-[#00ffff] bg-clip-text text-transparent text-base font-black">{'View all Blocks >>'}</label>
          </div>

          <div className=" w-1/2 h-full mx-2 p-4 border-2 border-gray-400 rounded-3xl">
            <div className=" h-16 border-b-2 mb-2  border-gray-400 flex items-center ">
              <label className=" text-white text-xl ">Transactions To</label>
            </div>

            <div className="overflow-auto h-[25rem] scrollbar-thin scrollbar-track-inherit scrollbar-thumb-gray-300  overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">

              {
                userDataFrom.map((items, index) => {

                  return (
                    <div className=" h-16 border-b-2 border-gray-400 flex flex-row items-center " key={index}>
                      <div className="bg-gray-400 m-4 h-12 w-12 rounded-lg">
                        <label className="justify-center flex items-center h-full w-full text-black text-sm">
                          TX
                        </label>
                      </div>

                      <div className=" h-11 w-56 m-1 flex flex-col justify-center">
                        <label className="text-blue-500 truncate text-sm font-medium">
                        <Link to={`/transactionDetails`} onClick={(e) => setTxHashContext(e.target.textContent)}>{items.transactions.transactionHash}</Link>
                        </label>
                        <label className="text-gray-300 text-sm"> 5 min ago...</label>
                      </div>

                      <div className=" h-11 w-56 mx-4 flex flex-col justify-center ">
                        {
                          items.transactions.contractAddress === null ?
                            <label className="text-white truncate text-sm font-medium flex flex-row ">
                              To:
                              <small className="text-blue-500 mx-1 w-20 truncate text-sm font-light">
                                <Link to={`/UserDetails`} onClick={(e) => setAcc(e.target.textContent)}>{items.transactions.to}</Link>
                              </small>
                            </label>
                            : <label className="text-white truncate text-sm font-medium flex flex-row ">
                              Contract:
                              <small className="text-blue-500 mx-1 w-20 truncate text-sm font-light">
                                <Link to={`/UserDetails`} onClick={(e) => setAcc(e.target.textContent)}>{items.transactions.contractAddress}</Link>
                              </small>
                            </label>
                        }
                        <label className="text-gray-300 truncate text-xs font-medium flex flex-row ">
                          BlockNumber:
                          <small className="text-gray-300 mx-1 w-20 truncate text-xs font-light">
                            {items.transactions.blockNumber}
                          </small>
                        </label>
                      </div>
                    </div>
                  )
                })
              }

            </div>

            <label className="animate-text bg-gradient-to-r flex justify-center m-4 from-[#8dd9cc] via-[#89cdb3] to-[#00ffff] bg-clip-text text-transparent text-base font-black">{'View all Blocks >>'}</label>

          </div>
        </div>
      </div>



    </div>

  )
}

export default UserDetails
