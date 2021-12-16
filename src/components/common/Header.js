import React, { useState } from 'react';
import { useLocation, Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/img/CCDC_Logo.svg';

const LogoBanner = styled.div`
  width: 100%;
`;

const LogoContainer = styled.div`
  width: 1250px;
  margin: 0 auto;
`;

const Logo = styled.img`
  height: 100px;
`;

const SearchArea = styled.div`
  float: right;
  display: flex;
  border: 2px solid #11B886;
  border-radius: 18px;
  padding: 5px 10px 5px 15px;
  color: #11B886;
  font-size: 1rem;
  font-weight: 400;
  margin-top: 30px;
  margin-right: 20px;
  line-height: 26.41px;
`;

const SearchIcon = styled.div`
  // color: #11B886;
  color: #00996b;
  font-size: 1.1rem;
  font-weight: 600;
`;

const SearchInput = styled.input`
  border: none;
  // color: #11B886;
  color: #00996b;
  font-size: 1rem;
  font-weight: 600;
  width: 250px;
  margin-left: 5px;

  ::placeholder {
    // color: #11B886;
    color: #00996b;
    font-size: 1rem;
    font-weight: 600;
  }

  :focus {
    outline: none;
  }
`;

const Header = () => {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const [localText, setLocalText] = useState("");

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

  return (
    <>
    <LogoBanner role="banner">
      <LogoContainer>
        <Link to="/"><Logo src={logo} alt="logo" /></Link>
        {
          path !== "/sitesearch"
          && (
          <SearchArea>
            <SearchInput type="text" value={localText} placeholder="Documentation Search" onChange={handleTextInputChange} onKeyPress={handleKeyPress} />
            <SearchIcon>
              <i className="fas fa-search" />
            </SearchIcon>
          </SearchArea>
          )
        }
      </LogoContainer>
    </LogoBanner>
    </>
  );
};

export default Header;