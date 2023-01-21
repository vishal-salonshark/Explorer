import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from "react-router-dom";

function UserTxHistory() {

    const [userData, setUserData] = useState([])
    // const [user, setUser] = useState('')
    // const [submit , setSubmit] = useState(false)
    var n=0;
   { useEffect(() => {
     var u = String(localStorage.getItem('_ux'))
    //  console.log(u)
      Axios.get(`http://localhost:3001/user/${u}`).then(async (response) => {
        setUserData(await response.data)
        // console.log(await response.data);
      })
    }, [])}

    const userTx =() => {

    }
    return (
      <div className="App" style={{margin: "3rem"}}>
    <div className="container shadow-lg p-3 mb-5 bg-body-tertiary rounded">
    <Form  
    onInput={(e) => {
      localStorage.setItem('_ux', e.target.value)
      // console.log(user)
    }}
    // onSubmit={ (e) => {
    // }}
    >
    <Form.Control
            size="lg"
            aria-label="Text input with dropdown button"
            className="border border-0 shadow-lg p-4 mb-5 bg-body-tertiary rounded-end"
            placeholder="Search Here"
            />
</Form>
  <h3> { String(localStorage.getItem('_ux')) } </h3>
<Table className="m-top-5 " responsive="lg" hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Transaction Hash</th>
            <th>Transaction To</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {userData
            .map((item, index) => (
              <tr key={index}>
                <td>
                    {++n}
                </td>
                <td>
                <Link onClick={(e) => {
                        localStorage.setItem('_tx', (e.target.innerText))
                      }} to = {`/tx/:transactions`}>
                    {item.transactions.transactionHash}
                </Link>
                </td>
                <td>
                  {item.transactions.to}
                </td>
              </tr>
            ))}
        </tbody>
  </Table>
    </div>
    </div>
    );
}

export default UserTxHistory;