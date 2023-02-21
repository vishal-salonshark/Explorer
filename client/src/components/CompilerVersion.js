import React,  { useState, useContext, useEffect } from 'react'
import AppContext from '../components/AppContext'
import {AiOutlineSearch} from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'

const CompilerVersion = () => {

  const {menu, setSolcVersion} = useContext(AppContext)
  const [inputValue, setInputValue] = useState('')
  const [selected, setSelected] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setSolcVersion(selected)
  },[selected, setSolcVersion])

  return (
    <div className="h-22 flex flex-col w-1/2 mx-5  ">
      <label className="px-2 font-medium text-white">Compiler Version</label>
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white flex items-center my-5 p-8 justify-between shadow-lg shadow-gray-400 rounded-lg text-black h-16 w-full ${
          !selected && 'text-gray-700'
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + '...'
            : selected
          : 'Select Compiler Version'}
        <BiChevronDown size={20} className={`${open && 'rotate-180'}`} />
      </div>
        <ul
          className={`bg-white mt-2 absolute top-[52vh] left-80 right-2/4 shadow-lg shadow-gray-400 rounded-lg overflow-auto
          scrollbar-thin scrollbar-track-inherit scrollbar-thumb-gray-300  overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full ${
            open ? 'max-h-60' : 'max-h-0'
          } `}
        >
          <div className="flex items-center px-2 sticky top-0 bg-white">
            <AiOutlineSearch size={18} className="text-gray-700" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toLowerCase())}
              placeholder="Enter country name"
              className="placeholder:text-gray-700 w-11/12 h-10 mx-2 p-2 outline-none bg-white"
            />
          </div>
          {Object.entries(menu.releases)?.map((item) => (
            <li
              key={item[0]}
              className={`p-2 text-sm hover:bg-gray-400 hover:text-black px-5
            ${
              item[0]?.toLowerCase() === selected?.toLowerCase() &&
              'bg-gray-400 text-black'
            }
            ${
              item[0]?.toLowerCase().startsWith(inputValue)
                ? 'block'
                : 'hidden'
            }`}
              onClick={() => {
                if (item[1]?.toLowerCase() !== selected.toLowerCase()) {
                  console.log(item[1])
                  setSelected(item[1])
                  setOpen(false)  
                  setInputValue('')
                }
              }}
            >
              {item[0]}
            </li>
          ))}
        </ul>
    </div>
  )
}

export default CompilerVersion
