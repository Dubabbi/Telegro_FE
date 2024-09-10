import React from 'react';
import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// 페이지네이션 스타일
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
`;

const PageButton = styled.button`
  background: white;
  border: 1px solid #ccc;
  border-radius: 30px;
  padding: 8px 16px;
  margin: 0 5px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f0f0f0;
  }

  &.active {
    background-color: #4D44B5;
    color: white;
    border: none;
  }
  
  &:disabled {
    background-color: #f0f0f0;
    color: #ccc;
    cursor: not-allowed;
  }
`;

const ArrowButton = styled(PageButton)`
  padding: 10px;
  font-size: 1.2rem;
  background-color: white;
  border-radius: 50px;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <PaginationWrapper>
      <ArrowButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <FaArrowLeft />
        <span style={{ marginLeft: '8px' }}>이전</span>
      </ArrowButton>

      {[...Array(totalPages)].map((_, index) => (
        <PageButton
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={currentPage === index + 1 ? 'active' : ''}
        >
          {index + 1}
        </PageButton>
      ))}

      <ArrowButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <span style={{ marginRight: '8px' }}>다음</span>
        <FaArrowRight />
      </ArrowButton>
    </PaginationWrapper>
  );
};

export default Pagination;
