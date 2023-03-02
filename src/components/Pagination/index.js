import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import BSPagination from 'react-bootstrap/Pagination';
import styled from 'styled-components';
import { Dropdown } from 'bootstrap';
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
  border: 0;
`;

const getPager = (totalPages, currentPage) => {
  let startPage = 1;
  let endPage = totalPages;
  if (totalPages <= 5) {
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage <= 3) {
    startPage = 1;
    endPage = 5;
  } else if (currentPage + 2 >= totalPages) {
    startPage = totalPages - 4;
    endPage = totalPages;
  } else {
    startPage = currentPage - 2;
    endPage = currentPage + 2;
  }

  const pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

  return pages;
};

const Pagination = ({
  pageInfo,
  pageClick,
  sizeClick,
}) => {
  const pageCount = Math.ceil(pageInfo.total / pageInfo.pageSize);
  const pages = getPager(pageCount, pageInfo.page);
  const handlePageClick = (pageIndex) => {
    pageClick(pageIndex);
  };
  const handleSizeClick = (size) => {
    if (pageInfo.pageSize !== size) {
      sizeClick(size);
    }
  };

  const initializeDropdown = () => {
    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownElementList.map((dropdownToggleEl) => {
      return new Dropdown(dropdownToggleEl);
    });
  };

  useEffect(() => {
    initializeDropdown();
  }, [pageInfo]);

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
        <span id="total_records_count">{pageInfo.total}</span>
      </PageSummary>
      <PageSelect>
        <BSPagination className="pagination-ccdc">
          {
            pageInfo.page === 1 ? (
              <BSPagination.Prev className="bspage-link-prev" disabled>&#60;</BSPagination.Prev>
            ) : (<BSPagination.Prev className="bspage-link-prev" onClick={() => handlePageClick(pageInfo.page - 1)}>&#60;</BSPagination.Prev>)
          }
          {
            pages.map((page, idx) => {
              const key = `page_${idx}`;
              return page === pageInfo.page ? (
                <BSPagination.Item className="bspage-link" key={key} active>{page}</BSPagination.Item>
              ) : (
                <BSPagination.Item className="bspage-link" key={key} onClick={() => handlePageClick(page)}>{page}</BSPagination.Item>
              );
            })
          }
          {
            pageInfo.page === pageCount ? (
              <BSPagination.Next className="bspage-link-next" disabled>&#62;</BSPagination.Next>
            ) : (<BSPagination.Next className="bspage-link-next" onClick={() => handlePageClick(pageInfo.page + 1)}>&#62;</BSPagination.Next>)
          }
        </BSPagination>
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
