import React, { useEffect, useState, useContext } from 'react'

import AppContext from '../components/AppContext'
import CompilerVersion from '../components/CompilerVersion'
import IsOptimized from '../components/IsOptimized'
import SolidityEditor from '../components/SolidityEditor'

import axios from 'axios'

const VerifyContract = () => {
    // eslint-disable-next-line no-unused-vars
    const { acc, solcVersion, isOptimized } = useContext(AppContext)
   
    const [fileName, setFileName] = useState('')
    const [ code ,setCode] = useState()
    const [contractAddress, setContractAddress] = useState()
    const [result, setResult] = useState('')
    const chainChoice = 'custom'
    useEffect(() => {
      setContractAddress(acc)
    }, [acc])
    useEffect(() => {
      console.log(fileName)
    },[fileName])

   
    const handleSubmit = async (e) => {
      console.log('this is handleSubmit')
      try {
        // console.log(solcVersion)
        // console.log(fileName)
        // console.log(contractAddress)
        // console.log(isOptimized)
        // console.log(chainChoice)
        // console.log(code)
        await axios
          .put('http://localhost:3002/verify', {
            solc_version: solcVersion,
            file_name: fileName,
            contract_address: contractAddress,
            is_optimized: isOptimized,
            chainChoice: chainChoice,
            solidity_code: code,
          })
          .then((response) => {
            console.log(response.data)
            setResult(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
      } catch (error) {
        console.error(error)
      }
    }
    
  return (
    <div className="flex flex-col justify-center items-center  w-full min-h-[95vh] ">
    <div className="w-11/12 min-h-[25rem] mt-24 flex flex-col justify-center items-center">
    <label className="text-2xl w-full text-start font-bold text-white  mx-16 ">
          Contract Address Details
        </label>
        
        <div className="font-semibold w-full text-start text-white text-xl mx-16 mt-5 underline">{acc}</div>
        
      <div className=" flex flex-col w-full justify-center items-center mt-5">
        <div className="flex flex-row item-center p-5  justify-center rounded-lg w-4/6 ">
          <CompilerVersion required/>
          <div className="h-22 flex flex-col w-1/2 mx-5 ">
            <label className="px-2 font-medium text-white">Contract Name</label>
            <input
              className="bg-white flex items-center my-5 p-8 justify-between shadow-lg shadow-gray-400 rounded-lg text-black h-16 w-ful"
              onInput={(e) => {
                setFileName(e.target.value)
              }}
              required
            />
          </div>
        </div>

        <div className="flex flex-row item-center p-5  justify-center rounded-lg w-4/6 ">
          <IsOptimized required />
        </div>
      </div>

      <div className="w-11/12 min-h-[25rem] rounded-3xl shadow-xl shadow-[#89cdb3c2]  m-10 p-10 bg-white" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <label className="text-lg text-start mb-10 px-3 w-full"> Source Code</label>
      <div>
      <SolidityEditor onChange={(e)=>{setCode(e)}} />
      </div>
      </div>
    
      <button type='submit' className='w-40 h-15 bg-[#89CDB3] rounded-3xl text-2xl font-bold text-center p-3 text-white' onClick={() => handleSubmit()}> Verify </button>
    </div>
    </div>
  )
}

export default VerifyContract
