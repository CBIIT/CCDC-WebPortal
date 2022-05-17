import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import './Pagination.css';

const PaginationContainer = styled.div`
  display: flex;
  float: right;
`;

const ResultsPerPage = styled.div`
  // padding: .1rem 0rem;
  margin: 5px 12px 0 0;
  color: #004187;
  font-weight: 400;
  font-family: Lato;
  font-size: 15px;

  div{
    display: inline-block;
  }

  button{
    display: inline-block;
    margin: -3px 0 0 -3px;
    color: #004187;
    background-color: white;
    border: none;
    font-size: 15px;
  }

  ul{
    min-width: 30px;
    padding: 0 0 0 0;
    border-radius: 0px;
    border: 1px solid #7CACCF;
    background-color: #DFEEF9;
    // background-color: red;
    font-size: 15px;
  }

  div.dropdown li a{
    min-width: 30px;
    padding: 0px 8px 0px 8px;
    color: #004187;
    text-align: center;
  }
`;

const PageSummary = styled.div`
  padding: .2rem 1.5rem .2rem 0;
  margin: 3px 0 0 0;
  color: #004187;
  font-weight: 400;
  font-family: Lato;
  font-size: 15px;
`;

const PageSelect = styled.div`
  border: .1px solid #A0B3C8;
  // background-color: #F6FBFF;
`;

const Pagination = ({
  pageInfo,
  pageClick,
  sizeClick,
}) => {
  const pageCount = Math.ceil(pageInfo.total / pageInfo.pageSize);
  const handlePageClick = (data) => {
    pageClick(data.selected + 1);
  };
  const handleSizeClick = (size) => {
    if (pageInfo.pageSize !== size) {
      sizeClick(size);
    }
  };

  return (
    <PaginationContainer>
      {
      pageInfo.total > 0
      && (
      <>
      <ResultsPerPage>
        Results per Page:
        <div className="dropdown">
          <button className="btns btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            {pageInfo.pageSize}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a className={`dropdown-item ${pageInfo.pageSize === 10 ? "active-top" : ""}`} aria-hidden="true" onClick={() => handleSizeClick(10)}>10</a></li>
            <li><a className={`dropdown-item ${pageInfo.pageSize === 20 ? "active" : ""}`} aria-hidden="true" onClick={() => handleSizeClick(20)}>20</a></li>
            <li><a className={`dropdown-item ${pageInfo.pageSize === 50 ? "active" : ""}`} aria-hidden="true" onClick={() => handleSizeClick(50)}>50</a></li>
            <li><a className={`dropdown-item ${pageInfo.pageSize === 100 ? "active-bottom" : ""}`} aria-hidden="true" onClick={() => handleSizeClick(100)}>100</a></li>
          </ul>
        </div>
      </ResultsPerPage>
      <PageSummary>
        Showing&nbsp;
        {(pageInfo.page - 1) * pageInfo.pageSize + 1}
        -
        {pageInfo.total < pageInfo.page * pageInfo.pageSize ? pageInfo.total : pageInfo.page * pageInfo.pageSize}
        &nbsp;of&nbsp;
        {pageInfo.total}
      </PageSummary>
      <PageSelect>
      <ReactPaginate
        previousLabel="<"
        prevClassName="page-item"
        previousLinkClassName={pageInfo.page === 1 ? "page-link-ccdc-inactive" : "page-link-ccdc-prev"}
        nextLabel=">"
        nextClassName="page-item"
        nextLinkClassName={pageInfo.page === pageCount ? "page-link-ccdc-inactive" : "page-link-ccdc-next"}
        breakLabel="..."
        breakClassName="page-item break-me"
        breakLinkClassName="page-link-ccdc"
        pageCount={pageCount}
        pageSize={handlePageClick}
        forcePage={pageInfo.page - 1}
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
      </PageSelect>
      </>
      )
      }
    </PaginationContainer>
    );
};

Pagination.propTypes = {
  pageInfo: PropTypes.object.isRequired,
  pageClick: PropTypes.func.isRequired,
  sizeClick: PropTypes.func.isRequired,
};

export default Pagination;
