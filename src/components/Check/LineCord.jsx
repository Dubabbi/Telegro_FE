import React from 'react';
import styled from 'styled-components';
import image from './image.svg';

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4개의 열 */
  gap: 20px; /* 각 제품 박스 간격 */
  margin-top: 50px;
`;

const ProductBox = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const ProductInfo = styled.div`
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

const Inline = styled.div`
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


const products = [
  { id: 1, name: '상품명', model: '모델명', price: '880,000원', img: image },
  { id: 2, name: '헤드셋2', model: '모델명', price: '880,000원', img: image },
  { id: 1, name: '상품명', model: '모델명', price: '880,000원', img: image },
  { id: 2, name: '헤드셋2', model: '모델명', price: '880,000원', img: image },
  { id: 1, name: '상품명', model: '모델명', price: '880,000원', img: image },
  { id: 2, name: '헤드셋2', model: '모델명', price: '880,000원', img: image },
  { id: 1, name: '상품명', model: '모델명', price: '880,000원', img: image },
  { id: 2, name: '헤드셋2', model: '모델명', price: '880,000원', img: image },
  // 나머지 제품 정보 추가
];

const LineCord = () => {
  return (
    <>
    <div style={{width: '100%', minHeight: '22.6vh', border: 'none'}}></div>
    <Inline style={{marginTop: '5%'}}>
      <h1>헤드셋</h1>
      <p>Sort by: Most Popular</p>
    </Inline>
    <ProductGrid style={{width: '80%', marginLeft: '10%'}}>
      {products.map(product => (
        <ProductBox key={product.id}>
          <ProductImage src={product.img} alt={product.name} />
          <ProductInfo>
            <h3>{product.name}</h3>
            <p>{product.model}</p>
            <strong>{product.price}</strong>
          </ProductInfo>
        </ProductBox>
      ))}
    </ProductGrid>
    </>
  );
};

export default LineCord;
