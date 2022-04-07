import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

const FooterStyled = styled.footer`
  background-color: #283247;
  bottom: 0;
  width: 100%;
`;

const FooterContainer = styled.div`
  color: white;
  font-family: Lato;
  font-size: 16px;
  font-weight: 400;
  text-decoration: none;
  position: relative;
  margin: 0 auto;

  @media (min-width: 1200px) {
    width: 1200px;
  }
`;

const Menu = styled.div`
  padding: 2rem 0 0 0;
`;

const Row = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: 640px) {
    display: grid;
    text-align: center;

    .col-6 {
      width: 100%;
    }
  }
`;

const Logo = styled.div`
  display: block;
  h1 {
    font-size: 25px;
    text-align: left;
  }
  h1 span {
    font-size: 16px;
    display: block;
  }
  @media (max-width: 640px) {
    padding-bottom: 50px;
    h1 {
      text-align: center;
    }
  }
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  line-height: 13px;
  color: var(--white);
`;

const MenuLink = styled(Link)`
  font-size: 16px;
  font-weight: 400;
  color: var(--white);
`;

const MenuUl = styled.ul`
  padding-left: 0;
  list-style: none;
`;

const MenuLi = styled.li`
  line-height: 1.5;

  && a {
    color: var(--white);
    font-size: 16px;
    font-weight: 400;
    text-decoration: none;
  }
`;

const Hr = styled.hr`
  border-top: 1px solid #98D2FF;
  width: 100%;
`;

const SiteInfo = styled.div`
  position: absolute;
  font-size: 0.6875rem;
  top: 230px;

  @media (max-width: 1000px) {
    position: relative;
    top: 0;
    padding-bottom: 15px;
    text-align: center;
  }
`;

const Caption = styled.div`
  font-size: 0.6875rem;
  padding: 0.3125rem 0;
  text-align: center;

  && a {
    color: var(--white);
    font-size: 0.75rem;
    margin: 0 0.5rem;
    text-decoration: none;
  }

  @media (max-width: 640px) {
    display: grid;
    span {
      display: none;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding: 0.625rem 0;

  && span {
    color: var(--white);
    font-size: 0.75rem;
  }
`;

const Footer = ({
  versionInfo,
  onLoadApplicationVersionInfo,
}) => {
  useEffect(() => {
    onLoadApplicationVersionInfo().catch(error => {
      throw new Error(`Loading application version info failed ${error}`);
    });
  }, []);

  return (
    <FooterStyled role="contentinfo">
      <FooterContainer>
        <Menu>
          <Row>
            <Col xs={6}>
              <Logo>
                <h1>
                  National Cancer Institute
                  <span>at the National Institutes of Health</span>
                </h1>
              </Logo>
            </Col>
            <Col xs={6}>
              <Row>
                <Col xs={6}>
                  <Row className="mb-2 pb-3">
                    <Col xs={12}>
                      <Title>Contact Information</Title>
                      <MenuUl>
                        <MenuLi><a href="mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov">Contact Us</a></MenuLi>
                      </MenuUl>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Title>More Information</Title>
                      <MenuUl>
                        <MenuLi><MenuLink to="/about" aria-label="About CCDC">About CCDC</MenuLink></MenuLi>
                      </MenuUl>
                    </Col>
                  </Row>
                </Col>
                <Col xs={6}>
                  <Title>NIH Policies</Title>
                  <MenuUl>
                    <MenuLi><a href="https://www.cancer.gov/policies" target="_blank" rel="noopener noreferrer">Policies</a></MenuLi>
                    <MenuLi><a href="https://www.cancer.gov/policies/disclaimer" target="_blank" rel="noopener noreferrer">Disclaimer</a></MenuLi>
                    <MenuLi>
                      <a href="https://www.cancer.gov/policies/accessibility" target="_blank" rel="noopener noreferrer">Accessibility</a>
                    </MenuLi>
                    <MenuLi><a href="https://www.cancer.gov/policies/foia" target="_blank" rel="noopener noreferrer">FOIA</a></MenuLi>
                    <MenuLi><a href="https://www.hhs.gov/vulnerability-disclosure-policy/index.html" target="_blank" rel="noopener noreferrer">HHS Vulnerability Disclosure</a></MenuLi>
                  </MenuUl>
                </Col>
              </Row>
            </Col>
          </Row>
        </Menu>
        <Hr />
        <SiteInfo>
          <div>
            Software Version:&nbsp;
            {versionInfo.softwareVersion}
          </div>
          <div>
            Site Data Update:&nbsp;
            {versionInfo.siteDataUpdate}
          </div>
        </SiteInfo>
        <Row>
          <Col xs={12}>
            <Caption>
              <a href="http://www.hhs.gov/" target="_blank" rel="noopener noreferrer">U.S. Department of Health and Human Services</a>
              <span>|</span>
              <a href="http://www.nih.gov/" target="_blank" rel="noopener noreferrer">National Institutes of Health</a>
              <span>|</span>
              <a href="http://www.cancer.gov/" target="_blank" rel="noopener noreferrer">National Cancer Institute</a>
              <span>|</span>
              <a href="http://www.usa.gov/" target="_blank" rel="noopener noreferrer">USA.gov</a>
            </Caption>
            <Copyright>
              <span>NIH … Turning Discovery Into Health®</span>
            </Copyright>
          </Col>
        </Row>
      </FooterContainer>
    </FooterStyled>
  );
};

Footer.propTypes = {
  versionInfo: PropTypes.object.isRequired,
  onLoadApplicationVersionInfo: PropTypes.func.isRequired,
};

export default Footer;