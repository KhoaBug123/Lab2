// Import React để dùng JSX
import React from 'react';
// Import các component Navbar, Nav, Container từ react-bootstrap (thư viện UI)
import { Navbar, Nav, Container } from 'react-bootstrap';
// Import Link, NavLink từ react-router-dom để điều hướng không reload trang
import { Link, NavLink } from 'react-router-dom';

// Biến rollNumber dùng để cấu hình prefix cho các route
const rollNumber = 'SE193986';

// Component Navbar hiển thị thanh điều hướng trên cùng
export default function AppNavbar() {
  return (
    // Navbar của Bootstrap, màu primary, dark theme, responsive
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        {/* Nút toggle cho mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Các link điều hướng, dùng NavLink để active tự động */}
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

