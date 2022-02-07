import React from "react";
import {useLocation, NavLink} from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.div`
    width: 100%;
    display: flex;
    position: relative;
    background-color: #2dc799;
`;

const NavContainer = styled.div`
    margin: 0 auto;
    width: 1200px;
    text-align: center;
    padding-right: 50px;
`;

const UlContainer = styled.ul`
  list-style: none;
  margin-bottom: 0;
`;

const LiSection = styled.li`
  display: inline-block;
  position: relative;
  line-height: 44px;
  text-align: center;
  color: #003626;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  font-size: 18px;
  font-weight: bold;
  font-family: Lato;
  text-decoration: none;

  a{
    display: block;
    color: #333;
    text-decoration: none;
  }
  a:hover{
    color: #fff;
  }

  :hover span{
    color: white;
    cursor: pointer;
  }

  svg {
    position: absolute;
    font-size: 25px;
    bottom: 14px;
    right: 5px;
  }

  ul.dropdown{
    min-width: 280px;
    border: 2px solid #00996B;
    display: none;
    position: absolute;
    z-index: 999;
    padding: 0;
    left: 0;
    top: 44px;
  }

  :hover ul.dropdown{
    display: block;
  }

  ul.dropdown li{
    display: block;
    background-color: #00996B;
    border-radius: 0;
    line-height: 35px;
    text-align: left;
    padding: 5px 1.5rem;
  }

  ul.dropdown li:hover {
    color: #00996B;
  }

  ul.dropdown li:not(:first-child) {
    border-top: 2px solid #00996B;
  }
`;

const activeStyle = {
  color: "#ffffff",
  textDecoration: "underline",
  textUnderlineOffset: "5px",
  textDecorationThickness: "3px",
};

const activeStyleMenuItem = {
  color: "white",
};

const NavBar = () => {
  const path = useLocation().pathname;

  return (
      <Nav>
          <NavContainer>
              <UlContainer>
                <LiSection><NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : null)} end>Home</NavLink></LiSection>
                <LiSection><NavLink to="/search" style={path.startsWith("/dataset") ? {color: "#ffffff"} : ({ isActive }) => (isActive ? activeStyle : null)}>Search Catalog</NavLink></LiSection>
                <LiSection><NavLink to="/participatingresources" style={path.startsWith("/resource") ? {color: "#ffffff"} : ({ isActive }) => (isActive ? activeStyle : null)}>Participating Resources</NavLink></LiSection>
                <LiSection>
                    <span style={path === "/about" || path === "/glossary" ? {color: "#ffffff"} : null}>
                      About&nbsp;
                      <i className="fas fa-sort-down" />
                    </span>
                    <ul className="dropdown">
                        <li><NavLink to="/about" style={({ isActive }) => (isActive ? activeStyleMenuItem : null)}>About CCDI Data Catalog</NavLink></li>
                        <li><NavLink to="/glossary" style={({ isActive }) => (isActive ? activeStyleMenuItem : null)}>Glossary</NavLink></li>
                    </ul>
                </LiSection>
              </UlContainer>
          </NavContainer>
      </Nav>
  );
};

export default NavBar;