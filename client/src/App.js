import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table'

function App() {
  const [blockData, setBlockData] = useState([])

  var n = 0
  useEffect(() => {
    Axios.get('http://localhost:3001/').then((response) => {
      setBlockData(response.data)
    })
    
  }, [])
  console.log(blockData)
  return (
    <div className="App" style={{margin: "3rem"}}>
      <div className="container shadow-lg p-3 mb-5 bg-body-tertiary rounded">
        <Table className='m-top-5' responsive="lg" hover>
          <thead >
            <tr >
              <th>#</th>
              <th>Block No</th>
              <th className="d-flex justify-content-center">Block Hash</th>
              <th>Tx Count</th>
              <th>Timestamp</th>
            </tr>
          </thead >
          <tbody className="table-group-divider" >
          {blockData.map((user, index) => {
            return (
                <tr key={index}>
                  <td>{++n}</td>
                  <td>
                    <Link onClick={(e) => {
                      localStorage.setItem('num', Number(e.target.innerText))
                    }} to={`/block/:number`}>
                    {user.blockNumber}
                    </Link>
                  </td>
                  <td className="d-flex justify-content-center">{user.blockHash}</td>  
                  <td>{user.transactions.length}</td>
                  <td>{user.timeStamp}</td>
                </tr>
            )
          })}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default App
