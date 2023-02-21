import React,{useState, useEffect}  from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar'
import Axios from "axios";
import { menu } from "./menu";
import Home from './pages/Home';
import Blocks from './pages/Blocks';
import BlockDetails from "./pages/BlockDetails";
import Transaction from "./pages/Transaction";
import TransactionDetails from "./pages/TransactionDetails";
import { AppContext } from "./components/AppContext";
import UserDetails from "./pages/UserDetails";
import ContractDetails from "./pages/ContractDetails";
import VerifyContract from "./pages/VerifyContract";

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />),
  },
  {
    path: "/blocks",
    element: <Blocks />,
  },
  {
    path: "/blockDetails",
    element: <BlockDetails/>,
  },
  {
    path: "/transaction",
    element: <Transaction/>,
  },
  {
    path: "/user",
    element: <UserDetails/>,
  },
  {
    path: "/transactionDetails",
    element: <TransactionDetails/>,
  },
  {
    path: "/UserDetails",
    element: <UserDetails/>,
  },
  {
    path: "/ContractDetails",
    element: <ContractDetails/>,
  },
  {
    path: "/VerifyContract",
    element: <VerifyContract/>,
  },
]);

function App() {
  const [blockData, setBlockData] = useState([])
  const [transactions, setTransactions] = useState([])
  
  


  // var n = 0
  useEffect(() => {
    Axios.get('http://localhost:3001/').then((response) => {
      setBlockData(response.data)
    })

    Axios.get(`http://localhost:3001/tarnsactionsList/`).then((response) => {
      setTransactions(response.data)
    })
    
  }, [])

  const [solcVersion, setSolcVersion] = useState('')
  const [isOptimized, setIsOptimized] = useState('')

  const [blockNumberContext, setBlockNumberContext] = useState([]);
  const [txHashContext, setTxHashContext] = useState([]);
  const [acc, setAcc] = useState('')
  const [contractAdd, setContractAdd] = useState([])

  return (
    <div className="h-full bg-[#030214]">
      <AppContext.Provider value= {{blockNumberContext, setBlockNumberContext, txHashContext, setTxHashContext, acc, setAcc, blockData, transactions, contractAdd, setContractAdd, menu, solcVersion, setSolcVersion, isOptimized, setIsOptimized}}>
      <Navbar/>
      <RouterProvider router={router} />
      </AppContext.Provider>
    </div>
  );
}

export default App;
