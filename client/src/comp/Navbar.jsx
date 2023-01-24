/* eslint-disable no-unused-vars */
import { React, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import ConnectWallet from './ConnectWallet'

import Search from './Search'
// import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  const [modalShow, setModalShow] = useState(false)

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">Explorer</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/user/">Users</Nav.Link>
            <Nav.Link href="/userBal/">UserBalance</Nav.Link>
          </Nav>
          <Form className="d-flex">
            {/* <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=> {
                setQuery(e.target.value)
                
              }}
            /> */}
            {/* <ConnectWallet/> */}
            <Search show={modalShow} onHide={() => setModalShow(false)} />
            <Button variant="primary" onClick={() => setModalShow(true) }>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
