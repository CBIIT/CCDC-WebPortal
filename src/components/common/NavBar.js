import React, { useEffect, useState, useRef } from "react";
import {useLocation, NavLink, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import mobileHamburger from '../../assets/img/mobile-hamburger.svg';
import mobileClose from '../../assets/img/mobile-close.svg';
import logo from '../../assets/img/CCDC_Logo.svg';
import './NavBar.css';

const LogoBanner = styled.div`
  @media (min-width: 1200px) {
    width: 100%;
  }
`;

const LogoContainer = styled.div`
  @media (min-width: 1200px) {
    width: 1200px;
    margin: 0 auto;
    img {
      width: 473px;
    }
  }

  @media (max-width: 1200px) {
    display: none;
  }

  @media (max-width: 473px) {
    // display: none;
  }
`;

const Nav = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    position: relative;
    background-color: #2dc799;
`;

const NavContainer = styled.div`
    margin: 0 auto;
    width: 100%;
    text-align: center;
    position: relative;

    @media (min-width: 1200px) {
      width: 1200px;
    }

    @media (max-width: 768px) {
      display: flex;
      .mobile-nav-toggle {
        display: block;
      }
      .mobile-nav-toggle[aria-expanded="true"] {
        background-image: url(${mobileClose});
        width: 2.5rem;
        height: 2.5rem;
        top: 5px;
      }
      .mobile-navigation {
        position: absolute;
        top: 50px;
        left: 0;
        display: block;
        z-index: 1000;
        transform: translateX(-100%);
        transition: transform 250ms ease-out;
      }
      .mobile-navigation[data-visible="true"] {
        transform: translateX(0%);
        transition: transform 250ms ease-in;
      }
      .primary-navigation {
        display: none;
      }
    }
`;

const MobileHamburger = styled.button`
  line-height: 50px;
  padding: 0;
  display: none;
  width: 2rem;
  height: 2rem;
  aspect-ratio: 1;
  z-index: 9999;
  background-image: url(${mobileHamburger});
  position: absolute;
  background-repeat: no-repeat;
  border: 0;
  background-color: transparent;
  top: 10px;
  left: 25px;
`;

const MobileUlContainer = styled.ul`
  list-style: none;
  margin-bottom: 0;
  padding: 0;
  display: none;
  width: 100%;
`;

const MobileLiSection = styled.li`
  display: grid;
  position: relative;
  line-height: 50px;
  text-align: left;
  color: #003626;
  font-size: 18px;
  font-weight: bold;
  font-family: Lato;
  text-decoration: none;
  background-color: #97dec6;
  border-bottom: 1.5px solid #5bb89b;

  a{
    display: block;
    color: #333;
    text-decoration: none;
    padding-left: 25px;
  }

  :hover {
    color: white;
    cursor: pointer;
  }
`;

const MenuHeader = styled.a`
  display: block;
  color: #333;
  text-decoration: none;
  padding-left: 25px;

  svg {
    position: absolute;
    font-size: 1.5rem;
    top: 10px;
    right: 10px;
  }

  &[aria-expanded="true"] svg{
    transform: rotate(180deg);
    top: 18px;
  }
`;

const MobileSubUl = styled.ul`
  list-style: none;
  margin-bottom: 0;
  padding: 0;
  width: 100%;
  -webkit-transition: all 250ms ease-in;
  -moz-transition: all 250ms ease-in;
  -ms-transition: all 250ms ease-in;
  -o-transition: all 250ms ease-in;
  transition: all 250ms ease-in;
  background: #e5feff;
  overflow: hidden;
  max-height: 206px;

  &[data-visible="false"] {
    transition: all 250ms ease-out;
    max-height: 0;
  }

  & li a {
    padding-left: 50px;
    font-size: 16px;
    font-weight: 500;
    font-family: Lato;
  }
`;

const UlContainer = styled.ul`
  list-style: none;
  margin-bottom: 0;
  padding: 0;
`;

const LiSection = styled.li`
  display: inline-block;
  position: relative;
  line-height: 50px;
  text-align: center;
  color: #003626;
  // padding-left: 0.5rem;
  // padding-right: 0.5rem;
  font-size: 18px;
  font-weight: bold;
  font-family: Lato;
  text-decoration: none;

  span {
    display: block;
  }

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
    bottom: 17px;
    right: 20px;
  }

  ul.dropdown{
    min-width: 280px;
    display: none;
    position: absolute;
    z-index: 999;
    padding: 0;
    left: 0;
    top: 50px;
  }

  :hover ul.dropdown{
    display: block;
  }

  ul.dropdown li{
    display: block;
    background-color: #2dc799;
    border-radius: 0;
    // line-height: 35px;
    line-height: 50px;
    text-align: left;
  }

  ul.dropdown li:not(:first-child) {
    // border-top: 2px solid #2dc799;
  }
`;

const SearchArea = styled.div`
  float: right;
  display: flex;
  border: 2px solid #2DC799;
  border-radius: 18px;
  padding: 5px 10px 5px 15px;
  color: #11B886;
  font-size: 1rem;
  font-weight: 400;
  line-height: 26px;
  position: absolute;
  background-color: white;
  top: -70px;
  right: 25px;

  @media (max-width: 768px) {
    top: 7px;
    border: 0;
    input {
      width: 180px;
    }
  }
`;

const SearchIcon = styled.div`
  color: #00996b;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;

  svg:hover {
    color: #11B886;
  }
`;

const SearchInput = styled.input`
  border: none;
  padding: 0;
  color: #00996b;
  font-size: 1rem;
  font-family: Lato;
  font-weight: 600;
  width: 225px;
  margin-left: 5px;

  ::placeholder {
    color: #00996b;
    font-size: 15px;
    font-weight: 600;
  }

  :focus {
    outline: none;
  }
`;

const mobileActiveStyle = {
  backgroundColor: "#ffffff",
};

const activeStyle = {
  color: "#ffffff",
  backgroundColor: "#059268",
};

// const activeStyleMenuItem = {
//   color: "white",
// };

const useOutsideAlerter = (ref) => {
  useEffect(() => {
      function handleClickOutside(event) {
          if ((!event.target || event.target.getAttribute("aria-controls") !== "mobile-navigation") && ref.current && !ref.current.contains(event.target)) {
              const toggle = document.querySelector(".mobile-nav-toggle");
              if (toggle.getAttribute("aria-expanded") === "true") {
                toggle.click();
              }
          }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [ref]);
};

const NavBar = () => {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const [localText, setLocalText] = useState("");
  const mobileMenuSelection = useRef(null);
  useOutsideAlerter(mobileMenuSelection);
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState("false");
  const [mobileMenuData, setMobileMenuData] = useState("false");
  const [mobileAboutMenuExpanded, setMobileAboutMenuExpanded] = useState("true");
  const [mobileAboutMenuData, setMobileAboutMenuData] = useState("true");

  const handleTextInputChange = (event) => {
    const text = event.target.value;
    setLocalText(text);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/sitesearch?keyword=${localText.trim()}`);
      setLocalText("");
    }
  };

  const handleSearch = () => {
    navigate(`/sitesearch?keyword=${localText.trim()}`);
    setLocalText("");
  };

  const handleHamburgerClick = (event) => {
    event.stopPropagation();
    if (mobileMenuExpanded === "false") {
      setMobileMenuExpanded("true");
      setMobileMenuData("true");
    } else {
      setMobileMenuExpanded("false");
      setMobileMenuData("false");
    }
  };

  const handleMobileAboutClick = () => {
    if (mobileAboutMenuExpanded === "false") {
      setMobileAboutMenuExpanded("true");
      setMobileAboutMenuData("true");
    } else {
      setMobileAboutMenuExpanded("false");
      setMobileAboutMenuData("false");
    }
  };

  const handleMobileMenuClick = () => {
    const toggle = document.querySelector(".mobile-nav-toggle");
    if (toggle.getAttribute("aria-expanded") === "true") {
      toggle.click();
    }
  };

  return (
      <div className="sticky-nav">
        <LogoBanner role="banner">
          <LogoContainer>
            <a href="/"><img src={logo} alt="ccdc logo" /></a>
          </LogoContainer>
        </LogoBanner>
        <Nav>
            <NavContainer>
                <MobileHamburger type="button" className="mobile-nav-toggle" aria-controls="mobile-navigation" aria-expanded={mobileMenuExpanded} onClick={handleHamburgerClick} />
                <MobileUlContainer ref={mobileMenuSelection} id="mobile-navigation" className="mobile-navigation" data-visible={mobileMenuData}>
                  <MobileLiSection style={path === "/" || path.startsWith("/?") ? mobileActiveStyle : null}><NavLink to="/" onClick={handleMobileMenuClick} end>Home</NavLink></MobileLiSection>
                  <MobileLiSection style={path === "/search" || path === "/dataset" || path.startsWith("/search?") || path.startsWith("/dataset?") ? mobileActiveStyle : null}><NavLink to="/search" onClick={handleMobileMenuClick}>Search Catalog</NavLink></MobileLiSection>
                  <MobileLiSection style={path === "/participatingresources" || path === "/resource" || path.startsWith("/participatingresources?") || path.startsWith("/resource?") ? mobileActiveStyle : null}><NavLink to="/participatingresources" onClick={handleMobileMenuClick}>Participating Resources</NavLink></MobileLiSection>
                  <MobileLiSection><NavLink to="/resource/CCDI" onClick={handleMobileMenuClick} end>CCDI Studies</NavLink></MobileLiSection>
                  <MobileLiSection>
                    <MenuHeader aria-expanded={mobileAboutMenuExpanded} onClick={handleMobileAboutClick}>
                      About&nbsp;
                      <i className="fas fa-sort-down" />
                    </MenuHeader>
                  </MobileLiSection>
                  <MobileSubUl data-visible={mobileAboutMenuData}>
                    <MobileLiSection style={path === "/about" || path.startsWith("/about?") ? mobileActiveStyle : null}><NavLink to="/about" onClick={handleMobileMenuClick}>About CCDI Data Catalog</NavLink></MobileLiSection>
                    <MobileLiSection style={path === "/glossary" || path.startsWith("/glossary?") ? mobileActiveStyle : null}><NavLink to="/glossary" onClick={handleMobileMenuClick}>Glossary</NavLink></MobileLiSection>
                    <MobileLiSection style={path === "/siteupdate" || path.startsWith("/siteupdate?") ? mobileActiveStyle : null}><NavLink to="/siteupdate" onClick={handleMobileMenuClick}>Site Updates</NavLink></MobileLiSection>
                    <MobileLiSection><a href="/User Guide for CCDC v1.3.1.pdf">User Guide (PDF)</a></MobileLiSection>
                  </MobileSubUl>
                </MobileUlContainer>
                <UlContainer id="primary-navigation" className="primary-navigation">
                  <LiSection><NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : null)} end>&nbsp; &nbsp; &nbsp; Home &nbsp; &nbsp; &nbsp;</NavLink></LiSection>
                  <LiSection><NavLink to="/search" style={path.startsWith("/dataset") ? activeStyle : ({ isActive }) => (isActive ? activeStyle : null)}>&nbsp; &nbsp; &nbsp; Search Catalog &nbsp; &nbsp; &nbsp;</NavLink></LiSection>
                  <LiSection><NavLink to="/participatingresources" style={path.startsWith("/resource") ? activeStyle : ({ isActive }) => (isActive ? activeStyle : null)}>&nbsp; &nbsp; &nbsp; Participating Resources &nbsp; &nbsp; &nbsp;</NavLink></LiSection>
                  <LiSection><NavLink to="/resource/CCDI">&nbsp; &nbsp; &nbsp; CCDI Studies &nbsp; &nbsp; &nbsp;</NavLink></LiSection>
                  <LiSection>
                      <span style={path === "/about" || path === "/glossary" || path === "/siteupdate" ? activeStyle : null}>
                        &nbsp; &nbsp; About &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <i className="fas fa-sort-down" />
                      </span>
                      <ul className="dropdown">
                          <li><NavLink to="/about" style={({ isActive }) => (isActive ? activeStyle : null)}>&nbsp; &nbsp; About CCDI Data Catalog</NavLink></li>
                          <li><NavLink to="/glossary" style={({ isActive }) => (isActive ? activeStyle : null)}>&nbsp; &nbsp; Glossary</NavLink></li>
                          <li><NavLink to="/siteupdate" style={({ isActive }) => (isActive ? activeStyle : null)}>&nbsp; &nbsp; Site Updates</NavLink></li>
                          <li><a href="/User Guide for CCDC v1.3.1.pdf" target="_blank" rel="noreferrer">&nbsp; &nbsp; User Guide (PDF)</a></li>
                      </ul>
                  </LiSection>
                </UlContainer>
                {
                  path !== "/sitesearch"
                  && (
                  <SearchArea>
                    <SearchInput type="text" value={localText} placeholder="Documentation Search" onChange={handleTextInputChange} onKeyPress={handleKeyPress} />
                    <SearchIcon onClick={handleSearch}>
                      <i className="fas fa-search" />
                    </SearchIcon>
                  </SearchArea>
                  )
                }
            </NavContainer>
        </Nav>
      </div>
  );
};

export default NavBar;