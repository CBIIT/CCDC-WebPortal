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
  color: #004187;
  font-weight: 400;
  font-family: Lato;
  font-size: 17px;
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
        {pageInfo.total < pageInfo.page * pageInfo.pageSize ? pageInfo.total : pageInfo.page * pageInfo.pageSize}
        &nbsp;of&nbsp;
        {pageInfo.total}
      </PageSummary>
      <ReactPaginate
        previousLabel="Previous"
        prevClassName="page-item"
        previousLinkClassName={pageInfo.page === 1 ? "page-link-ccdc-inactive" : "page-link-ccdc"}
        nextLabel="Next"
        nextClassName="page-item"
        nextLinkClassName={pageInfo.page === pageCount ? "page-link-ccdc-inactive" : "page-link-ccdc"}
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
