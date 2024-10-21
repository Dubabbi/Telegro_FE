import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as N from '../Nav/NavbarStyle';

const AdminSearchResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { filteredProducts } = location.state || { filteredProducts: [] }; // 검색 결과 가져오기

  return (
    <N.AdminResultContainer>
      {filteredProducts.length > 0 ? (
        filteredProducts.map(product => (
          <N.ProductItem key={product.id} onClick={() => navigate(`admin/productdetail/${product.id}`)}>
            <img src={product.coverImage} alt={product.productName} />
            <p>{product.productName}</p>
            <span>₩{product.price}</span>
          </N.ProductItem>
        ))
      ) : (
        <h1 style={{backgroundColor: 'white'}}>검색 결과가 없습니다.</h1>
      )}
    </N.AdminResultContainer>
  );
};

export default AdminSearchResult;
