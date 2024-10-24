import React from 'react';
import * as P from './PaginationStyle';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <P.PaginationWrapper>
      <P.ArrowButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <FaArrowLeft />
        <span style={{ marginLeft: '8px' }}>이전</span>
      </P.ArrowButton>

      {[...Array(totalPages)].map((_, index) => (
        <P.PageButton
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={currentPage === index + 1 ? 'active' : ''}
        >
          {index + 1}
        </P.PageButton>
      ))}

      <P.ArrowButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <span style={{ marginRight: '8px' }}>다음</span>
        <FaArrowRight />
      </P.ArrowButton>
    </P.PaginationWrapper>
  );
};

export default Pagination;