/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/style-prop-object */
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import InputGroup from 'react-bootstrap/InputGroup'
import Select from 'react-select'

function Search(props) {
  const [searchData, setSearchData] = useState([])
  const [search, setSearch] = useState('')
  // const [submit , setSubmit] = useState(false)
  useEffect(() => {
    Axios.get('http://localhost:3001/').then((response) => {
      setSearchData(response.data)
      console.log(response.data)
    })
  }, [])

  var dropDownList = [
    {
      value: 1,
      label: 'Trasnasaction',
    },
    {
      value: 2,
      label: 'Blocks',
    },
  ]
  const [selectValue, setSelectValue] = useState()
  const selectHandler = (e) => {
    setSelectValue(e.value)
  }

  const BlockTable = (search) => {
    return (
      <Table className="m-top-5 " responsive="lg" hover>
        <thead>
          <tr>
            <th>Block No</th>
            <th className="d-flex justify-content-center">Block Hash</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {searchData
            .filter((item) => {
              return search.data.toLowerCase() === ''
                ? item
                : item.blockHash.toLowerCase().includes(search.data) ||
                    String(item.blockNumber)
                      .toLowerCase()
                      .includes(search.data)
            })
            .map((item, index) => (
              // console.log(item)
              <tr key={index}>
                <td>
                <a href={`/block/:number`}>
                    {item.blockNumber}
                    </a>
                </td>
                <td className="d-flex justify-content-center">
                  {item.blockHash}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    )
  }

  const TxTable = (search) => {
    const [searchTx, setSearchTx] = useState([])
    var _tx = search.data
    useEffect(() => {
      Axios.get(`http://localhost:3001/tx/${_tx}`).then(async (response) => {
        setSearchTx(await response.data)
      })
    }, [])

    return (
      <Table className="m-top-5" responsive="lg" hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Transaction Details</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {Object.entries(searchTx).map((t, index) => {
            var _txdk, txdv
            if (t[0] !== 'logs' && t[0] !== 'logsBloom') {
              _txdk = t[0]
              txdv = t[1]
            }
            return (
              <tr key={index}>
                <td>{_txdk}</td>
                <td>{txdv}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Search</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <div className="border border-0 shadow-lg p-3 mb-5 bg-body-tertiary rounded-start">
            <Select options={dropDownList} onChange={selectHandler} />
          </div>
          <Form.Control
            size="lg"
            aria-label="Text input with dropdown button"
            className="border border-0 shadow-lg p-3 mb-5 bg-body-tertiary rounded-end"
            placeholder="Search Here"
            onInput={(e) => {
              setSearch(e.target.value)
            }}
          />
        </InputGroup>
        {selectValue === 1 ? (
          <TxTable data={search}/>
        ) : (
          <BlockTable data={search} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        {/* <Button variant="outline-success" onSubmit={submitHandler }>Search</Button> */}
      </Modal.Footer>
    </Modal>
  )
}

export default Search
