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

const PageInfo = ({
  pageInfo,
  onPageSelect,
}) => {
  const query = useQuery();
  const navigate = useNavigate();

  const pageClick = (page, pageSize) => {
    const queryStr = replaceQueryStr(query, page);
    navigate(`/participatingresources?${queryStr}`);
    onPageSelect({
      page,
      pageSize
    });
  };

  return (
    <PageSection>
      <Pagination pageInfo={pageInfo} pageClick={pageClick} />
    </PageSection>
  );
};

PageInfo.propTypes = {
  pageInfo: PropTypes.object.isRequired,
  onPageSelect: PropTypes.func.isRequired,
};

export default PageInfo;