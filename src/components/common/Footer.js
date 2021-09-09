import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import logo from '../../assets/img/nih-white-logo.png';

const FooterStyled = styled.footer`
  background-color: #283247;
  bottom: 0;
  width: 100%;
  height: 18rem;
`;

const FooterContainer = styled(Container)`
  max-width: 1200px;
  // color: var(--white);
  color: white;
  text-decoration: none;
`;

const Menu = styled.div`
  padding: 2rem 0 1em;
`;

const Logo = styled.img`
  max-width: 15rem;
`;

const Title = styled.h2`
  font-size: 0.875rem;
  color: var(--white);
`;

const MenuLink = styled(Link)`
  font-size: 0.75rem;
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
    font-size: 0.75rem;
    text-decoration: none;
  }
`;

const Hr = styled.hr`
  border-top: 1px solid #98D2FF;
  width: 95%;
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
`;

const Copyright = styled.div`
  text-align: center;
  padding: 0.625rem 0;

  && span {
    color: var(--white);
    font-size: 0.75rem;
  }
`;

const Footer = () => {
  return (
    <FooterStyled role="contentinfo">
      <FooterContainer>
        <Menu>
          <Row>
            <Col xs={5}>
              <a href="https://www.cancer.gov/" target="_blank" rel="noopener noreferrer"><Logo src={logo} alt="logo-footer" /></a>
            </Col>
            <Col xs={7}>
              <Row>
                <Col xs={4}>
                  <Title>Contact Information</Title>
                  <MenuUl>
                    <MenuLi><a href="mailto:evssip@mail.nih.gov">Contact Us</a></MenuLi>
                  </MenuUl>
                </Col>
                <Col xs={4}>
                  <Title>More Information</Title>
                  <MenuUl>
                    <MenuLi><MenuLink to="/about" aria-label="About EVS-SIP">About EVS-SIP</MenuLink></MenuLi>
                    <MenuLi><MenuLink to="/datamodel" aria-label="Data Models">Data Models</MenuLink></MenuLi>
                  </MenuUl>
                </Col>
                <Col xs={4}>
                  <Title>NIH Policies</Title>
                  <MenuUl>
                    <MenuLi><a href="https://www.cancer.gov/policies/disclaimer" target="_blank" rel="noopener noreferrer">Disclaimer</a></MenuLi>
                    <MenuLi>
                      <a href="https://www.cancer.gov/policies/accessibility" target="_blank" rel="noopener noreferrer">Accessibility</a>
                    </MenuLi>
                    <MenuLi><a href="https://www.cancer.gov/policies/foia" target="_blank" rel="noopener noreferrer">FOIA</a></MenuLi>
                  </MenuUl>
                </Col>
              </Row>
            </Col>
          </Row>
        </Menu>
        <Hr />
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

export default Footer;