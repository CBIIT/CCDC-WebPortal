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
`;

const NavLinkStyled = styled(NavLink)`
    color: #003626;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    font-weight: 600;
    border-radius: 0.3125rem;
    text-decoration: none;

    &&:hover {
      color: #ffffff;
    }

    &&:focus {
        color: #ffffff;
        text-decoration: underline;
        text-underline-offset: 5px;
        text-decoration-thickness: 3px;
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
                <NavLinkStyled to="/" activeStyle={activeStyle} exact>Home</NavLinkStyled>
                <NavLinkStyled to="/search" activeStyle={activeStyle}>Search Catalog</NavLinkStyled>
                <NavLinkStyled to="/participatingresources" activeStyle={activeStyle}>Participating Resources</NavLinkStyled>
                <NavLinkStyled to="/about" activeStyle={activeStyle}>About</NavLinkStyled>
            </NavContainer>
        </Nav>
    );
};

export default NavBar;