import React from 'react';
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import PropTypes from 'prop-types';
import Pagination from '../../../components/Pagination';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const replaceQueryStr = (query, page) => {
  let str = "";
  if (query.get("search_text")) {
    str += `&search_text=${query.get("search_text")}`;
  }
  if (query.get("filterByResource")) {
    str += `&filterByResource=${query.get("filterByResource")}`;
  }
  str += `&page=${page}`;
  if (query.get("pageSize")) {
    str += `&pageSize=${query.get("pageSize")}`;
  }
  if (query.get("sortBy")) {
    str += `&sortBy=${query.get("sortBy")}`;
  }
  if (query.get("sortOrder")) {
    str += `&sortOrder=${query.get("sortOrder")}`;
  }
  if (query.get("viewType")) {
    str += `&viewType=${query.get("viewType")}`;
  }
  return str.substring(1);
};

const replaceQueryStrPageSize = (query, pageSize) => {
  let str = "";
  if (query.get("search_text")) {
    str += `&search_text=${query.get("search_text")}`;
  }
  if (query.get("filterByResource")) {
    str += `&filterByResource=${query.get("filterByResource")}`;
  }
  str += `&page=1`;
  str += `&pageSize=${pageSize}`;
  if (query.get("sortBy")) {
    str += `&sortBy=${query.get("sortBy")}`;
  }
  if (query.get("sortOrder")) {
    str += `&sortOrder=${query.get("sortOrder")}`;
  }
  if (query.get("viewType")) {
    str += `&viewType=${query.get("viewType")}`;
  }
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
    navigate(`/search?${queryStr}`);
  };

  const sizeClick = (pageSize) => {
    window.scrollTo(0, 0);
    const queryStr = replaceQueryStrPageSize(query, pageSize);
    navigate(`/search?${queryStr}`);
  };

  return (
    <>
      <Pagination pageInfo={pageInfo} pageClick={pageClick} sizeClick={sizeClick} />
    </>
  );
};

PageInfo.propTypes = {
  pageInfo: PropTypes.object.isRequired,
};

export default PageInfo;