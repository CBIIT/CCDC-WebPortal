import React from 'react';
import styled from 'styled-components';
import SiteUpdateResult from './SiteUpdateResult';

const PageHeaderContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding: 20px 0 20px 0;
`;

const PageHeaderArea = styled.div`
  margin: 0 auto;
  width: 1200px;
  display: flex;
`;

const PageLabelArea = styled.div`
  width: 500px;
`;

const PageLabel = styled.div`
  display: grid;
  color: #004187;
  font-size: 42px;
  line-height: 42px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  padding-left: 25px;
`;

const SiteUpdateContainer = styled.div`
  width: 100%;
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
                <span>Updates</span>
                <span>to the</span>
                <span>Data Catalog Site</span>
            </PageLabel>
          </PageLabelArea>
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