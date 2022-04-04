import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/img/CCDC_Logo.svg';

const LogoBanner = styled.div`
  width: 100%;
`;

const LogoContainer = styled.div`
  margin: 0 auto;
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-position: left;
  height: 100px;

  @media (min-width: 1200px) {
    width: 1200px;
  }

  @media (max-width: 473px) {
    background-position: center;
  }
`;

const Header = () => {
  return (
    <>
    <LogoBanner role="banner">
      <LogoContainer />
    </LogoBanner>
    </>
  );
};

export default Header;