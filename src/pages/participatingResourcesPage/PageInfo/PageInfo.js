import React from 'react';
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Pagination from '../../../components/Pagination';

const PageSection = styled.div`
  width: 100%;
  padding: 20px 0;
`;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const replaceQueryStr = (query, page) => {
  let str = "";
  if (query.get("search_text")) {
    str += `&search_text=${query.get("search_text")}`;
  }
  if (query.get("resource_type")) {
    str += `&resource_type=${query.get("resource_type")}`;
  }
  if (query.get("data_content_type")) {
    str += `&data_content_type=${query.get("data_content_type")}`;
  }
  str += `&page=${page}`;
  if (query.get("pageSize")) {
    str += `&pageSize=${query.get("pageSize")}`;
  }
  return str.substring(1);
};

const replaceQueryStrPageSize = (query, pageSize) => {
  let str = "";
  if (query.get("search_text")) {
    str += `&search_text=${query.get("search_text")}`;
  }
  if (query.get("resource_type")) {
    str += `&resource_type=${query.get("resource_type")}`;
  }
  if (query.get("data_content_type")) {
    str += `&data_content_type=${query.get("data_content_type")}`;
  }
  if (query.get("page")) {
    str += `&page=${query.get("page")}`;
  }
  str += `&pageSize=${pageSize}`;
  return str.substring(1);
};

const PageInfo = ({
  pageInfo,
}) => {
  const query = useQuery();
  const navigate = useNavigate();

  const pageClick = (page) => {
    window.scrollTo(0, 0);
    const queryStr = replaceQueryStr(query, page);
    navigate(`/participatingresources?${queryStr}`);
  };

  const sizeClick = (pageSize) => {
    window.scrollTo(0, 0);
    const queryStr = replaceQueryStrPageSize(query, pageSize);
    navigate(`/participatingresources?${queryStr}`);
  };

  return (
    <PageSection>
      <Pagination pageInfo={pageInfo} pageClick={pageClick} sizeClick={sizeClick} />
    </PageSection>
  );
};

PageInfo.propTypes = {
  pageInfo: PropTypes.object.isRequired,
};

export default PageInfo;