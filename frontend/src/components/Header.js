/*jshint strict:false */
/* eslint camelcase: ["error", {properties: "never"}]*/
/*jshint browserify: true */
/* eslint-disable no-unused-vars*/
/* eslint-disable */
/* global $ jQuery require console module */
"use strict";

import * as React from "react";
import {Link, NavLink} from 'react-router-dom'

export default function Header() {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <NavLink exact to="/" className="navbar-brand">
                    <img src="./logo.svg" />
                </NavLink>
                <ul className="nav navbar-nav">
                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink to="/create">New Post</NavLink></li>
                </ul>
            </div>
        </nav>
);
}
