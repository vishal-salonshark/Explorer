/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from "react";
// import { BrowserRouter as Router } from 'react-router-dom';
import  { GiCubes, GiToken } from "react-icons/gi";
import { IoGitNetworkSharp } from "react-icons/io5";
import  { BiTransferAlt } from "react-icons/bi";
import  { BsSearch } from "react-icons/bs";
import { AiFillDatabase } from "react-icons/ai";
import Logo from "./../img/Erium_logo.png"
import Search from './../components/Search'

const Navbar = () => {
    const [modalOn, setModalOn] = useState(false)
    // eslint-disable-next-line
    const [choice, setChoice] = useState(false)
  
    const clicked = () => {
      setModalOn(true)
    }
    return (
        // <Router>
        <nav className="flex items-center justify-between px-14 py-2 bg-transparent border-b-2 border-[#e2e3e4] text-slate-50 h-16">
            <div className=" flex w-28 felx-row justify-between items-end"><img className="h-10 w-22" src={Logo} alt=""/><small className="text-base mx-5"> Exchange</small></div>
            <div className="flex justify-between items-center space-x-10 ">
                <ul className="flex justify-between items-center space-x-6 ">
                    <a href="/" className="flex justify-between items-center space-x-1"><AiFillDatabase/><label> Home </label></a>
                    <a href="/blocks" className="flex justify-between items-center space-x-1"><GiCubes/><label> Blocks </label></a>
                    <a href="/transaction" className="flex justify-between items-center space-x-1"><BiTransferAlt/><label> Transactions </label></a>
                    <a href="" className="flex justify-between items-center space-x-1"><GiToken/><label> Tokens </label></a>
                    {/* <a href="/user" className="flex justify-between items-center space-x-1"><IoWallet/><label> Users </label></a> */}
                    <a href="" className="flex justify-between items-center space-x-1"><IoGitNetworkSharp/><label> EriumChain </label></a>
                </ul>
                <div className="flex items-center px-6 py-1 rounded-full justify-center bg-[#89CDB3] text-slate-50 space-x-2">
                    <BsSearch/><label className=" text-center font-bold" onClick={() => clicked()}>Search</label>
                    {modalOn && <Search setModalOn={setModalOn} setChoice={setChoice} />}
                </div>
                    
            </div>
        </nav>
        // </Router>
    )
}

export default Navbar