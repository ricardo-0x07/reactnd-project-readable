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
            <div className="nav navbar-nav">
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink to="/create">New Post</NavLink></li>
                <NavDropdown title="Categories" id="Categories">
                    <li><NavLink to="/category/react">React</NavLink></li>
                    <li><NavLink to="/category/redux">Redux</NavLink></li>
                    <li><NavLink to="/category/udacity">Udacity</NavLink></li>
                </NavDropdown>
            </div>
        </Navbar>
);
}
