import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const rollNumber = 'SE193986';

export default function AppNavbar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to={`/${rollNumber}`}>JLPT Lessons</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to={`/${rollNumber}`}>Home</Nav.Link>
            <Nav.Link as={NavLink} to={`/${rollNumber}/all-lessons`}>All Lessons</Nav.Link>
            <Nav.Link as={NavLink} to={`/${rollNumber}/completed-lessons`}>Completed Lessons</Nav.Link>
            <Nav.Link as={NavLink} to={`/${rollNumber}/add-lesson`}>Add Lesson</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
