import React from "react";
import {NavLink} from 'react-router-dom';

const NavBar = () => {
    const activeStyle = {
        color: "#F15B2A"
    };

    return (
        <nav>
            <NavLink to="/" activeStyle={activeStyle} exact>Home</NavLink>{" | "}
            <NavLink to="/courses" activeStyle={activeStyle}>Courses</NavLink>{" | "}
            <NavLink to="/searchCatalog" activeStyle={activeStyle}>Search Catalog</NavLink>{" | "}
            <NavLink to="/primarySection" activeStyle={activeStyle}>Primary Section</NavLink>{" | "}
            <NavLink to="/featuredSection" activeStyle={activeStyle}>Featured Section</NavLink>{" | "}
            <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>{" | "}
            <NavLink to="/latestUpdates" activeStyle={activeStyle}>Latest Updates</NavLink>
            
        </nav>
    );
}

export default NavBar;