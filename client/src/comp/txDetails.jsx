/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
// import { Link } from "react-router-dom";

const TransactionsDetails = () => {
  const [transactionDetails, setTransactionDetails] = useState([]);
  var _tx;
  useEffect(() => {
    const timer = setTimeout(() => {
      _tx = localStorage.getItem('_tx');
      Axios.get(`http://localhost:3001/tx/${_tx}`).then(async (response) => {
        setTransactionDetails(await response.data);
      });
    }, 3000)
    return () => clearTimeout(timer);
  }, [_tx]);

  return (
    <div className="App" style={{margin: "3rem"}}>
    <div className="container shadow-lg p-3 mb-5 bg-body-tertiary rounded">
      <Table className='m-top-5' responsive="lg" hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Transaction Details</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
          {Object.entries(transactionDetails).map((t, index) => {
            var _txdk, txdv
            if (t[0] !== "logs" && t[0] !== "logsBloom") {
                _txdk = t[0]
                txdv = t[1]
            }
            return (
                <tr key={index}>
                  <td >{(_txdk)}</td>
                  <td>{txdv}</td>
                </tr>
            )
          })}
          </tbody>
        </Table>
      </div>
    </div>
  )

}
export default TransactionsDetails;