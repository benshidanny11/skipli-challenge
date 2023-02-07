import React from 'react'
import ReactPaginate from 'react-paginate';

function Pagination({handlePageClick, itemsPerPage, totalRows}) {
  

    const pageCount = Math.ceil(totalRows / itemsPerPage);
  
 
  
    return (
      <>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={3}
          pageCount={pageCount}
          previousLabel="<<"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageClassName="page-num"
          previousClassName="page-num"
          nextClassName="page-num"
          activeClassName="active"
        />
      </>
    );
}

export default Pagination