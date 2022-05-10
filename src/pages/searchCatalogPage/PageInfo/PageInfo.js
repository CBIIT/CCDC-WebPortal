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
  if (query.get("filterByResource")) {
    str += `&filterByResource=${query.get("filterByResource")}`;
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
  onSizeSelect,
}) => {
  const query = useQuery();
  const navigate = useNavigate();

  const pageClick = (page, pageSize) => {
    window.scrollTo(0, 0);
    const queryStr = replaceQueryStr(query, page, pageSize);
    navigate(`/search?${queryStr}`);
  };

  const sizeClick = (page, pageSize) => {
    window.scrollTo(0, 0);
    const queryStr = replaceQueryStr(query, page);
    navigate(`/search?${queryStr}`);
    onSizeSelect({
      page,
      pageSize
    });
  };

  return (
    <>
      <Pagination pageInfo={pageInfo} pageClick={pageClick} sizeClick={sizeClick} />
    </>
  );
};

PageInfo.propTypes = {
  pageInfo: PropTypes.object.isRequired,
  onSizeSelect: PropTypes.func.isRequired,
};

export default PageInfo;