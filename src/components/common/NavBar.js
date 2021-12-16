import React from "react";
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.div`
    width: 100%;
    display: flex;
    position: relative;
    padding: 10px 0;
    background-color: #2dc799;
`;

const NavContainer = styled.div`
    margin: 0 auto;
    width: 1200px;
    text-align: center;

    a {
      color: #003626;
      padding-right: 1.5rem;
      padding-left: 1.5rem;
      font-weight: 600;
      border-radius: 0.3125rem;
      text-decoration: none;
    }

    a:hover {
      color: #ffffff;
    }
`;

const activeStyle = {
  color: "#ffffff",
  textDecoration: "underline",
  textUnderlineOffset: "5px",
  textDecorationThickness: "3px",
};

const NavBar = () => {
    return (
        <Nav>
            <NavContainer>
                <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : null)} end>Home</NavLink>
                <NavLink to="/search" style={({ isActive }) => (isActive ? activeStyle : null)}>Search Catalog</NavLink>
                <NavLink to="/participatingresources" style={({ isActive }) => (isActive ? activeStyle : null)}>Participating Resources</NavLink>
                <NavLink to="/about" style={({ isActive }) => (isActive ? activeStyle : null)}>About</NavLink>
            </NavContainer>
        </Nav>
    );
};

export default NavBar;