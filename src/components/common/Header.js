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

// const HeaderCover = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 24px;
//   z-index: 9999;
//   background: white;

//   @media (max-width: 1200px) {
//     position: absolute;
//   }
// `;

const HeaderBannerContainer = styled.div`
  width: 100%;
  background: #bb0e3d;
  padding: 15px;

  .nci-shutdown-banner__body {
    max-width: 1180px;
    margin: 0 auto;
    color: white;
    font-size: 17px;
    line-height: 1.6;
    position: relative;
    padding: 0 15px 0 40px;
  }

  .nci-shutdown-banner__body:before {
    content: '';
    display: block;
    position: absolute;
    height: 26px;
    width: 26px;
    top: 0;
    left: 0;
    background: none;
    background-color: #fff;
    -webkit-mask: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMSAxNWgtMnYtMmgydjJ6bTAtNGgtMlY3aDJ2NnoiLz48L3N2Zz4=) no-repeat center/contain;
    mask: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMSAxNWgtMnYtMmgydjJ6bTAtNGgtMlY3aDJ2NnoiLz48L3N2Zz4=) no-repeat center/contain;
  }
  .nci-shutdown-banner__body h2 {
    font-size: 18px;
    margin: 0;
  }
  .nci-shutdown-banner__body a, 
  .nci-shutdown-banner__body a:visited {
    color: white;
  }
  .nci-shutdown-banner__body p {
    margin: 0;
  }

  @media (min-width: 1200px) {
    display: none;
  }
`;

const Header = () => {
  return (
    <>
    <HeaderBannerContainer aria-label="Government Funding Lapse">
      <div class="nci-shutdown-banner__body">
        <h2>Government Funding Lapse</h2>
        <p>
          Because of a lapse in government funding, the information on this website may not be up to date, transactions submitted via the website may not be processed, and the agency may not be able to respond to inquiries until appropriations are enacted. The NIH Clinical Center (the research hospital of NIH) is open. For more details about its operating status, please visit&nbsp;
          <a href="https://cc.nih.gov/">cc.nih.gov</a>
          . Updates regarding government operating status and resumption of normal operations can be found at&nbsp;
          <a href="https://opm.gov/">OPM.gov</a>
          .
        </p>
      </div>
    </HeaderBannerContainer>
    {/* <HeaderCover /> */}
    <LogoBanner role="banner">
      <LogoContainer>
        <a href="/"><img src={logo} alt="ccdc logo" /></a>
      </LogoContainer>
    </LogoBanner>
    </>
  );
};

export default Header;