import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import image from './image.svg';
import Pagination from '../Pagination/Pagination';
import * as P from './ProductStyle'
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

const Headset = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState('');
  const products = [
    { id: 1, name: '상품명', model: '모델명', price: '880,000원', img: image },
    { id: 2, name: '헤드셋2', model: '모델명', price: '880,000원', img: image },
    { id: 3, name: '상품명', model: '모델명', price: '880,000원', img: image },
    { id: 4, name: '헤드셋2', model: '모델명', price: '880,000원', img: image },
    { id: 5, name: '상품명', model: '모델명', price: '880,000원', img: image },
    { id: 6, name: '헤드셋2', model: '모델명', price: '880,000원', img: image },
    { id: 7, name: '상품명', model: '모델명', price: '880,000원', img: image },
    { id: 8, name: '헤드셋2', model: '모델명', price: '880,000원', img: image },
  ];
  
  useEffect(() => {
    axios
      .get("/proxy/api/products")
      .then((response) => {
        if (response.data.isSuccess) {
          const sortedData = response.data.data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
  
          setProducts(sortedData); 
          setFilteredProducts(sortedData); 
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(`Failed to load word sets: ${error.message}`);
      });
  }, []);
  return (
    <>
    <Div></Div>
    <P.Inline>
      <h1>헤드셋</h1>
      <p>Sort by: Most Popular</p>
    </P.Inline>
      <P.GalleryGrid>
        {products.map(product => (
          <P.GalleryItem key={product.id} onClick={() => navigate('/productdetail')} >
            <img src={product.img} alt={product.name} />
            <h3>
              {product.name}
            </h3>
            <p>{product.model}</p>
            <strong>{product.price}</strong>
          </P.GalleryItem>
        ))}
      </P.GalleryGrid>
      <Pagination />
    </>
  );
};

export default Headset;
