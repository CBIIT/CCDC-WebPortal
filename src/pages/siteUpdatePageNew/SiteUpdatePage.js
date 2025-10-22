import React from 'react';
import styled from 'styled-components';
import siteUpdateGraphic from "../../assets/img/update_graphic.png";
import SiteUpdateResult from './SiteUpdateResult';

const PageHeaderContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding: 35px 0px 10px 5px;
`;

const PageHeaderArea = styled.div`
  margin: 0 auto;
  width: 1200px;
  display: flex;

  img {
    padding: 0 0px 0 0;
    width: 55%;
    margin-left: 20px;
    // height: 191px;
    // width: 745px;
  }
`;

const PageLabelArea = styled.div`
  width: 500px;
`;

const PageLabel = styled.div`
  display: grid;
  margin: 10px 0px 50px 0px;
  padding-left: 25px;

  h1 {
    width: 150px;
    color: #004187;
    font-family: Inter;
    font-size: 42px;
    font-weight: 600;
    line-height: 42px;
  }
`;

const SiteUpdateContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  width: 1200px;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  padding: 0px 0px 0px 0px;
  // padding-bottom: 80px;
`;

const SiteUpdateContent = styled.div`
  margin: 0 auto;
  width: 1200px;
`;

const SiteUpdatePage = () => {
  window.scrollTo(0, 0);

  return (
    <>
      <PageHeaderContainer>
        <PageHeaderArea>
          <PageLabelArea>
            <PageLabel>
                <h1>Release Notes</h1>
            </PageLabel>
          </PageLabelArea>
          <img src={siteUpdateGraphic} alt="Keyboard with a button that says, website update" />
        </PageHeaderArea>
      </PageHeaderContainer>
      <SiteUpdateContainer>
        <SiteUpdateContent>
          <SiteUpdateResult />
        </SiteUpdateContent>
      </SiteUpdateContainer>
    </>
  );
};

export default SiteUpdatePage;