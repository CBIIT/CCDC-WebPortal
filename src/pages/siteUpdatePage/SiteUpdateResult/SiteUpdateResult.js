import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SiteUpdateResultContainer = styled.div`
  width: 100%;
  display: grid;
  // padding-bottom: 50px;
  // padding-bottom: 80px;
`;

const ResultInfo = styled.div`
  padding: 25px;
  font-weight: bold;
`;

const SiteUpdateCard = styled.div`
  width: 100%;
  display: grid;
  border: 1px solid #b6dffd;
  margin-top: 20px;
  padding: 15px 29px;
  box-shadow: 3px 3px 10px lightgray;
`;

const SiteUpdateResult = ({
  siteUpdateList,
}) => {
  return (
    <>
      <SiteUpdateResultContainer>
        {
          siteUpdateList.length === 0 ? (
            <ResultInfo>No Results</ResultInfo>
          ) : siteUpdateList.map((rst, idx) => {
            const key = `sur_${idx}`;
            return (
              <SiteUpdateCard key={key} />
            );
          })
        }
      </SiteUpdateResultContainer>
    </>
  );
};

SiteUpdateResult.propTypes = {
    siteUpdateList: PropTypes.array.isRequired,
};

export default SiteUpdateResult;