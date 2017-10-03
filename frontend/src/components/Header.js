import * as React from "react";
import { NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <NavLink exact to="/" className="navbar-brand">
                    Readables
                </NavLink>
                <ul className="nav navbar-nav">
                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink to="/create">New Post</NavLink></li>
                </ul>
            </div>
        </nav>
);
}
