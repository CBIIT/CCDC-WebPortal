import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import ReactHtmlParser from "html-react-parser";

const SearchResultContainer = styled.div`
  width: 100%;
  display: grid;
`;

const ResultInfo = styled.div`
  padding: 20px;
  font-weight: bold;
`;

const DocumentCard = styled.div`
  width: 100%;
  display: grid;
  padding: 0 20px 40px 20px;

  b {
    color: #00875E;
  }
`;

const DocumentHeader = styled.div`
  width: 100%;
  display: flex;
  height: 30px;
  font-size: 25px;

  a {
    color: #00875E;
    text-underline-offset: 3px;
    text-decoration-thickness: 1px;
  }
`;

const DocumentDesc = styled.div`
  width: 100%;
  margin-top: 15px;
  word-wrap: break-word;
  hyphens: auto;
  font-size: 19px;
  font-family: Lato;
`;

const DocumentLink = styled.div`
  width: 100%;
  display: flex;
  margin-top: 5px;
  word-wrap: break-word;
  hyphens: auto;
  font-size: 19px;

  a {
    color: #00875E;
    text-underline-offset: 3px;
    text-decoration-thickness: 1px;
  }
`;

const SearchResult = ({
  resultList,
}) => {
  const domain = window.location.origin;

  return (
    <>
      <SearchResultContainer>
        {
          resultList.length === 0 ? (
            <ResultInfo>Result not found</ResultInfo>
          ) : resultList.map(({ content, highlight }, idx) => {
            const key = `sr_${idx}`;
            const linkFullPath = domain + content.link;
            const title = highlight && highlight.title ? highlight.title : content.title;
            let desc = content.description;
            if (highlight && highlight.description) {
              const [arrDesc] = highlight.description;
              desc = arrDesc;
            }
            if (desc) {
              if (desc.length > 600) {
                desc = `${desc.substring(0, 600)} ...`;
              }
            }
            const link = highlight && highlight.content ? `<b>${linkFullPath}</b>` : linkFullPath;
            let updatedTitle = title;
            if (Array.isArray(title)) {
              [updatedTitle] = title;
            }
            return (
              <DocumentCard key={key}>
                <DocumentHeader>
                  <Link to={content.link}>
                    {ReactHtmlParser(updatedTitle)}
                  </Link>
                </DocumentHeader>
                <DocumentDesc>
                  {ReactHtmlParser(desc)}
                </DocumentDesc>
                <DocumentLink>
                  <Link to={content.link}>
                    {ReactHtmlParser(link)}
                  </Link>
                </DocumentLink>
              </DocumentCard>
            );
          })
        }
      </SearchResultContainer>
    </>
  );
};

SearchResult.propTypes = {
  resultList: PropTypes.array.isRequired,
};

export default SearchResult;