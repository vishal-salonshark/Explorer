/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";


const BlockDetails = () => {
  const [blockDetails, setBlockDetails] = useState([]);
  var _number;
  useEffect(() => {
    const timer = setTimeout(() => {
      _number = (Number(localStorage.getItem('num')))
      Axios.get(`http://localhost:3001/block/${_number}`).then(async (response) => {
        setBlockDetails(response.data);
        // console.log (response.data)
      });
    }, 1000)
    return () => clearTimeout(timer);
  }, [_number]);

  return (
    <div className="App" style={{margin: "3rem"}}>
    <div className="container shadow-lg p-3 mb-5 bg-body-tertiary rounded">
      <Table className='m-top-5' responsive="lg" hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Block <Link onClick={(e) => {localStorage.setItem('_tx', (e.target.innerText))}} to = {`/tarnsactions/:number`}>{blockDetails.number}</Link></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
          {Object.entries(blockDetails).map((block, index) => {
            var _blockDk, BlockDv
            if (block[0] === "transactions" ) {
                _blockDk = block[0]
                BlockDv = blockDetails.transactions.length
            }
            else if (block[0] !== "extraData" && block[0] !== "logsBloom") {
                _blockDk = block[0]
                BlockDv = block[1]
            }
            return (
                <tr key={index}>
                  <td >{_blockDk}</td>
                  <td>{BlockDv}</td>
                </tr>
            )
          })}
          </tbody>
        </Table>
      </div>
    </div>
  )

}
export default BlockDetails;