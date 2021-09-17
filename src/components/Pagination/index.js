import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import './Pagination.css';

const PaginationContainer = styled.div`
  display: flex;
  float: right;
`;

const PageSummary = styled.div`
  padding: .375rem .75rem;
  color: #6199ce;
  font-weight: 600;
`;

const Pagination = ({
  pageInfo,
  pageClick,
}) => {
  const pageCount = Math.ceil(pageInfo.total / pageInfo.pageSize);
  const handlePageClick = (data) => {
    pageClick(data.selected + 1, pageInfo.pageSize);
  };

  return (
    <PaginationContainer>
      {
      pageInfo.total > 0
      && (
      <>
      <PageSummary>
        Showing&nbsp;
        {(pageInfo.page - 1) * pageInfo.pageSize + 1}
        &nbsp;-&nbsp;
        {pageInfo.page * pageInfo.pageSize}
        &nbsp;of&nbsp;
        {pageInfo.total}
      </PageSummary>
      <ReactPaginate
        previousLabel="Previous"
        prevClassName="page-item"
        previousLinkClassName="page-link-ccdc"
        nextLabel="Next"
        nextClassName="page-item"
        nextLinkClassName="page-link-ccdc"
        breakLabel="..."
        breakClassName="page-item break-me"
        breakLinkClassName="page-link-ccdc"
        pageCount={pageCount}
        initialPage={pageInfo.page - 1}
        disableInitialCallback
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName="pagination no-margin"
        pageClassName="page-item"
        pageLinkClassName="page-link-ccdc"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
      </>
      )
      }
    </PaginationContainer>
    );
};

Pagination.propTypes = {
  pageInfo: PropTypes.object.isRequired,
  pageClick: PropTypes.func.isRequired,
};

export default Pagination;
