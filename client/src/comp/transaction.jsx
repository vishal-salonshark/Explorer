/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";

const Transactions = () => {
  const [transaction, setTransactions] = useState([]);
  var _number;
  useEffect(() => {
    const timer = setTimeout(() => {
      _number = (Number(localStorage.getItem('num')))
      Axios.get(`http://localhost:3001/tarnsactions/${_number}`).then((response) => {
        setTransactions(response.data);
      });
    }, 1000)
    return () => clearTimeout(timer);
  }, [_number]);

  // setTx(oldArray => [...oldArray, (transaction[0].block.transactions)]);
  // console.log(transaction.block.transactions);
  return (
    <div className="App" style={{margin: "3rem"}}>
    <div className="container shadow-lg p-3 mb-5 bg-body-tertiary rounded">
      <Table className='m-top-5' responsive="lg" hover>
          <thead>
            <tr>
              <th >#</th>
              <th className="d-flex justify-content-center">Transactions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
          {transaction.map((user) => {
            var n = 0;
            return (user.transactions.map((e, index) => {
              return (
                  <tr key={index}>
                    <td >{++n}</td>
                    <td className="d-flex justify-content-center"  >
                      <Link onClick={(e) => {
                        localStorage.setItem('_tx', (e.target.innerText))
                      }} to = {`/tx/:transactions`}>
                        {e}
                      </Link>
                    </td>
                  </tr>
              )
            }))
          })}
          </tbody>
        </Table>
      </div>
    </div>
  )

}
export default Transactions;