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

const replaceQueryStr = (query, page, pageSize) => {
  let str = "";
  if (query.get("search_text")) {
    str += `&search_text=${query.get("search_text")}`;
  }
  str += `&page=${page}`;
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

  const pageClick = (page, pageSize) => {
    window.scrollTo(0, 0);
    const queryStr = replaceQueryStr(query, page, pageSize);
    navigate(`/search?${queryStr}`);
  };

  return (
    <>
      <Pagination pageInfo={pageInfo} pageClick={pageClick} />
    </>
  );
};

PageInfo.propTypes = {
  pageInfo: PropTypes.object.isRequired,
};

export default PageInfo;