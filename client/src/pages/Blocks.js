import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../components/AppContext'
import Axios from 'axios'

const Blocks = ( ) => {

    const [blockData, setBlockData] = useState([])
    const { setBlockNumberContext } = useContext(AppContext)

    // var n = 0
    useEffect(() => {
      Axios.get('http://localhost:3001/').then((response) => {
        setBlockData(response.data)
      })
      
    }, [])


  return (
    
    <div className='flex justify-center items-center w-full min-h-screen py-2'>
        <div className=' bg-white   min-h-[80vh] w-4/5 rounded-2xl flex flex-col shadow-2xl shadow-[#89cdb3b7]'>
            <label className=' text-[#030214]  px-16 py-5 text-xl'>Blocks</label>
            <div className=' w-full h-[40rem] mb-10 flex justify-start items-center flex-col overflow-auto  scrollbar-thin scrollbar-track-inherit scrollbar-thumb-gray-300  overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full '>


            {blockData.map((user, index) => {
                return(
                    <div className='w-11/12 h-28 m-2 flex flex-row ' key={index}>
                    <div className='bg-blue-100  w-[15rem] flex flex-col justify-center items-center h-full border border-blue-500 border-l-4 rounded-sm '>
                        <Link className='font-bold  text-xs text-blue-700' to={`/blockDetails/`} onClick={()=>{setBlockNumberContext(user.blockNumber)}}>#{user.blockNumber}</Link>
                        <label className='font-light text-xs text-blue-500'>Block</label>
                    </div>
                    <div className='w-full h-full border border-gray-300 rounded flex flex-row justify-between items-center py-2'>
                    <div className=' w-full h-full flex flex-col justify-center items-start text-gray-400 p-4 mx-2'>
                    <label className='text-xs font-light'>{user.transactions.length} transactions {user.blockSize} bytes 4 minutes ago</label>
                    <label className=' text-xs'>Miner <label className=' text-blue-500'>{user.miner}</label></label>
                    <label className='text-xs font-light'>Reward 4.756468797564687975 BIGB</label>
                    </div>
                    <div className=' w-[30rem] flex flex-col justify-center items-end text-gray-400 h-full p-4 mx-2'>
                        <small>{user.gasLimit} Gas Limit</small>
                        <small>{user.gasUsed} Gas Used</small> 
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

export default Blocks