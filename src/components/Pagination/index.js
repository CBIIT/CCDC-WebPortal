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
    margin: -2px 0 0 -3px;
    color: #004187;
  }

  ul{
    // width: 50px;
    border: 1px solid #7CACCF;
    background-color: #DFEEF9;
  }

  div.dropdown li a{
    // width: 50px;
    color: #004187;
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
  border: 1px solid #A0B3C8;
  background-color: #F6FBFF;
`;

// const PreviousNextSelect = styled.div`
//   // padding: .2rem .2rem;
//   // font-size: 17px;
// `;

const Pagination = ({
  pageInfo,
  pageClick,
  sizeClick,
}) => {
  const pageCount = Math.ceil(pageInfo.total / pageInfo.pageSize);
  const handlePageClick = (data) => {
    pageClick(data.selected + 1, pageInfo.pageSize);
  };
  const handleSizeClick10 = (data) => {
    sizeClick(data.selected, 10);
  };
  const handleSizeClick20 = (data) => {
    sizeClick(data.selected, 20);
  };
  const handleSizeClick50 = (data) => {
    sizeClick(data.selected, 50);
  };
  const handleSizeClick100 = (data) => {
    sizeClick(data.selected, 100);
  };
  return (
    <PaginationContainer>
      {
      pageInfo.total > 0
      && (
      <>
      <ResultsPerPage>
        {/* <div>Results per Page:</div> */}
        Results per Page:
        <div className="dropdown">
          <button className="btn btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            {pageInfo.pageSize}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a className="dropdown-item active" aria-hidden="true" onClick={handleSizeClick10}>10</a></li>
            <li><a className="dropdown-item" aria-hidden="true" onClick={handleSizeClick20}>20</a></li>
            <li><a className="dropdown-item" aria-hidden="true" onClick={handleSizeClick50}>50</a></li>
            <li><a className="dropdown-item" aria-hidden="true" onClick={handleSizeClick100}>100</a></li>
            {/* <li><a className="dropdown-item" href="#" onClick={handlePageClick}>100</a></li> */}
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
        previousLinkClassName={pageInfo.page === 1 ? "page-link-ccdc-inactive" : "page-link-ccdc"}
        nextLabel=">"
        nextClassName="page-item"
        nextLinkClassName={pageInfo.page === pageCount ? "page-link-ccdc-inactive" : "page-link-ccdc"}
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
