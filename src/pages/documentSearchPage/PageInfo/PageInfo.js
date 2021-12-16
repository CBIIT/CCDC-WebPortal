import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Pagination from '../../../components/Pagination';

const PageSection = styled.div`
  width: 100%;
  padding: 10px 0;
`;

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