import React from 'react';
import "./Pagination.css";
import leftArrow from "../../assets/angle-left-solid.svg"
import rightArrow from "../../assets/angle-right-solid.svg"

function Pagination({ total, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(total / 20);

  const handlePrevClick = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pages = [];
  const maxPagesToShow = 3; 
  let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(0, endPage - maxPagesToShow + 1);
  }

  if (startPage > 0) {
    pages.push(
      <div key={0} onClick={() => handlePageClick(0)}>0</div>
    );
    if (startPage > 1) {
      pages.push(<div key="dots1">..</div>);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <div
        key={i}
        className={i === currentPage ? "active" : ""}
        onClick={() => handlePageClick(i)}
      >
        {i+1}
      </div>
    );
  }

  if (endPage < totalPages - 1) {
    if (endPage < totalPages - 2) {
      pages.push(<div key="dots2">..</div>);
    }
    pages.push(
      <div key={totalPages - 1} onClick={() => handlePageClick(totalPages - 1)}>{totalPages - 1}</div>
    );
  }

  return (
    <div className="pagination-container">
      <button onClick={handlePrevClick} disabled={currentPage === 0}>
        <img src={leftArrow} style={{height: "18px", width: "10px"}} alt="left"></img>
      </button>
      {pages}
      <button onClick={handleNextClick} disabled={currentPage === totalPages - 1}>
        <img src={rightArrow} style={{height: "18px", width: "10px"}} alt="right"></img>
      </button>
    </div>
  );
}

export default Pagination;
