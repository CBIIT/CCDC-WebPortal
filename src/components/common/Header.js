import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/img/CCDC_Logo.svg';

const HeaderContainer = styled.div`
  @media (min-width: 1200px) {
    display: none;
  }
`;

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
    display: none;
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
    <HeaderContainer>
      <include-html src="https://cbiit.github.io/ccdi-alert-elements/banners/government-shutdown.html" data='{"banner_width": "1024px", "lower_tier_identifier": ["localhost:", "-dev.", "-dev2.", "-qa.", "-qa2."]}' />
    </HeaderContainer>
    <LogoBanner role="banner">
      <LogoContainer>
        <a href="/"><img src={logo} alt="ccdc logo" /></a>
      </LogoContainer>
    </LogoBanner>
    </>
  );
};

export default Header;