import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../components/AppContext'
import Axios from 'axios'

const BlockTable = () => {

  const [blockData, setBlockData] = useState([])
  const [transactions, setTransactions] = useState([])
  const { setBlockNumberContext, setTxHashContext, setAcc } = useContext(AppContext)

  // var n = 0
  useEffect(() => {
    Axios.get('http://localhost:3001/').then((response) => {
      setBlockData(response.data)
    })

    Axios.get(`http://localhost:3001/tarnsactionsList/`).then((response) => {
      setTransactions(response.data)
    })

  }, [])


  return (
    <div className="flex flex-row text-white  h-[36rem] w-full py-4">
      <div className="  w-1/2 h-full mx-2 p-4 border-2 border-gray-400 rounded-3xl ">
        <div className=" h-16 border-b-2 mb-2 border-gray-400 flex items-center ">
          <label className=" text-white text-xl ">Lastest Blocks</label>
        </div>

        <div className="overflow-auto h-[25rem] scrollbar-thin scrollbar-track-inherit scrollbar-thumb-gray-300  overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          {
            blockData.map((user, index) => {
              return (
                <div className=" h-16 border-b-2 border-gray-400 flex flex-row items-center " key={index}>
                  <div className="bg-gray-400 m-4 h-12 w-12 rounded-lg">
                    <label className="justify-center flex items-center h-full w-full text-black text-sm">
                      BX
                    </label>
                  </div>

                  <div className=" h-11 w-40 m-1 flex flex-col justify-center p-2">
                    <label className="text-blue-500 text-sm font-medium">
                      <Link to={`/blockDetails`} onClick={(e) => setBlockNumberContext(e.target.textContent)}>{user.blockNumber}</Link>
                    </label>
                    <label className="text-gray-300 text-sm"> 5 min ago...</label>
                  </div>

                  <div className=" h-11 w-56 mx-2 flex flex-col justify-center p-2">
                    <label className="text-white text-sm font-medium flex flex-row ">
                      Validated by{' '}
                      <small className="text-blue-500 mx-1 w-20 truncate text-sm font-light">
                        {user.miner}
                      </small>
                    </label>
                    <label className="text-gray-300 text-sm">{user.transactions.length} txns</label>
                  </div>
                </div>
              )
            })
          }

        </div>
        <label className="animate-text bg-gradient-to-r flex justify-center m-4 from-[#8dd9cc] via-[#89cdb3] to-[#00ffff] bg-clip-text text-transparent text-base font-black"><Link to={`/blocks`}>{'View all Blocks >>'}</Link></label>
      </div>

      <div className=" w-1/2 h-full mx-2 p-4 border-2 border-gray-400 rounded-3xl">
        <div className=" h-16 border-b-2 mb-2  border-gray-400 flex items-center ">
          <label className=" text-white text-xl ">Lastest Transactions</label>
        </div>

        <div className="overflow-auto h-[25rem] scrollbar-thin scrollbar-track-inherit scrollbar-thumb-gray-300  overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">

          {
            transactions.map((e, index) => {
              return (
                <div className=" h-16 border-b-2 border-gray-400 flex flex-row items-center " key={index}>
                  <div className="bg-gray-400 m-4 h-12 w-12 rounded-lg">
                    <label className="justify-center flex items-center h-full w-full text-black text-sm">
                      TX
                    </label>
                  </div>

                  <div className=" h-11 w-56 m-1 flex flex-col justify-center">
                    <label className="text-blue-500 truncate text-sm font-medium">
                      <Link to={`/transactionDetails`} onClick={(el) => setTxHashContext(el.target.textContent)}>{e.transactions.transactionHash}{' '}</Link>
                    </label>
                    <label className="text-gray-300 text-sm"> 5 min ago...</label>
                  </div>

                  <div className=" h-11 w-56 mx-4 flex flex-col justify-center ">
                    <label className="text-white truncate text-sm font-medium flex flex-row ">
                      From:
                      <small className="text-blue-500 mx-1 w-20 truncate text-sm font-light">
                        <Link to={`/UserDetails`} onClick={(e) => setAcc(e.target.textContent)}>{e.transactions.from}</Link>
                      </small>
                    </label>
                    <label className="text-white truncate text-sm font-medium flex flex-row ">
                      To:
                      <small className="text-blue-500 mx-1 w-20 truncate text-sm font-light">
                        <Link to={`/UserDetails`} onClick={(e) => setAcc(e.target.textContent)}>{e.transactions.to}</Link>
                      </small>
                    </label>
                  </div>

                </div>
              )
            })
          }

        </div>

        <label className="animate-text bg-gradient-to-r flex justify-center m-4 from-[#8dd9cc] via-[#89cdb3] to-[#00ffff] bg-clip-text text-transparent text-base font-black"><Link to={`/transaction`}>{'View all Blocks >>'}</Link></label>

      </div>
    </div>
  )
}

export default BlockTable
