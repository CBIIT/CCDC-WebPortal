import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/img/CCDC_Logo.svg';
import usFlagSmall from '../../assets/img/us_flag_small.png';

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
const USGovBanner = styled.div`
  background-color: #f0f0f0;
  height: 46px;
  width: 100%;
  align-items: center;
  .USGovBannerInner {
    padding: 8px 32px;
    display: flex;
    align-items: center;
    height: 100%;
    margin: 0 auto;
    max-width: 1200px;
  }

  img {
    height: 11px;
    width: 16px;
  }

  .bannerLeft {
    width: 50%;
    text-align: left;
    display: flex;
    align-items: center;
  }
  .bannerText {
    // font-family: "Open Sans";
    font-size: 12px;
    font-weight: 400;
    color: #000000;
    margin-left: 15px;
  }
  .bannerRight {
    width: 50%;
    text-align: right;
    .bannerButton {
      display: inline-block;
      background-color: #3b7f84;
      width: 72px;
      height: 30px;
      border-radius: 5px;
      // font-family: "Open Sans", sans-serif;
      font-size: 15px;
      font-weight: 700;
      color: white;
      letter-spacing: 0em;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
    }
  }

  @media (min-width: 1200px) {
    display: none;
  }
`;
// const HeaderCover = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 24px;
//   z-index: 9999;
//   background: white;

//   @media (max-width: 1200px) {
//     display: none;
//   }
// `;

const Header = () => {
  return (
    <>
    {/* <HeaderCover /> */}
    <LogoBanner role="banner">
      <USGovBanner>
        <div className="USGovBannerInner">
          <div className="bannerLeft">
            <img src={usFlagSmall} alt="US Flag logo" />
            <span className="bannerText">An official website of the United States government</span>
          </div>

          <div className="bannerRight">
            {/*
            <span className='bannerButton'>Español</span>
            */}
          </div>
        </div>
      </USGovBanner>
      <LogoContainer>
        <a href="/"><img src={logo} alt="ccdc logo" /></a>
      </LogoContainer>
    </LogoBanner>
    </>
  );
};

export default Header;