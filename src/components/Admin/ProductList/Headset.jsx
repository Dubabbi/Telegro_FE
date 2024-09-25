import React from 'react';
import image from './image.svg';
import { useNavigate } from 'react-router-dom';
import * as P from './ProductStyle'
import Pagination from '../../Pagination/Pagination';

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

const Headset = () => {
  const navigate = useNavigate();
  return (
    <>
    <P.PageContainer>
    <P.Inline style={{width: '78%', border: 'none'}}>
      <h1>헤드셋</h1>
      <p>Sort by: Most Popular</p>
    </P.Inline>
    <P.ProductGrid>
      {products.map(product => (
        <P.ProductBox onClick={() => navigate('/admin/adminproductdetail')} key={product.id}>
          <P.ProductImage src={product.img} alt={product.name} />
          <P.ProductInfo>
            <h3>{product.name}</h3>
            <p>{product.model}</p>
            <strong>{product.price}</strong>
          </P.ProductInfo>
        </P.ProductBox>
      ))}
    </P.ProductGrid>
    <P.Pagediv>
      <Pagination />
    </P.Pagediv>
    </P.PageContainer>
    </>
  );
};

export default Headset;
