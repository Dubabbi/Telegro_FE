import styled from 'styled-components';
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 40px 0;
`;

export const PageButton = styled.button`
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

export const ArrowButton = styled(PageButton)`
  padding: 10px;
  font-size: 1.2rem;
  background-color: white;
  border-radius: 50px;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;
