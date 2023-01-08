import React from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const Pagination = ({ productPaginate, setPage, page }) => {
  const pages = Array.from({ length: productPaginate }, (_, index) => {
    return index + 1;
  });

  return (
    <div className='flex gap-2 md:gap-8 justify-center items-center p-4 bg-white mb-8 rounded-lg font-semibold'>
      <button
        className={
          page === 1
            ? 'flex gap-1 items-center cursor-not-allowed'
            : 'flex gap-1 items-center'
        }
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page === 1}>
        <GrFormPrevious className='text-xl' />
        <span>Prev</span>
      </button>
      {pages.map((pageNumber) => {
        return (
          <button
            key={pageNumber}
            type='button'
            className={pageNumber === page ? 'primary font-bold text-2xl' : ''}
            onClick={() => setPage(pageNumber)}>
            {pageNumber}
          </button>
        );
      })}
      <button
        className={
          page === productPaginate
            ? 'flex gap-1 items-center cursor-not-allowed'
            : 'flex gap-1 items-center'
        }
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page === productPaginate}>
        <span>Next</span>
        <GrFormNext className='text-xl ' />
      </button>
    </div>
  );
};

export default Pagination;
