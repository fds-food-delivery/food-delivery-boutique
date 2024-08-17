import React, { useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function NavigationBar() {
    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('bg-black', 'navbar-sticky', 'shadow-sm');
            } else {
                navbar.classList.remove('bg-black', 'navbar-sticky', 'shadow-sm');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Navbar className="no-tailwind custom-navbar navbar-expand-lg fixed-top navbar-light" expand="md">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src="https://example.com/logo.png" // Remplacez par l'URL de votre logo
                        alt="Thurquoise Logo"
                        className="d-inline-block align-top"
                        width="40"
                    />
                    <span className="brand-name">Thurquoise</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/menu" className="custom-nav-link">Menu</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="custom-nav-link">About Us</Nav.Link>
                        <Nav.Link as={Link} to="/contact" className="custom-nav-link">Contact</Nav.Link>
                        <Nav.Link as={Link} to="/cart" className="custom-nav-link">
                            Cart <Badge pill bg="danger">3</Badge> {/* Exemple : Nombre d'articles */}
                        </Nav.Link>
                        <NavDropdown title="Account" id="basic-nav-dropdown" className="custom-nav-link">
                            <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/orders">My Orders</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
