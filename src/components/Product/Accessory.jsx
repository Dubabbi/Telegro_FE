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

const Accessory = ({ category = 'ACCESSORY', page = 0, size = 12 }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.telegro.kr/products', {
          params: { category, page, size },
        });
  
        console.log('API Response:', response);
  
        if (response.status === 200) {
          const sortedProducts = response.data.data.sort((a, b) => b.id - a.id);
          setProducts(sortedProducts);  
        } else {
          throw new Error(response.data.message || 'Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`Failed to load products: ${error.message}`);
      }
    };
  
    fetchProducts();
  }, [category, page, size]);

  if (error) {
    return <div>{error}</div>; 
  }


  return (
    <>
      <Div />
      <P.Inline>
        <h1>악세서리</h1>
        {/*<p>sorted</p>*/}
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

export default Accessory;
