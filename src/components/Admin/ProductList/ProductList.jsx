// ProductList.jsx
import React from 'react';
import * as P from './ProductStyle'
const ProductList = () => {
  return (
    <>
    <P.PageContainer>
    <P.Inline style={{width: '78%', border: 'none'}}>
      <h1>상품 관리</h1>
    </P.Inline>
    </P.PageContainer>
    </>
  );
};

export default ProductList;