import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import img from '../../assets/img/404.png';

const Page404Container = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding: 20px 0 20px 0;
`;

const Page404Area = styled.div`
  margin: 0 auto;
  width: 1200px;
  display: grid;
  padding-top: 31px;
  padding-bottom: 51px;
`;

const Image404 = styled.img`
  margin: 0 auto;
  width: 960px;
  height: 367px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url(${img});
  background-position: center;
`;

const Label404 = styled.div`
  text-align: center;
  color: #004187;
  font-family: Inter;
  font-weight: bold;
  font-size: 30px;
  line-height: 42px;
  margin-top: 35px;
  margin-bottom: 16px;
`;

const Desc404 = styled.div`
  text-align: center;
  font-family: Lato;
  font-weight: regular;
  font-size: 18px;
  line-height: 22px;

  a {
    font-weight: bold;
    color: #004187;
    text-decoration-thickness: 2px;
  }
`;

const PageNotFound = () => (
  <Page404Container>
    <Page404Area>
      <Image404 />
      <Label404>
        Page not found.
      </Label404>
      <Desc404>
        The page you are looking for does not exist or another error has occurred.
        <br />
        Go back or head&nbsp;
        <Link to="/">home</Link>
        &nbsp;to choose another direction.
      </Desc404>
    </Page404Area>
  </Page404Container>
);

export default PageNotFound;