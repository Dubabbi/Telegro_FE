import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as N from './NavbarStyle';

const SearchResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { filteredProducts } = location.state || { filteredProducts: [] }; 
  function formatPrice(price) {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);
}
  return (
    <N.SearchResultContainer>
      {filteredProducts.length > 0 ? (
        filteredProducts.map(product => (
          <N.ProductItem key={product.id} onClick={() => navigate(`/productdetail/${product.id}`)}>
            <img src={product.coverImage} alt={product.productName} />
            <p>{product.productName}</p>
            <span>{formatPrice(product.price)}</span>
          </N.ProductItem>
        ))
      ) : (
        <h1 style={{backgroundColor: 'white'}}>검색 결과가 없습니다.</h1>
      )}
    </N.SearchResultContainer>
  );
};

export default SearchResult;
