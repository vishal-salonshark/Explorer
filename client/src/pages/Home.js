import Search from './../components/Search'
import { useState } from 'react'
import BlockTable from '../components/BlockTable'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { AiOutlineTransaction, AiFillDollarCircle } from 'react-icons/ai'
import { GiWallet } from 'react-icons/gi'
import { FaUsers } from 'react-icons/fa'

const Home = () => {
  const [modalOn, setModalOn] = useState(false)
  // eslint-disable-next-line
  const [choice, setChoice] = useState(false)

  const clicked = () => {
    setModalOn(true)
  }


  const percentage = 66

  return (
    <div className=" px-44 pb-20 w-full">
      <div className="my-10 px-10 text-slate-50">
        <h1 className="mb-5 text-4xl"> Erium Chain Explain </h1>
        <input
          type="text"
          name="search"
          placeholder="Search by address, token symbol, name, transaction hash, or block number"
          autoComplete="off"
          aria-label="Search"
          className="p-2 text-neutral-900 w-1/2 rounded-2xl border-none ring-2 ring-[#89CDB3] focus:ring-gray-500 focus:ring-2"
          onClick={() => clicked()}
        />
        {modalOn && <Search setModalOn={setModalOn} setChoice={setChoice} />}
      </div>

      <div className="flex flex-row h-60 p-5 opacity-95 w-full">
        <div className="bg-white flex flex-col justify-center items-center mx-4 h-full py-5 rounded-3xl w-1/4">
          <div className=" flex flex-row justify-between items-center h-1/2 w-3/4 ">
            <div className="m-4">
              <label className="text-gray-500 text-sm font-light">
                Total transactions
              </label>
              <h2 className="text-black font-bold">30</h2>
            </div>
            <AiOutlineTransaction className="text-xl font-extrabold text-[#89CDB3]" />
          </div>

          <div className=" flex flex-row justify-between items-center h-1/2 w-3/4 ">
            <div className="m-4">
              <label className="text-gray-500 text-sm font-light">
                Wallet addresses
              </label>
              <h2 className="text-black font-bold">36</h2>
            </div>
            <GiWallet className="text-xl text-[#89CDB3]" />
          </div>
        </div>

        <div className="bg-white flex flex-col justify-center items-center mx-4 h-full py-5 rounded-3xl w-1/4">
          <div className=" flex flex-row justify-between items-center h-1/2 w-3/4 ">
            <div className="m-4">
              <label className="text-gray-500 text-sm font-light">
                Total staked
              </label>
              <h2 className="text-black font-bold">
                4,900 <small className="text-sm font-light">BIGB </small>
              </h2>
            </div>
            <AiFillDollarCircle className="text-xl font-extrabold text-[#89CDB3]" />
          </div>

          <div className=" flex flex-row justify-between items-center h-1/2 w-3/4 ">
            <div className="m-4">
              <label className="text-gray-500 text-sm font-light">
                Active validators
              </label>
              <h2 className="text-black font-bold">
                1{' '}
                <small className="text-sm font-light">
                  Validators{' '}
                  <small className=" text-blue-500 text-sm font-light">
                    show all
                  </small>
                </small>
              </h2>
            </div>
            <FaUsers className="text-xl text-[#89CDB3]" />
          </div>
        </div>

        <div className="bg-white flex flex-row justify-center items-center mx-4 h-full py-5 rounded-3xl w-3/5 ">
        <div className='h-full w-1/2 '>
        <div className="  h-1/2 w-3/4 mt-4">
              <label className="text-gray-500 text-sm font-light">
              Next cycle
              </label>
              <h2 className="text-black font-bold">
              1d 22h 34m 28s
              </h2>
          </div>
          <div className="  h-1/2 w-3/4 ">
              <label className="text-gray-500 text-sm font-light">
              Current cycle blocks
              </label>
              <h2 className="text-black font-bold">
              691213 - 748813
              </h2>
          </div>
          </div>

          <div className='h-40 w-40 ' >
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              pathColor: `rgba(137, 205, 179, ${percentage / 100})`,
              textColor: '#030214',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
            })}
          />
          </div>
        </div>
      </div>
      <BlockTable />
    </div>
  )
}

export default Home
