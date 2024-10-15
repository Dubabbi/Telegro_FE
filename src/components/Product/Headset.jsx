import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import image from './image.svg';
import Pagination from '../Pagination/Pagination';
import * as P from './ProductStyle';
import axios from 'axios';

export const Div = styled.div`
  width: 100%;
  min-height: 160px;
  border: none;
  @media (max-width: 780px) {
    max-height: 10vh;
    min-height: 10vh;
  }
`;

const Headset = ({ category = 'HEADSET', page = 0, size = 10 }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.telegro.kr/products', {
          params: { category, page, size },
        });
  
        console.log('API Response:', response); // 응답 데이터 확인
  
        if (response.status === 200) {
          setProducts(response.data.data);  // 데이터 설정
        } else {
          throw new Error(response.data.message || 'Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`Failed to load products: ${error.message}`);  // 에러 설정
      }
    };
  
    fetchProducts();
  }, [category, page, size]);

  if (error) {
    return <div>{error}</div>;  // 에러 표시
  }


  return (
    <>
      <Div />
      <P.Inline>
        <h1>헤드셋</h1>
        <p>r</p>
      </P.Inline>
      <P.GalleryGrid>
        {products.map((product) => (
          <P.GalleryItem key={product.id} onClick={() => navigate(`/productdetail/${product.id}`)}>
            <img src={product.coverImage || image} alt={product.name} />
            <h3>{product.productName}</h3>
            <p>{product.productModel}</p>
            <strong>{product.price}</strong>
          </P.GalleryItem>
        ))}
      </P.GalleryGrid>
      <Pagination currentPage={page} />
    </>
  );
};

export default Headset;
