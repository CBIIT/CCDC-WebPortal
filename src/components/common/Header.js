import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/img/CCDC_Logo.svg';

const LogoBanner = styled.div`
  width: 100%;
`;

const LogoContainer = styled.div`
  margin: 0 auto;
  img {
    width: 473px;
  }

  @media (min-width: 1200px) {
    width: 1200px;
  }

  @media (max-width: 1200px) {
    width: 100%;
  }

  @media (max-width: 473px) {
    img {
      width: 300px;
      padding-left: 10px;
    }
  }
`;

const Header = () => {
  return (
    <>
    <LogoBanner role="banner">
      <LogoContainer>
        <img src={logo} alt="ccdc logo" />
      </LogoContainer>
    </LogoBanner>
    </>
  );
};

export default Header;