import React from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/img/nci-logo-full.svg';

const LogoContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;

const Logo = styled.img`
  height: 3rem;
`;

const Header = () => {
    return (
      <LogoContainer role="banner">
        <Link to="/"><Logo src={logo} alt="logo" /></Link>
      </LogoContainer>
  );
};

export default Header;