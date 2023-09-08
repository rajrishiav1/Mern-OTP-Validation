import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const Headers = () => {
  return (
  <>
  
  <Navbar bg="dark" variant="dark">
        <Container>
        <NavLink to="/" className="text-decoration-none mxtext-light mx-2">RRCloud</NavLink>
          <Nav className="">
            <NavLink to="/register" className="mt-3 text-decoration-none mxtext-light mx-2">Register</NavLink>
            <img src="/logo192.png" style={{width:48}} alt="" />
          </Nav>
        </Container>
      </Navbar>
  </>
  )
}

export default Headers
