import styled from 'styled-components';

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4개의 열 */
  gap: 20px; /* 각 제품 박스 간격 */
  margin-top: 50px;
`;

export const ProductBox = styled.div`
  background-color: #f5f5f5;
  cursor: pointer;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 15px;
`;

export const ProductInfo = styled.div`
  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  p {
    font-size: 1rem;
    color: #777;
    margin-bottom: 10px;
  }

  strong {
    font-size: 1.1rem;
    color: #000;
  }
`;

export const Inline = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  margin-left: 10%;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  p {
    font-size: 1rem;
    color: #777;
  }
`;