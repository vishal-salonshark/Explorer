import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../components/AppContext'
// import Axios from 'axios'
import { BiChevronDown } from 'react-icons/bi'
import { TfiClose } from "react-icons/tfi";

const Search = ({ setModalOn, setChoice }) => {
  const [options, setOptions] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [selected, setSelected] = useState('')
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const data = [{ option: 'Blocks' }, { option: 'Transaction' }]
    setOptions(data)
  }, [])
  
    const handleCancelClick = () => {
      setModalOn(false)
  }
 
  const { blockData, transactions, setBlockNumberContext, setTxHashContext, setAcc } = useContext(AppContext)

  return (
    <div className="   bg-[#030214] opacity-90 fixed inset-0 z-50   ">
      <div className="flex h-screen justify-center items-center " >
        <div className="flex flex-col justify-center align-middle items-center bg-[#030214] py-4 px-8  rounded-xl h-auto w-3/4 z-10"  >
          
          <div className="flex flex-row item-center mb-16  justify-center  shadow-2xl shadow-[#89cdb3c2] rounded-lg h-16 w-4/6 ">
            <div
              onClick={() => setOpen(!open)}
              className={`bg-white flex items-center justify-center rounded-l-lg text-black w-1/5 ${
                !selected && 'text-gray-700'
              }`}
            >
              {selected
                ? selected?.length > 25
                  ? selected?.substring(0, 25) + '...'
                  : selected
                : 'Select Option'}
              <BiChevronDown size={20} className={`${open && 'rotate-180'}`} />
              <ul
                className={`bg-white absolute top-auto left-[30rem] right-[50rem] mt-40 overflow-y-auto  ${
                  open ? 'max-h-60' : 'max-h-0'
                } `}
              >
                {options?.map((item) => (
                  <li
                    key={item?.option}
                    className={`p-2 text-sm hover:bg-[#89CDB3] hover:text-black
            ${
              item?.option?.toLowerCase() === selected?.toLowerCase() &&
              'bg-[#89CDB3] text-black'
            }
            ${
              item?.option?.toLowerCase().startsWith(inputValue)
                ? 'block'
                : 'hidden'
            }`}
                    onClick={() => {
                      if (
                        item?.option?.toLowerCase() !== selected.toLowerCase()
                      ) {
                        setSelected(item?.option)
                        setOpen(false)
                        setInputValue('')
                      }
                    }}
                  >
                    {item?.option}
                  </li>
                ))}
              </ul>
            </div>
            <input className="bg-white flex items-center justify-between rounded-r-lg border-none text-black w-4/5" 
            onInput={(e) => {
              setSearch((e.target.value).toLowerCase())
            }} />
          </div>

          <div className="bg-white flex flex-col mx-2 p-4 rounded-lg shadow-2xl shadow-[#89cdb3c2] text-black w-2/3 h-[30rem] ">
            <div className=" h-16 border-b-2 mb-2 border-gray-300 flex items-center ">
              <label className=" text-black text-xl ">{selected === 'Blocks' ?`Lastest Blocks` :selected ==='Transaction'? `Lastest Transactions` :`Please Select Option ..`}</label>
            </div>
            {selected === 'Blocks' ? 
            <div className="overflow-auto h-[25rem] scrollbar-thin scrollbar-track-inherit scrollbar-thumb-gray-300  overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
             {
             blockData.filter((item) => {
              return search === ''
                ? item
                : item.blockHash.toLowerCase().includes(search) ||
                    String(item.blockNumber)
                      .toLowerCase()
                      .includes(search)
            }).map((user, index) => {
              // console.log(user)
                return (
                  <div className=" h-16 border-b-2 border-gray-400 flex flex-row items-center " key={index}>
                    <div className="bg-gray-400 m-4 h-12 w-12 rounded-lg">
                      <label className="justify-center flex items-center h-full w-full text-black text-sm">
                        BX
                      </label>
                    </div>
  
                    <div className=" h-11 w-60 m-1 flex flex-col justify-center p-5">
                      <label className="text-blue-500 text-sm font-medium">
                        <Link to={`/blockDetails/`} onClick={(e) => setBlockNumberContext(e.target.textContent)}>{user.blockNumber}</Link>
                        {/* <label  onClick={(e) => console.log(e.target.textContent)}>{user.blockNumber}</label> */}
                      </label>
                      <label className="text-black text-sm"> 5 min ago...</label>
                    </div>
  
                    <div className=" h-11 w-96 mx-2 flex flex-col justify-center p-2">
                      <label className="text-black text-sm w-80 font-medium flex flex-row ">
                        Validated by{' '}
                        <small className="text-blue-500 mx-1 w-56 truncate text-sm font-light">
                          {user.miner}
                        </small>
                      </label>
                      <label className="text-black text-sm">{user.transactions.length} txns</label>
                    </div>
                  </div>
                )
              })
             } 
              </div>
             :selected ==='Transaction'? 
             <div className="overflow-auto h-[25rem] scrollbar-thin scrollbar-track-inherit scrollbar-thumb-gray-300  overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              {
              transactions.filter((item) => {
                // console.log('transactions to :' + item.transactions.to?.toLowerCase())
                // console.log(search.toLowerCase())
                return search === ''? item: item.transactions.transactionHash?.toLowerCase().includes(search) || item.transactions.from?.toLowerCase().includes(search) || item.transactions.to?.toLowerCase().includes(search)
              }).map((e, index) => {
              return (
                <div className=" h-16 border-b-2 border-gray-400 flex flex-row items-center " key={index}>
                  <div className="bg-gray-400 m-4 h-12 w-12 rounded-lg">
                    <label className="justify-center flex items-center h-full w-full text-black text-sm">
                      TX
                    </label>
                  </div>

                  <div className=" h-11 w-80 m-1 flex flex-col justify-center">
                    <label className="text-blue-500 truncate text-sm font-medium">
                      <Link to={`/transactionDetails`} onClick={(el) => setTxHashContext(el.target.textContent)}>{e.transactions.transactionHash}{' '}</Link>
                    </label>
                    <label className="text-black text-sm"> 5 min ago...</label>
                  </div>

                  <div className=" h-11 w-60 mx-4 flex flex-col justify-center ">
                    <label className="text-black truncate text-sm font-medium flex flex-row ">
                      From:
                      <small className="text-blue-500 mx-1 w-30 truncate text-sm font-light">
                        <Link to={`/UserDetails`} onClick={(e) => setAcc(e.target.textContent)}>{e.transactions.from}</Link>
                      </small>
                    </label>
                    <label className="text-black truncate text-sm font-medium flex flex-row ">
                      To:
                      <small className="text-blue-500 mx-1 w-30 truncate text-sm font-light">
                        <Link to={`/UserDetails`} onClick={(e) => setAcc(e.target.textContent)}>{e.transactions.to}</Link>
                      </small>
                    </label>
                  </div>

                </div>
              )
              })
              }
              </div>
              : ''
            }
            


          </div>
          
        </div>
        <div className='flex justify-center items-center fixed top-[3rem] h-22 w-22 right-[5rem]'>
                <TfiClose className=' h-10 w-10 z-10 font-bold text-white' onClick={handleCancelClick} />
        </div>
      </div>
    </div>
  )
}

export default Search
