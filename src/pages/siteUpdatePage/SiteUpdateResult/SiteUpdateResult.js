// import React from 'react';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactHtmlParser from "react-html-parser";

const SiteUpdateResultContainer = styled.div`
  width: 100%;
  display: grid;
  padding: 0 0 50px 0;
`;

const ResultInfo = styled.div`
  padding: 25px;
  font-weight: bold;
`;

const SiteUpdateItem = styled.div`
  display: grid;
  margin: 0px 0px 50px 0px;
  scroll-margin: 200px;
`;

const SiteUpdateCard = styled.div`
  display: grid;
  border: 1px solid #b6dffd;
  box-shadow: 3px 3px 10px lightgray;
  // margin-top: 20px;
  margin: -44px 30px 0px 370px;
  padding: 15px 29px;
  max-height: 360px;
  overflow-y: auto;
`;

const SiteUpdateDate = styled.div`
    color: #00A272;
    font-family: Lato;
    font-weight: bold;
    margin: 0px 0px 0px 130px;
`;

const SiteUpdateCardTitle = styled.div`
    color: #00A272;
    font-family: Inter;
    font-size: 23px;
    font-weight: 600;
    line-height: 23px;
    height: 38px;
    border-bottom: 2px solid #004187;
    margin: 5px 0px 20px 0px;
    padding-bottom: 10px;
`;

// const BackToTopButton = styled.div`
//     color: #00A272;
//     font-family: Inter;
//     font-size: 13px;
//     font-weight: bold;
//     margin: -30px 0px 0px 655px;
// `;

const SiteUpdateCardDescription = styled.div`
    color: #000000;
    font-family: Lato;
    font-size: 14px;
    line-height: 17px;
    padding: 0px 0px 20px 0px;

    a {
        text-decoration: none;
        color: #00a272;
        font-weight: 500;
    }
`;

const SiteUpdateResult = ({
  siteUpdateList,
  onLoadSiteUpdates,
}) => {
    const { hash } = window.location;
    useEffect(() => {
      if (siteUpdateList.length === 0) {
        onLoadSiteUpdates().catch(error => {
          throw new Error(`Loading site updates failed: ${error}`);
        });
      }
      if (siteUpdateList.length > 0) {
        if (hash !== '') {
          const id = hash.replace('#', '');
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: 'smooth'});
        }
      }
    }, [siteUpdateList]);

  return (
    <>
      <SiteUpdateResultContainer>
        <ResultInfo />
        {
            siteUpdateList.length === 0 ? (
            <ResultInfo>
              {/* No Results */}
            </ResultInfo>
          ) : siteUpdateList.map((item, idx) => {
            const itemKey = `update_${idx}`;
            let date = item.post_date;
            date = `${item.post_date.substring(5, 7)}/${item.post_date.substring(8, 10)}/${item.post_date.substring(0, 4)}`;
            const desc = item.description;
            return (
              <SiteUpdateItem id={`post${item.id}`}>
                <SiteUpdateDate>{date}</SiteUpdateDate>
                <SiteUpdateCard key={itemKey}>
                  <SiteUpdateCardTitle>
                    {item.title}
                  </SiteUpdateCardTitle>
                  <SiteUpdateCardDescription>
                    {ReactHtmlParser(desc)}
                  </SiteUpdateCardDescription>
                </SiteUpdateCard>
              </SiteUpdateItem>
            );
          })
        }
      </SiteUpdateResultContainer>
    </>
  );
};

SiteUpdateResult.propTypes = {
    siteUpdateList: PropTypes.array.isRequired,
    onLoadSiteUpdates: PropTypes.func.isRequired,
};

export default SiteUpdateResult;