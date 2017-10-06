import * as React from "react";
import { NavLink } from 'react-router-dom'
import { NavDropdown, MenuItem, NavItem, Nav, Navbar } from 'react-bootstrap';

export default function Header() {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <NavLink exact to="/" >
                        Readables
                    </NavLink>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav className="nav navbar-nav">
                <NavItem><NavLink exact to="/">Home</NavLink></NavItem>
                <NavItem><NavLink to="/create">New Post</NavLink></NavItem>
                <NavDropdown title="Categories" id="Categories">
                    <MenuItem><NavLink to="/category/react">React</NavLink></MenuItem>
                    <MenuItem><NavLink to="/category/redux">Redux</NavLink></MenuItem>
                    <MenuItem><NavLink to="/category/udacity">Udacity</NavLink></MenuItem>
                </NavDropdown>
            </Nav>
        </Navbar>
);
}
