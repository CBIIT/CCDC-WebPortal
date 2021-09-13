import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '../../../components/Pagination';

const PageInfo = ({
  pageInfo,
  onPageSelect,
}) => {
  const pageClick = (page, pageSize) => {
    onPageSelect({
      page,
      pageSize
    });
  };

  return (
    <>
      <Pagination pageInfo={pageInfo} pageClick={pageClick} />
    </>
  );
};

PageInfo.propTypes = {
  pageInfo: PropTypes.object.isRequired,
  onPageSelect: PropTypes.func.isRequired,
};

export default PageInfo;