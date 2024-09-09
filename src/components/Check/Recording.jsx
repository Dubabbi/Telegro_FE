import React from 'react';
import styled from 'styled-components';
import image from './image.svg';
import { useNavigate } from 'react-router-dom';
import * as P from './ProductStyle'

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

const Recording = () => {
  const navigate = useNavigate();
  return (
    <>
    <div style={{width: '100%', minHeight: '22.6vh', border: 'none'}}></div>
    <P.Inline style={{marginTop: '5%'}}>
      <h1>헤드셋</h1>
      <p>Sort by: Most Popular</p>
    </P.Inline>
    <P.ProductGrid style={{width: '80%', marginLeft: '10%'}}>
      {products.map(product => (
        <P.ProductBox onClick={() => navigate('/productdetail')} key={product.id}>
          <P.ProductImage src={product.img} alt={product.name} />
          <P.ProductInfo>
            <h3>{product.name}</h3>
            <p>{product.model}</p>
            <strong>{product.price}</strong>
          </P.ProductInfo>
        </P.ProductBox>
      ))}
    </P.ProductGrid>
    </>
  );
};

export default Recording;
