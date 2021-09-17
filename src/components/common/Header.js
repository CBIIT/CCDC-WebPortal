import React from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/img/logo.png';

const LogoBanner = styled.div`
  width: 100%;
  padding: 10px 0;
`;

const LogoContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.img`
  height: 72px;
`;

const Header = () => {
    return (
      <LogoBanner role="banner">
        <LogoContainer>
          <Link to="/"><Logo src={logo} alt="logo" /></Link>
        </LogoContainer>
      </LogoBanner>
  );
};

export default Header;