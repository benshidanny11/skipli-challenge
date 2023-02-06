import React, { useState } from 'react'
import ReactPaginate from 'react-paginate';

function Pagination({handlePageClick, itemsPerPage}) {
  

    const pageCount = Math.ceil(1000 / itemsPerPage);
  
 
  
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
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeClassName="active"
        />
      </>
    );
}

export default Pagination