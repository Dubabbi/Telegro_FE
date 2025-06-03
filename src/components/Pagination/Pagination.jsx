import * as P from './PaginationStyle';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, startPage, endPage, onPageChange, onGroupChange }) => {
  return (
    <P.PaginationWrapper>
      <P.ArrowButton onClick={() => onGroupChange('prev')} disabled={startPage === 1}>
        <FaArrowLeft />
        <span style={{ marginLeft: '8px' }}>이전</span>
      </P.ArrowButton>

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
        <P.PageButton
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </P.PageButton>
      ))}

      <P.ArrowButton onClick={() => onGroupChange('next')} disabled={endPage === totalPages}>
        <span style={{ marginRight: '8px' }}>다음</span>
        <FaArrowRight />
      </P.ArrowButton>
    </P.PaginationWrapper>
  );
};

export default Pagination;
