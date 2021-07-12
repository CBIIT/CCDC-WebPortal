import React from "react";
import {NavLink} from 'react-router-dom';

const NavBar = () => {
    const activeStyle = {
        color: "#F15B2A"
    };

    return (
        <nav>
            <NavLink to="/" activeStyle={activeStyle} exact>Home</NavLink>{" | "}
            {/* <NavLink to="/courses" activeStyle={activeStyle}>Courses</NavLink>{" | "} */}
            <NavLink to="/SearchCatalog" activeStyle={activeStyle}>Search Catalog</NavLink>{" | "}
            <NavLink to="/ParticipatingResources" activeStyle={activeStyle}>Participating Resources</NavLink>{" | "}
            {/* <NavLink to="/FeaturedSection" activeStyle={activeStyle}>Featured Section</NavLink>{" | "} */}
            {/* <NavLink to="/DatasetDetail" activeStyle={activeStyle}>Data</NavLink>{" | "} */}
            {/* <NavLink to="/FilterList" activeStyle={activeStyle}>Filtered List</NavLink>{" | "} */}
            <NavLink to="/About" activeStyle={activeStyle}>About</NavLink>
            
        </nav>
    );
}

export default NavBar;